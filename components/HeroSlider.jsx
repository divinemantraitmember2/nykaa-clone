"use client";

export default function HeroSlider() {
  return (
    <div className="w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100 px-2 py-10 lg:py-15">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="text-pink-700 font-bold text-4xl">
          <p>PONDRIC FASHION</p>
          <p className="text-pink-500 lg:text-6xl text-2xl">HOT PINK SALE</p>
          <p className="text-yellow-500 lg:text-xl text-2xl">Up to 80% OFF</p>
          <p className="text-sm mt-2">1<sup>th</sup> - 30<sup>th</sup> AUGUST</p>
        </div>
        
      </div>
    </div>

  );
}
