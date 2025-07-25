 "use client";

export default function CategoryCard({ image, label }) {
  return (
    <div className="flex flex-col items-center mx-2 ">
      <img src={image} alt={label} className="w-20 h-20 object-cover rounded-full border-2 border-pink-300" />
      <p className="text-sm font-semibold text-pink-600 mt-2">{label}</p>
    </div>
  );
}
