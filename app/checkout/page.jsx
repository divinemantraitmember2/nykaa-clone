"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ChooseAddressPage from "../../components/checkout/ChooseAddressPage";

export default function CheckOut() {
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

  return <ChooseAddressPage />;
}