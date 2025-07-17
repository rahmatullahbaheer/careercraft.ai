import Image from "next/image";

import React from "react";

function Header() {
  return (
    <div
      className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col 
    items-center justify-center  "
    >
      <section className="w-full text-center px-4 py-2 pt-25 md:pt-32 lg:pt-36">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-900 ">
          Looking for a Senior-Level Job? Get Everything You Need to Land a
          High-Paying Job, Faster
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
          Top Executive Talent!
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Create a Powerful, Job-Winning CV in Minutes Tailored for Senior-Level
          Roles and Designed to Land You High-Paying Opportunities Faster. Your
          Free AI Resume Writer & LinkedIn Optimization Tool to Turbocharge Your
          Career!
        </p>

        <button className="mt-6 font-ovo text-lg text-white  px-6 py-2 rounded bg-gradient-to-r from-purple-500 to-purple-400">
          Upload Resume to Get Started!
        </button>
      </section>
    </div>
  );
}

export default Header;
