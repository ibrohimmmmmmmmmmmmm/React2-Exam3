import React, { memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSwiper from './Swiper'
import { fetchCategories, setSelectedCategory } from '../../../features/categorySlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

export default memo(function Section1() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { categories, loading, error } = useAppSelector((state) => state.category)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryClick = (id: number) => {
    dispatch(setSelectedCategory(id))
    navigate(`/products/${id}`)
  }

  return (
    <>
      <div className="flex items-center justify-between py-15 px-30 ">
        <div className='w-[238px] flex flex-col gap-4'>
          {loading && <p>Loading categories...</p>}
          {error && <p className='text-red-500'>Error loading categories</p>}
          {!loading && !error && categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className='cursor-pointer hover:text-red-500 transition-colors flex justify-between items-center'
            >
              <p>{cat.categoryName}</p>
            </div>
          ))}
        </div>
        <div className='w-[900px]'>
          <HeroSwiper />
        </div>
      </div>
    </>
  )
})