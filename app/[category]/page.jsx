import SidebarFilter from "../../components/category/SidebarFilter";
import ProductGrid from "../../components/category/ProductGrid";
import TopBanner from "../../components/category/TopBanner";
import { Get_Product_of_category_list } from '../../utils/api/Httproutes';
export default async function CategoryPage({ params }) {

let slug = params.category;
  let products = [];
  try {
    console.log("slug",slug)
    const response = await Get_Product_of_category_list(slug);
    products = response?.data || [];
    console.log("products",products)

  } catch (err) {
    console.error("Fetch failed:", err);
  }

  return (
    <main className="min-h-scree bg-[#f3f3f3] px-1 lg:p-4 py-6">
      <TopBanner />
    
      <div className="flex gap-6 mt-3">
        <SidebarFilter />
        <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center my-4">
        Buy Herbal Essences Products Online 
      </h1>
          <ProductGrid
          productsData={products}
          />
          <div className="text-center text-sm text-gray-600 mt-10">No More Products to Show</div>
          <div className="text-center mt-4">
            <button className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs mx-1">1</button>
          </div>
        </div>
      </div>
    </main>
  );
}
