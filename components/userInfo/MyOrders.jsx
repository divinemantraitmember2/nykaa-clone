"use client";

import React from "react";
import { Download } from "lucide-react";

const MyOrders = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500 text-lg">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">
        My Orders <span className="text-pink-600">({orders.length})</span>
      </h2>

      <div className="space-y-8">
        {orders.map((order, index) => (
          <div
            key={order?.id || index}
            className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition"
          >
            {/* Order Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order?.orderID || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p
                  className={`font-semibold ${
                    order?.orderStatus === "COMPLETED"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order?.orderStatus || "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-semibold text-lg text-gray-900">
                  ₹{order?.grandTotal ?? 0}
                </p>
              </div>
            </div>

            <hr className="my-6" />

            {/* Ordered Items + Shipping */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Items */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800 mb-4">
                  Items Ordered
                </p>
                {order?.items?.length > 0 ? (
                  <div className="space-y-4">
                    {order.items.map((item, idx) => {
                      const variant = item?.variants || {};
                      const sizeStock = variant?.size_stocks?.[0] || {};

                      return (
                        <div
                          key={idx}
                          className="flex flex-col md:flex-row gap-4 items-start md:items-center border-b pb-4"
                        >
                          <img
                            src={variant?.image_url?.[0] || ""}
                            alt={item?.productName || "Product"}
                            className="w-24 h-24 object-cover rounded-lg shadow"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="font-medium text-gray-900">
                              {item?.productName || "Unknown Product"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item?.quantity ?? 0}
                            </p>
                            <p className="text-sm text-gray-600">
                              Size: {sizeStock?.size || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Color: {variant?.color || "N/A"}
                            </p>
                            <p className="text-sm font-semibold text-pink-600">
                              ₹{sizeStock?.discounted_price_inr ?? 0}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No items in this order.</p>
                )}
              </div>

              {/* Shipping */}
              <div className="w-full lg:w-80 bg-gray-50 rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-gray-800 mb-3">
                  Shipping Address
                </p>
                {order?.shippingAddress ? (
                  <>
                    <p className="text-sm text-gray-700">
                      {order.shippingAddress?.firstName || ""}{" "}
                      {order.shippingAddress?.lastName || ""},{" "}
                      {order.shippingAddress?.addressLine1 || ""},{" "}
                      {order.shippingAddress?.city || ""},{" "}
                      {order.shippingAddress?.state || ""} -{" "}
                      {order.shippingAddress?.zipCode || ""}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      Phone: {order.shippingAddress?.phoneNumber || "N/A"}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No shipping address provided.
                  </p>
                )}
              </div>
            </div>

            {/* Invoice Section */}
            {order?.invoice &&
              order?.invoice?.number !== "" &&
              order?.invoice?.orderId !== "" && (
                <div className="mt-8 bg-gradient-to-r from-pink-600 to-red-400 text-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Invoice</h3>
                    <p className="text-sm">Invoice #: {order.invoice.number}</p>
                    <p className="text-sm">Order ID: {order.invoice.orderId}</p>
                    <p className="text-sm">
                      Created:{" "}
                      {new Date(order.invoice.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <a
                    href={order.invoice.s3Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={order.invoice.fileName}
                    className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-pink-600 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                  >
                    <Download className="w-5 h-5" /> Download Invoice
                  </a>
                </div>
              )}

            {/* Payment Info */}
            <div className="mt-6 flex flex-col md:flex-row justify-between gap-4 border-t pt-4 text-sm text-gray-700">
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
