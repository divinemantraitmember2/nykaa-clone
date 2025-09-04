"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { GetSizeChart } from "../../utils/api/Httproutes"; // <-- import api fn

export default function SizeGuideDrawer({ open, onClose, product, category_slug }) {
  const [sizeChartData, setSizeChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (!open || !category_slug) return;

    const fetchSizeChart = async () => {
      try {
        setLoading(true);
        const res = await GetSizeChart(category_slug);
        console.log("res",res)
        if (res?.status === 200 && res?.data?.code === 200) {
          setSizeChartData(res.data.data);
        } else {
          setSizeChartData(null);
        }
      } catch (err) {
        console.error("Error fetching size chart:", err);
        setSizeChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSizeChart();
  }, [open, category_slug]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-12 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 border-b bg-white">
          <h2 className="text-lg font-semibold">Size Guide</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-6 text-center text-gray-500">Loading size chart...</div>
        )}

        {/* Product Info */}
        {product && (
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-20 h-28 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{product?.brand}</p>
              <p className="text-md font-semibold text-gray-600">{product?.name}</p>
            </div>
          </div>
        )}

        {/* Size Chart Table */}
        {sizeChartData && (
          <div className="px-4 py-4">
            <p className="text-sm text-gray-700 mb-2">
              All measurements are in <b>{sizeChartData.unit}</b>
            </p>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 sticky top-0 z-30">
                  <tr>
                    {sizeChartData.columns.map((col) => (
                      <th
                        key={col}
                        className="border px-3 py-2 text-left capitalize"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChartData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {sizeChartData.columns.map((col) => (
                        <td key={col} className="border px-3 py-2">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Instructions */}
        {sizeChartData && (
          <div className="px-4 py-6 border-t">
            <h3 className="text-base font-semibold mb-2">How to Measure</h3>
            {sizeChartData.illustration_url && (
              <img
                src={sizeChartData.illustration_url}
                alt="How to Measure"
                className="w-full rounded mb-3"
              />
            )}
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {sizeChartData.instructions?.map((inst, idx) => (
                <li key={idx}>{inst}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
