"use client";

import React from "react";
import { Star, Heart } from "lucide-react";

const ProductCardHome = ({
  title,
  image,
  alt,
  price,
  originalPrice,
  discount,
  isNew = false,
  rating = 0,
  onAddToCart,
  onWishlist,
  href = "#",
}) => {
  // Create an array for stars
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));

  return (
    <div className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm">
      <div className="relative">
        <a href={href}>
          <img src={image} alt={alt || title} className="h-64 w-full object-cover" />
        </a>
        {discount && (
          <span className="absolute left-3 top-3 text-xs bg-black text-white rounded-full px-3 py-1">
            -{discount}%
          </span>
        )}
        {isNew && !discount && (
          <span className="absolute left-3 top-3 text-xs bg-black text-white rounded-full px-3 py-1">
            New
          </span>
        )}
      </div>
      <div className="p-2">
        <div className="text-sm font-semibold line-clamp-1">{title}</div>

        <div className="mt-1 flex items-center gap-2">
          <div className="text-base font-bold">₹{price}</div>
          {originalPrice && (
            <div className="text-sm line-through opacity-60">₹{originalPrice}</div>
          )}
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs">
          {stars.map((filled, idx) => (
            <Star
              key={idx}
              className={`h-4 w-4 ${filled ? "fill-yellow-400" : ""}`}
            />
          ))}
          <span className="ml-1 opacity-70">{rating.toFixed(1)}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#0e1527] text-white shadow hover:bg-primary/90 h-9 px-4 py-2 flex-1 rounded-xl"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#f1f5f9] text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 rounded-xl"
            onClick={onWishlist}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHome;
