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
      <h2 className="text-2xl font-semibold mb-6 text-start">
        My Orders <span>{orders.length}</span>
      </h2>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={order?.id || index}
            className="border rounded-xl p-4 md:p-6"
          >
            {/* Order Summary */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID:</p>
                <p className="font-medium">{order?.orderID || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date:</p>
                <p className="font-medium">
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status:</p>
                <p
                  className={`font-medium ${
                    order?.orderStatus === "COMPLETED"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order?.orderStatus || "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total:</p>
                <p className="font-semibold text-lg text-black">
                  ₹{order?.grandTotal ?? 0}
                </p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Ordered Items and Shipping Address */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Ordered Items */}
              <div className="flex-1">
                <p className="font-semibold text-sm mb-2">Items Ordered</p>
                {order?.items?.length > 0 ? (
                  order.items.map((item, idx) => {
                    const variant = item?.variants || {};
                    const sizeStock = variant?.size_stocks?.[0] || {};

                    return (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row gap-4 items-start md:items-center py-4"
                      >
                        <img
                          src={variant?.image_url?.[0] || "/placeholder.png"}
                          alt={item?.productName || "Product Image"}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">
                            {item?.productName || "Unknown Product"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item?.quantity ?? 0}
                          </p>
                          <p className="text-sm text-gray-600">
                            Size: {sizeStock?.size || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Color: {variant?.color || "N/A"}
                          </p>
                          <p className="text-sm text-gray-800 font-semibold">
                            ₹{sizeStock?.discounted_price_inr ?? 0}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">No items in this order.</p>
                )}
              </div>

              {/* Shipping Address */}
              <div className="w-full md:max-w-sm bg-white p-4">
                <p className="font-semibold text-sm mb-2">Shipping Address</p>
                {order?.shippingAddress ? (
                  <>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress?.firstName || ""}{" "}
                      {order.shippingAddress?.lastName || ""},{" "}
                      {order.shippingAddress?.addressLine1 || ""},{" "}
                      {order.shippingAddress?.city || ""},{" "}
                      {order.shippingAddress?.state || ""} -{" "}
                      {order.shippingAddress?.zipCode || ""}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Phone: {order.shippingAddress?.phoneNumber || "N/A"}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No shipping address provided.</p>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-4 flex flex-col md:flex-row border-t py-2 justify-between gap-4 text-sm text-gray-700">
              <p>
                Payment Method:{" "}
                <span className="font-medium">
                  {order?.paymentMethod || "N/A"}
                </span>
              </p>
              <p>
                Payment Status:{" "}
                <span
                  className={`font-medium ${
                    order?.paymentStatus === "PENDING"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {order?.paymentStatus || "Unknown"}
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
