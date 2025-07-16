import Topbar from "./Topbar";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";
import { Get_Category_list } from "../utils/api/Httproutes";

export default async function Header() {
  let categories = [];

  try {
    const res = await Get_Category_list();
    categories = res.data;
    console.log("categories",categories)
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <Topbar />
        <Navbar categories={categories} loading={false} />
      </header>
      <BottomBar categories={categories} loading={false}/>
    </>
  );
}
