import TermsNav from "../../../components/pages/TermsNav";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // Always SSR

const termsData = {
  conditions: `
1. Your Agreement
This website www.pondric.com and/or the pondric App...
  `,
  "privacy-policy": `
Terms & Conditions for AI Tools:
1. Usage Restrictions...
2. Data Privacy...
  `,
};

export default async function TermsPage({ params }) {
  if (typeof params?.then === "function") {
    params = await params;
  }

  const { slug } = params || {};

  if (!slug) notFound();

  const content = termsData[slug];
  if (!content) notFound();

  const pageTitle =
    slug === "conditions" ? "Terms & Conditions" : "Privacy Policy";

  return (
    <main className="min-h-screen bg-gray-50">
    <section className="relative w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-gray-900">
      {pageTitle}
    </p>
    <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl">
      {slug === "conditions"
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
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {pageTitle}
              </h1>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {content.split("\n").map((line, idx) => (
                  <p key={idx} className="mb-3">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
