"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { navbarLinks } from "../data/navbarLinks";
import { FaShoppingBag, FaUser, FaBars, FaSearch } from "react-icons/fa";
import Link from "next/link"
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 👇 Get cart count from Redux
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <div className="w-full bg-white shadow-md">
      {/* Top Row - Logo + Icons (Mobile) */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center space-x-3">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FaBars className="text-xl" />
          </button>
          <div className="text-2xl font-black text-pink-700">NYKAA</div>
        </div>
        <div className="flex items-center space-x-4 relative">
          {/* Mobile Cart Icon */}
          <div className="relative">
            <FaShoppingBag className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <FaUser className="text-xl" />
        </div>
      </div>

      {/* Search Input (Mobile) */}
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

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-black text-pink-600 cursor-pointer">
          <Link href="/"> NYKAA</Link>
          </div>
          <nav className="flex space-x-6 text-md font-semibold text-gray-700">
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
            className="border px-3 py-2 rounded text-sm w-56"
          />
          <button className="bg-pink-600 text-white px-4 py-2 text-sm rounded-full">
            Sign in
          </button>

          {/* Desktop Cart Icon */}
          <div className="relative">
           <Link href="/cart" className="relative">
      <div className="relative cursor-pointer">
        <FaShoppingBag className="text-xl text-pink-600" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
