import Otp from "@/db/schemas/Otp";
import startDB from "@/lib/db";

export async function POST(req) {
  await startDB();
  const { email, otp } = await req.json();

  console.log(`🔍 Verifying OTP for ${email} with OTP: ${otp}`);

  if (!email || !otp) {
    console.log("❌ Missing email or OTP");
    return new Response(JSON.stringify({ error: "Email and OTP required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Ensure consistent email case and OTP type
  const record = await Otp.findOne({
    email: email.toLowerCase(),
    otp: otp.toString(),
  });

  console.log(
    `🔍 OTP Record found:`,
    record
      ? {
          id: record._id,
          email: record.email,
          otp: record.otp,
          expiresAt: record.expiresAt,
          isExpired: record.expiresAt < new Date(),
        }
      : null
  );

  if (!record) {
    console.log("❌ Invalid OTP - No matching record found");

    // Debug: Show all OTPs for this email
    const allOtps = await Otp.find({ email: email.toLowerCase() });
    console.log(
      `📋 All OTPs for ${email.toLowerCase()}:`,
      allOtps.map((r) => ({ otp: r.otp, expires: r.expiresAt }))
    );

    return new Response(JSON.stringify({ error: "Invalid OTP" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (record.expiresAt < new Date()) {
    console.log("❌ OTP expired");
    return new Response(JSON.stringify({ error: "OTP expired" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log(`✅ OTP verified successfully for ${email.toLowerCase()}`);

  // Optional: remove OTP from DB after success (commented out to allow password reset)
  // await Otp.deleteOne({ _id: record._id });

  return new Response(
    JSON.stringify({ message: "OTP verified successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
