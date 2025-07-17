import Package from "@/db/schemas/Package";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// POST - Bulk delete packages
export async function POST(req) {
  try {
    await startDB();

    const body = await req.json();
    const { packageIds, action } = body;

    if (!packageIds || !Array.isArray(packageIds) || packageIds.length === 0) {
      return NextResponse.json(
        {
          result: "Package IDs array is required",
          success: false,
        },
        { status: 400 }
      );
    }

    // Validate all ObjectIds
    const invalidIds = packageIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidIds.length > 0) {
      return NextResponse.json(
        {
          result: `Invalid package IDs: ${invalidIds.join(", ")}`,
          success: false,
        },
        { status: 400 }
      );
    }

    let result;
    let message;

    switch (action) {
      case "delete":
        result = await Package.deleteMany({ _id: { $in: packageIds } });
        message = `${result.deletedCount} packages deleted successfully`;
        break;

      case "activate":
        result = await Package.updateMany(
          { _id: { $in: packageIds } },
          { status: "active" }
        );
        message = `${result.modifiedCount} packages activated successfully`;
        break;

      case "deactivate":
        result = await Package.updateMany(
          { _id: { $in: packageIds } },
          { status: "inactive" }
        );
        message = `${result.modifiedCount} packages deactivated successfully`;
        break;

      default:
        return NextResponse.json(
          {
            result:
              "Invalid action. Supported actions: delete, activate, deactivate",
            success: false,
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      result: result,
      message: message,
      success: true,
    });
  } catch (error) {
    console.error("Error in bulk operation:", error);
    return NextResponse.json(
      {
        result: "Something went wrong during bulk operation",
        success: false,
      },
      { status: 500 }
    );
  }
}
