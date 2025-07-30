"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { openLoginModal } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

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

  const allSizes = product?.variants?.flatMap((v) =>
    (v?.size_stocks || []).map((s) => s?.size)
  ).filter(Boolean) || [];
  const uniqueSizes = [...new Set(allSizes)];
  const visibleSizes = showAllSizes ? uniqueSizes : uniqueSizes.slice(0, 4);
  const extraSizes = uniqueSizes.length - visibleSizes.length;

  const discount =
    product?.basePrice?.mrp && product?.basePrice?.inr
      ? Math.round(
          ((product.basePrice.mrp - product.basePrice.inr) / product.basePrice.mrp) * 100
        )
      : null;

  return (
    <div className="w-full sm:w-[48%] md:w-[220px] bg-white  rounded-md overflow-hidden shadow hover:shadow-lg transition group relative text-sm">
      {/* Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-10 p-1 bg-white border rounded-full text-gray-600 hover:text-pink-600"
        title="Add to Wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 23 20">
          <path
            fill="#fff"
            stroke="currentColor"
            d="M11.5,19c0.7-0.5,4.3-2.9,5.3-3.6c3.8-2.8,5.7-5.7,5.7-9c0-3.2-2.7-5.9-6-5.9c-1.8,0-3.5,0.9-4.5,2.3C10.5,0.9,8.8,0,7,0C3.7,0,1,2.6,1,5.9c0,3.6,2.2,6.3,6.1,9.1C8.2,15.9,10.8,17.9,11.5,19z"
          />
        </svg>
      </button>

      <Link href={`/${slug}/${product?.slug || ""}`} className="block">
        {/* Product Image */}
        <div className="relative w-full pb-[110%] bg-gray-100 overflow-hidden">
          <img
            src={`${product?.default_image}?tr=w-250`}
            alt={product?.title}
            className="absolute top-0 left-0 w-full h-full object-cover transition group-hover:scale-105"
          />
        </div>

        {/* Tag */}
        <div className="px-2 pt-2">
          {product?.tag && (
            <span className="text-[10px] font-semibold px-1 py-0.5 rounded-sm bg-blue-100 text-blue-800">
              {product.tag}
            </span>
          )}
        </div>

        {/* Brand & Title */}
        <div className="px-2 py-1">
          <p className="text-xs font-semibold text-gray-800 truncate">{product.brand || "Brand"}</p>
          <p className="text-xs text-gray-600 truncate">{product.title}</p>
        </div>

        {/* Colors */}
        {uniqueColors.length > 0 && (
          <div className="px-2 flex items-center gap-1 mt-1 flex-wrap">
            {visibleColors.map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
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
          <div className="px-2 flex flex-wrap gap-1 mt-1">
            {visibleSizes.map((size, i) => (
              <span
                key={i}
                className="text-[10px] px-1.5 py-0.5 border border-gray-300 rounded-sm text-gray-800 bg-gray-100"
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

        {/* Price */}
        <div className="px-2 py-1 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">₹{product.basePrice.inr}</span>
          {product.basePrice.mrp && (
            <span className="text-xs line-through text-gray-500">₹{product.basePrice.mrp}</span>
          )}
          {discount > 0 && (
            <span className="text-xs font-semibold text-green-600">{discount}%</span>
          )}
        </div>
      </Link>
    </div>
  );
}
