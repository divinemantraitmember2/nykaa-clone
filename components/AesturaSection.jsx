"use client";
import Image from "next/image";
import { aesturaBanner, aesturaFeatures } from "../data/aesturaData";

export default function AesturaSection() {
  return (
    <div className="w-full px-4 md:px-8 py-5">
    <div className="w-full">
        <img
   src="https://images-static.nykaa.com/uploads/f3c3e9f7-ea49-4176-9640-c65e279339e5.jpg?tr=cm-pad_resize,w-1800"
  alt="Banner"
    height={"200px"}
    width={"1800px"}
    className="w-full object-cover rounded-lg"
  />

  <div className="relative w-full h-[300px] md:h-[310px] " >
    <Image
      src={aesturaBanner.productImage}
      alt="Aestura product"
      fill
      className="object-contain"
    />
  </div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {aesturaFeatures.map((feature) => (
    <div key={feature.id} className="rounded-xl overflow-hidden bg-white shadow">
      <div className="relative w-full h-50">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover"
        />
        <div className="absolute left-1 bottom-1 bg-white bg-opacity-80 text-pink-700 px-3 py-1 rounded font-semibold text-sm shadow">
          {feature.title}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
