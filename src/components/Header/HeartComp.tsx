import { Heart } from 'lucide-react'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const HeartComp = memo(() => {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const count = wishlistItems.length;

  return (
    <Link 
      to="/wishlist" 
      className="hidden lg:flex relative p-2 rounded-full hover:bg-neutral-100 transition items-center justify-center" 
      aria-label="Wishlist"
    >
      <Heart size={20} strokeWidth={1.8} />
      {count > 0 && (
        <span className="absolute top-0.5 right-0.5 bg-[#DB4444] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
          {count}
        </span>
      )}
    </Link>
  )
})

export default HeartComp