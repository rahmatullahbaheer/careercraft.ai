import React from "react";

import { assets } from "../../assets/assets";
function Price() {
  return (
    <>
      <section id="Price" className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Choose Your Plan</h2>
          <h3 className="text-3xl font-bold mb-6">
            All Plans Include a 30-Day Money Back Guarantee
          </h3>
          <p className="text-gray-600 mb-12">
            Simple pricing for individuals and professionals
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Basic Plan */}
            <div className="bg-white p-6 rounded-xl hover:border-2 border-purple-600 shadow-xl transform transition-all">
              <h3 className="text-xl font-semibold mb-2  text-purple-700">
                Free 1000 Credits
              </h3>
              <p className="text-3xl font-bold mb-4">
                $0<span className="text-sm font-normal">/only for 2 hours</span>
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>✓Tailor Resume for Each Job</li>
                <li>✓Professional Resume Designs</li>
                <li>✓Optimize with Essential Keywords</li>
                <li>✓Craft Winning Cover Letters</li>
                <li>✓Emails Assistant</li>
                <li>✓Consulting Bids Generator</li>
                <li>✓Maximize LinkedIn Profile Impact (Full Access)</li>
              </ul>
              <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-6 rounded-xl  border-2 border-purple-600 shadow-xl">
              <h3 className="text-xl font-semibold mb-2 text-purple-700">
                Get 10,000 Credits
              </h3>
              <p className="text-3xl font-bold mb-4 text-purple-700">
                $99<span className="text-sm font-normal">/mo</span>
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>✓Tailor Resume for Each Job</li>
                <li>✓Professional Resume Designs</li>
                <li>✓Optimize with Essential Keywords</li>
                <li>✓Craft Winning Cover Letters</li>
                <li>✓Emails Assistant</li>
                <li>✓Consulting Bids Generator</li>
                <li>✓Maximize LinkedIn Profile Impact (Full Access)</li>
              </ul>
              <a
                href="https://buy.stripe.com/test_7sY14o9SM8tX1a19R08Zq03"
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
              >
                Start Pro
              </a>
            </div>

            {/* Premium Plan */}
            <div className="bg-white p-6 rounded-xl hover:hover:border-2 border-purple-600 shadow-xl transform transition-all">
              <h3 className="text-xl font-semibold mb-2  text-purple-700">
                Get 50,000 Credits
              </h3>
              <p className="text-3xl font-bold mb-4">
                $495<span className="text-sm font-normal">/year</span>
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>✓Tailor Resume for Each Job</li>
                <li>✓Professional Resume Designs</li>
                <li>✓Optimize with Essential Keywords</li>
                <li>✓Craft Winning Cover Letters</li>
                <li>✓Emails Assistant</li>
                <li>✓Consulting Bids Generator</li>
                <li>✓Maximize LinkedIn Profile Impact (Full Access)</li>
              </ul>
              <a
                href="https://buy.stripe.com/test_7sY14o9SM8tX1a19R08Zq03"
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
              >
                Go Premium
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Price;
