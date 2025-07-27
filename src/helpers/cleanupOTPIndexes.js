import mongoose from "mongoose";
import startDB from "@/lib/db";

async function cleanupOTPIndexes() {
  try {
    await startDB();

    const db = mongoose.connection.db;
    const collection = db.collection("otps");

    // Get existing indexes
    const indexes = await collection.indexes();
    console.log("Existing indexes:", indexes);

    // Drop problematic indexes if they exist
    try {
      await collection.dropIndex("expiry_1");
      console.log("Dropped expiry_1 index");
    } catch (err) {
      console.log("expiry_1 index not found or already dropped");
    }

    try {
      await collection.dropIndex("expiresAt_1");
      console.log("Dropped expiresAt_1 index");
    } catch (err) {
      console.log("expiresAt_1 index not found or already dropped");
    }

    // Clear all existing OTP records
    const deleteResult = await collection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing OTP records`);

    // Create new TTL index
    await collection.createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0, name: "expiresAt_ttl" }
    );
    console.log("Created new TTL index");

    // Create email+otp compound index
    await collection.createIndex(
      { email: 1, otp: 1 },
      { name: "email_otp_compound" }
    );
    console.log("Created email+otp compound index");

    console.log("Cleanup completed successfully");
  } catch (error) {
    console.error("Error during cleanup:", error);
  } finally {
    mongoose.connection.close();
  }
}

export { cleanupOTPIndexes };
