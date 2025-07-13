"use client";
import React, { useState } from "react";
import { Eye, Trash2, FileText, Calendar } from "lucide-react";
import ResumeCard from "./ResumeCard";
import GenerateResumeSection from "./GenerateResumeSection";

const page = () => {
  // Sample resume data
  const resumes = [
    {
      id: 1,
      title: "MERN Developer",
      jobTitle: "Job Title",
      date: "Mar 7, 2025, 6:00 PM",
    },
    {
      id: 2,
      title: "Backend",
      jobTitle: "Job Title",
      date: "May 7, 2025, 1:00 AM",
    },
    {
      id: 3,
      title: "Baheer",
      jobTitle: "Job Title",
      date: "Jan 7, 2025, 12:00 AM",
    },
  ];

  const handleView = (resumeId) => {
    console.log("View resume:", resumeId);
    // Add navigation logic here
  };

  const handleDelete = (resumeId) => {
    console.log("Delete resume:", resumeId);
    // Add delete logic here
  };

  return (
    <div className="max-w-7xl mx-auto border border-gray-200 shadow-xl  rounded p-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-gray-900">Your Resumes</h1>
      </div>

      <div className="grid grid-cols-1 mb-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <ResumeCard
            key={resume.id}
            title={resume.title}
            jobTitle={resume.jobTitle}
            date={resume.date}
            onView={() => handleView(resume.id)}
            onDelete={() => handleDelete(resume.id)}
          />
        ))}
      </div>

      <GenerateResumeSection />

      {resumes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No resumes yet
          </h3>
          <p className="text-gray-500">
            Create your first resume to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
