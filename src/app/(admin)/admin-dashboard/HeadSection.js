"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

function HeadSection() {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    paidUsers: 0,
    freeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user statistics from API
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users/stats");
      if (response.ok) {
        const data = await response.json();
        setUserStats(data);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: "Total Users",
      count: userStats.totalUsers,
      icon: "/icons/1.png",
      bgColor: "bg-blue-500",
      borderColor: "border-blue-500",
    },
    {
      title: "Active Users",
      count: userStats.activeUsers,
      icon: "/icons/active.png",
      bgColor: "bg-green-500",
      borderColor: "border-green-500",
    },
    {
      title: "Inactive Users",
      count: userStats.inactiveUsers,
      icon: "/icons/2.png",
      bgColor: "bg-gray-500",
      borderColor: "border-gray-500",
    },
    {
      title: "Paid Users",
      count: userStats.paidUsers,
      icon: "/icons/setting.png",
      bgColor: "bg-purple-500",
      borderColor: "border-purple-500",
    },
    {
      title: "Free Users",
      count: userStats.freeUsers,
      icon: "/icons/2.png",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-500",
    },
  ];

  return (
    <div className=" w-full p-5 bg-white rounded-md shadow-[0px_3px_5px_0px_rgba(46,38,61,0.10)] inline-flex flex-col justify-center items-start gap-5">
      <div className=" h-8 ">
        <div className="justify-start text-gray-800 text-2xl font-medium font-['Inter'] capitalize leading-loose">
          dashboard
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className={`w-full h-32 px-5 bg-white rounded-md shadow-[0px_1px_5px_0px_rgba(46,38,61,0.10)] border-b ${card.borderColor} inline-flex flex-col justify-start items-start`}
          >
            <div className="w-full flex-1 inline-flex justify-start items-center gap-3">
              <div
                className={`w-10 h-10 p-2 ${card.bgColor} rounded-md shadow-[0px_2px_4px_0px_rgba(46,38,61,0.16)] flex justify-center items-center flex-wrap content-center`}
              >
                <Image src={card.icon} alt="icon" width={24} height={24} />
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start">
                <div className="w-full justify-start text-gray-600 text-base font-normal font-['Inter'] leading-snug">
                  {card.title}
                </div>
                <div className="self-stretch justify-start text-gray-900 text-lg font-medium font-['Inter'] leading-7">
                  {loading ? "..." : card.count}
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
