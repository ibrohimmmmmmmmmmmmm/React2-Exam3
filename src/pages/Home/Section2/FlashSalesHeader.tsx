import React, { memo, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface FlashSalesHeaderProps {
  onPrev?: () => void
  onNext?: () => void
  targetSeconds?: number // countdown in seconds, default 3 days 23h 19m 56s
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

  return (
    <div className="flex items-center justify-between px-16 py-4">
      <div className="flex items-center gap-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[14px] h-[36px] bg-[#DB4444] rounded" />
            <span className="text-[#DB4444] font-medium text-[15px]">Today's</span>
          </div>
          <h2 className="text-[26px] font-semibold">Flash Sales</h2>
        </div>

        <div className="flex items-center gap-1">
          <TimeUnit label="Days"    value={pad(days)} />
          <Colon />
          <TimeUnit label="Hours"   value={pad(hours)} />
          <Colon />
          <TimeUnit label="Minutes" value={pad(minutes)} />
          <Colon />
          <TimeUnit label="Seconds" value={pad(seconds)} />
        </div>
      </div>

      {/* Right: arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="w-[40px] h-[40px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="w-[40px] h-[40px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
})

function TimeUnit({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[11px] text-gray-500">{label}</span>
      <span className="text-[28px] font-semibold leading-tight">{value}</span>
    </div>
  )
}

function Colon() {
  return (
    <span className="text-[24px] font-semibold text-[#DB4444] mt-4 px-1">:</span>
  )
}