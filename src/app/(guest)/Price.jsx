"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StripePaymentModal from "../../components/StripePaymentModal";

import { assets } from "../../assets/assets";

function Price() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("checkout"); // "checkout" or "intent"
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/packages?status=active");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.result || "Failed to fetch packages");
        }

        setPackages(data.result || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Handle payment flow
  const handlePurchase = async (pkg, method = "checkout") => {
    // Check if user is authenticated
    if (!session) {
      // Store the intended package in session storage for after login
      sessionStorage.setItem("intendedPackage", pkg._id);
      router.push(
        "/sign-in?redirect=" + encodeURIComponent("/pricing?package=" + pkg._id)
      );
      return;
    }

    // For free packages, redirect to sign-up or dashboard
    if (pkg.price === 0) {
      router.push(session ? "/dashboard" : "/sign-up");
      return;
    }

    if (method === "intent") {
      // Use Payment Intent flow with modal
      setSelectedPackage(pkg);
      setShowPaymentModal(true);
      return;
    }

    // Use Checkout Session flow (default)
    try {
      setProcessingPayment(pkg._id);

      // Create checkout session
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: pkg._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      alert(err.message || "Failed to start payment process");
    } finally {
      setProcessingPayment(null);
    }
  };

  // Handle intended package purchase after login
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get("package");
    const intendedPackage = sessionStorage.getItem("intendedPackage");

    if (session && (packageId || intendedPackage) && packages.length > 0) {
      const targetPackageId = packageId || intendedPackage;
      const targetPackage = packages.find((pkg) => pkg._id === targetPackageId);

      if (targetPackage) {
        // Clear the stored package
        sessionStorage.removeItem("intendedPackage");
        // Remove package parameter from URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
        // Start the purchase flow
        handlePurchase(targetPackage);
      }
    }
  }, [session, packages]);

  console.log("Packages:", packages);

  // Loading state
  if (loading) {
    return (
      <section id="Price" className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center h-64">
            <div className="text-purple-600 text-lg">
              Loading pricing plans...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="Price" className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-600 text-lg">
              Error loading pricing plans: {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Helper function to determine plan styling
  const getPlanStyling = (index, total) => {
    const baseClass =
      "bg-white p-6 rounded-xl shadow-xl transform transition-all";

    // Middle plan gets highlighted border
    if (total === 3 && index === 1) {
      return `${baseClass} border-2 border-purple-600`;
    }

    // Other plans get hover border
    return `${baseClass} hover:border-2 border-purple-600`;
  };

  // Helper function to get button styling and text
  const getButtonConfig = (index, total, pkg) => {
    const isProcessing = processingPayment === pkg._id;

    // Free plan (first plan or price is 0)
    if (index === 0 || pkg.price === 0) {
      return {
        text: "Get Started",
        className: `w-full py-3 px-4 rounded-lg font-medium transition ${
          isProcessing
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`,
        disabled: isProcessing,
        onClick: () => handlePurchase(pkg),
      };
    }

    // Paid plans
    return {
      text: isProcessing ? "Processing..." : "Purchase Now",
      className: `w-full py-3 px-4 rounded-lg font-medium transition ${
        isProcessing
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-purple-600 text-white hover:bg-purple-700"
      }`,
      disabled: isProcessing,
      onClick: () => handlePurchase(pkg, paymentMethod),
    };
  };

  // Handle payment success from modal
  const handlePaymentSuccess = (paymentData) => {
    console.log("Payment completed successfully:", paymentData);
    setShowPaymentModal(false);
    setSelectedPackage(null);

    // Show success message
    alert("Payment successful! Credits have been added to your account.");

    // Optionally refresh packages or redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

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

          {/* Authentication Notice */}
          {!session && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> You'll need to sign in to purchase a
                plan. Don't worry, we'll remember your selection!
              </p>
            </div>
          )}

          {/* Payment Method Selection */}
          {session && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <p className="text-gray-700 text-sm mb-3 font-medium">
                Choose Payment Method:
              </p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="checkout"
                    checked={paymentMethod === "checkout"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Quick Checkout</span>
                </label>
                {/* <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="intent"
                    checked={paymentMethod === "intent"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Card Payment</span>
                </label> */}
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => {
              const buttonConfig = getButtonConfig(index, packages.length, pkg);

              return (
                <div
                  key={pkg._id}
                  className={getPlanStyling(index, packages.length)}
                >
                  <h3 className="text-xl font-semibold mb-2 text-purple-700">
                    {pkg.name}
                  </h3>
                  <p className="text-3xl font-bold mb-4">
                    ${pkg.price}
                    <span className="text-sm font-normal">
                      {pkg.stripePriceLine.includes("http")
                        ? "/year"
                        : pkg.stripePriceLine}
                    </span>
                  </p>

                  {/* Credits Display */}
                  {pkg.credits && pkg.credits > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                      <p className="text-purple-700 font-semibold text-center">
                        <span className="text-2xl">{pkg.credits}</span> Credits
                        Included
                      </p>
                      <p className="text-purple-600 text-xs text-center mt-1">
                        Use credits for AI-powered features
                      </p>
                    </div>
                  )}

                  {pkg.features && pkg.features.length > 0 ? (
                    <ul className="text-sm text-gray-600 mb-6 space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="text-purple-600 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="text-sm text-gray-600 mb-6 space-y-2">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        Tailor Resume for Each Job
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        Professional Resume Designs
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        Optimize with Essential Keywords
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        Craft Winning Cover Letters
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        Emails Assistant
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        Consulting Bids Generator
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        Maximize LinkedIn Profile Impact (Full Access)
                      </li>
                    </ul>
                  )}

                  <button
                    onClick={buttonConfig.onClick}
                    disabled={buttonConfig.disabled}
                    className={buttonConfig.className}
                  >
                    {buttonConfig.disabled && (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {buttonConfig.text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Modal */}
        <StripePaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPackage(null);
          }}
          packageData={selectedPackage}
          onSuccess={handlePaymentSuccess}
        />
      </section>
    </>
  );
}

export default Price;
