"use client";
import { useState, useEffect } from "react";

export default function OrderSuccess({ data }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (data?.length > 0) {
      setOrder(data[0]); // API se pehla order
    }
  }, [data]);

  if (!order) {
    return <div className="p-5 text-center">Loading order details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Success Message */}
      <div className=" text-pink-500 px-6 py-4 mb-3 lg:mb-6 text-start font-medium border-b">
        ✅ Your order has been placed successfully!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Left - Order Details */}
        <div className="bg-white p-2">
          <h2 className="text-xl font-bold mb-4 text-pink-600">
            Order Details
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><b>Order ID:</b> {order.orderID}</p>
            <p><b>Name:</b> {order.firstName} {order.lastName}</p>
            <p><b>Email:</b> {order.email}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><b>Total Amount:</b> ₹{order.grandTotal}</p>
            <p><b>Payment Status:</b> {order.paymentStatus}</p>
            <p><b>Payment Method:</b> {order.paymentMethod}</p>
          </div>

          <h3 className="mt-6 font-semibold text-gray-800">Items:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.productName} (Size: {item.size}) - Qty: {item.quantity} - ₹
                {item.discount_inr}
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Shipping Address */}
        <div className="bg-white p-2">
          <h2 className="text-xl font-bold mb-4 text-pink-600">
            Shipping Address
          </h2>
          <div className="text-gray-700 space-y-1">
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && (
              <p>{order.shippingAddress.addressLine2}</p>
            )}
            <p>{order.shippingAddress.landMark}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p>📞 {order.shippingAddress.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
