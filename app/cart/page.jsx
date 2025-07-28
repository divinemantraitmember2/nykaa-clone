
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import CartSidebar from "../../components/cartDeatails/CartPage";
export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; 
  }
  
    return <section className="w-full bg-[#f3f3f3]"><CartSidebar /></section>
    
}
