"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Clock } from "lucide-react";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
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
    <div className="max-w-6xl mx-auto p-5">
      {/* Success Message */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-4 rounded-lg shadow-md mb-8 text-start font-medium">
        ✅ Your order has been placed successfully!
      </div>

      {/* Flex Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Left - Order Details */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-pink-600">Order Details</h2>
          <div className="space-y-2 text-gray-700">
            <p><b>Order ID:</b> {order.orderId}</p>
            <p><b>Name:</b> {order.customerName}</p>
            <p><b>Email:</b> {order.email}</p>
            <p><b>Date:</b> {order.date}</p>
            <p><b>Total Amount:</b> ₹{order.totalAmount}</p>
            <p><b>Payment Status:</b> {order.paymentStatus}</p>
          </div>

          <h3 className="mt-6 font-semibold text-gray-800">Items:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} - Qty: {item.qty} - ₹{item.price}
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Order Tracking */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6 text-pink-600">Order Tracking</h2>
          <div className="relative">
            <div className="absolute top-0 left-2 h-full w-0.5 bg-gray-300"></div>
            {order.tracking.map((step, index) => (
              <div key={index} className="relative flex items-start mb-8 last:mb-0">
                <div className="relative z-10">
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Clock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="ml-4">
                  <p
                    className={`font-semibold ${
                      step.completed ? "text-green-600" : "text-gray-700"
                    }`}
                  >
                    {step.status}
                  </p>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
