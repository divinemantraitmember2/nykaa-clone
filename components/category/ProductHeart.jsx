
"use client";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../slices/userSlice";
import { Heart } from "lucide-react";

export default function ProductHeart() {
     const dispatch = useDispatch();
    const { status } = useSession();
    const handleWishlistClick = (e) => {
        e.preventDefault();
        if (status === "unauthenticated") {
          dispatch(openLoginModal());
        }
      };
    
  return (
    <>
        <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 z-10 bg-green-100 p-1.5 rounded-full shadow hover:bg-pink-100 transition"
          >
            <Heart className="w-4 h-4 text-gray-800 group-hover:text-pink-600" />
          </button>
    </>
  );
}
