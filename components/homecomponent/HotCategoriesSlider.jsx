"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const hotCategories = [
  {
    image: "https://images-static.nykaa.com/uploads/0c03c92b-7e09-4d2b-b41f-49db0d0b40e4.jpg?tr=w-300,cm-pad_resize",
    label: "MINI DRESSES",
    discount: "Min 45% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/1b548957-0572-4134-b2eb-a9d2c7acf4ee.jpg?tr=w-300,cm-pad_resize",
    label: "EMBROIDERED SALWAR SUITS",
    discount: "Min 40% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/1ee7de56-40b2-4ffb-9864-28d46e150970.jpg?tr=w-300,cm-pad_resize",
    label: "RELAXED SHIRTS",
    discount: "Min 40% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/d9fd2504-564a-4a4a-89c3-4416063e9268.jpg?tr=w-300,cm-pad_resize",
    label: "FESTIVE ANARKALI SETS",
    discount: "Min 40% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/094b711b-d16f-4297-80e2-63f805a4aac3.jpg?tr=w-300,cm-pad_resize",
    label: "OVERSIZED TEES",
    discount: "Min 45% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/8fc34956-8c35-4000-b005-2a9f5ade92b3.jpg?tr=w-300,cm-pad_resize",
    label: "HOTTEST HEELS",
    discount: "Min 40% off",
  },
];

export default function HotCategoriesSlider() {
  return (
    <section className="bg-pink-100 py-6 px-4">
      <h4 className="text-sm text-gray-600 font-semibold mb-1">
        WESTRERN WEAR CATEGORIES
      </h4>
      <h2 className="text-2xl font-bold mb-4">
        Style steals you can’t resist
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={16}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {hotCategories.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border-4 border-pink-200 hover:scale-[1.02] transition-transform duration-300">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-64 object-cover"
              />
              <p className="text-center text-sm font-semibold mt-2 pb-3">
                {item.discount}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
