"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ForgotPasswordContent() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL parameters
    const urlEmail = searchParams.get("email");
    if (urlEmail) {
      setEmail(urlEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!email || !otp) {
      setError("Please enter both email and OTP.");
      setLoading(false);
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      setLoading(false);
      return;
    }

    try {
      console.log(`Verifying OTP for ${email}: ${otp}`);
      const res = await axios.post("/api/auth/verify-otp", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      setMessage(res.data.message || "OTP verified successfully.");
      console.log(
        "OTP verified successfully, redirecting to Change Password page...",
        res
      );

      if (res?.status === 200) {
        // Pass email and OTP via URL parameters for password reset
        const params = new URLSearchParams({
          email: email.trim().toLowerCase(),
          otp: otp.trim(),
        });

        // Store in localStorage as backup
        localStorage.setItem("resetEmail", email.trim().toLowerCase());
        localStorage.setItem("resetOtp", otp.trim());

        // Redirect to Change Password page after successful OTP verification
        router.push(`/change-password?${params.toString()}`);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      const errorMessage = err.response?.data?.error || "Failed to verify OTP.";
      setError(errorMessage);

      // If OTP is invalid or expired, suggest going back to email step
      if (
        errorMessage.includes("expired") ||
        errorMessage.includes("Invalid")
      ) {
        setTimeout(() => {
          if (confirm("Would you like to request a new OTP?")) {
            router.push("/otp-email");
          }
        }, 3000);
      }
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px #0001",
          padding: 40,
          width: 400,
          maxWidth: "90%",
        }}
      >
        <div className="mb-8 text-center">
          <img
            src="/logo.png"
            alt="CareerCraft.ai"
            className="h-12 w-auto mx-auto mb-4"
          />
          <h2 style={{ fontWeight: 600 }}>Verify OTP</h2>
          <p style={{ color: "#555", marginTop: 8 }}>
            Enter the OTP sent to your email address to continue with password
            reset.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 16,
              fontSize: 16,
            }}
          />

          {/* OTP Field */}
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 16,
              fontSize: 16,
              textAlign: "center",
              letterSpacing: "2px",
            }}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#8854ff",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              marginBottom: 8,
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {message && (
          <div style={{ color: "green", marginTop: 8 }}>{message}</div>
        )}
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link
            href="/signin"
            style={{
              color: "#8854ff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <h2 className="text-3xl font-bold text-gray-900">Loading...</h2>
              <p className="text-gray-600">
                Please wait while we load the page.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}
