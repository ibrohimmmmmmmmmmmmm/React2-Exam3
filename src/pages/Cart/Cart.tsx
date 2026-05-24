// React default import removed (not needed with new JSX transform)
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateQuantity, removeFromCart, clearCart } from '../../features/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector((s) => s.cart.items)

  const subtotal = items.reduce((acc, it) => acc + ((it.discountPrice && it.hasDiscount ? it.discountPrice : it.price ?? 0) * it.quantity), 0)

  return (
    <div className='py-10 px-4 md:px-25'>
      <p className='text-sm text-gray-600 mb-6'>Home / <span className='text-gray-900 font-medium'>Cart</span></p>

      {/* Responsive Grid: Stacked on mobile, 12-col layout on desktop */}
      <div className='grid grid-cols-12 gap-6'>
        
        {/* Cart Items List */}
        <div className='col-span-12 md:col-span-8'>
          <div className='space-y-4'>
            {items.length === 0 && (
              <div className='p-8 bg-white border border-gray-200 rounded text-center'>
                <p className='text-gray-600 mb-4'>Your cart is empty.</p>
                <button onClick={() => navigate('/')} className='px-6 py-2 border rounded'>Return To Shop</button>
              </div>
            )}

            {/* Desktop Table Header */}
            <div className='hidden md:grid grid-cols-12 gap-4 items-center text-sm text-gray-500 mb-4'>
              <div className='col-span-6'>Product</div>
              <div className='col-span-2 text-center'>Price</div>
              <div className='col-span-2 text-center'>Quantity</div>
              <div className='col-span-2 text-right'>Subtotal</div>
            </div>

            {/* Cart Items */}
            {items.map((it) => (
              <div key={it.id} className='grid grid-cols-12 items-center gap-4 bg-white p-4 border border-gray-100 rounded'>
                <div className='col-span-12 md:col-span-6 flex items-center gap-4'>
                  <img src={it.image || ''} alt={it.productName} className='w-16 h-16 md:w-20 md:h-20 object-cover rounded' />
                  <div>
                    <h3 className='font-medium text-sm md:text-base'>{it.productName}</h3>
                  </div>
                </div>

                <div className='col-span-4 md:col-span-2 text-center text-sm md:text-base'>
                  ${(it.discountPrice && it.hasDiscount ? it.discountPrice : it.price ?? 0).toFixed(2)}
                </div>

                <div className='col-span-4 md:col-span-2 flex items-center justify-center'>
                  <input
                    type='number'
                    value={it.quantity}
                    min={1}
                    onChange={(e) => dispatch(updateQuantity({ id: it.id, quantity: Math.max(1, Number(e.target.value) || 1) }))}
                    className='w-16 md:w-20 text-center border rounded px-2 py-1 text-sm'
                  />
                </div>

                <div className='col-span-4 md:col-span-2 text-right font-semibold flex items-center justify-end gap-2 md:gap-3'>
                  <span className='text-sm md:text-base'>${((it.discountPrice && it.hasDiscount ? it.discountPrice : it.price ?? 0) * it.quantity).toFixed(2)}</span>
                  <button onClick={() => dispatch(removeFromCart(it.id))} className='w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-500'>✕</button>
                </div>
              </div>
            ))}

            {/* Cart Actions */}
            {items.length > 0 && (
              <div className='flex flex-col md:flex-row gap-4 md:items-center justify-between mt-6'>
                <div className='flex flex-wrap gap-2'>
                  <button onClick={() => navigate('/')} className='px-4 py-2 border rounded text-sm'>Return To Shop</button>
                  <button onClick={() => dispatch(clearCart())} className='px-4 py-2 border border-red-300 text-red-500 rounded text-sm'>Remove all</button>
                </div>
                <div className='flex items-center gap-2'>
                  <input placeholder='Coupon Code' className='px-4 py-2 border rounded text-sm w-full' />
                  <button className='px-4 py-2 bg-red-100 text-red-500 rounded text-sm'>Apply</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cart Total Summary */}
        <div className='col-span-12 md:col-span-4'>
          <div className='p-6 border rounded bg-white'>
            <h3 className='font-bold text-lg mb-4'>Cart Total</h3>
            <div className='flex items-center justify-between mb-2 text-sm'><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div className='flex items-center justify-between mb-4 text-sm'><span>Shipping:</span><span>Free</span></div>
            <div className='border-t pt-4 flex items-center justify-between mb-4'><strong>Total:</strong><strong>${subtotal.toFixed(2)}</strong></div>
            <button onClick={() => navigate('/checkout')} className='w-full bg-red-500 text-white py-3 rounded text-sm font-medium'>Proceeds to checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}