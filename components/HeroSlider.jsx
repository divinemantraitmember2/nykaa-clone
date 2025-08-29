"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ hero }) {
  if (!hero || hero.length === 0) return null;

  return (
    <section className="relative max-w-7xl mx-auto">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 1.5 }, // Tablet
          1024: { slidesPerView: 1 }, // Desktop
        }}
        className="!pb-10"
      >
        {hero.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={item.href || "#"}
              className="block relative overflow-hidden group"
            >
              {/* Desktop Image */}
              <img
                src={`${item?.image}?tr=w-1600,h-500`}
                alt={item.title}
                className="w-full hidden lg:block object-cover transition-transform duration-500 group-hover:scale-105 h-[400px]"
              />

              {/* Mobile Image */}
              <img
                src={`${item?.image}?tr=w-1600,h-500`}
                alt={item.title}
                className="w-full lg:hidden object-cover transition-transform duration-500 group-hover:scale-105 h-[230px] sm:h-[350px]"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0" />

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 text-black lg:px-4">
                <h5 className="text-lg md:text-2xl font-bold drop-shadow">
                  {item.title}
                </h5>
                {item.subtitle && (
                  <p className="opacity-90 text-xs md:text-sm">
                    {item.subtitle}
                  </p>
                )}
                {item.cta && (
                  <button className="inline-flex items-center justify-center gap-2 text-sm font-medium shadow h-9 px-4 py-2 mt-3 bg-white text-black hover:bg-white/90 rounded-xl">
                    {item.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
