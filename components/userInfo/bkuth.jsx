"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  closeModals,
  openRegisterModal,
  openLoginModal,
} from "../../slices/userSlice";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function UserAuthModal() {
  const dispatch = useDispatch();

  const showLoginModal = useSelector((state) => state.user.showLoginModal);
  const showRegisterModal = useSelector((state) => state.user.showRegisterModal);
  const isOpen = showLoginModal || showRegisterModal;
  const isLogin = showLoginModal;

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [loginData, setLoginData] = useState({
    phoneCode: "+91",
    phoneNumber: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    password: "",
  });

  const toggleForm = () => {
    setOtpSent(false);
    setOtp("");
    if (isLogin) {
      dispatch(openRegisterModal());
    } else {
      dispatch(openLoginModal());
    }
  };

  const closeModal = () => {
    dispatch(closeModals());
    setOtpSent(false);
    setLoginData({ phoneCode: "+91", phoneNumber: "" });
    setRegisterData({
      name: "",
      email: "",
      phoneCode: "+91",
      phoneNumber: "",
      password: "",
    });
    setOtp("");
  };

  const handlePhoneChange = (value, data, isLoginForm = false) => {
    const dialCode = "+" + data.dialCode;
    const numberOnly = value.replace(dialCode, "");

    if (isLoginForm) {
      setLoginData({ phoneCode: dialCode, phoneNumber: numberOnly });
    } else {
      setRegisterData((prev) => ({
        ...prev,
        phoneCode: dialCode,
        phoneNumber: numberOnly,
      }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { phoneCode, phoneNumber } = loginData;
    if (!otpSent) {
      setOtpSent(true);
      alert(`OTP sent to ${phoneCode} ${phoneNumber}`);
    } else {
      alert(`Logging in with ${phoneCode}${phoneNumber} and OTP: ${otp}`);
      closeModal();
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, phoneCode, phoneNumber, password } = registerData;
    if (!name || !email || !phoneNumber || !password) {
      alert("Please fill all fields");
      return;
    }
    alert(`Registering: ${name}, ${email}, ${phoneCode}${phoneNumber}, ${password}`);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center px-4">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative transition-all duration-300 ease-in-out">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login with Mobile" : "Create an Account"}
        </h2>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {isLogin ? (
            <>
              {/* Login with Mobile */}
              <div className="mb-4 ">
                <label className="block text-sm font-medium mb-1">
                  Mobile Number
                </label>
                <PhoneInput
                  country={"in"}
                  value={`${loginData.phoneCode}${loginData.phoneNumber}`}
                  onChange={(value, data) =>
                    handlePhoneChange(value, data, true)
                  }
                  inputStyle={{ width: "100%" }}
                  inputProps={{ required: true }}
                />
              </div>
               <div className="">
                <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
               </div>
<div className="">
  <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
</div>
              {otpSent && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
              >
                {otpSent ? "Login" : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              {/* Register Form */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Mobile Number
                </label>
                <PhoneInput
                  country={"in"}
                  value={`${registerData.phoneCode}${registerData.phoneNumber}`}
                  onChange={(value, data) =>
                    handlePhoneChange(value, data, false)
                  }
                  inputStyle={{ width: "100%" }}
                  inputProps={{ required: true }}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter password"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
              >
                Register
              </button>
            </>
          )}
        </form>

        {/* Toggle */}
        <p className="text-sm mt-4 text-center">
          {isLogin
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <button onClick={toggleForm} className="text-pink-600 underline ml-1">
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
