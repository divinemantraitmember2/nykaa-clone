"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  GetUserCart,
  AddToCart,
} from "../../utils/api/Httproutes";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../slices/cartSlice";
import { openUserCartDrawar } from "../../slices/userSlice";
import CouponForm from "./CouponForm";

export default function CartSummaryDrawer({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [items, setItems] = useState([]);
  const [CartResponse, setCartResponse] = useState(null);

  const dispatch = useDispatch();
  const ApplyCouponGetCart = useSelector((state) => state.user.ApplyCouponGetCart);
  const showUserCartDrawar = useSelector((state) => state.user.showUserCartDrawar);

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

      const AppliedCoupons = response?.data?.appliedCoupons || [];
      setAppliedCoupon(AppliedCoupons.length > 0 ? AppliedCoupons[0] : null);

      const formattedItems = cartItems.map((item) => ({
        id: item?.sku || item?.productName || "",
        title: item?.productName || "Unnamed Product",
        slug: item?.slug || "",
        quantity: item?.quantity || 0,
        image: item?.variants?.image_url?.[0] || "/placeholder.png",
        price_inr: item?.price_inr || 0,
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
    GetUserCartByUserId();
  }, []);

  useEffect(() => {
    GetUserCartByUserId();
  }, [ApplyCouponGetCart]);

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
      if (res.status === 200) GetUserCartByUserId();
    } catch (err) {
      console.error("Remove error", err);
    }
  };

  return (
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

      {CartResponse && items.length > 0 ? (
        <>
          <div className="h-[calc(100%-140px)] overflow-y-auto px-4 py-2">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 px-2 py-4 border-b border-gray-200 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded-md border border-gray-200"
                />
                <div className="flex-1">
                  <p className="font-medium text-base text-gray-900 line-clamp-2">{item.title}</p>
                  <p className="text-sm text-gray-500">Color: {item.color} | Size: {item.size}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    ₹{item.price_inr} × {item.quantity} = ₹{item.price_inr * item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 text-lg bg-gray-100 hover:bg-gray-200 rounded-md font-bold"
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 text-lg bg-gray-100 hover:bg-gray-200 rounded-md font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            {/* Price Summary */}
            <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-lg shadow-inner">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Bag Total</span>
                <span>₹{CartResponse?.totalBasePrice?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Shipping Charges</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-gray-700">
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
  );
}
