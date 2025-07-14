"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";


export default function ClientProductDetails({ product }) {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      id: product.slug,
      image: product.image,
    }));
  };

  return (
    <section className=" ">
      <div className="mb-5 lg:mb-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row shadow gap-5">
        {/* Thumbnails + Main Image */}
        <div className="flex gap-4 w-full lg:w-[45%] p-2">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2">
            {product.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`thumb-${i}`}
                width={64}
                height={64}
                onClick={() => setSelectedImg(img)}
                className={`w-16 h-16 border p-1 cursor-pointer rounded ${
                  selectedImg === img ? "border-pink-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
         {/* Main Image */}
<div className="flex-1 flex justify-center items-center relative">
  <Image
    src={selectedImg}
    alt="Main Image"
    width={500}
    height={500}
    className="object-contain max-h-[500px] w-auto"
  />

  {/* Wishlist Icon Top-Right */}
  <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-pink-50 transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-6 h-6 text-pink-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3.75a5.25 5.25 0 00-4.355 2.333A5.25 5.25 0 007.5 3.75 5.25 5.25 0 002.25 9c0 7.143 9.75 11.25 9.75 11.25S21.75 16.143 21.75 9A5.25 5.25 0 0016.5 3.75z"
      />
    </svg>
  </button>
</div>

        </div>

        {/* Product Info */}
        <div className="w-full lg:w-[55%] border-l border-[#fccee8] p-2">
          <h1 className="text-2xl font-semibold mb-2 text-gray-800">{product.title}</h1>
          <p className="text-sm text-gray-500 mb-3">{product.subtitle}</p>

          <div className="flex items-center gap-2 text-sm mb-3">
            <span className="text-black font-medium">★ {product.rating}</span>
            <span className="text-gray-500">{product.ratingCount} ratings</span>
            <span className="text-gray-400">& {product.reviewCount} reviews</span>
          </div>

          <div className="text-lg mb-2 font-medium">
            <span className="line-through text-gray-500">₹{product.mrp}</span>
            <span className="ml-2 text-black font-bold text-xl">₹{product.price}</span>
            <span className="ml-2 text-green-600 text-sm font-semibold">{product.discount}</span>
          </div>

          <p className="text-xs text-gray-500 mb-4">inclusive of all taxes</p>

          {/* Action Buttons */}
         
          {/* Delivery Options */}

          
          <div className="mb-6 lg:mb-25 border-t pt-6 lg:pt-10 max-w-7xl mx-auto px-4 lg:px-0">
  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-around gap-2">
    
    {/* Add to Bag Button */}
    <div className="w-full lg:w-auto flex justify-center lg:justify-start">
      <button
        onClick={handleAddToCart}
        className="bg-pink-600 text-white py-2 px-4 lg:py-4 lg:px-10  text-sm font-semibold hover:bg-pink-700 transition"
      >
        Add to Bag
      </button>
    </div>

    {/* Delivery Options */}
    <div className="relative w-full sm:w-[200px] ">
  <input
    type="text"
    placeholder="Enter pincode"
    className="border py-2 lg:py-3 px-4 pr-16 text-sm w-full "
  />
  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e80071] font-medium text-sm hover:underline"
  >
    Check
  </button>
</div>

  </div>
</div>

          <div className="flex flex-wrap items-center justify-center gap-4 px-2 py-4 text-xs text-gray-600 bg-[#f4f4f5]  pt-4">
            <span className="flex items-center gap-1">
              <img src="data:image/png;base64,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%0AYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=" alt="genuine" className="w-4 h-4" />
              100% Genuine Products
            </span>
            <span className="flex items-center gap-1">
              <img src="data:image/png;base64,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 YII=" alt="return" className="w-4 h-4" />
              Easy Return Policy
            </span>
            <span className="truncate">Sold by: NYKAA E RETA...</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
