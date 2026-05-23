import React, { memo, useEffect, useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Eye, ArrowLeft, ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { axiosRequest } from '../../../utils/token'
import { addToCart } from '../../../features/cartSlice'


type Product = {
  id: number
  productName?: string
  price?: number
  discountPrice?: number
  hasDiscount?: boolean
  image?: string | null
  rating?: number
}

function Stars({ rating = 0 }: { rating?: number }) {
  return (
    <div className='flex gap-0.5'>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.floor(rating) ? 'text-orange-400' : 'text-gray-300'}`} fill='currentColor' viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  )
}

function ProductCard({ p, isWishlisted, onWishlist, onView, onCart }: {
  p: Product
  isWishlisted: boolean
  onWishlist: () => void
  onView: () => void
  onCart: () => void
}) {
  const discountPercent =
    p.hasDiscount && p.discountPrice && p.price
      ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
      : null
  const displayPrice = p.hasDiscount && p.discountPrice ? p.discountPrice : p.price ?? 0

  return (
    <div className='group relative bg-white overflow-hidden cursor-pointer'>
      <div className='relative h-[180px] sm:h-[220px] bg-[#F5F5F5] flex items-center justify-center overflow-hidden rounded-sm'>
        {discountPercent !== null && (
          <span className='absolute top-3 left-3 z-10 bg-[#DB4444] text-white text-xs font-medium px-2 py-0.5 rounded-sm'>
            -{discountPercent}%
          </span>
        )}
        {p.image
          ? <img src={p.image} alt={p.productName} className='max-h-[140px] sm:max-h-[160px] max-w-full object-contain transition-transform duration-500 group-hover:scale-105' />
          : <span className='text-xs text-gray-400'>No image</span>
        }
        <div className='absolute right-3 top-3 flex flex-col gap-2 z-10'>
          <button onClick={(e) => { e.stopPropagation(); onWishlist() }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${isWishlisted ? 'bg-[#DB4444] text-white' : 'bg-white text-gray-800 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#DB4444] hover:text-white'}`}>
            <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onView() }}
            className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-gray-900 hover:text-white transition-all duration-200'>
            <Eye size={15} />
          </button>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onCart() }}
          className='absolute bottom-0 left-0 right-0 bg-black text-white text-sm font-medium py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
          Add To Cart
        </button>
      </div>
      <div className='pt-3 pb-1'>
        <p className='text-sm font-medium text-gray-900 line-clamp-1 mb-1'>{p.productName ?? 'Product'}</p>
        <div className='flex items-center gap-2 mb-1.5'>
          <span className='text-base font-bold text-[#DB4444]'>${displayPrice.toFixed(2)}</span>
          {p.hasDiscount && p.discountPrice && (
            <span className='text-sm text-gray-400 line-through'>${(p.price ?? 0).toFixed(2)}</span>
          )}
        </div>
        <div className='flex items-center gap-1.5'>
          <Stars rating={p.rating} />
          <span className='text-xs text-gray-500'>({p.rating ? Math.round(p.rating * 10) : 0})</span>
        </div>
      </div>
    </div>
  )
}

const Section4 = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const wishlistedIds = useMemo(() => new Set(wishlistItems.map((i) => i.id)), [wishlistItems])

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    setLoading(true)
    axiosRequest
      .get('Product/get-products')
      .then((res) => setProducts(res.data?.data?.products ?? []))
      .finally(() => setLoading(false))
  }, [])

  const handlers = (p: Product) => ({
    onWishlist: () => dispatch(toggleWishlist(p)),
    onView: () => navigate(`/product-detail/${p.id}`),
    onCart: () => dispatch(addToCart({ ...p, quantity: 1, image: p.image || null })),
  })

  return (
    <div className='px-4 sm:px-6 md:px-[100px] py-10'>

      {/* Header */}
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-[14px] h-[36px] bg-[#DB4444] rounded' />
        <span className='text-[#DB4444] font-medium text-[15px]'>This Month</span>
      </div>

      <div className='flex items-center justify-between mb-8'>
        <p className='text-2xl sm:text-[36px] font-semibold'>Best Selling Products</p>
        <div className='flex items-center gap-2'>
          <button onClick={() => swiperRef.current?.slidePrev()}
            className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition'>
            <ArrowLeft size={18} />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}
            className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition'>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-48'>
          <div className='w-8 h-8 border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin' />
        </div>
      ) : showAll ? (
        <div>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-10'>
            {products.map((p) => (
              <ProductCard key={p.id} p={p} isWishlisted={wishlistedIds.has(p.id)} {...handlers(p)} />
            ))}
          </div>
          <div className='flex justify-center'>
            <button onClick={() => setShowAll(false)}
              className='px-10 sm:px-12 py-3 bg-[#DB4444] hover:bg-[#c03333] text-white text-sm font-semibold rounded transition-colors duration-200'>
              Show Less
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Swiper
            onSwiper={(s) => { swiperRef.current = s }}
            spaceBetween={16}
            breakpoints={{
              0:    { slidesPerView: 1.5 },
              480:  { slidesPerView: 2.2 },
              640:  { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard p={p} isWishlisted={wishlistedIds.has(p.id)} {...handlers(p)} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='flex justify-center mt-10'>
            <button onClick={() => setShowAll(true)}
              className='px-10 sm:px-12 py-3 bg-[#DB4444] hover:bg-[#c03333] text-white text-sm font-semibold rounded transition-colors duration-200'>
              View All Products
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

export default Section4
