import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export const updateUserAfterPayment = async (
  email: string,
  credits: number,
  packageData: any,
  paymentData: any
) => {
  try {
    await startDB();

    console.log(`🔄 Starting atomic payment update for ${email}`);
    console.log(
      `Credits: ${credits}, Package: ${packageData.name}, PackageId: ${packageData._id}`
    );

    // Get user before update for logging
    const userBefore = await (User as any)
      .findOne({ email })
      .select(
        "userCredits totalCredits userPackage creditPackage subscriptionStatus"
      );

    if (!userBefore) {
      throw new Error(`User ${email} not found`);
    }

    console.log(
      `Before update: userCredits=${
        userBefore.userCredits || 0
      }, totalCredits=${userBefore.totalCredits || 0}, package=${
        userBefore.userPackage || "None"
      }`
    );

    // Single atomic update with all payment-related fields
    const updateResult = await (User as any).findOneAndUpdate(
      { email: email },
      {
        // Increment credits
        $inc: {
          userCredits: +credits,
          totalCredits: +credits,
        },
        // Update package and subscription info
        userPackage: packageData.name,
        creditPackage: packageData._id.toString(),
        lastPaymentDate: new Date(),
        subscriptionStatus: "active",
        // Add payment to history
        $push: {
          paymentHistory: {
            paymentIntentId: paymentData.paymentIntentId,
            packageId: packageData._id.toString(),
            packageName: packageData.name,
            amount: paymentData.amount,
            currency: paymentData.currency || "usd",
            credits: credits,
            status: "completed",
            stripeChargeId: paymentData.stripeChargeId,
            paymentDate: new Date(),
            metadata: paymentData.metadata || {},
          },
        },
      },
      {
        new: true,
        select:
          "userCredits totalCredits userPackage creditPackage subscriptionStatus lastPaymentDate",
      }
    );

    if (!updateResult) {
      throw new Error(`Failed to update user ${email}`);
    }

    console.log(
      `✅ After update: userCredits=${updateResult.userCredits}, totalCredits=${updateResult.totalCredits}, package=${updateResult.userPackage}`
    );
    console.log(
      `✅ Package ID: ${updateResult.creditPackage}, Status: ${updateResult.subscriptionStatus}`
    );

    return updateResult;
  } catch (error) {
    console.error(`❌ Error updating user after payment:`, error);
    throw error;
  }
};
