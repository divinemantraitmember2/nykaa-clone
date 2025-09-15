"use client";

import React from "react";
import { useState } from "react";
import { Download, FileText, ChevronDown } from "lucide-react";
import {GetUserOrderInvoice} from "../../utils/api/Httproutes"

const MyOrders = ({ orders }) => {
const [open, setOpen] = useState(false);

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500 text-lg">
        You have no orders yet.
      </div>
    );
  }

  const handleDownload = async (userOrder) => {
  try {
    const response = await GetUserOrderInvoice(userOrder.invoice.orderId);

    // Agar response Blob hai
    const blob = new Blob([response], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      userOrder.invoice.fileName || `invoice-${userOrder.invoice.orderId}.pdf`
    );

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url); // memory cleanup
  } catch (err) {
    console.error("Download failed", err);
  }
};


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
<div className="mt-8">
  <div className="bg-white border border-pink-200 rounded-xl shadow-md overflow-hidden">
    {/* Header */}
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full flex items-center justify-between px-6 py-4 text-left"
    >
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-pink-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Invoice Details
        </h3>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>

    {/* Collapsible Content */}
    <div
      className={`transition-all duration-500 ease-in-out ${
        open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="px-6 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Side (Invoice Info) */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Invoice #:</span>{" "}
            {order.invoice.number}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Order ID:</span>{" "}
            {order.invoice.orderId}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Created:</span>{" "}
            {new Date(order.invoice.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Right Side (Download Button) */}
        <div className="pt-2 md:pt-0">
          <button
            onClick={() => handleDownload(order)}
            className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-lg shadow hover:bg-pink-700 transition"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

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
