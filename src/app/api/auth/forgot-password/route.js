import nodemailer from "nodemailer";
import Otp from "@/db/schemas/Otp";
import startDB from "@/lib/db";

export async function POST(req) {
  await startDB();

  const body = await req.json();
  const { email } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Remove any previous OTPs for this email
  try {
    await Otp.deleteMany({ email });
  } catch (err) {
    // Not a critical error, continue
  }

  // Generate OTP and expiration
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // Save OTP to DB
  try {
    await Otp.create({ email, otp, expiresAt });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to save OTP" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Send Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ijazrahman102345@gmail.com",
      pass: "jwzeslxnfygavxfe",
    },
  });

  const mailOptions = {
    from: "Careercraft.ai <ijazrahman102345@gmail.com>",
    to: email,
    subject: "Careercraft.ai Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f7f8fc; padding: 32px; border-radius: 12px; max-width: 480px; margin: auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src='https://careercraft.ai/logo.svg' alt='Careercraft.ai' style='height: 48px; margin-bottom: 16px;' />
          <h2 style="color: #8854ff; margin: 0;">Password Reset OTP</h2>
        </div>
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #333;">You requested to reset your password for your Careercraft.ai account.</p>
        <p style="font-size: 16px; color: #333;">Please use the following OTP to proceed:</p>
        <div style="font-size: 32px; font-weight: bold; color: #8854ff; text-align: center; margin: 24px 0; letter-spacing: 4px;">${otp}</div>
        <p style="font-size: 15px; color: #555;">If you did not request this, please ignore this email.</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
        <div style="text-align: center; color: #aaa; font-size: 13px;">&copy; ${new Date().getFullYear()} Careercraft.ai</div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "OTP sent to your email." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send OTP." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
