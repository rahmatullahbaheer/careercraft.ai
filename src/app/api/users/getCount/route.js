import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
const ObjectId = require("mongodb").ObjectId;

export async function GET(req) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  const skip = (page - 1) * limit;
  // console.log(page);
  try {
    await startDB();

    // Get the current date
    const currentDate = new Date();
    // Get the first day of the current month
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    // Get the last day of the current month
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    // Calculate the date of 1 week ago
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    // Get the first day of the current year
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);

    // QUERIES
    const total = await User.count();
    const thisMonth = await User.countDocuments({
      createdAt: { $gt: firstDay, $lt: lastDay },
    });
    const thisWeek = await User.countDocuments({
      createdAt: { $gt: oneWeekAgo, $lt: currentDate },
    });
    const thisYear = await User.countDocuments({
      createdAt: { $gt: firstDayOfYear, $lt: currentDate },
    });

    const activeUser = await User.countDocuments({
      status: true,
    });

    const userPackageId = new ObjectId("65144e9817dd55f9a2e3ff6c");

    const freeUser = await User.countDocuments({
      userPackage: userPackageId,
    });

    const paidUser = await User.countDocuments({
      userPackage: { $ne: userPackageId },
    });

    return NextResponse.json({
      total,
      thisMonth,
      thisWeek,
      thisYear,
      activeUser,
      paidUser,
      freeUser,
      success: true,
    });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}
