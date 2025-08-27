"use client";

import React from "react";
import ProductCardHome from "./ProductCardHome";

const CollectionsRenderer = ({ collections }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 my-10 space-y-12">
      {collections.map((collection) => (
        <div key={collection.id}>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-extrabold">{collection.title}</h2>
            <a href="#" className="text-sm font-medium hover:opacity-80">
              View all →
            </a>
          </div>

          {collection.layout === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {collection.products.map((product) => (
                <ProductCardHome
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.discountedINR || product.priceINR}
                  originalPrice={product.discountedINR ? product.priceINR : null}
                  discount={product.badge}
                  rating={product.rating || 0}
                  href={product.href || "#"}
                  onAddToCart={() => console.log("Add to Cart", product.title)}
                  onWishlist={() => console.log("Wishlist", product.title)}
                />
              ))}
            </div>
          ) : collection.layout === "carousel" ? (
            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {collection.products.map((product) => (
                  
                    <ProductCardHome
                    key={product.id}
                      title={product.title}
                      image={product.image}
                      price={product.discountedINR || product.priceINR}
                      originalPrice={product.discountedINR ? product.priceINR : null}
                      discount={product.badge}
                      rating={product.rating || 0}
                      href={product.href || "#"}
                      onAddToCart={() => console.log("Add to Cart", product.title)}
                      onWishlist={() => console.log("Wishlist", product.title)}
                    />
                  
                ))}
              </div>
             
              
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CollectionsRenderer;
