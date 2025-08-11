import { notFound } from "next/navigation";
import SidebarFilter from "../../components/category/SidebarFilter";
import ProductGrid from "../../components/category/ProductGrid";
import {
  GetProductofcategorylist,
  GetProductFilters,
} from "../../utils/api/Httproutes";

export default async function CategoryPage({ params, searchParams }) {
  try {
    // ✅ Ensure searchParams is resolved if it's a Promise
    if (typeof searchParams?.then === "function") {
      searchParams = await searchParams;
    }

    const category = params?.category || "";

    // ✅ Query builder
    const buildQuery = () => {
      const queryParts = [`category_slug=${encodeURIComponent(category)}`];

      const paramsObj =
        searchParams && typeof searchParams === "object"
          ? Object.fromEntries(Object.entries(searchParams || {}))
          : {};

      for (const [key, value] of Object.entries(paramsObj)) {
        if (Array.isArray(value)) {
          value.forEach((v) =>
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          );
        } else if (value !== undefined && value !== null) {
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
      return queryParts.join("&");
    };

    const query = buildQuery();

    // ✅ API calls with error handling
    let products = [];
    let availableFilters = null;

    try {
      const [productRes, filterRes] = await Promise.all([
        GetProductofcategorylist(query),
        GetProductFilters(query),
      ]);

      products = productRes?.products || [];
      availableFilters = filterRes?.data || null;
    } catch (apiError) {
      console.error("API fetch error:", apiError);
      // Agar API hi fail ho jaye, empty data set karenge
      products = [];
      availableFilters = null;
    }

    // ✅ Invalid category → 404
    if (products.length === 0 && !availableFilters) {
      notFound();
    }

    // ✅ Page render
    return (
      <main className="min-h-screen bg-white">
        <div className="px-2 sm:px-4 lg:px-6 lg:py-10">
          <h3 className="text-xl sm:text-2xl py-4 font-bold text-[#192837] lg:hidden block">
            Buy {category.split("-").join(" ")} Products Online
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {availableFilters && (
              <aside className="lg:col-span-3 hidden lg:block">
                <div className="sticky top-24 pr-2 custom-scrollbar">
                  <SidebarFilter
                    filters={availableFilters}
                    category={category}
                    searchParams={searchParams}
                  />
                </div>
              </aside>
            )}

            <section className="lg:col-span-9">
              <ProductGrid productsData={products} catSlug={category} />
              {products?.length === 0 && (
                <div className="text-center text-sm text-gray-600 mt-10">
                  No Products Found
                </div>
              )}
              {products?.length > 0 && (
                <div className="text-center text-sm text-gray-600 mt-10">
                  No More Products to Show
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    );
  } catch (err) {
    console.error("CategoryPage error:", err);
    // Agar kuch unexpected crash ho jaye → 404
    notFound();
  }
}
