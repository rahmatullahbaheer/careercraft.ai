import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const url = new URL(req.url);

    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          result: "Bad Request",
          success: false,
        },
        { status: 400 }
      );
    }

    await startDB();

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        {
          result: "No User Found",
          success: false,
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          result: {
            userCredits: user.userCredits,
            totalCredits: user.totalCredits,
          },
          success: true,
        },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        result: "Something Went Wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
