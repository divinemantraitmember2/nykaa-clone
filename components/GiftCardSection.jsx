"use client";
import Image from "next/image";

const giftCardData = [
  {
    id: 1,
    image:
      "https://images-static.nykaa.com/uploads/0d5dc5ca-889f-46e5-a3b0-3b90a4596c0b.jpg?tr=cm-pad_resize,w-900",
    alt: "The Gift Store",
  },
  {
    id: 2,
    image:
      "https://images-static.nykaa.com/uploads/28bda27a-9b54-4f09-8f8c-e1427b5e5959.jpg?tr=cm-pad_resize,w-900",
    alt: "Gift Cards",
  },
];

export default function GiftCardSection() {
  return (
    <section className="w-full">
      {/* Banner */}
      <div className="w-full">
        <Image
          src="https://images-static.nykaa.com/uploads/24075481-68dc-4e6a-8c5b-696b8cc76b87.jpg?tr=cm-pad_resize,w-1800"
          alt="Nykaa Banner"
          width={1800}
          height={400}
          className="w-full h-auto rounded-lg object-cover"
          priority
        />
      </div>

      {/* Gift Cards */}
      <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {giftCardData.map((card) => (
          <div
            key={card.id}
            className="relative w-full aspect-[3.8/1] rounded-xl overflow-hidden shadow-md"
          >
            <Image
              src={card.image}
              alt={card.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>
      </div>

    </section>
  );
}
