import Link from "next/link";
import ProductHeart from "./ProductHeart";
import ProductColorSize from "./ProductColorSize";

export default function ProductCard({ product, slug }) {
  const variant =
    product?.variants?.length > 0 ? product?.variants[0] : null;
  const sizeStock =
    variant?.size_stocks?.length > 0 ? variant?.size_stocks[0] : null;

  return (
    <div className="group relative mb-4 w-full hover:rounded-2xl overflow-hidden  hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 bg-white">
      {/* Wishlist Heart */}
      <div className="absolute top-1 right-1 z-10">
        <ProductHeart />
      </div>

      <Link
        href={`/${slug}/${product?.slug}`}
        className="block"
        aria-labelledby={`title-${product?.id}`}
      >
        {/* Image Section */}
        <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden relative">
          <img
            src={`${product?.default_image}?auto=format&w=500`}
            alt={product?.title}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Title */}
          <h2
            id={`title-${product?.id}`}
            className="text-sm md:text-base text-[#001325] font-semibold leading-snug line-clamp-2 min-h-[38px] group-hover:text-pink-600 transition-colors"
          >
            {product?.title}
          </h2>

          {/* Color / Size */}
          <ProductColorSize product={product} />

          {/* Price Section */}
          {sizeStock && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-gray-400 text-sm line-through">
                ₹{sizeStock?.price_inr}
              </span>
              <span className="text-lg font-bold text-pink-600">
                ₹{sizeStock?.discounted_price_inr}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
