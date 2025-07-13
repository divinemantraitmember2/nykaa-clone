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
      image: selectedImg,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-screen-xl mx-auto">
      {/* Mobile slider */}
      <div className="block lg:hidden w-full overflow-hidden relative">
        <div className="flex animate-slide gap-2">
          {product.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`slide-${i}`}
              width={600}
              height={400}
              className="min-w-full object-contain"
            />
          ))}
        </div>
      </div>

      {/* Desktop thumbnails */}
      <div className="hidden lg:flex flex-row gap-4">
        {/* Thumbs */}
        <div className="flex flex-col items-center gap-2 sticky top-[127px] h-fit">
          {product.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`thumb-${i}`}
              width={64}
              height={64}
              onClick={() => setSelectedImg(img)}
              className={`w-16 h-16 border p-1 cursor-pointer ${
                selectedImg === img ? "border-pink-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <Image
            src={selectedImg}
            alt="Main Image"
            width={600}
            height={600}
            className="w-full max-h-[500px] object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-[1.2] text-gray-800">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <p className="text-sm text-gray-500 mb-2">{product.subtitle}</p>

        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-black">★ {product.rating}</span>
          <span className="text-gray-500">{product.ratingCount} ratings</span>
          <span className="text-gray-400">& {product.reviewCount} reviews</span>
        </div>

        <div className="text-lg mb-2">
          <span className="font-semibold">MRP:</span>
          <span className="line-through text-gray-500 ml-1">₹{product.mrp}</span>
          <span className="text-black font-bold ml-2">₹{product.price}</span>
          <span className="text-green-600 ml-2">{product.discount}</span>
        </div>

        <p className="text-xs text-gray-500 mb-4">inclusive of all taxes</p>

      <div className="flex gap-4">
  <button
    className="w-1/2 bg-pink-600 text-white py-2 rounded text-base font-medium hover:bg-pink-700"
    onClick={handleAddToCart}
  >
    Add to Bag
  </button>
  <button
    className="w-1/2 border border-pink-600 text-pink-600 py-2 rounded text-base font-medium hover:bg-pink-100"
  >
    Wishlist
  </button>
</div>


        <div className="mt-6 border-t pt-4">
          <p className="font-medium text-sm">Delivery Options</p>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Enter pincode"
              className="border px-3 py-2 rounded text-sm w-full max-w-[200px]"
            />
            <button className="text-pink-600 font-medium">Check</button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-600 border-t pt-4">
          <span className="flex items-center gap-1">
            <img src="/genuine.svg" alt="genuine" className="w-4 h-4" />
            100% Genuine Products
          </span>
          <span className="flex items-center gap-1">
            <img src="/return.svg" alt="return" className="w-4 h-4" />
            Easy Return Policy
          </span>
          <span className="truncate">Sold by : NYKAA E RETA...</span>
        </div>
      </div>
    </div>
  );
}
