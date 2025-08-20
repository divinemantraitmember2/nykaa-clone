
import ClientProductDetails from "../../../components/product/ClientProductDetails";
import { GetProductdetails } from "../../../utils/api/serverApi";
import NotFound from "../../not-found";

export default async function ProductDetails({ params }) {
  const awaitedParams = await params; 
  const { category, slug } = awaitedParams;
  if (!slug) return <NotFound/>;
  let product = null;
  try {
    const CatAndSlug=`category_slug=${category}&product_slug=${slug}`
    const response = await GetProductdetails(CatAndSlug);
    if(response.status===200){
      if(response?.data?.code===200){
        product = response?.data?.data?.[0];
      }else{
        console.log("page not found")
      }
    }else{
     product = null;
    }
    
  } catch (error) {
    console.error("Error fetching product:", error);
  }


  return (
    <>
       {product !=null?(<><div className="bg-[#fff] py-2 lg:px-10">
      <ClientProductDetails product={product} mainCate={category} selsectSlug={slug}/>
       </div></>):(<NotFound/>)}
    </>
  );
}
