import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(false);
  const [creditsAdded, setCreditsAdded] = useState(false);
  const [userCredits, setUserCredits] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");
  const packageId = urlParams.get("package_id");

  useEffect(() => {
    if (sessionId && packageId && session) {
      handlePaymentSuccess();
    }
  }, [sessionId, packageId, session]);

  const handlePaymentSuccess = async () => {
    setLoading(true);
    setError(null);

    try {
      // Add credits to user account
      const response = await fetch("/api/users/addCredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: packageId,
          paymentIntentId: sessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCreditsAdded(true);
        setUserCredits(data.data);

        // Show success message
        showSuccessNotification(data.data);

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        setError(data.result || "Failed to add credits");
      }
    } catch (err) {
      console.error("Error processing payment success:", err);
      setError("An error occurred while processing your payment");
    } finally {
      setLoading(false);
    }
  };

  const showSuccessNotification = (creditData) => {
    // You can integrate with your notification system here
    if (window.Notification && Notification.permission === "granted") {
      new Notification("Payment Successful!", {
        body: `${creditData.creditsAdded} credits added to your account. Total: ${creditData.totalCredits}`,
        icon: "/logo.png",
      });
    }
  };

  const manualAddCredits = async (packageId, customCredits = null) => {
    setLoading(true);
    setError(null);

    try {
      const requestBody = packageId ? { packageId } : { customCredits };

      const response = await fetch("/api/users/addCredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        setCreditsAdded(true);
        setUserCredits(data.data);
        alert(
          `Successfully added ${data.data.creditsAdded} credits to your account!`
        );
      } else {
        setError(data.result || "Failed to add credits");
      }
    } catch (err) {
      console.error("Error adding credits:", err);
      setError("An error occurred while adding credits");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Payment Error
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/pricing")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  if (creditsAdded && userCredits) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-green-500 text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h1>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              Credits Added
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {userCredits.creditsAdded}
            </p>
            <p className="text-sm text-purple-600 mt-1">
              Total Credits: {userCredits.totalCredits}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Package: {userCredits.packageName}
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            Your credits have been successfully added to your account. You will
            be redirected to your dashboard shortly.
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Manual credit addition interface (for testing/admin purposes)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Credits</h1>

        <div className="space-y-4">
          <button
            onClick={() => manualAddCredits("package_id_here")}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            disabled={loading}
          >
            {loading ? "Adding Credits..." : "Add Package Credits"}
          </button>

          <button
            onClick={() => manualAddCredits(null, 100)}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Adding Credits..." : "Add 100 Custom Credits"}
          </button>
        </div>

        {userCredits && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Current Credits:{" "}
              <span className="font-bold">{userCredits.totalCredits}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
