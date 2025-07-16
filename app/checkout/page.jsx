"use client";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import AddNewAddressForm from "../../components/userInfo/AddNewAddressForm"
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../slices/cartSlice";

export default function ChooseAddressPage() {
   const { items } = useSelector((state) => state.cart);
   const totalPrice = items.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
 const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("address");
  const [showForm, setShowForm] = useState(false);
  

  const address = {
    name: "Ravi",
    address: "606 kasia kushinagar, Uttar Pradesh\nKushinagar-274402",
    phone: "8840473290",
    isDefault: true,
  };

  
 
  return (
    <div className="bg-[#f3f3f3] min-h-screen px-2 md:px-12 py-4 lg:py-10">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-8 gap-6">
        {["address", "payment"].map((step, i) => (
          <div
  key={i}
  className="flex items-center gap-2 cursor-pointer"
  onClick={step === "payment" ? undefined : () => setActiveTab(step)}
>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold ${
                activeTab === step ? "bg-pink-600" : "bg-gray-300"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                activeTab === step ? "text-pink-600" : "text-gray-600"
              }`}
            >
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </span>
            {i < 1 && <div className="border-t border-gray-300 w-8 sm:w-16" />}
          </div>
        ))}
      </div>


      {/* Layout */}
     {activeTab === "address" && (  
<>
<div className="w-full flex justify-start px-4">
  <div className="py-1">
     <h1 className="text-2xl font-bold text-gray-900 mb-1"> Choose Address</h1>
              <p className="text-gray-500 text-sm mb-6">
                Detailed address will help our delivery partner reach your
                doorstep quickly
              </p>
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left Column */}
        <div className="  p-2 lg:p-4  lg:w-[100%]">
             <div className="w-full bg-white rounded-lg mb-2 p-2">
              <div
                className="border-2 border-dashed border-pink-500 rounded-lg p-6 text-center text-pink-600 font-medium mb-4 cursor-pointer hover:bg-pink-50"
                onClick={() => setShowForm(!showForm)}
              >
                <span className="text-3xl">+</span>
                <p>Add New Address</p>
              </div>

              {/* Form */}
              {showForm && (
                <div className="">
                  <AddNewAddressForm onClose={() => setShowForm(false)} />
                </div>
                
              )}
             </div>
             <div className=" w-full bg-white rounded-lg mb-2">
                 {/* Saved Address */}
              <div className="border rounded-lg p-4 shadow-sm mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-base font-semibold">{address.name}</div>
                  {address.isDefault && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 whitespace-pre-line mb-1">
                  {address.address}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {address.phone}
                </div>
                <div className="flex gap-3 lg:w-[80%] mx-auto justify-center">
                  <button className="border lg:w-[40%] border-gray-300 text-bold px-4 py-1 lg:py-3 rounded hover:bg-gray-50">
                    Edit
                  </button>
                  <button
                    className="bg-pink-600 text-white lg:w-[60%] lg:py-3 text-bold px-4 py-1 rounded hover:bg-pink-700"
                    onClick={() => setActiveTab("payment")}
                  >
                    Deliver here
                  </button>
                </div>
              </div>
             </div>

         
        </div>
        {/* Right Sidebar */}
        <div className="relative lg:w-[100%]">
          <div className="sticky top-6">
            <div className="space-y-4 bg-white p-2 lg:p-4 max-h-[90vh] overflow-y-auto rounded-lg shadow-sm">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <details className="group" open>
                  <summary className="flex justify-between items-center cursor-pointer px-4 py-3 bg-white font-semibold text-gray-800">
                    <span>Bag</span>
                    <div className="flex items-center gap-3 text-sm">
                      <span>{items.length} Items</span>
                      <span className="text-pink-600 font-medium">Edit</span>
                    </div>
                  </summary>
                  <div className="px-4 py-3 bg-gray-50 space-y-4">
  {items.length === 0 ? (
    <p className="text-gray-500">Your cart is empty.</p>
  ) : (
    items.map((item, i) => (
      <div
        key={i}
        className="flex items-start gap-4 border rounded-lg p-3 bg-white shadow-sm"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-20 object-cover rounded-md border"
        />

        <div className="flex-1 text-sm">
          <p className="font-semibold text-gray-800 line-clamp-2 mb-1">
            {item.title}
          </p>

          <div className="flex justify-between items-center text-gray-700">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>Qty:</span>
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold hover:bg-gray-300"
                >
                  −
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p>
                Price: <span className="font-medium">₹{item.price}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 line-through">
                ₹{item.price * item.quantity}
              </p>
              <p className="font-semibold text-gray-900">
                ₹{item.price * item.quantity}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total</p>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

                </details>
              </div>

              <div className="border rounded-lg overflow-hidden shadow-sm">
                <details className="group" >
                  <summary className="flex justify-between items-center cursor-pointer px-4 py-3 bg-white font-semibold text-gray-800">
                    <span>Price Details</span>
                    <span className="font-medium text-gray-700">₹ {totalPrice}</span>
                  </summary>
                  <div className="bg-green-100 text-green-700 text-sm px-4 py-2 font-medium">
                    You are saving 
                  </div>
                </details>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      </>

     )}

{activeTab === "payment" && (
<div className="grid grid-cols-1 md:grid-cols-1 lg:w-[70%] mx-auto">
<div className="px-2">

   <div className="relative lg:w-[100%]">
          <div className="sticky top-6">
            <div className="space-y-4 bg-white p-2 lg:p-4 max-h-[90vh] overflow-y-auto rounded-lg shadow-sm">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <details className="group" open>
                  <summary className="flex justify-between items-center cursor-pointer px-4 py-3 bg-white font-semibold text-gray-800">
                    <span>Bag</span>
                    <div className="flex items-center gap-3 text-sm">
                      <span>{items.length} Items</span>
                      <span className="text-pink-600 font-medium">Edit</span>
                    </div>
                  </summary>
                  <div className="px-4 py-3 bg-gray-50 space-y-4">
  {items.length === 0 ? (
    <p className="text-gray-500">Your cart is empty.</p>
  ) : (
    items.map((item, i) => (
      <div
        key={i}
        className="flex items-start gap-4 border rounded-lg p-3 bg-white shadow-sm"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-20 object-cover rounded-md border"
        />
        <div className="flex-1 text-sm">
          <p className="font-semibold text-gray-800 line-clamp-2 mb-1">
            {item.title}
          </p>

          <div className="flex justify-between text-gray-700">
            <div>
              <p>
                Qty: <span className="font-medium">{item.quantity}</span>
              </p>
              <p>
                Price: <span className="font-medium">₹{item.price}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 line-through">
                ₹{item.price * item.quantity}
              </p>
              <p className="font-semibold text-gray-900">
                ₹{item.price * item.quantity}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total</p>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

                </details>
              </div>

              <div className="border rounded-lg overflow-hidden shadow-sm">
                <details className="group" open>
                  <summary className="flex justify-between items-center cursor-pointer px-4 py-3 bg-white font-semibold text-gray-800">
                    <span>Price Details</span>
                    <span className="font-medium text-gray-700">₹ {totalPrice}</span>
                  </summary>
                  <div className="bg-green-100 text-green-700 text-sm px-4 py-2 font-medium">
                    You are saving 
                  </div>
                </details>
              </div>
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <details className="group" >
                    <summary className="px-4 py-3 bg-white cursor-pointer text-sm font-medium text-gray-800">
                      Deliver To
                    </summary>
                    <div className="bg-gray-50 px-4 py-3 text-sm text-gray-700">
                      Ravi<br />
                      606 kasia kushinagar, Uttar Pradesh<br />
                      Kushinagar - 274402<br />
                      Phone: 8840473290
                    </div>
                  </details>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 flex items-start gap-3">
                <button className="bg-pink-600 text-white lg:w-[40%] mx-auto lg:py-4 text-bold px-4 py-1 rounded hover:bg-pink-700"
                    // onClick={() => setActiveTab("payment")}
                  >
                    Pay Now
                  </button>
              </div>
              
            </div>
          </div>
        </div>
  
</div>
</div>
 )}

    </div>
  );
}
