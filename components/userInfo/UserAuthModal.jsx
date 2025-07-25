"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeModals, openLoginModal, openRegisterModal } from "../../slices/userSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ClientToastProvider from "../ClientToastProvider";

export default function UserAuthModal() {
  const dispatch = useDispatch();
  const showLoginModal = useSelector((state) => state.user.showLoginModal);
  const showRegisterModal = useSelector((state) => state.user.showRegisterModal);
  const isOpen = showLoginModal || showRegisterModal;
  const isLogin = showLoginModal;

  const toggleForm = () => {
    if (isLogin) {
      dispatch(openRegisterModal());
    } else {
      dispatch(openLoginModal());
    }
  };

  const closeModal = () => dispatch(closeModals());

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-3xl mx-auto rounded-lg shadow-lg relative overflow-hidden flex transition-all duration-300 ease-in-out">
          <button
            onClick={closeModal}
            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl z-10"
          >
            &times;
          </button>

          {/* Left Side Image */}
          <div className="w-1/2 hidden md:block">
            <img
              src="/images/no-profile.jpeg"
              alt="Login Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? "Login" : "Create an Account"}
            </h2>

            {isLogin ? <LoginForm /> : <RegisterForm />}

            <p className="text-sm mt-4 text-center">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}
              <button onClick={toggleForm} className="text-pink-600 underline ml-1">
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
      <ClientToastProvider />
    </>
  );
}
