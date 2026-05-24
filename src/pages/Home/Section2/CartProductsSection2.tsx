import { memo, useEffect, useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Eye, ArrowLeft, ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { axiosRequest } from '../../../utils/token'
import { addToCart } from '../../../features/cartSlice'
import { toggleWishlist } from '../../../features/wishlistSlice'
import { useTranslation } from 'react-i18next'

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
        <svg
          key={i}
          className={`w-4 h-4 transition-colors ${
            i <= Math.floor(rating)
              ? 'text-orange-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  )
}

interface ProductCardProps {
  p: Product
  isWishlisted: boolean
  onWishlist: () => void
  onView: () => void
  onCart: () => void
}

function ProductCard({ p, isWishlisted, onWishlist, onView, onCart }: ProductCardProps) {
  const discountPercent =
    p.hasDiscount && p.discountPrice && p.price
      ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
      : null

  const displayPrice =
    p.hasDiscount && p.discountPrice ? p.discountPrice : p.price ?? 0
  const { t } = useTranslation()
  return (
    <div className='group relative rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300'>
      
      <div className='relative h-[190px] sm:h-[230px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center overflow-hidden'>
        
        {discountPercent !== null && (
          <span className='absolute top-3 left-3 z-10 bg-[#DB4444] text-white text-xs px-2 py-1 rounded-full shadow-md'>
            -{discountPercent}%
          </span>
        )}

        {p.image ? (
          <img
            src={p.image ?? undefined}
            alt={p.productName}
            className='max-h-[150px] sm:max-h-[170px] object-contain transition-transform duration-500 group-hover:scale-110'
          />
        ) : (
          <span className='text-xs text-gray-400 dark:text-gray-500'>
            No image
          </span>
        )}

        <div className='absolute right-3 top-3 flex flex-col gap-2'>
          <button onClick={(e) => { e.stopPropagation(); onWishlist() }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md
            ${
              isWishlisted
                ? 'bg-[#DB4444] text-white'
                : 'bg-white/90 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#DB4444] hover:text-white'
            }`}>
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>

          <button onClick={(e) => { e.stopPropagation(); onView() }}
            className='w-9 h-9 rounded-full bg-white/90 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition'>
            <Eye size={16} />
          </button>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onCart() }}
          className='absolute bottom-0 left-0 right-0 bg-black/90 dark:bg-white text-white dark:text-black text-sm font-medium py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300'
        >
          {t('section4.addToCart')}
        </button>
      </div>

      <div className='p-3 sm:p-4'>
        <p className='text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1'>
          {p.productName ?? t('section4.productFallback')}
        </p>

        <div className='flex items-center gap-2 mt-1.5'>
          <span className='text-base font-bold text-[#DB4444]'>
            ${displayPrice.toFixed(2)}
          </span>

          {p.hasDiscount && p.discountPrice && (
            <span className='text-sm text-gray-400 line-through'>
              ${(p.price ?? 0).toFixed(2)}
            </span>
          )}
        </div>

        <div className='flex items-center gap-1.5 mt-2'>
          <Stars rating={p.rating} />
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            ({p.rating ? Math.round(p.rating * 10) : 0})
          </span>
        </div>
      </div>
    </div>
  )
}

const Section4 = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const wishlistedIds = useMemo(
    () => new Set(wishlistItems.map((i) => i.id)),
    [wishlistItems]
  )

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
    onCart: () =>
      dispatch(addToCart({ ...p, quantity: 1, image: p.image || null })),
  })

  return (
    <div className='px-4 sm:px-6 md:px-[100px] py-12 bg-white dark:bg-black transition-colors'>

      {/* HEADER */}
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-[14px] h-[36px] bg-[#DB4444] rounded-full shadow-md' />
        <span className='text-[#DB4444] font-medium text-[15px]'>
          {t('section4.label')}
        </span>
      </div>

      <div className='flex items-center justify-between mb-8'>
        <p className='text-2xl sm:text-4xl font-semibold text-gray-900 dark:text-white'>
          {t('section4.title')}
        </p>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className='w-10 h-10 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:scale-105 transition'
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className='w-10 h-10 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:scale-105 transition'
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* BODY */}
      {loading ? (
        <div className='flex justify-center items-center h-48'>
          <div className='w-9 h-9 border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin' />
        </div>
      ) : showAll ? (
        <div>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10'>
            {products.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                isWishlisted={wishlistedIds.has(p.id)}
                {...handlers(p)}
              />
            ))}
          </div>

          <div className='flex justify-center'>
            <button
              onClick={() => setShowAll(false)}
              className='px-12 py-3 bg-[#DB4444] hover:bg-red-600 text-white rounded-full shadow-md transition'
            >
              {t('section4.showLess')}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Swiper
            onSwiper={(s) => (swiperRef.current = s)}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1.5 },
              480: { slidesPerView: 2.2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard
                  p={p}
                  isWishlisted={wishlistedIds.has(p.id)}
                  {...handlers(p)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='flex justify-center mt-10'>
            <button
              onClick={() => setShowAll(true)}
              className='px-12 py-3 bg-[#DB4444] hover:bg-red-600 text-white rounded-full shadow-md transition'
            >
              {t('section4.viewAll')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

export default Section4