import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { Toaster, toast } from "sonner";

export default memo(function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
      });
      return;
    }

    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
      position: "top-center",
    });

    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Toaster richColors closeButton />

      <div className="px-4 sm:px-16 py-8 max-w-[1200px] mx-auto">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 sm:mb-12">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">Contact</span>
        </div>

        {/* MAIN CARD ROW */}
        <div className="flex flex-col sm:flex-row gap-6">

          {/* LEFT — Call & Write info */}
          <div className="w-full sm:w-[280px] bg-white rounded border border-gray-200 p-6 shadow-sm flex-shrink-0">

            {/* Call To Us */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center text-white flex-shrink-0">
                  <Phone size={18} />
                </div>
                <span className="font-semibold text-[16px]">Call To Us</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
              <p className="text-sm text-gray-800">Phone: +8801611112222</p>
            </div>

            {/* Write To Us */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center text-white flex-shrink-0">
                  <Mail size={18} />
                </div>
                <span className="font-semibold text-[16px]">Write To Us</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-sm text-gray-800 mb-2">Emails: customer@exclusive.com</p>
              <p className="text-sm text-gray-800">Emails: support@exclusive.com</p>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="flex-1 bg-white rounded border border-gray-200 p-6 shadow-sm">

            {/* Top row: Name, Email, Phone */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={form.name}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition placeholder-gray-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition placeholder-gray-400"
              />
            </div>

            {/* Message textarea */}
            <textarea
              name="message"
              placeholder="Your Message *"
              value={form.message}
              onChange={handleChange}
              rows={8}
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition placeholder-gray-400 resize-none mb-4"
            />

            {/* Send button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-[#DB4444] hover:bg-[#c73b3b] active:scale-95 text-white px-10 py-3 rounded text-sm font-medium transition"
              >
                Send Message
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
});
