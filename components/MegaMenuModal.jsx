
"use client";

export default function MegaMenuModal({ show, onClose, data }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-start justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white mt-20 w-[90vw] max-w-6xl p-6 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {data.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-sm text-gray-900 mb-3">{section.heading}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {section.items.map((item, idy) => (
                  <li key={idy}>
                    <a href={item.href} className="hover:text-pink-600">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
