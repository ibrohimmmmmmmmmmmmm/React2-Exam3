import { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, ShoppingCart, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromWishlist, clearWishlist, toggleWishlist, type Product } from '../../features/wishlistSlice'
import { Toaster, toast } from 'sonner'

export default function Wishlist() {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)

  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [recLoading, setRecLoading] = useState(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setRecLoading(true)
      try {
        const resp = await axios.get<{ data: { products: Product[] } }>(
          `https://fastcard-1-o23z.onrender.com/api/Product/get-products`
        )

        const allProducts = resp.data?.data?.products ?? []
        const wishlistIds = new Set(wishlistItems.map(item => item.id))
        const filtered = allProducts.filter((p) => !wishlistIds.has(p.id))

        setRecommendations(filtered.slice(0, 4))
      } catch (err) {
        console.error('Failed to load recommended products', err)
      } finally {
        setRecLoading(false)
      }
    }

    fetchRecommendations()
  }, [wishlistItems])

  const handleAddToCart = (productName: string) => {
    toast.success(`"${productName}" added to cart!`, {
      position: 'top-center'
    })
  }

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return

    toast.success('All wishlisted items have been added to your cart!', {
      position: 'top-center',
      description: `${wishlistItems.length} items moved successfully.`
    })

    dispatch(clearWishlist())
  }



  return (
    <>
      <Toaster richColors closeButton />

      {/* MAIN WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400 mb-10">
          <Link to="/" className="hover:text-black dark:hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-black dark:text-white font-medium">Wishlist</span>
        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            Wishlist ({wishlistItems.length})
          </h1>

          {wishlistItems.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-300 px-6 py-3 rounded-xl font-medium text-sm text-gray-800 dark:text-white"
            >
              Move All To Bag
            </button>
          )}
        </div>

        {/* WISHLIST ITEMS */}
        {wishlistItems.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">

            {wishlistItems.map((p) => (
              <div key={p.id} className="relative bg-white dark:bg-[#111111] border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden group shadow-sm hover:shadow-2xl dark:shadow-black/30 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between">

                {/* IMAGE */}
                <div className="relative h-56 bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center p-4">

                  {p.hasDiscount && p.discountPrice && (
                    <div className="absolute top-3 left-3 bg-[#DB4444] text-white px-2.5 py-1 text-xs font-bold rounded">
                      -{Math.round(((p.price ?? 0 - p.discountPrice) / (p.price ?? 1)) * 100)}%
                    </div>
                  )}

                  <button
                    onClick={() => dispatch(removeFromWishlist(p.id))}
                    className="absolute top-3 right-3 bg-white dark:bg-neutral-900 text-gray-700 dark:text-white p-2 rounded-full shadow hover:bg-[#DB4444] hover:text-white transition"
                  >
                    <Trash2 size={16} />
                  </button>

                  <img
                      src={p.image ?? undefined}
                    alt={p.productName}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-500"
                  />

                  <button
                    onClick={() => handleAddToCart(p.productName ?? 'Product')}
                    className="absolute bottom-0 left-0 right-0 bg-black dark:bg-white text-white dark:text-black py-2.5 text-xs font-bold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ShoppingCart size={14} /> Add To Cart
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#DB4444] transition-colors">
                    {p.productName ?? 'Product'}
                  </h3>

                  <span className="font-bold text-[#DB4444] text-base">
                    ${(p.discountPrice && p.hasDiscount ? p.discountPrice : p.price ?? 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* RECOMMENDATIONS */}
        <div className="mt-16">

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-[14px] h-[36px] bg-[#DB4444] rounded" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                Just For You
              </h2>
            </div>

            <Link
              to="/products/0"
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition px-6 py-3 rounded-xl text-sm font-medium text-gray-800 dark:text-white"
            >
              See All
            </Link>
          </div>

          {recLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="border border-gray-100 dark:border-neutral-800 rounded-xl p-4 h-80 animate-pulse bg-gray-50 dark:bg-[#111111]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {recommendations.map((p) => (
                <div key={p.id} className="relative bg-white dark:bg-[#111111] border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col">

                  <div className="relative h-56 bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center p-4">

                    <button
                      onClick={() => dispatch(toggleWishlist(p))}
                      className="absolute top-3 right-3 bg-white dark:bg-neutral-900 text-gray-700 dark:text-white p-2 rounded-full shadow hover:bg-[#DB4444] hover:text-white transition"
                    >
                      <Heart size={16} />
                    </button>

                    <img
                      src={p.image ?? undefined}
                      alt={p.productName}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition"
                    />

                    <button
                      onClick={() => handleAddToCart(p.productName ?? 'Product')}
                      className="absolute bottom-0 left-0 right-0 bg-black dark:bg-white text-white dark:text-black py-2.5 text-xs font-bold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                    >
                      <ShoppingCart size={14} /> Add To Cart
                    </button>

                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#DB4444] transition">
                      {p.productName ?? 'Product'}
                    </h3>

                    <span className="font-bold text-[#DB4444] text-base">
                      ${(p.discountPrice && p.hasDiscount ? p.discountPrice : p.price ?? 0).toFixed(2)}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  )
}