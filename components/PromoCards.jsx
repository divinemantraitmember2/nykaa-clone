"use client";

import { promoData } from "../data/promoData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function PromoSlider() {
  return (
    <div className="px-4 md:px-8 py-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {promoData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[360px] rounded-xl overflow-hidden shadow group">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0" />
              <div className="absolute z-10 text-white left-5 bottom-5 right-5 space-y-2">
                <p className="uppercase text-xs tracking-widest">{item.brand}</p>
                <h3 className="text-sm md:text-base font-semibold">{item.label}</h3>
                <div className="mt-2">
                  <h2 className="text-lg md:text-xl font-bold">{item.title}</h2>
                  <p className="text-sm">{item.subtitle}</p>
                </div>
                <button className="mt-3 px-4 py-2 bg-white text-pink-600 font-semibold rounded-full text-sm hover:bg-pink-100 transition-all">
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
