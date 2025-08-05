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
import CouponForm from "./CouponForm";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [items, setItems] = useState([]);
  const [CartResponse, setCartResponse] = useState(null);
  const dispatch = useDispatch();
  const ApplyCouponGetCart = useSelector((state) => state.user.ApplyCouponGetCart);

  const totalPrice = items.reduce((acc, item) => {
    const price = item.price_inr || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const discount =
    appliedCoupon?.type === "percentage"
      ? (totalPrice * appliedCoupon.discountValue) / 100
      : appliedCoupon?.discountValue || 0;

  const finalTotal = totalPrice - discount;
  // const discount = appliedCoupon === "save10" ? totalPrice * 0.1 : 0;
  // const finalTotal = totalPrice ;

  const GetUserCartByUserId = async () => {
    try {
      const response = await GetUserCart();
      const cartItems = response?.data?.items || [];
      setCartResponse(response?.data)
      const AppliedCoupons = response?.data?.appliedCoupons || [];
      if(AppliedCoupons.length>0){
        setAppliedCoupon(AppliedCoupons[0])
      }else{
        setAppliedCoupon(null)
      }
      const formattedItems = cartItems.map((item) => ({
        id: item.sku || item.productName,
        title: item.productName,
        slug: item.slug,
        quantity: item.quantity,
        image: item.variants.image_url?.[0] || "",
        price_inr: item.price_inr || 0,
        color: item.variants?.color,
        size: item.size,
      }));
      setItems(formattedItems);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setItems([]);
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
    const newQuantity = itemToUpdate.quantity + 1;
    const addcart = {
      sku: itemToUpdate.id,
      slug: itemToUpdate.slug,
      size: itemToUpdate.size,
      quantity: newQuantity,
    };
    try {
      const res = await AddToCart("update", addcart);
      if (res.status === 200) {
        dispatch(increaseQuantity(id));
        GetUserCartByUserId();
      }
    } catch (err) {
      console.log("Failed to update cart", err);
    }
  }

  async function Detele_cart() {
    dispatch(clearCart());
  }

  async function removeFromCart_cart(id) {
    const itemToUpdate = items.find((item) => item.id === id);
    if (itemToUpdate && itemToUpdate.quantity > 0) {
      const addcart = {
        sku: itemToUpdate.id,
        slug: itemToUpdate.slug,
        size: itemToUpdate.size,
        quantity: 0,
      };
      try {
        dispatch(removeFromCart(id));
        const res = await AddToCart("remove", addcart);
        if (res.status === 200) {
          GetUserCartByUserId();
        }
      } catch (err) {
        console.error("Failed to update cart", err);
      }
    }
  }

  async function decreaseQuantity_cart(id) {
    const itemToUpdate = items.find((item) => item.id === id);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      const newQuantity = itemToUpdate.quantity - 1;
      const addcart = {
        sku: itemToUpdate.id,
        slug: itemToUpdate.slug,
        size: itemToUpdate.size,
        quantity: newQuantity,
      };
      try {
        const res = await AddToCart("update", addcart);
        if (res.status === 200) {
          dispatch(decreaseQuantity(id));
          GetUserCartByUserId();
        }
      } catch (err) {
        console.error("Failed to update cart", err);
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-15 py-8">
      <h1 className="text-3xl font-bold mb-6 text-pink-600 text-left">
        Your Carts
      </h1>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex-1 w-full px-2">
            <ul className="space-y-5 w-full">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="relative flex items-center gap-4 p-2 rounded bg-white shadow-md"
                >
                  <button
                    onClick={() => removeFromCart_cart(item.id)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <FaTrash size={20} />
                  </button>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold truncate">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <p className="text-md font-bold text-gray-700 mt-1">
                      ₹{item.price_inr} × {item.quantity} = ₹
                      {(item.price_inr * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQuantity_cart(item.id)}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-xl font-bold rounded"
                      >
                        −
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantityCart(item.id)}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-xl font-bold rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-4 text-right">
              <button
                onClick={Detele_cart}
                className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-50"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-gray-50 rounded p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span> ₹ {CartResponse && CartResponse.totalBasePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
           {appliedCoupon && (
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Coupon Discount ({appliedCoupon.code})</span>
              <span className="text-red-600">
                − ₹
                {appliedCoupon.type === "percentage"
                  ? ((totalPrice * appliedCoupon.discountValue) / 100).toFixed(2)
                  : appliedCoupon.discountValue.toFixed(2)}
              </span>
            </div>
          )}

         {CartResponse && (
          <p className="flex justify-between text-gray-700 mb-2"> <span>Discount</span> <span> ₹ {CartResponse && CartResponse.totalDiscount.toFixed(2)}</span></p>
         )} 

            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{CartResponse && CartResponse.totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-2">
              <CouponForm
                onApply={(code) => setAppliedCoupon(code)}
                onRemove={() => setAppliedCoupon(null)}
                appliedCoupon={appliedCoupon}
              />
            </div>
            <button
              disabled={loading}
              className={`w-full mt-6 bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition ${
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
