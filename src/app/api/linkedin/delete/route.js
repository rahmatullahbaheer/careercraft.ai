import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const itemId = searchParams.get("id");

    if (!type || !itemId) {
      return NextResponse.json(
        { error: "Type and ID are required" },
        { status: 400 }
      );
    }

    await startDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let arrayField;
    switch (type) {
      case "headline":
        arrayField = "linkedInHeadlines";
        break;
      case "about":
        arrayField = "linkedInAbouts";
        break;
      case "jobDescription":
        arrayField = "linkedInJobDescriptions";
        break;
      case "keywords":
        arrayField = "linkedInKeywords";
        break;
      default:
        return NextResponse.json(
          { error: "Invalid content type" },
          { status: 400 }
        );
    }

    // Remove the item from the array
    user[arrayField] = user[arrayField].filter((item) => item._id !== itemId);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting LinkedIn content:", error);
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    );
  }
}
