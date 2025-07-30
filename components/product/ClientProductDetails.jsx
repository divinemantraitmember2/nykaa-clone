"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { AddToCart } from "../../utils/api/Httproutes";
import SearchLocation from "../SearchLocation";
import { useSession } from "next-auth/react";
import { openLoginModal } from "../../slices/userSlice";

export default function ClientProductDetails({ product }) {
  const dispatch = useDispatch();
 const { data: session, status } = useSession();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

  // Auto-select first color and size on load
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const defaultVariant = product.variants[0];
      setSelectedColor(defaultVariant.color);
      setSelectedSize(defaultVariant.size_stocks?.[0]?.size || "");
      setSelectedImg(defaultVariant.image_url?.[0] || product.default_image);
    }
  }, [product]);

  const selectedVariant = product?.variants?.find(
    (variant) => variant.color === selectedColor
  );

  const selectedStock = selectedVariant?.size_stocks?.find(
    (s) => s.size === selectedSize
  );

  const discountPercent =
    selectedStock?.price_inr && selectedStock?.discounted_price_inr
      ? Math.round(
          ((selectedStock.price_inr - selectedStock.discounted_price_inr) /
            selectedStock.price_inr) *
            100
        )
      : 0;

  const handleAddToCart = async() => {
    
    if (status === "unauthenticated") {
      dispatch(openLoginModal())
    }else{
    if (!selectedVariant || !selectedStock) return;
    dispatch(
      addToCart({
        id: product.productID,
        title: product.title,
        price: selectedStock.discounted_price_inr,
        image: selectedImg,
        slug: product.slug,
        size: selectedSize,
        color: selectedColor,
      })
    );
    let addcart={
      "sku":product.sku,
      "variants": {
       "color":selectedColor
       }, 
    "size": selectedSize,
    "quantity": 1     
}
try{
 const res= await AddToCart("add",addcart)
 console.log("res...",res)
}catch(error){
  console.log("error",error)

}
  }

  };

  return (
    <section className="py-1 px-1 lg:px-0">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-1 relative">
          {/* LEFT: Images */}
          <div className="w-full lg:w-[45%] p-2 flex gap-4">
            {/* Thumbnail images */}
            <div className="flex flex-col gap-2">
              {selectedVariant?.image_url?.map((img, i) => (
                <img
                  key={i}
                  src={`${img}?tr=w-200`}
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
            <div className="flex-1 flex justify-center items-center relative">
              <img
                src={selectedImg}
                alt="Main"
                width={500}
                height={500}
                className="object-contain max-h-[500px] w-full"
              />
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

          {/* RIGHT: Product Info */}
          <div className="w-full lg:w-[55%] px-4 py-4 border-t lg:border-t-0 lg:border-l border-[#fccee8]">
            
            <div className="flex-1 flex justify-center items-center relative">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.title}
            </h1>

        <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-pink-50 transition">
         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <circle cx="18" cy="5" r="3" />
  <circle cx="6" cy="12" r="3" />
  <circle cx="18" cy="19" r="3" />
  <path d="M8.59 13.51l6.83 3.98" />
  <path d="M15.41 6.51l-6.82 3.98" />
</svg>

        </button>
      
      </div>
            {selectedStock && (
              <div className="text-lg font-medium mb-2">
                <span className="line-through text-gray-400 text-base">
                  ₹{selectedStock.price_inr}
                </span>
                <span className="ml-2 text-black font-bold text-xl">
                  ₹{selectedStock.discounted_price_inr}
                </span>
                {discountPercent > 0 && (
                  <span className="ml-2 text-green-600 text-sm font-semibold">
                    ({discountPercent}% off)
                  </span>
                )}
              </div>
            )}

            <p className="text-xs text-gray-500 mb-4">
              Inclusive of all taxes
            </p>

            {/* Attributes */}
            <div className="text-sm text-gray-700 mb-4 space-y-1">
              {product?.attributes?.map((attr) => (
                <div key={attr.name}>
                  <strong>{attr.name}:</strong> {attr.value}
                </div>
              ))}
            </div>

            <div className="mb-2 max-w-7xl mx-auto px-2 lg:px-0">
              <div className="flex flex-row  items-start   justify-start gap-3">
                <div className="w-full lg:w-auto flex justify-start">

            {/* Color Selection */}
            <div className="">
              <p className="text-sm font-medium mb-1">Select Color:</p>
              <div className="flex flex-wrap gap-4">
                {product?.variants?.map((variant, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="color"
                      value={variant.color}
                      checked={selectedColor === variant.color}
                      onChange={() => {
                        setSelectedColor(variant.color);
                        setSelectedImg(variant.image_url?.[0] || product.default_image);
                        // Auto select first size of selected color
                        setSelectedSize(variant.size_stocks?.[0]?.size || "");
                      }}
                      className="accent-pink-600"
                    />
                    <span>{variant.color}</span>
                  </label>
                ))}
              </div>
            </div>
              </div>
<div className="relative w-full sm:w-[300px] border-l pl-2">
            {/* Size Selection */}
            {selectedVariant && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Select Size:</p>
                <div className="flex flex-wrap gap-4">
                  {selectedVariant.size_stocks.map((stock, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="size"
                        value={stock.size}
                        checked={selectedSize === stock.size}
                        onChange={() => setSelectedSize(stock.size)}
                        className="accent-pink-600"
                      />
                      <span>{stock.size}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
             </div>
              </div>
            </div>

            {/* Add to Cart & Location Input */}
            <div className="mb-2  border-t pt-2 max-w-7xl mx-auto px-1">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-around gap-4">
                <div className="w-full lg:w-auto flex justify-center lg:justify-start">
                  <button
                    onClick={handleAddToCart}
                    className="bg-pink-600 text-white rounded py-4 px-10 text-sm font-semibold hover:bg-pink-700 transition"
                    disabled={!selectedColor || !selectedSize}
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
            <div className="flex flex-wrap items-center gap-4 px-2 py-4 mt-6 bg-[#f4f4f5] text-xs text-gray-600 rounded-md">
              <span className="flex items-center gap-1">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/103/103473.png"
                  alt="genuine"
                  className="w-4 h-4"
                />
                100% Genuine Products
              </span>
              <span className="flex items-center gap-1">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/535/535234.png"
                  alt="return"
                  className="w-4 h-4"
                />
                Easy Return Policy
              </span>
              <span className="truncate">Sold by: Pondric E RETA...</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
