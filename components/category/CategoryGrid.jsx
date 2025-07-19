"use client";

import Link from "next/link";

export default function CategoryGrid({ categories = [] }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shop by Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/${category.slug}`}
            className="group border rounded-xl p-4 bg-[#f9f9f9] hover:bg-pink-50 shadow-sm transition-all duration-300"
          >
            <div className="text-pink-600 text-lg font-semibold mb-2 group-hover:underline">
              {category.name}
            </div>
            <div className="text-sm text-gray-600 break-words">
              {category.slug}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
