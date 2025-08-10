"use client";
import { footerData } from "../data/footerData";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="bg-[#faf4ec] text-[#cb3f61] mt-14">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Mobile View: Accordion */}
        {isMobile ? (
          <div className="space-y-4">
            {footerData.map((section, i) => (
              <Disclosure key={i}>
                {({ open }) => (
                  <div className=" pb-1">
                    <DisclosureButton className="flex justify-between text-pink-700 w-full py-2 text-md font-bold">
                      {section.title}
                      <ChevronDownIcon
                        className={`w-5 h-5 transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul className="pl-2 text-md font-medium space-y-2 mt-2">
                        {section.links.map((link, j) => (
                          <li key={j}>
                            <a href="#" className="hover:underline">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        ) : (
          // Desktop View: Grid
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm font-medium">
            {footerData.map((section, i) => (
              <div key={i+1111}>
                <h3 className="font-extrabold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="" className="hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-700 text-center text-xs py-4 px-6 select-none">
        © 2024 Pondric E-Retail Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
