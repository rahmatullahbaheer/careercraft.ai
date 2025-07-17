"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Sidebar from "./components/layout/SideBar";
import NavBarForAdmin from "./components/layout/NavBarForAdmin";
import ProfileCreationLayer from "../(auth)/components/dashboard/ProfileCreationLayer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Check if session is loaded and user is authenticated
    if (status === "authenticated" && session?.user) {
      // If user role is admin, redirect to admin dashboard
      if (session.user.role === "admin") {
        redirect("/admin-dashboard");
      }
    }
  }, [session, status]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileCreationLayer>
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 shrink-0 z-50">
                <Sidebar />
              </div>

              {/* Main Area */}
              <div className="flex flex-col flex-1 overflow-auto">
                {/* Top Navbar */}
                <NavBarForAdmin />

                {/* Page content */}
                <main className="p-6 overflow-y-auto h-full mt-14">
                  {children}
                </main>
              </div>
            </div>
          </ProfileCreationLayer>
        </Suspense>
      </body>
    </html>
  );
}
