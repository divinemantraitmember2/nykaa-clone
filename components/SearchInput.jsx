"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchDropdown from "./SearchDropdown";

export default function SearchInput() {
  const [openSearch, setOpenSearch] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search products...");
  const [filteredResults, setFilteredResults] = useState([]);
  const [query, setQuery] = useState("");

  // Sample products (aap baad me API se bhi laa sakte ho)
  const Products = [
    {
      id: "68c4ed401f6d4c83203d8918",
      title: "Kratos Gym Pant",
      slug: "kratos-gym-pant",
      image:
        "https://ik.imagekit.io/pondric/catalog/product/mp05/blue/mp05-blue_main.jpg",
      price: 2200,
    },
    {
      id: "68c4ed401f6d4c83203d8919",
      title: "Black Slim Fit T-Shirt",
      slug: "black-slim-fit-t-shirt",
      image:
        "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
      price: 1500,
    },
    {
      id: "68c4ed401f6d4c83203d891a",
      title: "Basic Round Neck T-Shirt",
      slug: "basic-round-neck-t-shirt",
      image:
        "https://ik.imagekit.io/pondric/catalog/product/mpt02/red/mpt02_red_01.avif",
      price: 799,
    },
    {
      id: "68c4ed401f6d4c83203d891b",
      title: "Blue Washed Comfortable Casual Jeans",
      slug: "blue-washed-comfortable-casual-jeans",
      image:
        "https://ik.imagekit.io/pondric/catalog/product/mp06/blue/mp06-blue-01.avif",
      price: 999,
    },
  ];

  const suggestions = ["T-Shirts...", "Jeans...", ...Products.map((p) => p.title)];

  // 🔄 Rotate placeholder
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(suggestions[index]);
      index = (index + 1) % suggestions.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Search filter
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredResults([]);
      return;
    }
    const results = Products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(results);
  }, [query]);

  return (
    <div className="relative">
      {/* Input box */}
      <div className="flex items-center bg-white p-1  border border-[#e2e8f0] ">
        <Search className="text-pink-600 mr-2 text-sm" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpenSearch(true);
          }}
          onClick={() => setOpenSearch(true)}
          placeholder={`Search ${placeholder}`}
          className="rounded  py-2 mx-2 bg-white text-sm w-70 
                       focus:border-[#e2e8f0] focus:outline-none"
        />
      </div>

      {/* Dropdown */}
      <SearchDropdown
        isOpen={openSearch && filteredResults.length > 0}
        onClose={() => setOpenSearch(false)}
        results={filteredResults}
      />
    </div>
  );
}
