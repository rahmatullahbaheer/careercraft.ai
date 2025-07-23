import { NextResponse } from "next/server";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export async function GET() {
  try {
    await startDB();

    // Get total users count (excluding admin users)
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });

    // Get active users (users with status: true)
    const activeUsers = await User.countDocuments({
      role: { $ne: "admin" },
      status: true,
    });

    // Get inactive users
    const inactiveUsers = await User.countDocuments({
      role: { $ne: "admin" },
      $or: [
        { status: false },
        { status: { $exists: false } },
        { status: null },
      ],
    });

    // Get free users (userPackage contains "Free Plan" or is empty/null)
    const freeUsers = await User.countDocuments({
      role: { $ne: "admin" },
      $or: [
        { userPackage: /free/i },
        { userPackage: /Free Plan/i },
        { userPackage: { $exists: false } },
        { userPackage: null },
        { userPackage: "" },
      ],
    });

    // Get paid users (userPackage exists and doesn't contain "free")
    const paidUsers = await User.countDocuments({
      role: { $ne: "admin" },
      userPackage: {
        $exists: true,
        $ne: null,
        $ne: "",
        $not: /free/i,
      },
    });

    const stats = {
      totalUsers,
      activeUsers,
      inactiveUsers,
      paidUsers,
      freeUsers,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}
