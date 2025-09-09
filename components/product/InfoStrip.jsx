"use client";
import { useState } from "react";
import Image from "next/image";

export default function InfoStrip({ shippingInfo, shipptext }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!shippingInfo) return null;

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <>
      <div className="w-full bg-white py-3 px-2">
        <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 max-w-6xl mx-auto scroll-smooth snap-x snap-mandatory sm:overflow-visible">

          {/* COD Card */}
          {shippingInfo.cod_available && (
            <div className="w-[260px] sm:w-auto h-[160px] sm:h-[180px] shrink-0 snap-start group bg-white p-4 flex flex-col items-center text-center border border-gray-200 rounded-lg transition hover:shadow-md hover:-translate-y-1 duration-300">
              <div className="mb-2">
                <Image
                  src="/images/COD.png"
                  alt="COD available"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-gray-800">
                COD <span className="font-bold text-gray-900">available</span>
              </h3>
              <button
                onClick={handleDrawerOpen}
                className="mt-auto text-pink-600 border border-pink-600 px-4 py-1 rounded text-sm hover:bg-pink-600 hover:text-white transition-colors duration-300"
              >
                Know More
              </button>
            </div>
          )}

          {/* Return / Exchange Card */}
          <div className="w-[260px] sm:w-auto h-[160px] sm:h-[180px] shrink-0 snap-start group bg-white p-4 flex flex-col items-center text-center border border-gray-200 rounded-lg transition hover:shadow-md hover:-translate-y-1 duration-300">
            <div className="mb-2">
              <Image
                src="/images/Return.png"
                alt="Return info"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-800">
              {shippingInfo.return_days > 0
                ? `${shippingInfo.return_days}-day return & size exchange`
                : "Not returnable"}
            </h3>
            <button
              onClick={handleDrawerOpen}
              className="mt-auto text-pink-600 border border-pink-600 px-4 py-1 rounded text-sm hover:bg-pink-600 hover:text-white transition-colors duration-300"
            >
              Know More
            </button>
          </div>

          {/* Delivery Time Card */}
          <div className="w-[260px] sm:w-auto h-[160px] sm:h-[180px] shrink-0 snap-start group bg-white p-4 flex flex-col items-center text-center border border-gray-200 rounded-lg transition hover:shadow-md hover:-translate-y-1 duration-300">
            <div className="mb-2">
              <Image
                src="/images/Return.png"
                alt="Delivery info"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-800">
              Usually ships in{" "}
              <span className="font-bold text-gray-900">
                {shippingInfo.shipping_time_days || "N/A"} days
              </span>
            </h3>
            <button
              onClick={handleDrawerOpen}
              className="mt-auto text-pink-600 border border-pink-600 px-4 py-1 rounded text-sm hover:bg-pink-600 hover:text-white transition-colors duration-300"
            >
              Know More
            </button>
          </div>

        </div>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-12 right-0 h-full w-90 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Shipping Info</h2>
          <button onClick={handleDrawerClose} className="text-gray-600 hover:text-gray-900 text-xl">
            &times;
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{shipptext}</p>
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={handleDrawerClose}
          className="fixed inset-0  bg-opacity-30 z-40"
        ></div>
      )}
    </>
  );
}
