"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contact Info */}
          <div className="lg:col-span-4 bg-white shadow-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-pink-500" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-600">support@pondric.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-red-500" />
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-gray-600">123 Pondric Street, NY</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-white shadow-lg p-6 ">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Centered Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[50%] bg-pink-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-700 transition sm:w-auto sm:px-8"
                >
                  Send Message
                </button>
              </div>

              {status && (
                <p className="text-green-600 text-center font-medium mt-2">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
