// components/Footer.jsx
"use client";
import { footerData } from "@/data/footerData";

export default function Footer() {
  return (
    <footer className="  text-white mt-14"  style={{backgroundColor:"#8c8d94"}}>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm font-medium">
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
        © 2024 Nykaa E-Retail Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
