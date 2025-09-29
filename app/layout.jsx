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
import LayoutWrapper from "../components/LayoutWrapper";

export const metadata = {
  title: "Pondric - Elevate Your Style Online",
  description:"Step into premium fashion with Pondric. Discover elegant clothing, curated collections, and timeless styles crafted for modern living.",
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
    <html lang="en" className="light" style={{colorScheme: "light"}}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-sans antialiased font-light">
        <Providers>
         <LayoutWrapper
            header={<Header categories={categories} />}
            footer={<Footer />}
            mobileFooter={<MobileFooter categories={categories}/>}
          >
          <UserAuthModal/>
          {children}
          {/* <Footer />
          <MobileFooter categories={categories}/> */}
          <CartSummaryDrawer/>
          </LayoutWrapper>
        </Providers>
        <ScrollToTop/>
        <ClientToastProvider/>
      </body>
    </html>
  );
}
