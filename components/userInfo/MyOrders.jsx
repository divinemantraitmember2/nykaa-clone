"use client";

import React from "react";

const MyOrders = ({ orders }) => {
   
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center p-6 text-gray-600">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="p-2 lg:p-4">
      <h2 className="text-2xl font-semibold mb-6 text-start">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={order.id || index}
            className="border rounded-xl p-4 md:p-6 shadow-sm bg-white"
          >
            {/* Order Summary */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID:</p>
                <p className="font-medium">{order.orderID}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date:</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status:</p>
                <p
                  className={`font-medium ${
                    order.orderStatus === "COMPLETED"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.orderStatus}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total:</p>
                <p className="font-semibold text-lg text-black">
                  ₹{order.grandTotal}
                </p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Shipping Address */}
            <div className="mb-4">
              <p className="font-semibold text-sm mb-1">Shipping Address</p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress?.firstName}{" "}
                {order.shippingAddress?.lastName},{" "}
                {order.shippingAddress?.addressLine1},{" "}
                {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                {order.shippingAddress?.zipCode}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {order.shippingAddress?.phoneNumber}
              </p>
            </div>

            {/* Ordered Items */}
            <div>
              <p className="font-semibold text-sm mb-2">Items Ordered</p>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row gap-4 items-start md:items-center border-b py-4"
                >
                  <img
                    src={item.variants.image_url[0]}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Size: {item.variants.size_stocks[0].size}
                    </p>
                    <p className="text-sm text-gray-600">
                      Color: {item.variants.color}
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      ₹{item.variants.size_stocks[0].discounted_price_inr}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Info */}
            <div className="mt-4 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-700">
              <p>
                Payment Method:{" "}
                <span className="font-medium">{order.paymentMethod}</span>
              </p>
              <p>
                Payment Status:{" "}
                <span
                  className={`font-medium ${
                    order.paymentStatus === "PENDING"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
