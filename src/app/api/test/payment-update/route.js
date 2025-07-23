import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { updateUserAfterPayment } from "@/helpers/updateUserAfterPayment.js";
import User from "@/db/schemas/User";
import Package from "@/db/schemas/Package";
import startDB from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      email = session.user.email,
      credits = 100,
      packageName = "Test Premium Package",
      testType = "atomic", // "atomic" or "legacy"
    } = body;

    await startDB();

    console.log(`=== COMPREHENSIVE PAYMENT TEST START ===`);
    console.log(`Test Type: ${testType}`);
    console.log(`Email: ${email}`);
    console.log(`Credits: ${credits}`);
    console.log(`Package: ${packageName}`);

    // Get user before update
    const userBefore = await User.findOne({ email }).select(
      "userCredits totalCredits userPackage creditPackage subscriptionStatus paymentHistory"
    );

    if (!userBefore) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(`📊 BEFORE UPDATE:`);
    console.log(`  userCredits: ${userBefore.userCredits || 0}`);
    console.log(`  totalCredits: ${userBefore.totalCredits || 0}`);
    console.log(`  userPackage: ${userBefore.userPackage || "None"}`);
    console.log(`  creditPackage: ${userBefore.creditPackage || "None"}`);
    console.log(
      `  subscriptionStatus: ${userBefore.subscriptionStatus || "inactive"}`
    );
    console.log(
      `  paymentHistory length: ${userBefore.paymentHistory?.length || 0}`
    );

    // Create a mock package for testing
    const mockPackage = {
      _id: "test_package_id_123",
      name: packageName,
      credits: credits,
      price: 99.99,
    };

    const mockPaymentData = {
      paymentIntentId: `test_payment_${Date.now()}`,
      amount: 99.99,
      currency: "usd",
      stripeChargeId: `ch_test_${Date.now()}`,
      metadata: { testPayment: "true" },
    };

    let updatedUser;

    if (testType === "atomic") {
      console.log(`🔄 Testing ATOMIC update...`);
      updatedUser = await updateUserAfterPayment(
        email,
        credits,
        mockPackage,
        mockPaymentData
      );
    } else {
      console.log(`🔄 Testing LEGACY individual updates...`);

      // Legacy approach - individual updates
      await User.findOneAndUpdate(
        { email },
        { $inc: { userCredits: credits, totalCredits: credits } }
      );

      await User.findOneAndUpdate(
        { email },
        {
          userPackage: packageName,
          creditPackage: mockPackage._id,
          subscriptionStatus: "active",
          lastPaymentDate: new Date(),
          $push: {
            paymentHistory: {
              paymentIntentId: mockPaymentData.paymentIntentId,
              packageId: mockPackage._id,
              packageName: packageName,
              amount: mockPaymentData.amount,
              credits: credits,
              status: "completed",
              paymentDate: new Date(),
            },
          },
        }
      );

      updatedUser = await User.findOne({ email }).select(
        "userCredits totalCredits userPackage creditPackage subscriptionStatus paymentHistory"
      );
    }

    console.log(`📊 AFTER UPDATE:`);
    console.log(`  userCredits: ${updatedUser.userCredits || 0}`);
    console.log(`  totalCredits: ${updatedUser.totalCredits || 0}`);
    console.log(`  userPackage: ${updatedUser.userPackage || "None"}`);
    console.log(`  creditPackage: ${updatedUser.creditPackage || "None"}`);
    console.log(
      `  subscriptionStatus: ${updatedUser.subscriptionStatus || "inactive"}`
    );
    console.log(
      `  paymentHistory length: ${updatedUser.paymentHistory?.length || 0}`
    );

    // Calculate differences
    const differences = {
      userCredits:
        (updatedUser.userCredits || 0) - (userBefore.userCredits || 0),
      totalCredits:
        (updatedUser.totalCredits || 0) - (userBefore.totalCredits || 0),
      userPackageChanged: userBefore.userPackage !== updatedUser.userPackage,
      creditPackageChanged:
        userBefore.creditPackage !== updatedUser.creditPackage,
      subscriptionStatusChanged:
        userBefore.subscriptionStatus !== updatedUser.subscriptionStatus,
      paymentHistoryAdded:
        (updatedUser.paymentHistory?.length || 0) -
        (userBefore.paymentHistory?.length || 0),
    };

    console.log(`📈 DIFFERENCES:`);
    console.log(`  userCredits: +${differences.userCredits}`);
    console.log(`  totalCredits: +${differences.totalCredits}`);
    console.log(`  userPackage changed: ${differences.userPackageChanged}`);
    console.log(`  creditPackage changed: ${differences.creditPackageChanged}`);
    console.log(
      `  subscriptionStatus changed: ${differences.subscriptionStatusChanged}`
    );
    console.log(
      `  paymentHistory entries added: +${differences.paymentHistoryAdded}`
    );

    // Validation
    const isValid = {
      creditsAdded:
        differences.userCredits === credits &&
        differences.totalCredits === credits,
      packageUpdated: updatedUser.userPackage === packageName,
      creditPackageUpdated: updatedUser.creditPackage === mockPackage._id,
      statusUpdated: updatedUser.subscriptionStatus === "active",
      historyAdded: differences.paymentHistoryAdded === 1,
    };

    const allValid = Object.values(isValid).every((v) => v);

    console.log(`✅ VALIDATION:`);
    console.log(`  Credits correctly added: ${isValid.creditsAdded}`);
    console.log(`  Package correctly updated: ${isValid.packageUpdated}`);
    console.log(
      `  Credit package correctly updated: ${isValid.creditPackageUpdated}`
    );
    console.log(`  Status correctly updated: ${isValid.statusUpdated}`);
    console.log(`  History correctly added: ${isValid.historyAdded}`);
    console.log(`  ALL CHECKS PASSED: ${allValid}`);

    console.log(`=== COMPREHENSIVE PAYMENT TEST END ===`);

    return NextResponse.json({
      success: allValid,
      testType,
      email,
      creditsAdded: credits,
      packageName,
      before: {
        userCredits: userBefore.userCredits || 0,
        totalCredits: userBefore.totalCredits || 0,
        userPackage: userBefore.userPackage || "None",
        creditPackage: userBefore.creditPackage || "None",
        subscriptionStatus: userBefore.subscriptionStatus || "inactive",
        paymentHistoryCount: userBefore.paymentHistory?.length || 0,
      },
      after: {
        userCredits: updatedUser.userCredits || 0,
        totalCredits: updatedUser.totalCredits || 0,
        userPackage: updatedUser.userPackage,
        creditPackage: updatedUser.creditPackage,
        subscriptionStatus: updatedUser.subscriptionStatus,
        paymentHistoryCount: updatedUser.paymentHistory?.length || 0,
      },
      differences,
      validation: isValid,
      allValid,
    });
  } catch (error) {
    console.error("❌ Error in comprehensive payment test:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
