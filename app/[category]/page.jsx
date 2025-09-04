import SidebarFilter from "../../components/category/SidebarFilter";
import MobileFilterSortBar from "../../components/category/MobileFilterSortBar";
import SortByDropdown from "../../components/category/SortByDropdown";
import Pagination from "../../components/category/Pagination";
import ProductGrid from "../../components/category/ProductGrid";
import NotFound from "../not-found";
import { GetProductofcategorylist ,GetProductFilters} from "../../utils/api/serverApi";

export default async function CategoryPage(propsPromise) {
  try {
   
    let { params, searchParams } = await propsPromise;

    if (typeof params?.then === "function") {
      params = await params;
    }
    if (typeof searchParams?.then === "function") {
      searchParams = await searchParams;
    }

    const category = (params?.category || "").toLowerCase();

    // Build query string
    const buildProductQuery = () => {
      const query = new URLSearchParams({ category_slug: category });
      Object.entries(searchParams || {}).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach(v => query.append(key, v));
        else if (value != null) query.append(key, value);
      });
      return query.toString();
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
        products = productRes.data.data || [];
      }
      if (filterRes?.status === 200 && filterRes?.data?.code === 200) {
        availableFilters = filterRes.data.data || null;
      }

    } catch (apiError) {
      console.error("API Error:", apiError);
    }

    // Filter check
    const isFiltersEmpty =
      !availableFilters ||
      Object.values(availableFilters).every(val =>
        Array.isArray(val) ? val.length === 0 : !val
      );

      
    const isCompletelyInvalidCategory = products.length === 0 && isFiltersEmpty;
   

    if (isCompletelyInvalidCategory) {
      return <NotFound />;
    }

    return (
      <main className="min-h-screen bg-white">
        <div className="px-2 sm:px-4 lg:px-6 lg:py-4">    
<div className=" bg-white flex flex-col lg:flex-row lg:items-center lg:justify-between lg:mb-8  ">
  <div className="">
    <h1 className="text-sm lg:text-lg font-semibold py-2 lg:py-2 leading-6 tracking-[0.38px] font-sans text-[#212121] uppercase">
  Shop {category.split("-").join(" ")} Online{" "}
  <span className="">
    Best Prices & Deals
  </span>
</h1>
<p className="text-sm ">Showing {products.length} Products</p>
  </div>
  <div className="hidden lg:block">
    <SortByDropdown />
  </div>
</div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {products.length !== 0 && !isFiltersEmpty && (
              <aside className="lg:col-span-3">
                <div className="sticky top-24 pr-2 custom-scrollbar">
                  <SidebarFilter filters={availableFilters} />
                </div>
              </aside>
            )}

            <section className="lg:col-span-9">
              {products.length > 0 ? (
                <>
                  <ProductGrid productsData={products} catSlug={category} />
                  <div className="text-center text-sm text-gray-600 mt-10">
                    <Pagination
                    total={20}
                      limit={12}
                     />
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-10">No Products Found</p>
              )}
            </section>
          </div>
        </div>
         <MobileFilterSortBar/>
      </main>
    );
  } catch (err) {
    console.error("Unexpected Error:", err);
    return <NotFound />;
  }
}
