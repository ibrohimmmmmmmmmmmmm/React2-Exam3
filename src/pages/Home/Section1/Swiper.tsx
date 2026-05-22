import React, { memo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"

import { ArrowRight } from "lucide-react"

import "swiper/css"
import "swiper/css/pagination"

import "./styles.css"

import apple from "@/assets/1200px-Apple_gray_logo 1.png"
import phone from "@/assets/hero_endframe__cvklg0xk3w6e_large 2.png"

export default memo(function HeroSwiper() {
  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="heroSwiper"
    >
      <SwiperSlide>
        <div className="bg-black w-full h-[360px] flex items-center justify-between px-16 overflow-hidden">

          <div className="max-w-[320px] text-white">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={apple}
                alt="apple"
                className="w-10 h-10 object-contain"
              />

              <p className="text-[16px]">
                iPhone 14 Series
              </p>
            </div>

            <h1 className="text-[52px] leading-[60px] font-semibold mb-6">
              Up to 10% off Voucher
            </h1>

            <button className="flex items-center gap-3 border-b border-white pb-1">
              <span>Shop Now</span>

              <ArrowRight size={18} />
            </button>
          </div>

          <img
            src={phone}
            alt="iphone"
            className="w-[420px] object-contain"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="bg-black h-[360px] flex items-center justify-center text-white text-5xl font-bold">
          <div className="bg-black w-full h-[360px] flex items-center justify-between px-16 overflow-hidden">

          <div className="max-w-[320px] text-white">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={apple}
                alt="apple"
                className="w-10 h-10 object-contain"
              />

              <p className="text-[16px]">
                iPhone 14 Series
              </p>
            </div>

            <h1 className="text-[52px] leading-[60px] font-semibold mb-6">
              Up to 10% off Voucher
            </h1>

            <button className="flex items-center gap-3 border-b border-white pb-1">
              <span>Shop Now</span>

              <ArrowRight size={18} />
            </button>
          </div>

          <img
            src={phone}
            alt="iphone"
            className="w-[420px] object-contain"
          />
        </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="bg-black h-[360px] flex items-center justify-center text-white text-5xl font-bold">
          <div className="bg-black w-full h-[360px] flex items-center justify-between px-16 overflow-hidden">

          <div className="max-w-[320px] text-white">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={apple}
                alt="apple"
                className="w-10 h-10 object-contain"
              />

              <p className="text-[16px]">
                iPhone 14 Series
              </p>
            </div>

            <h1 className="text-[52px] leading-[60px] font-semibold mb-6">
              Up to 10% off Voucher
            </h1>

            <button className="flex items-center gap-3 border-b border-white pb-1">
              <span>Shop Now</span>

              <ArrowRight size={18} />
            </button>
          </div>

          <img
            src={phone}
            alt="iphone"
            className="w-[420px] object-contain"
          />
        </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
})