import "./globals.css";
import Providers from "./providers";
import Header from "../components/Header";
import UserAuthModal from "../components/userInfo/UserAuthModal";
import Footer from "../components/Footer";
import { GetMenu } from "../utils/api/serverApi";
import MobileFooter from "../components/MobileFooter";
import CartSummaryDrawer from "../components/cartDeatails/CartSummaryDrawer";
import ScrollToTop from "../components/homecomponent/ScrollToTop";
import ClientToastProvider from "../components/ClientToastProvider";

export const metadata = {
  title: "pondric",
  description: "Description text yaha",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  let categories = [];

  try {
    const ResData = await GetMenu();
    categories = ResData;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-sans antialiased font-light">
        <Providers>
          <Header categories={categories} />
          <UserAuthModal/>
          {children}
          <Footer />
          <MobileFooter/>
          <CartSummaryDrawer/>
        </Providers>
        <ScrollToTop/>
        <ClientToastProvider/>
      </body>
    </html>
  );
}
