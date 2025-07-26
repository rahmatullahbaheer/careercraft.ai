"use client";
import React, { useState } from "react";
import { Eye, Trash2, FileText, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setState } from "@/store/resumeSlice";
import { useSession } from "next-auth/react";
import ResumeCard from "./ResumeCard";

const GenerateResumeSection = () => {
  const [resumeType, setResumeType] = useState("basic");
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleGenerateResume = async () => {
    if (!session?.user?.email) {
      alert("Please sign in to generate a resume");
      return;
    }

    // Validate inputs based on resume type
    if (resumeType === "job-title" && !jobPosition.trim()) {
      alert("Please enter a job position");
      return;
    }

    if (resumeType === "job-description" && !jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    setIsGenerating(true);

    try {
      // Set the resume type and related data in Redux store
      const resumeTypeValue =
        resumeType === "basic"
          ? "resume-basic"
          : resumeType === "job-title"
          ? "resume-job-title"
          : "resume-job-description";

      dispatch(setState({ resumeType: resumeTypeValue }));

      if (resumeType === "job-title") {
        dispatch(setState({ jobPosition: jobPosition.trim() }));
        dispatch(setState({ jobDescription: "" }));
      } else if (resumeType === "job-description") {
        dispatch(setState({ jobDescription: jobDescription.trim() }));
        dispatch(setState({ jobPosition: "" }));
      } else {
        dispatch(setState({ jobPosition: "" }));
        dispatch(setState({ jobDescription: "" }));
      }

      // Navigate to resume builder with auto-generate flag
      router.push("/resume-builder?autoGenerate=true");
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => setResumeType("job-description")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  resumeType === "job-description"
                    ? "bg-purple-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    resumeType === "job-description"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">
                Generate For Job Description
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
              placeholder="e.g., MERN Developer, Project Manager"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        )}

        {resumeType === "job-description" && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Enter Your Targeted Job Description
            </h3>
            <textarea
              placeholder="Paste the complete job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
            />
            {jobDescription && (
              <button
                type="button"
                onClick={() => setJobDescription("")}
                className="mt-2 text-xs text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-1 rounded"
              >
                Clear Input
              </button>
            )}
          </div>
        )}

        <button
          onClick={handleGenerateResume}
          disabled={
            isGenerating ||
            (resumeType === "job-title" && !jobPosition.trim()) ||
            (resumeType === "job-description" && !jobDescription.trim())
          }
          className={`flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            isGenerating ? "animate-pulse" : ""
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </>
          ) : (
            <>
              <FileText size={16} />
              Generate Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GenerateResumeSection;
