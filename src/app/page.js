import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to signup page as the main entry point
  redirect("/signup");
}
