import React from "react";

const SaveButton = ({ onClick, title, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-purple-300 text-white text-lg font-semibold shadow-md transition 
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-90 cursor-pointer"
        }`}
    >
      <div className="text-white/90 text-base font-medium font-['Inter'] capitalize leading-relaxed">
        {title}
      </div>
    </button>
  );
};

export default SaveButton;
