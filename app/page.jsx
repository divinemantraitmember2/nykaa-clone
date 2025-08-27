import HeroSlider from "../components/HeroSlider";
import TopCategory from "../components/homecomponent/TopCategory";
import Offers from "../components/homecomponent/Offers";
import CollectionsRenderer from "../components/homecomponent/CollectionsRenderer";
import AIShowcase from "../components/homecomponent/AIShowcase";
import TrustBadges from "../components/homecomponent/TrustBadges";
import  {GetHomePagesDetails}  from "../utils/api/serverApi";

 export default async function Home() {

  let pageData = null;

  try {
    const response = await GetHomePagesDetails();
    if (response?.status === 200 && response?.data?.code === 200) {
      pageData=response?.data?.data
    } 
  } catch (error) {
    console.error("Error fetching About Us page:", error);
    
  }


  return (
    <>
    <HeroSlider hero={pageData.banner_slides}/>
    <TopCategory quickCategories={pageData.quickCategories}/>
    <Offers Offers={pageData.coupons}/>
    <CollectionsRenderer collections={pageData.collections}/>
    <AIShowcase showcase={pageData.aiShowcase}/>
    <TrustBadges badges={pageData.trustBadges}/>
    {/* <BuyOneGetOne/> */}
    </>
  );
}