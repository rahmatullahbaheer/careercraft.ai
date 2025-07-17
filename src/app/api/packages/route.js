import Package from "@/db/schemas/Package";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Fetch all packages
export async function GET(req) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const page = Number(url.searchParams.get("page")) || 1;
  const status = url.searchParams.get("status");
  const skip = (page - 1) * limit;

  try {
    await startDB();

    // Build query filter
    const filter = {};
    if (status) {
      filter.status = status;
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
      success: true,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      {
        result: "Something went wrong while fetching packages",
        success: false,
      },
      { status: 500 }
    );
  }
}

// POST - Create a new package
export async function POST(req) {
  try {
    await startDB();

    const body = await req.json();
    const { name, stripePriceLine, price, description, features, status } =
      body;

    // Validation
    if (!name || !stripePriceLine || price === undefined || price === null) {
      return NextResponse.json(
        {
          result: "Name, stripe price line, and price are required fields",
          success: false,
        },
        { status: 400 }
      );
    }

    if (price < 0) {
      return NextResponse.json(
        {
          result: "Price must be a positive number",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if package with same name already exists
    const existingPackage = await Package.findOne({ name: name.trim() });
    if (existingPackage) {
      return NextResponse.json(
        {
          result: "Package with this name already exists",
          success: false,
        },
        { status: 400 }
      );
    }

    const newPackage = new Package({
      name: name.trim(),
      stripePriceLine: stripePriceLine.trim(),
      price: Number(price),
      description: description?.trim() || "",
      features: features || [],
      status: status || "active",
    });

    const savedPackage = await newPackage.save();

    return NextResponse.json(
      {
        result: savedPackage,
        message: "Package created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      {
        result: "Something went wrong while creating package",
        success: false,
      },
      { status: 500 }
    );
  }
}
