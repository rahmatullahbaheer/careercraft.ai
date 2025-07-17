import Package from "@/db/schemas/Package";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET - Fetch single package by ID
export async function GET(req, { params }) {
  try {
    await startDB();

    const { packageId } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json(
        {
          result: "Invalid package ID",
          success: false,
        },
        { status: 400 }
      );
    }

    const packageData = await Package.findById(packageId);

    if (!packageData) {
      return NextResponse.json(
        {
          result: "Package not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      result: packageData,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      {
        result: "Something went wrong while fetching package",
        success: false,
      },
      { status: 500 }
    );
  }
}

// PUT - Update package by ID
export async function PUT(req, { params }) {
  try {
    await startDB();

    const { packageId } = params;
    const body = await req.json();
    const { name, stripePriceLine, price, description, features, status } =
      body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json(
        {
          result: "Invalid package ID",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if package exists
    const existingPackage = await Package.findById(packageId);
    if (!existingPackage) {
      return NextResponse.json(
        {
          result: "Package not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Validation
    if (name && name.trim() !== existingPackage.name) {
      // Check if another package with same name exists
      const duplicatePackage = await Package.findOne({
        name: name.trim(),
        _id: { $ne: packageId },
      });
      if (duplicatePackage) {
        return NextResponse.json(
          {
            result: "Package with this name already exists",
            success: false,
          },
          { status: 400 }
        );
      }
    }

    if (price !== undefined && price < 0) {
      return NextResponse.json(
        {
          result: "Price must be a positive number",
          success: false,
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (stripePriceLine !== undefined)
      updateData.stripePriceLine = stripePriceLine.trim();
    if (price !== undefined) updateData.price = Number(price);
    if (description !== undefined) updateData.description = description.trim();
    if (features !== undefined) updateData.features = features;
    if (status !== undefined) updateData.status = status;

    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      result: updatedPackage,
      message: "Package updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      {
        result: "Something went wrong while updating package",
        success: false,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete package by ID
export async function DELETE(req, { params }) {
  try {
    await startDB();

    const { packageId } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json(
        {
          result: "Invalid package ID",
          success: false,
        },
        { status: 400 }
      );
    }

    const deletedPackage = await Package.findByIdAndDelete(packageId);

    if (!deletedPackage) {
      return NextResponse.json(
        {
          result: "Package not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      result: deletedPackage,
      message: "Package deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      {
        result: "Something went wrong while deleting package",
        success: false,
      },
      { status: 500 }
    );
  }
}
