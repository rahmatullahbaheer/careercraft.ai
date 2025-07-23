import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { updateUserCreditsByAdmin } from "@/helpers/updateUserCreditsByAdmin";
import User from "@/db/schemas/User";
import Package from "@/db/schemas/Package";
import startDB from "@/lib/db";

// POST: Add credits to user after successful payment
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { result: "Not Authorized", success: false },
        { status: 401 }
      );
    }

    await startDB();

    const { packageId, paymentIntentId, customCredits } = body;

    // Validate required fields
    if (!packageId && !customCredits) {
      return NextResponse.json(
        { result: "Package ID or custom credits required", success: false },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;
    let creditsToAdd = 0;
    let packageName = "Custom Credits";

    // If packageId is provided, get credits from package
    if (packageId) {
      const packageData = await Package.findById(packageId);

      if (!packageData) {
        return NextResponse.json(
          { result: "Package not found", success: false },
          { status: 404 }
        );
      }

      creditsToAdd = packageData.credits || 0;
      packageName = packageData.name;
    } else if (customCredits) {
      // For custom credit amounts
      creditsToAdd = parseInt(customCredits);

      if (isNaN(creditsToAdd) || creditsToAdd <= 0) {
        return NextResponse.json(
          { result: "Invalid credit amount", success: false },
          { status: 400 }
        );
      }
    }

    // Add credits to user account
    if (creditsToAdd > 0) {
      await updateUserCreditsByAdmin(userEmail, creditsToAdd);

      // Update user's package information
      await User.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            userPackage: packageName,
            creditPackage: packageId || "custom",
            lastPaymentDate: new Date(),
            subscriptionStatus: "active",
          },
          $push: {
            paymentHistory: {
              paymentIntentId: paymentIntentId || `manual_${Date.now()}`,
              packageName: packageName,
              creditsAdded: creditsToAdd,
              paymentDate: new Date(),
              amount: 0, // This would be filled from actual payment data
            },
          },
        },
        { new: true }
      );

      // Get updated user data to return
      const updatedUser = await User.findOne({ email: userEmail }).select(
        "userCredits totalCredits userPackage"
      );

      return NextResponse.json(
        {
          result: "Credits added successfully",
          success: true,
          data: {
            creditsAdded: creditsToAdd,
            totalCredits: updatedUser.userCredits,
            packageName: packageName,
            userPackage: updatedUser.userPackage,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { result: "No credits to add", success: false },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error adding credits:", error);
    return NextResponse.json(
      {
        result: "Internal server error",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// GET: Get user's current credit information
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { result: "Not Authorized", success: false },
        { status: 401 }
      );
    }

    await startDB();

    const user = await User.findOne({ email: session.user.email }).select(
      "userCredits totalCredits userPackage creditPackage lastPaymentDate subscriptionStatus paymentHistory"
    );

    if (!user) {
      return NextResponse.json(
        { result: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        result: "Credit information retrieved successfully",
        success: true,
        data: {
          availableCredits: user.userCredits || 0,
          totalCreditsEarned: user.totalCredits || 0,
          creditsUsed: (user.totalCredits || 0) - (user.userCredits || 0),
          currentPackage: user.userPackage || "Free Plan",
          lastPaymentDate: user.lastPaymentDate,
          subscriptionStatus: user.subscriptionStatus || "inactive",
          paymentHistory: user.paymentHistory || [],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching credit information:", error);
    return NextResponse.json(
      {
        result: "Internal server error",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
