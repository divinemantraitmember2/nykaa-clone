"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function SearchDropdown({ isOpen, onClose, results = [] }) {
  const dropdownRef = useRef(null);

  // ✅ Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || results.length === 0) return null;

  return (
    <div
  ref={dropdownRef}
  className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-96 bg-white z-50 items-start justify-center"
>
  {results.map((item, index) => (
    <a
      key={index}
      href={item.link || "#"}
      className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
    >
      {/* Icon */}
      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 mr-3">
        <Search className="w-4 h-4 text-gray-700" />
      </div>

      {/* Text */}
      <div>
        <div className="font-medium text-sm text-gray-800">{item.title}</div>
        {item.category && (
          <div className="text-xs text-gray-500">{item.category}</div>
        )}
      </div>
    </a>
  ))}
</div>

  );
}
