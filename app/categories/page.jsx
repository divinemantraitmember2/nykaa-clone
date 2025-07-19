import CategoryGrid from "../../components/category/CategoryGrid";

const categoryData = [
  {
    slug: "beauty",
    name: "Beauty",
    url: "https://dummyjson.com/products/category/beauty",
  },
  {
    slug: "fragrances",
    name: "Fragrances",
    url: "https://dummyjson.com/products/category/fragrances",
  },
  {
    slug: "furniture",
    name: "Furniture",
    url: "https://dummyjson.com/products/category/furniture",
  },
  // Add more items...
];



export default function Categories(){
    
    return(
        <>
        <div className="lg:px-10">
 <CategoryGrid categories={categoryData} />
        </div>
       
        
        </>
    )

}