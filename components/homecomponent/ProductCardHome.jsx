"use client";

import React from "react";
import ProductHeart from "../category/ProductHeart"
import { motion } from "framer-motion";


const ProductCardHome = ({
  title,
  image,
  alt,
  price,
  originalPrice,
  discount,
  sku,
  isNew = false,
  rating = 0,
  onAddToCart,
  onWishlist,
  href = "#",
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));

  return (
    <motion.div
      className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
    <ProductHeart sku={sku} />
      <div className="relative">
        <a href={href}>
          <motion.img
            src={`${image}?tr=w-450,cm-pad_resize`}
            alt={alt || title}
            className="h-70 w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
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

        
      </div>
    </motion.div>
  );
};

export default ProductCardHome;
