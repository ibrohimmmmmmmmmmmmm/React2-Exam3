import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

// Note: Ensure your paths are correct
import apple from "@/assets/1200px-Apple_gray_logo 1.png";
import phone from "@/assets/hero_endframe__cvklg0xk3w6e_large 2.png";

const HeroSlide = () => (
  <div className="relative w-full h-[450px] sm:h-[400px] 
   bg-gradient-to-br
    from-indigo-50
    via-white
    to-violet-100

    dark:from-neutral-950
    dark:via-black
    dark:to-neutral-900
  flex items-center overflow-hidden px-8 sm:px-20">
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-700 dark:bg-blue-950 blur-[120px] rounded-full pointer-events-none" />

    <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto z-10">
      <div className="text-blue-400 w-full sm:max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <img src={apple} alt="apple" className="w-8 h-8 object-contain brightness-0 invert" />
          <span className="text-sm font-medium tracking-wider uppercase opacity-80">iPhone 14 Series</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] mb-8">
          Up to 10% off <br /> Voucher
        </h1>

        <button className="group flex items-center gap-3 border-b border-white/30 pb-1 hover:border-white transition-all duration-300">
          <span className="font-medium">Shop Now</span>
          <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
        </button>
      </div>

      <img 
        src="https://avatars.mds.yandex.net/i?id=54a4e9a13e5699b5393cb1f99ca93d6508d48f56-4613040-images-thumbs&n=13" 
        alt="iphone" 
        className="w-[200px] sm:w-[350px] object-contain drop-shadow-2xl mt-8 sm:mt-0 animate-fade-in" 
      />
    </div>
  </div>
);

export default memo(function HeroSwiper() {
  return (
    <div className="hero-swiper-container w-full rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="heroSwiper"
      >
        <SwiperSlide><HeroSlide /></SwiperSlide>
        <SwiperSlide><HeroSlide /></SwiperSlide>
        <SwiperSlide><HeroSlide /></SwiperSlide>
      </Swiper>
    </div>
  );
});