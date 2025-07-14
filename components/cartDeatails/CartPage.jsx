"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../slices/cartSlice";
import { useEffect } from "react";

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center md:text-left">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <ul className="space-y-6">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 border rounded-lg p-4 shadow-sm"
                >
                    {item.image}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm text-pink-600 hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="w-full md:w-1/3 border rounded-lg p-6 shadow-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button
              className="w-full mt-6 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
