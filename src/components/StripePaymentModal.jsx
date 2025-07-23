"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Load Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Card element options
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
      backgroundColor: "#fff",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "12px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: false,
};

// Payment form component
function PaymentForm({ packageData, onSuccess, onError, onProcessing }) {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  // Create payment intent when component mounts
  useEffect(() => {
    if (packageData && packageData._id) {
      createPaymentIntent();
    }
  }, [packageData]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: packageData._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error("Error creating payment intent:", err);
      setError(err.message);
      onError && onError(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (succeeded) {
      return;
    }

    setProcessing(true);
    setError(null);
    onProcessing && onProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
          },
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      onProcessing && onProcessing(false);
      onError && onError(stripeError.message);
    } else {
      setSucceeded(true);
      setProcessing(false);
      onProcessing && onProcessing(false);

      // Confirm payment on backend
      try {
        const confirmResponse = await fetch("/api/stripe/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        });

        const confirmData = await confirmResponse.json();

        if (!confirmResponse.ok) {
          throw new Error(confirmData.error || "Failed to confirm payment");
        }

        onSuccess && onSuccess(confirmData);
      } catch (confirmError) {
        console.error("Error confirming payment:", confirmError);
        onError && onError(confirmError.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Package Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-800 mb-2">
          {packageData.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-purple-600">{packageData.credits} Credits</span>
          <span className="text-2xl font-bold text-purple-800">
            ${packageData.price}
          </span>
        </div>
        {packageData.description && (
          <p className="text-purple-600 text-sm mt-2">
            {packageData.description}
          </p>
        )}
      </div>

      {/* Card Element */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {succeeded && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            Payment succeeded! Credits have been added to your account.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className={`w-full py-3 px-4 rounded-lg font-medium transition ${
          processing || succeeded
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {processing ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Processing...
          </div>
        ) : succeeded ? (
          "Payment Complete"
        ) : (
          `Pay $${packageData.price}`
        )}
      </button>
    </form>
  );
}

// Main payment modal component
function StripePaymentModal({ isOpen, onClose, packageData, onSuccess }) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const handleSuccess = (paymentData) => {
    console.log("Payment successful:", paymentData);
    onSuccess && onSuccess(paymentData);
    // Redirect to dashboard or success page
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const handleError = (error) => {
    console.error("Payment error:", error);
    alert(`Payment failed: ${error}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
          <button
            onClick={onClose}
            disabled={processing}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm
            packageData={packageData}
            onSuccess={handleSuccess}
            onError={handleError}
            onProcessing={setProcessing}
          />
        </Elements>
      </div>
    </div>
  );
}

export default StripePaymentModal;
