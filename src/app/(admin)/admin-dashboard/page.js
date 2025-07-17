"use client";
import React, { Suspense } from "react";
import HeadSection from "./HeadSection";

const AdminDashboardContent = () => {
  return <HeadSection />;
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
};

export default page;
