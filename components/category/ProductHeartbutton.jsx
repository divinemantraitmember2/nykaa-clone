"use client";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../slices/userSlice";
import { AddUserWhish, GetUserWhish, RemoveUserWhish } from "../../utils/api/Httproutes";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { updateWhishCount } from "../../slices/cartSlice";

export default function ProductHeartbutton({ sku }) {
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
        GetUserWhished();
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.errors || "Something went wrong!"}`);
    }
  }

  async function GetUserWhished() {
    try {
      const Response = await GetUserWhish();
      if (Response?.status === 200 && Response?.data?.code === 200) {
         dispatch(updateWhishCount(Response.data.data.length));
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
        GetUserWhished();
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
          className="w-full bg-white text-black border border-gray-200  text-sm font-semibold px-4 py-3 flex items-center justify-center gap-2 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-6.75-4.107-9.75-11.25A5.25 5.25 0 017.5 3.75a5.25 5.25 0 014.5 2.333A5.25 5.25 0 0116.5 3.75a5.25 5.25 0 014.5 6c-3 7.143-9 11.25-9 11.25z"
            />
          </svg>
          <span>Remove Wishlist</span>
        </button>
      ) : (
        <button
          onClick={handleWishlistClick}
          className="w-full bg-white text-black border border-gray-200  text-sm font-semibold px-4 py-3 flex items-center justify-center gap-2 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.75a5.25 5.25 0 00-4.355 2.333A5.25 5.25 0 007.5 3.75 5.25 5.25 0 002.25 9c0 7.143 9.75 11.25 9.75 11.25S21.75 16.143 21.75 9A5.25 5.25 0 0016.5 3.75z"
            />
          </svg>
          <span>Add to Wishlist</span>
        </button>
      )}
    </>
  );
}
