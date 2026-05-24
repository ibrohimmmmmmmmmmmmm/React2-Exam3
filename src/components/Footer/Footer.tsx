import { Send } from "lucide-react";
import img1 from "@/assets/Icon-Facebook.png";
import img2 from "@/assets/Icon-Twitter.png";
import img3 from "@/assets/icon-instagram.png";
import img4 from "@/assets/Icon-Linkedin.png";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const socials = [
  { src: img1, label: "Facebook" },
  { src: img2, label: "Twitter" },
  { src: img3, label: "Instagram" },
  { src: img4, label: "LinkedIn" },
];

export default memo(function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-10">

        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] gap-y-10 gap-x-6">

          {/* Subscribe */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h2 className="text-[22px] font-black tracking-tight">
              {t("footer.brand")}
            </h2>

            <div>
              <p className="text-[14px] font-semibold mb-1">
                {t("footer.subscribe")}
              </p>

              <p className="text-[13px] text-neutral-400 mb-3">
                {t("footer.discount")}
              </p>

              <div className="flex items-center border border-neutral-600 rounded overflow-hidden w-full max-w-[260px] focus-within:border-neutral-400 transition-colors">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-[12px] text-white placeholder:text-neutral-500 outline-none"
                />
                <button className="px-3 py-2.5 text-white hover:text-neutral-300 border-l border-neutral-600 transition-colors shrink-0">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">
              {t("footer.support")}
            </h3>

            <div className="flex flex-col gap-3 text-[13px] text-neutral-400 leading-relaxed">
              <p>{t("footer.address")}</p>
              <p>{t("footer.email")}</p>
              <p>{t("footer.phone")}</p>
            </div>
          </div>

          {/* Account */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">
              {t("footer.account")}
            </h3>

            <ul className="flex flex-col gap-3">
              {t("footer.accountItems", { returnObjects: true }).map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">
              {t("footer.quickLinks")}
            </h3>

            <ul className="flex flex-col gap-3">
              {t("footer.quickItems", { returnObjects: true }).map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold">
              {t("footer.social")}
            </h3>

            <div className="flex items-center gap-4 flex-wrap">
              {socials.map(({ src, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <img src={src} alt={label} className="w-5 h-5 object-contain" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-neutral-800 text-center">
          <p className="text-[12px] text-neutral-500">
            {t("footer.copyright")}
          </p>
        </div>

      </div>
    </footer>
  );
});