"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import SearchLocation from "../SearchLocation"


export default function ClientProductDetails({ product }) {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      id: product.id,
      image: product.thumbnail,
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
            {product !=null && product.images.map((img, i) => (
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
       <div className="w-full lg:w-[55%] border-l border-[#fccee8] px-3 py-2 relative">
  {/* In Stock Badge */}
  <div className="absolute right-3 top-2">
    <span className={`text-sm font-medium ${product.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-500'}`}>
      {product.availabilityStatus}
    </span>
  </div>

  {/* Title */}
  <h1 className="text-xl font-semibold text-gray-800 mb-1">{product.title}</h1>

  {/* Rating & Reviews */}
  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
    <span>★ {product.rating}</span>
    <span>{product.rating} ratings</span>
    <span>& {product.reviews?.length || 0} reviews</span>
  </div>

  {/* Price Block */}
  <div className="text-lg font-medium mb-2">
    <span className="line-through text-gray-400 text-base">₹{product?.mrp}</span>
    <span className="ml-2 text-black font-bold text-xl">₹{product?.price}</span>
    <span className="ml-2 text-green-600 text-sm font-semibold">({product.discountPercentage}% off)</span>
  </div>
  <p className="text-xs text-gray-500 mb-2">Inclusive of all taxes</p>

  {/* Quick Info Grid */}
  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
    {product.dimensions && (
      <div><strong>Dimensions:</strong> {product.dimensions.width}W × {product.dimensions.height}H × {product.dimensions.depth}D</div>
    )}
    {product.weight && (
      <div><strong>Weight:</strong> {product.weight} kg</div>
    )}
    {product.shippingInformation && (
      <div><strong>Shipping:</strong> {product.shippingInformation}</div>
    )}
    {product.warrantyInformation && (
      <div><strong>Warranty:</strong> {product.warrantyInformation}</div>
    )}
    {product.returnPolicy && (
      <div><strong>Return:</strong> {product.returnPolicy}</div>
    )}
    {product.minimumOrderQuantity && (
      <div><strong>Min Qty:</strong> {product.minimumOrderQuantity}</div>
    )}
  </div>

  {/* Add to Cart + Location */}
  <div className="mb-6 lg:mb-25 border-t pt-6 lg:pt-10 max-w-7xl mx-auto px-4 lg:px-0">
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-around gap-4">
      <div className="w-full lg:w-auto flex justify-center lg:justify-start">
        <button
          onClick={handleAddToCart}
          className="bg-pink-600 text-white rounded py-4 px-10 text-sm font-semibold hover:bg-pink-700 transition"
        >
          Add to Bag
        </button>
      </div>

      <div className="relative w-full sm:w-[300px] lg:border-l lg:pl-6">
        <SearchLocation />
      </div>
    </div>
  </div>

  {/* Trust Tags */}
  <div className="flex flex-wrap items-center justify-center gap-4 px-2 py-3 mt-4 bg-[#f4f4f5] text-xs text-gray-600 rounded-md">
    <span className="flex items-center gap-1">
      <img src="https://cdn-icons-png.flaticon.com/512/103/103473.png" alt="genuine" className="w-4 h-4" />
      100% Genuine Products
    </span>
    <span className="flex items-center gap-1">
      <img src="https://cdn-icons-png.flaticon.com/512/535/535234.png" alt="return" className="w-4 h-4" />
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
