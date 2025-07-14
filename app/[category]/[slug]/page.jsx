import { notFound } from "next/navigation";
import ClientProductDetails from "../../../components/product/ClientProductDetails"; // import client component
import ProductDescription from "../../../components/product/ProductDescription";

const products = [
  {
    id:1,
    slug: "argan-oil",
    title: "Herbal Essences Argan Oil Shampoo & Conditioner",
    subtitle: "For Frizz, No Parabens, No Colourants",
    price: 1019,
    mrp: 1358,
    discount: "25% Off",
    rating: 4.4,
    ratingCount: 25491,
    reviewCount: 2764,
    images: [
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e966fdNYKHES0000001_1.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e966fdNYKHES0000001_4.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e966fdNYKHES0000001_2.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e966fdNYKHES0000001_3.jpg",
    ],
  },
  // other products
];

export default function ProductDetails({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="bg-[#f3f3f3] py-10 lg:px-20 px-2">
    <div className="">
     <ClientProductDetails product={product} />
     </div>
       <ProductDescription/>
     
    </div>
  );
}
