"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRef, useEffect } from "react";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

export default function ProductImage({ ProductImages }) {
  const firstVariant = ProductImages?.[0] || {};
  const images = firstVariant?.image_url || [];

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, []);

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
      swiperRef.current.swiper.slideToLoop(0);
    }
  };

  return (
    <div
      className="relative w-full h-60 overflow-hidden rounded-xl group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.length > 0 ? (
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              // Custom bullet design
              return `<span class="${className} ${
                className.includes("swiper-pagination-bullet-active")
                  ? "bg-red-600 w-6 h-2 rounded-full"
                  : "bg-gray-300 w-2 h-2 rounded-full"
              }"></span>`;
            },
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-60">
                <Image
                  src={img}
                  alt={firstVariant.color || "Product"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}

          {/* Pagination container */}
          {/* <div className="swiper-pagination absolute bottom-2 left-1/2 -translate-x-1/2"></div> */}
        </Swiper>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
          No Image
        </div>
      )}
    </div>
  );
}
