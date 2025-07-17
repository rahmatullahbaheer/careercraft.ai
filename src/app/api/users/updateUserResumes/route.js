import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const _body = await req.json();
  const email = _body.email;
  const resumes = _body.resumes;

  if (!email || !resumes) {
    return NextResponse.json(
      {
        result: "Bad Request",
        success: false,
      },
      { status: 400 }
    );
  }
  if (session) {
    try {
      await startDB();
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json(
          {
            result: "User not found",
            success: false,
          },
          { status: 404 }
        );
      }

      user.resumes = resumes;

      await user.save();

      return NextResponse.json(
        {
          result: "successful",
          success: true,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          result: "Error updating resumes",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        result: "Not Authorised",
        success: false,
      },
      {
        status: 401,
      }
    );
  }
}
