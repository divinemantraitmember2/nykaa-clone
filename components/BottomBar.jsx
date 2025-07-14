"use client";
import { useEffect, useState } from "react";

export default function BottomBar() {
  const [hovered, setHovered] = useState(false);
   const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 15) return;

      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);
      
  

  const links = [
    { title: "Makeup", slug: "makeup" },
    { title: "Skin", slug: "skin" },
    { title: "Hair", slug: "hair" },
    { title: "Appliances", slug: "appliances" },
    { title: "Bath & Body", slug: "bath-and-body" },
    { title: "Natural", slug: "natural" },
    { title: "Mom & Baby", slug: "mom-and-baby" },
    { title: "Health & Wellness", slug: "health-and-wellness" },
    { title: "Men", slug: "men" },
    { title: "Fragrance", slug: "fragrance" },
    { title: "Lingerie & Accessories", slug: "lingerie-and-accessories" },
    { title: "OFFERS", slug: "offers" },
  ];

  const megaMenuData = [
    {
      heading: "Face",
      items: [
        { label: "Foundation", slug: "foundation" },
        { label: "Concealer", slug: "concealer" },
        { label: "Compact", slug: "compact" },
        { label: "BB & CC Cream", slug: "bb-and-cc-cream" },
      ],
    },
    {
      heading: "Eyes",
      items: [
        { label: "Eyeliner", slug: "eyeliner" },
        { label: "Mascara", slug: "mascara" },
        { label: "Eyeshadow", slug: "eyeshadow" },
      ],
    },
    {
      heading: "Lips",
      items: [
        { label: "Lipstick", slug: "lipstick" },
        { label: "Lip Gloss", slug: "lip-gloss" },
        { label: "Lip Crayon", slug: "lip-crayon" },
      ],
    },
    {
      heading: "Top Brands",
      items: [
        { label: "Huda Beauty", slug: "huda-beauty" },
        { label: "MAC", slug: "mac" },
        { label: "Maybelline", slug: "maybelline" },
      ],
    },
    {
      heading: "Trending",
      items: [
        { label: "Nude Lipstick", slug: "nude-lipstick" },
        { label: "Matte Lipstick", slug: "matte-lipstick" },
        { label: "Red Lipstick", slug: "red-lipstick" },
      ],
    },
  ];


  return (
    <section>
     <div
  className={`sticky top-[65px] z-20 hidden md:block transition-transform duration-300 ${
    scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
  }`}
>
        {/* Top Link Bar */}
        <div
          className="bg-white shadow overflow-x-auto whitespace-nowrap px-6 py-4  text-center text-sm font-medium text-gray-700"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {links.map((link, index) => (
            <a
              key={index}
              href={`/${link.slug}`}
              className="inline-block mr-6 hover:text-pink-600 cursor-pointer"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Mega Menu */}
        {hovered && (
          <div
            className="absolute left-0 top-full bg-white w-full shadow-xl border-t border-gray-100 py-6 px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-left"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {megaMenuData.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-sm text-gray-900 mb-3">
                  {section.heading}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {section.items.map((item, idy) => (
                    <li key={idy}>
                      <a href={`/${item.slug}`} className="hover:text-pink-600">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
