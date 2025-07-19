"use client";

import { promoData } from "../data/promoData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


export default function PromoSlider() {
  return (
    <section className=" py-5">
      <div className="">
        <Image
                  src="https://images-static.nykaa.com/uploads/9d100298-daa3-48bc-8df3-70cc0ffb9e72.jpg?tr=cm-pad_resize,w-1800"
                  alt="PondricBanner"
                  width={1800}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                  priority
                />
       
      </div>
    <div className="px-4 md:px-8  bg-[#f3f5f7] py-6 ">
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
  <div className="relative w-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] xl:min-h-[450px] rounded-xl overflow-hidden shadow group">
    
    {/* Image */}
    <Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover w-full h-full group-hover:scale-104 transition-transform duration-500"
      sizes="(max-width: 640px) 100vw,
              (max-width: 768px) 90vw,
              (max-width: 1024px) 45vw,
              33vw"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20" />

    {/* Text Content */}
    <div className="absolute z-10 text-white left-4 bottom-4 right-4 space-y-2">
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
    </section>
  );
}
