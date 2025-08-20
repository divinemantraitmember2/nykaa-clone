
import  {GetPagesDetails}  from "../../utils/api/serverApi";
import NotFound from "../not-found";


export default async function AboutPage() {

let pageData = null;

  try {
    const response = await GetPagesDetails("about-us");
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
      {/* Top Banner */}
      <section className="relative h-72 md:h-96 w-full">
        <img
          src="/images/about-banner.jpg" // replace with your image path
          alt="About Us Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          {/* <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            About Us
          </h1> */}
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl  mx-auto px-4 py-12 md:py-16 about-us">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: pageData.content }} // 'content' API ke data ka field
        />
        
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2">
          <div className="bg-white p-4 transition">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals and businesses with products and services 
              that enhance their daily lives, while maintaining our commitment 
              to quality, innovation, and sustainability.
            </p>
          </div>
          <div className="bg-white p-4  transition">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become a globally recognized brand known for our dedication to 
              customer satisfaction, continuous improvement, and making a positive 
              impact in the world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      

     {/* Call to Action */}
<section className="bg-gray-50 py-16">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
      Let’s Work Together
    </h2>
    <p className="mb-8 text-lg text-gray-600 leading-relaxed">
      Have a project in mind or want to know more about our work?  
      We’re always excited to collaborate and bring ideas to life.
    </p>

    <div className="flex justify-center gap-4">
      <a
        href="/contact-us"
        className="inline-block bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-pink-700 transition"
      >
        Contact Us
      </a>
      <a
        href="/about-us"
        className="inline-block border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
      >
        Learn More
      </a>
    </div>
  </div>
</section>


    </main>
  );
}
