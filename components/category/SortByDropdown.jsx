// SortByDropdown.jsx
"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SortByDropdown = ({ onChange }) => {
  const [selected, setSelected] = useState("new");
  const [open, setOpen] = useState(false);

  const options = [
    { value: "new", label: "What's New" },
    { value: "popularity", label: "Popularity" },
    { value: "discount", label: "Better Discount" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "customer_rating", label: "Customer Rating" },
  ];

  const handleChange = (value) => {
    setSelected(value);
    setOpen(false);
    onChange?.(value); // 🔹 parent ko notify karo
  };

  return (
    <div
      className="relative inline-block text-sm"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Button */}
      <div
        className="cursor-pointer border border-gray-200 px-5 py-3 w-72 
        rounded-xl flex items-center justify-between bg-white shadow-sm 
        hover:shadow-md transition-all duration-200"
      >
        <span>
          Sort by:{" "}
          <span className="font-semibold text-gray-800">
            {options.find((o) => o.value === selected)?.label}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`ml-2 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown list */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-0 w-72 rounded-xl bg-white border border-gray-200 
            shadow-lg z-20 overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-5 py-3 cursor-pointer flex items-center transition-colors duration-150
                ${
                  selected === option.value
                    ? "bg-pink-50 text-pink-600 font-semibold"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleChange(option.value)}
              >
                <input
                  type="radio"
                  name="sortBy"
                  checked={selected === option.value}
                  onChange={() => handleChange(option.value)}
                  className="mr-2 accent-pink-600"
                />
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortByDropdown;
