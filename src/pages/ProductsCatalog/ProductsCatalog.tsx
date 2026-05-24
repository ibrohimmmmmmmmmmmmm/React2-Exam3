import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import ProductsSidebar from './SidebarProducts'
import { Heart, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'

type Product = {
  id: number
  productName?: string
  price?: number
  discountPrice?: number
  hasDiscount?: boolean
  image?: string | null
  rating?: number
  categoryId?: number
  categoryName?: string
  brandId?: number
  brandName?: string
  condition?: string
  features?: string[]
}

interface ProductResponse {
  data: {
    products: Product[]
  }
}

type Filters = {
  category: string | null
  categoryId: number | null
  brands: string[]
  priceRange: [number, number]
  condition: string
  ratings: number[]
  features: string[]
}

export default function ProductsCatalog() {
  const { t } = useTranslation()

  const { id: categoryRouteId } = useParams<{ id?: string }>()
  const selectedCategoryId = useAppSelector((state) => state.category.selectedCategoryId)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sort, setSort] = useState<string>('popular')
  const [filters, setFilters] = useState<Filters>({
    category: null,
    categoryId: null,
    brands: [],
    priceRange: [0, 999999],
    condition: 'any',
    ratings: [],
    features: [],
  })

  useEffect(() => {
    const routeId = categoryRouteId ? Number(categoryRouteId) : null
    const effectiveCategoryId = routeId !== null && !Number.isNaN(routeId) ? routeId : selectedCategoryId

    setFilters((prev) => ({
      ...prev,
      categoryId: effectiveCategoryId,
      category: routeId !== null ? null : prev.category,
    }))
  }, [categoryRouteId, selectedCategoryId])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await axios.get<ProductResponse>(
          `https://fastcard-1-o23z.onrender.com/api/Product/get-products`
        )
        const data = resp.data?.data?.products ?? []
        setProducts(data)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load products'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    result = result.filter(
      (p) =>
        (p.price ?? 0) >= filters.priceRange[0] &&
        (p.price ?? 0) <= filters.priceRange[1]
    )

    if (filters.categoryId !== null) {
      result = result.filter((p) => p.categoryId === filters.categoryId)
    } else if (filters.category) {
      result = result.filter((p) =>
        p.categoryName?.toLowerCase().includes(filters.category!.toLowerCase())
      )
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) =>
        filters.brands.includes(p.brandName ?? String(p.brandId ?? ''))
      )
    }

    if (filters.condition !== 'any') {
      result = result.filter(
        (p) => (p.condition ?? 'any').toLowerCase() === filters.condition.toLowerCase()
      )
    }

    if (filters.features.length > 0) {
      result = result.filter((p) =>
        filters.features.every((feature) =>
          (p.features ?? []).includes(feature)
        )
      )
    }

    if (filters.ratings.length > 0) {
      result = result.filter((p) =>
        filters.ratings.some((r) => (p.rating ?? 0) >= r)
      )
    }

    if (sort === 'popular') {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    } else if (sort === 'price-low') {
      result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    } else if (sort === 'price-high') {
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    } else if (sort === 'newest') {
      result.reverse()
    }

    return result
  }, [products, filters, sort])

  const selectedCategoryName = useMemo(() => {
    if (filters.categoryId !== null) {
      return products.find((p) => p.categoryId === filters.categoryId)?.categoryName ?? null
    }
    return filters.category
  }, [filters.categoryId, filters.category, products])

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  const renderStars = (rating: number = 0) => {
    const filled = Math.floor(rating)
    return (
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i <= filled ? 'text-orange-400' : 'text-gray-300'}`}
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className='mb-6 py-15 px-25'>
        <p className='text-sm text-gray-600'>
          {t('productsCatalog.breadcrumb.home')} /{' '}
          <span className='text-gray-900 font-medium'>
            {t('productsCatalog.breadcrumb.title')}
          </span>
        </p>
      </div>

      {/* Main Layout */}
      <div className='flex gap-6 py-10 px-8'>
        <ProductsSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          selectedCategoryName={selectedCategoryName ?? undefined}
        />

        <div className='flex-1'>

          {/* Top Bar */}
          <div className='flex items-center justify-between mb-6'>
            <div></div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 outline-none hover:border-gray-400'
            >
              <option value='popular'>{t('productsCatalog.sort.popular')}</option>
              <option value='price-low'>{t('productsCatalog.sort.lowHigh')}</option>
              <option value='price-high'>{t('productsCatalog.sort.highLow')}</option>
              <option value='newest'>{t('productsCatalog.sort.newest')}</option>
            </select>
          </div>

          {loading && <Loading />}
          {error && <p className='text-red-500'>{error}</p>}

          {!loading && !error && (
            <>
              <div className='grid grid-cols-3 gap-6'>
                {filteredProducts.length === 0 ? (
                  <p className='col-span-3 text-center text-gray-500 py-8'>
                    {t('productsCatalog.empty')}
                  </p>
                ) : (
                  filteredProducts.map((p) => (
                    <div key={p.id} className='relative bg-white border border-gray-200 rounded overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300'>

                      <div className='relative h-56 bg-gray-100 overflow-hidden flex items-center justify-center'>
                        {p.hasDiscount && p.discountPrice && (
                          <div className='absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10'>
                            -{Math.round(((p.price ?? 0 - p.discountPrice) / (p.price ?? 1)) * 100)}%
                          </div>
                        )}

                        {p.image ? (
                          <img
                            src={p.image ?? undefined}
                            alt={p.productName}
                            className='max-h-full max-w-full object-cover group-hover:scale-110 transition-transform duration-300'
                          />
                        ) : (
                          <span className='text-sm text-gray-500'>
                            {t('productsCatalog.noImage')}
                          </span>
                        )}

                        <div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <button className='bg-white rounded-full p-2.5 shadow-md hover:bg-red-500 hover:text-white transition-colors'>
                            <Heart size={20} />
                          </button>
                          <button className='bg-white rounded-full p-2.5 shadow-md hover:bg-blue-500 hover:text-white transition-colors'>
                            <Eye size={20} />
                          </button>
                        </div>
                      </div>

                      <div className='p-4'>
                        <h3 className='font-semibold text-sm text-gray-900 line-clamp-2 mb-2'>
                          {p.productName ?? t('productsCatalog.product')}
                        </h3>

                        <div className='flex items-center gap-2 mb-2'>
                          <span className='font-bold text-red-500 text-lg'>
                            ${p.discountPrice && p.hasDiscount
                              ? p.discountPrice.toFixed(2)
                              : (p.price ?? 0).toFixed(2)}
                          </span>

                          {p.hasDiscount && p.discountPrice && (
                            <span className='text-xs text-gray-500 line-through'>
                              ${(p.price ?? 0).toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className='flex items-center gap-2'>
                          {renderStars(p.rating)}
                          <span className='text-xs text-gray-500'>
                            ({p.rating ? Math.round(p.rating * 10) : 0})
                          </span>
                        </div>
                      </div>

                      <div className='px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button className='w-full bg-black text-white py-2 font-bold text-sm hover:bg-gray-800 transition-colors rounded'>
                          {t('productsCatalog.addToCart')}
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {filteredProducts.length > 0 && (
                <div className='flex justify-center mt-10'>
                  <button className='bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded font-semibold transition'>
                    {t('productsCatalog.more')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}