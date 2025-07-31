"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BottomBar({ category }) {
  const [getCategory, setGetCategory] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);

  useEffect(() => {
    setGetCategory(category || []);
  }, [category]);

  return (
    <section className="">
      {/* Sirf desktop view ke liye menu */}
      <div className="hidden md:block">
        {/* Main navigation bar */}
        <div className="bg-white  px-6 py-1  text-start text-sm font-medium text-gray-700 flex w-full">
          {getCategory?.[0]?.children?.map((firstMenu, index) => (
            <div
              key={index}
              className="relative group mx-3"
              onMouseEnter={() => setActiveLabel(firstMenu.label)}
              onMouseLeave={() => setActiveLabel(null)}
            >
              {/* Pehla menu item (full width mein row-wise honge) */}
              <div className="flex items-center gap-1 cursor-pointer mr-6  ">
                 <Link href={`/${firstMenu.slug}`} className="block hover:text-pink-600">
                  {firstMenu.label}
                 </Link>
                <ChevronDownIcon className="h-4 w-3 text-gray-500 group-hover:text-pink-600" />
              </div>

              {/* Agar second level children hain to dropdown submenu dikhaye */}
              {firstMenu.children?.length > 0 && (
                <div
                  className={`absolute left-0 top-full  bg-white shadow-lg border border-gray-100 py-1  min-w-[200px] z-50 transition-opacity duration-200 ${
                    activeLabel === firstMenu.label
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <ul className="flex flex-col gap-1">
  {firstMenu.children.map((secondMenu, idx) => (
    <li
      key={idx}
      className="text-md text-gray-800 hover:bg-[#faf4ec] hover:text-pink-600 cursor-pointer p-0 m-0"
    >
      <Link href={`/${secondMenu.slug}`} className="p-2 block">
        {secondMenu.label}
      </Link>
    </li>
  ))}
</ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
