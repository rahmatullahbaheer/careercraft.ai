import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const page = Number(url.searchParams.get("page")) || 1;
  const search = url.searchParams.get("search") || "";
  const status = url.searchParams.get("status") || ""; // active, inactive, all
  const skip = (page - 1) * limit;

  try {
    await startDB();

    // Build filter object
    let filter = { role: { $ne: "admin" } }; // Exclude admin users

    // Add search filter if provided
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { registeredPhone: { $regex: search, $options: "i" } },
      ];
    }

    // Add status filter if provided
    if (status === "active") {
      filter.isActive = { $ne: false };
    } else if (status === "inactive") {
      filter.isActive = false;
    }

    // Get users with pagination
    const userDetails = await User.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select(
        "firstName lastName email phone registeredPhone role isActive createdAt updatedAt"
      );

    // Get total count with same filter
    const total = await User.countDocuments(filter);

    // Get user statistics
    const stats = await User.aggregate([
      { $match: { role: { $ne: "admin" } } },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: {
            $sum: {
              $cond: [{ $ne: ["$isActive", false] }, 1, 0],
            },
          },
          inactiveUsers: {
            $sum: {
              $cond: [{ $eq: ["$isActive", false] }, 1, 0],
            },
          },
        },
      },
    ]);

    return NextResponse.json({
      result: userDetails,
      total: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit: limit,
      stats: stats[0] || { totalUsers: 0, activeUsers: 0, inactiveUsers: 0 },
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

export async function PATCH(req) {
  try {
    await startDB();

    const { userId, action, data } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          result: "User ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    let updateResult;

    switch (action) {
      case "toggle-status":
        // Toggle user active status
        const user = await User.findById(userId);
        if (!user) {
          return NextResponse.json(
            {
              result: "User not found",
              success: false,
            },
            { status: 404 }
          );
        }

        updateResult = await User.findByIdAndUpdate(
          userId,
          { isActive: !user.isActive },
          { new: true }
        );
        break;

      case "update-info":
        // Update user information
        updateResult = await User.findByIdAndUpdate(
          userId,
          { ...data, updatedAt: new Date() },
          { new: true }
        );
        break;

      default:
        return NextResponse.json(
          {
            result: "Invalid action",
            success: false,
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      result: updateResult,
      message: "User updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating user:", error);
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

export async function DELETE(req) {
  try {
    await startDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const userIds = searchParams.get("userIds")?.split(",");

    if (!userId && !userIds?.length) {
      return NextResponse.json(
        {
          result: "User ID(s) required",
          success: false,
        },
        { status: 400 }
      );
    }

    let deleteResult;

    if (userIds?.length) {
      // Bulk delete
      deleteResult = await User.deleteMany({
        _id: { $in: userIds },
        role: { $ne: "admin" }, // Safety check to prevent deleting admin users
      });
    } else {
      // Single delete
      deleteResult = await User.findOneAndDelete({
        _id: userId,
        role: { $ne: "admin" }, // Safety check to prevent deleting admin users
      });
    }

    return NextResponse.json({
      result: deleteResult,
      message: `User(s) deleted successfully`,
      success: true,
    });
  } catch (error) {
    console.error("Error deleting user(s):", error);
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
