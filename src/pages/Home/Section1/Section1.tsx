import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronRight, ArrowRight } from 'lucide-react'
import HeroSwiper from './Swiper'
import { fetchCategories, setSelectedCategory } from '../../../features/categorySlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useTranslation } from 'react-i18next'

export default memo(function Section1() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { categories, loading, error, selectedCategoryId } = useAppSelector((state) => state.category)
  const [search, setSearch] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(selectedCategoryId)

  useEffect(() => {
    setActiveCategoryId(selectedCategoryId)
  }, [selectedCategoryId])

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryClick = (id: number) => {
    dispatch(setSelectedCategory(id))
    setActiveCategoryId(id)
    navigate(`/products/${id}`)
  }

  const filtered = categories.filter((c) =>
    c.categoryName?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* ── MOBILE ── */}
      <div className='flex flex-col sm:hidden px-4 pt-4 pb-6'>

        {/* Search */}
        <div className='flex items-center border border-gray-300 dark:border-neutral-700 rounded-sm px-3 py-2 mb-4 bg-white dark:bg-neutral-900'>
          <input
            type='text'
            placeholder={t('section1.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 text-sm outline-none text-gray-700 dark:text-neutral-200 placeholder-gray-400 dark:placeholder-neutral-500 bg-transparent'
          />
          <Search size={18} className='text-gray-500 dark:text-neutral-400 ml-2 flex-shrink-0' />
        </div>

        {/* Categories */}
        {loading && (
          <p className='text-sm text-gray-400 dark:text-neutral-500'>
            {t('section1.loading')}
          </p>
        )}

        {error && (
          <p className='text-sm text-red-500'>
            {t('section1.error')}
          </p>
        )}

        {!loading && !error && (
          <div className='flex flex-wrap gap-2 mb-6'>
            {filtered.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className='
                  flex items-center  
                  border border-gray-300 dark:border-neutral-700
                  rounded-sm text-sm text-gray-700 dark:text-neutral-300
                  hover:border-[#DB4444] hover:text-[#DB4444]
                  dark:hover:border-[#DB4444] dark:hover:text-[#DB4444]
                  transition-colors
                '
              >
                {cat.categoryName}
                <ChevronRight size={13} />
              </button>
            ))}
          </div>
        )}

        {/* Banner */}
        <div className='relative w-full rounded-sm overflow-hidden min-h-[320px] flex flex-col bg-black dark:bg-neutral-950'>

          <div className='px-6 pt-8 pb-4 z-10'>
            <div className='flex items-center gap-2 mb-3'>
              <svg viewBox='0 0 814 1000' className='w-5 h-5 fill-white'>
                <path d='M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.5-57.8-155.5-127.4C46 790.9 0 694.5 0 604.3c0-159.4 104.5-244.5 207.1-244.5 54.1 0 99.1 35.6 133.1 35.6 32.7 0 83.8-37.7 144-37.7 22.6 0 108.2 1.9 166.7 73.9zm-209.2-71.9c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z'/>
              </svg>

              <span className='text-white/80 dark:text-white/70 text-xs'>
                {t('section1.banner.subtitle')}
              </span>
            </div>

            <h3 className='text-white text-3xl font-bold leading-tight mb-4'>
              {t('section1.banner.titleLine1')}<br />
              {t('section1.banner.titleLine2')}
            </h3>

            <button
              onClick={() => navigate('/products')}
              className='flex items-center gap-2 text-white text-sm font-semibold border-b border-white pb-0.5 w-fit hover:text-gray-300 dark:hover:text-neutral-300 transition-colors'
            >
              {t('section1.banner.button')} <ArrowRight size={16} />
            </button>
          </div>

          <div className='flex justify-center mt-2 pb-0'>
            <img
              src='/images/iphone14.png'
              alt='iPhone 14'
              className='w-[85%] max-w-[280px] object-contain'
            />
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className='hidden sm:flex items-start justify-between gap-8 py-10 px-8'>

        <div className='w-[220px] flex flex-col gap-3'>
          {loading && (
            <p>{t('section1.loadingCategories')}</p>
          )}

          {error && (
            <p className='text-red-500'>
              {t('section1.error')}
            </p>
          )}

          {!loading && !error && categories.map((cat) => {
            const active = activeCategoryId === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`text-left rounded-xl px-3 py-3 transition-colors ${active ? 'bg-red-50 text-[#DB4444] font-semibold dark:bg-red-500/10' : 'text-gray-700 dark:text-gray-300 hover:text-[#DB4444] hover:bg-gray-100 dark:hover:bg-neutral-800'}`}
              >
                {cat.categoryName}
              </button>
            )
          })}
        </div>

        <div className='flex-1 max-w-[900px]'>
          <HeroSwiper />
        </div>
      </div>
    </>
  )
})