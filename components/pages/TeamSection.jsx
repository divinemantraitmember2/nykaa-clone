"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function TeamSection() {
  const team = [
    { name: "Name", role: "Founder & CEO", img: "/team1.jpg" },
    { name: "Name", role: "Marketing Head", img: "/team2.jpg" },
    { name: "Name", role: "Lead Developer", img: "/team3.jpg" },
  ];

  return (
    <section className="w-[80%] mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Meet Our Team
      </h2>

      {/* ✅ Mobile: Swiper Slider */}
      <div className="block md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          className="pb-8"
        >
          {team.map((member, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={member.img || "/images/no-profile.jpeg"}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-pink-600 text-sm">{member.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Desktop: Grid Layout */}
      <div className="hidden md:grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={member.img || "/images/no-profile.jpeg"}
              alt={member.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-center">
              <h4 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h4>
              <p className="text-pink-600 text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
