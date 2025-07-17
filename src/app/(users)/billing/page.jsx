"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    generatedResumes: 0,
    generatedCoverLetters: 0,
    remainingCredits: 0,
    totalCreditsUsed: 0,
    currentPackage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch billing data on component mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchBillingData();
    }
  }, [status]);

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/billing");
      const data = await response.json();

      if (data.success) {
        setBillingData(data.result);
      } else {
        setError("Failed to load billing data");
      }
    } catch (error) {
      console.error("Error fetching billing data:", error);
      setError("Error loading billing data");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading billing data...</div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">
          Please sign in to view billing information.
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Billing & Usage
              </h1>
              <p className="text-gray-600">
                View your account information and usage statistics
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                {error}
              </div>
            )}

            {/* User Info Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Account Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={
                      `${billingData.firstName} ${billingData.lastName}`.trim() ||
                      "N/A"
                    }
                    readOnly
                    className="w-full p-3 bg-gray-100 rounded-lg text-gray-600 border border-gray-200 cursor-not-allowed"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={billingData.email || "N/A"}
                    readOnly
                    className="w-full p-3 bg-gray-100 rounded-lg text-gray-600 border border-gray-200 cursor-not-allowed"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={billingData.phone || "N/A"}
                    readOnly
                    className="w-full p-3 bg-gray-100 rounded-lg text-gray-600 border border-gray-200 cursor-not-allowed"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={billingData.address || "N/A"}
                    readOnly
                    className="w-full p-3 bg-gray-100 rounded-lg text-gray-600 border border-gray-200 cursor-not-allowed"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Usage Statistics Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Usage Statistics
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Generated Resumes
                  </label>
                  <input
                    type="text"
                    value={billingData.generatedResumes}
                    readOnly
                    className="w-full p-3 bg-green-50 rounded-lg text-green-800 border border-green-200 cursor-not-allowed font-semibold"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Generated Cover Letters
                  </label>
                  <input
                    type="text"
                    value={billingData.generatedCoverLetters}
                    readOnly
                    className="w-full p-3 bg-blue-50 rounded-lg text-blue-800 border border-blue-200 cursor-not-allowed font-semibold"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Remaining Credits
                  </label>
                  <input
                    type="text"
                    value={billingData.remainingCredits}
                    readOnly
                    className="w-full p-3 bg-purple-50 rounded-lg text-purple-800 border border-purple-200 cursor-not-allowed font-semibold"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Total Credits Used
                  </label>
                  <input
                    type="text"
                    value={billingData.totalCreditsUsed}
                    readOnly
                    className="w-full p-3 bg-orange-50 rounded-lg text-orange-800 border border-orange-200 cursor-not-allowed font-semibold"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Current Package
                  </label>
                  <input
                    type="text"
                    value={billingData.currentPackage || "Free Plan"}
                    readOnly
                    className="w-full p-3 bg-indigo-50 rounded-lg text-indigo-800 border border-indigo-200 cursor-not-allowed font-semibold"
                    style={{
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={fetchBillingData}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Refresh Data
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
