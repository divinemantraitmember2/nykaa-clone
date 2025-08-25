"use client";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../slices/userSlice";
import { Heart } from "lucide-react";
import { AddUserWhish, GetUserWhish, RemoveUserWhish } from "../../utils/api/Httproutes";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ProductHeart({ sku }) {
  const dispatch = useDispatch();
  const { status } = useSession();
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      GetUserWhished();
    }
  }, [status]);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      dispatch(openLoginModal());
      return;
    }

    if (status === "authenticated") {
      let dataPay = { sku: `${sku}` };
      await AddWhishList(dataPay);
    }
  };

  const handleRemoveWishlistClick = async (e) => {
    e.preventDefault();
    if (status === "authenticated") {
      let dataPay = { sku: `${sku}` };
      await RemoveWhishList(dataPay);
    }
  };

  async function AddWhishList(payload) {
    try {
      const Response = await AddUserWhish(payload);
      if (Response.status === 200) {
        toast.success("💖 Added to your wishlist!");
        setIsWished(true);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.errors || "Something went wrong!"}`);
    }
  }

  async function GetUserWhished() {
    try {
      const Response = await GetUserWhish();
      if (Response?.status === 200 && Response?.data?.code === 200) {
        if (Response?.data?.data != null && Response?.data?.data?.length > 0) {
          const wishedSkus = Response.data.data.map((item) => item.sku);
          if (wishedSkus.includes(sku)) {
            setIsWished(true);
          }
        }
      }
    } catch (error) {}
  }

  async function RemoveWhishList(payload) {
    try {
      const Response = await RemoveUserWhish(payload);
      if (Response.status === 200) {
        toast.success("Removed from your wishlist!");
        setIsWished(false);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.errors || "Something went wrong!"}`);
    }
  }

  return (
    <>
      {isWished ? (
        <button
          onClick={handleRemoveWishlistClick}
          className="absolute top-2 right-2 z-10 bg-pink-400 p-1.5 rounded-full shadow hover:bg-red-200 transition"
        >
          <Heart className="w-4 h-4 text-pink-100" />
        </button>
      ) : (
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 z-10 bg-green-100 p-1.5 rounded-full shadow hover:bg-pink-100 transition"
        >
          <Heart className="w-4 h-4 text-gray-800 group-hover:text-pink-600" />
        </button>
      )}
    </>
  );
}
