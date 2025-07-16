"use client";

import { useEffect, useState } from "react";

const messages = [
  "  BEAUTY BONANZA – Get Your Amazing Deals!",
  "  BEAUTY BONANZA – Get One Buy One Amazing Deals!",
];

export default function Topbar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 1000); // 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6  bg-[#faf4ec]">
      <div className="relative h-10 overflow-hidden  text-pink-900 text-sm flex items-center justify-start">
      <div className="absolute transition-opacity duration-300">
        <div className="font-semibold text-center">
          {messages[currentIndex]}
        </div>
      </div>
    </div>
    </section>
  );
}
