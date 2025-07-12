"use client";
import Image from "next/image";
import {  ExclusiveData } from "../data/aesturaData";

export default function Exclusive() {
  return (
    <div className="w-full px-6 md:px-8  mb-5">
    <div className="w-full">
  <img
    src="https://images-static.nykaa.com/uploads/e5dd62a8-70da-4bbc-8187-86d6653d272e.jpg?tr=cm-pad_resize,w-1800"
    alt="Banner"
    height={"200px"}
    width={"1800px"}
    className="w-full object-cover rounded-lg"
  />

  <div className="relative w-full h-[250px] md:h-[300px]">
  <video
    poster="https://images-static.nykaa.com/uploads/aa2c8ea1-38d0-49e7-bb45-10e8f18d3171.jpg?tr=cm-pad_resize,w-600"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover rounded-lg"
  >
    <source
      src="https://display-network-vds-media.nykaa.com/c2048e0e-2cc2-44da-877f-9e056260aa4e"
      type="video/mp4"
    />
    <img
      alt="Nykaa Cosmetics"
      src="https://images-static.nykaa.com/uploads/aa2c8ea1-38d0-49e7-bb45-10e8f18d3171.jpg?tr=cm-pad_resize,w-600"
      loading="eager"
      className="w-full h-full object-cover"
    />
    Your browser does not support the video tag.
  </video>
</div>

</div>
    <div className="py-3">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
  {ExclusiveData.map((feature) => (
    <div
      key={feature.id}
      className="rounded-xl overflow-hidden bg-white shadow"
    >
      <div className="relative w-full h-55">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover"
        />
        <div className="absolute left-1 bottom-0 bg-white bg-opacity-80 text-pink-700 px-3 py-1 rounded font-semibold text-sm shadow">
          {feature.title}
        </div>
      </div>
    </div>
  ))}
</div>
      </div>

    </div>
  );
}
