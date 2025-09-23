"use client";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { GetCourierPincodeServiceability } from "../utils/api/Httproutes";

export default function SearchLocation({sku}) {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // ✅ API result
  const [loading, setLoading] = useState(false);

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
      const res = await GetCourierPincodeServiceability(sku,pincode);
      console.log("API Response:", res);

      if (res?.status === 200) {
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
                  <p className="font-medium">
                    ✅ Delivery available at <strong>{result.pincode}</strong>
                  </p>
                  {result.cod && <p>💳 COD Available</p>}
                  {result.prepaid && <p>📦 Prepaid Available</p>}
                  {result.shipping_charge !== undefined && (
                    <p>💰 Shipping: ₹{result.shipping_charge}</p>
                  )}
                </>
              ) : (
                <p className="font-medium">
                  ❌ Sorry, delivery not available at{" "}
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
