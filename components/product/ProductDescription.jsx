"use client";
import { useState } from "react";

export default function ProductDescription() {
  const [showMore, setShowMore] = useState(false);

  const productDescription2 = {
    title:
      "Herbal Essences Argan Oil Shampoo & Conditioner For Frizz - No Parabens, No Colourants Contains:",
    short: `Explore the entire range of <span class='text-pink-600 underline cursor-pointer'>Hair Combos</span> available on Pondric. Shop more <span class='text-pink-600 underline cursor-pointer'>Herbal Essences</span> products here. You can browse through the complete world of <span class='text-pink-600 underline cursor-pointer'>Herbal Essences Hair Combos</span>. <span class='text-red-600 font-medium'>Herbal Essences Argan Oil Shampoo For Frizz - No Colourants: (MRP: 659.00/-) | Quantity: 1 | Expiry Date: 15 June 2027</span>`,
    long: `This shampoo & conditioner combo is infused with real argan oil of Morocco to help repair damage, tame frizz, and restore shine. It contains no parabens, no dyes, and is color-safe. Ideal for dry, damaged, or frizzy hair.`,
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Section (Description) */}
        <div className="w-full lg:w-[70%] ">
        <div className="w-full bg-white p-3 mb-3 lg:mb-5 ">
          <h2 className="text-xl font-semibold mb-3">Product Description</h2>

          <h3 className="font-semibold text-base text-gray-800 mb-3">
            {productDescription2.title}
          </h3>

          <div
            className="leading-relaxed text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: productDescription2.short }}
          />

          {showMore && (
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              {productDescription2.long}
            </p>
          )}

          <div className="mt-4 text-center py-2">
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-pink-600 w-full font-semibold text-sm hover:underline"
            >
              {showMore ? "Read Less ▲" : "Read More ▼"}
            </button>
          </div>
        </div>

            <div className=" mb-3 lg:mb-5">
                <h3 className="text-xl font-semibold mb-3">Customers also Viewed</h3>
                  <div className="w-full bg-white p-3  ">
           
                 </div>
            </div>
      

        <div className=" mb-3 lg:mb-5">
        <h3 className="text-xl font-semibold mb-3">Product Details</h3>
        <div className="w-full bg-white p-3 ">
        </div>
        </div>


        </div>

        {/* Right Section (optional - e.g., image, ad, offers) */}
        <div className="w-full lg:w-[30%] bg-white p-3 sticky top-24 self-start">
          {/* You can place image, offer box, etc. here */}
          <div className="p-4 ">
            <p className="text-gray-700 text-sm">Extra content here</p>
            <p className="text-xs text-gray-400 mt-1">
              (Offers, banners, etc.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
