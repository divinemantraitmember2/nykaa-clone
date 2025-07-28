"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { UserAddreAddAndUpdate } from "../../utils/api/Httproutes";
import { toggleRefetchUserAddress } from "../../slices/userSlice";


export default function AddNewAddressForm({ onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    zipCode: "",
    city: "",
    state: "",
    country: "IN",
    addressLine1: "",
    landMark: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isDefault: false,
    isVerified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
  !formData.firstName.trim() ||
  !formData.lastName.trim() ||
  !formData.phoneNumber.trim() ||
  formData.phoneNumber.length !== 10 ||
  !formData.zipCode.trim() ||
  !formData.city.trim() ||
  !formData.state.trim() ||
  !formData.addressLine1.trim()
) {
  alert("⚠ Please fill all required fields correctly.");
  return;
}
  const response= await UserAddreAddAndUpdate("add",formData)
  if(response.status ===200){
    
   dispatch(toggleRefetchUserAddress())
   setTimeout(()=>{
    onClose()
   },2000)
   
  }
       
      console.log("response...",response)
    
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

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-sm mb-1">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-sm mb-1">Landmark</label>
          <input
            type="text"
            name="landMark"
            value={formData.landMark}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Zip Code, City, State */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
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

        {/* Checkboxes */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="accent-pink-600 w-4 h-4"
            />
            Use as default address
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleChange}
              className="accent-green-600 w-4 h-4"
            />
            Verified
          </label>
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
