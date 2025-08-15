

import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaPinterestP, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { BiBadgeCheck } from "react-icons/bi";

export default function ContactSidebar() {

    let data={
  "help": {
    "phone": "+91-730-5297673",
    "hours": "Operational Hours – 9:30 AM to 7:00 PM",
    "email": "hello@jaypore.com"
  },
  "social": [
    { "name": "Instagram", "icon": "instagram" },
    { "name": "Facebook", "icon": "facebook" },
    { "name": "Twitter", "icon": "twitter" },
    { "name": "YouTube", "icon": "youtube" },
    { "name": "Pinterest", "icon": "pinterest" }
  ],
  "promotions": [
    { "title": "Offers And T & C", "icon": "badge" }
  ],
  "businessPartnership": {
    "text": "Interested in partnering with us, write to",
    "email": "partnering.jaypore@abfrl.adityabirla.com"
  },
  "corporateOrders": {
    "text": "For Bulk / Corporate Orders, Write To",
    "email": "b2b@jaypore.com",
    "phone": "(+91) 9205044554"
  },
  "deliveryCheck": {
    "placeholder": "Enter 6 digit pincode"
  }
}

  const iconMap = {
    instagram: <FaInstagram />,
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    youtube: <FaYoutube />,
    pinterest: <FaPinterestP />,
    badge: <BiBadgeCheck />
  };

  return (
    <aside className="w-full max-w-xs p-4 bg-[#f8f8f8] text-gray-800 text-sm space-y-6">
      
      {/* Help */}
      <section>
        <h3 className="font-bold mb-2">Help</h3>
        <div className="flex items-start gap-2">
          <FaPhoneAlt className="mt-1" />
          <div>
            <p>{data.help.phone}</p>
            <p className="text-gray-600">{data.help.hours}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <FaEnvelope />
          <p>{data.help.email}</p>
        </div>
      </section>

      {/* Social */}
      <section>
        <h3 className="font-bold mb-2">Stay Connected</h3>
        <div className="flex gap-3 text-xl">
          {data.social.map((item, idx) => (
            <span key={idx} className="cursor-pointer hover:text-gray-600">
              {iconMap[item.icon]}
            </span>
          ))}
        </div>
      </section>

      {/* Promotions */}
      <section>
        <h3 className="font-bold mb-2">Current Promotions</h3>
        {data.promotions.map((promo, idx) => (
          <div key={idx} className="flex items-center gap-2 border border-dashed border-gray-400 p-2">
            {iconMap[promo.icon]}
            <span>{promo.title}</span>
          </div>
        ))}
      </section>

      {/* Business Partnership */}
      <section>
        <h3 className="font-bold mb-1">Business Partnership</h3>
        <p>
          {data.businessPartnership.text}{" "}
          <a href={`mailto:${data.businessPartnership.email}`} className="font-bold">
            {data.businessPartnership.email}
          </a>
        </p>
      </section>

      {/* Corporate Orders */}
      <section>
        <h3 className="font-bold mb-1">Corporate Orders</h3>
        <p>
          {data.corporateOrders.text}{" "}
          <a href={`mailto:${data.corporateOrders.email}`} className="font-bold">
            {data.corporateOrders.email}
          </a>
        </p>
        <p className="font-bold">{data.corporateOrders.phone}</p>
      </section>

      {/* Delivery Time Check */}
      <section>
        <h3 className="font-bold mb-1">Check Delivery time</h3>
        <input
          type="text"
          placeholder={data.deliveryCheck.placeholder}
          className="w-full border p-2 rounded"
        />
      </section>
    </aside>
  );
}
