import { useState } from "react";
import { ChevronDown, Info } from "lucide-react"; // Optional: Replace with your own SVGs

export default function ReturnPolicy() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden shadow-sm hover:shadow-2xl bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3">
          {/* Circular Icon */}
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="#001325"
              fillOpacity="0.92"
            >
              <path d="M15.1563 9.56236C14.9158 9.32179 14.5257 9.32179 14.2852 9.56236C14.0446 9.80293 14.0446 10.193 14.2852 10.4335L15.1021 11.2505H8.89787L9.71485 10.4335C9.95542 10.193 9.95542 9.80293 9.71485 9.56236C9.47428 9.32179 9.08424 9.32179 8.84367 9.56236L6.97509 11.4309C6.85957 11.5465 6.79466 11.7032 6.79466 11.8665C6.79466 12.0299 6.85957 12.1866 6.97509 12.3021L8.84367 14.1707C9.08424 14.4113 9.47428 14.4113 9.71485 14.1707C9.95542 13.9301 9.95542 13.5401 9.71485 13.2995L8.89788 12.4825H15.1021L14.2852 13.2995C14.0446 13.5401 14.0446 13.9301 14.2852 14.1707C14.5257 14.4113 14.9158 14.4113 15.1563 14.1707L17.0249 12.3021C17.2655 12.0615 17.2655 11.6715 17.0249 11.4309L15.1563 9.56236Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.54004 12C3.54004 7.32769 7.32769 3.54004 12 3.54004C16.6723 3.54004 20.46 7.32769 20.46 12C20.46 16.6723 16.6723 20.46 12 20.46C7.32769 20.46 3.54004 16.6723 3.54004 12Z"
              />
            </svg>
          </div>

          {/* Heading */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Return and exchange policy
            </h3>
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          stroke="#001325"
        />
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] p-4 pt-0" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-700 leading-relaxed">
          This product is eligible for returns or replacement. Please initiate
          returns/replacements from the <strong>‘My Orders’</strong> section in
          the App within 7 days of delivery. Kindly ensure the product is in its
          original condition with all tags attached.
        </p>
      </div>
    </div>
  );
}
