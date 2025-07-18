"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navbarLinks } from "../data/navbarLinks";
import { openLoginModal } from "../slices/userSlice";
import { FaShoppingBag, FaUser, FaBars, FaSearch } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items.length);
  const { data: session, status } = useSession();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  const userImage = session?.user?.image || "/images/no-profile.jpeg";

  return (
    <div className={`w-full bg-white ${scrollDir === "down" ? "shadow" : ""}`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-1 px-4 md:hidden ">
        <div className="flex items-center space-x-3">
          
          <div className="text-3xl font-black text-pink-600 cursor-pointer">
            <Link href="/">
              <div className="w-[60px] h-[60px] relative">
                <Image
                  src="/images/logo.jpeg"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-8 relative">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FaBars className="text-xl" />
          </button>
          {/* <Link href="/cart" className="relative">
            <div className="relative">
              <FaShoppingBag className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link> */}

          {/* {session?.user ? (
            <Link href="/profile">
              <Image
                src={userImage}
                alt="User"
                width={30}
                height={30}
                className="rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <FaUser className="text-xl" onClick={() => dispatch(openLoginModal())} />
          )} */}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-full">
          <FaSearch className="text-pink-600 mr-2 text-sm" />
          <input
            type="text"
            placeholder="Explore our Beauty Collection"
            className="bg-transparent w-full text-sm outline-none text-gray-600"
          />
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
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
      <div className="hidden md:flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-black text-pink-600 cursor-pointer">
            <Link href="/">
              <div className="w-[70px] h-[70px] relative">
                <Image
                  src="/images/logo.jpeg"
                  alt="Logo"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
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
            placeholder="Search on Pondric"
            className="border px-3 py-2 rounded text-sm w-56"
          />

          {session?.user ? (
            <Link href="/profile">
              <Image
                src={userImage}
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <button
              className="bg-[#cb3f61] text-white px-4 py-2 text-sm rounded"
              onClick={() => dispatch(openLoginModal())}
            >
              Sign in
            </button>
          )}

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
  );
}
