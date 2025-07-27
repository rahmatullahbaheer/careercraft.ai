import Otp from "@/db/schemas/Otp";
import startDB from "@/lib/db";

/**
 * Clean up expired OTPs from the database
 * This helps prevent database bloat and improves query performance
 */
export const cleanupExpiredOtps = async () => {
  try {
    await startDB();

    const currentTime = new Date();
    const result = await Otp.deleteMany({ expiresAt: { $lt: currentTime } });

    if (result.deletedCount > 0) {
      console.log(`🧹 Cleaned up ${result.deletedCount} expired OTPs`);
    }

    return result.deletedCount;
  } catch (error) {
    console.error("Error cleaning up expired OTPs:", error);
    return 0;
  }
};

/**
 * Clean up all OTPs for a specific email
 * Useful when creating a new OTP to ensure no conflicts
 */
export const cleanupOtpsForEmail = async (email) => {
  try {
    await startDB();

    const normalizedEmail = email.toLowerCase().trim();
    const result = await Otp.deleteMany({ email: normalizedEmail });

    console.log(
      `🧹 Cleaned up ${result.deletedCount} OTPs for ${normalizedEmail}`
    );
    return result.deletedCount;
  } catch (error) {
    console.error(`Error cleaning up OTPs for ${email}:`, error);
    return 0;
  }
};

/**
 * Get all active (non-expired) OTPs for debugging
 */
export const getActiveOtps = async () => {
  try {
    await startDB();

    const currentTime = new Date();
    const activeOtps = await Otp.find({ expiresAt: { $gt: currentTime } });

    return activeOtps.map((otp) => ({
      email: otp.email,
      otp: otp.otp,
      expiresAt: otp.expiresAt,
      createdAt: otp.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching active OTPs:", error);
    return [];
  }
};
