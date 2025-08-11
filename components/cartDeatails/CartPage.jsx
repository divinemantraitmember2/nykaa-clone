"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { GetUserCart, AddToCart } from "../../utils/api/Httproutes";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../slices/cartSlice";
import CouponForm from "./CouponForm";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [items, setItems] = useState([]);
  const [CartResponse, setCartResponse] = useState(null);
  const dispatch = useDispatch();
  const ApplyCouponGetCart = useSelector(
    (state) => state.user.ApplyCouponGetCart
  );

  const totalPrice = items.reduce((acc, item) => {
    const price = item?.price_inr || 0;
    const quantity = item?.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const discount =
    appliedCoupon?.type === "percentage"
      ? (totalPrice * (appliedCoupon?.discountValue || 0)) / 100
      : appliedCoupon?.discountValue || 0;

  const finalTotal = totalPrice - discount;

  const GetUserCartByUserId = async () => {
    try {
      const response = await GetUserCart();
      if (!response?.data) throw new Error("Invalid cart data");

      const cartItems = response.data.items || [];
      const AppliedCoupons = response.data.appliedCoupons || [];

      setCartResponse(response.data);
      setAppliedCoupon(AppliedCoupons.length > 0 ? AppliedCoupons[0] : null);

      const formattedItems = cartItems.map((item) => ({
        id: item?.sku || item?.productName || Math.random(),
        title: item?.productName || "Unnamed Product",
        slug: item?.slug || "",
        quantity: item?.quantity || 1,
        image: item?.variants?.image_url?.[0] || "/placeholder.png",
        price_inr: item?.price_inr || 0,
        color: item?.variants?.color || "N/A",
        size: item?.size || "N/A",
      }));
      setItems(formattedItems);
    } catch (error) {
      console.error("Cart fetch error:", error.message || error);
      setItems([]);
      setAppliedCoupon(null);
      setCartResponse(null);
    }
  };

  useEffect(() => {
    GetUserCartByUserId();
  }, []);

  useEffect(() => {
    GetUserCartByUserId();
  }, [ApplyCouponGetCart, dispatch]);

  async function increaseQuantityCart(id) {
    const itemToUpdate = items.find((item) => item.id === id);
    if (!itemToUpdate) return;
    const addcart = {
      sku: itemToUpdate.id,
      slug: itemToUpdate.slug,
      size: itemToUpdate.size,
      quantity: itemToUpdate.quantity + 1,
    };
    try {
      const res = await AddToCart("update", addcart);
      if (res?.status === 200) {
        dispatch(increaseQuantity(id));
        GetUserCartByUserId();
      }
    } catch (err) {
      console.error("Failed to update cart", err);
    }
  }

  async function Detele_cart() {
    try {
      dispatch(clearCart());
      setItems([]);
      setAppliedCoupon(null);
      setCartResponse(null);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  }

  async function removeFromCart_cart(id) {
    const itemToUpdate = items.find((item) => item.id === id);
    if (!itemToUpdate) return;
    const addcart = {
      sku: itemToUpdate.id,
      slug: itemToUpdate.slug,
      size: itemToUpdate.size,
      quantity: 0,
    };
    try {
      dispatch(removeFromCart(id));
      const res = await AddToCart("remove", addcart);
      if (res?.status === 200) {
        GetUserCartByUserId();
      }
    } catch (err) {
      console.error("Failed to remove from cart", err);
    }
  }

  async function decreaseQuantity_cart(id) {
    const itemToUpdate = items.find((item) => item.id === id);
    if (!itemToUpdate || itemToUpdate.quantity <= 1) return;
    const addcart = {
      sku: itemToUpdate.id,
      slug: itemToUpdate.slug,
      size: itemToUpdate.size,
      quantity: itemToUpdate.quantity - 1,
    };
    try {
      const res = await AddToCart("update", addcart);
      if (res?.status === 200) {
        dispatch(decreaseQuantity(id));
        GetUserCartByUserId();
      }
    } catch (err) {
      console.error("Failed to decrease quantity", err);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-pink-600">🛒 Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1">
            <ul className="space-y-6">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="relative flex items-center gap-5 p-4 rounded-xl bg-white shadow-lg border hover:shadow-xl transition-all duration-200"
                >
                  <button
                    onClick={() => removeFromCart_cart(item.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-600"
                  >
                    <FaTrash size={18} />
                  </button>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-md font-bold truncate">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Color: <span className="font-medium">{item.color}</span> | Size:{" "}
                      <span className="font-medium">{item.size}</span>
                    </p>
                    <p className="text-md font-semibold text-gray-800 mt-1">
                      ₹{item.price_inr} × {item.quantity} ={" "}
                      <span className="text-pink-600">
                        ₹{(item.price_inr * item.quantity).toFixed(2)}
                      </span>
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQuantity_cart(item.id)}
                        className="w-9 h-9 bg-gray-100 hover:bg-gray-200 text-xl font-bold rounded-lg"
                      >
                        −
                      </button>
                      <span className="font-semibold text-md">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantityCart(item.id)}
                        className="w-9 h-9 bg-gray-100 hover:bg-gray-200 text-xl font-bold rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-6 text-right">
              <button
                onClick={Detele_cart}
                className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl p-6 shadow-lg border">
            <h2 className="text-md  font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between text-gray-700 mb-3 text-md">
              <span>Subtotal</span>
              <span>₹{CartResponse?.totalBasePrice?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-3 text-md">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-gray-700 mb-3 text-lg">
                <span>Coupon ({appliedCoupon.code})</span>
                <span className="text-red-600">
                  − ₹
                  {appliedCoupon.type === "percentage"
                    ? ((totalPrice * appliedCoupon.discountValue) / 100).toFixed(2)
                    : appliedCoupon.discountValue?.toFixed(2)}
                </span>
              </div>
            )}
            {CartResponse && (
              <p className="flex justify-between text-gray-700 mb-3 text-lg">
                <span>Discount</span>
                <span>₹{CartResponse.totalDiscount?.toFixed(2) || "0.00"}</span>
              </p>
            )}
            <hr className="my-4" />
            <div className="flex justify-between text-lg  font-bold">
              <span>Total</span>
              <span>₹{CartResponse?.totalPrice?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="mt-4">
              <CouponForm
                onApply={(code) => setAppliedCoupon(code)}
                onRemove={() => setAppliedCoupon(null)}
                appliedCoupon={appliedCoupon}
              />
            </div>
            <button
              disabled={loading}
              className={`w-full mt-6 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition text-lg font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : <Link href="/checkout">Proceed to Checkout</Link>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
