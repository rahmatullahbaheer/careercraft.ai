"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentCancel = () => {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          {canceled
            ? "Your payment was cancelled. No charges were made to your account."
            : "Your payment could not be completed. Please try again."}
        </p>

        <div className="space-y-3">
          <Link
            href="/pricing"
            className="block w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium"
          >
            Back to Pricing
          </Link>

          <Link
            href="/dashboard"
            className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
