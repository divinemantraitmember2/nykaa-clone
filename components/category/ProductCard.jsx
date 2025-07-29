"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { openLoginModal } from "../../slices/userSlice";
import {useDispatch } from "react-redux";
export default function ProductCard({ product, slug }) {
  const { data: session, status } = useSession();
const dispatch = useDispatch();
  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (status === "unauthenticated") {
     dispatch(openLoginModal()) 
    }
  };

  return (
    <div className="group relative bg-white border hover:shadow-xl transition duration-300 p-4 rounded-md text-sm overflow-hidden min-h-[330px] flex flex-col justify-between">
      
      {/* Wishlist Button */}
      <button
        type="button"
        className="absolute top-2 right-2 p-2 border rounded-full bg-white hover:text-pink-600 z-10 lg:hidden group-hover:block transition duration-200"
        title="Add to Wishlist"
        onClick={handleWishlistClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 23 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            fill="#fff"
            stroke="currentColor"
            d="M11.5,19c0.7-0.5,4.3-2.9,5.3-3.6c3.8-2.8,5.7-5.7,5.7-9c0-3.2-2.7-5.9-6-5.9c-1.8,0-3.5,0.9-4.5,2.3C10.5,0.9,8.8,0,7,0C3.7,0,1,2.6,1,5.9c0,3.6,2.2,6.3,6.1,9.1C8.2,15.9,10.8,17.9,11.5,19z"
          />
        </svg>
      </button>

      {/* Product Info */}
      <Link href={`/${slug}/${product?.slug}`} className="block">
        {/* Image */}
        <div className="w-full h-40 flex justify-center items-center overflow-hidden">
          <img
            src={product?.default_image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="mt-3 text-base font-semibold text-gray-800 leading-tight line-clamp-2">
          {product.title}
        </h3>

        {/* Price and Stock */}
        <div className="mt-1 flex justify-between text-sm text-gray-700">
          <p className="font-bold">₹{product.basePrice.inr}</p>
          <p className="text-xs font-semibold">Stock: {product.stock}</p>
        </div>

        {/* Color Options */}
        {product?.variants?.length > 0 && (
  <div className="flex flex-wrap items-center gap-1 mt-1">
    <p className="text-sm font-semibold text-gray-700 min-w-[50px]">Color:</p>
    {product.variants.map((variant, index) => (
      <div
        key={index}
        className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-150 cursor-pointer ring-1 ring-offset-1 ring-white hover:ring-gray-400"
        style={{ backgroundColor: variant.color?.toLowerCase() }}
        title={variant.color}
      ></div>
    ))}
  </div>
)}
        {/* Size Options */}
{product?.variants?.some(v => v.size_stocks?.length) && (
  <div className="mt-3">
    <p className="text-sm font-bold text-gray-700 mb-1">Size:</p>
    
    <div className="overflow-x-auto max-h-[80px] custom-scrollbar">
      <div className="flex gap-2 flex-wrap min-w-max">
        {product.variants.map((variant, vIdx) =>
          variant.size_stocks.map((sizeItem, sIdx) => (
            <span
              key={`${vIdx}-${sIdx}`}
              className="min-w-[40px] px-2 py-1 text-center border border-gray-300 rounded-md text-xs font-medium cursor-pointer bg-white hover:bg-gray-100 transition whitespace-nowrap"
            >
              {sizeItem.size}
            </span>
          ))
        )}
      </div>
    </div>
  </div>
)}


      </Link>
    </div>
  );
}
