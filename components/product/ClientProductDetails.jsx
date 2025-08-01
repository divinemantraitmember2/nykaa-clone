"use client";
import { useEffect,useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { AddToCart } from "../../utils/api/Httproutes";
import SearchLocation from "../SearchLocation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { openLoginModal } from "../../slices/userSlice";
import { useRouter } from "next/navigation";
import  ReturnPolicy  from "../../components/product/ReturnPolicy";
import  InfoStrip  from "../../components/product/InfoStrip";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function ClientProductDetails({ product, mainCate,selsectSlug }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  
  // Auto-select first color and size on load
  useEffect(() => {
  if (product?.variants?.length > 0 && selsectSlug) {
    // slug ke base par variant dhoondo
    const matchedVariant = product.variants.find(
      (variant) => variant.slug === selsectSlug
    );

    if (matchedVariant) {
      setSelectedColor(matchedVariant.color);
      setSelectedSize(matchedVariant.size_stocks?.[0]?.size || "");
      setSelectedImg(matchedVariant.image_url?.[0] || product.default_image);
    } else {
      // Agar slug match na ho to default variant lo
      const defaultVariant = product.variants[0];
      setSelectedColor(defaultVariant.color);
      setSelectedSize(defaultVariant.size_stocks?.[0]?.size || "");
      setSelectedImg(defaultVariant.image_url?.[0] || product.default_image);
    }
  }
}, [product, selsectSlug]);


  const handleColorSelect = (variant) => {
    setSelectedColor(variant.slug);
    setSelectedImg(variant.image_url?.[0] || product.default_image);
    setSelectedSize(variant.size_stocks?.[0]?.size || "");
    router.push(`/${mainCate}/${variant.slug}`);
  };

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

  const handleAddToCart = async () => {
    if (status === "unauthenticated") {
      dispatch(openLoginModal());
    } else {
      if (!selectedVariant || !selectedStock) return;
      dispatch(
        addToCart({
          id: product.sku,
          title: product.title,
          price: selectedStock.discounted_price_inr,
          image: selectedImg,
          slug: product.slug,
          size: selectedSize,
          color: selectedColor,
        })
      );

      const addcart = {
        sku: product.sku,
        variants: { color: selectedColor },
        size: selectedSize,
        quantity: 1,
      };

      try {
        const res = await AddToCart("add", addcart);
        console.log("Add to Cart Response:", res);
      } catch (error) {
        console.error("Add to Cart Error:", error);
      }
    }
  };

  const coupons = [
    {
      title: "Extra 20% off",
      description: "Extra 20% off upto ₹220 on orders above ₹999",
      code: "NFPINK20",
    },
    {
      title: "Extra 15% off",
      description: "Extra 15% off upto ₹200 on a minimum order of ₹799",
      code: "NFNEW15",
    },
    {
      title: "Flat ₹100 off",
      description: "Flat ₹100 off on all prepaid orders above ₹499",
      code: "PREPAID100",
    },
    {
      title: "Buy 1 Get 1",
      description: "Buy 1 Get 1 Free on selected fashion items",
      code: "BOGOFASHION",
    },
    {
      title: "Mega 30% Deal",
      description: "Flat 30% off on new arrivals. No minimum.",
      code: "MEGA30",
    },
  ];

  const scrollRef = useRef(null);

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-1 px-1 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-1 relative">
        
         <div className="w-full lg:w-[45%] p-2 lg:sticky top-4 self-start h-fit">
  <div className="flex flex-col lg:flex-row gap-3">

    {/* Thumbnails Container */}
    <div className="relative w-full lg:w-fit">

      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full lg:hidden"
        onClick={() => scrollBy(-240)}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full lg:hidden"
        onClick={() => scrollBy(240)}
      >
        <ChevronRight size={20} />
      </button>

      {/* Thumbnails */}
      <div
        ref={scrollRef}
        className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth px-1 hide-scrollbar"
      >
        {selectedVariant?.image_url?.map((img, i) => (
          <div
            key={i}
            id={`thumb-${i}`}
            className={`shrink-0 border rounded cursor-pointer p-1 snap-start
              ${selectedImg === img ? "border-pink-600" : "border-gray-300"}
              w-[240px] h-[340px] sm:w-[220px] sm:h-[310px] md:w-[180px] md:h-[260px] 
              lg:w-[90px] lg:h-[120px] aspect-[3/4]`}
            onClick={() => {
              setSelectedImg(img);
              const el = document.getElementById(`thumb-${i}`);
              if (el && window.innerWidth < 1024) {
                el.scrollIntoView({ behavior: "smooth", inline: "center" });
              }
            }}
          >
            <img
              src={`${img}?tr=w-512`}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Main Image - desktop only */}
    <div className="hidden lg:flex flex-1 justify-center items-center relative">
      <img
        src={`${selectedImg}?tr=w-500`}
        alt="Main"
        width={500}
        height={500}
        className="object-contain max-h-[600px] w-full"
      />
    </div>
  </div>
</div>



          {/* RIGHT: Product Info */}
          <div className="w-full lg:w-[55%] px-4 py-4">
            <div className="relative">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {product.title}
              </h1>
              <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-pink-50 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.59 13.51l6.83 3.98" />
                  <path d="M15.41 6.51l-6.82 3.98" />
                </svg>
              </button>
            </div>

            {/* Price */}
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

            {/* Color Selection */}
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-800 mb-3">
                Select Color
              </h2>
              <div className="flex overflow-x-auto gap-4 pb-2">
                {product?.variants?.map((variant, index) => (
                  <div
                    key={index}
                    onClick={() => handleColorSelect(variant)}
                    className={`relative border rounded-lg cursor-pointer flex-shrink-0 w-[84px] h-[112px] overflow-hidden transition
                    ${
                      selsectSlug === variant.slug
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={`${variant.image_url?.[0]}?tr=w-128`}
                      alt={variant.color}
                      className="object-cover w-full h-full"
                    />
                    {selsectSlug === variant.slug && (
                      <svg
                        className="absolute top-1 right-1 w-5 h-5 text-green-600 bg-white rounded-full p-0.5 shadow-md"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.285 6.709a1 1 0 00-1.414-1.418l-9.571 9.571-4.571-4.571a1 1 0 00-1.414 1.418l5.285 5.285a1 1 0 001.414 0l10.285-10.285z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {selectedVariant && (
              <div className="mb-4">
                <p className="text-base font-semibold text-gray-800 mb-2">
                  Select Size:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedVariant.size_stocks.map((stock, idx) => (
                    <label
                      key={idx}
                      className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition
                      ${
                        selectedSize === stock.size
                          ? "bg-pink-600 text-white border-pink-600"
                          : "bg-white text-gray-800 border-gray-300 hover:border-pink-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={stock.size}
                        checked={selectedSize === stock.size}
                        onChange={() => setSelectedSize(stock.size)}
                        className="hidden"
                      />
                      {stock.size}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart & Wishlist */}
            <div className="border-b border-gray-200 pt-4 pb-6">
              <div className="flex gap-4">
                <button className="w-1/2 bg-white text-black border border-gray-300 hover:border-pink-700 text-sm font-semibold px-4 py-2 flex items-center gap-2 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.75a5.25 5.25 0 00-4.355 2.333A5.25 5.25 0 007.5 3.75 5.25 5.25 0 002.25 9c0 7.143 9.75 11.25 9.75 11.25S21.75 16.143 21.75 9A5.25 5.25 0 0016.5 3.75z"
                    />
                  </svg>
                  <span>Add to Wishlist</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedColor || !selectedSize}
                  className="w-1/2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-6 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Bag
                </button>
              </div>
            </div>

            {/* Search Location */}
            <div className="">
              <SearchLocation />
            </div>
            <div className="">
              <InfoStrip />
            </div>


            {/* Coupons */}
           <div className="overflow-x-auto ">
  <div className="flex gap-3 px-2 w-max">
    {coupons.map((coupon, index) => (
      <div
        key={index}
        className="min-w-[280px] max-w-[300px] flex gap-2 items-start bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
      >
        <img
          src="/images/logo.jpeg"
          alt="pondric"
          className="w-10 h-6"
        />
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800">
            {coupon.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">
            {coupon.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 px-3 py-1 text-sm font-mono border border-gray-300 rounded cursor-pointer select-all">
              {coupon.code}
            </div>
            <button className="text-pink-600 text-sm underline hover:text-pink-800 whitespace-nowrap">
              See details
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


           {/* Product Details Accordion */}
 <div className="overflow-hidden shadow-sm bg-white  hover:shadow-2xl mt-4">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition"
      >
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            {/* Bookmark Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="#001325"
              fillOpacity="0.92"
            >
              <path d="M19 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4ZM13.9 5.5V10.33L12 9.24L10.1 10.33V5.5H13.9ZM18.5 18.5H5.5V5.5H8.6V11.2C8.6 11.4652 8.70536 11.7196 8.89289 11.9071C9.08043 12.0946 9.33478 12.2 9.6 12.2C9.77658 12.2017 9.95001 12.1532 10.1 12.06L12 11L13.9 12.1C14.0523 12.1879 14.2251 12.2342 14.401 12.234C14.5769 12.2338 14.7496 12.1873 14.9017 12.099C15.0539 12.0108 15.18 11.884 15.2675 11.7314C15.355 11.5788 15.4007 11.4059 15.4 11.23V5.5H18.5V18.5Z" />
            </svg>
            Product Details
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Care instructions, Pack contains
          </p>
        </div>

        {/* Chevron Icon */}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            showDetails ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-300 px-4 ${
          showDetails ? "max-h-[800px] py-4" : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
  {product?.attributes?.map((attr, idx) => (
    <div
      key={idx}
      className="flex justify-between items-center border p-2 rounded hover:shadow-lg"
    >
      <span className="text-gray-900 font-medium capitalize">{attr.name}</span>
      <span className="text-gray-500 text-right">{attr.value}</span>
    </div>
  ))}
</div>

      </div>
    </div>


            {/* Know Your Product Accordion */}
            <div className=" overflow-hidden shadow-sm  hover:shadow-2xl bg-white mt-4">
              <button
                onClick={() => setOpenDetails(!openDetails)}
                className="w-full flex justify-between items-center px-4 py-3 transition"
              >
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm1 14h-2v-6h2v6Zm0-8h-2V7h2v2Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium">Know your product</h3>
                    <p className="text-xs text-gray-500">Description</p>
                  </div>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    openDetails ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden bg-white px-4 ${
                  openDetails ? "max-h-96 py-3" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-700">
                  A Sweet Treat For Your Little Girl. This Enchanting Dress With
                  Swirling Ruffle And Flower Make It A Perfect Pick For Any
                  Occasion. Perfectly Picked From Our Color Palette To Please
                  The Eye.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <ReturnPolicy/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
