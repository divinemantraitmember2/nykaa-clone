"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ hero }) {
  if (!hero || hero.length === 0) return null;

  return (
    <section className="relative max-w-7xl mx-auto px-3 mt-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-10"
      >
        {hero.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={item.href || "#"}
              className="block relative h-64 md:h-80 rounded-2xl overflow-hidden group shadow-sm"
            >
              {/* Background image */}
              {/* <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              /> */}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
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
