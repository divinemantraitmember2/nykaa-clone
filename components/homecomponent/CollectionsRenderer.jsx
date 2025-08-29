"use client";

import React from "react";
import ProductCardHome from "./ProductCardHome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";

const CollectionsRenderer = ({ collections }) => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4 my-10 space-y-12">
      {collections.map((collection) => (
        <div key={collection.id}>
          {/* Header */}
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-extrabold">
              {collection.title}
            </h2>
            <a href="#" className="text-sm font-bold hover:opacity-80">
              View all →
            </a>
          </div>

          {/* ✅ Mobile: Always slider */}
          <div className="block md:hidden">
            <Swiper
            //   modules={[Autoplay]}
              spaceBetween={12}
              slidesPerView={1.5} // 👈 ek baar me 2 cards dikhayega, chaaho to 1.3 bhi kar sakte ho
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="!pb-6"
            >
              {collection.products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCardHome
                    title={product.title}
                    image={product.image}
                    price={product.discountedINR || product.priceINR}
                    originalPrice={
                      product.discountedINR ? product.priceINR : null
                    }
                    discount={product.badge}
                    rating={product.rating || 0}
                    href={product.href || "#"}
                    onAddToCart={() => console.log("Add to Cart", product.title)}
                    onWishlist={() => console.log("Wishlist", product.title)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ✅ Desktop: Grid (same for grid & carousel layouts) */}
          {collection.layout === "grid" || collection.layout === "carousel" ? (
            <div
              className={`hidden md:grid gap-4 ${
                collection.layout === "grid"
                  ? "md:grid-cols-3 lg:grid-cols-6"
                  : "md:grid-cols-3 lg:grid-cols-5"
              }`}
            >
              {collection.products.map((product) => (
                <ProductCardHome
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.discountedINR || product.priceINR}
                  originalPrice={
                    product.discountedINR ? product.priceINR : null
                  }
                  discount={product.badge}
                  rating={product.rating || 0}
                  href={product.href || "#"}
                  onAddToCart={() => console.log("Add to Cart", product.title)}
                  onWishlist={() => console.log("Wishlist", product.title)}
                />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CollectionsRenderer;
