"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const menuData = {
  Women: {
    "Indian Wear": [
      "Suit Sets",
      "Kurtis",
      "Sarees",
      "Lehengas",
      "Ethnic Dresses",
      "Tops & Tunics",
    ],
    "Western Wear": ["Dresses", "Jumpsuits", "Tops", "Jeans"],
  },
  Men: {
    Clothing: ["Shirts", "T-Shirts", "Trousers", "Jeans"],
    Footwear: ["Sneakers", "Sandals", "Formal Shoes"],
  },
};

export default function HeaderMenu() {
  const [hoveredMain, setHoveredMain] = useState(null);
  const [hoveredSub, setHoveredSub] = useState(null);

  return (
    <div className="w-full bg-white shadow relative z-50">
      {/* Header container */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-start gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        </Link>

        {/* Category links */}
        <div className="flex gap-6 flex-wrap">
          {Object.keys(menuData).map((main) => (
            <div
              key={main}
              className="relative"
              onMouseEnter={() => setHoveredMain(main)}
              onMouseLeave={() => {
                setHoveredMain(null);
                setHoveredSub(null);
              }}
            >
              <button className="font-semibold text-base text-black hover:text-pink-600">
                {main}
              </button>

              {hoveredMain === main && (
                <div className="absolute left-0 top-[60px] w-screen bg-white border-t shadow-xl py-6 px-4 z-40">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto text-left">
                    {Object.entries(menuData[main]).map(
                      ([category, items]) => (
                        <div
                          key={category}
                          onMouseEnter={() => setHoveredSub(category)}
                          onMouseLeave={() => setHoveredSub(null)}
                        >
                          <div className="font-semibold text-pink-600 mb-2">
                            {category}
                          </div>

                          {hoveredSub === category && (
                            <ul className="space-y-1">
                              {items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/${main.toLowerCase()}/${category
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}/${item
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    className="text-gray-700 hover:underline text-sm"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
