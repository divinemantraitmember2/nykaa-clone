"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../slices/userSlice";
import { FaShoppingBag, FaBars, FaSearch,FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import MobileDrawer from "../components/MobileDrawer";

export default function Navbar({ categories, onHoverCategory, onLeaveCategory }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items.length);
  const { data: session } = useSession();
  const userImage = session?.user?.image || "/images/no-profile.jpeg";

   

  return (
    <div className="w-full bg-[#faf4ec] shadow relative">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-1 px-4 md:hidden">
        <Link href="/">
          <div className="w-[60px] h-[60px] relative">
            <Image src="/images/logo.jpeg" alt="Logo" width={60} height={60} className="object-contain" />
          </div>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaBars className="text-xl" />
        </button>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <div className="flex items-center bg-white px-4 py-3 border border-pink-700 rounded-2xl">
          <FaSearch className="text-pink-600 mr-2 text-sm" />
          <input type="text" placeholder="Explore our Beauty Collection" className="bg-transparent w-full text-sm outline-none text-gray-600" />
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={categories} />
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <div className="w-[70px] h-[70px] relative">
              <Image src="/images/logo.jpeg" alt="Logo" width={70} height={70} className="object-contain" />
            </div>
          </Link>

          <nav className="flex space-x-6 text-md font-semibold text-gray-700">
            {categories.map((link, i) => (
            
              <Link key={i+40} href={`/${link.slug}`} className="mx-8">
              <span
                onMouseEnter={() => onHoverCategory(link)}
                // onMouseLeave={onLeaveCategory}
                className="hover:text-pink-600 cursor-pointer"
              >
                {link.label}
              </span>
              </Link>
             
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Search on Pondric" className="border px-3 py-2 mx-8 bg-white rounded text-sm w-80" />

          {session?.user ? (
            <Link href="/profile">
              <Image src={userImage} alt="User" width={32} height={32} className="rounded-full mx-5 cursor-pointer" />
            </Link>
          ) : (
            <button onClick={() => dispatch(openLoginModal())} className="bg-[#cb3f61] mx-5 text-white px-4 py-2 text-sm rounded">
              Sign in
            </button>
          )}

          <Link href="/profile" className="relative mx-5">
             <FaHeart className="text-xl text-pink-600" />
              </Link>

          <Link href="/cart" className="relative mx-5">
            <FaShoppingBag className="text-xl text-pink-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}