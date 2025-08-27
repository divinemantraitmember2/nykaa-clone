"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function BannerSlider({ banners }) {
  return (
    <div className="w-full relative mb-3">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="banner-swiper"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            <a href={banner.href} title={banner.title}>
              <div className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden rounded-2xl">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
