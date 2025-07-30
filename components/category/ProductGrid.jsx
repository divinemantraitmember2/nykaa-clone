
import ProductCard from "../../components/category/ProductCard";

export default function ProductGrid({productsData,catSlug}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1">
      {productsData !=null && productsData.map((product) => (
        <ProductCard key={product.id} product={product} slug={catSlug} />
      ))}
    </div>
  );
}
