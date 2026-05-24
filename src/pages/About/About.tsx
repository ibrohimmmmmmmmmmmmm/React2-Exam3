import { memo } from "react";
import { Link } from "react-router-dom";
import { Truck, Headphones, RotateCcw, Store, DollarSign, ShoppingBag, Wallet } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const stats = [
  { icon: <Store size={28} />, value: "10.5k", label: "about.stats.sellers" },
  { icon: <DollarSign size={28} />, value: "33k", label: "about.stats.sales" },
  { icon: <ShoppingBag size={28} />, value: "45.5k", label: "about.stats.customers", active: true },
  { icon: <Wallet size={28} />, value: "25k", label: "about.stats.gross" },
];

const team = [
  { name: "Tom Cruise", role: "about.team.founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=420&fit=crop&crop=face" },
  { name: "Emma Watson", role: "about.team.director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=420&fit=crop&crop=face" },
  { name: "Will Smith", role: "about.team.designer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=420&fit=crop&crop=face" },
  { name: "Sarah Johnson", role: "about.team.marketing", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=420&fit=crop&crop=face" },
  { name: "James Brown", role: "about.team.developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=420&fit=crop&crop=face" },
];

const features = [
  { icon: <Truck size={28} />, title: "about.features.delivery.title", desc: "about.features.delivery.desc" },
  { icon: <Headphones size={28} />, title: "about.features.support.title", desc: "about.features.support.desc" },
  { icon: <RotateCcw size={28} />, title: "about.features.refund.title", desc: "about.features.refund.desc" },
];

export default memo(function About() {
  const { t } = useTranslation();

  return (
    <div className="
      px-4 sm:px-16 py-8 max-w-[1200px] mx-auto
      bg-white dark:bg-[#0a0a0a]
      text-black dark:text-white
      transition-colors duration-300
    ">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm mb-8 sm:mb-12 text-gray-400 dark:text-neutral-400">
        <Link to="/" className="hover:text-black dark:hover:text-white transition">
          {t("about.breadcrumb.home")}
        </Link>
        <span>/</span>
        <span className="text-black dark:text-white font-medium">
          {t("about.breadcrumb.about")}
        </span>
      </div>

      {/* OUR STORY */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-16 mb-12 sm:mb-24">

        <div className="w-full sm:max-w-[450px]">
          <h1 className="text-[36px] sm:text-[54px] font-semibold leading-tight mb-6 sm:mb-8">
            {t("about.story.title")}
          </h1>

          <p className="text-gray-700 dark:text-neutral-300 leading-relaxed mb-4 text-sm sm:text-base">
            {t("about.story.p1")}
          </p>

          <p className="text-gray-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
            {t("about.story.p2")}
          </p>
        </div>

        <div className="w-full sm:flex-1">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&h=480&fit=crop"
            className="w-full h-[280px] sm:h-[420px] object-cover rounded-xl shadow-sm dark:shadow-black/40"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-24">

        {stats.map((s, i) => (
          <div
            key={i}
            className={`
              flex flex-col items-center justify-center py-8 px-6 rounded-xl border transition
              ${s.active
                ? "bg-[#DB4444] text-white border-[#DB4444]"
                : "bg-white dark:bg-[#111111] text-black dark:text-white border-gray-200 dark:border-neutral-800 hover:bg-[#DB4444] hover:text-white"
              }
            `}
          >
            <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mb-4 ${s.active ? "bg-white/20" : "bg-gray-100 dark:bg-neutral-800"}`}>
              {s.icon}
            </div>

            <span className="text-[28px] font-semibold mb-1">{s.value}</span>
            <span className="text-sm text-center opacity-80">
              {t(s.label)}
            </span>
          </div>
        ))}

      </div>

      {/* TEAM */}
      <div className="mb-12 sm:mb-24">

        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          spaceBetween={16}
          className="pb-12"
        >

          {team.map((member, i) => (
            <SwiperSlide key={i}>
              <div>
                <div className="bg-gray-100 dark:bg-[#111111] rounded-xl overflow-hidden mb-4">
                  <img src={member.image} className="w-full h-[300px] sm:h-[350px] object-cover" />
                </div>

                <h3 className="text-[20px] font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-500 dark:text-neutral-400 text-sm mb-3">
                  {t(member.role)}
                </p>

                <div className="flex gap-3 text-gray-600 dark:text-neutral-300">
                  <TwitterIcon />
                  <InstagramIcon />
                  <LinkedinIcon />
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-16">

        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center">

            <div className="w-[70px] h-[70px] rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center mb-4">
              <div className="w-[50px] h-[50px] rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                {f.icon}
              </div>
            </div>

            <h4 className="font-semibold text-[14px] mb-2">{t(f.title)}</h4>
            <p className="text-gray-500 dark:text-neutral-400 text-sm">{t(f.desc)}</p>

          </div>
        ))}

      </div>

    </div>
  );
});