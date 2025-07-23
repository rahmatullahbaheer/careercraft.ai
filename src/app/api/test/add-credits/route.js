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
    const { credits, packageName = "Test Package" } = body;

    if (!credits || credits <= 0) {
      return NextResponse.json(
        { error: "Invalid credits amount" },
        { status: 400 }
      );
    }

    await startDB();

    // Get current user data before update
    const userBefore = await User.findOne({ email: session.user.email }).select(
      "userCredits totalCredits userPackage subscriptionStatus"
    );

    if (!userBefore) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User before credit update:", {
      email: session.user.email,
      userCredits: userBefore.userCredits,
      totalCredits: userBefore.totalCredits,
      userPackage: userBefore.userPackage,
      subscriptionStatus: userBefore.subscriptionStatus,
    });

    // Add credits
    await updateUserCreditsByAdmin(
      session.user.email,
      credits,
      `Test: ${packageName}`
    );

    // Update user package and subscription status
    await User.findOneAndUpdate(
      { email: session.user.email },
      {
        userPackage: packageName,
        subscriptionStatus: "active",
        lastPaymentDate: new Date(),
      }
    );

    // Get updated user data
    const userAfter = await User.findOne({ email: session.user.email }).select(
      "userCredits totalCredits userPackage subscriptionStatus lastPaymentDate"
    );

    console.log("User after credit update:", {
      email: session.user.email,
      userCredits: userAfter.userCredits,
      totalCredits: userAfter.totalCredits,
      userPackage: userAfter.userPackage,
      subscriptionStatus: userAfter.subscriptionStatus,
      lastPaymentDate: userAfter.lastPaymentDate,
    });

    return NextResponse.json({
      success: true,
      message: "Credits added successfully",
      before: {
        userCredits: userBefore.userCredits,
        totalCredits: userBefore.totalCredits,
        userPackage: userBefore.userPackage,
        subscriptionStatus: userBefore.subscriptionStatus,
      },
      after: {
        userCredits: userAfter.userCredits,
        totalCredits: userAfter.totalCredits,
        userPackage: userAfter.userPackage,
        subscriptionStatus: userAfter.subscriptionStatus,
        lastPaymentDate: userAfter.lastPaymentDate,
      },
    });
  } catch (error) {
    console.error("Error adding test credits:", error);
    return NextResponse.json(
      {
        error: "Failed to add credits",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
