import { notFound } from "next/navigation";
import SidebarFilter from "../../components/category/SidebarFilter";
import ProductGrid from "../../components/category/ProductGrid";
import {
  GetProductofcategorylist,
  GetProductFilters,
} from "../../utils/api/Httproutes";

export default async function CategoryPage({ params, searchParams }) {
  const category = params?.category || "default-category";

  const buildQuery = () => {
    const queryParts = [`category_slug=${encodeURIComponent(category)}`];

    const paramsObj = searchParams
      ? Object.fromEntries(Object.entries(searchParams))
      : {};

    if (Object.keys(paramsObj).length > 0) {
      for (const [key, value] of Object.entries(paramsObj)) {
        if (Array.isArray(value)) {
          value.forEach((v) =>
            queryParts.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
            )
          );
        } else {
          queryParts.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          );
        }
      }
    }

    return queryParts.join("&");
  };

  const query = buildQuery();

  const [productRes, filterRes] = await Promise.all([
    GetProductofcategorylist(query),
    GetProductFilters(query),
  ]);

  const products = productRes?.products || [];
  const availableFilters = filterRes?.data || null;

  // Agar category invalid hai to 404 dikhao
  if (products.length === 0 && !availableFilters) {
    notFound();
  }

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
}
