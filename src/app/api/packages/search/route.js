import Package from "@/db/schemas/Package";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Search packages
export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q") || "";
  const limit = Number(url.searchParams.get("limit")) || 10;
  const page = Number(url.searchParams.get("page")) || 1;
  const status = url.searchParams.get("status");
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");
  const skip = (page - 1) * limit;

  try {
    await startDB();

    // Build search filter
    const filter = {};

    // Text search on name and description
    if (query.trim()) {
      filter.$or = [
        { name: { $regex: query.trim(), $options: "i" } },
        { description: { $regex: query.trim(), $options: "i" } },
        { stripePriceLine: { $regex: query.trim(), $options: "i" } },
      ];
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const packages = await Package.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Package.countDocuments(filter);

    return NextResponse.json({
      result: packages,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
      query: query,
      success: true,
    });
  } catch (error) {
    console.error("Error searching packages:", error);
    return NextResponse.json(
      {
        result: "Something went wrong while searching packages",
        success: false,
      },
      { status: 500 }
    );
  }
}
