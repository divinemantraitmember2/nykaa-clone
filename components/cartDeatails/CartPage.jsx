"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../slices/cartSlice";
import { useState } from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log("items",items)

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
  return (
    <div className="max-w-7xl  mx-auto px-2 md:px-15 py-8">
      <h1 className="text-3xl  font-bold mb-6 text-pink-600 text-center md:text-left">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Cart Items */}
         <div className="flex-1 flex flex-col w-full h-full px-2 sm:px-2">
 <ul className="space-y-5 w-full flex-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative flex items-center gap-4 border border-pink-600 rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {/* Remove button - top right */}
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors"
            title="Remove item"
          >
            <FaTrash size={20} />
          </button>

          {/* Item image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border shrink-0"
          />

          {/* Item info */}
          <div className="flex-1 overflow-hidden min-w-0">
            <p className="text-base md:text-lg font-semibold truncate">
              {item.title}
            </p>
            <p className="text-md font-bold text-gray-500 mt-1">
              ₹{item.price} × {item.quantity} = ₹
              {(item.price * item.quantity).toFixed(2)}
            </p>

            {/* Quantity controls */}
            <div className="flex items-center justify-center py-2">
               <div className="flex items-center gap-3  mt-2">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="w-8 h-8 mx-2 bg-gray-100 hover:bg-gray-200 text-xl font-bold rounded"
              >
                −
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="w-8 h-8 mx-2 bg-gray-100 hover:bg-gray-200 text-xl font-bold rounded"
              >
                +
              </button>
            </div>
            </div>
           
          </div>
        </li>
      ))}
    </ul>

  {/* Clear Cart fixed to bottom */}
  <div className="mt-auto pt-4 text-right">
    <button 
      onClick={() => dispatch(clearCart())}
      className="border border-gray-300 text-bold px-4 py-1 lg:py-2 rounded hover:bg-gray-50"
    >
      Clear Cart
    </button>
  </div>
</div>



          {/* Price Summary */}
          <div className="w-full lg:w-1/3 self-start border rounded-lg p-6 shadow-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              disabled={loading}
              className={`w-full mt-6 bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                "Processing..."
              ) : (
                <Link href="/checkout">Proceed to Checkout</Link>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
