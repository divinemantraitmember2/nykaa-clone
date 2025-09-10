"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SortByDropdown = ({ selected = "newProduct" }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options = [
    { value: "newProduct", label: "What's New" },
    { value: "priceHighToLow", label: "Price: High to Low" },
    { value: "priceLowToHigh", label: "Price: Low to High" },
    { value: "discountHighToLow", label: "Discount: High to Low" },
    { value: "discountLowToHigh", label: "Discount: Low to High" },
  ];

  const [current, setCurrent] = useState(selected);

  useEffect(() => {
    setCurrent(selected); // sync with server
  }, [selected]);

  const handleChange = (value) => {
    setCurrent(value);
    setOpen(false);

    // update URL with sortBy param
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`${pathname}?${params.toString()}`);
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
        rounded flex items-center justify-between bg-white 
        transition-all duration-200"
      >
        <span>
          Sort by:{" "}
          <span className="font-semibold text-gray-800">
            {options.find((o) => o.value === current)?.label}
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
                  current === option.value
                    ? "bg-pink-50 text-pink-600 font-semibold"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleChange(option.value)}
              >
                <input
                  type="radio"
                  name="sortBy"
                  checked={current === option.value}
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
