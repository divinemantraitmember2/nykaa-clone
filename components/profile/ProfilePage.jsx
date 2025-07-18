"use client";

import { useState } from "react";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { FaRegCreditCard, FaPen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { MdOutlineLocationOn, MdOutlineShoppingBag } from "react-icons/md";

export default function ProfilePage() {
  const [addresses] = useState([]);
  const [selectedTab, setSelectedTab] = useState("My Profile");

  const user = {
    name: "ravi",
    email: "ravi@gmail.com",
    mobile: "8840473290",
    dob: "dd/mm/yyyy",
    avatar: "/images/no-profile.jpeg",
  };

const MyOrders = () => <div><h2 className="text-lg font-bold">My Orders</h2><p>No orders yet.</p></div>;
const MyWishlist = () => <div><h2 className="text-lg font-bold">My Wishlist</h2><p>No items in wishlist.</p></div>;
const MyPayment = () => <div><h2 className="text-lg font-bold">Saved Payment Methods</h2><p>No saved cards.</p></div>;


  const sidebarItems = [
    { label: "My Profile", icon: <CgProfile size={18} /> },
    { label: "My Orders", icon: <MdOutlineShoppingBag size={18} /> },
    { label: "My Wishlist", icon: <FiHeart size={18} /> },
    { label: "My Saved Payment", icon: <FaRegCreditCard size={18} /> },
    { label: "Log Out", icon: <FiLogOut size={18}  /> },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "My Wishlist":
        return <MyWishlist />;
      case "My Saved Payment":
        return <MyPayment />;
      case "My Orders":
      default:
        return <MyOrders Orders={"order"} />;
    }
  };

  return (
    <main className="bg-[#f4f4f4] min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 py-6 gap-4">
        
        {/* Sidebar */}
        <aside className="lg:w-[300px] w-full lg:sticky top-24 overflow-x-auto lg:overflow-visible whitespace-nowrap flex lg:flex-col gap-1 px-4 py-2 bg-white rounded shadow-sm">
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-4 py-3 text-sm border rounded-md cursor-pointer min-w-fit 
                ${selectedTab === item.label ? "bg-pink-100 text-pink-700" : "text-gray-700 hover:bg-gray-50"}`}
              onClick={
                item.label === "Log Out"
                  ? () => signOut({ callbackUrl: "/" })
                  : () => setSelectedTab(item.label)
              }   
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </aside>

        {/* Main Content */}
       
        <section className=" w-full ">
          <div className=" bg-white rounded shadow-sm mb-2 px-4 py-6">
          {/* User Details */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 relative">
            <button className="absolute top-2 right-2 text-sm text-gray-600 flex items-center gap-1 hover:text-pink-600">
              <FaPen /> Edit
            </button>

            <img
              src={user.avatar}
              alt="user"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <h2 className="text-lg font-bold capitalize">{user.name}</h2>
              <div className="text-sm mt-1 text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                  <span className="text-pink-600 ml-2 cursor-pointer font-medium">Verify</span>
                </p>
                <p>
                  <span className="font-semibold">Mobile:</span> {user.mobile}
                </p>
                <p>
                  <span className="font-semibold">Date of Birth:</span> {user.dob}
                </p>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 mb-4 gap-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MdOutlineLocationOn className="text-xl" /> MY ADDRESSES
            </h2>
            <button className="text-gray-600 hover:text-pink-600 text-sm flex items-center gap-1">
              ✎ ADD NEW ADDRESS
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="p-6 bg-white border rounded shadow-sm text-gray-700">
              No Address Found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
            </div>
          )}
        </div>

        <div className=" bg-white rounded shadow-sm px-4 py-6">
          {renderContent()}

        </div>

        </section>
        
        
          

      </div>
    </main>
  );
}
