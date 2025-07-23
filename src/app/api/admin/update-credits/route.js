import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { updateUserCreditsByAdmin } from "@/helpers/updateUserCreditsByAdmin";
import User from "@/db/schemas/User";
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
    const { email, credits, packageName = "Manual Credit Update" } = body;

    // Use session email if no email provided
    const targetEmail = email || session.user.email;

    if (!credits || credits <= 0) {
      return NextResponse.json(
        { error: "Invalid credits amount" },
        { status: 400 }
      );
    }

    await startDB();

    console.log(`=== CREDIT UPDATE START ===`);
    console.log(`Target Email: ${targetEmail}`);
    console.log(`Credits to Add: ${credits}`);
    console.log(`Package: ${packageName}`);

    // Get current user data before update
    const userBefore = await User.findOne({ email: targetEmail }).select(
      "firstName lastName email userCredits totalCredits userPackage subscriptionStatus"
    );

    if (!userBefore) {
      console.log(`❌ User not found: ${targetEmail}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(
      `✅ User found: ${userBefore.firstName} ${userBefore.lastName}`
    );
    console.log(
      `Current Credits: userCredits=${userBefore.userCredits}, totalCredits=${userBefore.totalCredits}`
    );
    console.log(`Current Package: ${userBefore.userPackage}`);
    console.log(`Current Status: ${userBefore.subscriptionStatus}`);

    // Add credits using the admin function
    console.log(`🔄 Adding ${credits} credits...`);
    await updateUserCreditsByAdmin(
      targetEmail,
      credits,
      `Manual: ${packageName}`
    );

    // Update user package and subscription status
    console.log(`🔄 Updating package and subscription status...`);
    await User.findOneAndUpdate(
      { email: targetEmail },
      {
        userPackage: packageName,
        subscriptionStatus: "active",
        lastPaymentDate: new Date(),
      }
    );

    // Get updated user data
    const userAfter = await User.findOne({ email: targetEmail }).select(
      "userCredits totalCredits userPackage subscriptionStatus lastPaymentDate"
    );

    console.log(`✅ Update completed!`);
    console.log(
      `New Credits: userCredits=${userAfter.userCredits}, totalCredits=${userAfter.totalCredits}`
    );
    console.log(`New Package: ${userAfter.userPackage}`);
    console.log(`New Status: ${userAfter.subscriptionStatus}`);
    console.log(`Last Payment: ${userAfter.lastPaymentDate}`);
    console.log(`=== CREDIT UPDATE END ===`);

    return NextResponse.json({
      success: true,
      message: `Successfully added ${credits} credits to ${targetEmail}`,
      user: {
        email: targetEmail,
        name: `${userBefore.firstName} ${userBefore.lastName}`,
      },
      before: {
        userCredits: userBefore.userCredits || 0,
        totalCredits: userBefore.totalCredits || 0,
        userPackage: userBefore.userPackage || "Free Plan",
        subscriptionStatus: userBefore.subscriptionStatus || "inactive",
      },
      after: {
        userCredits: userAfter.userCredits || 0,
        totalCredits: userAfter.totalCredits || 0,
        userPackage: userAfter.userPackage,
        subscriptionStatus: userAfter.subscriptionStatus,
        lastPaymentDate: userAfter.lastPaymentDate,
      },
      creditsDifference: {
        userCredits:
          (userAfter.userCredits || 0) - (userBefore.userCredits || 0),
        totalCredits:
          (userAfter.totalCredits || 0) - (userBefore.totalCredits || 0),
      },
    });
  } catch (error) {
    console.error("❌ Error in manual credit update:", error);
    return NextResponse.json(
      {
        error: "Failed to update credits",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
