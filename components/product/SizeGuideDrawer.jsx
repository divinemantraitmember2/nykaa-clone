"use client";
import { X } from "lucide-react";

export default function SizeGuideDrawer({ open, onClose, product }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Size Guide</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-14 h-18 object-cover rounded"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">{product?.brand}</p>
            <p className="text-sm text-gray-600">{product?.name}</p>
          </div>
        </div>

        {/* Table */}
        <div className="px-4 py-4">
          <p className="text-sm text-gray-700 mb-2">
            Below are product's physical dimensions
          </p>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Size</th>
                  <th className="border px-3 py-2 text-left">Chest</th>
                  <th className="border px-3 py-2 text-left">Shoulder</th>
                  <th className="border px-3 py-2 text-left">Length</th>
                </tr>
              </thead>
              <tbody>
                {product?.sizeChart?.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{row.size}</td>
                    <td className="border px-3 py-2">{row.chest}</td>
                    <td className="border px-3 py-2">{row.shoulder}</td>
                    <td className="border px-3 py-2">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure */}
        <div className="px-4 py-6 border-t">
          <h3 className="text-base font-semibold mb-3">How to Measure</h3>
          <img
            src="/images/how-to-measure-shirt.png"
            alt="How to Measure"
            className="w-full rounded"
          />
          <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-700">
            <li>Across Shoulder – Measure horizontally...</li>
            <li>Chest – Measure horizontally from armpit to armpit...</li>
            <li>Length – Measure vertically from shoulder to hem...</li>
            <li>Sleeve – Measure from shoulder seam to sleeve opening...</li>
          </ul>
        </div>
      </div>
    </>
  );
}
