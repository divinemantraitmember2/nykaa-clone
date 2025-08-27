"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function TopCategory() {
  const quickCategories = [
  {
    id: "qc1",
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "qc2",
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "qc3",
    name: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1516528387618-afa90b13e000?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "qc4",
    name: "New Arrivals",
    slug: "new",
    image:
      "https://images.unsplash.com/photo-1560852488-8a4d9d1c2ab0?q=80&w=600&auto=format&fit=crop",
  },
];

  return (
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/c/${cat.slug}`}
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

