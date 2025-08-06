
import Link from "next/link";
import  ProductHeart from "./ProductHeart"
import  ProductColorSize from "./ProductColorSize"

export default function ProductCard({ product, slug }) {
 
  return (
    <div className="group relative hover:shadow-md mb-2 hover:shadow-pink-200 transition-all overflow-hidden w-full text-sm rounded">
        <ProductHeart/>
      <Link
        href={`/${slug}/${product.slug}`}
        className="block"
        aria-labelledby={`title-${product.id}`}
      >
        <div className="aspect-square bg-gray-50">
          <img
            src={`${product.default_image}?tr=w-512,h-683`}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-2 space-y-1">
          <h2 className="text-sm text-[#001325] font-bold leading-snug line-clamp-2 min-h-[32px]">
            {product.title}
          </h2>
           
           <ProductColorSize product={product}/>
         
          <div className="flex items-center gap-2 pt-1">
            {product?.variants.length > 0 && product?.variants[0].size_stocks.length > 0 && (
  <div>
    <p>
      <span style={{ textDecoration: "line-through", color: "#888" }}>
        ₹{product?.variants[0].size_stocks[0].price_inr}
      </span>
      &nbsp;
      <span style={{ color: "#000", fontWeight: "bold" }}>
        ₹{product?.variants[0].size_stocks[0].discounted_price_inr}
      </span>
    </p>
  </div>
)}

          </div>
        </div>
      </Link>
    </div>
  );
}