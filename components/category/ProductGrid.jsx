
import ProductCard from "../../components/category/ProductCard";

export default function ProductGrid({productsData}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1 lg:gap-3">
      {productsData !=null && productsData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
