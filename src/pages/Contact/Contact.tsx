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

      <div className="px-4 sm:px-16 py-8 max-w-[1200px] mx-auto bg-white dark:bg-[#0a0a0a] transition-colors duration-300">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-neutral-400 mb-8 sm:mb-12">
          <Link to="/" className="hover:text-black dark:hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-black dark:text-white font-medium">Contact</span>
        </div>

        {/* MAIN CARD ROW */}
        <div className="flex flex-col sm:flex-row gap-6">

          {/* LEFT CARD */}
          <div className="w-full sm:w-[280px] bg-white dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm dark:shadow-black/30 flex-shrink-0 transition-all">

            {/* CALL */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center text-white">
                  <Phone size={18} />
                </div>
                <span className="font-semibold text-[16px] text-gray-900 dark:text-white">
                  Call To Us
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-sm text-gray-800 dark:text-neutral-200">
                Phone: +8801611112222
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center text-white">
                  <Mail size={18} />
                </div>
                <span className="font-semibold text-[16px] text-gray-900 dark:text-white">
                  Write To Us
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-neutral-400 mb-3">
                Fill out our form and we will contact you within 24 hours.
              </p>

              <p className="text-sm text-gray-800 dark:text-neutral-200 mb-2">
                Emails: customer@exclusive.com
              </p>

              <p className="text-sm text-gray-800 dark:text-neutral-200">
                Emails: support@exclusive.com
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="flex-1 bg-white dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm dark:shadow-black/30 transition-all">

            {/* INPUT ROW */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">

              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={form.name}
                onChange={handleChange}
                className="flex-1 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition text-black dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                className="flex-1 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition text-black dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="flex-1 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition text-black dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
              />
            </div>

            {/* TEXTAREA */}
            <textarea
              name="message"
              placeholder="Your Message *"
              value={form.message}
              onChange={handleChange}
              rows={8}
              className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#DB4444] transition resize-none mb-4 text-black dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
            />

            {/* BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-[#DB4444] hover:bg-[#c73b3b] active:scale-95 text-white px-10 py-3 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
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