"use client";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function TopCategory({quickCategories}) {
  

  return (
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        { quickCategories && quickCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`${cat.slug}`}
            className="group rounded-2xl overflow-hidden shadow-sm bg-zinc-50"
          >
            {/* Image */}
            <div
              className="h-36 bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${cat.image})` }}
            />

            {/* Label */}
            <div className="p-3 text-center font-semibold group-hover:opacity-80">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>

  );
}

