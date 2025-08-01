"use client";
import Image from "next/image";

const items = [
  {
    src: "https://images-static.nykaa.com/nykdesignstudio-images/pub/media/wysiwyg/COD.png",
    alt: "Cod available",
    title: "COD",
    subtitle: "available",
  },
  {
    src: "https://images-static.nykaa.com/nykdesignstudio-images/pub/media/wysiwyg/Return.png",
    alt: "Return and exchange",
    title: "7-day return &",
    subtitle: "size exchange",
  },
  {
    src: "https://images-static.nykaa.com/nykdesignstudio-images/pub/media/wysiwyg/Free_Delivery.png",
    alt: "Free delivery",
    title: "Usually ships in",
    subtitle: "2 days",
  },
];

export default function InfoStrip() {
  return (
    <div className="w-full bg-white py-3 px-3 sm:px-4 md:px-6">
      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 max-w-6xl mx-auto scroll-smooth snap-x snap-mandatory sm:overflow-visible">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[230px] sm:min-w-0 shrink-0 snap-start group bg-white p-4 flex flex-col items-center text-center border border-gray-200 rounded-lg transition hover:shadow-md hover:-translate-y-1 duration-300"
          >
            <div className="mb-4">
              <Image
                src={item.src}
                alt={item.alt}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800">
              {item.title}{" "}
              <span className="font-bold text-gray-900">{item.subtitle}</span>
            </h3>

            <button className="mt-4 text-pink-600 border border-pink-600 px-4 py-1 rounded-full text-sm hover:bg-pink-600 hover:text-white transition-colors duration-300">
              Know More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
