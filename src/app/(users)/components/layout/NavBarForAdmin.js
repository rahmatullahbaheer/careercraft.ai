"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const NavBarForAdmin = () => {
  const [profileImage, setProfileImage] = useState("");

  // Load profile image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    // Listen for localStorage changes (when image is updated from profile page)
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem("profileImage");
      setProfileImage(updatedImage || "");
    };

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events (for same-tab updates)
    window.addEventListener("profileImageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileImageUpdated", handleStorageChange);
    };
  }, []);
  return (
    <div className="w-full h-16 fixed left-0 top-0 ">
      <div className="w-full h-16 py-2 left-0 top-0 absolute bg-slate-100 shadow-[0px_4px_19px_0px_rgba(0,0,0,0.03)] inline-flex justify-start items-center overflow-hidden">
        <div className="flex-1 pr-6 py-1 flex justify-end items-center">
          <div
            data-color="Primary"
            data-font-size="Medium"
            data-hover="False"
            data-size="Medium"
            className="w-12 inline-flex flex-col justify-center items-start"
          ></div>
          <div
            data-badge="True"
            data-icon="False"
            data-image="True"
            data-variant="Circle"
            className="w-10 h-10 flex justify-center items-start gap-2.5"
          >
            <div className="flex-1 self-stretch relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <Image
                  src="/images/Avatar.png"
                  alt="Default Avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to a default avatar if the image fails to load
                    e.target.src =
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                  }}
                />
              )}
              <div className="w-3 h-3 left-[28px] top-[28px] absolute bg-white rounded-[64px]">
                <div
                  data-color="Primary"
                  data-variant="Dot"
                  className="w-2 h-2 left-[2px] top-[2px] absolute"
                >
                  <div className="w-2 h-2 left-0 top-0 absolute bg-lime-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-12 h-7 px-2.5 left-[968px] top-[17px] absolute"></div>
    </div>
  );
};

export default NavBarForAdmin;
