import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET(request) {
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

    await startDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let content = [];
    switch (type) {
      case "headline":
        content = user.linkedInHeadlines || [];
        break;
      case "about":
        content = user.linkedInAbouts || [];
        break;
      case "jobDescription":
        content = user.linkedInJobDescriptions || [];
        break;
      case "keywords":
        content = user.linkedInKeywords || [];
        break;
      case "all":
        content = {
          headlines: user.linkedInHeadlines || [],
          abouts: user.linkedInAbouts || [],
          jobDescriptions: user.linkedInJobDescriptions || [],
          keywords: user.linkedInKeywords || [],
        };
        break;
      default:
        return NextResponse.json(
          { error: "Invalid content type" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Error retrieving LinkedIn content:", error);
    return NextResponse.json(
      { error: "Failed to retrieve content" },
      { status: 500 }
    );
  }
}
