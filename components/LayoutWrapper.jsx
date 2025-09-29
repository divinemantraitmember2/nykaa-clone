"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children, header, footer, mobileFooter }) {
  const pathname = usePathname();

  const hideLayout = pathname === "/checkout";

  return (
    <>
      {!hideLayout && header}
      {children}
      {!hideLayout && footer}
      {!hideLayout && mobileFooter}
    </>
  );
}
