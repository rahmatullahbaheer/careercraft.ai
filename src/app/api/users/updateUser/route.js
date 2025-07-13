import User from "@/db/schemas/User";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const _body = await req.json();

    const newFile = _body.newFile;
    const email = _body.email;
    const creditsUsed = _body?.creditsUsed;
    const userCredits = await getUserCreditsByEmail(email);

    if (newFile && email) {
      if (userCredits) {
        if (userCredits < creditsUsed) {
          return NextResponse.json(
            { result: "Insufficient Credits", success: false },
            { status: 429 }
          );
        }
      }
      await startDB();

      try {
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          { $push: { files: newFile } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (updatedUser) {
          await updateUserTotalCredits(email, creditsUsed);

          return NextResponse.json(
            {
              result: "Success Record Updated",
              success: true,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              result: "User not found",
              success: false,
            },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          {
            result: "Error Updating User",
            success: false,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          result: "Bad Request. Both 'newFile' and 'email' are required.",
          success: false,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        result: "Something Went Wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
