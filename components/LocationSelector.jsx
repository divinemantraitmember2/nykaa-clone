"use client";
import { useState } from "react";
import { MapPin, X } from "lucide-react";
import Link from "next/link";

export default function LocationSelector() {
  const [location, setLocation] = useState({ city: "Ghaziabad", pincode: "201011" });
  const [open, setOpen] = useState(false);
  const [inputPin, setInputPin] = useState(location.pincode);

  // 📌 Apply pincode
  const handleApply = async () => {
    if (inputPin.length !== 6) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }   

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${inputPin}`);
      const data = await res.json();
console.log("data",data)
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setLocation({
          city: postOffice.District,    
          pincode: inputPin,
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
            {location.city} {location.pincode}
          </p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 -top-30 flex items-center justify-center  z-50">
          <div className="bg-white w-[430px] rounded-lg shadow-lg p-3 relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Choose your location</h2>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* Subtext */}
            <p className="text-sm text-gray-500 mt-3">
              Select a delivery location to see product availability and delivery options
            </p>

            {/* Default Address */}
            <div className="border rounded-md p-3 mt-4 hover:border-pink-500 cursor-pointer">
              <p className="text-sm">
                <span className="font-bold">Ravi Kumar</span> metro sector 18, Noida UTTAR
                PRADESH 201301
              </p>
              <p className="text-xs text-gray-500 mt-1">Default address</p>
            </div>

            {/* Add Address */}
            <div className="mt-4">
  <Link href="/checkout">
    <button className="text-sm text-pink-600 hover:underline">
      Add an address or pick-up point
    </button>
  </Link>
</div>

            {/* Divider */}
            <div className="my-4 border-t"></div>

            {/* Pincode Input */}
            <div>
              <p className="text-sm font-medium mb-2">or enter an Indian pincode</p>
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
      )}
    </div>
  );
}
