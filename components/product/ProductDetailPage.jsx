"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductDetailPage({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.variants?.[0]?.color);

  const selectedVariant = product?.variants?.find((v) => v.color === selectedColor);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 max-w-7xl mx-auto text-sm text-gray-800 font-sans">
      {/* Left Sticky Image Section */}
      <div className="lg:w-1/2 sticky top-4 self-start">
        <div className="bg-gray-100 rounded-md overflow-hidden relative pb-[120%]">
          <Image
            src={selectedVariant?.image || product?.default_image || "/placeholder.jpg"}
            alt={product?.title || "Product image"}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto max-w-full">
          {product?.images?.map((img, i) => (
            <div key={i} className="w-20 h-20 relative shrink-0 border rounded-md overflow-hidden">
              <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Details Section */}
      <div className="lg:w-1/2">
        <h1 className="text-lg font-semibold mb-1">{product?.title}</h1>
        <p className="text-sm text-gray-500 mb-2">{product?.brand}</p>

        {/* Price */}
        <div className="flex items-center gap-2 text-lg font-bold text-pink-600">
          ₹{product?.basePrice?.inr}
          <span className="line-through text-gray-400 text-sm">
            ₹{product?.basePrice?.mrp}
          </span>
          <span className="text-green-600 text-sm font-semibold">
            {Math.round(
              ((product?.basePrice?.mrp - product?.basePrice?.inr) /
                product?.basePrice?.mrp) *
                100
            )}% Off
          </span>
        </div>

        {/* Colors */}
        <div className="mt-4">
          <p className="font-medium mb-1">Select Color</p>
          <div className="flex gap-2 overflow-x-auto">
            {product?.variants?.map((v, i) => (
              <div
                key={i}
                className={`w-14 h-20 border rounded-md overflow-hidden cursor-pointer ${
                  v.color === selectedColor ? "ring-2 ring-pink-500" : ""
                }`}
                onClick={() => {
                  setSelectedColor(v.color);
                  setSelectedSize(null);
                }}
              >
                <Image
                  src={v.image}
                  alt={v.color}
                  width={56}
                  height={80}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <p className="font-medium mb-1">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {selectedVariant?.size_stocks?.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(s.size)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  selectedSize === s.size
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-4 mt-4">
          <button className="flex-1 border px-4 py-2 rounded-md hover:bg-gray-50">
            Add to Wishlist
          </button>
          <button className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:opacity-90">
            Add to Bag
          </button>
        </div>

        {/* Delivery Info */}
        <div className="mt-6">
          <p className="font-medium mb-1">Select Delivery Location</p>
          <input
            type="text"
            placeholder="Enter Pincode"
            className="w-full border px-3 py-2 rounded-md mb-2"
          />
          <ul className="text-xs text-gray-600 space-y-1">
            <li>COD available</li>
            <li>7-day return & size exchange</li>
            <li>Usually ships in 2 days</li>
          </ul>
        </div>

        {/* Coupons */}
        <div className="mt-6">
          <p className="font-medium mb-1">Coupons</p>
          <div className="flex gap-2 overflow-x-auto text-xs">
            <div className="border rounded p-2 min-w-[200px]">
              <p className="font-semibold">Extra 20% off</p>
              <p>Use code: <strong>NFPINK20</strong></p>
            </div>
            <div className="border rounded p-2 min-w-[200px]">
              <p className="font-semibold">Extra 15% off</p>
              <p>Use code: <strong>NFNEW15</strong></p>
            </div>
          </div>
        </div>

        {/* Product Info Accordion */}
        <div className="mt-6 space-y-3 text-sm">
          <details>
            <summary className="cursor-pointer font-medium">Product details</summary>
            <p className="mt-1">Care instructions, Pack contains</p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">Know your product</summary>
            <p className="mt-1">{product?.description}</p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">Vendor details</summary>
            <p className="mt-1">Manufacturer details, Country of origin</p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">Return and exchange policy</summary>
            <p className="mt-1">Know more about return and exchange</p>
          </details>
        </div>
      </div>
    </div>
  );
}
