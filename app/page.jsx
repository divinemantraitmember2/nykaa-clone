import HeroSlider from "../components/HeroSlider";
import PromoCards from "../components/PromoCards";
import AesturaSection from "@/components/AesturaSection";
import LingerieSection from "@/components/LingerieSection";
import ProductSlider from "@/components/ProductSlider";
import BrandCards from "@/components/BrandCards";
import NykaaTrendingSlider from "@/components/NykaaTrendingSlider";
import NykaaOffersSlider from "@/components/NykaaOffersSlider";
import GiftCardSection from "@/components/GiftCardSection";
import InsiderBuzz from "@/components/InsiderBuzz";

export default function Home() {
  return (
    <>
     <HeroSlider/>
     <PromoCards/>
     <AesturaSection/>
     <ProductSlider/>
     <BrandCards/>
     <NykaaTrendingSlider/>
     <NykaaOffersSlider/>
     <GiftCardSection/>
     <InsiderBuzz/>
     <LingerieSection/>
    
    </>
  );
}