
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      toastStyle={{
        background: "linear-gradient(135deg, #ffdde1, #ee9ca7)", // Soft pink gradient
        color: "#4a0033", // Dark wine text for premium look
        fontSize: "14px",
        fontWeight: "500",
        borderRadius: "12px",
        padding: "14px 16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}
    />
  );
}
