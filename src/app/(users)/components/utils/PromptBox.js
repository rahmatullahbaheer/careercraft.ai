"use client";
import React, { useState } from "react";
import SaveButton from "./SaveButton"; // Make sure the path is correct

const PromptBox = ({ title, name, description, onSave, updating, id }) => {
  const [prompt, setPrompt] = useState(description || "");

  const handleSave = () => {
    if (onSave) {
      onSave(name, prompt, id);
    }
  };

  return (
    <div className="lg:w-[500px] w-full p-4 border border-gray-200 rounded-lg shadow sm:p-6">
      <div className="w-full space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-700">{title}</h2>

        <textarea
          className="w-full p-4 rounded-lg sm:p-6 outline-none border border-gray-300 focus:border-gray-400 resize-none"
          rows={12}
          value={prompt}
          placeholder="Write prompt here..."
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex items-center">
          {updating ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span>Saving...</span>
            </div>
          ) : (
            <SaveButton onClick={handleSave} title="Save" disabled={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
