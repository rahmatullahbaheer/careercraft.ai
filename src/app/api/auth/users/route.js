import startDB from "../../../../lib/db";
import { NextResponse } from "next/server";
import User from "../../../../db/schemas/User.js";

export const POST = async (req) => {
  try {
    const body = await req.json();
    await startDB();

    const oldUser = await User.findOne({ email: body.email });
    if (oldUser) {
      return NextResponse.json(
        {
          error: "An account with the same email already exist!",
        },
        { status: 400 }
      );
    }

    // Remove linkedin field if it's null or undefined to avoid unique constraint issues
    const userData = { ...body };
    if (!userData.linkedin) {
      delete userData.linkedin;
    }

    const user = await User.create(userData);

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        alertConsent: user.alertConsent,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      errors: error.errors,
    });

    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        {
          error: `An account with this ${field} already exists!`,
        },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          error: `Validation failed: ${validationErrors.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: "Failed to create user. Please try again.",
      },
      { status: 500 }
    );
  }
};
