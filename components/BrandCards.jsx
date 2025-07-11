"use client";
import Image from "next/image";
import { brandCards } from "../data/brandData";
import ResponsiveBanner from "@/components/ResponsiveBanner";

export default function BrandCards() {
  return (
    <section>
        

  <ResponsiveBanner
     imageUrl="https://images-static.nykaa.com/uploads/f59b09c9-9483-461a-81bd-f96b7eacb834.jpg?tr=cm-pad_resize,w-1800"
    altText="Nykaa barand"
    heightClasses="h-[180px] sm:h-[180px] md:h-[200px] lg:h-[200px]"
  />              
                      
    
    <div className="px-4 md:px-10 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brandCards.map((card) => (
          <div
  key={card.id}
  className="overflow-hidden shadow-sm hover:shadow-md transition bg-white rounded-tl-4xl"
>
  <div className="relative w-full h-40 sm:h-48 md:h-52">
    <Image
      src={card.image}
      alt={card.brand}
      fill
      className="object-cover"
    />
  </div>
</div>

        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button className="bg-pink-600 hover:bg-pink-700 text-white text-sm md:text-base font-semibold px-6 py-2 rounded-full">
          Explore All Brands
        </button>
      </div>
    </div>
    </section>
  );
}
