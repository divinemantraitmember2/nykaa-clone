// components/ResponsiveBanner.jsx
"use client";

import Image from "next/image";

export default function ResponsiveBanner({ imageUrl, altText, heightClasses }) {
  const defaultHeights = "h-[180px] sm:h-[180px] md:h-[200px] lg:h-[200px]";
  return (
    <div className={`relative w-full ${heightClasses || defaultHeights} rounded-lg overflow-hidden`}>
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
