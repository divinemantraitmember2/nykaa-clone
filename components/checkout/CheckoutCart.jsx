"use client";
import { useState } from "react";

export default function CheckoutCart() {
  let cartData = {
    address: {
      name: "Ravi Kumar",
      pincode: "274402",
      fullAddress:
        "Belwa Ram Js Kasia Kushinagar, Belwa Ram Js Kasia Kushinagar, Kasia, Kushinagar",
    },
    items: [
      {
        id: 1,
        brand: "NOBERO",
        title:
          "Graphic Printed Drop-Shoulder Sleeves Pure Cotton Oversized T-shirt",
        seller: "PRATYAYA E COMMERCE PRIVATE LIMITED",
        size: "M",
        qty: 1,
        price: 1799,
        discountedPrice: 429,
        discount: 1370,
        image: "https://assets.myntassets.com/fake-tshirt.png",
        deliveryDate: "3 Oct - 5 Oct",
      },
    ],
    priceDetails: {
      totalMRP: 1799,
      discountOnMRP: 1370,
      couponDiscount: 0,
      platformFee: 0,
      totalAmount: 429,
    },
  };

  const [selectedItems, setSelectedItems] = useState(
    cartData.items.map((item) => item.id)
  );

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-4">
        {/* Address */}
        <div className="border rounded-md p-4 bg-[#fff4f4]">
          <div className="">
            <p className="font-semibold text-sm">
            Deliver to: {cartData.address.name},{" "}
            <span className="font-medium">{cartData.address.pincode}</span>
          </p>
          <p className="text-gray-700 text-sm mt-1">
            {cartData.address.fullAddress}
          </p>
          </div>
          <button className="mt-2 px-3 py-1 text-xs border border-gray-400 rounded font-medium hover:bg-gray-100">
            CHANGE ADDRESS
          </button>
        </div>

        {/* Offers */}
        <div className="border rounded-md p-4">
          <p className="font-semibold text-sm mb-1">Available Offers</p>
          <p className="text-xs text-gray-600">
            • 10% Instant Discount on HDFC Bank Credit Card, Credit Card EMI &
            Debit Card EMI on a min spend of ₹3,500. TCA
          </p>
          <button className="text-[#ff3f6c] text-xs mt-1">Show More</button>
        </div>

        {/* Items */}
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm">
              {selectedItems.length}/{cartData.items.length} ITEMS SELECTED
            </p>
            <div className="flex gap-4 text-xs font-medium text-[#ff3f6c]">
              <button>REMOVE</button>
              <button>MOVE TO WISHLIST</button>
            </div>
          </div>

          {cartData.items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 border-t pt-3 first:border-none"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
                className="mt-2 accent-[#ff3f6c]"
              />
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-24 object-cover rounded border"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.brand}</p>
                <p className="text-xs text-gray-600">{item.title}</p>
                <p className="text-[11px] text-gray-500">
                  Sold by: {item.seller}
                </p>

                <div className="flex gap-4 mt-2 text-xs">
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.qty}</p>
                </div>

                <div className="mt-1 text-sm">
                  <span className="font-semibold">
                    ₹{item.discountedPrice}
                  </span>
                  <span className="ml-2 line-through text-gray-400 text-xs">
                    ₹{item.price}
                  </span>
                  <span className="ml-2 text-[#ff3f6c] text-xs font-medium">
                    {item.discount} OFF
                  </span>
                </div>

                <p className="text-green-600 text-xs mt-2">
                  ✔ Delivery between {item.deliveryDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="border rounded-md p-4 space-y-4 h-fit">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm">COUPONS</p>
          <button className="text-[#ff3f6c] text-xs font-medium">APPLY</button>
        </div>

        <div className="border-t pt-3">
          <p className="font-semibold text-sm mb-2">
            SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
          </p>
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" className="accent-[#ff3f6c]" />
            <span className="text-xs">Donate and make a difference</span>
          </div>
          <div className="flex gap-2">
            {["₹10", "₹20", "₹50", "₹100"].map((amt) => (
              <button
                key={amt}
                className="px-3 py-1 border rounded text-xs hover:bg-gray-100"
              >
                {amt}
              </button>
            ))}
          </div>
        </div>

        {/* Price Details */}
        <div className="border-t pt-2 text-xs space-y-1">
          <p className="font-semibold text-sm mb-2">
            PRICE DETAILS ({cartData.items.length} Item)
          </p>
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹{cartData.priceDetails.totalMRP}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount on MRP</span>
            <span>-₹{cartData.priceDetails.discountOnMRP}</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount</span>
            <button className="text-[#ff3f6c]">Apply Coupon</button>
          </div>
          <div className="flex justify-between">
            <span>Platform & Event Fee</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 text-sm">
            <span>Total Amount</span>
            <span>₹{cartData.priceDetails.totalAmount}</span>
          </div>
        </div>

        <button className="w-full py-3 bg-[#ff3f6c] text-white font-semibold rounded-md text-sm">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}
