import { Heart } from "lucide-react"
import { memo } from "react"
import { Link } from "react-router-dom"

import { useAppSelector } from "../../app/hooks"

const HeartComp = memo(() => {
  const wishlistItems = useAppSelector(
    (state) => state.wishlist.items
  )

  const count = wishlistItems.length

  return (
    <Link
      to="/wishlist"
      aria-label="Wishlist"
      className="
        relative  lg:flex
        items-center justify-center

        p-2.5 rounded-full

        text-black
        dark:text-white

        bg-transparent

        hover:bg-neutral-100
        dark:hover:bg-white/10

        border border-transparent
        dark:border-white/5

        transition-all duration-300

        hover:scale-105
        active:scale-95
      "
    >
      <Heart
        size={20}
        strokeWidth={1.9}
        className="
          transition-all duration-300
          group-hover:fill-red-500
        "
      />

      {count > 0 && (
        <span
          className="
            absolute -top-1 -right-1

            min-w-[19px]
            h-[19px]

            px-1

            flex items-center justify-center

            rounded-full

            bg-gradient-to-r
            from-red-500
            to-pink-500

            text-white
            text-[10px]
            font-bold

            shadow-md
            shadow-red-500/30

            border-2
            border-white
            dark:border-[#0B0B0F]

            animate-in zoom-in-50
          "
        >
          {count}
        </span>
      )}
    </Link>
  )
})

export default HeartComp