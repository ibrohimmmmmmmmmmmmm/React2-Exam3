import { memo } from 'react'
import ProductCard from '../Section2/CartProductsSection2'

const Section4 = memo(() => {
  return (
    <div className='px-4 sm:px-6 md:px-[100px] py-10 bg-white dark:bg-gray-950 transition-colors duration-300'>
      <ProductCard />
    </div>
  )
})

export default Section4