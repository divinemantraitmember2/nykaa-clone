"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { nykaaOffersData } from "../data/aesturaData";
import ResponsiveBanner from "@/components/ResponsiveBanner";

export default function NykaaOffersSlider() {
  return (
    <section className="w-full">
         <div className="w-full">
          <Image
            src="https://images-static.nykaa.com/uploads/e13a0a13-6c99-4596-8a30-0f173a3b5c01.jpg?tr=cm-pad_resize,w-1800"
            alt="Nykaa Banner"
            width={1800}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
            priority
          />
        </div>
        
              
    <div className="bg-white px-4">
      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        className="px-2"
      >
        {nykaaOffersData.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!w-[160px] sm:!w-[180px] md:!w-[200px] text-left"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative w-full h-52 sm:h-60 md:h-64 rounded-t-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.label || "Nykaa Offer"}
                  fill
                  className="object-cover"
                />
                {item.label && (
                  <span className="absolute bottom-2 left-2 bg-white/90 text-black text-xs font-medium px-2 py-0.5 rounded-md">
                    {item.label}
                  </span>
                )}
              </div>
              <p className="text-[14px] sm:text-sm font-semibold mt-2 px-1 leading-tight text-black">
                {item.offer}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </section>
  );
}
