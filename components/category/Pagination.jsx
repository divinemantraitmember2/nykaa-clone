// components/common/Pagination.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ total, limit }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
