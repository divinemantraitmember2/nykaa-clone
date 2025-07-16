import { notFound } from "next/navigation";
import ClientProductDetails from "../../../components/product/ClientProductDetails";
import ProductDescription from "../../../components/product/ProductDescription";
import { Get_Product_details } from "../../../utils/api/Httproutes";

export default async function ProductDetails({ params }) {
  const awaitedParams = await params; 
  const { category, slug } = awaitedParams;

  if (!slug) return notFound();

  let product = null;

  try {
    const response = await Get_Product_details(slug);
    product = response?.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  

  return (
    <div className="bg-[#f3f3f3] py-10 lg:px-20 px-2">
      <ClientProductDetails product={product} />
      <ProductDescription />
    </div>
  );
}
