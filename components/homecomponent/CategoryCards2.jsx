"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

export default function CategoryCards2({ bannerblocks }) {
  return (
    <section className="relative mb-8 lg:mb-1 mt-3 w-full">
      {/* ✅ Mobile Swiper */}
      <div className="block md:hidden p-2">
        <Swiper
          spaceBetween={12}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000, // 3 sec me slide change
            disableOnInteraction: false, // user swipe kare toh bhi auto chale
          }}
          loop={true} // infinite loop
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {bannerblocks &&
            bannerblocks.map((cat) => (
              <SwiperSlide key={cat.id}>
                <Link
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-80 mb-12 rounded-xl overflow-hidden group shadow-sm block"
                >
                  {/* Background Image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute lg:bottom-4 bottom-6  left-4 right-4 text-white">
                    <div className="text-lg font-bold drop-shadow">
                      {cat.title}
                    </div>
                    {cat.subtitle && (
                      <div className="opacity-90 text-xs">{cat.subtitle}</div>
                    )}
                    <button className="inline-flex items-center justify-center gap-2 text-sm font-medium shadow h-9 px-4 py-2 mt-3 bg-white text-black hover:bg-white/90 rounded-xl">
                      {cat.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* ✅ Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-3 p-2 lg:px-4 max-w-7xl mx-auto mb-2 lg:mb-5">
        {bannerblocks &&
          bannerblocks.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-85 lg:h-90 rounded-xl overflow-hidden group shadow-sm"
            >
              {/* Background Image */}
              <img
                src={`${cat.image}?tr-1080,h-1080`}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-lg md:text-2xl font-bold drop-shadow">
                  {cat.title}
                </div>
                {cat.subtitle && (
                  <div className="opacity-90 text-xs md:text-sm">
                    {cat.subtitle}
                  </div>
                )}
                <button className="inline-flex items-center justify-center gap-2 text-sm font-medium shadow h-9 px-4 py-2 mt-3 bg-white text-black hover:bg-white/90 rounded-xl">
                  {cat.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
