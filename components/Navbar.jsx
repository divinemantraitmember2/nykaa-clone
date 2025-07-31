"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../slices/userSlice";
import { FaShoppingBag, FaBars, FaSearch,FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";
import MobileDrawer from "../components/MobileDrawer";

export default function Navbar({ categories, onHoverCategory, onLeaveCategory }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items.length);
  const { data: session } = useSession();
  const userImage = session?.user?.image || "/images/no-profile.jpeg";

   

  return (
    <div className="w-full bg-[#fff] relative py-2">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-3 px-4 md:hidden">
        <Link href="/">
          <div className="">
              <Image src="https://ik.imagekit.io/pondric/logo/pondric-logo.png?tr=w-108,h-30,dpr-2,q-100,f-webp" alt="Logo" width={108} height={30} className="object-contain" />
            </div>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaBars className="text-xl" />
        </button>
      </div>

      <div className="px-4  md:hidden">
        <div className="flex items-center bg-white px-4 py-3  border border-pink-700 rounded">
          <FaSearch className="text-pink-600 mr-2 text-sm" />
          <input type="text" placeholder="Explore our Beauty Collection" className="bg-transparent w-full text-sm outline-none text-gray-600" />
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={categories} />
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6  ">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <div className="">
              <Image src="https://ik.imagekit.io/pondric/logo/pondric-logo.png?tr=w-108,h-30,dpr-2,q-100,f-webp" alt="Logo" width={108} height={30} className="object-contain" />
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
          <input type="text" placeholder="Search on Pondric" className="border-b border-pink-90 px-3 py-3 mx-8 bg-pink-100 text-sm w-80" />

          {session?.user ? (
            <Link href="/profile">
              <Image src={userImage} alt="User" width={32} height={32} className="rounded-full mx-5 cursor-pointer" />
            </Link>
          ) : (
            <button onClick={() => dispatch(openLoginModal())} className=" hover:text-pink-600 transition-colors duration-200">
             <User size={20} />
            </button>
          )}

          <Link href="/profile" className="relative mx-5  hover:text-pink-600 transition-colors duration-200">
             <FaHeart className="text-xl text-black-600" />
              </Link>

         <Link href="/cart" className="relative flex items-center gap-1 px-3 py-1 text-black hover:text-pink-600 transition-colors duration-200">
      <ShoppingCart size={20} />
      <span className="font-medium sm:inline ">Cart</span>

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {cartCount}
        </span>
      )}
    </Link>
        </div>
      </div>
    </div>
  );
}