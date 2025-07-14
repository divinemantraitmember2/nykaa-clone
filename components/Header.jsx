import Topbar from "./Topbar";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";

export default function Header() {
  return (
    <>
    <header className="sticky top-0 z-50 bg-white ">
      {/* <Topbar /> */}
      <Navbar />
    </header>
     {/* <BottomBar /> */}
    </>
  );
}