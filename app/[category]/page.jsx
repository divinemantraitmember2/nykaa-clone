"use client";
import { useEffect, useState } from "react";
import SidebarFilter from "../../components/category/SidebarFilter";
import ProductGrid from "../../components/category/ProductGrid";
import TopBanner from "../../components/category/TopBanner";
import {
  GetProductofcategorylist,
  GetProductFilters,
} from "../../utils/api/Httproutes";

export default function CategoryPage({ params }) {
  const slug = params.category;

  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(null); 

  const buildQuery = () => {
    const query = new URLSearchParams({ category_slug: slug, ...filters });
    return query.toString();
  };

  const fetchInitialFilters = async () => {
    try {
      const query = buildQuery();
      const response = await GetProductFilters(query);
      if(response.status === 200 && response.data.categories !=null){
      setAvailableFilters(response.data);
      }else{
        setAvailableFilters(null);
      }
      
    } catch (err) {
      console.error("Filter fetch failed:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const query = buildQuery();
      const response = await GetProductofcategorylist(query);

      setProducts(response.products || []);
    } catch (err) {
      console.error("Product fetch failed:", err);
    }
  };

  // only run once on mount to get sidebar filters
  useEffect(() => {
    fetchInitialFilters();
  }, [slug]);

  // run when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters, slug]);

  return (
    <main className="min-h-scree bg-[#f3f3f3] px-1 lg:p-4 py-6">
      <TopBanner />

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center my-4">
        Buy Herbal Essences Products Online
      </h1>

      <div className="flex gap-6 mt-3">
       {availableFilters !=null? <SidebarFilter
          onFilterChange={setFilters}
          filters={availableFilters}
        />:""} 
        <div className="flex-1">

          <ProductGrid productsData={products} catSlug={slug}  />
          <div className="text-center text-sm text-gray-600 mt-10">
            No More Products to Show
          </div>
        </div>
      </div>
    </main>
  );
}
