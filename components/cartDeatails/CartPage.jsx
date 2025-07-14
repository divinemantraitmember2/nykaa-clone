"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../slices/cartSlice";
import { useState } from "react";

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const giftCartID = "686f403fcb504395e91c4585";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpdmluZW1hbnRyYWl0bWVtYmVyMkBnbWFpbC5jb20iLCJuYW1lIjoiUkFWSSIsImNhcnRpZCI6IiIsInBob25lIjo4ODY4ODAzMjg1LCJ1c2VyaWQiOiI2NmYxMTA4MzQ1YWM2MzIyYTgxNmE0MmIiLCJ1aWQiOiI5OWFhMjU2OC03OTc4LTExZWYtOThhYS0wYTNmNmNmMjJjOWQiLCJ0b2tlbiI6IiIsImlwIjoiMjIzLjE3Ny4xODIuMTEwIiwidXNlcmFnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNy4wLjAuMCBTYWZhcmkvNTM3LjM2IiwidXNlcnR5cGUiOiJhZG1pbiIsInRva2VudHlwZSI6ImFjY2Vzc190b2tlbiIsImV4cCI6NTM1MDE0NjczNn0.DH6Nj6S1Undu5tDksgJMnt3n7Eg-gbCGenn_N6B4nKM"; // Secure this

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    const res = await fetch(
      "http://localhost:8085/api/v1/gift-cart/paymentinit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          GiftcartId: giftCartID,
          paymentMethod: "razorpay",
        }),
      }
    );
    const data = await res.json();

    const razorpayOrderId = data?.Cart?.paymentOrderID;
    const itemName = data?.Cart?.items?.title || "TripToTemples Order";

    if (!razorpayOrderId || !razorpayOrderId.startsWith("order_")) {
      alert("Invalid Razorpay order ID");
      throw new Error("Missing or invalid Razorpay orderID");
    }

    return { razorpayOrderId, title: itemName };
  };

  const handleCheckout = async () => {
    setLoading(true);
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay script");
      return;
    }

    try {
      const { razorpayOrderId, title } = await initiatePayment();

      const options = {
        key: "rzp_test_caePuWgsv1T7Aq",
        amount: totalPrice * 100,
        currency: "INR",
        name: "nykaa",
        description: title,
        image: "https://yourwebsite.com/logo.png",
        order_id: razorpayOrderId,
        handler: function (response) {
          fetch("http://localhost:8085/api/v1/gift-cart/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              giftCartID,
              paymentOrderID: response.razorpay_order_id,
              paymentTransID: response.razorpay_payment_id,
              paymentSignature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then(() => {
              alert("🎉 Payment Success!");
              dispatch(clearCart());
            })
            .catch(() => alert("⚠️ Payment verification failed."));
        },
        modal: {
          ondismiss: function () {
            fetch("http://localhost:8085/api/v1/gift-cart/fail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify({
                giftCartID,
                paymentTransID: "",
                errMessage: "User exited the payment window",
              }),
            });
          },
        },
        prefill: {
          name: "Ravi Kumar",
          email: "ravi@example.com",
          contact: "8868803285",
        },
        theme: {
          color: "#c6005c",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-15 py-8">
      <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center md:text-left">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 max-h-[70vh] overflow-y-auto pr-1">
            <ul className="space-y-5">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 border border-pink-600 rounded-lg p-3 bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-base md:text-lg font-medium truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price}
                    </p>
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
            <div className="mt-5 text-right">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm text-pink-600 hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="w-full lg:w-1/3 border rounded-lg p-6 shadow-md bg-gray-50">
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
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full mt-6 bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
