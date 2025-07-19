"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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
      {/* Sort By (Static or First Accordion) */}
      <div className="mb-4 p-4 bg-white w-[260px] rounded text-sm">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <DisclosureButton className="flex justify-between items-center w-full text-lg font-bold text-gray-800 cursor-pointer">
                Sort By
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>
              <DisclosurePanel>
                <ul className="mt-3 space-y-2">
                  {filters["Sort By"].map((option, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-800">
                      <input type="radio" name="sort" className="accent-pink-500" />
                      {option}
                    </li>
                  ))}
                </ul>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Filter Section */}
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
        <div className="space-y-3">
          {Object.entries(filters).map(([section, options]) => {
            if (section === "Sort By") return null;

            return (
              <Disclosure key={section}>
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex justify-between items-center w-full font-semibold text-gray-800 cursor-pointer py-1">
                      {section}
                      <ChevronDownIcon
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul className="mt-2 space-y-2 pl-2">
                        {options.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700">
                            <input type="checkbox" className="accent-pink-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
