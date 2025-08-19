"use client";

import { useEffect, useState } from "react";
import OrderSuccess from "../../components/userInfo/OrderSuccessPage";
import { GetUserOrderSuccess } from "../../utils/api/Httproutes";

export default function OrderSuccessPage({ searchParams }) {
  const orderId =  searchParams?.orderId;
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    const GetOrderDetails = async () => {
      try {
        const response = await GetUserOrderSuccess(orderId);
        
        if (response?.status === 200 && response?.data?.code === 200) {
            if(response.data.data.orders !=null && response.data.data.orders.length>0){
          console.log("response",response.data.data.orders)
          setOrderData(response.data.data.orders);
            }else{
              setOrderData([]);  
            }
          
        } else {
            setOrderData([]);  
          setError("Failed to fetch order details");
        }
      } catch (err) {
        setOrderData([]);  
        console.error("OrderSuccessPage error:", err.message);
        setError("Something went wrong while fetching order details");
      }
    };

    GetOrderDetails();
  }, [orderId]);


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="bg-red-100 text-red-600 px-6 py-4 rounded-lg shadow">
          {error}
        </p>
      </div>
    );
  }


  return (
    <>
   { 
   orderData && orderData.length>0?(
   <OrderSuccess data={orderData} />
   ):(<>
       <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">⏳ Loading order details...</p>
      </div>
   </>)} 
    </>
  );
}
