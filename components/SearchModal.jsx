"use client";
import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";

export default function SearchModal({ isOpen, onClose, results = [] }) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search products...");

  // ✅ Suggestions for dynamic placeholder
  const suggestions = [
    "Search Mobiles...",
    "Search Laptops...",
    "Search Shoes...",
    "Search Headphones...",
    "Search T-Shirts...",
    "Search Watches..."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(suggestions[index]);
      index = (index + 1) % suggestions.length; // loop
    }, 3000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  // ✅ Client-side filter
  const filteredResults = results.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 -top-3 z-50 flex items-start justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder} // ✅ dynamic placeholder
            className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="ml-2 p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <a
                key={item?.slug}
                href={`/product/${item.slug}`}
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-500 transition"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {item.subtitle || "High quality product, available now"}
                  </p>
                  <span className="text-lg font-bold text-blue-600 mt-1">
                    ₹{item.price}
                  </span>
                </div>
              </a>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-6">
              No results found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
