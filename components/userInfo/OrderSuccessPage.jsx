"use client";
import { useState, useEffect } from "react";

export default function OrderSuccess() {
  // Dummy order details
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulate API fetch with dummy data
    const dummyOrder = {
      orderId: "ORD123456",
      customerName: "Ravi Kumar",
      email: "ravi@example.com",
      totalAmount: 1499,
      paymentStatus: "Paid",
      date: "2025-08-11",
      items: [
        { id: 1, name: "Wireless Earbuds", qty: 1, price: 999 },
        { id: 2, name: "USB-C Charger", qty: 1, price: 500 },
      ],
      tracking: [
        { status: "Order Placed", date: "2025-08-11", completed: true },
        { status: "Processing", date: "2025-08-12", completed: true },
        { status: "Shipped", date: "2025-08-13", completed: false },
        { status: "Out for Delivery", date: "2025-08-14", completed: false },
        { status: "Delivered", date: "2025-08-15", completed: false },
      ],
    };

    setTimeout(() => {
      setOrder(dummyOrder);
    }, 500);
  }, []);

  if (!order) {
    return <div className="p-5 text-center">Loading order details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* Success Message */}
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-5">
        ✅ Your order has been placed successfully!
      </div>

      {/* Order Details */}
      <div className="bg-white shadow rounded p-5 mb-5">
        <h2 className="text-xl font-bold mb-3">Order Details</h2>
        <p><b>Order ID:</b> {order.orderId}</p>
        <p><b>Name:</b> {order.customerName}</p>
        <p><b>Email:</b> {order.email}</p>
        <p><b>Date:</b> {order.date}</p>
        <p><b>Total Amount:</b> ₹{order.totalAmount}</p>
        <p><b>Payment Status:</b> {order.paymentStatus}</p>

        <h3 className="mt-4 font-semibold">Items:</h3>
        <ul className="list-disc list-inside">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.name} - Qty: {item.qty} - ₹{item.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Order Tracking */}
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-xl font-bold mb-4">Order Tracking</h2>
        <div className="relative border-l-2 border-gray-300 pl-6">
          {order.tracking.map((step, index) => (
            <div key={index} className="mb-6 relative">
              <div
                className={`w-4 h-4 rounded-full absolute -left-2 top-1.5 ${
                  step.completed ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <p className="font-semibold">{step.status}</p>
              <p className="text-sm text-gray-500">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
