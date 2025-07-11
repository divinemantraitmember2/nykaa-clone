export default function BottomBar() {
  const links = [
    "Makeup", "Skin", "Hair", "Appliances", "Bath & Body",
    "Natural", "Mom & Baby", "Health & Wellness", "Men", "Fragrance", "Lingerie & Accessories", "OFFERS"
  ];

  return (
    <div className="bg-white shadow overflow-x-auto whitespace-nowrap px-6 py-2 border-t border-b text-sm font-medium text-gray-700">
      {links.map((link, index) => (
        <a key={index} href="#" className="inline-block mr-6 hover:text-pink-600">
          {link}
        </a>
      ))}
    </div>
  );
}
