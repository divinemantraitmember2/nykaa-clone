"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function ShopTopCategories() {
  return (
    <div className="w-full bg-white px-4 sm:px-2 lg:px-10 py-10">
      <h2 className="text-start text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
        SHOP TOP CATEGORIES
      </h2>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <CategoryCard key={index} name={cat.name} image={cat.image} slug={cat.slug} />
        ))}
      </div>

      {/* Swiper for mobile and tablet */}
      <div className="lg:hidden">
        <Swiper
          className="shop-top-cat-swiper"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <CategoryCard name={cat.name} image={cat.image}slug={cat.slug} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function CategoryCard({ name, image,slug }) {
  return (
    <div className="bg-pink-100 transition-shadow duration-300">
      {/* Full-size Image Container */}
      <Link href={`/${slug}`}>
      <div className="relative w-full h-85 overflow-hidden group">
        <Image
          src={image} // 👈 Removed width/height query param
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="py-2 text-center">
        <p className="text-sm sm:text-base font-semibold text-gray-700">
          {name}
        </p>
      </div>
      </Link>
    </div>
  );
}

const categories = [
  {
    name: "Men",
    slug: "men",
    image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
  },
  {
    name: "Women",
    slug: "women",
    image: "/images/women.avif",
  },
  {
    name: "Kids",
    slug: "kids",
    image: "https://ik.imagekit.io/pondric/catalog/product/kg01/lavender/kg01-lavender-01.avif",
  },
  {
    name: "Topwear",
    slug: "men-bottomwear",
    image: "/images/topwear.avif",
  },
  {
    name: "Bottomwear",
    slug: "men-topwear",
    image: "/images/bottmwear.avif",
  },
  {
    name: "Indian Wear",
    slug: "women-indianwear",
    image: "/images/indiaweare.avif",
  },
  {
    name: "Western Wear",
    slug: "women-westernwear",
    image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
  },
];
