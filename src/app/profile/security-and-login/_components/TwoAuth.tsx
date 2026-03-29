"use client";

import { useState } from "react";

export default function TwoFactorAuthentication() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
  };

  return (
    <div className="bg-[#f7fcff] border border-[#dad8d8] rounded-lg p-8">
      <div className="flex flex-col gap-4">
        {/* Header with Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[#0e1112]">Two - Factor Authentication</h3>
          </div>

          <button
            onClick={handleToggle}
            className={`relative w-[54px] h-[24px] rounded-full transition-colors ${
              enabled ? "bg-[#014162]" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                enabled ? "right-0.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <p className="text-[rgba(0,0,0,0.48)] pl-8">
          Add an extra layer of security by requiring a verification code in addition to your password
        </p>

        {/* Status Notice */}
        {enabled && (
          <div className="bg-white border border-[#dad8d8] rounded-lg p-4 ml-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#014162]">Enabled</span>
            </div>
            <p className="text-[#014162] pl-6">SMS verification to +20109 874 5531</p>
          </div>
        )}

        <button
          className="bg-[#014162] text-white py-2 px-6 rounded-lg w-[200px]"
        >
          Change Phone Number
        </button>
      </div>
    </div>
  );
}