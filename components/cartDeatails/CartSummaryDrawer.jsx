"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  GetUserCart,
  AddToCart,
} from "../../utils/api/Httproutes";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateCartCount,
  CartShippingAddress,
} from "../../slices/cartSlice";
import { openUserCartDrawar } from "../../slices/userSlice";
import CouponForm from "./CouponForm";
import { toast } from "react-toastify";


export default function CartSummaryDrawer() {
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [items, setItems] = useState([]);
  const [Cartitems, setItemsCart] = useState([]);
  const [CartResponse, setCartResponse] = useState(null);
   const { data: session, status } = useSession();

  const dispatch = useDispatch();
  const ApplyCouponGetCart = useSelector((state) => state.user.ApplyCouponGetCart);
  const showUserCartDrawar = useSelector((state) => state.user.showUserCartDrawar);
  const cartUpdateStatus = useSelector((state) => state.user.GetUserCart);
  
  const totalPrice = items.reduce((acc, item) => acc + (item.price_inr || 0) * (item.quantity || 1), 0);

  const discount =
    appliedCoupon?.type === "percentage"
      ? (totalPrice * appliedCoupon.discountValue) / 100
      : appliedCoupon?.discountValue || 0;

  const GetUserCartByUserId = async () => {
    try {
      const response = await GetUserCart();

      const cartItems = response?.data?.items || [];
      setCartResponse(response?.data || null);
      setItemsCart(cartItems)

      const AppliedCoupons = response?.data?.appliedCoupons || [];
      setAppliedCoupon(AppliedCoupons.length > 0 ? AppliedCoupons[0] : null);
      dispatch(updateCartCount(cartItems.length));
      dispatch(CartShippingAddress(response.data));
      const formattedItems = cartItems.map((item) => ({
        id: item?.sku || item?.productName || "",
        title: item?.productName || "Unnamed Product",
        slug: item?.slug || "",
        quantity: item?.quantity || 0,
        image: item?.variants?.image_url?.[0] || "/placeholder.png",
        price_inr: item?.price_inr || 0,
        discount_inr: item?.discount_inr || 0,
        is_free: item?.is_free,
        color: item?.variants?.color || "N/A",
        size: item?.size || "N/A",
      }));
      
      setItems(formattedItems);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setItems([]);
      setCartResponse(null);
    }
  };

  useEffect(() => {
  if (status === "authenticated") {
    GetUserCartByUserId();
  }
}, [status]);

  useEffect(() => {
  if (status === "authenticated") {
    GetUserCartByUserId();
  }
}, [status, ApplyCouponGetCart, cartUpdateStatus]);
  

  const updateCartQuantity = async (id, quantity) => {
    const item = items.find((i) => i.id === id);
    if (!item || quantity < 1) return;

    const payload = {
      sku: item.id,
      slug: item.slug,
      size: item.size,
      quantity,
    };
    try {
      const res = await AddToCart("update", payload);
      if (res.status === 200) {
        quantity > item.quantity ? dispatch(increaseQuantity(id)) : dispatch(decreaseQuantity(id));
        GetUserCartByUserId();
      }
    } catch (err) {
      console.error("Failed to update cart", err);
    }
  };

  const removeItem = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const payload = {
      sku: item.id,
      slug: item.slug,
      size: item.size,
      quantity: 0,
    };
    try {
      dispatch(removeFromCart(id));
      const res = await AddToCart("remove", payload);
      if (res.status === 200){
        toast.success(`${item.title} has been removed`)
        GetUserCartByUserId();
      } 
    } catch (err) {
      console.error("Remove error", err);
    }
  };

  return (
    <>
    {showUserCartDrawar && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => dispatch(openUserCartDrawar())}
        ></div>
      )}
    
    
    <div
      className={`fixed top-0 right-0 h-full w-full sm:max-w-[400px] bg-white z-50 shadow-xl transition-transform duration-300 transform ${
        showUserCartDrawar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Your Shopping Bag</h2>
        <button
          onClick={() => dispatch(openUserCartDrawar())}
          className="lg:text-2xl text-3xl font-medium text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>

      {CartResponse && Cartitems.length > 0 ? (
        <>
          <div className="h-[calc(100%-140px)] overflow-y-auto px-4 py-2">
            {Cartitems.map((item, index) => (
              <div key={index} className="flex gap-4 px-2 py-4 border-b border-gray-200 relative">
                
                <img
                  src={item?.variants?.image_url?.[0]}
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded-md border border-gray-200"
                />
                <div className="flex-1">
                  
              
                  <p className="font-medium text-base text-gray-900 line-clamp-2">{item?.productName}</p>
                  <p className="text-sm text-gray-500">Color: {item?.variants?.color} | Size: {item.size}</p>

            {item?.is_free?(
        <p className="mt-3">
    <span className="bg-green-100 p-2  px-10 text-black text-lg font-semibold ">
      🎉 Free 
    </span>
    </p>
  ):(<>    
    <div className="">
      <p className="text-sm text-gray-800 mt-1"> Price <span className="line-through text-gray-500 mr-2">
    ₹{item.price_inr} 
  </span>  <span className="text-green-600">
   Discount ₹{item.discount_inr}
  </span></p>
<p className="text-sm font-semibold text-gray-800 mt-1">
  <span className="text-green-600">
    ₹{item.discount_inr}
  </span>
  × {item.quantity} = 
  <span className="ml-1 text-black">
    ₹{item.discount_inr * item.quantity} 
  </span>
</p>
</div>
</>)}   
                 {item?.is_free?(<></>):(<>
                 <div className="flex items-center gap-2 mt-3 ">
                    <button
                    
                      onClick={() => updateCartQuantity(item?.sku, item.quantity - 1)}
                      className="w-8 h-8 text-lg bg-gray-100 hover:bg-gray-200 rounded-md font-bold"
                   
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item?.sku, item.quantity + 1)}
                      className="w-8 h-8 text-lg bg-gray-100 hover:bg-gray-200 rounded-md font-bold"
                  
                   >
                      + 
                    </button>
                  </div>

                 </>)} 

                </div>
                {item?.is_free?"":(<>
                <button
                  onClick={() => removeItem(item.sku)}
                  className="absolute top-3 right-3 text-red-600 hover:text-red-800"
               
                >
                  <FaTrash />
                </button>
                </>)}
                

              </div>
            ))}

            {/* Price Summary */}
            <div className="mt-6 space-y-3 bg-gray-50 p-2 rounded-lg shadow-inner">
              <div className="flex justify-between text-sm bg-pink-50 text-black ">
                <span>Bag Total</span>
                <span>₹{CartResponse?.totalBasePrice?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Shipping Charges</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              {appliedCoupon && (
                <div className=" bg-green-100 text-green-700 text-sm  py-2 font-medium flex justify-between ">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span className="text-red-600">− ₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-700">
                <span>Discount on MRP</span>
                <span className="text-green-600">
                  ₹{CartResponse?.totalDiscount?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-semibold text-lg text-gray-900">
                <span>You Pay</span>
                <span>₹{CartResponse?.totalPrice?.toFixed(2) || "0.00"}</span>
              </div>
            </div>

            <div className="mt-4">
              <CouponForm
                onApply={(code) => setAppliedCoupon(code)}
                onRemove={() => setAppliedCoupon(null)}
                appliedCoupon={appliedCoupon}
              />
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200">
            <Link onClick={() => dispatch(openUserCartDrawar())} href="/checkout">
              <button
                disabled={loading}
                className={`w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition-all duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Your Shopping Bag is Empty
        </div>
      )}
    </div>
    </>
  );
}
