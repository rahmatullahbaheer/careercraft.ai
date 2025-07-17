import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import CreditsLimit from "@/db/schemas/CreditsLimit";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  //   const creditId = params.creditId;
  const payload = await req.json();

  try {
    await startDB();

    let updatedCreditLimits = await CreditsLimit.findOneAndReplace(
      {},
      payload,
      {
        new: true,
      }
    );

    return NextResponse.json({ result: updatedCreditLimits, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: `Not Authorised`, success: false },
      { status: 401 }
    );
  }
  try {
    await startDB();

    const creditLimits = await CreditsLimit.find({});

    return NextResponse.json(
      {
        result: creditLimits[0],
        success: true,
      },
      { status: 200 }
    );
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
