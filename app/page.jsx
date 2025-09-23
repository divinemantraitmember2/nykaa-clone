import HeroSlider from "../components/HeroSlider";
import TopCategory from "../components/homecomponent/TopCategory";
import Offers from "../components/homecomponent/Offers";
import CollectionsRenderer from "../components/homecomponent/CollectionsRenderer";
import AIShowcase from "../components/homecomponent/AIShowcase";
import TrustBadges from "../components/homecomponent/TrustBadges";
import CategoryCards2 from "../components/homecomponent/CategoryCards2";

export const revalidate = 60;

 export default async function Home() {

  let pageData = null;

  try {
    const res = await fetch(`https://api.pondric.com/api/v1/home`, {
      method: "GET",
      next: { revalidate: 60 }, // cache for 60 sec
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.code === 200) {
        pageData = data?.data;
      }
    } else {
      console.error("Failed to fetch home page details");
    }
  } catch (error) {
    console.error("Error fetching home page:", error);
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