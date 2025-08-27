"use client";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal,openUserCartDrawar } from "../slices/userSlice";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function MobileFooter() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items.length);
  const { data: session } = useSession();
  const userImage = session?.user?.image;

  const navItems = [
    { label: "Home", href: "/", icon: <Home size={20} /> },
    { label: "Cart", href: "/cart", icon: <ShoppingCart size={18} />, showBadge: true },
    {
      label: "Account",
      href: session?.user ? "/profile" : "#",
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
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#fff] md:hidden shadow-2xl shadow-pink-300 overflow-hidden border-t border-[#e2e8f0] rounded-t-2xl">
      <ul className="flex justify-around items-center h-15  text-black ">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
           <li key={item.href}>
  {item.href === "/cart" ? (
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
        {item.label === "Cart" && cartCount > 0 && (
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
    <Link
      href={item.href}
      onClick={item.onClick}
      className="flex flex-col items-center justify-center"
    >
      <div
        className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-[#e2e8f0] transition-all duration-300 ${
          isActive ? "bg-pink-100 text-pink-600" : "text-gray-600 bg-white"
        }`}
      >
        {item.icon}
        {item.label === "Cart" && cartCount > 0 && (
          <span className="absolute top-1 -right-2 bg-pink-600 text-white text-[12px] px-[6px] py-[4px] rounded-full leading-none">
            {cartCount}
          </span>
        )}
      </div>
      <span
        className={`text-[12px]  font-bold ${
          isActive ? "text-pink-600" : "text-black"
        }`}
      >
        {item.label}
      </span>
    </Link>
  )}
</li>

          );
        })}
      </ul>
    </nav>
  );
}
