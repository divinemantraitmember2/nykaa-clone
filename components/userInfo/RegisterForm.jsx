"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModals } from "../../slices/userSlice";
import { Registeruser } from "../../utils/api/Httproutes";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sex: "",
  });

  const [countryCode, setCountryCode] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, sex } = registerData;

    if (!firstName || !lastName || !email || !phone || !sex) {
      toast.error("Please fill all fields");
      return;
    }

    // ✅ Remove countryCode from phone number (e.g. "91886..." => "886...")
    const localPhone = phone.startsWith(countryCode)
      ? phone.slice(countryCode.length)
      : phone;

    const payload = {
      ...registerData,
      phone: localPhone,
      countryCode: `${countryCode=="91"?"IN":"OTHER"}`,
    };

    try {
      const res = await Registeruser(payload);
      console.log("res",res)
      if (res?.status===201 && res?.statusText==="Created") {
        toast.success(`Registered successfully`);
        setTimeout(() => {
          dispatch(closeModals());
        }, 2000);
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong while registering");
      console.error("Registration Error:", error);
    }

    console.log("Register Data:", payload);
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex gap-2 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={registerData.firstName}
            onChange={(e) =>
              setRegisterData({ ...registerData, firstName: e.target.value })
            }
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={registerData.lastName}
            onChange={(e) =>
              setRegisterData({ ...registerData, lastName: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <PhoneInput
          country={"in"}
          value={registerData.phone}
          onChange={(phone, countryData) => {
            setRegisterData({ ...registerData, phone });
            setCountryCode(countryData.dialCode); // "91"
          }}
          inputStyle={{ width: "100%" }}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={registerData.sex}
          onChange={(e) =>
            setRegisterData({ ...registerData, sex: e.target.value })
          }
          required
        >
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
      >
        Register
      </button>
    </form>
  );
}
