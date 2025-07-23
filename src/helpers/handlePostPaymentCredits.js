import { updateUserCreditsByAdmin } from "./updateUserCreditsByAdmin";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

/**
 * Handle post-payment credit addition for successful payments
 * @param {string} userEmail - User's email address
 * @param {string} packageId - Package ID from database
 * @param {number} customCredits - Custom credit amount (optional)
 * @param {string} paymentIntentId - Stripe payment intent ID
 * @param {number} amountPaid - Amount paid in cents
 * @returns {Promise<Object>} Result object with success status and data
 */
export const handlePostPaymentCredits = async (
  userEmail,
  packageId = null,
  customCredits = null,
  paymentIntentId = null,
  amountPaid = 0
) => {
  try {
    await startDB();

    // Validate user exists
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error(`User not found with email: ${userEmail}`);
    }

    let creditsToAdd = 0;
    let packageName = "Custom Credits";
    let packageData = null;

    // Get credits from package or use custom amount
    if (packageId) {
      const Package = require("@/db/schemas/Package").default;
      packageData = await Package.findById(packageId);

      if (!packageData) {
        throw new Error(`Package not found with ID: ${packageId}`);
      }

      creditsToAdd = packageData.credits || 0;
      packageName = packageData.name;
    } else if (customCredits) {
      creditsToAdd = parseInt(customCredits);

      if (isNaN(creditsToAdd) || creditsToAdd <= 0) {
        throw new Error("Invalid credit amount");
      }
    } else {
      throw new Error("Either packageId or customCredits must be provided");
    }

    // Add credits to user account
    if (creditsToAdd > 0) {
      await updateUserCreditsByAdmin(userEmail, creditsToAdd);

      // Update user's package and payment information
      const updateData = {
        userPackage: packageName,
        creditPackage: packageId || "custom",
        lastPaymentDate: new Date(),
        subscriptionStatus: "active",
      };

      // Add payment history entry
      const paymentHistoryEntry = {
        paymentIntentId: paymentIntentId || `manual_${Date.now()}`,
        packageId: packageId,
        packageName: packageName,
        creditsAdded: creditsToAdd,
        paymentDate: new Date(),
        amount: amountPaid,
        status: "completed",
      };

      await User.findOneAndUpdate(
        { email: userEmail },
        {
          $set: updateData,
          $push: { paymentHistory: paymentHistoryEntry },
        },
        { new: true }
      );

      // Get updated user data
      const updatedUser = await User.findOne({ email: userEmail }).select(
        "userCredits totalCredits userPackage creditPackage"
      );

      console.log(`Successfully added ${creditsToAdd} credits to ${userEmail}`);

      return {
        success: true,
        data: {
          creditsAdded: creditsToAdd,
          totalCredits: updatedUser.userCredits,
          packageName: packageName,
          userPackage: updatedUser.userPackage,
          paymentIntentId: paymentIntentId,
        },
        message: `Successfully added ${creditsToAdd} credits to your account`,
      };
    } else {
      throw new Error("No credits to add");
    }
  } catch (error) {
    console.error("Error in handlePostPaymentCredits:", error);
    return {
      success: false,
      error: error.message,
      message: "Failed to add credits to user account",
    };
  }
};

/**
 * Get user's credit summary and payment history
 * @param {string} userEmail - User's email address
 * @returns {Promise<Object>} User's credit information
 */
export const getUserCreditSummary = async (userEmail) => {
  try {
    await startDB();

    const user = await User.findOne({ email: userEmail }).select(
      "userCredits totalCredits userPackage creditPackage lastPaymentDate subscriptionStatus paymentHistory"
    );

    if (!user) {
      throw new Error(`User not found with email: ${userEmail}`);
    }

    return {
      success: true,
      data: {
        availableCredits: user.userCredits || 0,
        totalCreditsEarned: user.totalCredits || 0,
        creditsUsed: (user.totalCredits || 0) - (user.userCredits || 0),
        currentPackage: user.userPackage || "Free Plan",
        creditPackage: user.creditPackage,
        lastPaymentDate: user.lastPaymentDate,
        subscriptionStatus: user.subscriptionStatus || "inactive",
        paymentHistory: user.paymentHistory || [],
      },
    };
  } catch (error) {
    console.error("Error in getUserCreditSummary:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Validate if user has sufficient credits for an operation
 * @param {string} userEmail - User's email address
 * @param {number} requiredCredits - Credits required for operation
 * @returns {Promise<Object>} Validation result
 */
export const validateUserCredits = async (userEmail, requiredCredits) => {
  try {
    await startDB();

    const user = await User.findOne({ email: userEmail }).select("userCredits");

    if (!user) {
      return {
        valid: false,
        error: "User not found",
      };
    }

    const availableCredits = user.userCredits || 0;

    return {
      valid: availableCredits >= requiredCredits,
      availableCredits: availableCredits,
      requiredCredits: requiredCredits,
      shortfall: Math.max(0, requiredCredits - availableCredits),
    };
  } catch (error) {
    console.error("Error in validateUserCredits:", error);
    return {
      valid: false,
      error: error.message,
    };
  }
};
