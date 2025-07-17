import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

// GET: Fetch user billing/stats data
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
      "firstName lastName email phone contact resumes coverLetters userCredits totalCredits userPackage"
    );

    if (!user) {
      return NextResponse.json(
        { result: "User not found", success: false },
        { status: 404 }
      );
    }

    // Calculate billing stats
    const billingData = {
      // User Info
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.contact?.cityState || "",

      // Usage Stats
      generatedResumes: user.resumes?.length || 0,
      generatedCoverLetters: user.coverLetters?.length || 0,
      remainingCredits: user.userCredits || 0,
      totalCreditsUsed: (user.totalCredits || 0) - (user.userCredits || 0),

      // Package Info
      currentPackage: user.userPackage || "Free Plan",
    };

    return NextResponse.json({
      result: billingData,
      success: true,
    });
  } catch (error) {
    console.error("Billing data fetch error:", error);
    return NextResponse.json(
      { result: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
