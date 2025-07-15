"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import Link from "next/link";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        id: product.slug,
        image: product.image,
      })
    );
  };

  return (
    <div className="group relative bg-white border hover:shadow-xl transition duration-300 p-2 lg:p-4 rounded-md text-sm overflow-hidden min-h-[370px]">
      {/* Product Image and Link */}
      <Link href={`/hair/argan-oil`}>
        <div className="relative">
          {/* Badges */}
          {product.badges?.map((badge, idx) => (
            <span
              key={idx}
              className="absolute -top-5 left-2 text-xs bg-pink-100 text-pink-600 font-semibold px-2 py-0.5 rounded"
            >
              {badge}
            </span>
          ))}

          <img
            src={product.image}
            alt={product.title}
            className="mx-auto w-full h-40 object-contain mt-6"
          />
        </div>

        {/* Info */}
        <h3 className="mt-2 font-semibold text-gray-800 leading-tight line-clamp-2">
          {product.title}
        </h3>
        <div className="mt-1">
          <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
          <span className="line-through ml-2 text-gray-500 text-xs">₹{product.mrp}</span>
          <span className="text-pink-600 text-xs ml-2">{product.discount}</span>
        </div>
        <div className="text-gray-500 text-xs mt-1">★ {product.rating?.toLocaleString()}</div>
        <div className="text-gray-500 text-xs">{product.sizes}</div>
      </Link>

      {/* Hover Action - Wishlist + Add to Cart */}
      <div className="absolute bottom-2 left-0 w-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-center gap-2 px-3">
          {/* Wishlist */}
          <button
            type="button"
            className="p-2 border rounded-full bg-white hover:text-pink-600"
            title="Add to Wishlist"
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
                className="heart-icon-path"
                fill="#fff"
                stroke="currentColor"
                d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"
              />
            </svg>
          </button>

          {/* Add to Bag */}
          <button
            className="bg-pink-600 text-white px-4 py-1.5 text-sm rounded hover:bg-pink-700 w-full"
            onClick={handleAddToCart}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
