"use client";

import { useEffect, useState, use } from "react";
import SidebarFilter from "../../components/category/SidebarFilter";
import ProductGrid from "../../components/category/ProductGrid";
import TopBanner from "../../components/category/TopBanner";
import {
  GetProductofcategorylist,
  GetProductFilters,
} from "../../utils/api/Httproutes";

export default function CategoryPage({ params }) {
  const category = params.category;
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(null);

  const buildQuery = () => {
    const query = new URLSearchParams({ category_slug: category, ...filters });
    return query.toString();
  };

  const fetchInitialFilters = async () => {
    try {
      const query = buildQuery();
      const response = await GetProductFilters(query);
      if (response.status === 200) {
        const data = response.data;
        const isEmpty =
          (!data.price_range || data.price_range.length === 0) &&
          (!data.colors || data.colors.length === 0) &&
          (!data.attributes || data.attributes.length === 0) &&
          (!data.categories || data.categories.length === 0) &&
          (!data.sizes || data.sizes.length === 0);

        setAvailableFilters(isEmpty ? null : data);
      } else {
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
      if (response.products && response.products.length > 0) {
        setProducts(response.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Product fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchInitialFilters();
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [filters, category]);

  return (
    <main className="min-h-screen bg-white">
      {/* <TopBanner /> */}
      <div className="px-2 sm:px-4 lg:px-6 py-2">
        <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#192837] py-4">
          Buy Herbal Essences Products Online
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {availableFilters && (
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh)] overflow-y-auto pr-2 custom-scrollbar">
                <SidebarFilter onFilterChange={setFilters} filters={availableFilters} />
              </div>
            </aside>
          )}

          <section className="lg:col-span-9">
            <ProductGrid productsData={products} catSlug={category} />
            <div className="text-center text-sm text-gray-600 mt-10">
              No More Products to Show
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
