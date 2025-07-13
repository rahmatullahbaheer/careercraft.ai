"use client";

import React from "react";
import { Loader2 } from "lucide-react"; // npm install lucide-react
import clsx from "clsx"; // npm install clsx

const VARIANT_CLASSES = {
  primary: "bg-[#9155FD] text-white hover:bg-[#9155FD]/90",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
  violet:
    "bg-violet-500 text-white shadow-[0px_4px_8px_-4px_rgba(58,53,65,0.42)]",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-1.5 text-base",
  lg: "px-6 py-2 text-lg",
};

const Button = ({
  children,
  variant = "violet",
  size = "md",
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "rounded-[5px] inline-flex justify-center cursor-pointer items-center text-white text-sm font-medium font-['Inter'] uppercase leading-normal tracking-wide gap-2  transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <>
          {iconLeft && <span className="mr-1">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ml-1">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
