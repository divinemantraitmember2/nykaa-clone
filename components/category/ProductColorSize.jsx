
"use client";
import { useState } from "react";
export default function ProductColorSize({product}){
  console.log("product",product)
    const [showAllColors, setShowAllColors] = useState(false);
      const [showAllSizes, setShowAllSizes] = useState(false);
      const allColors = product?.variants?.map((v) => v.color)?.filter(Boolean) || [];
      const uniqueColors = [...new Set(allColors)];
      const visibleColors = showAllColors ? uniqueColors : uniqueColors.slice(0, 5);
      const extraColors = uniqueColors.length - visibleColors.length;
    
      const allSizes =product?.variants?.flatMap((v) => (v?.size_stocks || []).map((s) => s?.size)) || [];
      const uniqueSizes = [...new Set(allSizes.filter(Boolean))];
      const visibleSizes = showAllSizes ? uniqueSizes : uniqueSizes.slice(0, 4);
      const extraSizes = uniqueSizes.length - visibleSizes.length;
    
    return(
        <>
         {uniqueColors.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      {visibleColors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color?.toLowerCase() }}
                        ></div>
                      ))}
                      {extraColors > 0 && !showAllColors && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowAllColors(true);
                          }}
                          className="text-[10px] text-gray-500 font-medium hover:underline"
                        >
                          +{extraColors} more
                        </button>
                      )}
                    </div>
                  )}
        
                  {uniqueSizes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {visibleSizes.map((size, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 border border-gray-300 rounded text-gray-700 bg-gray-100"
                        >
                          {size}
                        </span>
                      ))}
                      {extraSizes > 0 && !showAllSizes && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowAllSizes(true);
                          }}
                          className="text-[10px] text-gray-500 font-medium hover:underline"
                        >
                          +{extraSizes} more
                        </button>
                      )}
                    </div>
                  )}
        
        
        </>
    )

}