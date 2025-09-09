"use client";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, User, Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal, openUserCartDrawar } from "../slices/userSlice";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Import your MobileDrawer
import MobileDrawer from "./MobileDrawer"; // <-- path adjust karna

export default function MobileFooter({categories}) {

  const pathname = usePathname();
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items.length);
  const { data: session } = useSession();
  const userImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: <Home size={20} /> },
    { label: "Cart", href: "/cart", icon: <ShoppingCart size={18} />, showBadge: true },
    {
      label: "Account",
      href: session?.user ? "/profile" : "/profile",
      icon: session?.user ? (
        <Image
          src={userImage || "/images/no-profile.jpeg"}
          alt="User"
          width={24}
          height={24}
          className="rounded-full object-cover"
        />
      ) : (
        <User size={20} />
      ),
      onClick: () => {
        if (!session?.user) {
          dispatch(openLoginModal());
        }
      },
    },
    {
      label: "Menu",
      href: "#",
      icon: <Menu size={20} />,
      onClick: () => setIsMobileMenuOpen(true),
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#fff] md:hidden shadow-2xl shadow-pink-300 overflow-hidden border-t border-[#e2e8f0] rounded-t-2xl">
        <ul className="flex justify-around items-center h-18 text-black ">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.label}>
                {item.label === "Cart" ? (
                  <button
                    onClick={() => dispatch(openUserCartDrawar())}
                    className="flex flex-col items-center justify-center"
                  >
                    <div
                      className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-[#e2e8f0] transition-all duration-300 ${
                        isActive ? "bg-pink-100 text-pink-600" : "text-gray-600 bg-white"
                      }`}
                    >
                      {item.icon}
                      {item.showBadge && cartCount > 0 && (
                        <span className="absolute top-1 -right-2 bg-pink-600 text-white text-[12px] px-[6px] py-[3px] rounded-full leading-none">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[12px] mt-1 font-bold ${
                        isActive ? "text-pink-600" : "text-black"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex flex-col items-center justify-center"
                  >
                    <div
                      className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-[#e2e8f0] transition-all duration-300 ${
                        isActive ? "bg-pink-100 text-pink-600" : "text-gray-600 bg-white"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-[12px] font-bold ${
                        isActive ? "text-pink-600" : "text-black"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Drawer open hoga menu click par */}
      {isMobileMenuOpen && (
        <MobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          links={categories.data}
        />
      )}
    </>
  );
}
