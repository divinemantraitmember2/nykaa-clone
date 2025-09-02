"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ProductHeart from "../category/ProductHeart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay"; // important for autoplay

export default function UserWishlist({ wishlistData }) {
  if (!wishlistData || wishlistData.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        Your wishlist is empty.
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistData.map((item) => (
          <ResponsiveSliderCard key={item.productID} item={item} />
        ))}
      </div>
    </section>
  );
}

function ResponsiveSliderCard({ item }) {
  // images from first variant or fallback
  const images =
    item.variants?.[0]?.image_url?.length > 0
      ? item.variants[0].image_url
      : [item.default_image];

  const [currentImage, setCurrentImage] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1000);
      setIntervalId(interval);
    }
  };

  const handleMouseLeave = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setCurrentImage(0);
  };

  return (
    <div
      className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section */}
      <div className="relative w-full h-60">
        {isMobile ? (
          // ✅ Mobile: Swiper Carousel (1.5 cards visible)
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            spaceBetween={10}
            slidesPerView={1.5}
            centeredSlides
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-60">
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // ✅ Desktop: Hover Slideshow
          <Image
            src={images[currentImage]}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Wishlist Heart */}
        <div className="absolute top-2 right-2">
          <ProductHeart sku={item.sku} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-gray-800 text-md truncate">
          {item.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-gray-900">
            ₹{item.basePrice.discountedINR}
          </span>
          {item.basePrice.discountedINR !== item.basePrice.inr && (
            <span className="text-gray-400 line-through text-sm">
              ₹{item.basePrice.inr}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <p
          className={`text-sm mt-1 ${
            item.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
        </p>

        {/* Variants Colors */}
        {item.variants && item.variants.length > 0 && (
          <div className="flex gap-2 mt-2">
            {item.variants.map((v, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: v.color.toLowerCase() }}
                title={v.color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
