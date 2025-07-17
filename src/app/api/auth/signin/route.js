// Sign-in API endpoint
import { NextResponse } from "next/server";
import { getUserByEmail } from "../../../../db/schemas/user-helpers";
import { compare } from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const isValid = await compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  // You can add JWT or session logic here
  return NextResponse.json({
    message: "Sign-in successful",
    user: { email: user.email, name: user.name },
  });
}
