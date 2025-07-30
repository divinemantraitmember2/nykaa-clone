"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";

export default function Header({ categories }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <header className="sticky top-0 z-50 bg-[#faf4ec] border-b border-pink-700">
      {/* <Navbar 
        categories={categories.data}
        onHoverCategory={(category) => setHoveredCategory([category])}
        onLeaveCategory={() => setHoveredCategory(null)}
      />
      {hoveredCategory && (
      <div className={`  relative group ${hoveredCategory ? "block" : "hidden"}`}>
  <BottomBar
    category={hoveredCategory}
    onMouseEnter={() => setHoveredCategory(hoveredCategory)}
    onMouseLeave={() => setHoveredCategory(null)}
  />
</div>
       
      )} */}
    </header>
  );
}