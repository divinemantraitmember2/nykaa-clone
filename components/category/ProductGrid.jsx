import { products } from "../../data/category/products";
import ProductCard from "../../components/category/ProductCard";

export default function ProductGrid() {
  return (
    
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1 lg:gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
