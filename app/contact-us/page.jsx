"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactusFAQPage from "../../components/pages/ContactusFAQPage"
import ContactForm from "../../components/pages/ContactForm"

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
      <section className="relative h-72 md:h-96 w-full flex items-center justify-center">
        <img
          src="/images/contact-us.png"
          alt="Contact Us Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 "></div>
        {/* <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg opacity-90">
            We’re here to help! Reach out and we’ll get back to you soon.
          </p>
        </div> */}
      </section>

      {/* Content Section */}
      <div className="mx-auto px-2  lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          {/* Contact Info */}
          <div className="lg:col-span-9  space-y-2">

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
                <ContactusFAQPage/>
            </div>
            
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 ">
           
          </div>
        </div>
      </div>

    
    </main>
  );
}
