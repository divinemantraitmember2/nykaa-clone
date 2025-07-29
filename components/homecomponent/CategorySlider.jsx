 "use client"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CategoryCard from "../homecomponent/CategoryCard";

const categories = [
    
  //  { image: "https://images-static.nykaa.com/uploads/30e495b9-019b-41c0-99cc-56b1dfb99437.jpg?tr=w-180,cm-pad_resize", label: "Bags" },
   { image: "https://images-static.nykaa.com/uploads/914f40e1-6ff2-4fa9-87f2-cd5150cb1e6f.jpg?tr=w-180,cm-pad_resize", label: "Men" },
  { image: "https://images-static.nykaa.com/uploads/b00b19ca-81a7-42c1-93a6-c75dc687d468.jpg?tr=w-180,cm-pad_resize", label: "Women" },
 { image: "https://images-static.nykaa.com/uploads/866fb490-2b3d-4546-a384-4bac61d5e482.jpg?tr=w-180,cm-pad_resize", label: "Footwear" },
 { image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/4/c4f195f260837_1.jpg?rnd=20200526195200&tr=w-180,cm-pad_resize", label: "Shirt" },
 { image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/2/a201f080421CPDNM04_1.jpg?rnd=20200526195200&tr=w-180,cm-pad_resize", label: "Jeens" },
 { image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/category_information/4266437a982aba472023_04_13.jpg?rnd=20200526195200&tr=w-180,cm-pad_resize", label: "Kurta" },
 { image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/8/186e540LIKBASKU04-PINK_1.jpg?rnd=20200526195200&tr=w-180,cm-pad_resize", label: "Kurti" },
 { image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/0/3/03c4806ASS23LIKB006_1.jpg?rnd=20200526195200&tr=w-180,cm-pad_resize", label: "Blouse" },
];

export default function CategorySlider() {
  return (
     <div className="p-2 py-12 lg:py-15 bg-white shadow-md">
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
