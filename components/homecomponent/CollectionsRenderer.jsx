"use client";

import React from "react";
import ProductCardHome from "./ProductCardHome";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";

const CollectionsRenderer = ({ collections }) => {
  
  if (!collections || collections.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6 my-10 py-4 space-y-12 bg-[#fdf4f9]">
      {collections.map((collection, indexId) => {
        // Agar products null hai ya empty hai to skip kar do
        if (!collection?.products || collection?.products.length === 0) {
          return null;
        }

        return (
          <div key={indexId + "col"}>
            {/* Header */}
            <div className="flex items-end justify-between mb-4">
                <div className="">
                     <h2 className="text-xl lg:text-4xl font-bold mb-1">
                       {collection?.title}
                      </h2>
                    <p className="text-xl lg:text-2xl font-bold">{collection?.desc}</p>
                </div>
             

              <a href={`${collection?.viewAll}`} className="text-sm lg:text-xl font-bold hover:opacity-80">
                View all →
              </a>
            </div>

            {/* ✅ Mobile: Always slider */}
            <div className="block md:hidden">
              <Swiper
                spaceBetween={12}
                slidesPerView={1.5}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="!pb-6"
              >
                {collection?.products.map((product, pIndex) => (
                  <SwiperSlide key={pIndex + "p"}>
                    <ProductCardHome
                      title={product?.title}
                      image={product?.image}
                      price={product?.discountedINR || product?.priceINR}
                      originalPrice={
                        product?.discountedINR ? product?.priceINR : null
                      }
                      discount={product?.badge}
                      sku={product?.id}
                      rating={product?.rating || 0}
                      href={product?.href || "#"}
                      onAddToCart={() =>
                        console.log("Add to Cart", product?.title)
                      }
                      onWishlist={() => console.log("Wishlist", product?.title)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ✅ Desktop: Grid view (fallback if layout missing) */}
            <div
              className={`hidden md:grid gap-4 ${
                collection?.layout === "carousel"
                  ? "md:grid-cols-3 lg:grid-cols-5"
                  : "md:grid-cols-3 lg:grid-cols-5"
              }`}
            >
              {collection?.products.map((product, pIndex) => (
                <ProductCardHome
                  key={pIndex + "grid"}
                  title={product?.title}
                  image={product?.image}
                  price={product?.discountedINR || product?.priceINR}
                  originalPrice={
                    product?.discountedINR ? product?.priceINR : null
                  }
                  discount={product?.badge}
                   sku={product?.id}
                  rating={product?.rating || 0}
                  href={`${product?.catSlug}/${product?.slug}`}
                  onAddToCart={() =>
                    console.log("Add to Cart", product?.title)
                  }
                  onWishlist={() => console.log("Wishlist", product?.title)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionsRenderer;
