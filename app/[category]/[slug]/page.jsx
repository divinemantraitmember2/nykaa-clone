import { notFound } from "next/navigation";
import ClientProductDetails from "../../../components/product/ClientProductDetails"; // import client component
import ProductDescription from "../../../components/product/ProductDescription";
import { Get_Product_details } from "../../../utils/api/Httproutes";



export default async function ProductDetails({ params }) {
  const category = params.category;
  let products =null;
  const slug = params.slug;
  if(slug !="" ){

    try {
        console.log("slug",slug)
        const response = await Get_Product_details(slug);
        products = response?.data ||null;
        console.log("products",products)
    
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    

  }
  
  return (
    <div className="bg-[#f3f3f3] py-10 lg:px-20 px-2">
    <div className="">
     <ClientProductDetails product={products} />
     </div>
       <ProductDescription/>
     
    </div>
  );
}
