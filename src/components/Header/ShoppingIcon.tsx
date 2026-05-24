import { ShoppingCart } from 'lucide-react'
import { memo } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useNavigate, useLocation } from 'react-router-dom'

export default memo(function ShoppingIcon() {
  const items = useAppSelector((s) => s.cart.items)
  const count = items.reduce((acc, i) => acc + i.quantity, 0)
  const navigate = useNavigate()
  const location = useLocation()
  const onCartPage = location.pathname === '/cart'

  return (
    <div>
      <button
        onClick={() => navigate('/cart')}
        className="
          relative p-2 rounded-full hover:bg-neutral-100 transition
          dark:hover:bg-neutral-800
        "
        aria-label="Cart"
      >
        <ShoppingCart
          size={20}
          strokeWidth={1.8}
          className="text-neutral-800 dark:text-neutral-100"
        />

        {count > 0 && !onCartPage && (
          <span
            className="
              absolute -top-1 -right-1
              bg-red-500 text-white text-xs
              w-5 h-5 rounded-full
              flex items-center justify-center
              dark:shadow-lg dark:shadow-red-500/20
            "
          >
            {count}
          </span>
        )}
      </button>
    </div>
  )
})