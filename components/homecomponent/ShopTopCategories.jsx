"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function ShopTopCategories() {
  return (
    <div className="w-full bg-white px-4 sm:px-2 lg:px-10 py-20">
      <h2 className="text-start text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
        SHOP TOP CATEGORIES
      </h2>

      <div className="hidden lg:grid grid-cols-5 gap-6">
        {categories.map((cat, index) => (
          <CategoryCard key={index} name={cat.name} image={cat.image} />
        ))}
      </div>

      {/* Swiper for mobile and tablet */}
      <div className="lg:hidden">
        <Swiper
          className="shop-top-cat-swiper"
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <CategoryCard name={cat.name} image={cat.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function CategoryCard({ name, image }) {
  return (
    <div className="bg-pink-100 rounded-xl overflow-hidden shadow-pink-400 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-square overflow-hidden group">
        <Image
          src={`${image}?tr=w-212,h-283`}
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
    </div>
  );
}

const categories = [
  { name: "Topwear", image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif" },
  { name: "Bottomwear", image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif" },
  { name: "Indian Wear", image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif" },
  { name: "Western Wear", image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif" },
  { name: "Kids", image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif" },
];
