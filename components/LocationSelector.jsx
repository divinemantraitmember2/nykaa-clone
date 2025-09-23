"use client";
import { useState, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import Link from "next/link";
import { useSelector,useDispatch } from "react-redux";
import { openLoginModal} from "../slices/userSlice";
import {
  ChangeCourierPincodeServiceability,
  GetUser,
  ChooseLocationByChangeAdress
} from "../utils/api/Httproutes";
import { useSession } from "next-auth/react";

export default function LocationSelector() {
  const { status } = useSession();
  const dispatch = useDispatch();

  const [addressList, setAddress] = useState([]);
  const [location, setLocation] = useState({ city: "", pincode: "" });
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [inputPin, setInputPin] = useState("");
    const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  // 📌 Fetch User Address
  const GetUserAdress = async () => {
    try {
      const RsponsUser = await GetUser();
      if (RsponsUser.status === 200 && RsponsUser.data.status === 200) {
        const addresses = RsponsUser.data.data.address || [];
        setAddress(addresses);

        if (addresses.length > 0) {
          const defaultAddr =
            addresses.find((a) => a.isDefault) || addresses[0];

          setSelectedAddress(defaultAddr); // pura object store
          setLocation({
            city: defaultAddr.city,
            pincode: defaultAddr.zipCode,
          });
          setInputPin(defaultAddr.zipCode);
        }
      }
    } catch (err) {
      console.error("Error fetching user address:", err);
    }
  };

  useEffect(() => {
    console.log("shippingAddress",shippingAddress)
    if (status === "authenticated") {
      GetUserAdress();
    }
  }, [status]);

  // 📌 Apply Pincode
  const handleApply = async () => {
    if (inputPin.length !== 6) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    try {
      const res = await ChangeCourierPincodeServiceability(inputPin);
      const data = res.data;

      if (data.status === 200) {
        const postOffice = data.data;
        setLocation({
          city: postOffice.city,
          pincode: postOffice.zipCode,
        });

        setOpen(false);
      } else {
        alert("Invalid Pincode");
      }
    } catch (err) {
      console.error("Error fetching location:", err);
      alert("Unable to fetch city for this pincode");
    }
  };

  // 📌 Address Selection
  const handleSelectAddress = (addr) => {
    console.log("✅ Selected Address Object:", addr);
    setSelectedAddress(addr); // pura object store
    setLocation({
      city: addr.city,
      pincode: addr.zipCode,
    });
    setInputPin(addr.zipCode);
    setOpen(false);
    let shipping_address = {
  addressID: addr.addressID,
  addressLine1: addr.addressLine1,
  addressLine2:addr.addressLine2,
  city: addr.city,
  country: addr.country,
  firstName:addr.firstName,
  isDefault: false,
  isVerified:true,
  landMark:addr.landMark ,
  lastName:addr.lastName,
  phoneNumber: addr.phoneNumber,
  state:addr.state,
  zipCode:addr.zipCode
};

    ChangeAddress(shippingAddress?.id,shippingAddress?.userID,shipping_address)
  };


  async function ChangeAddress(CartId,UserId,address){
    try{
      const response= await ChooseLocationByChangeAdress(CartId,UserId,address)
      console.log("response",response)
    }catch(error){
      console.log("response error",error)
    }
  }


  return (
    <div className="relative">
      {/* Display Location */}
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 cursor-pointer hover:text-pink-600"
      >
        <MapPin size={18} />
        <div>
          <p className="text-xs text-gray-500">Deliver to</p>
          <p className="font-semibold text-sm">
            {location.city || "Select Location"} {location.pincode}
          </p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#f0f2f2]/20 z-50">
          <div className="bg-white w-[430px] rounded-lg shadow-lg relative">
            {/* Header */}
            <div className="bg-[#f0f2f2] p-2 flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Choose your location</h2>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-gray-600 hover:text-black" />
              </button>
            </div>

            <div className="p-2">
              <p className="text-sm text-gray-500 mt-3">
                Select a delivery location to see product availability and
                delivery options
              </p>

              {/* Authenticated Users - Address List */}
              {status === "authenticated" ? (
                <div>
                  {addressList.map((addr) => (
                    <div
                      key={addr.addressID}
                      onClick={() => handleSelectAddress(addr)}
                      className={`border rounded-md p-3 mt-4 cursor-pointer ${
                        selectedAddress?.addressID === addr.addressID
                          ? "border-pink-500 bg-pink-50"
                          : "hover:border-pink-500"
                      }`}
                    >
                      <p className="text-sm">
                        <span className="font-bold">
                          {addr.firstName} {addr.lastName}
                        </span>
                        <br />
                        {addr.addressLine1}
                        {addr.addressLine2 && `, ${addr.addressLine2}`}{" "}
                        {addr.landMark && `, ${addr.landMark}`}
                        <br />
                        {addr.city}, {addr.state} - {addr.zipCode}
                      </p>
                      {addr.isDefault && (
                        <p className="text-xs text-gray-500 mt-1">
                          Default address
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="my-2">
                    <Link href="/checkout">
                      <button className="text-sm text-pink-600 hover:underline">
                        Add an address or pick-up point
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="my-5 flex justify-center">
                  <button
                    onClick={() => dispatch(openLoginModal())}
                    className="text-sm text-white p-2 hover:underline bg-[#0e1527]"
                  >
                    Sign in to see your addresses
                  </button>
                </div>
              )}

              <div className="my-2 border-t"></div>

              {/* Pincode Input */}
              <div>
                <p className="text-sm font-medium mb-2">
                  Enter An Indian Pincode
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputPin}
                    onChange={(e) => setInputPin(e.target.value)}
                    maxLength={6}
                    placeholder="Enter Pincode"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={handleApply}
                    className="bg-pink-600 text-white px-4 rounded hover:bg-pink-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
