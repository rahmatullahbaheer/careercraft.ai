"use client";
import React, { useState } from "react";
import { Eye, Trash2, FileText, Calendar } from "lucide-react";
import ResumeCard from "./ResumeCard";

const GenerateResumeSection = () => {
  const [resumeType, setResumeType] = useState("job-title");
  const [jobPosition, setJobPosition] = useState("");

  const handleGenerateResume = () => {
    console.log("Generate resume:", { resumeType, jobPosition });
    // Add generation logic here
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Generate New Resume
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Resume Type
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setResumeType("basic")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  resumeType === "basic" ? "bg-purple-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    resumeType === "basic" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">
                Generate Basic Resume
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setResumeType("job-title")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  resumeType === "job-title" ? "bg-purple-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    resumeType === "job-title"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">
                Generate For Job Title
              </span>
            </div>
          </div>
        </div>

        {resumeType === "job-title" && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Enter Your Targeted Job Position
            </h3>
            <input
              type="text"
              placeholder="Enter Your Targeted Job Position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        )}

        <button
          onClick={handleGenerateResume}
          className="px-6 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Generate Resume
        </button>
      </div>
    </div>
  );
};

export default GenerateResumeSection;
