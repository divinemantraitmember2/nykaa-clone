"use client";

import { useState } from "react";
import ContactusFAQPage from "../../components/pages/ContactusFAQPage"
import ContactForm from "../../components/pages/ContactForm"
import ContactSidebar from "../../components/pages/ContactSidebar"

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Banner with Background Image */}
     <section className="relative h-72 md:h-96 w-full">
        <img
          src="/images/about-banner.jpg" // replace with your image path
          alt="About Us Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          {/* <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            About Us
          </h1> */}
        </div>
      </section>

      {/* Content Section */}
      <div className="mx-auto px-2  lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Contact Info */}
          <div className="lg:col-span-9  space-y-2">
            <div className="py-4 lg:pb-8">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1"> Contact Us
              </h2>
            <p className="mt-4 text-base">What can we help with you today?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
            <div className="lg:col-span-9 space-y-2">
              <ContactForm/>
            </div>
            <div className="lg:col-span-3 space-y-2">
              <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-gray-600" >Or Reach out to us:</p>
          <p className="text-base font-semibold text-gray-800">
            pondric@gmail.com
          </p>
        </div>
            </div>
              
            </div>
            <div className="">
               <div className="py-4">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1"> frequently asked questions</h2>
            <p className="mt-4 text-base">What can we help with you today?</p>
            </div>
                <ContactusFAQPage/>
            </div>
            
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 ">
           <ContactSidebar/>
          </div>
        </div>
      </div>

    
    </main>
  );
}
