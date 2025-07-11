"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { nykaaTrendingData } from "../data/nykaaTrendingData";
import Image from "next/image";
import ResponsiveBanner from "@/components/ResponsiveBanner";

export default function NykaaTrendingSlider() {
  return (
    <div className="w-full">
     
       <ResponsiveBanner
        imageUrl="https://images-static.nykaa.com/uploads/1e4f2bc2-b2f4-44a5-9ad9-6dbafae04578.jpg?tr=cm-pad_resize,w-1800"
        altText="Nykaa Banner"
        heightClasses="h-[180px] sm:h-[180px] md:h-[200px] lg:h-[200px]"
      />
      

      {/* Swiper Slider */}
      <div className="bg-pink-50 px-4 py-4">
        <Swiper
          spaceBetween={12}
          slidesPerView={"auto"}
          freeMode
          className="px-2"
        >
          {nykaaTrendingData.map((item) => (
            <SwiperSlide
              key={item.id}
              className="!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[200px] text-center bg-white rounded-2xl overflow-hidden shadow-md"
            >
              <div className="relative w-full h-50 sm:h-60 md:h-80 lg:h-90">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-pink-300 text-white text-xs sm:text-sm font-medium py-2 px-1 rounded-b-2xl">
                {item.title}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-pink-600 hover:bg-pink-700 text-white text-sm md:text-base font-semibold px-6 py-2 rounded-full">
          Explore All Brands
        </button>
      </div>
    </div>
  );
}
