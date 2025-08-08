"use client";

import { useState } from "react";
import { MdLocationOn } from "react-icons/md"; // For location icon

export default function SearchLocation() {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  const handleCheck = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter valid pincode");
    } else {
      setError("");
      // proceed with checking delivery
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-6 ">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">

        {/* Delivery Options */}
        <div className="w-full lg:w-auto flex flex-col">
          <div className="mb-2">
            <h3 className="text-xl text-start font-semibold text-gray-800 mb-2">Select Delivery Location</h3>
          <p className="text-start font-semibold ">Enter the pincode of your area to check product availability and delivery options</p>

          </div>
          <div className="flex items-center gap-1 mb-2 text-gray-700 font-semibold text-sm">
            <MdLocationOn className="text-xl text-gray-600" />
            <span>Delivery Options</span>
          </div>

<div className="relative w-full sm:w-[300px] ">
      
  <input
    type="text"
    placeholder="Enter pincode"
    className="border py-3 lg:py-3 px-4 pr-16 text-sm w-full rounded "
    value={pincode}
  onChange={(e) => setPincode(e.target.value)}
  />
  <button onClick={handleCheck}  className="absolute right-3 top-1/2  -translate-y-1/2 text-[#e80071] font-medium text-sm hover:underline">
    Check
  </button>
  </div>
         
          {error && (
            <span className="text-xs text-red-600 mt-1">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
}
