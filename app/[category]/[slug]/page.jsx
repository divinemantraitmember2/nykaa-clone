import { notFound } from "next/navigation";
import ClientProductDetails from "../../../components/product/ClientProductDetails";
import ProductDescription from "../../../components/product/ProductDescription";
import { GetProductdetails } from "../../../utils/api/serverApi";

export default async function ProductDetails({ params }) {
  const awaitedParams = await params; 
  const { category, slug } = awaitedParams;
  if (!slug) return notFound();
  let product = null;
  try {
    const CatAndSlug=`category_slug=${category}&product_slug=${slug}`
    const response = await GetProductdetails(CatAndSlug);
    if(response.products !=null){
    product = response.products[0];
    }else{
     product = null;
    }
    
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  

  return (
    <div className="bg-[#f3f3f3] py-10 lg:px-20 px-2">
      {product !=null?(<><ClientProductDetails product={product} />
      <ProductDescription /></>):(<>
      <p>Data Not Found</p>
      </>)}
      
    </div>
  );
}
