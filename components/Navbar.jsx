"use client";
import { useState } from "react";
import { navbarLinks } from "../data/navbarLinks";
import { FaShoppingBag, FaUser, FaBars, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md">
      {/* Top Row - Logo + Icons */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center space-x-3">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FaBars className="text-xl" />
          </button>
          <div className="text-2xl font-black text-pink-700">NYKAA</div>
        </div>
        <div className="flex items-center space-x-4">
          <FaShoppingBag className="text-xl" />
          <FaUser className="text-xl" />
        </div>
      </div>

      {/* Search Input */}
      <div className="px-4 pb-3 md:hidden">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
          <FaSearch className="text-pink-600 mr-2 text-sm" />
          <input
            type="text"
            placeholder="Explore our Beauty Collection"
            className="bg-transparent w-full text-sm outline-none text-gray-600"
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-gray-700">
            {navbarLinks.map((link, i) => (
              <a key={i} href={link.href} className="hover:text-pink-600">
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      )}

      
      <div className="hidden md:flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-6">
          {/* <div className="text-3xl font-black text-pink-600 cursor-pointer">
            NYKAA
          </div> */}
          <nav className="flex space-x-6 text-sm font-semibold text-gray-700">
            {navbarLinks.map((link, i) => (
              <a key={i} href={link.href} className="hover:text-pink-600">
                {link.title}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search on Nykaa"
            className="border px-3 py-1 rounded text-sm w-56"
          />
          <button className="bg-pink-600 text-white px-4 py-1 text-sm rounded-full">
            Sign in
          </button>
          <FaShoppingBag className="text-xl text-pink-600" />
        </div>
      </div>
    </div>
  );
}
