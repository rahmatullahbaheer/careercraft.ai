import User from "../db/schemas/User.js";
import startDB from "../lib/db.js";

/**
 * Update user's total credits by deducting the used credits
 * @param {string} email - User's email address
 * @param {number} creditsUsed - Number of credits to deduct
 * @returns {Promise<boolean>} Success status
 */
export async function updateUserTotalCredits(email, creditsUsed) {
  try {
    await startDB();

    const user = await User.findOne({ email: email });

    if (user) {
      // Deduct the credits used from userCredits
      const newUserCredits = Math.max(0, (user.userCredits || 0) - creditsUsed);

      // Update totalCredits (this might be cumulative total used)
      const newTotalCredits = (user.totalCredits || 0) + creditsUsed;

      await User.findOneAndUpdate(
        { email: email },
        {
          userCredits: newUserCredits,
          totalCredits: newTotalCredits,
        }
      );

      return true;
    }

    return false;
  } catch (error) {
    console.error("Error updating user credits:", error);
    return false;
  }
}
