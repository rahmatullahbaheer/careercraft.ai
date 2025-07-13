import { updateUserCreditsByAdmin } from "@/helpers/updateUserCreditsByAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const email = body.email;
  const credits = body.credits;

  try {
    await updateUserCreditsByAdmin(email, credits);
    return NextResponse.json(
      {
        result: "Record Updated",
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        result: "Error Updating User Credits",
        success: false,
      },
      { status: 500 }
    );
  }
}
