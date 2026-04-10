"use client";

import { useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Connect to API / email service
  }

  return (
    <section className="relative bg-[#F8FAFC] py-16 md:py-24 overflow-hidden">
      {/* Soft background shapes */}
      <div className="absolute top-0 right-0 h-72 w-72 bg-sky-100 rounded-full opacity-40 -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 h-72 w-72 bg-sky-100 rounded-full opacity-40 translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800">
            Have Questions or{" "}
            <span className="text-sky-600">Ready to Book?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Fill out the form for a custom quote or check out our partner stays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form Card */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Your Query
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-bold text-base bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 transition shadow-lg"
              >
                Send Inquiry
              </button>
            </form>

            {/* Offer box */}
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sky-900">
              <span className="text-xl">🎁</span>
              <p className="text-sm font-semibold">
                Special Offer:{" "}
                <span className="font-extrabold">Get 10% OFF</span> when booking a
                Course & Stay together!
              </p>
            </div>
          </div>

          {/* Partner Stays Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Our Partner Stays
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              We have partnered with the best local stays. Book with us for
              special rates.
            </p>

            <ul className="space-y-4">
              {[
                ["Freestays Villa", "Luxury & Comfort"],
                ["H2H River Swiss Camps", "Riverside Glamping"],
                ["Moonshine Villa", "Panoramic Views"],
                ["Bir Blues Homestay", "Cozy & Authentic"],
                ["Prakriti Yoga Studio", "Wellness & Serenity"],
                ["Chokling Arthouse Hotel", "Artistic & Unique Stay"],
                ["Landing Pad Cafe", "Great Food & Views"],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="mt-1 text-green-500">✔</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {title}
                    </p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
