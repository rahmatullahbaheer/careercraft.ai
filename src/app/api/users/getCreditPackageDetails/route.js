import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import Package from "@/db/schemas/Package";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: `Not Authorised`, success: false },
      { status: 401 }
    );
  }
  try {
    const url = new URL(req.url);

    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          result: "Bad Request: No email found",
        },
        { status: 400 }
      );
    }

    await startDB();

    const creditPackage = await Package.findById(id);

    if (!creditPackage) {
      return NextResponse.json(
        {
          result: "No User Package Found",
          success: false,
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          result: creditPackage,
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
