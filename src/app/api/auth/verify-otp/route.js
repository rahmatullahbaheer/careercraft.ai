import Otp from "@/db/schemas/Otp";
import startDB from "@/lib/db";

export async function POST(req) {
  await startDB();
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return new Response(JSON.stringify({ error: "Email and OTP required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const record = await Otp.findOne({ email, otp });

  if (!record) {
    return new Response(JSON.stringify({ error: "Invalid OTP" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (record.expiresAt < new Date()) {
    return new Response(JSON.stringify({ error: "OTP expired" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Optional: remove OTP from DB after success
  await Otp.deleteOne({ _id: record._id });

  return new Response(
    JSON.stringify({ message: "OTP verified successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
