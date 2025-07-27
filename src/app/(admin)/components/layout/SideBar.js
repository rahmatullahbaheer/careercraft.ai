"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  User,
  UserCircle,
  LogOut,
  Lock,
} from "lucide-react";

const selectionMenu = [
  { label: "Dashboards", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Resume Prompt", icon: FileText, path: "/resume-prompt" },
  { label: "Linkedin Prompt", icon: Users, path: "/linkedin" },
  { label: "Packages", icon: Package, path: "/packages" },
  { label: "Users", icon: Users, path: "/users" },
  { label: "Profile", icon: UserCircle, path: "/admin-profile" },
  { label: "Change Password", icon: Lock, path: "/change-password-admin" },
  { label: "Logout", icon: LogOut, path: "/logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
      return; // User cancelled logout
    }

    try {
      // Clear any stored data (like PDF text or other session data)
      if (typeof window !== "undefined") {
        localStorage.removeItem("pdfText");
        // You can add more localStorage items to clear if needed
        // localStorage.clear(); // Use this to clear all localStorage data
      }

      await signOut({
        redirect: false, // Don't redirect automatically
      });

      // Redirect to signup page after logout
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      // Show error message to user
      alert("Failed to logout. Please try again.");
    }
  };

  const handleMenuClick = (item) => {
    if (item.path === "/logout") {
      handleLogout();
    } else {
      router.push(item.path);
    }
  };

  return (
    <div className="shadow-[1px_1px_24px_0px_rgba(46,38,61,0.06)] h-screen w-64 flex flex-col justify-start items-start overflow-hidden bg-slate-100">
      {/* Logo Section */}
      <div className="px-9 py-4 w-full flex justify-center bg-slate-100 items-start">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="object-cover w-32"
        />
      </div>

      {/* Menu Section */}
      <div className="w-64 flex-1 pr-4 pb-2 bg-slate-100 flex flex-col justify-start items-start">
        <div className="px-5 py-2.5 inline-flex justify-start items-center">
          <div className="w-52 inline-flex flex-col justify-start items-start gap-2.5">
            {selectionMenu.map((item, index) => {
              const isActive =
                item.path !== "/logout" && pathname.startsWith(item.path); // Don't highlight logout as active
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  className={`self-stretch h-10 px-5 py-2 text-left ${
                    isActive
                      ? "bg-gradient-to-l from-violet-500 to-violet-300 text-white shadow-[0px_4px_8px_-4px_rgba(58,53,65,0.42)]"
                      : "bg-zinc-700/5 text-neutral-600"
                  } rounded-tr-[50px] rounded-br-[50px] cursor-pointer flex items-center gap-2 transition duration-200 ease-in-out`}
                >
                  <Icon size={18} />
                  <span className="text-base font-normal font-['Inter'] leading-normal tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
