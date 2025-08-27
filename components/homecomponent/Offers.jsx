"use client";

import { Sparkles } from "lucide-react";

export default function Offers({Offers}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="grid md:grid-cols-2 gap-4">
        { Offers && Offers.map((offer) => (
          <div
            key={offer.id}
            className="text-card-foreground shadow-sm rounded-2xl  bg-gradient-to-br from-zinc-50 to-white"
          >
            {/* Card Header */}
            <div className="flex flex-col space-y-1.5 p-6 pb-2">
              <div className="font-semibold tracking-tight flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5" />
                {offer.title}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 pt-0">
              <div className="text-sm opacity-80">{offer.desc}</div>
              <div className="mt-2 text-xs font-mono bg-black text-white inline-block px-3 py-1 rounded-lg">
                Use code: {offer.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
