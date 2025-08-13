import SidebarFilter from "../../components/category/SidebarFilter";
import ProductGrid from "../../components/category/ProductGrid";
import NotFound from "../not-found";
import {GetProductofcategorylist,GetProductFilters} from "../../utils/api/Httproutes";

export default async function CategoryPage({ params, searchParams }) {
  try {
    if (typeof params?.then === "function") params = await params;
    if (typeof searchParams?.then === "function") searchParams = await searchParams;
    const category = (params?.category || "").toLowerCase();
    const buildProductQuery = () => {
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

    const productQuery = buildProductQuery();
    const filterQuery = `category_slug=${encodeURIComponent(category)}`;
    let products = [];
    let availableFilters = null;

    try {
      const [productRes, filterRes] = await Promise.all([
        GetProductofcategorylist(productQuery),
        GetProductFilters(filterQuery),
      ]);

      if (productRes?.status === 200 && productRes?.data?.code === 200) {
        products = productRes?.data?.data || [];
      }

      if (filterRes?.status === 200) {
        availableFilters = filterRes?.data?.data || null;
      }
    } catch (apiError) {
      console.error("API Error:", apiError);
    }

    //  Safer "not found" check
    const isCompletelyInvalidCategory =
      products.length === 0 &&
      (!availableFilters || Object.keys(availableFilters).length === 0);

    if (isCompletelyInvalidCategory) {
      console.warn(" No products or filters found for category:", category);
      return <p>Product not found and filter not found</p>;
      // return <NotFound />;
    }

    return (
      <main className="min-h-screen bg-white">
        <div className="px-2 sm:px-4 lg:px-6 lg:py-10">
          <h3 className="text-xl sm:text-2xl py-4 font-bold text-[#192837] lg:hidden block">
            Buy {category.split("-").join(" ")} Products Online
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {products.length !== 0 && availableFilters && (
              <aside className="lg:col-span-3">
                <div className="sticky top-24 pr-2 custom-scrollbar">
                  <SidebarFilter filters={availableFilters} />
                </div>
              </aside>
            )}

            <section className="lg:col-span-9">
              {products.length > 0 && (
                <ProductGrid productsData={products} catSlug={category} />
              )}

              {products.length === 0 && (
                <p className="text-center text-gray-500 py-10">No Products Found</p>
              )}

              {products.length > 0 && (
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
    console.error(" Unexpected Error:", err);
    return <NotFound />;
  }
}
