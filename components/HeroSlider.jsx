"use client";

export default function HeroSlider() {
  return (
    <div className="w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100 p-4 py-5 lg:py-15">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="text-pink-700 font-bold text-4xl">
          <p>NYKAA FASHION</p>
          <p className="text-pink-500 lg:text-6xl text-2xl">HOT PINK SALE</p>
          <p className="text-yellow-500 lg:text-xl text-2xl">Up to 80% OFF</p>
          <p className="text-sm mt-2">18<sup>th</sup> - 27<sup>th</sup> JULY</p>
        </div>
        
      </div>
    </div>

  );
}
