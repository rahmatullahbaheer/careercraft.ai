"use client";
import { useSession } from "next-auth/react";
import { Geist, Inter } from "next/font/google";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const geistMono = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }) {
  const { data: session } = useSession();
  console.log("session in root layout", session);
  if (session?.user) {
    if (session?.user?.role === "admin") {
      redirect("/admin-dashboard");
    }
    if (session?.user?.role === "user") {
      redirect("/dashboard");
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
