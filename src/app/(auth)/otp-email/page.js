"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setMessage(res.data.message || "OTP sent to your email.");
      console.log("OTP sent successfully, redirecting to OTP page...", res);
      if (res?.status === 200) {
        console.log(
          "OTP sent successfully, jjjjjjjjjjjjjjjjjredirecting to OTP page..."
        );

        // Redirect to OTP page after successful OTP request
        router.push("/otp");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP.");
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
        <div style={{ marginBottom: 24 }}>
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/logo.png"
                alt="CareerCraft.ai"
                className="h-12 w-auto"
              />
            </div>
          </div>
          <h2 style={{ margin: 0, fontWeight: 600 }}>Forgot Password?</h2>
          <p style={{ color: "#555", marginTop: 8 }}>
            Enter your email we’ll send you a password reset otp
          </p>
        </div>
        <form onSubmit={handleSubmit}>
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
            {loading ? "Sending..." : "SEND NOW"}
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
            Back To Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
