
import  {GetPagesDetails}  from "../../utils/api/serverApi";
import NotFound from "../not-found";


export default async function ShipingPage() {

let pageData = null;

  try {
    const response = await GetPagesDetails("shipping-policy");
    // console.log("response..",response)
    if (response?.status === 200 && response?.data?.code === 200) {
      pageData = response.data.data;
      
    } else {
      return <NotFound />;
    }
  } catch (error) {
    console.error("Error fetching About Us page:", error);
    return <NotFound />;
  }

  if (!pageData) return <NotFound />;

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div
          className="shipping-policy max-w-none"
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
        
      </section>
    
    </main>
  );
}
