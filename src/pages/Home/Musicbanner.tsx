import { useEffect, useState } from 'react'

import SPEAKER_IMG from "../../assets/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
import { useTranslation } from 'react-i18next'

const TARGET_SECONDS = 5 * 86400 + 23 * 3600 + 59 * 60 + 35

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className='flex flex-col items-center justify-center w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full border border-white/25 bg-white/10 dark:bg-black/20'>
      <span className='text-white text-sm sm:text-base font-bold leading-none'>{value}</span>
      <span className='text-white/50 text-[9px] sm:text-[10px] mt-0.5'>{label}</span>
    </div>
  )
}

export default function MusicBanner() {
  const { t } = useTranslation()
  const [remaining, setRemaining] = useState(TARGET_SECONDS)

  useEffect(() => {
    const tmr = setInterval(() => setRemaining(p => (p > 0 ? p - 1 : 0)), 1000)
    return () => clearInterval(tmr)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const days    = Math.floor(remaining / 86400)
  const hours   = Math.floor((remaining % 86400) / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  return (
    <div className='px-4 sm:px-6 md:px-[100px] py-6 bg-white dark:bg-gray-950 transition-colors duration-300'>
      <div className='relative w-full rounded-xl overflow-hidden bg-[#0d0d0d] dark:bg-gray-900'>

        <div className='absolute right-0 top-0 bottom-0 w-[60%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none' />

        {/* ── MOBILE ── */}
        <div className='flex flex-col sm:hidden px-6 pt-8 pb-0'>

          <span className='text-[#00FF66] text-xs font-semibold tracking-wide mb-3'>
            {t('musicBanner.category')}
          </span>

          <h2 className='text-white text-2xl font-bold leading-tight mb-6'>
            {t('musicBanner.title')}
          </h2>

          <div className='flex items-center gap-2 mb-6'>
            <TimeUnit value={pad(hours)}   label={t('musicBanner.time.hours')} />
            <TimeUnit value={pad(days)}    label={t('musicBanner.time.days')} />
            <TimeUnit value={pad(minutes)} label={t('musicBanner.time.minutes')} />
            <TimeUnit value={pad(seconds)} label={t('musicBanner.time.seconds')} />
          </div>

          <button className='w-fit bg-[#00FF66] hover:bg-[#00dd55] text-black font-bold text-sm px-8 py-3 rounded mb-6 transition-colors duration-200'>
            {t('musicBanner.button')}
          </button>

          <div className='flex justify-center'>
            <img
              src={SPEAKER_IMG}
              alt='JBL Speaker'
              className='w-[80%] max-w-[280px] object-contain drop-shadow-2xl'
            />
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className='hidden sm:flex items-center min-h-[320px] md:min-h-[360px]'>

          <div className='flex flex-col justify-center px-10 md:px-14 py-12 flex-1'>

            <span className='text-[#00FF66] text-sm font-semibold tracking-wide mb-4'>
              {t('musicBanner.category')}
            </span>

            <h2 className='text-white text-3xl md:text-4xl font-bold leading-tight mb-8'>
              {t('musicBanner.title')}
            </h2>

            <div className='flex items-center gap-3 mb-8'>
              <TimeUnit value={pad(hours)}   label={t('musicBanner.time.hours')} />
              <TimeUnit value={pad(days)}    label={t('musicBanner.time.days')} />
              <TimeUnit value={pad(minutes)} label={t('musicBanner.time.minutes')} />
              <TimeUnit value={pad(seconds)} label={t('musicBanner.time.seconds')} />
            </div>

            <button className='w-fit bg-[#00FF66] hover:bg-[#00dd55] text-black font-bold px-10 py-3 rounded transition-colors duration-200'>
              {t('musicBanner.button')}
            </button>
          </div>

          <div className='flex items-center justify-center w-[45%] py-6 pr-8'>
            <img
              src={SPEAKER_IMG}
              alt='JBL Speaker'
              className='w-full max-w-[400px] object-contain drop-shadow-2xl'
            />
          </div>
        </div>

      </div>
    </div>
  )
}