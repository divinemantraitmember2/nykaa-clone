"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../slices/userSlice";
import { Heart } from "lucide-react";

export default function ProductCard({ product, slug }) {
  const { status } = useSession();
  const dispatch = useDispatch();

  const [showAllColors, setShowAllColors] = useState(false);
  const [showAllSizes, setShowAllSizes] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      dispatch(openLoginModal());
    }
  };

  const allColors = product?.variants?.map((v) => v.color)?.filter(Boolean) || [];
  const uniqueColors = [...new Set(allColors)];
  const visibleColors = showAllColors ? uniqueColors : uniqueColors.slice(0, 5);
  const extraColors = uniqueColors.length - visibleColors.length;

  const allSizes =
    product?.variants?.flatMap((v) => (v?.size_stocks || []).map((s) => s?.size)) || [];
  const uniqueSizes = [...new Set(allSizes.filter(Boolean))];
  const visibleSizes = showAllSizes ? uniqueSizes : uniqueSizes.slice(0, 4);
  const extraSizes = uniqueSizes.length - visibleSizes.length;

  const discount =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;



  return (
    <div className="group relative hover:shadow-md mb-2 hover:shadow-pink-200 transition-all overflow-hidden w-full text-sm rounded">
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full shadow hover:bg-pink-100 transition"
      >
        <Heart className="w-4 h-4 text-gray-800 group-hover:text-pink-600" />
      </button>

      <Link
        href={`/${slug}/${product.slug}`}
        className="block"
        aria-labelledby={`title-${product.id}`}
      >
        <div className="aspect-square bg-gray-50">
          <img
            src={`${product.default_image}?tr=w-512,h-683`}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-2 space-y-1">
          <h2 className="text-sm text-[#001325] font-bold leading-snug line-clamp-2 min-h-[32px]">
            {product.title}
          </h2>

          {uniqueColors.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {visibleColors.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color?.toLowerCase() }}
                ></div>
              ))}
              {extraColors > 0 && !showAllColors && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllColors(true);
                  }}
                  className="text-[10px] text-gray-500 font-medium hover:underline"
                >
                  +{extraColors} more
                </button>
              )}
            </div>
          )}

          {uniqueSizes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {visibleSizes.map((size, i) => (
                <span
                  key={i}
                  className="text-[10px] px-1.5 py-0.5 border border-gray-300 rounded text-gray-700 bg-gray-100"
                >
                  {size}
                </span>
              ))}
              {extraSizes > 0 && !showAllSizes && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllSizes(true);
                  }}
                  className="text-[10px] text-gray-500 font-medium hover:underline"
                >
                  +{extraSizes} more
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            {product?.variants.length > 0 && product?.variants[0].size_stocks.length > 0 && (
  <div>
    <p>
      <span style={{ textDecoration: "line-through", color: "#888" }}>
        ₹{product?.variants[0].size_stocks[0].price_inr}
      </span>
      &nbsp;
      <span style={{ color: "#000", fontWeight: "bold" }}>
        ₹{product?.variants[0].size_stocks[0].discounted_price_inr}
      </span>
    </p>
  </div>
)}

          </div>
        </div>
      </Link>
    </div>
  );
}