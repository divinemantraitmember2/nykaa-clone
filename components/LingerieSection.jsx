"use client";

import Image from "next/image";
import { lingerieItems, promoSliders } from "../data/lingerieData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

export default function LingerieSection() {
  return (
    <section className="px-4 py-3">
      {/* Banner Section */}
      <div className="w-full">
  <Image
    src="https://images-static.nykaa.com/uploads/1b69ee93-e58b-42f1-ae9e-086e72950c61.jpg?tr=cm-pad_resize,w-1800"
    alt="Nykaa Banner"
    width={1800}
    height={600}
    className="w-full h-auto rounded-lg object-cover"
    priority
  />
</div>

      {/* Lingerie Slider */}
      <Swiper
        spaceBetween={12}
        slidesPerView={"auto"}
        freeMode={true}
        modules={[FreeMode]}
        className="px-1"
      >
        {lingerieItems.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!w-[180px] md:!w-[200px] bg-white rounded-lg overflow-hidden shadow cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[150px] object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="p-2 text-center font-semibold text-pink-700 text-sm">
              {item.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Promo Slider */}
      <div className="mt-6">
        <Swiper
          spaceBetween={12}
          slidesPerView={"auto"}
          freeMode={true}
          modules={[FreeMode]}
          className="px-1"
        >
          {promoSliders.map((promo) => (
            <SwiperSlide
              key={promo.id}
              className="!w-[240px] bg-white rounded-lg overflow-hidden shadow relative cursor-pointer"
            >
              <img
                src={promo.image}
                alt="Promo Banner"
                className="w-full h-[300px] object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="absolute left-4 bottom-4 bg-pink-600 text-white px-3 py-1 rounded shadow font-semibold text-sm">
                {promo.discount}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
