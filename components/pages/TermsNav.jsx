"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TermsNav() {
  const pathname = usePathname();

  const links = [
    { label: "Terms And Conditions", href: "/terms/terms-and-conditions" },
    { label: "Privacy Policy", href: "/terms/privacy-policy" },
  ];

  const baseClasses =
    "rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md";
  const activeClasses = "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
  const inactiveClasses =
    "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900";

  return (
    <nav>
      {/* Mobile view → horizontal pill menu */}
      <div className="flex gap-3 border-b border-gray-200 pb-3 mb-4 lg:hidden overflow-x-auto scrollbar-hide">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 whitespace-nowrap ${baseClasses} ${
              pathname === link.href ? activeClasses : inactiveClasses
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop view → vertical card menu */}
      <div className="hidden lg:flex flex-col gap-3 p-4 bg-white sticky top-24">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Terms Menu</h2>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 ${baseClasses} ${
              pathname === link.href ? activeClasses : inactiveClasses
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
