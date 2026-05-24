import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import 'swiper/css'

const categories = [
  { key: 'phones', Icon: Smartphone },
  { key: 'computers', Icon: Monitor },
  { key: 'smartWatch', Icon: Watch },
  { key: 'camera', Icon: Camera },
  { key: 'headphones', Icon: Headphones },
  { key: 'gaming', Icon: Gamepad2 },
]

export default function BrowseByCategory() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { t } = useTranslation()

  return (
    <div className='px-4 sm:px-6 md:px-[100px] py-10'>

      {/* Top label */}
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-[14px] h-[36px] bg-[#DB4444]' />
        <span className='text-[#DB4444] font-medium text-[15px]'>
          {t('browseCategory.label')}
        </span>
      </div>

      {/* Title row + arrows */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-2xl sm:text-[28px] font-bold text-gray-900 dark:text-white'>
          {t('browseCategory.title')}
        </h2>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className='
              w-10 h-10 rounded-full border border-gray-300 dark:border-neutral-700
              flex items-center justify-center
              hover:bg-gray-100 dark:hover:bg-neutral-800
              transition
              text-gray-700 dark:text-neutral-200
            '
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className='
              w-10 h-10 rounded-full border border-gray-300 dark:border-neutral-700
              flex items-center justify-center
              hover:bg-gray-100 dark:hover:bg-neutral-800
              transition
              text-gray-700 dark:text-neutral-200
            '
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
          0: { slidesPerView: 2.2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {categories.map(({ key, Icon }, i) => {
          const isActive = activeIndex === i

          return (
            <SwiperSlide key={key}>
              <button
                onClick={() => setActiveIndex(isActive ? null : i)}
                className={`
                  w-full aspect-square flex flex-col items-center justify-center gap-3
                  rounded border transition-all duration-200 cursor-pointer

                  ${
                    isActive
                      ? 'bg-[#DB4444] border-[#DB4444] text-white'
                      : 'bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white'
                  }
                `}
              >
                <Icon size={40} strokeWidth={1.3} />
                <span className='text-sm font-medium'>
                  {t(`browseCategory.items.${key}`)}
                </span>
              </button>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Divider */}
      <div className='mt-10 border-t border-gray-200 dark:border-neutral-800' />
    </div>
  )
}