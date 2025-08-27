"use client";

import { footerData } from "../data/footerData";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-6 border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 py-5">

        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {/* Brand Info */}
          <div>
            <div className="font-extrabold text-xl">Pondric</div>
            <div className="text-sm opacity-70 mt-2">
              Everyday fashion for India. Ethnic to Western, curated for comfort & style.
            </div>
          </div>

          {/* Links Accordion */}
          <div className="space-y-2">
            {footerData.map((section, i) => (
              <Disclosure key={i}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between font-extrabold text-xl  w-full py-2 text-md font-bold">
                      {section.title}
                      <ChevronDownIcon
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      <ul className="pl-2 text-md font-medium space-y-2 mt-1">
                        {section.links.map((link, j) => (
                          <li key={j}>
                            <Link href={`/${link.slug}`} className="hover:underline">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <div className="font-semibold mb-2">Newsletter</div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                placeholder="Enter your email"
                className="flex-1 rounded-xl border px-3 py-2"
              />
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 py-10">
          {/* Brand Info */}
          <div>
            <div className="font-extrabold text-xl">Pondric</div>
            <div className="text-sm opacity-70 mt-2">
              Everyday fashion for India. Ethnic to Western, curated for comfort & style.
            </div>
          </div>

          {/* Links & Social */}
          <div className="grid grid-cols-2 gap-4">
            {footerData.map((section, i) => (
              <div key={i}>
                <div className="font-semibold mb-2">{section.title}</div>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link href={`/${link.slug}`} className="hover:opacity-80">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <div className="font-semibold mb-2">Newsletter</div>
            <div className="flex gap-2">
              <input
                placeholder="Enter your email"
                className="flex-1 rounded-xl border px-3 py-2"
              />
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#e2e8f0] text-center text-xs py-4 px-6 select-none">
        © 2025 Pondric E-Retail Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
