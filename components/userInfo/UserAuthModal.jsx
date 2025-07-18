"use client";

import { useSelector, useDispatch } from "react-redux";
import { signIn, useSession } from 'next-auth/react';
import ClientToastProvider from "../ClientToastProvider";
import { toast } from "react-toastify";

import {
  closeModals,
  openRegisterModal,
  openLoginModal,
} from "../../slices/userSlice";
import { useState } from "react";

export default function UserAuthModal() {
  const dispatch = useDispatch();

  const showLoginModal = useSelector((state) => state.user.showLoginModal);
  const showRegisterModal = useSelector((state) => state.user.showRegisterModal);
  const isOpen = showLoginModal || showRegisterModal;
  const isLogin = showLoginModal;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const toggleForm = () => {
    if (isLogin) {
      dispatch(openRegisterModal());
    } else {
      dispatch(openLoginModal());
    }
  };

  const closeModal = () => {
    dispatch(closeModals());
    setUsername("");
    setPassword("");
    setRegisterData({
      name: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

     const result = await signIn('credentials', {
            redirect: false,
           username:username,
           password:password

         });
    console.log("password",password)
    console.log("password",username)
    console.log("result",result)
     if (result?.error) {
      toast.error("Login Fail!");
      
    } else {
      toast.success("Welcome...")
      
      setTimeout(() => {
        closeModal();
      }, 2000);
      
    }

  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, username, password } = registerData;
    if (!name || !email || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    alert(`Registering: ${name}, ${email}, ${username}, ${password}`);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <>
     {isOpen && (<>
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
          {isLogin ? "Login" : "Create an Account"}
        </h2>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {isLogin ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
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
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={registerData.username}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, password: e.target.value })
                  }
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

        <p className="text-sm mt-4 text-center">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button onClick={toggleForm} className="text-pink-600 underline ml-1">
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
     </>)}
    <ClientToastProvider/>
    </>
  );
}
