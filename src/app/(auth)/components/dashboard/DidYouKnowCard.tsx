"use client";
import { useEffect, useState } from "react";

const resumeQuotes = [
  "Your resume is your first impression.",
  "A well-crafted resume opens doors to opportunities.",
  "A good resume showcases your skills and experience succinctly.",
  "A tailored resume speaks directly to the job you want.",
  "An ATS-friendly resume increases your chances of getting noticed.",
  "ATS resumes match keywords to stand out in digital screening.",
  "An optimized resume navigates the digital hiring process effectively.",
  "An ATS resume is your ticket through the recruiter's gatekeeper.",
];

const DidYouKnowCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === resumeQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-6  border-[1px] border-secondray rounded-lg shadow ">
      <div className="d-inline-flex gap-2 ">
        <span className="pt-1">  <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg></span>
        <h5 className="mb-2 text-2xl font-semibold  ">Did you know?</h5>
      </div>
      <p className="mb-3 font-normal text-secondary">
        {resumeQuotes[currentIndex] && resumeQuotes[currentIndex]}
      </p>
    </div>
  );
};

export default DidYouKnowCard;
