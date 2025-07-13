// Sign-up API endpoint
import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "../../../db/schemas/User";
import { hash } from "bcryptjs";

export async function POST(req) {
  const { email, password, name } = await req.json();
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const hashedPassword = await hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, name });
  return NextResponse.json({
    message: "Sign-up successful",
    user: { email: user.email, name: user.name },
  });
}
