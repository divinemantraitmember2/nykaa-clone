
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientToastProvider() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}
