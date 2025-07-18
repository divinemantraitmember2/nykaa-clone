
"use client";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";


export default function Header({ categories }) {
 
  return (
    <>
      <header className="sticky top-0 z-50 bg-white ">
        <Topbar />
        <Navbar categories={categories} loading={false} />
      </header>
      <BottomBar categories={categories} loading={false}/>
    </>
  );
}
