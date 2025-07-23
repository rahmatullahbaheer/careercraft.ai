"use client";

import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function HeadSection() {
  const userData = useSelector((state) => state.userData);
  const router = useRouter();

  // Dashboard cards data with navigation
  const dashboardCards = [
    {
      title: `${userData?.firstName || "User"} ${
        userData?.lastName || "Profile"
      }`,
      description: "Manage your profile settings and personal information",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
      path: "/profile",
      bgColor: "bg-blue-500",
      borderColor: "border-blue-500",
    },
    {
      title: "My Resume",
      description: "Create and manage your professional resume",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
      path: "/resume-builder",
      bgColor: "bg-green-500",
      borderColor: "border-green-500",
    },
    {
      title: "LinkedIn Optimizer",
      description: "Optimize your LinkedIn profile for better visibility",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
      path: "/linkedinoptimizer",
      bgColor: "bg-purple-500",
      borderColor: "border-purple-500",
    },
    {
      title: "Billing Details",
      description: "Manage your subscription and billing information",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.268-.268-1.943-.746-1.612-1.14-1.612-3.632 0-4.772 1.086-.767 2.8-.767 3.886 0l.886.59m-4.829 5.273V3m0 18v-2.273"
          />
        </svg>
      ),
      path: "/billing",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-500",
    },
  ];

  const handleCardClick = (path) => {
    router.push(path);
  };

  return (
    <div className=" w-full p-5 bg-white rounded-md shadow-[0px_3px_5px_0px_rgba(46,38,61,0.10)] inline-flex flex-col justify-center items-start gap-5">
      <div className=" h-8 ">
        <div className="justify-start text-gray-800 text-2xl font-medium font-['Inter'] capitalize leading-loose">
          dashboard
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.path)}
            className={`w-full h-32 px-5 bg-white rounded-md shadow-[0px_1px_5px_0px_rgba(46,38,61,0.10)] border-b ${card.borderColor} inline-flex flex-col justify-start items-start cursor-pointer hover:shadow-[0px_4px_10px_0px_rgba(46,38,61,0.15)] transition-all duration-200`}
          >
            <div className="w-full flex-1 inline-flex justify-start items-center gap-3">
              <div
                className={`w-10 h-10 p-2 ${card.bgColor} rounded-md shadow-[0px_2px_4px_0px_rgba(46,38,61,0.16)] flex justify-center items-center flex-wrap content-center`}
              >
                {card.icon}
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start">
                <div className="w-full text-gray-800 justify-start text-base font-medium font-['Inter'] leading-snug">
                  {card.title}
                </div>
                <div className="w-full text-gray-600 text-sm font-normal font-['Inter'] leading-5 mt-1">
                  {card.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeadSection;
