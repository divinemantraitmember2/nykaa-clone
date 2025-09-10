"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function ProductDetails({ product }) {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="overflow-hidden  mt-4">
      {/* Header */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="#001325"
            fillOpacity="0.92"
          >
            <path d="M19 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4ZM13.9 5.5V10.33L12 9.24L10.1 10.33V5.5H13.9ZM18.5 18.5H5.5V5.5H8.6V11.2C8.6 11.4652 8.70536 11.7196 8.89289 11.9071C9.08043 12.0946 9.33478 12.2 9.6 12.2C9.77658 12.2017 9.95001 12.1532 10.1 12.06L12 11L13.9 12.1C14.0523 12.1879 14.2251 12.2342 14.401 12.234C14.5769 12.2338 14.7496 12.1873 14.9017 12.099C15.0539 12.0108 15.18 11.884 15.2675 11.7314C15.355 11.5788 15.4007 11.4059 15.4 11.23V5.5H18.5V18.5Z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Product Information
            </h3>
            <p className="text-xs text-gray-500">Product details</p>
          </div>
        </div>

        {/* Chevron */}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            showDetails ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showDetails ? "max-h-[1000px] px-6 pb-6" : "max-h-0"
        }`}
      >
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-sm text-gray-700">
  {product?.attributes?.map((attr, idx) => (
    <div
      key={idx}
      className="flex flex-col"
    >
      {/* ✅ Name (bold + center) */}
      <span className="text-gray-900 font-bold capitalize">
        {attr.name}
      </span>

      {/* ✅ Value (centered below name) */}
      <span className="text-gray-600 mt-1">
        {attr.value}
      </span>
    </div>
  ))}
</div>


      </div>
    </div>
  );
}
