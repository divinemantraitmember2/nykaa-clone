"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const categories = [
  { image: "https://images-static.nykaa.com/uploads/49e6ae70-6e96-44d6-8d56-a5359731b8ec.jpg?tr=w-180,cm-pad_resize", label: "Women" },
  { image: "https://images-static.nykaa.com/uploads/a66486e0-8eb4-4ef1-a6be-4a135f16432a.jpg?tr=w-180,cm-pad_resize", label: "Men" },
  { image: "https://images-static.nykaa.com/uploads/585628e7-8d3a-45b1-aedc-195daff883ff.jpg?tr=w-180,cm-pad_resize", label: "Kids" },
  { image: "https://images-static.nykaa.com/uploads/d92a7ba6-ed6b-4d4e-a3ed-2524525ee042.jpg?tr=w-180,cm-pad_resize", label: "Home" },
  { image: "https://images-static.nykaa.com/uploads/3918fadc-f7d4-4c90-b698-05a083736705.jpg?tr=w-180,cm-pad_resize", label: "Luxe Edit" },
  { image: "https://images-static.nykaa.com/uploads/d2145972-3bfb-4f68-aff1-2b6bb376b59b.jpg?tr=w-180,cm-pad_resize", label: "Hidden Gems" },
  { image: "https://images-static.nykaa.com/uploads/f6a1b761-90bb-483c-ae5d-e17184459fd2.jpg?tr=w-180,cm-pad_resize", label: "Global Store" },
  { image: "https://images-static.nykaa.com/uploads/8f13793a-0156-49af-b20c-2323ec6cde3f.jpg?tr=w-180,cm-pad_resize", label: "Revolve" },
  { image: "https://images-static.nykaa.com/uploads/c1f68994-bc6d-4fb0-9cac-d0ce47d67838.jpg?tr=w-180,cm-pad_resize", label: "Holiday" },
  { image: "https://images-static.nykaa.com/uploads/c1f68994-bc6d-4fb0-9cac-d0ce47d67838.jpg?tr=w-180,cm-pad_resize", label: "Holiday" },
  { image: "https://images-static.nykaa.com/uploads/c1f68994-bc6d-4fb0-9cac-d0ce47d67838.jpg?tr=w-180,cm-pad_resize", label: "Holiday" },
];

export default function CategorySwiper() {
  return (
    <div className="px-4 py-20 relative">
      <h3 className="text-sm text-gray-500 font-semibold uppercase">Our Stores</h3>
      <h2 className="text-2xl font-bold mb-10">Find everything for your every need</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={3.5}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 4.5 },
          768: { slidesPerView: 5.5 },
          1024: { slidesPerView: 7.5 },
        }}
      >
        {categories.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-300 shadow-sm">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-semibold mt-2">{item.label}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
