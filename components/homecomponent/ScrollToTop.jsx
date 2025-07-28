"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Optional: use your own SVG if not using lucide

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-30 right-6 z-50 p-3 bg-pink-600 rounded-md shadow-lg hover:scale-105 transition-transform"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-7 text-white" />
      </button>
    )
  );
}
