"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function MobileDrawer({ isOpen, onClose, links = [] }) {
  const [openIndex, setOpenIndex] = useState(null); // which dropdown is open

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={onClose} />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#faf4ec]">
          <span className="text-lg font-bold text-black">Menu</span>
          <button onClick={onClose} className="text-gray-600 text-lg">
            ✕
          </button>
        </div>

        {/* Menu Links with Dropdowns */}
        <nav className="flex flex-col text-md p-2 text-gray-700 font-semibold">
          {links.map((link, i) => (
            <div key={i} className="border-b">
              <button
                className="w-full text-left p-2 flex justify-between items-center hover:text-pink-600"
                onClick={() => toggleDropdown(i)}
              >
                {link.label}
                <span className="w-4 h-4">
                  {openIndex === i ? (
                    <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                  )}
                </span>
              </button>

              {/* Dropdown Children */}
              {openIndex === i && link.children?.length > 0 && (
                <div className="ml-4 mb-2 mt-1 flex flex-col gap-1 text-sm">
                  {link.children.map((child, j) => (
                    <Link
                      key={j}
                      href={`/category/${child.slug}`}
                      onClick={onClose}
                      className="py-1 px-2 hover:text-pink-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
