import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const page = Number(url.searchParams.get("page")) || 1;
  const skip = (page - 1) * limit;

  try {
    await startDB();

    // Filter to exclude admin users
    const filter = { role: { $ne: "admin" } };

    // Get users with pagination
    const userDetails = await User.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select(
        "firstName lastName email phone registeredPhone role isActive createdAt"
      );

    // Get total count of non-admin users only
    const total = await User.countDocuments(filter);

    return NextResponse.json({
      result: userDetails,
      total: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit: limit,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        result: "Something Went Wrong",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
