"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Dialog,
} from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleGetFitterComponent } from "../../slices/userSlice";

export default function SidebarFilter({ filters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const getFilterByStatus = useSelector((state) => state.user.GetFitterComponent);

  // ✅ Local staged filters state
  const [localFilters, setLocalFilters] = useState({});

  useEffect(() => {
    if (getFilterByStatus) {
      setIsMobileOpen(getFilterByStatus);
    }
  }, [getFilterByStatus, dispatch]);

  function closeFilter() {
    dispatch(toggleGetFitterComponent());
    setIsMobileOpen(false);
  }

  const {
    colors = [],
    genders = [],
    price_range = [],
    discount_range = [],
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

  // ✅ Dynamic sections
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
    ...(discount_range.length && {
      "Discount Range": discount_range.map((d) => ({
        label: d.label,
        count: d.count,
      })),
    }),
    ...Object.entries(attributeGroups).reduce((acc, [key, values]) => {
      if (values.length) {
        acc[key.charAt(0).toUpperCase() + key.slice(1)] = values;
      }
      return acc;
    }, {}),
  };

  const isAttributeSection = (section) => {
    const standardSections = [
      "Category",
      "Color",
      "Size",
      "Gender",
      "Price Range",
      "Discount Range",
    ];
    return !standardSections.includes(section);
  };

  // ✅ Checkbox toggle → localFilters update
  const handleCheckboxChange = (section, label) => {
    const paramKey = isAttributeSection(section)
      ? `attributes[${section.toLowerCase()}]`
      : section.toLowerCase().replace(/ /g, "_");

    const finalKey = paramKey === "category" ? "category_slug" : paramKey;

    setLocalFilters((prev) => {
      const existingValues = prev[finalKey] || [];
      const updatedValues = existingValues.includes(label)
        ? existingValues.filter((v) => v !== label)
        : [...existingValues, label];

      return { ...prev, [finalKey]: updatedValues };
    });
  };

  // ✅ Apply button click → URL update
  const handleApply = () => {
    const currentParams = new URLSearchParams();
    Object.entries(localFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        currentParams.set(key, values.join(","));
      }
    });

    const queryString = currentParams.toString().replace(/%2C/g, ",");
    router.push(`?${queryString}`);
    closeFilter();
  };

  // ✅ Reset filters
  const handleReset = () => {
    setLocalFilters({});
    router.push(window.location.pathname);
  };

  // ✅ Active filter chips
  const activeFilters = [];
  Object.entries(localFilters).forEach(([key, values]) => {
    values.forEach((val) => {
      let displayValue = val;
      if (key === "category_slug" && categories) {
        const matched = categories.find((c) => c._id === val);
        if (matched) displayValue = matched.name;
      }
      activeFilters.push({ key, value: val, displayValue });
    });
  });

  // ✅ Filter sections
  const FilterSections = () => (
    <div className="space-y-3">
      {Object.entries(dynamicSections).map(([section, options]) => {
        let paramKey = isAttributeSection(section)
          ? `attributes[${section.toLowerCase()}]`
          : section.toLowerCase().replace(/ /g, "_");

        if (paramKey === "category") paramKey = "category_slug";

        const selectedValues = localFilters[paramKey] || [];

        return (
          <Disclosure key={section} defaultOpen={["Category"].includes(section)}>
            {({ open }) => (
              <div className="bg-white border-gray-100 overflow-hidden">
                <DisclosureButton className="flex justify-between w-full font-medium text-gray-800 text-sm py-2 hover:bg-gray-50 transition">
                  <span className="capitalize text-[16px] font-[400] leading-6 tracking-[0.38px]">
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
                      const isChecked = selectedValues.includes(item.label);
                      const displayText =
                        section === "Category" ? item.name : item.label;

                      return (
                        <li key={i}>
                          <label className="inline-flex items-center gap-1 cursor-pointer select-none rounded-full border border-gray-200 px-1 py-1.5 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              className="accent-pink-500 w-4 h-4 rounded-md border-gray-300 shadow-sm"
                              onChange={() =>
                                handleCheckboxChange(section, item.label)
                              }
                            />
                            <span className="flex items-center gap-2">
                              <span className="text-gray-700 font-medium">
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
        );
      })}
    </div>
  );

  // ✅ Active filter chips
  const ActiveFilterChips = () =>
    activeFilters.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-2">
        {activeFilters.map((f, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full shadow-sm"
          >
            {f.displayValue}
            <XMarkIcon
              className="w-4 h-4 cursor-pointer hover:text-red-600"
              onClick={() =>
                setLocalFilters((prev) => ({
                  ...prev,
                  [f.key]: prev[f.key].filter((v) => v !== f.value),
                }))
              }
            />
          </span>
        ))}
      </div>
    );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block">
        <div className="text-sm font-sans bg-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-semibold text-gray-900">Filters</h3>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-sm font-medium text-gray-400 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 hover:text-gray-600 transition"
            >
              <span>Reset</span>
            </button>
             
          </div>
          
          <ActiveFilterChips />
         {activeFilters.length > 0 && (
  <div className="flex justify-end">
    <button
      onClick={handleApply}
      className="px-2 font-bold bg-black text-white py-2 rounded-md hover:bg-pink-600"
    >
      Apply Filters
    </button>
  </div>
)}
          <FilterSections />

          {/* ✅ Apply Button for Desktop */}
        
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

              <button onClick={() => closeFilter()}>
                <XMarkIcon className="w-8 h-6 text-gray-700" />
              </button>
            </div>
            <div className="flex justify-end">
               <button
              onClick={handleReset}
              className="flex items-center gap-1  text-sm font-medium text-gray-400 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 hover:text-gray-600 transition"
            >
              <span>Reset</span>
            </button>
            </div>

            <ActiveFilterChips />
            {activeFilters.length > 0 && (
  <div className="flex justify-end">
    <button
      onClick={handleApply}
      className="px-2 font-bold bg-black text-white py-2 rounded-md hover:bg-pink-600"
    >
      Apply Filters
    </button>
  </div>
)}
            <FilterSections />
            
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
