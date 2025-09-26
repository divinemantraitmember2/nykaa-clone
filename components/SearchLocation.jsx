"use client";
import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { GetCourierPincodeServiceability } from "../utils/api/Httproutes";
import {SeachPineSet } from "../slices/cartSlice";
import {useSelector ,useDispatch } from "react-redux";

export default function SearchLocation({sku}) {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // ✅ API result
  const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
     const SearchPine = useSelector((state) => state.cart.SearchPine);

  const handleCheck = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      setResult(null);
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await GetCourierPincodeServiceability(sku,pincode,"");
      console.log("API Response:", res);
      if (res?.status === 200) {
        dispatch(SeachPineSet(pincode))
        setResult({
          deliverable: true,
          ...res.data,
        });
      } else {
        setResult({
          deliverable: false,
          message: res?.message || "Not Deliverable",
        });
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePincode = () => {
    setPincode("");
    setResult(null);
    setError("");
  };

  async function GetLocation(getbypine){
    try{
       const res = await GetCourierPincodeServiceability(sku,getbypine,"set");
      console.log("API Response///:", res.data.data);
      if (res?.status === 200) {
        setResult({
          deliverable: true,
          ...res.data.data,
        });
      } else {
        setResult({
          deliverable: false,
          message: res?.message || "Not Deliverable",
        });
      }

    }catch(error){

    }
  }

  useEffect(()=>{
    GetLocation(SearchPine)
  },[])
  return (
    <div className="max-w-7xl mx-auto px-2 py-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="w-full lg:w-auto flex flex-col">
          <div className="mb-2">
            <h3 className="text-lg text-start font-semibold text-gray-800 mb-2">
              Select Delivery Location
            </h3>
            <p className="text-start text-gray-600 font-medium">
              Enter the pincode of your area to check product availability and
              delivery options
            </p>
          </div>

          <div className="flex items-center gap-1 mb-2 text-gray-700 font-semibold text-sm">
            <MdLocationOn className="text-xl text-gray-600" />
            <span>Delivery Options</span>
          </div>

          {/* Input + Button */}
          {!result && (
            <div className="relative w-full sm:w-[300px]">
              <input
                type="text"
                placeholder="Enter pincode"
                className="border py-3 px-4 pr-16 text-sm w-full rounded"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button
                onClick={handleCheck}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e80071] font-medium text-sm hover:underline"
              >
                {loading ? "Checking..." : "Check"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && <span className="text-xs text-red-600 mt-1">{error}</span>}

          {/* ✅ API Result */}
          {result && (
            <div
              className={`mt-3 p-3 border rounded text-sm ${
                result.deliverable
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-red-50 border-red-300 text-red-700"
              }`}
            >
              {result.deliverable ? (
                <>
                  <div className="mt-1 p-2 bg-white  border-gray-200">
  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
    ✅ Delivery Available
    <span className="text-sm font-medium text-pink-600">
      {result.city} - {result.zipCode}
    </span>
  </h3>

  <div className="space-y-2 text-gray-700 text-sm">
    
    <div className="flex items-center justify-between">
      <span className="font-medium">Estimated Delivery</span>
      <span className="text-gray-900">{result.estimated_delivery}</span>
    </div>

    <div className="flex items-center justify-between">
      <span className="font-medium"> City</span>
      <span className="text-gray-900">{result.city}</span>
    </div>

    {result.cod_available && (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2 rounded-md">
        <span className="font-medium text-green-700">COD Available</span>
      </div>
    )}
  </div>
</div>
</>
              ) : (
                <p className="font-medium">
                 Sorry, delivery not available at{" "}
                  <strong>{pincode}</strong>
                </p>
              )}

              {/* Change Pincode Link Style */}
              <button
                onClick={handleChangePincode}
                className="mt-2 text-sm text-[#e80071] font-medium hover:underline inline-block"
              >
                ✏️ Change Pincode
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
