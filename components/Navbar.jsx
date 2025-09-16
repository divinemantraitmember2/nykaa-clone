"use client";
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal,openUserCartDrawar } from "../slices/userSlice";
import { Heart,Search, Menu} from "lucide-react";
import Link from "next/link";
import {ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";
import MobileDrawer from "../components/MobileDrawer";
import SearchDropdown from "./SearchDropdown";
import LocationSelector from "./LocationSelector";

export default function Navbar({ categories, onHoverCategory, onLeaveCategory }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.countItems);
  const whishItems = useSelector((state) => state.cart.whishItems);
  const { data: session } = useSession();
  const userImage = session?.user?.image || "/images/no-profile.jpeg";
  const [openSearch, setOpenSearch] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search products...");
  const [filteredResults, setFilteredResults] = useState([]);
  const [query, setQuery] = useState("");
  const Products = [
  {
    id: "68c4ed401f6d4c83203d8918",
    title: "Kratos Gym Pant",
    slug: "kratos-gym-pant",
    image: "https://ik.imagekit.io/pondric/catalog/product/mp05/blue/mp05-blue_main.jpg",
    price: 2200
  },
  {
    id: "68c4ed401f6d4c83203d8919",
    title: "Black Slim Fit T-Shirt",
    slug: "black-slim-fit-t-shirt",
    image: "https://ik.imagekit.io/pondric/catalog/product/mpt01/white/mpt01_white_01.avif",
    price: 1500
  },
  {
    id: "68c4ed401f6d4c83203d891a",
    title: "Basic Round Neck T-Shirt",
    slug: "basic-round-neck-t-shirt",
    image: "https://ik.imagekit.io/pondric/catalog/product/mpt02/red/mpt02_red_01.avif",
    price: 799
  },
  {
    id: "68c4ed401f6d4c83203d891b",
    title: "Blue Washed Comfortable Casual Jeans",
    slug: "blue-washed-comfortable-casual-jeans",
    image: "https://ik.imagekit.io/pondric/catalog/product/mp06/blue/mp06-blue-01.avif",
    price: 999
  },
  {
    id: "68c4ed401f6d4c83203d891c",
    title: "Kratos Black Sports Jogger",
    slug: "kratos-black-sports-jogger",
    image: "https://ik.imagekit.io/pondric/catalog/product/mp05/black/mp05-black_main.jpg",
    price: 2500
  },
  {
    id: "68c4ed401f6d4c83203d891d",
    title: "Classic White Polo Shirt",
    slug: "classic-white-polo-shirt",
    image: "https://ik.imagekit.io/pondric/catalog/product/mpt03/white/mpt03_white_01.avif",
    price: 1299
  },
  {
    id: "68c4ed401f6d4c83203d891e",
    title: "Men’s Full Sleeve Hoodie",
    slug: "mens-full-sleeve-hoodie",
    image: "https://ik.imagekit.io/pondric/catalog/product/mh01/grey/mh01_grey_01.avif",
    price: 1899
  },
  {
    id: "68c4ed401f6d4c83203d891f",
    title: "Slim Fit Formal Shirt",
    slug: "slim-fit-formal-shirt",
    image: "https://ik.imagekit.io/pondric/catalog/product/ms01/blue/ms01_blue_01.avif",
    price: 1799
  }
];

  const suggestions = [
  "T-Shirts...",
  "Jeans...",
  ...Products.map((p) => p.title)
];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(suggestions[index]);
      index = (index + 1) % suggestions.length; // loop
    }, 3000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

 useEffect(() => {
  if (query.trim() === "") {
    setFilteredResults([]);
    return;
  }
  const results = Products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredResults(results);
}, [query]);



  // console.log("categories",categories)
  return (
    <div className="w-full bg-[#fff] relative py-2">
      {/* Mobile Header */}
     
      <div className="flex items-center justify-between mb-3 px-4 md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="text-xl" />
        </button>
        
        <Link href="/">
          <div className="">
              <img src="https://ik.imagekit.io/pondric/logo/pondric-logo.png?tr=w-108,h-30,dpr-2,q-100,f-webp" alt="Logo" width={108} height={30} className="object-contain" />
            </div>
        </Link>
        
      </div>

      <div className="px-4  md:hidden">
        <div className="flex items-center bg-white px-4 py-2  border border-[#e2e8f0] rounded">
          <Search className="text-pink-600 mr-2 text-sm" />
          <input type="text" onClick={() =>setOpenSearch(true)} placeholder={`Search ${placeholder}`} className="bg-transparent w-full text-sm outline-none text-gray-600 " />
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={categories} />
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6  ">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <div className="">
              <img src="https://ik.imagekit.io/pondric/logo/pondric-logo.png?tr=w-108,h-30,dpr-2,q-100,f-webp" alt="Logo" width={108} height={30} className="object-contain" />
            </div>
          </Link>

          <nav className="flex space-x-6 text-md font-semibold text-gray-700">
            {categories?.map((link, i) => (
            
              <Link key={i+40} href={`/${link.slug}`} className="mx-8">
              <span
                onMouseEnter={() => onHoverCategory(link)}
                // onMouseLeave={onLeaveCategory}
                className="hover:text-pink-600 cursor-pointer"
              >
                {link.label}
              </span>
              </Link>
             
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
         <div className="relative">
        <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenSearch(true);
              }}
              placeholder={`Search ${placeholder}`}
              className="border border-[#e2e8f0] rounded px-2 py-2 mx-4 bg-white text-sm w-80 
                       focus:border-[#e2e8f0] focus:outline-none"
            />
            <SearchDropdown
              isOpen={openSearch && filteredResults.length > 0}
              onClose={() => setOpenSearch(false)}
              results={filteredResults}
            />
</div>

             <LocationSelector/>

          {session?.user ? (
            <Link href="/profile">
              <img src={userImage} alt="User" width={32} height={32} className="rounded-full mx-3 cursor-pointer" />
            </Link>
          ) : (
            <button onClick={() => dispatch(openLoginModal())} className=" hover:text-pink-600 transition-colors duration-200">
             <User size={20} />
            </button>
          )}
          
  <Link
  href="/wishlist"
  className="relative mx-3 hover:text-pink-600 transition-colors duration-200"
>
  <Heart className="w-6 h-6 text-gray-800 group-hover:text-pink-600" />

{whishItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {whishItems}
        </span>
      )}

</Link>

        <button  onClick={() => dispatch(openUserCartDrawar())} className="relative flex mx-2 items-center gap-1 px-3 py-1 text-black hover:text-pink-600 transition-colors duration-200">
      <ShoppingCart size={20} />
      <span className="font-medium sm:inline ">Cart</span>

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {cartCount}
        </span>
      )}
    </button>
        </div>
      </div>
</div>
  );
}