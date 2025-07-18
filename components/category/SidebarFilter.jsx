"use client";

import { useState } from "react";

const filters = {
  "Sort By": [
    "Name",
    "Customer Top Rated",
    "New Arrivals",
    "Price: High To Low",
    "Price: Low To High",
  ],
  "Category": ["Men's Store", "Natural"],
  "Discount": ["10% or more", "20% or more", "30% or more"],
  "Avg Customer Rating": ["4★ & above", "3★ & above"],
  "Preference": ["Cruelty Free", "Organic"],
  "Concern": ["Hair Fall", "Dandruff"],
  "Formulation": ["Cream", "Gel", "Liquid"],
  "Hair Type": ["Dry", "Oily", "Normal"],
  "Gender": ["Men", "Women", "Unisex"],
  "Conscious": ["Paraben Free", "Sulphate Free"],
  "Country Of Origin": ["India", "USA", "Korea"],
  "Ingredient": ["Argan Oil", "Keratin"],
};

export default function SidebarFilter() {
  return (
    <aside className="hidden md:block">
      {/* Sort By Section (Collapsible) */}
      <div className="mb-4 p-4 bg-white w-[260px] rounded text-sm">
        <details  className="mb-3">
          <summary className="text-lg font-bold text-gray-800 cursor-pointer select-none">
            Sort By
          </summary>
          <ul className="mt-3 space-y-2 pl-1">
            {filters["Sort By"].map((option, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-800">
                <input type="radio" name="sort" className="accent-pink-500" />
                {option}
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Filter By Section */}
      <div
        className="
          bg-white 
          p-4 
          w-[260px] 
          rounded 
          text-sm 
          sticky 
          top-[127px] 
          h-[calc(100vh-140px)] 
          overflow-y-auto
        "
      >
        <h3 className="text-lg font-bold text-gray-800 mb-3">Filter By</h3>
        {Object.entries(filters).map(([section, options]) => {
          if (section === "Sort By") return null;

          return (
            <details key={section} className="mb-3">
              <summary className="font-semibold text-gray-800 py-1 cursor-pointer select-none">
                {section}
              </summary>
              <ul className="pl-4 mt-2 space-y-2">
                {options.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <input type="checkbox" className="accent-pink-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </aside>
  );
}
