"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function SidebarFilter({ filters, onFilterChange }) {
  const {
    colors = [],
    genders = [],
    price_range = [],
    sizes = [],
    attributes = [],
    categories, // no default so we can check null explicitly
  } = filters || {};

  // Group attributes like material, pattern, etc.
  const attributeGroups = attributes.reduce((acc, item) => {
    const { name, value } = item._id;
    if (!acc[name]) acc[name] = [];
    acc[name].push({ label: value, count: item.count });
    return acc;
  }, {});

  // Collect available filter sections conditionally (without looping keys)
  const dynamicSections = {
    ...(categories ? {
      Category: categories.map((c) => ({
        label: c.name,
        count: c.count,
      })),
    } : {}),
    ...(colors.length ? {
      Color: colors.map((c) => ({
        label: c._id,
        count: c.count,
      })),
    } : {}),
    ...(sizes.length ? {
      Size: sizes.map((s) => ({
        label: s._id,
        count: s.count,
      })),
    } : {}),
    ...(genders.length ? {
      Gender: genders.map((g) => ({
        label: g._id,
        count: g.count,
      })),
    } : {}),
    ...(price_range.length ? {
      "Price Range": price_range.map((p) => ({
        label: p.label,
        count: p.count,
      })),
    } : {}),
    ...Object.entries(attributeGroups).reduce((acc, [key, values]) => {
      if (values.length) {
        acc[key.charAt(0).toUpperCase() + key.slice(1)] = values;
      }
      return acc;
    }, {}),
  };

  // Show if any section was null or missing (no loop)
  const missingSections = [];
  if (!categories) missingSections.push("Category");

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (section, label) => {
    const current = selectedFilters[section] || [];
    const updated = current.includes(label)
      ? current.filter((v) => v !== label)
      : [...current, label];

    const newFilters = { ...selectedFilters, [section]: updated };
    setSelectedFilters(newFilters);
    triggerParentFilterChange(newFilters);
  };

  const triggerParentFilterChange = (selected) => {
    const queryFilters = {};
    Object.entries(selected).forEach(([section, values]) => {
      if (values.length === 0) return;
      const key = section.toLowerCase().replace(" ", "_");
      queryFilters[key] = values.join(",");
    });
    onFilterChange(queryFilters);
  };

  const staticSortOptions = [
    "Name",
    "Customer Top Rated",
    "New Arrivals",
    "Price: High To Low",
    "Price: Low To High",
  ];

  return (
    <aside className="hidden md:block">
      {/* Sort By */}
      <div className="mb-4 p-4 bg-white w-[260px] rounded text-sm">
        <Disclosure>
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
                  {staticSortOptions.map((option, i) => (
                    <li key={i + 400} className="flex items-center gap-2 text-gray-800">
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

      {/* Filters */}
      <div className="bg-white p-4 w-[260px] rounded text-sm sticky top-[127px] h-[calc(100vh-140px)] overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Filter By</h3>

        {/* Null section warnings (no loop) */}
        {missingSections.length > 0 && (
          <div className="mb-4 text-sm text-red-500">
            Missing: {missingSections.join(", ")}
          </div>
        )}

        <div className="space-y-3">
          {Object.entries(dynamicSections).map(([section, options]) => (
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
                      {options.map((item, i) => {
                        const isChecked = selectedFilters[section]?.includes(item.label);
                        return (
                          <li key={i} className="flex items-center gap-2 text-gray-700">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              className="accent-pink-500"
                              onChange={() => handleCheckboxChange(section, item.label)}
                            />
                            {item.label}
                            <span className="text-xs text-gray-400">({item.count})</span>
                          </li>
                        );
                      })}
                    </ul>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </aside>
  );
}
