"use client";

import React from "react";
import ProductCardHome from "./ProductCardHome"; // your existing reusable ProductCard

const AIShowcase = ({ showcase }) => {
  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-4 my-4">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold">{showcase.title}</h2>
        <a href="#" className="text-sm font-bold hover:opacity-80">
          View all →
        </a>
      </div>

      <div>
        {/* Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {showcase.products.map((product) => (
            <div
              key={product.id}
              className="w-full" // wrapper for responsiveness
            >
              <ProductCardHome
                title={product.title}
                image={product.image}
                price={product.priceINR}
                discount={product.badge}
                sku=""
                onAddToCart={() => console.log("Add to Cart", product.title)}
                onWishlist={() => console.log("Wishlist", product.title)}
                href={`${product?.catSlug}/${product?.slug}`}
                className="!text-xs sm:!text-sm" // ✅ font-size small on mobile
                imgClassName="h-32 sm:h-40 md:h-48 object-cover" // ✅ small image height on mobile
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIShowcase;
