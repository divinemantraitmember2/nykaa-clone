"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ProductHeart from "../category/ProductHeart";
import { Swiper, SwiperSlide } from "swiper/react";
import { GetUserWhish, AddToCart, RemoveUserWhish } from "../../utils/api/Httproutes";
import { toggleUserGetCart } from "../../slices/userSlice";
import { updateWhishCount } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/autoplay";

// 🔥 Wishlist Page
export default function UserWishlist() {
  const dispatch = useDispatch();
  const [WishlistData, SetwishlistData] = useState([]);

  async function UserWishedList() {
  try {
    const Response = await GetUserWhish();

    if (Response?.status === 200 && Response?.data?.code === 200) {
        dispatch(updateWhishCount(Response?.data?.data?.length))
      if (Response?.data?.data?.length > 0) {
       
        SetwishlistData(Response.data.data);
      } else {
        SetwishlistData([]);
      }
    } else {
      SetwishlistData([]);
    }
  } catch (error) {
    SetwishlistData([]); 
  }
}


  useEffect(() => {
    UserWishedList();
  }, []);

  return (
    <section className="w-full mx-auto px-4 py-6">
    <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

    {WishlistData.length === 0 ? (
      <p className="text-gray-500">Your wishlist is empty 💔</p>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {WishlistData.map((item) => (
          <ResponsiveSliderCard
            key={item.productID}
            item={item}
            refreshWishlist={UserWishedList} // ✅ ab sahi hai
            dispatch={dispatch}
          />
        ))}
      </div>
    )}
  </section>

  );
}

// 🔥 Wishlist Card
function ResponsiveSliderCard({ item, refreshWishlist, dispatch }) {
  const images =
    item.variants?.[0]?.image_url?.length > 0
      ? item.variants[0].image_url
      : [item.default_image];

  const [currentImage, setCurrentImage] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Overlay + state
  const [isSizeOverlay, setIsSizeOverlay] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1000);
      setIntervalId(interval);
    }
  };

  const handleMouseLeave = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setCurrentImage(0);
  };

  const closeOverlay = () => {
    setIsSizeOverlay(false);
    setSelectedSize(null);
  };

  async function addCartProduct() {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const addcart = {
      sku: item.sku,
      size: selectedSize.size,
      quantity: 1,
      slug: item.slug,
    };

    try {
      setLoading(true);
      const res = await AddToCart("add", addcart);

      if (
        res?.status === 200 &&
        res?.data?.code === 200 &&
        res.data.message === "Item added to cart"
      ) {
        await RemoveUserWhish({ sku: addcart.sku });
        toast.success(`${item.title} added to your cart!`);
        closeOverlay();
        dispatch(toggleUserGetCart());
         refreshWishlist();
      }
    } catch (error) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section */}
      <div className="relative w-full h-90">
        {isMobile ? (
          <Swiper autoplay={{ delay: 2000, disableOnInteraction: false }} loop>
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-90">
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src={`${images[currentImage]}?tr=w-400,h-500`}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Wishlist Heart */}
        <div className="absolute top-2 right-2">
          <ProductHeart sku={item.sku} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-gray-800 text-md truncate">
          {item.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-gray-900">
            ₹{item.basePrice.discountedINR}
          </span>
          {item.basePrice.discountedINR !== item.basePrice.inr && (
            <span className="text-gray-400 line-through text-sm">
              ₹{item.basePrice.inr}
            </span>
          )}
        </div>

        {/* Stock */}
        <p
          className={`text-sm mt-1 ${
            item.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
        </p>

        {/* Move to Bag */}
        <div className="p-2">
          <button
            onClick={() => setIsSizeOverlay(true)}
            disabled={item.stock === 0}
            className={`w-full py-2 rounded-md transition font-medium text-center ${
              item.stock === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#f8f9f9] border border-[#e3e7e7] text-black"
            }`}
          >
            Move to Bag
          </button>
        </div>
      </div>

      {/* SIZE SELECTION OVERLAY */}
      {isSizeOverlay && (
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white shadow-lg rounded-t-2xl p-4 z-20 animate-slideUp">
          {/* Close */}
          <button
            onClick={closeOverlay}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✕
          </button>

          <h4 className="text-lg font-semibold mb-3">Select Size</h4>

          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[150px]">
            {item.variants?.[0]?.size_stocks?.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSize(s)}
                disabled={s.stock_quantity === 0}
                className={`px-3 py-1 border rounded-md text-sm ${
                  selectedSize?.size === s.size
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700"
                } ${
                  s.stock_quantity === 0 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>

          <button
            onClick={addCartProduct}
            disabled={loading}
            className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition font-medium"
          >
            {loading ? "Adding..." : "Add to Bag"}
          </button>
        </div>
      )}
    </div>
  );
}
