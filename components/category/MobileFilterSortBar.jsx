"use client";
import { useEffect, useState, useRef } from "react";
import { SlidersHorizontal, Filter, ChevronDown } from "lucide-react";
import { toggleGetFitterComponent } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

export default function MobileFilterSortBar() {
  const [footerHeight, setFooterHeight] = useState(2); 
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("recommended");
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const options = [
    { value: "recommended", label: "Recommended" },
    { value: "new", label: "What's New" },
    { value: "popularity", label: "Popularity" },
    { value: "discount", label: "Better Discount" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "customer_rating", label: "Customer Rating" },
  ];

  function GetFilter() {
     setOpen(false);
    dispatch(toggleGetFitterComponent());
  }

  return (
    <div
      className="lg:hidden fixed left-0 right-0 h-16 bg-white border-t border-gray-200 z-55 shadow-md flex flex-col"
      style={{ bottom: footerHeight }}
    >
      {/* Sort Button (Full Width) */}
      <div ref={dropdownRef} className="relative w-full border-b border-gray-200">
        

        {/* Dropdown */}
        {open && (
          <div className="absolute bottom-0 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-60">
            {options.map((o) => (
              <div
                key={o.value}
                onClick={() => {
                  setSelected(o.value);
                  setOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  selected === o.value ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                {o.label}
              </div>
            ))}
          </div>
        )}
      </div>
<div className="flex">
  
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center justify-center w-full py-3 space-x-2 text-gray-800 font-medium"
  >
    {/* Left Icon */}
    <SlidersHorizontal size={18} className="text-pink-600" />

    {/* Label */}
    <span>{options.find((o) => o.value === selected)?.label}</span>

    {/* Dropdown Arrow */}
    <ChevronDown
      size={16}
      className={`ml-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
    />
  </button>

  {/* Filter Button */}
  <button
    onClick={() => GetFilter()}
    className="flex items-center justify-center w-full py-3 space-x-2 text-gray-800 font-medium"
  >
    <Filter size={18} className="text-pink-600" />
    <span>Filter</span>
  </button>
</div>

      
    </div>
  );
}
