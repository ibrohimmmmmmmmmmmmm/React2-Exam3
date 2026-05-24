import React, { memo, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface FlashSalesHeaderProps {
  onPrev?: () => void
  onNext?: () => void
  targetSeconds?: number
}

export default memo(function FlashSalesHeader({
  onPrev,
  onNext,
  targetSeconds = 3 * 86400 + 23 * 3600 + 19 * 60 + 56,
}: FlashSalesHeaderProps) {
  const [remaining, setRemaining] = useState(targetSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const days    = Math.floor(remaining / 86400)
  const hours   = Math.floor((remaining % 86400) / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60
  const { t } = useTranslation()
  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-16 py-4 gap-4 sm:gap-0 bg-white dark:bg-gray-950 transition-colors duration-300'>

      {/* Left: label + title + countdown */}
      <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10'>

        {/* Title block */}
        <div>
          <div className='flex items-center gap-2 mb-1 sm:mb-2'>
            <div className='w-[12px] h-[32px] sm:w-[14px] sm:h-[36px] bg-[#DB4444] rounded' />
            <span className='text-[#DB4444] font-medium text-sm sm:text-[15px]'>{t("today")}</span>
          </div>
          <h2 className='text-xl sm:text-[26px] font-semibold dark:text-white'>{t("flashSales")}</h2>
        </div>

        {/* Countdown */}
        <div className='flex items-center gap-1 dark:text-white'>
          <TimeUnit label='Days'    value={pad(days)}    />
          <Colon />
          <TimeUnit label='Hours'   value={pad(hours)}   />
          <Colon />
          <TimeUnit label='Minutes' value={pad(minutes)} />
          <Colon />
          <TimeUnit label='Seconds' value={pad(seconds)} />
        </div>
      </div>

      {/* Right: arrows */}
      <div className='hidden sm:flex items-center gap-2'>
        <button
          onClick={onPrev}
          className='w-[40px] h-[40px] rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition'
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className='w-[40px] h-[40px] rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition'
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
})

function TimeUnit({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400'>{label}</span>
      <span className='text-xl sm:text-[28px] font-semibold leading-tight'>{value}</span>
    </div>
  )
}

function Colon() {
  return (
    <span className='text-lg sm:text-[24px] font-semibold text-[#DB4444] mt-3 sm:mt-4 px-0.5 sm:px-1'>:</span>
  )
}