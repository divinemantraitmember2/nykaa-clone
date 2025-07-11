"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { insiderBuzzData, categoryData } from "../data/aesturaData";

export default function InsiderBuzz() {
  return (
    <section className="w-full">
      {/* Banner */}
      <div className="w-full">
        <Image
          src="https://images-static.nykaa.com/uploads/4c9c0e98-7787-4021-8fbe-bfcb4f8f53f3.jpg?tr=cm-pad_resize,w-1800"
          alt="Nykaa Banner"
          width={1800}
          height={200}
          className="w-full h-auto rounded-lg object-cover"
          priority
        />
      </div>

      {/* Category Scroll */}
      <div className="px-4 py-4">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          freeMode={true}
          modules={[FreeMode]}
          className="overflow-visible"
        >
          {categoryData.map((cat) => (
           <SwiperSlide
  key={cat.id}
  className="!w-[110px] sm:!w-[100px] md:!w-[110px] lg:!w-[120px] flex-shrink-0"
>
  <div className="bg-white shadow rounded-2xl w-full h-[110px] sm:h-[100px] md:h-[110px] lg:h-[120px] overflow-hidden flex items-center justify-center transition hover:shadow-md cursor-pointer">
    <div className="relative w-full h-full">
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        className="object-contain"
      />
    </div>
  </div>
</SwiperSlide>


          ))}
        </Swiper>
      </div>

      {/* Insider Buzz Cards */}
      <div className="px-4 pb-6">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          freeMode={true}
          modules={[FreeMode]}
          className="overflow-visible"
        >
          {insiderBuzzData.map((item) => (
            <SwiperSlide
              key={item.id}
              className="!w-[160px] sm:!w-[180px] md:!w-[200px] lg:!w-[220px] flex flex-col rounded-xl bg-white shadow"
            >
              <div className="relative w-full h-[230px] rounded-t-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-sm text-center font-medium text-gray-800 py-2 px-2">
                {item.title}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
