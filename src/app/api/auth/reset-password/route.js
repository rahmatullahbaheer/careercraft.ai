import { NextResponse } from "next/server";
import User from "@/db/schemas/User";
import Otp from "@/db/schemas/Otp";
import startDB from "@/lib/db";
import bcrypt from "bcrypt";
import { cleanupExpiredOtps } from "@/helpers/cleanupOtps";

export async function POST(req) {
  try {
    await startDB();

    // Clean up expired OTPs first
    await cleanupExpiredOtps();

    const body = await req.json();
    const { email, otp, newPassword } = body;

    console.log(`🔄 Password reset attempt for: ${email}`);

    // Validate input
    if (!email || !otp || !newPassword) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "Email, OTP, and new password are required" },
        { status: 400 }
      );
    }

    // Validate new password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      console.log("❌ Password doesn't meet requirements");
      return NextResponse.json(
        {
          error:
            "New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
        { status: 400 }
      );
    }

    // Verify OTP
    console.log(`🔍 Verifying OTP for ${email}`);
    console.log(`🔍 Looking for OTP: ${otp}`);

    // Debug: Check what OTP records exist for this email
    const allOtpsForEmail = await Otp.find({ email: email.toLowerCase() });
    console.log(
      `📋 All OTPs for ${email.toLowerCase()}:`,
      allOtpsForEmail.map((record) => ({
        id: record._id,
        otp: record.otp,
        otpType: typeof record.otp,
        expiresAt: record.expiresAt,
        isExpired: record.expiresAt < new Date(),
        createdAt: record.createdAt,
      }))
    );

    // Ensure we're looking for OTP with consistent email case and OTP as string
    const otpRecord = await Otp.findOne({
      email: email.toLowerCase(),
      otp: otp.toString(), // Ensure OTP is compared as string
    });

    console.log(
      `🔍 OTP Record found:`,
      otpRecord
        ? {
            id: otpRecord._id,
            email: otpRecord.email,
            otp: otpRecord.otp,
            expiresAt: otpRecord.expiresAt,
            isExpired: otpRecord.expiresAt < new Date(),
          }
        : null
    );

    if (!otpRecord) {
      console.log("❌ Invalid OTP - No matching record found");

      // Additional debug info
      const anyOtpForEmail = await Otp.findOne({ email: email.toLowerCase() });
      if (anyOtpForEmail) {
        console.log(
          `🔍 Found OTP record for email but OTP doesn't match. Expected: ${otp}, Found: ${anyOtpForEmail.otp}`
        );
      } else {
        console.log(
          `🔍 No OTP records found for email: ${email.toLowerCase()}`
        );
      }

      return NextResponse.json(
        { error: "Invalid OTP. Please check your code and try again." },
        { status: 400 }
      );
    }

    if (otpRecord.expiresAt < new Date()) {
      console.log("❌ OTP expired");
      // Clean up expired OTP
      await Otp.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Find the user
    console.log(`🔍 Finding user with email: ${email}`);
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if new password is different from current password
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      console.log("❌ Same password as current");
      return NextResponse.json(
        { error: "New password must be different from your current password" },
        { status: 400 }
      );
    }

    // Hash the new password
    console.log(`🔐 Hashing new password for ${email}`);
    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    console.log(`💾 Updating password for ${email}`);
    await User.findByIdAndUpdate(user._id, {
      password: hashedNewPassword,
      updatedAt: new Date(),
    });

    // Delete the used OTP
    console.log(`🗑️ Cleaning up OTP for ${email}`);
    await Otp.deleteOne({ _id: otpRecord._id });

    console.log(`✅ Password reset successfully for ${email}`);

    return NextResponse.json({
      message: "Password has been reset successfully",
      success: true,
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);

    // Handle specific MongoDB errors
    if (error.name === "MongoError" || error.name === "MongoServerError") {
      return NextResponse.json(
        { error: "Database error. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
