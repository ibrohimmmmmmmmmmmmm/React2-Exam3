import React, { memo } from 'react'
import HeroSwiper from './Swiper'
export default memo(function Section1() {
  return (
    <>
        <div className= "flex items-center justify-between py-15 px-30 ">
            <div className='w-[238px]'>
                <p className='mb-4'>Woman’s Fashion</p>
                <p className='mb-4'>Men’s Fashion</p>
                <p className='mb-4'>Electronics</p>
                <p className='mb-4'>Home & Lifestyle</p>
                <p className='mb-4'>Medicine</p>
                <p className='mb-4'>Sports & Outdoor</p>
                <p className='mb-4'>Baby’s & Toys</p>
                <p className='mb-4'>Groceries & Pets</p>
                <p>Health & Beauty</p>
            </div>
            <div className='w-[900px]'>
              <HeroSwiper />
            </div>
            
        </div> 
    </>
  )
})
