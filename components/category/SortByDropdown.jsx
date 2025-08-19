"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // arrow icon

const SortByDropdown = () => {
  const [selected, setSelected] = useState("recommended");
  const [open, setOpen] = useState(false);

  const options = [
    { value: "recommended", label: "Recommended" },
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
  };

  return (
    <div className="relative inline-block text-sm">
      {/* Button */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer border border-gray-300  px-3 py-2 w-70 rounded-md flex items-center justify-between bg-white"
      >
        <span>
          Sort by :{" "}
          <span className="font-semibold">
            {options.find((o) => o.value === selected)?.label}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`ml-2 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown list */}
      {open && (
        <ul className="absolute mt-1 w-70 rounded-md bg-white border border-gray-300  shadow-md z-20">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-3 py-2 cursor-pointer flex items-center hover:bg-gray-100 ${
                selected === option.value ? "text-pink-600 font-semibold" : ""
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
        </ul>
      )}
    </div>
  );
};

export default SortByDropdown;
