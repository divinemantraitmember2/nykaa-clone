"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CategoryCards2({bannerblocks}) {
  return (
    <section className="relative">
      <div className="grid md:grid-cols-3 gap-3 px-2 lg:px-4 max-w-7xl mx-auto mb-2 lg:mb-5">
        { bannerblocks && bannerblocks.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="relative h-90 lg:h-100 rounded-2xl overflow-hidden group shadow-sm"
          >
            {/* Background Image */}
            <img
              src={`${cat.image}?tr=w-800,h-600`}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-lg md:text-2xl font-bold drop-shadow">
                {cat.title}
              </div>
              {cat.subtitle && (
                <div className="opacity-90 text-xs md:text-sm">{cat.subtitle}</div>
              )}
              <button className="inline-flex items-center justify-center gap-2 text-sm font-medium shadow h-9 px-4 py-2 mt-3 bg-white text-black hover:bg-white/90 rounded-xl">
                {cat.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
