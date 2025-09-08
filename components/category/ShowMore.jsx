"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ShowMore({ total, limit }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(total / limit);

  const handleShowMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage + 1);
    router.push(`?${params.toString()}`, { scroll: false }); // scroll: false -> neeche hi dikhe
  };

  // last page pe button hide ho jaye
  if (currentPage >= totalPages) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handleShowMore}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Show More
      </button>
    </div>
  );
}
