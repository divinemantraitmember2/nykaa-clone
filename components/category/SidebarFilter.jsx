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
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SidebarFilter({ filters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const {
    colors = [],
    genders = [],
    price_range = [],
    sizes = [],
    attributes = [],
    categories,
  } = filters || {};

  // ✅ Group attributes
  const attributeGroups = attributes.reduce((acc, item) => {
    const { name, value } = item._id;
    if (!acc[name]) acc[name] = [];
    acc[name].push({ label: value, count: item.count });
    return acc;
  }, {});

  // ✅ Create dynamic filter sections
  const dynamicSections = {
    ...(categories && {
      Category: categories.map((c) => ({
        label: c._id,
        name: c.name,
        count: c.count,
      })),
    }),
    ...(colors.length && {
      Color: colors.map((c) => ({ label: c._id, count: c.count })),
    }),
    ...(sizes.length && {
      Size: sizes.map((s) => ({ label: s._id, count: s.count })),
    }),
    ...(genders.length && {
      Gender: genders.map((g) => ({ label: g._id, count: g.count })),
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

  // ✅ Identify if section is attribute
  const isAttributeSection = (section) => {
    const standardSections = [
      "Category",
      "Color",
      "Size",
      "Gender",
      "Price Range",
    ];
    return !standardSections.includes(section);
  };

  // ✅ Checkbox change handler
  const handleCheckboxChange = (section, label) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    const paramKey = isAttributeSection(section)
      ? `attributes[${section.toLowerCase()}]`
      : section.toLowerCase().replace(/ /g, "_");

    const existingValues = currentParams.getAll(paramKey);
    const updatedValues = existingValues.includes(label)
      ? existingValues.filter((v) => v !== label)
      : [...existingValues, label];

    currentParams.delete(paramKey);
    updatedValues.forEach((val) => currentParams.append(paramKey, val));

    router.push(`?${currentParams.toString()}`);
  };

  // ✅ Reset filters
  const handleReset = () => {
    router.push(window.location.pathname);
  };

  // ✅ Filter Sections
  const FilterSections = () => (
    <div className="space-y-3">
      {Object.entries(dynamicSections).map(([section, options]) => (
        <Disclosure key={section} defaultOpen={["Category"].includes(section)}>
          {({ open }) => (
            <div className="bg-white border-gray-100 overflow-hidden">
              <DisclosureButton className="flex justify-between w-full font-medium text-gray-800 text-sm py-3 hover:bg-gray-50 transition">
                <span className="text-[#212121] uppercase text-[16px] font-[400] leading-6 tracking-[0.38px] font-sans">
                  {section}
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>

              <DisclosurePanel className="py-1 bg-gray-50">
                <ul className="flex flex-wrap gap-2 text-xs p-2 text-gray-700">
                  {options.map((item, i) => {
                    const paramKey = isAttributeSection(section)
                      ? `attributes[${section.toLowerCase()}]`
                      : section.toLowerCase().replace(/ /g, "_");

                    const selectedValues = searchParams.getAll(paramKey);
                    const isChecked = selectedValues.includes(item.label);

                    // ✅ Category -> show name, others -> show label
                    const displayText =
                      section === "Category" ? item.name : item.label;

                    return (
                      <li key={i}>
                        <label className="inline-flex items-center gap-1 cursor-pointer select-none rounded-full border border-gray-200 px-1 py-1.5 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            className="accent-pink-500 w-4 h-4 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-300"
                            onChange={() =>
                              handleCheckboxChange(section, item.label)
                            }
                          />
                          <span className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
                              {displayText}
                            </span>
                            <span className="text-xs text-gray-600 font-medium rounded-full bg-gray-100 px-1 py-0.5">
                              {item.count}
                            </span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4 flex justify-end px-4">
        <button
          className="flex items-center gap-1 p-1 px-1 text-md text-gray-700 border rounded border-gray-400 hover:bg-gray-50 transition"
          onClick={() => setIsMobileOpen(true)}
        >
          <FunnelIcon className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block">
        <div className="text-sm font-sans bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Filters</h3>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-sm font-medium text-gray-400 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 hover:text-gray-600 transition"
            >
              <span>Reset</span>
              <ArrowPathIcon className="w-4 h-4" />
            </button>
          </div>
          <FilterSections />
        </div>
      </aside>

      {/* Mobile filter drawer */}
      <Dialog
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        className="relative z-50 md:hidden"
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        <div className="fixed inset-0">
          <Dialog.Panel className="w-full h-full bg-white p-5 overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
              <div className="flex gap-1">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-sm font-medium text-gray-400 border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-50 hover:text-gray-600 transition"
                >
                  <span>Reset</span>
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="hover:bg-gray-100 p-2 rounded-full"
                >
                  <XMarkIcon className="w-8 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            <FilterSections />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
