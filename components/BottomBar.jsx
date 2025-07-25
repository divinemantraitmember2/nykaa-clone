"use client";
import { useEffect, useState } from "react";

export default function BottomBar({ categories = [], loading = false }) {
  const [hovered, setHovered] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const [getCategory, setGetCategory] = useState([]);
  const [megaMenuData, setMegaMenuData] = useState([]); // <-- You missed this
  const [activeLabel, setActiveLabel] = useState("");

  useEffect(() => {
    setGetCategory(categories);

    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 15) return;

      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, [categories]);

  return (
    <section>
      <div
        className={`sticky top-[65px] z-20 hidden md:block transition-transform duration-300 ${
          scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Top Link Bar */}
        <div
          className="bg-white shadow overflow-x-auto whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-700"
        >
          {getCategory?.[0]?.children?.map((secondChild, index) => (
  <span
    key={index}
    className="inline-block mr-6 hover:text-pink-600 cursor-pointer relative"
    onMouseEnter={() => {
      setHovered(true);
      setActiveLabel(secondChild.label);
      setMegaMenuData(secondChild.children || []);
    }}
    onMouseLeave={() => {
      setHovered(false);
    }}
  >
    <a href={`/${secondChild.slug}`} className="hover:text-pink-600">
      {secondChild.label}
    </a>
  </span>
))}

        </div>

        {/* Mega Menu */}
        {hovered && megaMenuData.length > 0 && (
          <div
            className="absolute left-0 top-full bg-white w-full shadow-xl border-t border-gray-100 py-6 px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-left"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {megaMenuData.map((item, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-sm text-gray-900 mb-3">{item.label}</h4>
                {item.children && (
                  <ul className="space-y-2 text-sm text-gray-600">
                    {item.children.map((subItem, idy) => (
                      <li key={idy}>
                        <a
                          href={`/${subItem.slug}`}
                          className="hover:text-pink-600"
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
