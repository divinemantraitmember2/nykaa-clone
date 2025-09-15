import HeroSlider from "../components/HeroSlider";
import TopCategory from "../components/homecomponent/TopCategory";
import Offers from "../components/homecomponent/Offers";
import CollectionsRenderer from "../components/homecomponent/CollectionsRenderer";
import AIShowcase from "../components/homecomponent/AIShowcase";
import TrustBadges from "../components/homecomponent/TrustBadges";
import CategoryCards2 from "../components/homecomponent/CategoryCards2";
import  {GetHomePagesDetails}  from "../utils/api/serverApi";

 export default async function Home() {

  let pageData = null;
  try {
    const response = await GetHomePagesDetails();
    if (response?.status === 200 && response?.data?.code === 200) {
      pageData=response?.data?.data;
      // console.log("pageData",pageData)
    } 
  } catch (error) {
    console.error("Error fetching About Us page:", error);
    
  }


  return (
    <>
    <main className="p-0 m-0">
    <HeroSlider hero={pageData?.banner_slides}/>
    <CategoryCards2 bannerblocks={pageData?.banner_blocks}/>
    <TopCategory quickCategories={pageData?.quickCategories}/>
    <Offers Offers={pageData?.coupons}/>
    <CollectionsRenderer collections={pageData?.collections}/>
    <AIShowcase showcase={pageData?.aiShowcase}/>
    <TrustBadges badges={pageData?.trustBadges}/> 
    </main>
    </>
  );
}