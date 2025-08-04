"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SidebarFilter from "../../components/category/SidebarFilter";
import ProductGrid from "../../components/category/ProductGrid";
import {
  GetProductofcategorylist,
  GetProductFilters,
} from "../../utils/api/Httproutes";

export default function CategoryPage({ params }) {
  const category = params.category;
  const pathname = usePathname();

  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(null);
  const [sortOption, setSortOption] = useState("relevance");

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When scroll reaches 60px or more
      setShowStickyHeader(window.scrollY >= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const buildQuery = () => {
  const queryParts = [];

  // Add category_slug normally
  queryParts.push(`category_slug=${encodeURIComponent(category)}`);

  // Gather all filter values into a comma-separated string
  const filterValues = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      filterValues.push(...value);
    } else if (value) {
      filterValues.push(value);
    }
  });

  // Append comma values without a key
  if (filterValues.length > 0) {
    queryParts.push(filterValues.join(","));
  }

  console.log("queryParts",queryParts)
  // Final URL string
  return queryParts.join("&");
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
      console.log("query...",query)

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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // optionally, trigger filter update based on sort
  };

  // On category change, fetch filters
  useEffect(() => {
    fetchInitialFilters();
  }, [category]);

  // On filters/category change, fetch products
  useEffect(() => {
    fetchProducts();
  }, [filters, category]);

  return (
    <main className="min-h-screen bg-white">
      <div className="px-2 sm:px-4 lg:px-6 lg:py-10">
        {/* Mobile heading */}
        <h3 className="text-xl sm:text-2xl py-4 font-bold text-[#192837] lg:hidden block">
          Buy {category.split("-").join(" ")} Products Online
        </h3>

{/* Destop heading */}
        {showStickyHeader?"":(<>
        <h3
  className={`text-xl sm:text-2xl font-bold text-[#192837] hidden lg:block transition-opacity duration-300 ${
    showStickyHeader ? "hidden" : "block"
  }`}
>
  Buy {category.split("-").join(" ")} Products Online
</h3>
        </>)}
         

        {/* Sticky header */}
        <div className="sticky top-[60px] z-45 bg-white lg:py-8 py-2 px-2 hidden lg:block">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between  gap-2">
         
          {showStickyHeader?(<><h3
      className={`text-xl sm:text-2xl font-bold text-[#192837] transition-opacity duration-300 ${
        showStickyHeader ? "block" : "hidden"
      }`}
    > Buy {category.split("-").join(" ")} Products Online
            </h3></>):""}
           
            <p  className={`${showStickyHeader ? " hidden" : "block"} p-0 m-0`}></p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full lg:w-auto">
              <label
                htmlFor="sort"
                className="text-sm text-gray-600 whitespace-nowrap hidden lg:block"
              >
                Sort By:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded px-2 py-2 w-full lg:w-[300px] text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              >
                <option value="relevance">Relevance</option>
                <option value="new">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="discount">Better Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sidebar */}
          {availableFilters && (
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-24 pr-2 custom-scrollbar">
                <SidebarFilter
                  onFilterChange={setFilters}
                  filters={availableFilters}
                />
              </div>
            </aside>
          )}

          {/* Product Section */}
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
