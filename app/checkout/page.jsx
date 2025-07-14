"use client";
import { useState } from "react";

export default function PayNow() {
  const [loading, setLoading] = useState(false);

  const giftCartID = "686f403fcb504395e91c4585";
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpdmluZW1hbnRyYWl0bWVtYmVyMkBnbWFpbC5jb20iLCJuYW1lIjoiUkFWSSIsImNhcnRpZCI6IiIsInBob25lIjo4ODY4ODAzMjg1LCJ1c2VyaWQiOiI2NmYxMTA4MzQ1YWM2MzIyYTgxNmE0MmIiLCJ1aWQiOiI5OWFhMjU2OC03OTc4LTExZWYtOThhYS0wYTNmNmNmMjJjOWQiLCJ0b2tlbiI6IiIsImlwIjoiMjIzLjE3Ny4xODIuMTEwIiwidXNlcmFnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNy4wLjAuMCBTYWZhcmkvNTM3LjM2IiwidXNlcnR5cGUiOiJhZG1pbiIsInRva2VudHlwZSI6ImFjY2Vzc190b2tlbiIsImV4cCI6NTM1MDE0NjczNn0.DH6Nj6S1Undu5tDksgJMnt3n7Eg-gbCGenn_N6B4nKM"; // 🔐 Replace with real token

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
    const itemName = data?.Cart?.items?.title;

    if (!razorpayOrderId || !razorpayOrderId.startsWith("order_")) {
      alert("Invalid Razorpay order ID");
      throw new Error("Missing or invalid Razorpay orderID");
    }

    return { razorpayOrderId, title: itemName };
  };

  const handlePayment = async () => {
    setLoading(true);
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay script");
      return;
    }

    try {
      const { razorpayOrderId, title } = await initiatePayment();

      const options = {
        key: "rzp_test_caePuWgsv1T7Aq", // ✅ Replace with your Razorpay Key
        amount: 2,
        currency: "INR",
        name: "TripToTemples",
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
              giftCartID: giftCartID,
              paymentOrderID: response.razorpay_order_id,
              paymentTransID: response.razorpay_payment_id,
              paymentSignature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success response:", data);
              alert("🎉 Payment Success!");
            })
            .catch((err) => {
              console.error("Verification failed:", err);
              alert("⚠️ Payment verification failed.");
            });
        },
        modal: {
          ondismiss: function () {
            console.log("User exited the payment window.");
            fetch("http://localhost:8085/api/v1/gift-cart/fail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify({
                giftCartID: giftCartID,
                paymentTransID: "",
                errMessage: "User exited the payment window",
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Exit log response:", data);
              })
              .catch((err) => {
                console.error("Fail log error:", err);
              });
          },
        },
        prefill: {
          name: "Ravi Kumar",
          email: "ravi@example.com",
          contact: "8868803285",
        },
        theme: {
          color: "#F37254",
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
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-6">TripToTemples Payment</h1>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded text-lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
