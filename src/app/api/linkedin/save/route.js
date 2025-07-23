import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, content, title } = body;

    if (!type || !content) {
      return NextResponse.json(
        { error: "Type and content are required" },
        { status: 400 }
      );
    }

    await startDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the content object
    const contentObject = {
      _id: new Date().getTime().toString(), // Simple ID generation
      content: content,
      title: title || `${type} - ${new Date().toLocaleDateString()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to the appropriate array based on type
    switch (type) {
      case "headline":
        user.linkedInHeadlines.push(contentObject);
        break;
      case "about":
        user.linkedInAbouts.push(contentObject);
        break;
      case "jobDescription":
        user.linkedInJobDescriptions.push(contentObject);
        break;
      case "keywords":
        user.linkedInKeywords.push(contentObject);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid content type" },
          { status: 400 }
        );
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Content saved successfully",
      data: contentObject,
    });
  } catch (error) {
    console.error("Error saving LinkedIn content:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
