import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

// GET: Get user's payment status and credit information
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { result: "Not Authorized", success: false },
        { status: 401 }
      );
    }

    await startDB();

    // Find user by email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { result: "User not found", success: false },
        { status: 404 }
      );
    }

    // Return payment status and credit information
    const paymentStatus = {
      userCredits: user.userCredits || 0,
      totalCredits: user.totalCredits || 0,
      userPackage: user.userPackage || "Free",
      creditPackage: user.creditPackage || null,
      lastPaymentDate: user.lastPaymentDate || null,
      subscriptionStatus: user.subscriptionStatus || "inactive",
      paymentHistory: user.paymentHistory || [],
    };

    return NextResponse.json({
      result: paymentStatus,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return NextResponse.json(
      { result: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
