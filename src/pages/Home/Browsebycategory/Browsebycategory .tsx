import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { ArrowLeft, ArrowRight, Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 } from 'lucide-react'
import 'swiper/css'

const categories = [
  { label: 'Phones',      Icon: Smartphone },
  { label: 'Computers',   Icon: Monitor },
  { label: 'SmartWatch',  Icon: Watch },
  { label: 'Camera',      Icon: Camera },
  { label: 'HeadPhones',  Icon: Headphones },
  { label: 'Gaming',      Icon: Gamepad2 },
]

export default function BrowseByCategory() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className='px-4 sm:px-6 md:px-[100px] py-10'>

      {/* Top label */}
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-[14px] h-[36px] bg-[#DB4444] rounded' />
        <span className='text-[#DB4444] font-medium text-[15px]'>Categories</span>
      </div>

      {/* Title row + arrows */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-2xl sm:text-[28px] font-bold text-gray-900'>Browse By Category</h2>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition'
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition'
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        onSwiper={(s) => { swiperRef.current = s }}
        spaceBetween={16}
        breakpoints={{
          0:    { slidesPerView: 2.2 },
          480:  { slidesPerView: 3 },
          768:  { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {categories.map(({ label, Icon }, i) => {
          const isActive = activeIndex === i
          return (
            <SwiperSlide key={label}>
              <button
                onClick={() => setActiveIndex(isActive ? null : i)}
                className={`w-full aspect-square flex flex-col items-center justify-center gap-3 rounded border transition-all duration-200 cursor-pointer
                  ${isActive
                    ? 'bg-[#DB4444] border-[#DB4444] text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white'
                  }`}
              >
                <Icon size={40} strokeWidth={1.3} />
                <span className='text-sm font-medium'>{label}</span>
              </button>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Divider */}
      <div className='mt-10 border-t border-gray-200' />
    </div>
  )
}
