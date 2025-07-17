import React from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";

function Footer() {
  return (
    <div>
      <footer className=" bg-purple-300  text-black py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            {/* <h2 className="text-2xl font-bold text-white mb-2 font-ovo"><spam className="text-DarkThem">CareerCraft.</spam>AI</h2> */}
            {/* Replace text heading with logo */}
            <Image
              src={assets.footer_logo}
              alt="CareerCraft.AI Logo"
              className="-mt-10 w-34 sm:w-40 md:w-48 object-contain -ml-10"
            />
            <p className="text-sm -mt-8 text-gray-900">
              Empowering your career with AI-driven tools. Create resumes,
              optimize LinkedIn, and more in seconds.We specialize in
              turbocharging your career by harnessing the power of cutting-edge
              AI-infused tools, ensuring you achieve peak professional
              excellence. Our innovative solutions are designed to elevate your
              skills, enhance your professional profile, and propel your career
              to unprecedented success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3 font-ovo">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="Top"
                  className="hover:text-white  relative after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-10"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="About"
                  className="hover:text-white relative after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-10"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="Services"
                  className="hover:text-white relative after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-10"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white relative after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-10"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white relative after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-10"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3 font-ovo">
              Contact
            </h3>
            <ul className="text-sm space-y-2 text-black">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@careerbooster.ai"
                
                >
                  ijazrahman102345@gmail.com
                </a>
              </li>
              <li>
                Phone: <span className="text-gray-900">+92 303 54 92 683</span>
              </li>
              <li>
                Location:{" "}
                <span className="text-gray-900">Pakistan, peshawar,</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center text-sm text-gray-900 border-t border-black pt-4 sm:mt-10">
          &copy; {new Date().getFullYear()} CareerCraft.AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
