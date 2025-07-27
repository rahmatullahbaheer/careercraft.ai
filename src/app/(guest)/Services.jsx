import React from "react";
import { assets } from "../../assets/assets";

function Services() {
  return (
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg  font-ovo text-blue-600">
        What I Offer
      </h4>
      <h2 className="text-center  text-5xl font-ovo">My Services</h2>

      <h2
        className="text-center max-w-2xl mx-auto mt-5 mb-10 text-3xl
 font-semibold bg-gradient-to-r from-purple-500
  to-purple-400 bg-clip-text text-transparent"
      >
        Why Trust AI for Your Executive Resume?
      </h2>
      <h5 className="text-center max-w-2xl mx-auto mt-3 mb-10 text-2xl">
        The Game-Changing Advantages You Never Knew About
      </h5>
      <p className="text-center max-w-2xl mx-auto">
        In today's competitive job market, landing your dream role isn't just
        about qualifications and experience; It's about making sure your resume
        stands out. But here's the catch: before your resume even reaches the
        human recruiter's desk, it has to pass through a critical gatekeeper—the
        Applicant Tracking System (ATS).
      </p>

      <div className="bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition text-sm ">
            <h3 className="text-base font-semibold mb-1">
              Write a Winning Resume
            </h3>
            <p className="text-gray-600 mb-3">
              Creercraft.ai an executive resume that gets attention and
              highlights your skills with CareerCraft.AI.
            </p>
            <a
              href="#"
              className="text-purple-600 font-medium hover:underline inline-flex items-center"
            >
              Elevate Resume
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition text-sm">
            <h3 className="text-base font-semibold mb-1">
              Optimize LinkedIn Keywords
            </h3>
            <p className="text-gray-600 mb-3">
              Improve visibility by letting AI optimize your LinkedIn with
              recruiter-friendly keywords.
            </p>
            <a
              href="#"
              className="text-purple-600 font-medium hover:underline inline-flex items-center"
            >
              Boost LinkedIn
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition text-sm">
            <h3 className="text-base font-semibold mb-1">
              Tailor Each Cover Letter
            </h3>
            <p className="text-gray-600 mb-3">
              Generate cover letters instantly for specific roles to increase
              interview chances.
            </p>
            <a
              href="#"
              className="text-purple-600 font-medium hover:underline inline-flex items-center"
            >
              Write Letter
            </a>
            {/* Coming Soon Badge at the Bottom */}
            <div className="mt-3">
              <span className="inline-block text-xs font-semibold text-white bg-purple-600 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition text-sm">
            <h3 className="text-base font-semibold mb-1">
              Get Your Resume Reviewed
            </h3>
            <p className="text-gray-600 mb-3">
              Receive valuable feedback on your resume to identify areas for
              improvement. Our AI tool analyzes your document and provides
              actionable suggestions to enhance its impact.
            </p>
            <a
              href="#"
              className="text-purple-600 font-medium hover:underline inline-flex items-center"
            >
              Unlock Your Full Potential!
            </a>

            <div className="mt-3">
              <span className="inline-block text-xs font-semibold text-white bg-purple-600 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition text-sm">
            <h3 className="text-base font-semibold mb-1">
              ATS Scan Your Resume
            </h3>
            <p className="text-gray-600 mb-3">
              Avoid the pitfalls of Applicant Tracking Systems (ATS) with our
              ATS scanning feature. Ensure your resume is ATS-friendly,
              increasing your chances of making it to the recruiter's desk.
            </p>
            <a
              href="#"
              className="text-purple-600 font-medium hover:underline inline-flex items-center"
            >
              Beat the ATS
            </a>
            <div className="mt-3">
              <span className="inline-block text-xs font-semibold text-white bg-purple-600 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition text-sm">
            <h3 className="text-base font-semibold mb-1">
              Personalized Email for Each Job
            </h3>
            <p className="text-gray-600 mb-3">
              Craft personalized emails to recruiters quickly and easily. Our
              AI-generated emails help you make a memorable first impression and
              increase your chances of getting noticed.
            </p>
            <a
              href="#"
              className="text-purple-600 font-medium hover:underline inline-flex items-center"
            >
              Write Email
            </a>

            <div className="mt-3">
              <span className="inline-block text-xs font-semibold text-white bg-purple-600 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-md text-white py-10 px-4 md:px-10 hover:shadow-xl cursor-pointer">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Side: Text */}
          <div className="mb-6 md:mb-0 md:max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Boost Your Career with AI-Powered Tools
            </h1>
            <p className="text-lg text-purple-100 mb-4">
              Create winning resumes, optimize your LinkedIn, and tailor
              job-winning cover letters in seconds.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-purple-700 font-semibold py-2 px-5 rounded-lg hover:bg-purple-100 transition"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>

      {/* SECOND LINE */}
    </div>
  );
}

export default Services;
