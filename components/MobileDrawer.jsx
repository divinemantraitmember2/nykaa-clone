"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function MobileDrawer({ isOpen, onClose, links = [] }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#faf4ec] rounded">
          <span className="text-lg font-bold text-black-600">Menu</span>
          <button onClick={onClose} className="text-gray-600 text-lg">
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col text-md gap-1 p-1 text-gray-700 font-semibold">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={onClose}
              className="hover:text-pink-600 p-2 rounded"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
