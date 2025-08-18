"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
  {
    href: "/c/customer-favorites",
    title: "Most-Loved By India",
    img: "https://imagescdn.jaypore.com/uploads/micrositmedia/production/1_Aug14_Our_Bestseller_Slider_3771_1755153765751.jpg?w=1715&auto=format",
  },
  {
    href: "/c/welcoming-shri-ganesha",
    title: "Welcoming Shri Ganesha",
    img: "https://imagescdn.jaypore.com/uploads/micrositmedia/production/2_Aug11_Festive_Edit_Slider_3771_1755153811816.jpg?w=1715&auto=format",
  },
  {
    href: "/c/pooja-ready",
    title: "Pooja Ready",
    img: "https://imagescdn.jaypore.com/uploads/micrositmedia/production/3_Aug11_HomeDecro_Platters_Slider_3771_1755153853136.jpg?w=1715&auto=format",
  },
  {
    href: "/c/fresh-styles",
    title: "Fresh Styles",
    img: "https://imagescdn.jaypore.com/uploads/micrositmedia/production/4_Aug11_Fresh_Kurta_Kurta_Sets_Slider_3771_1755153895991.jpg?w=1715&auto=format",
  },
  {
    href: "/c/seasons-finest-sparkle",
    title: "Seasons Finest Sparkle",
    img: "https://imagescdn.jaypore.com/uploads/micrositmedia/production/5_Aug11_New_arrivals_Earrings_Slider_3771_1755154075616.jpg?w=1715&auto=format",
  },
  {
    href: "/c/dresses-co-ords-4999?page=1&orderby=position&orderway=desc",
    title: "Fresh Drops",
    img: "https://imagescdn.jaypore.com/uploads/micrositmedia/production/6_Aug11_Everyday_day_Under_4999_Slider_3771_1755154122781.jpg?w=1715&auto=format",
  },
];

export default function BannerSlider() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-diamond"></span>`;
          },
        }}
        className="banner-swiper"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            <a href={banner.href} title={banner.title}>
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-auto object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS */}
      <style jsx global>{`
        .banner-swiper .swiper-pagination {
          position: static !important;
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .custom-diamond {
          width: 14px;
          height: 14px;
          border: 2px solid #e5a59a; 
          transform: rotate(45deg);
          background: transparent;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active.custom-diamond {
          background: #d66a54; /* active fill color */
          border-color: #d66a54;
        }
      `}</style>
    </div>
  );
}
