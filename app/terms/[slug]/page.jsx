import TermsNav from "../../../components/pages/TermsNav";
import  {GetPagesDetails}  from "../../../utils/api/serverApi";
import NotFound from "../../not-found";

export const dynamic = "force-dynamic"; // Always SSR

export default async function TermsPage({ params }) {
  if (typeof params?.then === "function") {
    params = await params;
  }

  const { slug } = params || {};

  if (!slug) <NotFound/>;

 console.log("slug",slug)
  let pageData = null;
  
    try {
      const response = await GetPagesDetails(`${slug}`);
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
    <main className="min-h-screen bg-gray-50">
    <section className="relative w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-gray-900">
      {slug}
    </p>
    <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl">
      {slug === "terms-and-conditions"
        ? "Read our terms carefully to understand your rights and responsibilities."
        : "Learn how we handle your personal data and privacy protection."}
    </p>
  </div>
</section>


      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <TermsNav />
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-9">
            <div className="bg-white  shadow-lg border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl">
               <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: pageData.content }} 
        />
        
             
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
