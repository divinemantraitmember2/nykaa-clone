import Link from "next/link";
import ProductHeart from "./ProductHeart";
import ProductColorSize from "./ProductColorSize";

export default function ProductCard({ product, slug }) {
  const variant =
    product?.variants?.length > 0 ? product?.variants[0] : null;
  const sizeStock =
    variant?.size_stocks?.length > 0 ? variant?.size_stocks[0] : null;

  return (
    <div className="group relative mb-4 w-full  overflow-hidden  hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 bg-white" title={product?.title}>
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

        
<div className="w-full h-[290px] overflow-hidden rounded-md">
  <picture className="w-full h-full block">
    <source
      srcSet={`${product?.default_image}`}
      type="image/webp"
    />
    <img
      src={`${product?.default_image}`}
      alt={product?.title}
      title={product?.title}
      className="w-full h-full object-cover block"
      draggable="false"
      loading="lazy"
    />
  </picture>
</div>





        {/* Content */}
        <div className="p-2 space-y-1">
          {/* Title */}
          <h2
            id={`title-${product?.id}`}
            className="text-sm font-medium text-[#212121]  tracking-[0.38px]  leading-snug line-clamp-2 "
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
              <span className="text-sm md:text-base font-medium text-[#001325]">
                ₹{sizeStock?.discounted_price_inr}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
