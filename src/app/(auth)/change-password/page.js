"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email and OTP from URL parameters
    const urlEmail = searchParams.get("email");
    const urlOtp = searchParams.get("otp");

    if (urlEmail && urlOtp) {
      setEmail(urlEmail);
      setOtp(urlOtp);
    } else {
      // If no URL parameters, check localStorage as fallback
      const storedEmail = localStorage.getItem("resetEmail");
      const storedOtp = localStorage.getItem("resetOtp");

      if (storedEmail && storedOtp) {
        setEmail(storedEmail);
        setOtp(storedOtp);
      } else {
        // If no stored credentials, redirect to forgot password
        setError("Session expired. Please restart the password reset process.");
        setTimeout(() => {
          router.push("/otp-email");
        }, 3000);
      }
    }
  }, [router, searchParams]);

  // Password validation rules
  const passwordRequirements = [
    {
      id: "length",
      regex: /.{8,}/,
      text: "At least 8 characters",
      check: (password) => password.length >= 8,
    },
    {
      id: "uppercase",
      regex: /[A-Z]/,
      text: "One uppercase letter",
      check: (password) => /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      regex: /[a-z]/,
      text: "One lowercase letter",
      check: (password) => /[a-z]/.test(password),
    },
    {
      id: "number",
      regex: /\d/,
      text: "One number",
      check: (password) => /\d/.test(password),
    },
    {
      id: "special",
      regex: /[^A-Za-z0-9]/,
      text: "One special character",
      check: (password) => /[^A-Za-z0-9]/.test(password),
    },
  ];

  const isPasswordValid = passwordRequirements.every((req) =>
    req.check(newPassword)
  );
  const doPasswordsMatch =
    newPassword === confirmPassword && newPassword !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements");
      return;
    }

    if (!doPasswordsMatch) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !otp) {
      setError(
        "Missing authentication data. Please restart the password reset process."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      console.log(`Attempting password reset for ${email} with OTP ${otp}`);
      const response = await axios.post("/api/auth/reset-password", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });

      setMessage("Password reset successfully! Redirecting to sign in...");
      console.log("Password reset successful:", response.data);

      // Clear localStorage if it was used as fallback
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOtp");

      // Redirect to sign in after success
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err) {
      console.error("Password reset error:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to reset password. Please try again.";
      setError(errorMessage);

      // If OTP expired or invalid, redirect to restart process
      if (
        errorMessage.includes("expired") ||
        errorMessage.includes("Invalid OTP") ||
        errorMessage.includes("No matching record")
      ) {
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetOtp");
        setTimeout(() => {
          if (
            confirm(
              "OTP is invalid or expired. Would you like to request a new one?"
            )
          ) {
            router.push("/otp-email");
          }
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const validRequirements = passwordRequirements.filter((req) =>
      req.check(newPassword)
    ).length;
    if (validRequirements === 0) return { level: 0, text: "", color: "" };
    if (validRequirements <= 2)
      return { level: 1, text: "Weak", color: "#ef4444" };
    if (validRequirements <= 4)
      return { level: 2, text: "Medium", color: "#f59e0b" };
    return { level: 3, text: "Strong", color: "#10b981" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-gray-600">Enter your new password below</p>
            {email && (
              <p className="text-sm text-gray-500 mt-2">
                For: <span className="font-medium">{email}</span>
              </p>
            )}
          </div>

          {/* Alert Messages */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div className="text-sm text-green-700">{message}</div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pr-12"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(passwordStrength.level / 3) * 100}%`,
                          backgroundColor: passwordStrength.color,
                        }}
                      />
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2">
                    {passwordRequirements.map((req) => (
                      <div key={req.id} className="flex items-center text-sm">
                        {req.check(newPassword) ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 border-2 border-gray-300 rounded-full mr-2 flex-shrink-0" />
                        )}
                        <span
                          className={
                            req.check(newPassword)
                              ? "text-green-700"
                              : "text-gray-600"
                          }
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pr-12"
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center text-sm">
                  {doPasswordsMatch ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-700">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-red-700">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid || !doPasswordsMatch}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/otp-email"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Start over with a new email
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
