"use client";

import { useState, useEffect } from "react";
import { GetCoupons, GetCouponsDeatils } from "../../utils/api/Httproutes";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ Fetch all coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await GetCoupons();
        if (res.status === 200 && res?.data?.code === 200) {
          setCoupons(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Fetch coupon details by ID
  const handleSeeDetails = async (id) => {
    try {
      setDetailsLoading(true);
      setDrawerOpen(true);
      setSelectedCoupon(null); // clear old
      const res = await GetCouponsDeatils(id);
      if (res.status === 200 && res?.data?.code === 200) {
        setSelectedCoupon(res?.data?.data[0]);
      }
    } catch (error) {
      console.error("Error fetching coupon details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Coupons{" "}
        <span className="text-sm text-gray-500">
          • {coupons.length} available
        </span>
      </h2>

      {/* Coupons list */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 w-max">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading coupons...</p>
          ) : coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="relative w-[280px] min-h-[150px] bg-gradient-to-br from-pink-50 to-white border border-gray-200 rounded-xl shadow-md flex flex-col justify-between transition duration-300 overflow-hidden"
              >
                {/* Top Section */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-800">
                    {coupon.title}
                  </h3>
                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                    <p className="line-clamp-1">{coupon.description}</p>
                    <span
                      className="text-green-600 font-semibold cursor-pointer ml-1 whitespace-nowrap hover:underline"
                      onClick={() => handleSeeDetails(coupon.id)}
                    >
                      see details
                    </span>
                  </div>
                </div>

                {/* Bottom Section with ticket cut */}
                <div className="relative border-t border-dashed flex items-center justify-between px-4 py-3 bg-white">
                  <span className="font-mono text-sm text-gray-800 truncate max-w-[150px]">
                    {coupon.code}
                  </span>
                  <button
                    onClick={() => copyCode(coupon.code)}
                    className="text-[#0e1527] text-sm font-semibold hover:underline"
                  >
                    Copy Code
                  </button>

                  {/* Ticket Cut Left */}
                  <span className="absolute -left-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-200"></span>
                  {/* Ticket Cut Right */}
                  <span className="absolute -right-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-200"></span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No coupons available</p>
          )}
        </div>
      </div>

      {/* ✅ Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex top-12">
          {/* Overlay */}
          <div
            className="fixed inset-0 "
            onClick={() => setDrawerOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="ml-auto w-80 sm:w-[400px] h-full bg-white shadow-xl p-5 overflow-y-auto animate-slideIn relative">
            {/* Close Button */}
            <button
              className="absolute top-10 right-4 text-gray-600 hover:text-black"
              onClick={() => setDrawerOpen(false)}
            >
              ✕
            </button>

            {/* Drawer Content */}
            <div className="mt-8">
              {detailsLoading ? (
                <p className="text-gray-500 text-sm">Loading details...</p>
              ) : selectedCoupon ? (
                <>
                  {/* Coupon Title */}
                  <h2 className="text-lg font-semibold">
                    {selectedCoupon.title}
                  </h2>
                  <p className="text-sm text-gray-700 mt-2">
                    {selectedCoupon.description}
                  </p>

                  {/* Validity */}
                  <p className="text-sm text-gray-500 mt-2">
                    Valid from:{" "}
                    {new Date(
                      selectedCoupon.startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(selectedCoupon.endDate).toLocaleDateString()}
                  </p>

                 

                  {/* BOGO Details */}
                  {selectedCoupon.bogo && (
                    <div className="mt-5 border rounded-lg p-3 bg-pink-50">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        BOGO Offer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Buy {selectedCoupon.bogo.buyQuantity} item(s) from{" "}
                        <strong>
                          {selectedCoupon.bogo.eligibleCategories.join(", ")}
                        </strong>{" "}
                        and get {selectedCoupon.bogo.getQuantity} free from{" "}
                        <strong>
                          {selectedCoupon.bogo.freeCategories.join(", ")}
                        </strong>
                        .
                      </p>
                    </div>
                  )}

                  {/* Terms & Conditions */}
                  <div className="mt-6">
                    <h3 className="font-semibold">Terms & Conditions</h3>
                    <div
                      className="text-sm text-gray-600 mt-2 space-y-2"
                      dangerouslySetInnerHTML={{ __html: selectedCoupon.tnc }}
                    />
                  </div>

                  {/* Usage Limit */}
                  <p className="text-xs text-gray-500 mt-4">
                    Used {selectedCoupon.usedCount} /{" "}
                    {selectedCoupon.usageLimit} times
                  </p>


                   {/* Coupon Code Block */}
                  <div className="mt-4 flex items-center justify-between border rounded-lg p-3 bg-gray-50">
                    <div className="font-mono text-base font-semibold text-gray-800">
                      <button
                        onClick={() => setDrawerOpen(false)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                      >
                        Dismiss
                      </button>
                    </div>
                    <div className="flex gap-2">
                     
                      <button
                        onClick={() => copyCode(selectedCoupon.code)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        {copied ? "Copied!" : "Copy Code"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No details found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
