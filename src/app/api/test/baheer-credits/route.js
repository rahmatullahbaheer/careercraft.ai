import { NextResponse } from "next/server";
import { updateUserCreditsByAdmin } from "@/helpers/updateUserCreditsByAdmin";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { testCredits = 50 } = body;

    const TEST_EMAIL = "baheer224@gmail.com";

    console.log(`=== BAHEER CREDIT TEST START ===`);
    console.log(`Target Email: ${TEST_EMAIL}`);
    console.log(`Test Credits: ${testCredits}`);

    await startDB();

    // Check if user exists
    const userBefore = await User.findOne({ email: TEST_EMAIL });

    if (!userBefore) {
      console.log(`❌ User ${TEST_EMAIL} not found in database`);
      return NextResponse.json(
        {
          error: "User not found",
          email: TEST_EMAIL,
          suggestion: "Make sure the user has registered first",
        },
        { status: 404 }
      );
    }

    console.log(
      `✅ User found: ${userBefore.firstName} ${userBefore.lastName}`
    );
    console.log(
      `Current Credits: userCredits=${
        userBefore.userCredits || 0
      }, totalCredits=${userBefore.totalCredits || 0}`
    );
    console.log(`Current Package: ${userBefore.userPackage || "None"}`);

    // Add test credits
    console.log(`🔄 Adding ${testCredits} test credits...`);
    await updateUserCreditsByAdmin(
      TEST_EMAIL,
      testCredits,
      "Test Credit Addition"
    );

    // Update package info
    await User.findOneAndUpdate(
      { email: TEST_EMAIL },
      {
        userPackage: "Test Premium Package",
        subscriptionStatus: "active",
        lastPaymentDate: new Date(),
        $push: {
          paymentHistory: {
            paymentIntentId: `test_${Date.now()}`,
            packageName: "Test Premium Package",
            creditsAdded: testCredits,
            paymentDate: new Date(),
            amount: 0,
            status: "completed",
          },
        },
      }
    );

    // Verify the update
    const userAfter = await User.findOne({ email: TEST_EMAIL });

    console.log(`✅ Update completed!`);
    console.log(
      `New Credits: userCredits=${userAfter.userCredits || 0}, totalCredits=${
        userAfter.totalCredits || 0
      }`
    );
    console.log(`New Package: ${userAfter.userPackage}`);
    console.log(`New Status: ${userAfter.subscriptionStatus}`);
    console.log(
      `Payment History Count: ${userAfter.paymentHistory?.length || 0}`
    );
    console.log(`=== BAHEER CREDIT TEST END ===`);

    return NextResponse.json({
      success: true,
      message: `Successfully added ${testCredits} credits to ${TEST_EMAIL}`,
      email: TEST_EMAIL,
      before: {
        userCredits: userBefore.userCredits || 0,
        totalCredits: userBefore.totalCredits || 0,
        userPackage: userBefore.userPackage || "Free Plan",
        subscriptionStatus: userBefore.subscriptionStatus || "inactive",
        paymentHistoryCount: userBefore.paymentHistory?.length || 0,
      },
      after: {
        userCredits: userAfter.userCredits || 0,
        totalCredits: userAfter.totalCredits || 0,
        userPackage: userAfter.userPackage,
        subscriptionStatus: userAfter.subscriptionStatus,
        paymentHistoryCount: userAfter.paymentHistory?.length || 0,
      },
      creditsAdded: testCredits,
      difference: {
        userCredits:
          (userAfter.userCredits || 0) - (userBefore.userCredits || 0),
        totalCredits:
          (userAfter.totalCredits || 0) - (userBefore.totalCredits || 0),
      },
    });
  } catch (error) {
    console.error("❌ Error in Baheer credit test:", error);
    return NextResponse.json(
      {
        error: "Failed to test credits",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
