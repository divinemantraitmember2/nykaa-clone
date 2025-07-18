// components/Footer.jsx
"use client";
import { footerData } from "../data/footerData";

export default function Footer() {
  return (
    <footer className="  text-[#cb3f61] mt-14 bg-[#faf4ec]" >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm font-medium">
        {footerData.map((section, i) => (
          <div key={i}>
            <h3 className="font-extrabold  mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 text-center text-xs py-4 px-6  select-none">
        © 2024 Pondric E-Retail Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
