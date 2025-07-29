import HeroSlider from "../components/HeroSlider";
import CategorySlider from "../components/homecomponent/CategorySlider";
import HotCategoriesSlider from "../components/homecomponent/HotCategoriesSlider";
import BrandCardSlider from "../components/homecomponent/BrandCardSlider";
import CategorySwiper from "../components/homecomponent/CategorySwiper";
import BuyOneGetOne from "../components/homecomponent/BuyOneGetOne";
import ShopTopCategories from "../components/homecomponent/ShopTopCategories";

export default function Home() {
  return (
    <>
     <HeroSlider/>
    <ShopTopCategories/>
    <BuyOneGetOne/>
    <HotCategoriesSlider/>
     <BrandCardSlider/>
     {/* 
     <CategorySlider/>
     <HotCategoriesSlider/>
     <BrandCardSlider/>
     <CategorySwiper/> */}
    
    </>
  );
}