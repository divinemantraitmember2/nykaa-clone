"use client";

import React from "react";

export default function ProductList() {
  return (
    <div className="webstories-items">
      <div className="stories-items">
        <div className="icon-of-webstories">
          <span className="webstories-icon"></span>
        </div>
        <a
          target="_blank"
          title="Nag Panchami 2025: Date, Significance, and Rituals"
          href="/webstories/view/nag-panchami-date-significance-and-rituals"
        >
          <img
            alt="Nag Panchami 2025: Date, Significance, and Rituals"
            title="Nag Panchami 2025: Date, Significance, and Rituals"
            src="https://cdn.triptotemples.com/webstory/slide-1-6888c34475c8aeabbded01b8-95571143.jpg?tr=w-640,h-853,f-webp"
          />
          <ul className="story-item-count">
            {[...Array(8)].map((_, i) => (
              <li key={i}></li>
            ))}
          </ul>
          <div className="stories-items-titles">
            <h4>Nag Panchami 2025: Date, Significance, and Rituals</h4>
          </div>
        </a>
      </div>
    </div>
  );
}
