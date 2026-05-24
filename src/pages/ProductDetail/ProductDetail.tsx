import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { Heart, Eye, Truck, RotateCcw } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { toggleWishlist } from '../../features/wishlistSlice'
import { addToCart } from '../../features/cartSlice'

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
  description?: string
  stock?: number
}

type RelatedProduct = Omit<Product, 'categoryId' | 'categoryName' | 'brandId' | 'description' | 'stock'>

const AVAILABLE_COLORS = ['#000000', '#FF0000', '#FFFFFF', '#0000FF']
const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL']

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const wishlistedIds = new Set(wishlistItems.map((item) => item.id))

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [thumbnailImages, setThumbnailImages] = useState<string[]>([])

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const resp = await axios.get<{ data: { products: Product[] } }>(
          `https://fastcard-1-o23z.onrender.com/api/Product/get-products`
        )

        const allProducts = resp.data?.data?.products ?? []

        const currentProduct = allProducts.find(
          (p) => p.id === Number(id)
        )

        if (currentProduct) {
          setProduct(currentProduct)
          setMainImage(currentProduct.image || null)

          if (currentProduct.image) {
            setThumbnailImages([currentProduct.image])
          }
        } else {
          setError('Product not found')
        }

        if (currentProduct?.categoryId) {
          const related = allProducts
            .filter(
              (p) =>
                p.categoryId === currentProduct.categoryId &&
                p.id !== Number(id)
            )
            .slice(0, 4)

          setRelatedProducts(related)
        }
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error('Failed to load product details')
        setError(errorObj.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetail()
  }, [id])

  const handleBuyNow = () => {
    if (!product) return

    dispatch(
      addToCart({
        id: product.id,
        productName: product.productName,
        price: product.price,
        discountPrice: product.discountPrice,
        hasDiscount: product.hasDiscount,
        image: product.image || null,
        quantity,
      })
    )
  }

  const isWishlisted = product ? wishlistedIds.has(product.id) : false

  const renderStars = (rating: number = 0) => {
    const filled = Math.floor(rating)

    return (
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i <= filled ? 'text-orange-400' : 'text-gray-300'
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

  if (loading) return <Loading />

  if (error)
    return (
      <div className='py-20 px-4 lg:px-25 text-red-500 text-center'>
        {error}
      </div>
    )

  if (!product)
    return (
      <div className='py-20 px-4 lg:px-25 text-center text-gray-500'>
        Product not found
      </div>
    )

  return (
    <div className='py-6 lg:py-10 px-4 lg:px-25 overflow-x-hidden'>
      {/* Breadcrumb */}
      <div className='mb-6 lg:mb-8'>
        <p className='text-sm text-gray-600 break-words'>
          Home /{' '}
          <span className='text-gray-900 font-medium'>
            {product.productName}
          </span>
        </p>
      </div>

      {/* MAIN */}
      <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-15'>
        {/* MOBILE THUMBNAILS */}
        {thumbnailImages.length > 0 && (
          <div className='flex lg:flex-col gap-3 w-full lg:w-auto'>
            {thumbnailImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-[80px] h-[80px] lg:w-[110px] lg:h-[110px] rounded-lg bg-white border flex items-center justify-center cursor-pointer transition p-2 hover:shadow-lg shrink-0 ${
                  mainImage === img
                    ? 'border-red-500 shadow-md ring-1 ring-red-500'
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx}`}
                  className='max-h-full max-w-full object-contain'
                />
              </button>
            ))}
          </div>
        )}

        {/* IMAGE */}
        <div className='flex items-center justify-center p-4 lg:p-6 bg-gray-100 rounded-xl min-h-[280px] lg:min-h-[400px] w-full lg:w-fit'>
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.productName}
              className='max-h-[250px] lg:max-h-[600px]  max-w-fit object-contain'
            />
          ) : (
            <span className='text-gray-500'>No image available</span>
          )}
        </div>

        {/* INFO */}
        <div className='flex flex-col gap-5 lg:gap-6 w-full lg:pl-25'>
          {/* TITLE */}
          <div>
            <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3 tracking-tight leading-tight'>
              {product.productName}
            </h1>

            <div className='flex flex-wrap items-center gap-3 lg:gap-4 mb-3'>
              {renderStars(product.rating || 0)}

              <span className='text-sm text-gray-600 font-medium'>
                ({product.rating ? Math.round(product.rating * 10) : 0} Reviews)
              </span>

              <span className='hidden lg:block h-4 w-px bg-gray-300'></span>

              <span className='text-green-600 text-sm font-semibold'>
                In Stock
              </span>
            </div>
          </div>

          {/* PRICE */}
          <div className='border-b pb-5 lg:pb-6 space-y-4'>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='text-2xl font-bold text-gray-900'>
                $
                {product.discountPrice && product.hasDiscount
                  ? product.discountPrice.toFixed(2)
                  : (product.price ?? 0).toFixed(2)}
              </span>

              {product.hasDiscount && product.discountPrice && (
                <span className='text-lg lg:text-xl text-gray-400 line-through'>
                  ${(product.price ?? 0).toFixed(2)}
                </span>
              )}
            </div>

            {product.description && (
              <p className='text-sm text-gray-600 leading-relaxed max-w-full lg:max-w-[400px]'>
                {product.description}
              </p>
            )}
          </div>

          {/* COLORS */}
          <div className='space-y-3'>
            <h4 className='font-bold text-gray-900 text-base'>Colours:</h4>

            <div className='flex flex-wrap gap-3'>
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border-2 transition cursor-pointer p-0.5 ${
                    selectedColor === color
                      ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-300'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                >
                  <div
                    className={`w-full h-full rounded-full ${
                      color === '#FFFFFF'
                        ? 'border border-gray-100'
                        : ''
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div className='space-y-3 pb-5 lg:pb-6 border-b'>
            <h4 className='font-bold text-gray-900 text-base'>Size:</h4>

            <div className='flex flex-wrap gap-2'>
              {AVAILABLE_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 min-w-[48px] text-center border rounded-md text-sm font-semibold transition cursor-pointer ${
                    selectedSize === size
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 w-full'>
            {/* QUANTITY */}
            <div className='flex items-center justify-between sm:justify-start border border-gray-300 rounded-md overflow-hidden w-full sm:w-fit'>
              <button
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
                className='px-4 py-3 hover:bg-gray-100 text-gray-900 border-r border-gray-300 text-lg font-medium'
              >
                −
              </button>

              <span className='px-6 py-3 font-bold text-center min-w-[60px] text-lg'>
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className='px-4 py-3 hover:bg-gray-100 text-gray-900 border-l border-gray-300 text-lg font-medium'
              >
                +
              </button>
            </div>

            {/* BUY */}
            <button
              onClick={handleBuyNow}
              className='flex-1 bg-red-500 hover:bg-red-600 text-white py-3.5 px-8 lg:px-10 font-bold rounded-lg transition text-base tracking-wide shadow-md w-full'
            >
              Buy Now
            </button>

            {/* WISHLIST */}
            <button
              onClick={() => {
                if (product) dispatch(toggleWishlist(product))
              }}
              className={`p-3 rounded-lg border-2 transition cursor-pointer flex items-center justify-center w-full sm:w-[52px] h-[52px] ${
                isWishlisted
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-white border-gray-300 text-gray-900 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              <Heart
                size={20}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
          </div>

          {/* DELIVERY */}
          <div className='space-y-1.5 bg-white p-4 lg:p-6 rounded-lg border border-gray-200 mt-4 lg:mt-6 shadow-inner'>
            <div className='flex items-start gap-4 border-b border-gray-200 pb-4 mb-4'>
              <div className='size-10 bg-gray-100 rounded-full flex items-center justify-center p-2.5 flex-shrink-0'>
                <Truck size={24} className='text-gray-900' />
              </div>

              <div className='pt-1'>
                <p className='font-bold text-gray-900 text-base mb-0.5'>
                  Free Delivery
                </p>

                <button className='text-sm text-gray-600 hover:text-red-500 font-medium underline text-left'>
                  Enter your postal code for Delivery Availability
                </button>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='size-10 bg-gray-100 rounded-full flex items-center justify-center p-2.5 flex-shrink-0'>
                <RotateCcw size={24} className='text-gray-900' />
              </div>

              <div className='pt-1'>
                <p className='font-bold text-gray-900 text-base mb-0.5'>
                  Return Delivery
                </p>

                <p className='text-sm text-gray-600 font-medium leading-6'>
                  Free 30 Days Delivery Returns.{' '}
                  <button className='text-red-500 font-semibold underline hover:text-red-600'>
                    Details
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {relatedProducts.length > 0 && (
        <div className='border-t pt-10 lg:pt-12 mt-16 lg:mt-20'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-1 h-8 bg-red-500 rounded'></div>

                <h2 className='text-red-500 font-semibold'>
                  Related Item
                </h2>
              </div>

              <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight'>
                You Might Also Like
              </h3>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7'>
            {relatedProducts.map((p) => {
              const relatedIsWishlisted = wishlistedIds.has(p.id)

              return (
                <div
                  key={p.id}
                  className='relative bg-white border border-gray-200 rounded-xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300'
                >
                  {p.hasDiscount && p.discountPrice && (
                    <div className='absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 text-xs font-extrabold rounded-md z-20'>
                      -
                      {Math.round(
                        (((p.price ?? 0) - p.discountPrice) /
                          (p.price ?? 1)) *
                          100
                      )}
                      %
                    </div>
                  )}

                  <div className='relative h-64 bg-gray-100 overflow-hidden flex items-center justify-center p-5'>
                    {p.image ? (
                      <img
                        src={p.image ?? undefined}
                        alt={p.productName}
                        className='max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 cursor-pointer'
                        onClick={() =>
                          navigate(`/product-detail/${p.id}`)
                        }
                      />
                    ) : (
                      <span className='text-sm text-gray-500'>
                        No image
                      </span>
                    )}

                    <div className='absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          dispatch(toggleWishlist(p as Product))
                        }}
                        className={`rounded-full p-3 shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-110 ${
                          relatedIsWishlisted
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-900 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={
                            relatedIsWishlisted
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/product-detail/${p.id}`)
                        }
                        className='bg-white text-gray-900 rounded-full p-3 shadow-lg hover:bg-blue-500 hover:text-white hover:scale-110 transition-all duration-200 flex items-center justify-center cursor-pointer'
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>

                  <div className='p-5 space-y-3'>
                    <h3 className='font-semibold text-base text-gray-900 line-clamp-2 min-h-[48px]'>
                      {p.productName ?? 'Product'}
                    </h3>

                    <div className='flex items-center gap-3'>
                      <span className='font-bold text-red-500 text-lg'>
                        $
                        {p.discountPrice && p.hasDiscount
                          ? p.discountPrice.toFixed(2)
                          : (p.price ?? 0).toFixed(2)}
                      </span>

                      {p.hasDiscount && p.discountPrice && (
                        <span className='text-sm text-gray-400 line-through'>
                          ${(p.price ?? 0).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className='flex items-center gap-3'>
                      {renderStars(p.rating || 0)}

                      <span className='text-xs text-gray-500 font-semibold'>
                        (
                        {p.rating
                          ? Math.round(p.rating * 10)
                          : 0}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}