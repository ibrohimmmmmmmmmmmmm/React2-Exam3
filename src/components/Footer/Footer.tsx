import { Send } from "lucide-react";
import img1 from "@/assets/Icon-Facebook.png";
import img2 from "@/assets/Icon-Twitter.png";
import img3 from "@/assets/icon-instagram.png";
import img4 from "@/assets/Icon-Linkedin.png";
import { memo } from "react";

const support = {
  address: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
  email: "exclusive@gmail.com",
  phone: "+88015-88888-9999",
};

const account = ["My Account", "Cart", "Wishlist", "Shop"];
const quickLinks = ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"];
const socials = [
  { src: img1, label: "Facebook" },
  { src: img2, label: "Twitter" },
  { src: img3, label: "Instagram" },
  { src: img4, label: "LinkedIn" },
];

export default memo(function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-10">

        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] gap-y-10 gap-x-6">

          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h2 className="text-[22px] font-black tracking-tight">Exclusive</h2>
            <div>
              <p className="text-[14px] font-semibold mb-1">Subscribe</p>
              <p className="text-[13px] text-neutral-400 mb-3">Get 10% off your first order</p>
              <div className="flex items-center border border-neutral-600 rounded overflow-hidden w-full max-w-[260px] focus-within:border-neutral-400 transition-colors">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-[12px] text-white placeholder:text-neutral-500 outline-none"
                />
                <button className="px-3 py-2.5 text-white hover:text-neutral-300 border-l border-neutral-600 transition-colors shrink-0">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">Support</h3>
            <div className="flex flex-col gap-3 text-[13px] text-neutral-400 leading-relaxed">
              <p>{support.address}</p>
              <p>{support.email}</p>
              <p>{support.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">Account</h3>
            <ul className="flex flex-col gap-3">
              {account.map((item) => (
                <li key={item} className="text-[13px] text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Link */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">Quick Link</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((item) => (
                <li key={item} className="text-[13px] text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">Social</h3>
            <div className="flex items-center gap-4 flex-wrap">
              {socials.map(({ src, label }) => (
                <button key={label} aria-label={label} className="opacity-80 hover:opacity-100 transition-opacity">
                  <img src={src} alt={label} className="w-5 h-5 object-contain" />
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-neutral-800 text-center">
          <p className="text-[12px] text-neutral-500">© Copyright Rimel 2022. All right reserved</p>
        </div>

      </div>
    </footer>
  );
})
