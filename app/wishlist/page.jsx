"use client";

import UserWishlist from "../../components/userInfo/UserWishlist";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WishlistPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); 
    }
  }, [status, router]);

  
  return (
    <section className="w-full mx-auto">
      <UserWishlist />
    </section>
  );
}
