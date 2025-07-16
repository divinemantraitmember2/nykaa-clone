"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function AddNewAddressForm({ onClose }) {
   
  const [formData, setFormData] = useState({
    pincode: "",
    city: "",
    state: "",
    house: "",
    road: "",
    isDefault: false,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    phoneCode: "91",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.pincode ||
      !formData.city ||
      !formData.state ||
      !formData.house ||
      formData.road.length < 5 ||
      !formData.contactName ||
      formData.contactPhone.length < 10
    ) {
      alert("⚠ Please fill all required fields correctly.");
      return;
    }

    console.log("✅ Final Address Data Submitted:");
    console.log(formData);
    // You can call onSubmit or an API here
    if (onClose) onClose(); // hide form
  };



  return (
    <div className="relative border rounded-lg p-4 shadow-sm mb-3 bg-white">
      <span
        onClick={onClose}
        className="absolute top-4 right-4 text-black hover:text-red-600 text-xl font-bold cursor-pointer"
      >
        ×
      </span>

      <h2 className="text-lg font-semibold mb-4">Add New Address</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Pincode, City, State */}
        <div className="w-full flex flex-col md:flex-row gap-1">
          <div className="w-full md:w-1/3">
            <label className="block text-sm mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-sm mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
        </div>

        {/* House No */}
        <div>
          <label className="block text-sm mb-1">House/Flat/Office No.</label>
          <input
            type="text"
            name="house"
            value={formData.house}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Road */}
        <div>
          <label className="block text-sm mb-1">Road Name/Area/Colony</label>
          <textarea
            name="road"
            value={formData.road}
            onChange={handleChange}
            rows={2}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
          {formData.road.length < 5 && (
            <p className="text-red-500 text-xs mt-1">
              ⚠ Min. 5 characters required
            </p>
          )}
        </div>

        {/* Default Checkbox */}
        <div className="flex items-center justify-between">
          <label className="text-sm">Use as default address</label>
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="accent-pink-600 w-5 h-5"
          />
        </div>

        {/* Contact Info */}
        <div className="pt-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-sm text-gray-500 mb-2">
            We'll use this to contact you for delivery updates
          </p>

          <div className="mb-3">
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm mb-1">Phone</label>
              <PhoneInput
                country={"in"}
                value={formData.contactPhone}
                onChange={(value, data) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactPhone: value,
                    phoneCode: data.dialCode,
                  }))
                }
                inputStyle={{ width: "100%" }}
                inputProps={{ required: true }}
                enableSearch
              />
              {formData.contactPhone.length < 10 && (
                <p className="text-red-500 text-xs mt-1">
                  ⚠ Enter a valid phone number
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-1">Email ID (Optional)</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded bg-gray-100"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 mt-4 rounded hover:bg-pink-700"
        >
          SHIP TO THIS ADDRESS
        </button>
      </form>
    </div>
  );
}
