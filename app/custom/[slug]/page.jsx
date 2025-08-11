import TermsNav from "../../../components/pages/TermsNav";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // Always SSR

const termsData = {
  conditions: `
1. Your Agreement
This website www.pondric.com and/or the pondric App...
  `,
  "tnc-for-ai-tools": `
Terms & Conditions for AI Tools:
1. Usage Restrictions...
2. Data Privacy...
  `,
};

export default async function TermsPage({ params }) {
  // Ensure params is resolved
  if (typeof params?.then === "function") {
    params = await params;
  }

  const { slug } = params || {};

  if (!slug) notFound();

  const content = termsData[slug];
  if (!content) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {slug === "conditions"
                  ? "General Terms & Conditions"
                  : "T&C for AI Tools"}
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
