import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, ShoppingCart, Eye, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromWishlist, clearWishlist, toggleWishlist, type Product } from '../../features/wishlistSlice'
import { Toaster, toast } from 'sonner'

export default function Wishlist() {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [recLoading, setRecLoading] = useState(false)

  // Fetch products for recommendations (Just For You section)
  useEffect(() => {
    const fetchRecommendations = async () => {
      setRecLoading(true)
      try {
        const resp = await axios.get<any>(
          `https://fastcard-1-o23z.onrender.com/api/Product/get-products`
        )
        const allProducts = resp.data?.data?.products ?? []
        // Filter out items already in the wishlist and select a few for recommendation
        const wishlistIds = new Set(wishlistItems.map(item => item.id))
        const filtered = allProducts.filter((p: any) => !wishlistIds.has(p.id))
        
        // Take a slice of 4 products
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
      <Toaster richColors closeButton />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">Wishlist</span>
        </div>

        {/* Wishlist Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Wishlist ({wishlistItems.length})
          </h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="border border-neutral-300 hover:bg-black hover:text-white transition duration-200 px-6 py-3 rounded font-medium text-sm text-gray-800"
            >
              Move All To Bag
            </button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        {wishlistItems.length === 0 ? (
          <div className="bg-neutral-50 rounded-xl border border-dashed border-neutral-200 py-16 px-4 text-center mb-16 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
              <Heart size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-1">Your wishlist is empty</h3>
            <p className="text-neutral-500 text-sm max-w-sm mb-6">
              Explore our products and tap the heart icon on any items you like to save them here!
            </p>
            <Link
              to="/products/0"
              className="bg-[#DB4444] hover:bg-[#c73b3b] text-white px-8 py-3 rounded font-medium text-sm transition"
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {wishlistItems.map((p) => {
              return (
                <div key={p.id} className="relative bg-white border border-gray-200 rounded overflow-hidden group shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                  {/* Image & Action */}
                  <div className="relative h-56 bg-gray-100 flex items-center justify-center p-4">
                    {p.hasDiscount && p.discountPrice && (
                      <div className="absolute top-3 left-3 bg-[#DB4444] text-white px-2.5 py-1 text-xs font-bold rounded">
                        -{Math.round(((p.price ?? 0 - p.discountPrice) / (p.price ?? 1)) * 100)}%
                      </div>
                    )}
                    
                    <button
                      onClick={() => dispatch(removeFromWishlist(p.id))}
                      className="absolute top-3 right-3 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-[#DB4444] hover:text-white transition duration-200 flex items-center justify-center cursor-pointer"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>

                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.productName}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No image</span>
                    )}

                    {/* Add to Cart Overlay Button at bottom of image area */}
                    <button
                      onClick={() => handleAddToCart(p.productName ?? 'Product')}
                      className="absolute bottom-0 left-0 right-0 bg-black text-white py-2.5 text-xs font-bold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-neutral-800"
                    >
                      <ShoppingCart size={14} /> Add To Cart
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-[#DB4444] transition-colors">
                        {p.productName ?? 'Product'}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-[#DB4444] text-base">
                          ${p.discountPrice && p.hasDiscount ? p.discountPrice.toFixed(2) : (p.price ?? 0).toFixed(2)}
                        </span>
                        {p.hasDiscount && p.discountPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ${(p.price ?? 0).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      {renderStars(p.rating)}
                      <span className="text-xs text-gray-500">({p.rating ? Math.round(p.rating * 10) : 0})</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Just For You Section (Recommendations) */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-[14px] h-[36px] bg-[#DB4444] rounded" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Just For You</h2>
            </div>
            <Link
              to="/products/0"
              className="border border-neutral-300 hover:bg-black hover:text-white transition duration-200 px-6 py-3 rounded font-medium text-sm text-gray-800"
            >
              See All
            </Link>
          </div>

          {recLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="border border-gray-100 rounded p-4 h-80 animate-pulse bg-gray-50" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map((p) => {
                return (
                  <div key={p.id} className="relative bg-white border border-gray-200 rounded overflow-hidden group shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                    {/* Image & Action */}
                    <div className="relative h-56 bg-gray-100 flex items-center justify-center p-4">
                      {p.hasDiscount && p.discountPrice && (
                        <div className="absolute top-3 left-3 bg-[#DB4444] text-white px-2.5 py-1 text-xs font-bold rounded">
                          -{Math.round(((p.price ?? 0 - p.discountPrice) / (p.price ?? 1)) * 100)}%
                        </div>
                      )}

                      <button
                        onClick={() => dispatch(toggleWishlist(p))}
                        className="absolute top-3 right-3 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-[#DB4444] hover:text-white transition duration-200 flex items-center justify-center cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <Heart size={16} />
                      </button>

                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.productName}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <span className="text-sm text-gray-400">No image</span>
                      )}

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(p.productName ?? 'Product')}
                        className="absolute bottom-0 left-0 right-0 bg-black text-white py-2.5 text-xs font-bold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-neutral-800"
                      >
                        <ShoppingCart size={14} /> Add To Cart
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-[#DB4444] transition-colors">
                          {p.productName ?? 'Product'}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-[#DB4444] text-base">
                            ${p.discountPrice && p.hasDiscount ? p.discountPrice.toFixed(2) : (p.price ?? 0).toFixed(2)}
                          </span>
                          {p.hasDiscount && p.discountPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${(p.price ?? 0).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        {renderStars(p.rating)}
                        <span className="text-xs text-gray-500">({p.rating ? Math.round(p.rating * 10) : 0})</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
