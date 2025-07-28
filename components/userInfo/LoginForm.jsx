"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModals } from "../../slices/userSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function LoginForm() {
  const [phone, setPhone] = useState(""); // Full number with country code
  const [countryCode, setCountryCode] = useState(""); // +91, +1, etc.
 
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter phone");
      return;
    }

    // Remove country code from full phone to get local number
    const localPhone = phone.replace(countryCode.replace("+", ""), "");
      const result = await signIn("credentials", {
      redirect: false,
      phone: localPhone,
    });

    console.log("result...",result)
    if (result?.error) {
      toast.error("Login Failed!");
    } else {
      toast.success("Welcome!");
      setTimeout(() => dispatch(closeModals()), 2000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={(value, countryData) => {
            setPhone(value);
            setCountryCode(`+${countryData.dialCode}`);
          }}
          inputStyle={{ width: "100%" }}
          inputProps={{ required: true }}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
      >
        Login
      </button>
    </form>
  );
}
