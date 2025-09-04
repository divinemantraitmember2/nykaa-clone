"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal,openUserCartDrawar } from "../slices/userSlice";
import { Heart,Search, Menu} from "lucide-react";
import Link from "next/link";
import {ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";
import MobileDrawer from "../components/MobileDrawer";

export default function Navbar({ categories, onHoverCategory, onLeaveCategory }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.countItems);
  const whishItems = useSelector((state) => state.cart.whishItems);
  const { data: session } = useSession();
  const userImage = session?.user?.image || "/images/no-profile.jpeg";

  // console.log("categories",categories)
  return (
    <div className="w-full bg-[#fff] relative lg:py-2">
      {/* Mobile Header */}
      <div className="hidden">
      <div className="flex items-center justify-between mb-3 px-4 md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="text-xl" />
        </button>
        
        <Link href="/">
          <div className="">
              <img src="https://ik.imagekit.io/pondric/logo/pondric-logo.png?tr=w-108,h-30,dpr-2,q-100,f-webp" alt="Logo" width={108} height={30} className="object-contain" />
            </div>
        </Link>
        
      </div>

      <div className="px-4  md:hidden">
        <div className="flex items-center bg-white px-4 py-2  border border-[#e2e8f0] rounded">
          <Search className="text-pink-600 mr-2 text-sm" />
          <input type="text" placeholder="Explore our Beauty Collection" className="bg-transparent w-full text-sm outline-none text-gray-600 " />
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={categories} />
      )}

</div>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6  ">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <div className="">
              <img src="https://ik.imagekit.io/pondric/logo/pondric-logo.png?tr=w-108,h-30,dpr-2,q-100,f-webp" alt="Logo" width={108} height={30} className="object-contain" />
            </div>
          </Link>

          <nav className="flex space-x-6 text-md font-semibold text-gray-700">
            {categories?.map((link, i) => (
            
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
         <input
  type="text"
  placeholder="Search on Pondric"
  className="border border-[#e2e8f0] rounded px-2 py-2 mx-8 bg-white-100 text-sm w-80 
             focus:border-[#e2e8f0] focus:outline-none"
/>
          {session?.user ? (
            <Link href="/profile">
              <img src={userImage} alt="User" width={32} height={32} className="rounded-full mx-5 cursor-pointer" />
            </Link>
          ) : (
            <button onClick={() => dispatch(openLoginModal())} className=" hover:text-pink-600 transition-colors duration-200">
             <User size={20} />
            </button>
          )}

  <Link
  href="/profile"
  className="relative mx-5 hover:text-pink-600 transition-colors duration-200"
>
  <Heart className="w-6 h-6 text-gray-800 group-hover:text-pink-600" />

{whishItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {whishItems}
        </span>
      )}

</Link>

        <button  onClick={() => dispatch(openUserCartDrawar())} className="relative flex mx-2 items-center gap-1 px-3 py-1 text-black hover:text-pink-600 transition-colors duration-200">
      <ShoppingCart size={20} />
      <span className="font-medium sm:inline ">Cart</span>

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {cartCount}
        </span>
      )}
    </button>
        </div>
      </div>
    </div>
  );
}