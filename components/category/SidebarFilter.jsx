"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import {
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SidebarFilter({ filters, onFilterChange }) {
  const {
    colors = [],
    genders = [],
    price_range = [],
    sizes = [],
    attributes = [],
    categories,
  } = filters || {};

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const attributeGroups = attributes.reduce((acc, item) => {
    const { name, value } = item._id;
    if (!acc[name]) acc[name] = [];
    acc[name].push({ label: value, count: item.count });
    return acc;
  }, {});

  const dynamicSections = {
    ...(categories && {
      Category: categories.map((c) => ({
        label: c.name,
        count: c.count,
      })),
    }),
    ...(colors.length && {
      Color: colors.map((c) => ({
        label: c._id,
        count: c.count,
      })),
    }),
    ...(sizes.length && {
      Size: sizes.map((s) => ({
        label: s._id,
        count: s.count,
      })),
    }),
    ...(genders.length && {
      Gender: genders.map((g) => ({
        label: g._id,
        count: g.count,
      })),
    }),
    ...(price_range.length && {
      "Price Range": price_range.map((p) => ({
        label: p.label,
        count: p.count,
      })),
    }),
    ...Object.entries(attributeGroups).reduce((acc, [key, values]) => {
      if (values.length) {
        acc[key.charAt(0).toUpperCase() + key.slice(1)] = values;
      }
      return acc;
    }, {}),
  };

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
      const key = section.toLowerCase().replace(/ /g, "_");
      queryFilters[key] = values.join(",");
    });
    onFilterChange(queryFilters);
  };

  const FilterSections = () => (
    <div className="space-y-2">
      {Object.entries(dynamicSections).map(([section, options]) => (
        <Disclosure key={section}>
          {({ open }) => (
            <>
              <DisclosureButton className="flex justify-between w-full font-semibold text-fiter-color text-base py-2 border-b border-gray-200">
                {section}
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>
              <DisclosurePanel className="pt-3">
                <ul className="space-y-2 text-sm text-gray-700">
                  {options.map((item, i) => {
                    const isChecked = selectedFilters[section]?.includes(item.label);
                    return (
                      <li key={i} className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            className="accent-pink-600 w-4 h-4 rounded"
                            onChange={() => handleCheckboxChange(section, item.label)}
                          />
                          <span>{item.label}</span>
                        </label>
                        <span className="text-xs text-gray-400 font-medium">
                          {item.count}
                        </span>
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
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4 flex justify-end px-2">
        <button
          className="flex items-center gap-2 text-sm px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:border-gray-400"
          onClick={() => setIsMobileOpen(true)}
        >
          <FunnelIcon className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block">
        <div className=" p-2  text-sm font-sans">
          <h3 className="text-lg font-bold  mb-4">Filters</h3>
          <FilterSections />
        </div>
      </aside>

      {/* Mobile Dialog Filter Panel */}
      <Dialog open={isMobileOpen} onClose={() => setIsMobileOpen(false)} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-end">
          <Dialog.Panel className="w-full max-w-sm bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button onClick={() => setIsMobileOpen(false)}>
                <XMarkIcon className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <FilterSections />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
