
"use client";

import React from "react";
import ProductCardHome from "./ProductCardHome"; // your existing reusable ProductCard

const AIShowcase = ({ showcase }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 my-4">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold">{showcase.title}</h2>
        <a href="#" className="text-sm font-medium hover:opacity-80">
          View all →
        </a>
      </div>

      <div className="">
        {/* Carousel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {showcase.products.map((product) => (
              <ProductCardHome
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.priceINR}
                discount={product.badge}
                onAddToCart={() => console.log("Add to Cart", product.title)}
                onWishlist={() => console.log("Wishlist", product.title)}
                href={product.href || "#"}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIShowcase;
