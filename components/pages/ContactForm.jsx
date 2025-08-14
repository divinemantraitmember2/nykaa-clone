"use client";
import { useState } from "react";

export default function ContactForm() {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
const handleSelect = (item) => {
    setSelected(item);
    setOpen(false)};

const queriesData={
  "queries": [
    "Where is my order?",
    "My order is shipped but the delivery partner hasn't contacted me yet?",
    "I want to return a product",
    "Amount got deducted but my order status is showing cancelled",
    "I haven’t received my refund",
    "Received incorrect product/size"
  ]
}


  return (
    <div className="max-w-lg">
      {/* Query Selector */}
      <label className="block mb-1 font-medium text-gray-600">Your Query</label>
      <div
        onClick={() => setOpen(!open)}
        className="border rounded-md p-3 cursor-pointer flex justify-between items-center"
      >
        <span className={selected ? "text-black" : "text-gray-400"}>
          {selected || "Please select query"}
        </span>
        <span className="text-gray-400">▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="border rounded-md mt-1 bg-white shadow-md z-10 relative">
          {queriesData.queries.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(item)}
              className={`p-3 cursor-pointer hover:bg-gray-100 ${
                selected === item ? "bg-red-700 text-white" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Form appears only after selection */}
      {selected && (
        <div className="mt-5 space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Your Order ID
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-3"
              placeholder="Enter your order ID"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Your Mobile Number
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-3"
              placeholder="Enter your mobile number"
            />
          </div>

          <p className="text-sm text-gray-500">
            Login to get help with your order ID or recent orders
          </p>

          <button className="w-full bg-black text-white py-3 rounded-md font-bold">
            LOGIN
          </button>
        </div>
      )}
    </div>
  );
}
