"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function MobileDrawer({ isOpen, onClose, links = [] }) {
  const [openGender, setOpenGender] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleGender = (index) => {
    setOpenGender(openGender === index ? null : index);
    setOpenCategory(null); // close category when changing gender
  };

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#faf4ec]">
          <span className="text-lg font-bold text-black">Menu</span>
          <button onClick={onClose} className="text-gray-600 text-lg">✕</button>
        </div>

        {/* Links */}
        <nav className="flex flex-col text-md p-2  text-gray-700 font-semibold">
          {links.map((gender, genderIndex) => (
            <div key={genderIndex} className="border-b mb-2">
              <button
                onClick={() => toggleGender(genderIndex)}
                className="w-full text-left p-2 mb-2 flex justify-between items-center hover:text-pink-600"
              >
               <Link href={`/${gender.slug}`}> {gender.label}</Link>
                {openGender === genderIndex ? (
                  <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                )}
              </button>

              {/* Categories */}
              {openGender === genderIndex && gender.children?.length > 0 && (
                <div className="ml-2">
                  {gender.children.map((category, catIndex) => (
                    <div key={catIndex} className="border-b">
                      <button
                        onClick={() => toggleCategory(catIndex)}
                        className="w-full text-left p-2 mb-2 flex justify-between items-center text-sm hover:text-pink-600"
                      >
                        <Link href={`/${category.slug}`}> {category.label}</Link>
                       
                        {openCategory === catIndex ? (
                          <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                        )}
                      </button>

                      {/* Subcategories */}
                      {openCategory === catIndex && category.children?.length > 0 && (
                        <div className="ml-4 mb-3 flex flex-col gap-2 text-sm">
                          {category.children.map((sub, subIndex) => (
                            <Link
                              key={subIndex}
                              href={`/${sub.slug}`}
                              onClick={onClose}
                              className="py-1 px-2 hover:text-pink-600"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
