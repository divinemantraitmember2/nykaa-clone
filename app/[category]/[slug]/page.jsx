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
    <div className="bg-[#fff] py-10 lg:px-10">
      {product !=null?(<><ClientProductDetails product={product} mainCate={category} selsectSlug={slug}/>
      </>):(<>
      <p>Data Not Found</p>
      </>)}
      
    </div>
  );
}
