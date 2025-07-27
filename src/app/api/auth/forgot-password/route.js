import nodemailer from "nodemailer";
import Otp from "@/db/schemas/Otp";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { cleanupExpiredOtps, cleanupOtpsForEmail } from "@/helpers/cleanupOtps";

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

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Please enter a valid email address" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Check if user with this email exists
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "No account found with this email address" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err) {
    console.error("Error checking user:", err);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Clean up any expired OTPs and existing OTPs for this email
  try {
    await cleanupExpiredOtps(); // Clean up expired OTPs globally
    await cleanupOtpsForEmail(email); // Clean up all OTPs for this specific email
  } catch (err) {
    console.warn("Warning during OTP cleanup:", err);
  }

  // Generate OTP and expiration
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  console.log(`🔑 Generated OTP for ${email}: ${otp} (expires: ${expiresAt})`);

  // Save OTP to DB
  try {
    // Create new OTP entry
    const otpEntry = new Otp({
      email: email.toLowerCase(),
      otp,
      expiresAt,
    });
    await otpEntry.save();

    console.log(`✅ OTP saved successfully for ${email.toLowerCase()}: ${otp}`);

    // Verify the OTP was actually saved
    const savedOtp = await Otp.findOne({ email: email.toLowerCase(), otp });
    if (!savedOtp) {
      throw new Error("OTP was not saved properly");
    }
    console.log(`✅ OTP verification check passed for ${email.toLowerCase()}`);
  } catch (err) {
    console.error("❌ Error saving OTP:", err);

    // Handle specific MongoDB errors
    if (err.code === 11000) {
      // Duplicate key error - try to delete and recreate
      console.log("🔄 Handling duplicate key error, retrying...");
      try {
        await Otp.deleteMany({ email: email.toLowerCase() });
        const otpEntry = new Otp({
          email: email.toLowerCase(),
          otp,
          expiresAt,
        });
        await otpEntry.save();
        console.log(
          `✅ OTP created successfully after cleanup for ${email.toLowerCase()}: ${otp}`
        );
      } catch (retryErr) {
        console.error("❌ Error on retry:", retryErr);
        return new Response(
          JSON.stringify({
            error: "Failed to save OTP after retry. Please try again.",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      console.error("❌ Non-duplicate error:", err);
      return new Response(
        JSON.stringify({ error: "Failed to save OTP. Please try again." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
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
