"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TopCategory({ quickCategories }) {
  if (!quickCategories || quickCategories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto  px-2 lg:px-4">
      {/* --- Mobile Slider --- */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView={1.2} // show ~2 cards at a time
          className="pb-8"
        >
          {quickCategories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Link
                 href={`/${cat.slug}`}
                 target="_blank"
                 rel="noopener noreferrer" 
                className="group block rounded-2xl overflow-hidden shadow-sm bg-zinc-50"
              
              >
                {/* Image */}
                <motion.div
                  className="h-50 bg-center bg-cover"
                  style={{ backgroundImage: `url(${cat.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Label */}
                <div className="p-2 text-center font-semibold text-sm group-hover:opacity-80 transition">
                  {cat.name}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- Desktop Grid --- */}
      <motion.div
        className="hidden md:grid grid-cols-4 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {quickCategories.map((cat) => (
          <motion.div
            key={cat.id}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              href={`/${cat.slug}`}
              className="group block rounded-2xl overflow-hidden shadow-sm bg-zinc-50"
               target="_blank"
              rel="noopener noreferrer" 
            >
              <motion.div
                className="h-50 bg-center bg-cover"
                style={{ backgroundImage: `url(${cat.image})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-3 text-center font-semibold group-hover:opacity-80 transition">
                {cat.name}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
