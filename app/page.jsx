import HeroSlider from "../components/HeroSlider";
import TopCategory from "../components/homecomponent/TopCategory";
import Offers from "../components/homecomponent/Offers";
import CollectionsRenderer from "../components/homecomponent/CollectionsRenderer";
import AIShowcase from "../components/homecomponent/AIShowcase";
import TrustBadges from "../components/homecomponent/TrustBadges";

export default function Home() {

  const data={
  "hero": [
    {
      "id": "b1",
      "title": "Festive Edit",
      "subtitle": "Up to 40% Off • Kurtas, Lehengas, Sarees",
      "cta": "Shop Women",
      "href": "/women-ethnic",
      "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400&auto=format&fit=crop"
    },
    {
      "id": "b2",
      "title": "Men's Classics",
      "subtitle": "Solid Shirts, Denims & Blazers",
      "cta": "Shop Men",
      "href": "/men-classics",
      "image": "https://images.unsplash.com/photo-1520974692515-8dfc31d46e86?q=80&w=1400&auto=format&fit=crop"
    },
    {
      "id": "b3",
      "title": "Back to School",
      "subtitle": "Smart picks for kids • Under ₹999",
      "cta": "Shop Kids",
      "href": "/kids",
      "image": "https://images.unsplash.com/photo-1596464716121-e8c1ad6c193f?q=80&w=1400&auto=format&fit=crop"
    }
  ],
  "quickCategories": [
    { "id": "qc1", "name": "Women", "slug": "/women", "image": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop" },
    { "id": "qc2", "name": "Men", "slug": "/men", "image": "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=600&auto=format&fit=crop" },
    { "id": "qc3", "name": "Kids", "slug": "/kids", "image": "https://images.unsplash.com/photo-1516528387618-afa90b13e000?q=80&w=600&auto=format&fit=crop" },
    { "id": "qc4", "name": "New Arrivals", "slug": "/new", "image": "https://images.unsplash.com/photo-1560852488-8a4d9d1c2ab0?q=80&w=600&auto=format&fit=crop" }
  ],
  "collections": [
    {
      "id": "col1",
      "title": "Trending Kurtas for Men",
      "layout": "grid",
      "products": [
        { "id": "p1", "title": "Kratos Gym Pant", "priceINR": 3400, "discountedINR": 2200, "image": "https://ik.imagekit.io/pondricatalog/product/mp05/blue/mp05-blue_main.jpg", "badge": "-35%", "rating": 4.6, "href": "/mp05-kratos-gym-pant-blue" },
        { "id": "p2", "title": "Classic Linen Kurta", "priceINR": 2799, "discountedINR": 1999, "image": "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop", "badge": "-28%", "rating": 4.4 },
        { "id": "p3", "title": "Nehru Jacket Set", "priceINR": 4999, "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop", "badge": "New", "rating": 4.8 },
        { "id": "p4", "title": "Cotton Pathani", "priceINR": 1899, "discountedINR": 1499, "image": "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&auto=format&fit=crop" },
        { "id": "p5", "title": "Slim Fit Chinos", "priceINR": 2299, "image": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800&auto=format&fit=crop" },
        { "id": "p6", "title": "Festive Sherwani", "priceINR": 7999, "discountedINR": 5999, "image": "https://images.unsplash.com/photo-1603575449290-9b263638cabe?q=80&w=800&auto=format&fit=crop", "badge": "-25%" }
      ]
    },
    {
      "id": "col2",
      "title": "Festive Ethnic Wear (Women)",
      "layout": "carousel",
      "products": [
        { "id": "w1", "title": "Zari Work Saree", "priceINR": 3499, "discountedINR": 2799, "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop", "rating": 4.7 },
        { "id": "w2", "title": "Lehenga Choli Set", "priceINR": 6299, "image": "https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=800&auto=format&fit=crop" },
        { "id": "w3", "title": "Embroidered Kurti", "priceINR": 1899, "discountedINR": 1399, "image": "https://images.unsplash.com/photo-1610725669422-4c54bbec3f6b?q=80&w=800&auto=format&fit=crop" },
        { "id": "w4", "title": "Anarkali Gown", "priceINR": 4599, "image": "https://images.unsplash.com/photo-1539008835657-9e8be8a00f53?q=80&w=800&auto=format&fit=crop" },
        { "id": "w5", "title": "Bandhani Dupatta", "priceINR": 899, "image": "https://images.unsplash.com/photo-1621506289930-e1bd0643b5d1?q=80&w=800&auto=format&fit=crop" }
      ]
    }
  ],
  "coupons": [
    { "id": "c1", "code": "PONDRIC20", "title": "Flat 20% Off", "description": "On cart above ₹999", "minCart": 999, "active": true },
    { "id": "c2", "code": "FEST40", "title": "Up to 40% Off", "description": "Festive styles", "active": true }
  ],
  "aiShowcase": {
    "id": "ai1",
    "title": "AI Catalog – New Looks",
    "layout": "carousel",
    "products": [
      { "id": "ai-1", "title": "Purple Kurta (AI)", "priceINR": 2599, "image": "https://images.unsplash.com/photo-1542326237-94b1c5a538d5?q=80&w=800&auto=format&fit=crop", "badge": "AI" },
      { "id": "ai-2", "title": "Studio Saree (AI)", "priceINR": 3099, "image": "https://images.unsplash.com/photo-1544441892-2b6d55fbd76a?q=80&w=800&auto=format&fit=crop", "badge": "AI" },
      { "id": "ai-3", "title": "Ethnic Set (AI)", "priceINR": 2299, "image": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", "badge": "AI" }
    ]
  },
  "trustBadges": [
    { "icon": "truck", "title": "Free Shipping", "caption": "Above ₹999" },
    { "icon": "return", "title": "Easy Returns", "caption": "7-day hassle free" },
    { "icon": "shield", "title": "Secure Payments", "caption": "Razorpay / UPI" },
    { "icon": "sparkles", "title": "Quality Assured", "caption": "Verified products" }
  ],
  "footer": {
    "links": [
      { "label": "About", "href": "/about" },
      { "label": "Contact", "href": "/contact" },
      { "label": "Shipping", "href": "/shipping" },
      { "label": "Returns", "href": "/returns" },
      { "label": "Privacy", "href": "/privacy" }
    ],
    "socials": [
      { "label": "Instagram", "href": "#" },
      { "label": "Facebook", "href": "#" },
      { "label": "X", "href": "#" }
    ]
  }
}

  return (
    <>
    <HeroSlider hero={data.hero}/>
    <TopCategory quickCategories={data.quickCategories}/>
    <Offers Offers={data.coupons}/>
    <CollectionsRenderer collections={data.collections}/>
    <AIShowcase showcase={data.aiShowcase}/>
    <TrustBadges badges={data.trustBadges}/>
    {/* <BuyOneGetOne/> */}
    </>
  );
}