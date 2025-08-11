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
      bg: "#e0f7fa",
      img: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
    },
    {
      title: "Jeans",
      description: "Buy 1 pair, get 1 free",
      bg: "#fce4ec",
      img: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
    },
    {
      title: "Sneakers",
      description: "Step up with our 1+1 offer",
      bg: "#ede7f6",
      img: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
    },
    {
      title: "Hoodies",
      description: "Stay warm — free 2nd piece!",
      bg: "#fff3e0",
      img: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
    },
    {
      title: "Jackets",
      description: "Adventure-ready gear. BOGO!",
      bg: "#f3e5f5",
      img: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
    },
  ];

  return (
    <section className="py-20 px-2 lg:px-10 bg-gradient-to-b from-[#fceaeb] to-[#fbf6f6] mb-3">
      <h2 className="text-3xl md:text-4xl font-bold text-start text-[#144e47] mb-10">
        Buy One Get One Free
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
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
              className="relative rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-52 sm:h-56 flex flex-col justify-between"
              style={{ backgroundColor: deal.bg }}
            >
              {/* Circular Image at top-right */}
              <div className="absolute top-3 right-3 w-20 h-20  rounded-full overflow-hidden border-2 border-white shadow-md">
  <Image
    src={deal.img}
    alt={deal.title}
    width={64}
    height={64}
    className="object-cover w-full h-full"
  />
</div>

              {/* Content */}
              <div className="z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {deal.title}
                </h3>
                <p className="text-sm text-gray-600">{deal.description}</p>
              </div>

              <span className="mt-4 text-sm font-medium text-[#144e47]">
                Shop Now →
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BuyOneGetOne;
