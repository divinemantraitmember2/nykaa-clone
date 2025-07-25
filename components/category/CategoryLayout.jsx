"use client";
import { useEffect, useMemo, useState } from "react";
import SidebarFilter from "./SidebarFilter";
import ProductGrid from "./ProductGrid";
import TopBanner from "./TopBanner";
import {
  GetProductofcategorylist,
  GetProductFilters,
} from "../../utils/api/Httproutes";

export default function CategoryLayout({ slug }) {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({});

  const query = useMemo(() => {
    return new URLSearchParams({ category_slug: slug, ...filters }).toString();
  }, [slug, filters]);

  const fetchInitialFilters = async () => {
    try {
      const response = await GetProductFilters(`category_slug=${slug}`);
      setAvailableFilters(response);
    } catch (err) {
      console.error("Filter fetch failed:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await GetProductofcategorylist(query);
      setProducts(response.products || []);
    } catch (err) {
      console.error("Product fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchInitialFilters();
  }, [slug]);

  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <main className="min-h-screen bg-[#f3f3f3] px-1 lg:p-4 py-6">
      <TopBanner />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center my-4">
        Buy Herbal Essences Products Online
      </h1>

      <div className="flex gap-6 mt-3">
        <SidebarFilter
          onFilterChange={setFilters}
          filters={availableFilters}
        />
        <div className="flex-1">
          <ProductGrid productsData={products} />
          <div className="text-center text-sm text-gray-600 mt-10">
            No More Products to Show
          </div>
        </div>
      </div>
    </main>
  );
}
