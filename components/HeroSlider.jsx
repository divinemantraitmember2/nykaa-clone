"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ hero }) {
  if (!hero || hero.length === 0) return null;
  // ✅ State for banner height (mobile shrink effect)
  console.log("hero",hero)

  
  return (
    <section className="relative w-full">
      {/* ✅ Banner fixed only for mobile */}
      <div className="lg:hidden  transition-all duration-300 ease-in-out">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="!pb-2 h-full"
        >
          {hero.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                href={item.href || "#"}
                className="block relative overflow-hidden group h-full"
              >
                <img
                  src={`${item.mobileimage}?tr=w-1080,h-1280`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* ✅ Overlay Content (Mobile) */}
                <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-lg">
                  <h5 className="text-lg font-bold">{item.title}</h5>
                  {item.subtitle && (
                    <p className="opacity-90 text-sm">{item.subtitle}</p>
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
      </div>

      {/* ✅ Desktop Banner (Normal scroll + Overlay) */}
      <div className="hidden lg:block relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
        >
          {hero.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                href={item.href || "#"}
                className="block relative overflow-hidden group"
              >
                <img
                  src={`${item?.image}?tr=w-1900,h-600`}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* ✅ Overlay Content (Desktop) */}
                <div className="absolute bottom-10 left-10 max-w-xl text-black drop-shadow-lg">
                  <h2 className="text-3xl font-bold">{item.title}</h2>
                  {item.subtitle && (
                    <p className="mt-2 text-lg opacity-90">{item.subtitle}</p>
                  )}
                  {item.cta && (
                    <button className="inline-flex items-center justify-center gap-2 text-base font-medium shadow-lg h-11 px-6 py-2 mt-5 bg-white text-black hover:bg-white/90 rounded-xl">
                      {item.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  )}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
