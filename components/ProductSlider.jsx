"use client";

import { productData } from "../data/productData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductSlider() {
  return (
    <div>
        <div className="w-full mt-15">
        <div className="w-full relative h-[210px] md:h-[210px]">
  <Image
    src="https://images-static.nykaa.com/uploads/12d8a5aa-3f12-4418-9e84-a7081337be96.jpg?tr=cm-pad_resize,w-1800"
    alt="Nykaa Banner"
    fill
    className="object-cover"
  />
</div>
    </div>
    
    <div className="bg-pink-50 py-6 px-3 md:px-10 relative">
      {/* Custom Navigation Buttons - visible on md+ only */}
      <button className="swiper-button-prev-custom hidden md:flex items-center justify-center absolute left-1 top-1/2 z-10 -translate-y-1/2 bg-white text-lg shadow rounded-full w-9 h-9">
        {"<"}
      </button>
      <button className="swiper-button-next-custom hidden md:flex items-center justify-center absolute right-1 top-1/2 z-10 -translate-y-1/2 bg-white text-lg shadow rounded-full w-9 h-9">
        {">"}
      </button>

      <Swiper
        spaceBetween={6} // Less gap on mobile
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 2.6 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {productData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white rounded-xl shadow-md p-2 w-full min-w-0">
              <div className="relative w-full h-40 mb-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {item.brand}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {item.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">{item.size}</p>
              <div className="mt-1 text-sm">
                <span className="text-black font-bold">₹{item.price}</span>{" "}
                <span className="line-through text-gray-500 text-xs">
                  ₹{item.originalPrice}
                </span>{" "}
                <span className="text-green-600 font-medium">
                  {item.discount}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
}
