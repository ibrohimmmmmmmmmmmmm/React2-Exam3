import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import ProductsSidebar from './SidebarProducts'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { toggleWishlist } from '../../features/wishlistSlice'

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
}

type Filters = {
  category: string | null
  brands: string[]
  priceRange: [number, number]
  condition: string
  ratings: number[]
}

export default function ProductsCatalog() {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const wishlistedIds = useMemo(() => new Set(wishlistItems.map((item) => item.id)), [wishlistItems])

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sort, setSort] = useState<string>('popular')
  const [filters, setFilters] = useState<Filters>({
    category: null,
    brands: [],
    priceRange: [0, 999999],
    condition: 'any',
    ratings: [],
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await axios.get<any>(
          `https://fastcard-1-o23z.onrender.com/api/Product/get-products`
        )
        const data = resp.data?.data?.products ?? []
        setProducts(data)
      } catch (err: any) {
        setError(err?.message || 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by price
    result = result.filter(
      (p) => (p.price ?? 0) >= filters.priceRange[0] && (p.price ?? 0) <= filters.priceRange[1]
    )

    // Filter by rating
    if (filters.ratings.length > 0) {
      result = result.filter((p) => filters.ratings.some((r) => (p.rating ?? 0) >= r))
    }

    // Sort
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
      <div className='py-10 px-25 flex item-center justify-between'>
        <p className='text-sm text-gray-600'>
          Home / <span className='text-gray-900 font-medium'>Explore Our Products</span>
        </p>
         <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 outline-none hover:border-gray-400'
            >
              <option value='popular'>Popularity</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
              <option value='newest'>Newest</option>
            </select>
      </div>

      {/* Main Layout */}
      <div className='flex gap-8 pb-15 px-25'>
        {/* Sidebar */}
        <ProductsSidebar filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Products Section */}
        <div className='flex-1'>
          {/* Top Bar with Sort */}
          <div className='flex items-center justify-between mb-6'>
            <div></div>
           
          </div>

          {loading && <Loading />}
          {error && <p className='text-red-500'>{error}</p>}

          {!loading && !error && (
            <>
              <div className='grid grid-cols-3 gap-6'>
                {filteredProducts.length === 0 ? (
                  <p className='col-span-3 text-center text-gray-500 py-8'>No products found.</p>
                ) : (
                  filteredProducts.map((p) => {
                    const isWishlisted = wishlistedIds.has(p.id);
                    return (
                      <div key={p.id} className='relative bg-white border border-gray-200 rounded overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300'>
                        {/* Image Container - Fixed Height */}
                        <div className='relative h-56 bg-gray-100 overflow-hidden flex items-center justify-center'>
                          {p.hasDiscount && p.discountPrice && (
                            <div className='absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10'>
                              -{Math.round(((p.price ?? 0 - p.discountPrice) / (p.price ?? 1)) * 100)}%
                            </div>
                          )}
                          {p.image ? (
                            <img src={p.image} alt={p.productName} className='max-h-full max-w-full object-cover group-hover:scale-110 transition-transform duration-300' />
                          ) : (
                            <span className='text-sm text-gray-500'>No image</span>
                          )}
                          
                          {/* Hover Icons - Appear on Hover, or if Wishlisted */}
                          <div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10'>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(toggleWishlist(p));
                              }}
                              className={`rounded-full p-2.5 shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer ${
                                isWishlisted 
                                  ? 'bg-[#DB4444] text-white opacity-100' 
                                  : 'bg-white text-gray-900 hover:bg-[#DB4444] hover:text-white opacity-0 group-hover:opacity-100'
                              }`}
                            >
                              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                            <button className='bg-white text-gray-900 rounded-full p-2.5 shadow-md hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer'>
                              <Eye size={20} />
                            </button>
                          </div>
                        </div>

                        {/* Content Section - Always Visible */}
                        <div className='p-4'>
                          <h3 className='font-semibold text-sm text-gray-900 line-clamp-2 mb-2'>
                            {p.productName ?? 'Product'}
                          </h3>
                          {/* Price */}
                          <div className='flex items-center gap-2 mb-2'>
                            <span className='font-bold text-red-500 text-lg'>
                              ${p.discountPrice && p.hasDiscount ? p.discountPrice.toFixed(2) : (p.price ?? 0).toFixed(2)}
                            </span>
                            {p.hasDiscount && p.discountPrice && (
                              <span className='text-xs text-gray-500 line-through'>
                                ${(p.price ?? 0).toFixed(2)}
                              </span>
                            )}
                          </div>
                          {/* Rating */}
                          <div className='flex items-center gap-2'>
                            {renderStars(p.rating)}
                            <span className='text-xs text-gray-500'>({p.rating ? Math.round(p.rating * 10) : 0})</span>
                          </div>
                        </div>

                        {/* Hover Add To Cart Button - Bottom */}
                        <div className='px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <button className='w-full bg-black text-white py-2 font-bold text-sm hover:bg-gray-800 transition-colors duration-200 rounded'>
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* More Products Button */}
              {filteredProducts.length > 0 && (
                <div className='flex justify-center mt-10'>
                  <button className='bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded font-semibold transition'>
                    More Products
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
