import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

// GET: Fetch user profile data
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
      "-password -userCredits -totalCredits -OpenAiTokensUsed -role -files -emails -resumes -coverLetters -consultingBids -linkedInAbouts -linkedInHeadlines -linkedInJobDescriptions -linkedInKeywords -uploadedResume -chatThreads -redeemedCoupons -tours"
    );

    if (!user) {
      return NextResponse.json(
        { result: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      result: user,
      success: true,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { result: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

// PUT: Update user profile data
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { result: "Not Authorized", success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, phone, contact, skills, summary } = body;

    // Validate required fields
    if (!firstName || !lastName) {
      return NextResponse.json(
        { result: "First name and last name are required", success: false },
        { status: 400 }
      );
    }

    await startDB();

    // Build update object with only provided fields
    const updateData = {};
    if (firstName) updateData.firstName = firstName.trim();
    if (lastName) updateData.lastName = lastName.trim();
    if (phone) updateData.phone = phone.trim();
    if (summary) updateData.summary = summary.trim();
    if (skills && Array.isArray(skills)) updateData.skills = skills;
    if (contact) {
      updateData.contact = {
        country: contact.country || "",
        street: contact.street || "",
        cityState: contact.cityState || "",
        postalCode: contact.postalCode || "",
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select(
      "-password -userCredits -totalCredits -OpenAiTokensUsed -role -files -emails -resumes -coverLetters -consultingBids -linkedInAbouts -linkedInHeadlines -linkedInJobDescriptions -linkedInKeywords -uploadedResume -chatThreads -redeemedCoupons -tours"
    );

    if (!updatedUser) {
      return NextResponse.json(
        { result: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      result: updatedUser,
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Profile update error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { result: "Validation error: " + error.message, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { result: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
