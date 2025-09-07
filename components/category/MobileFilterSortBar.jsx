"use client";
import { useEffect, useState, useRef } from "react";
import { SlidersHorizontal, Filter, ChevronDown } from "lucide-react";
import { toggleGetFitterComponent } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function MobileFilterSortBar() {
  const [footerHeight, setFooterHeight] = useState(2);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const options = [
    { value: "newProduct", label: "What's New" },
    { value: "priceHighToLow", label: "Price: High to Low" },
    { value: "priceLowToHigh", label: "Price: Low to High" },
    { value: "discountHighToLow", label: "Discount: High to Low" },
    { value: "discountLowToHigh", label: "Discount: Low to High" },
  ];

  // Default selected sortBy (from URL or fallback)
  const [selected, setSelected] = useState(
    searchParams.get("sortBy") || "newProduct"
  );

  // Sync with URL param when it changes
  useEffect(() => {
    setSelected(searchParams.get("sortBy") || "newProduct");
  }, [searchParams]);

  function GetFilter() {
    setOpen(false);
    dispatch(toggleGetFitterComponent());
  }

  const handleChange = (value) => {
    setSelected(value);
    setOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="lg:hidden fixed left-0 right-0 h-18 bg-white border-t border-gray-200 z-55 shadow-md flex flex-col"
      style={{ bottom: footerHeight }}
    >
      {/* Sort Dropdown */}
      <div ref={dropdownRef} className="relative w-full border-b border-gray-200">
        {open && (
          <div className="absolute bottom-0 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-60">
            {options.map((o) => (
              <div
                key={o.value}
                onClick={() => handleChange(o.value)}
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

      {/* Bottom Bar */}
      <div className="flex">
        {/* Sort Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-full py-3 space-x-2 text-gray-800 font-medium"
        >
          <SlidersHorizontal size={18} className="text-pink-600" />
          <span>{options.find((o) => o.value === selected)?.label}</span>
          <ChevronDown
            size={16}
            className={`ml-1 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Filter Button */}
        <button
          onClick={GetFilter}
          className="flex items-center justify-center w-full py-3 space-x-2 text-gray-800 font-medium"
        >
          <Filter size={18} className="text-pink-600" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
}
