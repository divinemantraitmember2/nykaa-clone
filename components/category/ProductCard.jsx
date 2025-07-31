"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../slices/userSlice";
import { Heart } from "lucide-react";

export default function ProductCard({ product, slug }) {
  const { data: session, status } = useSession();
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
    product?.variants?.flatMap((v) =>
      (v?.size_stocks || []).map((s) => s?.size)
    ) || [];
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
    <div className="group relative bg-white rounded-2xl mb-2 shadow hover:shadow-lg transition-all overflow-hidden w-full max-w-[220px] text-sm border border-gray-100">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full shadow hover:bg-pink-100 transition"
      >
        <Heart className="w-4 h-4 text-gray-800 group-hover:text-pink-600" />
      </button>

      <Link
        href={`${slug}/${product.slug}`}
        className="block"
        aria-labelledby={`title-${product.id}`}
      >
        {/* Product Image */}
        <div className="aspect-square bg-gray-50">
          <img
            src={`${product.default_image}?tr=w-512,h-683`}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="p-2 space-y-1">
          {/* Title */}
          <h2 className="text-sm text-gray-800 font-bold leading-snug line-clamp-2 min-h-[32px]">
         {product.title}
         </h2>

          {/* Colors */}
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

          {/* Sizes */}
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

          {/* Pricing */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-semibold text-gray-900">
              ₹{product.basePrice.inr}
            </span>
            {product.basePrice.mrp && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.basePrice.mrp}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-medium text-green-600">
                {discount}% off
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
