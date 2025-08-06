'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdArrowForward } from "react-icons/md";
export default function MobileDrawer({ isOpen, onClose, links = [] }) {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const selectedMain = links[selectedMenuIndex];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[90vw] bg-white z-50 transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#faf4ec]">
          <span className="text-lg font-bold text-black">Menu</span>
          <button onClick={onClose} className="text-gray-600 text-lg">✕</button>
        </div>

        {/* Horizontal Main Menu */}
        <div className="flex overflow-x-auto gap-4 p-2 bg-white border-b">
          {links.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedMenuIndex(index)}
              className={`flex flex-col items-center px-1 py-1 min-w-[40px] ${
                selectedMenuIndex === index
                  ? 'text-pink-600 font-semibold border-b-2 border-pink-600'
                  : 'text-gray-600'
              }`}
            >
              <div className="w-13 h-13 mb-1 rounded-full p-[2px]  bg-gradient-to-br from-pink-500 via-yellow-400 to-blue-500">
  <Image
    src={`https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif?tr=w-350,h-350`}
    alt={item.label}
    width={48}
    height={48}
    className="rounded-full object-contain"
  />
</div>

              <span className="text-sm truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Main Menu Link */}
        {selectedMain?.slug && (
          <div className="p-2 pb-2 border-b bg-[#fff7f2]">
            <Link
              href={`/${selectedMain.slug}`}
              onClick={onClose}
              className="text-pink-700 font-medium text-base hover:underline flex items-center gap-2"
            >
             
              {selectedMain.label}
               <span className="material-symbols-outlined text-pink-600"><MdArrowForward/></span>
            </Link>
          </div>
        )}

        {/* Submenu */}
        <div className="p-2 overflow-y-auto h-[calc(100vh-200px)]">
          {selectedMain?.children?.length > 0 ? (
            selectedMain.children.map((cat, catIndex) => (
              <div
                key={catIndex}
                className="mb-4 p-2 bg-[#fafafa] shadow hover:shadow-md transition"
              >
                <Link
                  href={`/${cat.slug}`}
                  className="flex items-center gap-3 text-gray-800 font-medium hover:text-pink-600"
                  onClick={onClose}
                >
                  {cat.icon && (
                    <Image
                      src={cat.icon}
                      alt={cat.label}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                  <span>{cat.label}</span>
                </Link>

                {/* Subcategories */}
                {cat.children?.length > 0 && (
                  <div className="mt-2 ml-8 flex flex-col gap-1 text-sm text-gray-600">
                    {cat.children.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/${sub.slug}`}
                        className="hover:text-pink-600"
                        onClick={onClose}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10 text-sm">No categories available</p>
          )}
        </div>
      </div>
    </>
  );
}
