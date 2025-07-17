"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
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
          boxShadow: "0 2px 16px rgba(136,84,255,0.08)",
          padding: 40,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <Image
            src="/logo.svg"
            alt="CareerCraft.ai"
            width={64}
            height={64}
            style={{ margin: "0 auto 8px" }}
          />
          <h2
            style={{
              color: "#2d3748",
              fontWeight: 600,
              fontSize: 24,
              margin: 0,
            }}
          >
            Reset Password
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, marginTop: 8 }}>
            Enter your new password
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div style={{ position: "relative" }}>
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 40px 12px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 15,
              }}
              required
            />
            <span
              onClick={() => setShowNew((v) => !v)}
              style={{
                position: "absolute",
                right: 12,
                top: 12,
                cursor: "pointer",
                color: "#8854ff",
              }}
              title={showNew ? "Hide" : "Show"}
            >
              <svg
                width="22"
                height="22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5c-4.5 0-8 4.5-8 6s3.5 6 8 6 8-4.5 8-6-3.5-6-8-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
                  stroke="#8854ff"
                  strokeWidth="1.5"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="2"
                  fill={showNew ? "#8854ff" : "#fff"}
                />
              </svg>
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 40px 12px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 15,
              }}
              required
            />
            <span
              onClick={() => setShowConfirm((v) => !v)}
              style={{
                position: "absolute",
                right: 12,
                top: 12,
                cursor: "pointer",
                color: "#8854ff",
              }}
              title={showConfirm ? "Hide" : "Show"}
            >
              <svg
                width="22"
                height="22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5c-4.5 0-8 4.5-8 6s3.5 6 8 6 8-4.5 8-6-3.5-6-8-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
                  stroke="#8854ff"
                  strokeWidth="1.5"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="2"
                  fill={showConfirm ? "#8854ff" : "#fff"}
                />
              </svg>
            </span>
          </div>
          <button
            type="submit"
            style={{
              background: "#8854ff",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px",
              fontWeight: 600,
              fontSize: 16,
              marginTop: 8,
              cursor: "pointer",
            }}
          >
            RESET PASSWORD
          </button>
        </form>
        <div style={{ marginTop: 24 }}>
          <Link
            href="/auth/signin"
            style={{ color: "#8854ff", fontSize: 15, textDecoration: "none" }}
          >
            Back To Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
