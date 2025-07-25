"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const brandData = [
  {
    image: "https://images-static.nykaa.com/uploads/13f19a29-a01d-42c9-b8c2-236340e0674d.jpg?tr=w-300,cm-pad_resize",
    brand: "Nykd BY NYKAA",
    offer: "Up to 60% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/1ae02337-7e92-4b65-bf1b-48725c071ca0.jpg?tr=w-300,cm-pad_resize",
    brand: "AutumnLane",
    offer: "Min 55% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/61af8194-5634-4241-97fe-8f7737f477f9.jpg?tr=w-300,cm-pad_resize",
    brand: "TWENTY DRESSES",
    offer: "Up to 75% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/2cb30ce5-1828-4b5f-917c-eb818ae12463.jpg?tr=w-300,cm-pad_resize",
    brand: "Inc.5",
    offer: "Up to 50% off",
  },
  {
    image: "https://images-static.nykaa.com/uploads/90e6389c-5824-4550-b9b6-9690f5edcb10.jpg?tr=w-300,cm-pad_resize",
    brand: "FableStreet",
    offer: "Min 40% off",
    extra: "Extra 10% off*",
  },
  {
    image: "https://images-static.nykaa.com/uploads/36810ad1-31ea-416b-a9fa-664af0c8ad38.jpg?tr=w-300,cm-pad_resize",
    brand: "CAMPUS SUTRA",
    offer: "Min 60% off",
    extra: "Extra 20% off*",
  },{
    image: "https://images-static.nykaa.com/uploads/8999b3b5-b639-425d-80bd-8e1a0edae9bd.jpg?tr=w-300,cm-pad_resize",
    brand: "CAMPUS SUTRA",
    offer: "Min 60% off",
    extra: "Extra 20% off*",
  },
];

export default function BrandCardSlider() {
  return (
    <div className="bg-pink-100 py-6 px-4">
      <h3 className="text-gray-600 text-sm font-semibold uppercase">Hot Labels, Hotter Prices</h3>
      <h2 className="text-2xl md:text-3xl font-bold mt-1 mb-4">On never-seen-before offers</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        navigation
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
        }}
        className="py-4"
      >
        {brandData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-52 md:h-56 rounded-full overflow-hidden bg-white shadow-md mb-2 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.brand}
                  className="object-cover h-full w-full"
                />
              </div>
              <p className="text-sm font-semibold mt-1">{item.brand}</p>
              <p className="text-sm text-blue-900">{item.offer}</p>
              {item.extra && (
                <p className="text-xs text-blue-900">{item.extra}</p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
