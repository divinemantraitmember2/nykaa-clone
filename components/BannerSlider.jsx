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
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        className="banner-swiper"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            <a href={banner.href} title={banner.title} className="block w-full">
              <div className="w-full aspect-[1200/400] relative">
                <img
                  src={`${banner.image}?tr=w-1200,h-400`}
                  alt={banner.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
