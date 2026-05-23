import React, { memo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { ArrowRight } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"

import apple from "@/assets/1200px-Apple_gray_logo 1.png"
import phone from "@/assets/hero_endframe__cvklg0xk3w6e_large 2.png"

function HeroSlide() {
  return (
    <div className="bg-black w-full flex items-center justify-between overflow-hidden
                    flex-col px-6 pt-8 pb-4 min-h-[420px]
                    sm:flex-row sm:px-16 sm:min-h-[360px] sm:pt-0 sm:pb-0">

      {/* Text */}
      <div className="text-white sm:max-w-[320px] w-full">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <img src={apple} alt="apple" className="w-7 h-7 sm:w-10 sm:h-10 object-contain" />
          <p className="text-sm sm:text-base">iPhone 14 Series</p>
        </div>

        <h1 className="text-3xl sm:text-[52px] sm:leading-[60px] font-semibold mb-4 sm:mb-6 leading-tight">
          Up to 10% off Voucher
        </h1>

        <button className="flex items-center gap-2 border-b border-white pb-1 text-sm sm:text-base">
          <span>Shop Now</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Phone image */}
      <img
        src={phone}
        alt="iphone"
        className="w-[75%] max-w-[260px] object-contain mt-6
                   sm:w-[420px] sm:max-w-none sm:mt-0"
      />
    </div>
  )
}

export default memo(function HeroSwiper() {
  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="heroSwiper w-full rounded-sm"
    >
      <SwiperSlide><HeroSlide /></SwiperSlide>
      <SwiperSlide><HeroSlide /></SwiperSlide>
      <SwiperSlide><HeroSlide /></SwiperSlide>
    </Swiper>
  )
})
