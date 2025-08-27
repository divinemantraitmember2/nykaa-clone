"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSlider({hero}) {
  return (
    <section className="relative">
      <div className="grid md:grid-cols-3 gap-3 p-3 max-w-7xl mx-auto">
        {hero && hero.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden group shadow-sm"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h5 className="text-lg md:text-2xl font-bold drop-shadow">
                {item.title}
              </h5>
              <p className="opacity-90 text-xs md:text-sm">{item.subtitle}</p>

              <button className="inline-flex items-center justify-center gap-2 text-sm font-medium shadow h-9 px-4 py-2 mt-3 bg-white text-black hover:bg-white/90 rounded-xl">
                {item.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
