"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  closeModals,
  openLoginModal,
  openRegisterModal,
} from "../../slices/userSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

  // Dummy offers - later aap API/Redux se laa sakte ho
  const offers = [
    {
      id: 1,
      title: "🎉 Get 20% OFF on First Order",
      subtitle: "Use code: WELCOME20",
      bg: "bg-pink-100",
      text: "text-pink-700",
    },
    {
      id: 2,
      title: "🚚 Free Delivery on Orders Above ₹499",
      subtitle: "Limited time offer!",
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      id: 3,
      title: "🔥 Flat ₹100 Cashback",
      subtitle: "On prepaid orders",
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
        <div className="bg-white w-full max-w-3xl mx-auto rounded-lg shadow-lg relative overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-in-out">
         <button
  onClick={closeModal}
  className="absolute -top-2 right-2 text-gray-600 hover:text-black text-4xl font-bold z-10 leading-none"
>
  &times;
</button>

          {/* Left Side (Desktop Image) */}
          <div className="w-1/2 hidden md:block">
            <img
              src="/images/no-profile.jpeg"
              alt="Login Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Offers Slider */}
          <div className="block md:hidden bg-gray-50 p-4 ">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={12}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {offers.map((offer) => (
                <SwiperSlide key={offer.id}>
                  <div
                    className={`p-4 rounded-lg shadow ${offer.bg} ${offer.text} text-center`}
                  >
                    <h3 className="font-semibold text-sm">{offer.title}</h3>
                    <p className="text-xs text-gray-700">{offer.subtitle}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center hidden lg:block">
              {isLogin ? "Login" : "Create an Account"}
            </h2>

            {isLogin ? <LoginForm /> : <RegisterForm />}

            <p className="text-sm mt-4 text-center">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="text-pink-600 underline ml-1"
              >
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
