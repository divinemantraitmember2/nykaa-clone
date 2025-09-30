"use client";
import Image from "next/image";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutHeader({ steps, activeTab, setActiveTab }) {
  // current step ka index nikaal lo
  const currentIndex = steps.indexOf(activeTab);

  // handle back button
  const handleBack = () => {
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1]); // previous step pe le jao
    }
  };

  return (
    <>
      {/* Desktop Header (Stepper) */}
      <div className="hidden md:block w-full border-b border-teal-300 mb-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          {/* Left: Logo */}
          <div>
  <Link href="/" passHref>
    <Image
      src="https://ik.imagekit.io/pondric/logo/pondric-logo.png"
      alt="Logo"
      width={80}
      height={50}
      className="cursor-pointer"
    />
  </Link>
       </div>
          {/* Middle: Stepper */}
          <div className="flex items-center gap-6 sm:gap-12">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  onClick={() => step !== "payment" && setActiveTab(step)}
                  className={`uppercase text-sm font-semibold cursor-pointer ${
                    activeTab === step
                      ? "text-teal-500 border-b-2 border-teal-200"
                      : "text-gray-600"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-15 sm:w-20 border-t border-dashed border-gray-400"></div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Secure */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-teal-500" size={20} />
            <span className="text-sm font-semibold text-gray-700">
              100% SECURE
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-teal-300 mb-3">
          {/* Left section (back + title) */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleBack}
              className="p-1 disabled:opacity-40"
              disabled={currentIndex === 0} // step 1 pe disable
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold uppercase text-sm">
              {activeTab}
            </span>
          </div>

          {/* Right section (step info) */}
          <span className="text-xs text-gray-500">
            STEP {currentIndex + 1}/{steps.length}
          </span>
        </div>
      </div>
    </>
  );
}
