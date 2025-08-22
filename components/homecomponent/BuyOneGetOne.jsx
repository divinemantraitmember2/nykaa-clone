"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const BuyOneGetOne = () => {
  const deals = [
    {
      title: "T-Shirts",
      description: "BOGO on all casual tees",
      gradient: "from-pink-100 to-pink-50",
      img: "/images/free.png",
    },
    {
      title: "Jeans",
      description: "Buy 1 pair, get 1 free",
      gradient: "from-blue-100 to-blue-50",
      img: "/images/free.png",
    },
    {
      title: "Sneakers",
      description: "Step up with our 1+1 offer",
      gradient: "from-purple-100 to-purple-50",
      img: "/images/free.png",
    },
    {
      title: "Hoodies",
      description: "Stay warm — free 2nd piece!",
      gradient: "from-orange-100 to-orange-50",
      img: "/images/free.png",
    },
    {
      title: "Jackets",
      description: "Adventure-ready gear. BOGO!",
      gradient: "from-pink-200 to-pink-50",
      img: "/images/free.png",
    },
  ];

  return (
    <section className="py-4 lg:py-10 px-2 lg:px-10 bg-gradient-to-b from-[#fff0f2] to-[#fff] mb-3">
      <h2 className="lg:text-3xl text-lg font-bold text-start text-[#111] mb-5 uppercase">
        Buy One Get One Free
      </h2>
      <div className="py-5 lg:py-10">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500 }}
        spaceBetween={25}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
      >
        {deals.map((deal, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br ${deal.gradient}`}
            >
              {/* Product Image */}
              <div className="relative w-full h-70 sm:h-64 flex items-center justify-center overflow-hidden">
                <Image
                  src={deal.img}
                  alt={deal.title}
                  width={250}
                  height={350}
                  className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 rounded-t-2xl">
                <h3 className="text-lg font-bold text-gray-800">
                  {deal.title}
                </h3>
                <p className="text-sm text-gray-600">{deal.description}</p>
                <button className="mt-3 inline-block bg-[#144e47] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-[#0f3c36] transition">
                  Shop Now →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
};

export default BuyOneGetOne;
