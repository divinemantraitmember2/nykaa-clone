"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddNewAddressForm from "../userInfo/AddNewAddressForm"
import { increaseQuantity,decreaseQuantity} from "../../slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { GetUserCart,UserAddressDelete,AddToCart,GetUser,UserAddressInCart,CreateUserOrder,payment_verification,payment_fails} from "../../utils/api/Httproutes";


export default function ChooseAddressPage() {
   const [items, setItems] = useState([]);
   const [address, setAddress] = useState([]);
   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
 const [appliedCoupon, setAppliedCoupon] = useState(null);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("address");
  const [showForm, setShowForm] = useState(false);
 const shouldRefetchUserAddress = useSelector((state) => state.user.shouldRefetchUserAddress);

  // Total Price Calculation
  const totalPrice = items.reduce((acc, item) => {
    const price = item.price_inr || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);
  const discount =
    appliedCoupon?.type === "percentage"
      ? (totalPrice * appliedCoupon.discountValue) / 100
      : appliedCoupon?.discountValue || 0;

  const finalTotal = totalPrice - discount;


  

const GetUserCartByUserId = async () => {
    try {
      const response = await GetUserCart();
      const cartItems = response?.data?.items || [];
const AppliedCoupons = response?.data?.appliedCoupons || [];
      if(AppliedCoupons.length>0){
        setAppliedCoupon(AppliedCoupons[0])
      }else{
        setAppliedCoupon(null)
      }
      const formattedItems = cartItems.map((item) => ({
        id: item.sku || item.productName,
        title: item.productName,
        quantity: item.quantity,
        image: item.variants.image_url?.[0] || "",
        price_inr: item.price_inr || 0,
        color: item.variants?.color,
        size: item.size,
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setItems([]);
    }
  };

  const GetUserAdress= async ()=>{
      const RsponsUser=await GetUser()
       if(RsponsUser.status===200 && RsponsUser.data.status===200){
         console.log("RsponsUser",RsponsUser.data.data.address)
        setAddress(RsponsUser.data.data.address)
       }
     
  }

  async function UserAddressDeleteBtn(addressId){
  try {
    const requestUrl = await UserAddressDelete(addressId);
    if(requestUrl.status===200){
      GetUserAdress()
    }
    console.log(requestUrl)
  } catch (error) {
    console.error("Failed to delete address:", error);
  }
};

  const AddUserAdressInCart= async (value,typeFor)=>{
    let paylod={}
     if(typeFor=="payment_method"){
   paylod={
      "property": "payment_method",
      "value": value
    }
    }
    if(typeFor=="address"){
      paylod={
      "property": "address_id",
      "value": value
    }

    }
  
      const Response=await UserAddressInCart(paylod)
       if(Response.status===200 && Response.data.status===200){
         console.log("Response",Response)
         setActiveTab("payment")
         setIsPaymentModalOpen(true)
         if(typeFor=="payment_method"){
          setIsPaymentModalOpen(false)
         }
         
        // setAddress(RsponsUser.data.data.address)
       }
     
  }

  const Continue=()=>{
    AddUserAdressInCart(selectedPaymentMethod,"payment_method")
   
  }

  console.log("shouldRefetchUserAddress")
  useEffect(() => {
    GetUserAdress()
  }, [shouldRefetchUserAddress, dispatch]);


  useEffect(() => {
    GetUserCartByUserId();
    GetUserAdress()
  }, []);


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

const handlePayNow = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Failed to load Razorpay SDK. Please check your connection.");
    return;
  }

  try {
    const OrderPayload = { amount: finalTotal };
    const orderData = await CreateUserOrder(OrderPayload);

    const paymentOrder = orderData?.data?.data?.paymentOrder;
    const orderDetails = orderData?.data?.data?.order;

    console.log("orderData", orderData.data.data);

    const options = {
      key: "rzp_test_kCkFQNmQiStnN5",
      amount: orderDetails.grandTotal * 100,
      currency: "INR",
      name: "Demo Checkout",
      description: orderDetails.email,
      order_id: paymentOrder.id,
      prefill: {
        name: orderDetails.name,
        email: orderDetails.email,
        contact: orderDetails.phone,
      },
      handler: async function (response) {
       
        try {
          const verifyPayload = {
            order_id: orderDetails.orderID,
            cart_id: orderDetails.cartID,
            "razorpay_order_id":response.razorpay_order_id,
            "razorpay_payment_id":response.razorpay_payment_id,
            "razorpay_signature":response.razorpay_signature
          };
          const verifyRes = await payment_verification(verifyPayload);
          console.log("verifyRes",verifyRes)
          if (verifyRes.status === 200) {
            window.location.href = "/profile";
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          console.error("Error during payment verification:", error);
        }
      },
      modal: {
        ondismiss: async function () {
          try {
            const failPayload = {
              order_id: orderDetails.orderID,
              cart_id: orderDetails.cartID,
            };
            const failRes = await payment_fails(failPayload);
            console.log("Payment dismissed, failRes:", failRes);
          } catch (error) {
            console.error("Error handling payment dismissal:", error);
          }
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Error in Razorpay flow:", error);
    alert("Something went wrong during payment. Please try again.");
  }
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
             <div className=" w-full rounded-lg mb-2">
                 {/* Saved Address */}
                 
                 
 {address && address.map((itemAddres, index) => (
  <div key={index} className="border rounded-lg p-4 shadow-sm mb-4">
    <div className="flex justify-between items-center mb-2">
      <div className="text-base font-semibold">
        {itemAddres.isDefault && (
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
          DEFAULT
        </span>
      )}
        <p className="">{itemAddres.firstName} {itemAddres.lastName}</p>
      </div>
      
      <span className=" text-red-500 hover:text-red-700" onClick={()=>UserAddressDeleteBtn(itemAddres.addressID)}><FaTrash size={20} /></span>
    </div>

    <div className="text-sm text-gray-600 whitespace-pre-line mb-1">
      {itemAddres.addressLine1}, {itemAddres.addressLine2}, {itemAddres.city}, {itemAddres.state} - {itemAddres.zipCode}
    </div>

    <div className="text-sm text-gray-600 mb-4">
      Phone: {itemAddres.phoneNumber}
    </div>

    <div className="flex gap-3 lg:w-[80%] mx-auto justify-center">
      <button className="border lg:w-[40%] border-gray-300 text-bold px-4 py-1 lg:py-2 rounded hover:bg-gray-50">
        Edit
      </button>
      <button
        className="bg-pink-600 text-white lg:w-[60%] lg:py-2 text-bold px-4 py-1 rounded hover:bg-pink-700"
        onClick={() => AddUserAdressInCart(itemAddres.addressID,"address")}
      >
        Deliver here
      </button>
    </div>
  </div>
))}
     </div>
        </div>
        {/* Right Sidebar */}
        <div className="relative lg:w-[100%]">
          <div className="sticky top-6">
            <div className="space-y-4 bg-white p-2 lg:p-4 max-h-[90vh] overflow-y-auto rounded shadow-sm">
              <div className=" rounded-lg overflow-hidden ">
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
                Price: <span className="font-medium">₹{item.price_inr}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 line-through">
                ₹{item.price_inr * item.quantity}
              </p>
              <p className="font-semibold text-gray-900">
                ₹{item.price_inr * item.quantity}
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
                    <span className="font-medium text-gray-700">₹ {finalTotal}</span>
                  </summary>

                  <div className="bg-green-100 text-green-700 text-sm px-4 py-2 font-medium">
                    {appliedCoupon && (
            <div className="flex justify-between text-gray-700 mb-2">
              <span> Coupon Discount ({appliedCoupon.code})</span>
              <span className="text-red-600">
                − ₹
                {appliedCoupon.type === "percentage"
                  ? ((totalPrice * appliedCoupon.discountValue) / 100).toFixed(2)
                  : appliedCoupon.discountValue.toFixed(2)}
              </span>
            </div>
          )} You are saving 
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
            <div className="space-y-4 bg-white p-2 lg:p-2  rounded shadow-sm">
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
        className="flex items-start gap-2 rounded p-2 bg-white shadow-sm"
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
                Price: <span className="font-medium">₹{item.price_inr}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 line-through">
                ₹{item.price_inr * item.quantity}
              </p>
              <p className="font-semibold text-gray-900">
                ₹{item.price_inr * item.quantity}
              </p>
              <p className="text-xs text-gray-500 mt-1">finalTotal</p>
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
                    <span className="font-medium text-gray-700">₹ {finalTotal}</span>
                  </summary>
                  <div className="bg-green-100 text-green-700 text-sm px-4 py-2 font-medium">
                    You are saving 
                  </div>
                </details>
              </div>
                {/* <div className="border rounded-lg overflow-hidden shadow-sm">
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
                </div> */}
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 flex items-start gap-3">
                <button className="bg-pink-600 text-white lg:w-[40%] mx-auto lg:py-4 text-bold px-4 py-1 rounded hover:bg-pink-700"
                    onClick={() => handlePayNow()}
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

 {isPaymentModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
      <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
      
      <div className="flex flex-col gap-3">
        {["COD", "Razorpay", "UPI"].map((method) => (
          <label key={method} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selectedPaymentMethod === method}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            {method}
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          onClick={Continue}
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
