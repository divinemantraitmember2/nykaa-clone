"use client";
import { heroData } from "../data/heroData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function HeroSlider() {
  return (
    <div className="w-full py-4 px-2 md:px-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.1}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
      >
        {heroData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[330px] rounded-lg overflow-hidden group shadow-md">
              {/* Optimized Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 z-0" />

              {/* Text Content */}
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <h2 className="text-xl md:text-2xl font-bold">{item.title}</h2>
                <p className="text-sm md:text-base">{item.subtitle}</p>
                <button className="mt-3 px-4 py-2 bg-white text-pink-600 font-semibold rounded-full text-sm shadow hover:bg-pink-100 transition-all">
                  {item.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
