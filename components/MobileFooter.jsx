"use client";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../slices/userSlice";
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
    { label: "Cart", href: "/cart", icon: <ShoppingCart size={20} />, showBadge: true },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#faf4ec] md:hidden shadow-2xl  border-t-2 border-pink-700 rounded-t-3xl overflow-hidden">
      <ul className="flex justify-around items-center h-25 text-xs text-gray-600 ">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
             <Link
  href={item.href}
  onClick={item.onClick}
  className="flex flex-col items-center justify-center"
>
  <div
    className={`relative w-10 h-10 flex items-center justify-center rounded-full border border-pink-600 transition-all duration-300 ${
      isActive ? "bg-pink-100 text-pink-600" : "text-gray-600"
    }`}
  >
    {item.icon}
    {item.label === "Cart" && cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] px-[10px] py-[8px] rounded-full leading-none">
        {cartCount}
      </span>
    )}
  </div>
  <span
    className={`text-[10px] mt-1 ${
      isActive ? "text-pink-600" : "text-gray-600"
    }`}
  >
    {item.label}
  </span>
</Link>

            </li>
          );
        })}
      </ul>
    </nav>
  );
}
