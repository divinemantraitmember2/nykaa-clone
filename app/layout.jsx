import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from '../components/Header'
import UserAuthModal from '../components/userInfo/UserAuthModal'
import Footer from '../components/Footer'
import { GetMenu } from "../utils/api/serverApi";
import MobileFooter from '../components/MobileFooter';
import ScrollToTop from "../components/homecomponent/ScrollToTop";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
        <Header categories={categories} />
        <UserAuthModal/>
         {children}
         <Footer />
         <MobileFooter/>
        </Providers>
        <ScrollToTop/>
      </body>
    </html>
  );
}
