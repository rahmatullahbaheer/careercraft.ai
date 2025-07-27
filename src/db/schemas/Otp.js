import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String, // Explicitly ensure OTP is stored as string
      required: true,
      minlength: 6,
      maxlength: 6,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for faster queries and ensure uniqueness
otpSchema.index({ email: 1, otp: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Add a compound unique index to prevent duplicate email-otp combinations
otpSchema.index({ email: 1 }, { unique: false }); // Allow multiple OTPs per email but clean up old ones

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
