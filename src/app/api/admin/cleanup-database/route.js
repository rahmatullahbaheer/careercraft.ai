import { NextResponse } from "next/server";
import mongoose from "mongoose";
import startDB from "@/lib/db";

export async function POST(req) {
  try {
    await startDB();

    console.log("🔧 Starting database cleanup...");

    // Get the OTP collection
    const db = mongoose.connection.db;
    const otpCollection = db.collection("otps");

    // Drop all existing indexes except _id
    console.log("🗑️ Dropping existing indexes...");
    try {
      const indexes = await otpCollection.indexes();
      console.log("Current indexes:", indexes);

      for (const index of indexes) {
        if (index.name !== "_id_") {
          await otpCollection.dropIndex(index.name);
          console.log(`✅ Dropped index: ${index.name}`);
        }
      }
    } catch (err) {
      console.log("No indexes to drop or error dropping:", err.message);
    }

    // Clear all existing OTP records
    console.log("🧹 Clearing existing OTP records...");
    const deleteResult = await otpCollection.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} OTP records`);

    // Create proper indexes
    console.log("📇 Creating new indexes...");

    // Create TTL index for automatic expiration
    await otpCollection.createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0 }
    );
    console.log("✅ Created TTL index for expiresAt");

    // Create compound index for email and OTP
    await otpCollection.createIndex({ email: 1, otp: 1 });
    console.log("✅ Created compound index for email and OTP");

    // List final indexes
    const finalIndexes = await otpCollection.indexes();
    console.log("Final indexes:", finalIndexes);

    console.log("✅ Database cleanup completed successfully!");

    return NextResponse.json({
      message: "Database cleanup completed successfully",
      deletedRecords: deleteResult.deletedCount,
      indexes: finalIndexes,
      success: true,
    });
  } catch (error) {
    console.error("❌ Database cleanup error:", error);
    return NextResponse.json(
      {
        error: "Database cleanup failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
