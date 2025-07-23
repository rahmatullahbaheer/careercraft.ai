import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const CreditManagementDemo = () => {
  const { data: session } = useSession();
  const [creditInfo, setCreditInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user's current credit information
  const fetchCreditInfo = async () => {
    try {
      const response = await fetch("/api/users/addCredits");
      const data = await response.json();

      if (data.success) {
        setCreditInfo(data.data);
      } else {
        setMessage(`Error: ${data.result}`);
      }
    } catch (error) {
      setMessage(`Error fetching credit info: ${error.message}`);
    }
  };

  // Simulate successful payment and add credits
  const simulatePaymentSuccess = async (
    packageId,
    creditsAmount,
    packageName
  ) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users/addCredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: packageId,
          paymentIntentId: `demo_payment_${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          `✅ Payment Success! Added ${data.data.creditsAdded} credits to your account.`
        );
        setCreditInfo((prev) => ({
          ...prev,
          availableCredits: data.data.totalCredits,
          totalCreditsEarned: data.data.totalCredits,
        }));

        // Refresh credit info
        setTimeout(fetchCreditInfo, 1000);
      } else {
        setMessage(`❌ Error: ${data.result}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add custom credits (for testing)
  const addCustomCredits = async (amount) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users/addCredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customCredits: amount,
          paymentIntentId: `custom_${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Successfully added ${amount} custom credits!`);
        fetchCreditInfo();
      } else {
        setMessage(`❌ Error: ${data.result}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchCreditInfo();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-center text-gray-600">
          Please sign in to view credit management.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Credit Management System Demo
      </h1>

      {/* Current Credit Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Credit Information</h2>

        {creditInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-purple-700">
                Available Credits
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {creditInfo.availableCredits}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-green-700">
                Total Earned
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {creditInfo.totalCreditsEarned}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-blue-700">
                Credits Used
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {creditInfo.creditsUsed}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading credit information...</p>
          </div>
        )}

        {creditInfo && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p>
              <strong>Current Package:</strong> {creditInfo.currentPackage}
            </p>
            <p>
              <strong>Subscription Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  creditInfo.subscriptionStatus === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {creditInfo.subscriptionStatus}
              </span>
            </p>
            {creditInfo.lastPaymentDate && (
              <p>
                <strong>Last Payment:</strong>{" "}
                {new Date(creditInfo.lastPaymentDate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Payment Success Simulation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Simulate Payment Success
        </h2>
        <p className="text-gray-600 mb-6">
          Click these buttons to simulate successful payments and see how
          credits are added:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pro Package */}
          <div className="border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-700 mb-2">Pro Package</h3>
            <p className="text-2xl font-bold mb-2">500 Credits</p>
            <p className="text-sm text-gray-600 mb-4">
              Perfect for professionals
            </p>
            <button
              onClick={() =>
                simulatePaymentSuccess("pro_package_id", 500, "Pro Package")
              }
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Simulate Pro Payment"}
            </button>
          </div>

          {/* Premium Package */}
          <div className="border border-gold-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-700 mb-2">
              Premium Package
            </h3>
            <p className="text-2xl font-bold mb-2">1000 Credits</p>
            <p className="text-sm text-gray-600 mb-4">For heavy users</p>
            <button
              onClick={() =>
                simulatePaymentSuccess(
                  "premium_package_id",
                  1000,
                  "Premium Package"
                )
              }
              disabled={loading}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Simulate Premium Payment"}
            </button>
          </div>

          {/* Custom Credits */}
          <div className="border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-700 mb-2">
              Custom Credits
            </h3>
            <p className="text-2xl font-bold mb-2">100 Credits</p>
            <p className="text-sm text-gray-600 mb-4">For testing purposes</p>
            <button
              onClick={() => addCustomCredits(100)}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Add 100 Credits"}
            </button>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("✅")
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <p className="font-medium">{message}</p>
        </div>
      )}

      {/* Payment History */}
      {creditInfo &&
        creditInfo.paymentHistory &&
        creditInfo.paymentHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Package</th>
                    <th className="px-4 py-2 text-left">Credits</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {creditInfo.paymentHistory.map((payment, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{payment.packageName}</td>
                      <td className="px-4 py-2">{payment.creditsAdded}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* How It Works */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">
          How the Credit System Works
        </h2>
        <div className="space-y-4 text-blue-700">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              1
            </div>
            <p>
              <strong>User completes payment</strong> through Stripe checkout
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <p>
              <strong>Stripe webhook</strong> notifies our system of successful
              payment
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <p>
              <strong>Credits are automatically added</strong> to user's account
              based on package
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              4
            </div>
            <p>
              <strong>User package and subscription status</strong> are updated
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              5
            </div>
            <p>
              <strong>Payment history is recorded</strong> for future reference
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditManagementDemo;
