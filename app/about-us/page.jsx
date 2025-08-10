export default function AboutPage() {
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
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Who We Are
        </h2>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          Welcome to <span className="font-semibold text-pink-600">Our Company</span>, 
          where passion meets innovation. We specialize in delivering high-quality 
          products and services that bring value to our customers. Our mission is 
          simple – to provide excellence, inspire creativity, and build trust through 
          every interaction.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals and businesses with products and services 
              that enhance their daily lives, while maintaining our commitment 
              to quality, innovation, and sustainability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
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
      <section className="w-[80%] mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Meet Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            { name: "Alex Johnson", role: "Founder & CEO", img: "/team1.jpg" },
            { name: "Sophia Lee", role: "Marketing Head", img: "/team2.jpg" },
            { name: "Michael Smith", role: "Lead Developer", img: "/team3.jpg" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={member.img}
                // alt={member.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                <p className="text-pink-600 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Let’s Work Together
          </h2>
          <p className="mb-6 text-lg">
            Have a project in mind or want to know more about our work? We’re 
            always excited to collaborate.
          </p>
          <a
            href="/"
            className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
