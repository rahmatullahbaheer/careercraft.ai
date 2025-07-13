import User from "../db/schemas/User.js";
import startDB from "../lib/db.js";

/**
 * Get user credits by email
 * @param {string} email - User's email address
 * @returns {Promise<number>} The user's current credits
 */
export async function getUserCreditsByEmail(email) {
  try {
    await startDB();

    const user = await User.findOne({ email: email }).select("userCredits");

    if (user) {
      return user.userCredits || 0;
    }

    return 0;
  } catch (error) {
    console.error("Error getting user credits:", error);
    return 0;
  }
}
