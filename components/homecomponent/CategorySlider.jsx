 "use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CategoryCard from "../homecomponent/CategoryCard";

const categories = [
  { image: "https://images-static.nykaa.com/uploads/b809f837-d0e9-4c22-b96b-78a1c98a81d4.jpg?tr=w-180,cm-pad_resize", label: "Kids" },
  { image: "https://images-static.nykaa.com/uploads/4f26c3df-6260-48d6-a291-015c626d6226.jpg?tr=w-180,cm-pad_resize", label: "Home" },
  { image: "https://images-static.nykaa.com/uploads/866fb490-2b3d-4546-a384-4bac61d5e482.jpg?tr=w-180,cm-pad_resize", label: "Footwear" },
  { image: "https://images-static.nykaa.com/uploads/1cd1c639-85e5-4676-ae4f-75fb81dc1b6a.jpg?tr=w-180,cm-pad_resize", label: "Lingerie" },
  { image: "https://images-static.nykaa.com/uploads/30e495b9-019b-41c0-99cc-56b1dfb99437.jpg?tr=w-180,cm-pad_resize", label: "Bags" },
  { image: "https://images-static.nykaa.com/uploads/bb166244-dea0-4c9e-868a-1b758f7bb19d.jpg?tr=w-180,cm-pad_resize", label: "Jewellery" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Activewear" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Watch" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Sunglasses" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Sunglasses" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Sunglasses" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Sunglasses" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Sunglasses" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Sunglasses" },
  { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Sunglasses" },
];

export default function CategorySlider() {
  return (
     <div className="p-2 py-10 lg:py-15 bg-white shadow-md">
      <Swiper
        spaceBetween={5}
        breakpoints={{
          320: { slidesPerView: 3 },
          480: { slidesPerView: 4 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
        }}
        className="!py-4"
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <CategoryCard image={item.image} label={item.label} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
}
