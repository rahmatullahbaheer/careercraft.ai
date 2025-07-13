import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  const skip = (page - 1) * limit;
  try {
    await startDB();

    const userDetails = await User.find({ role: { $ne: "admin" } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    const total = await User.count();

    return NextResponse.json({
      result: userDetails,
      total: total,

      success: true,
    });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}
