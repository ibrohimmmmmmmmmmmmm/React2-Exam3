import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { SonnerTypes } from './sonnerCheckout'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  streetAddress: Yup.string().required('Street address is required'),
  apartment: Yup.string().optional(),
  townCity: Yup.string().required('Town/City is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits'),
  emailAddress: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  saveInfo: Yup.boolean(),
  paymentMethod: Yup.string().required('Please select a payment method'),
})

export default function Checkout() {
  const navigate = useNavigate()
  const items = useAppSelector((s) => s.cart.items)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const subtotal = items.reduce(
    (acc, it) =>
      acc +
      ((it.discountPrice && it.hasDiscount ? it.discountPrice : it.price ?? 0) *
        it.quantity),
    0
  )
  const shipping = 0 // Free shipping
  const total = subtotal - discount

  const handleSubmit = async (values: any) => {
    console.log('Form submitted:', values)
    // Here you would typically send data to your backend/Swagger API
    alert('Order placed successfully!')
    navigate('/order-confirmation')
  }

  const applyCoupon = () => {
    if (couponCode.trim()) {
      // Mock discount logic - integrate with your Swagger API
      setDiscount(subtotal * 0.1) // 10% discount for demo
      alert('Coupon applied!')
    }
  }
  const [open,setOpen] = useState(false)

  return (
    <div className='py-10 px-25'>
      <p className='text-sm text-gray-600 mb-8'>
        Product / View Cart / <span className='text-gray-900 font-medium'>CheckOut</span>
      </p>

      <div className='grid grid-cols-12 gap-8 mb-20'>
        {/* Billing Details - Left Side */}
        <div className='col-span-8 border border-gray-200 rounded-lg p-8'>
          <h2 className='text-2xl font-bold mb-8'>Billing Details</h2>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              streetAddress: '',
              apartment: '',
              townCity: '',
              phoneNumber: '',
              emailAddress: '',
              saveInfo: false,
              paymentMethod: 'cash',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className='space-y-5'>
                {/* First Name */}
                <div>
                  <Field
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    className='w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <ErrorMessage name='firstName'>
                    {(msg) => <p className='text-red-500 text-sm mt-1'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Last Name */}
                <div>
                  <Field
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    className='w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <ErrorMessage name='lastName'>
                    {(msg) => <p className='text-red-500 text-sm mt-1'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Street Address */}
                <div>
                  <Field
                    type='text'
                    name='streetAddress'
                    placeholder='Street address'
                    className='w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <ErrorMessage name='streetAddress'>
                    {(msg) => <p className='text-red-500 text-sm mt-1'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Apartment (Optional) */}
                <div>
                  <Field
                    type='text'
                    name='apartment'
                    placeholder='Apartment, floor, etc. (optional)'
                    className='w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <ErrorMessage name='apartment'>
                    {(msg) => <p className='text-red-500 text-sm mt-1'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Town/City */}
                <div>
                  <Field
                    type='text'
                    name='townCity'
                    placeholder='Town/City'
                    className='w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <ErrorMessage name='townCity'>
                    {(msg) => <p className='text-red-500 text-sm mt-1'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Phone Number */}
                <div>
                  <Field
                    type='text'
                    name='phoneNumber'
                    placeholder='Phone number'
                    className='w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <ErrorMessage name='phoneNumber'>
                    {(msg) => <p className='text-red-500 text-sm mt-1'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Email Address */}
                <div>
                  <Field
                    type='email'
                    name='emailAddress'
                    placeholder='Email address'
                    className='w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <ErrorMessage name='emailAddress'>
                    {(msg) => <p className='text-red-500 text-sm mt-1'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Save Information Checkbox */}
                <div className='flex items-center gap-3 mt-6'>
                  <Field
                    type='checkbox'
                    name='saveInfo'
                    id='saveInfo'
                    className='w-5 h-5 cursor-pointer accent-red-500'
                  />
                  <label htmlFor='saveInfo' className='text-gray-900 cursor-pointer'>
                    Save this information for faster check-out next time
                  </label>
                </div>

                {/* Hidden Payment Method & Submit - handled on right side */}
                <Field type='hidden' name='paymentMethod' />
              </Form>
            )}
          </Formik>
        </div>

        {/* Order Summary - Right Side */}
        <div className='col-span-4'>
          {/* Products */}
          <div className='bg-gray-50 rounded-lg p-6 mb-6'>
            <h3 className='font-bold text-lg mb-4'>Order Summary</h3>
            <div className='space-y-4'>
              {items.map((it) => (
                <div key={it.id} className='flex items-start gap-3 pb-4 border-b last:border-b-0'>
                  <img
                    src={it.image || ''}
                    alt={it.productName}
                    className='w-16 h-16 object-cover rounded'
                  />
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>{it.productName}</p>
                    <p className='text-sm text-gray-600'>
                      ${(it.discountPrice && it.hasDiscount ? it.discountPrice : it.price ?? 0).toFixed(2)}
                    </p>
                  </div>
                  <p className='font-semibold text-sm'>x{it.quantity}</p>
                  <p className='font-semibold text-sm w-16 text-right'>
                    ${(
                      (it.discountPrice && it.hasDiscount ? it.discountPrice : it.price ?? 0) *
                      it.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className='bg-white border border-gray-200 rounded-lg p-6 mb-6'>
            <div className='space-y-3 mb-4'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-600'>Subtotal:</span>
                <span className='font-medium'>${subtotal.toFixed(2)}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-gray-600'>Shipping:</span>
                <span className='font-medium'>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {discount > 0 && (
                <div className='flex items-center justify-between text-green-600'>
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className='border-t pt-4 flex items-center justify-between'>
              <strong className='text-lg'>Total:</strong>
              <strong className='text-lg'>${total.toFixed(2)}</strong>
            </div>
          </div>

          {/* Payment Method */}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              streetAddress: '',
              apartment: '',
              townCity: '',
              phoneNumber: '',
              emailAddress: '',
              saveInfo: false,
              paymentMethod: 'cash',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className='space-y-4'>
                {/* Payment Methods */}
                <div className='bg-white border border-gray-200 rounded-lg p-6 space-y-4 mb-6'>
                  {/* Bank Option */}
                  <label className='flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded hover:bg-gray-50'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='bank'
                      checked={values.paymentMethod === 'bank'}
                      onChange={(e) => setFieldValue('paymentMethod', e.target.value)}
                      className='w-4 h-4 cursor-pointer'
                    />
                    <span className='font-medium'>Bank</span>
                    <div className='flex items-center gap-2 ml-auto'>
                      <img
                        src='https://via.placeholder.com/30x20?text=Visa'
                        alt='Visa'
                        className='h-5'
                      />
                      <img
                        src='https://via.placeholder.com/30x20?text=MC'
                        alt='Mastercard'
                        className='h-5'
                      />
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label className='flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded hover:bg-gray-50'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='cash'
                      checked={values.paymentMethod === 'cash'}
                      onChange={(e) => setFieldValue('paymentMethod', e.target.value)}
                      className='w-4 h-4 cursor-pointer'
                    />
                    <span className='font-medium'>Cash on delivery</span>
                  </label>

                  <ErrorMessage name='paymentMethod'>
                    {(msg) => <p className='text-red-500 text-sm'>{msg}</p>}
                  </ErrorMessage>
                </div>

                {/* Coupon Code */}
                <div className='flex gap-3'>
                  <input
                    type='text'
                    placeholder='Coupon Code'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className='flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <button
                    type='button'
                    onClick={applyCoupon}
                    className='px-6 py-2 border border-red-300 text-red-500 rounded hover:bg-red-50 font-medium'
                  >
                    Apply
                  </button>
                </div>

                {/* Place Order Button */}
                <SonnerTypes />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
