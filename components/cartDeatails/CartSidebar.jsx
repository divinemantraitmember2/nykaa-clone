"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../slices/cartSlice";

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex gap-4 items-start border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-lg">{item.title}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
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

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-lg font-bold">Total: ₹{totalPrice}</span>
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-pink-600 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
