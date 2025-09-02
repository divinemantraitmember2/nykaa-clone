"use client";

import { useEffect, useState } from "react";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { FaRegCreditCard, FaPen } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { MdOutlineLocationOn, MdOutlineShoppingBag } from "react-icons/md";
import { GetUserOrder, GetUser,GetUserWhish } from "../../utils/api/Httproutes";
import MyOrders from "../../components/userInfo/MyOrders";
import UserWishlist from "../../components/userInfo/UserWishlist";

export default function ProfilePage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedTab, setSelectedTab] = useState("My Orders");
  const [UserOrders, setUserOrders] = useState([]);
  const [UserWishList, setUserWishList] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState({ orders: false, profile: false });
  const [error, setError] = useState({ orders: null, profile: null });

  async function fetchOrders() {
    setLoading(prev => ({ ...prev, orders: true }));
    setError(prev => ({ ...prev, orders: null }));
    try {
      const response = await GetUserOrder();
      if (response?.status === 200 && response.data?.status === 200) {
        setUserOrders(response.data.data?.orders || []);
      } else {
        setUserOrders([]);
        setError(prev => ({ ...prev, orders: "Failed to load orders." }));
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setUserOrders([]);
      setError(prev => ({ ...prev, orders: "Something went wrong while fetching orders." }));
    } finally {
      setLoading(prev => ({ ...prev, orders: false }));
    }
  }

  async function GetUserProfile() {
    setLoading(prev => ({ ...prev, profile: true }));
    setError(prev => ({ ...prev, profile: null }));
    try {
      const response = await GetUser();
      if (response?.status === 200 && response.data?.status === 200) {
        setUserInfo(response.data?.data || {});
        setAddresses(response.data?.data?.address || []);
      } else {
        setUserInfo({});
        setAddresses([]);
        setError(prev => ({ ...prev, profile: "Failed to load profile." }));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setUserInfo({});
      setAddresses([]);
      setError(prev => ({ ...prev, profile: "Something went wrong while fetching profile." }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  }

  async function UserWishedList(){
    try{

     const Respose=await GetUserWhish()

     if(Respose.status===200 && Respose?.data?.code===200){
      if(Respose?.data?.data && Respose?.data?.data.length>0){
        setUserWishList(Respose?.data?.data)
      }else{
      setUserWishList([])
      }
      
      console.log("Respose",Respose?.data?.data)
     }
    }catch(error){

    }

  }


  useEffect(() => {
    fetchOrders();
    GetUserProfile();
    UserWishedList()
  }, []);

 

  const MyPayment = () => (
    <div>
      <h2 className="text-lg font-bold">Saved Payment Methods</h2>
      <p>No saved cards.</p>
    </div>
  );

  const sidebarItems = [
    { label: "My Orders", icon: <MdOutlineShoppingBag size={18} /> },
    { label: "My Wishlist", icon: <FiHeart size={18} /> },
    { label: "My Saved Payment", icon: <FaRegCreditCard size={18} /> },
    { label: "Log Out", icon: <FiLogOut size={18} /> },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "My Wishlist":
        return <UserWishlist wishlistData={UserWishList} />;
      case "My Saved Payment":
        return <MyPayment />;
      case "My Orders":
        return loading.orders
          ? <p className="p-4 text-gray-500">Loading orders...</p>
          : error.orders
          ? <p className="lg:p-4 text-red-500">{error.orders}</p>
          : <MyOrders orders={UserOrders || []} />;
      default:
        return null;
    }
  };

  return (
    <main className="bg-[#f4f4f4] min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto lg:px-4  py-6 gap-4">
        {/* Sidebar */}
        <div className="lg:w-[300px] w-full">
          <aside
            className="lg:sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto 
                       w-full whitespace-nowrap flex lg:flex-col gap-1 px-4 py-2 bg-white rounded shadow-sm"
          >
            {sidebarItems.map((item, idx) => {
              const isSelected = selectedTab === item.label;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-4 py-3 text-sm border rounded-md min-w-fit 
                    ${isSelected ? "bg-pink-100 text-pink-700" : "text-gray-700 hover:bg-gray-50 cursor-pointer"}`}
                  onClick={() => {
                    if (item.label === "Log Out") {
                      signOut({ callbackUrl: "/" });
                    } else {
                      setSelectedTab(item.label);
                    }
                  }}
                >
                  {item.icon}
                  {item.label}
                </div>
              );
            })}
          </aside>
        </div>

        {/* Main Content */}
        <section className="w-full">
          {/* My Profile Always Active */}
          <div className="bg-white rounded shadow-sm mb-2 px-4 py-6">
            {loading.profile ? (
              <p className="text-gray-500">Loading profile...</p>
            ) : error.profile ? (
              <p className="text-red-500">{error.profile}</p>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 relative">
                  <button className="absolute top-2 right-2 text-sm text-gray-600 flex items-center gap-1 hover:text-pink-600">
                    <FaPen /> Edit
                  </button>
                  <img
                    src="/images/no-profile.jpeg"
                    alt="user"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-bold capitalize">
                      {UserInfo?.firstName || "Guest"} {UserInfo?.lastName || ""}
                    </h2>
                    <div className="text-sm mt-1 text-gray-700">
                      <p>
                        <span className="font-semibold">Email:</span> {UserInfo?.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Mobile:</span> {UserInfo?.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Date of Birth:</span> {UserInfo?.dob || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 mb-4 gap-2">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MdOutlineLocationOn className="text-xl" /> MY ADDRESSES
                  </h2>
                </div>
                {addresses.length === 0 ? (
                  <div className="p-6 bg-white border rounded shadow-sm text-gray-700">
                    No Address Found
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                )}
              </>
            )}
          </div>

          {/* Other Tabs */}
          <div className="bg-white rounded shadow-sm">
            {renderContent()}
          </div>
        </section>
      </div>
    </main>
  );
}
