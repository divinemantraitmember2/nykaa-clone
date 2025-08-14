import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ContactusFAQPage() {
let faqs=[
  {
    "category": "General",
    "questions": [
      "WHAT IS PONDRIC?",
      "IS THERE ANY QUALITY ASSURANCE FOR THE ITEMS ORDERED?",
      "HOW DO I KNOW MY ORDER IS CONFIRMED?",
      "IF I HAVE PLACED TWO SEPARATE ORDERS, CAN YOU COMBINE THE ORDERS AND OFFER ME REDUCED SHIPPING?",
      "HOW TO CHECK CURRENT STATUS OF MY ORDER?",
      "WHAT IF I HAVE ANY COMPLAINT REGARDING MY ORDER?",
      "CAN I ADD MORE ITEMS AFTER PLACING THE ORDER?",
      "HOW DO I CANCEL MY ORDER?",
      "WHAT ALL PAYMENT METHODS ARE ACCEPTED?",
      "MY PAYMENT HAS FAILED? WHAT SHOULD I DO?"
    ]
  },
  {
    "category": "Shipping And Delivery",
    "questions": [
      "WHEN WILL MY ORDER BE SHIPPED?",
      "DO YOU SHIP INTERNATIONALLY?",
      "CAN I TRACK MY ORDER?",
      "WHAT ARE THE SHIPPING CHARGES?"
    ]
  },
  {
    "category": "Refunds And Returns",
    "questions": [
      "HOW DO I RETURN AN ITEM?",
      "WHEN WILL I RECEIVE MY REFUND?",
      "ARE THERE ANY ITEMS THAT CANNOT BE RETURNED?"
    ]
  },
  {
    "category": "Gift Card",
    "questions": [
      "HOW CAN I PURCHASE A GIFT CARD?",
      "HOW TO REDEEM MY GIFT CARD?",
      "WHAT IS THE VALIDITY PERIOD OF THE GIFT CARD?"
    ]
  }
]

  const [selectedCategory, setSelectedCategory] = useState(faqs[0]);
   const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
   
    <main className="max-w-6xl mx-auto py-10">
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <aside className="w-1/4 border-r pr-4">
          <ul className="space-y-2">
            {faqs.map((cat, idx) => {
              const isActive = selectedCategory.category === cat.category;
              return (
                <li
                  key={idx}
                  className={`flex items-center justify-between cursor-pointer p-2 rounded text-sm ${
                    isActive
                      ? "bg-gray-100 font-semibold text-gray-900"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setOpenIndex(null);
                  }}
                >
                  <span>{cat.category}</span>
                  {isActive && <ChevronRight size={16} />}
                </li>
              );
            })}
          </ul>
        </aside>


        {/* Right Section */}
        <section className="flex-1 bg-gray-50">
          {selectedCategory.questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white border-b border-gray-200"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex justify-between items-center px-4 py-4 text-sm font-medium text-gray-800"
              >
                <span>{q}</span>
                <ChevronRight
                  size={18}
                  className={`transition-transform ${
                    openIndex === idx ? "rotate-90" : ""
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-4 pb-4 text-gray-600 text-sm bg-gray-50">
                  {/* Placeholder answer */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
                  is where the answer will go.
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
