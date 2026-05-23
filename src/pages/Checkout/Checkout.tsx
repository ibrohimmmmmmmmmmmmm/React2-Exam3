import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
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
      ((it.discountPrice && it.hasDiscount
        ? it.discountPrice
        : it.price ?? 0) *
        it.quantity),
    0
  )

  const shipping = 0
  const total = subtotal - discount

  const handleSubmit = async (values: any) => {
    console.log('Form submitted:', values)

    toast.success('Order placed successfully!')
    navigate('/order-confirmation')
  }

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setDiscount(subtotal * 0.1)
      toast.success('Coupon applied!')
    }
  }

  return (
    <div className='py-6 md:py-10 px-4 sm:px-6 lg:px-25 bg-white min-h-screen'>
      {/* Breadcrumb */}
      <p className='text-xs sm:text-sm text-gray-500 mb-6 md:mb-8 overflow-x-auto whitespace-nowrap'>
        Product / View Cart /{' '}
        <span className='text-black font-semibold'>CheckOut</span>
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 md:mb-20'>
        {/* LEFT SIDE */}
        <div className='lg:col-span-8 border border-gray-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-sm'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6 md:mb-8'>
            Billing Details
          </h2>

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
            {() => (
              <Form className='space-y-4 md:space-y-5'>
                {/* First + Last Name */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <Field
                      type='text'
                      name='firstName'
                      placeholder='First name'
                      className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                    />
                    <ErrorMessage name='firstName'>
                      {(msg) => (
                        <p className='text-red-500 text-sm mt-1'>{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>

                  <div>
                    <Field
                      type='text'
                      name='lastName'
                      placeholder='Last name'
                      className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                    />
                    <ErrorMessage name='lastName'>
                      {(msg) => (
                        <p className='text-red-500 text-sm mt-1'>{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <Field
                    type='text'
                    name='streetAddress'
                    placeholder='Street address'
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                  />
                  <ErrorMessage name='streetAddress'>
                    {(msg) => (
                      <p className='text-red-500 text-sm mt-1'>{msg}</p>
                    )}
                  </ErrorMessage>
                </div>

                {/* Apartment */}
                <div>
                  <Field
                    type='text'
                    name='apartment'
                    placeholder='Apartment, floor, etc. (optional)'
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                  />
                </div>

                {/* Town */}
                <div>
                  <Field
                    type='text'
                    name='townCity'
                    placeholder='Town/City'
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                  />
                  <ErrorMessage name='townCity'>
                    {(msg) => (
                      <p className='text-red-500 text-sm mt-1'>{msg}</p>
                    )}
                  </ErrorMessage>
                </div>

                {/* Phone + Email */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <Field
                      type='text'
                      name='phoneNumber'
                      placeholder='Phone number'
                      className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                    />
                    <ErrorMessage name='phoneNumber'>
                      {(msg) => (
                        <p className='text-red-500 text-sm mt-1'>{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>

                  <div>
                    <Field
                      type='email'
                      name='emailAddress'
                      placeholder='Email address'
                      className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                    />
                    <ErrorMessage name='emailAddress'>
                      {(msg) => (
                        <p className='text-red-500 text-sm mt-1'>{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Save Info */}
                <div className='flex items-start sm:items-center gap-3 pt-2'>
                  <Field
                    type='checkbox'
                    name='saveInfo'
                    id='saveInfo'
                    className='mt-1 sm:mt-0 w-5 h-5 accent-red-500 cursor-pointer'
                  />

                  <label
                    htmlFor='saveInfo'
                    className='text-sm sm:text-base text-gray-700 leading-6 cursor-pointer'
                  >
                    Save this information for faster check-out next time
                  </label>
                </div>

                <Field type='hidden' name='paymentMethod' />
              </Form>
            )}
          </Formik>
        </div>

        {/* RIGHT SIDE */}
        <div className='lg:col-span-4'>
          {/* ORDER SUMMARY */}
          <div className='bg-gray-50 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm border border-gray-100'>
            <h3 className='font-bold text-xl mb-5'>Order Summary</h3>

            <div className='space-y-4 max-h-[400px] overflow-y-auto pr-1'>
              {items.map((it) => (
                <div
                  key={it.id}
                  className='flex gap-3 pb-4 border-b last:border-b-0'
                >
                  <img
                    src={it.image || ''}
                    alt={it.productName}
                    className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border'
                  />

                  <div className='flex-1 min-w-0'>
                    <p className='font-semibold text-sm sm:text-base line-clamp-2'>
                      {it.productName}
                    </p>

                    <p className='text-sm text-gray-500 mt-1'>
                      $
                      {(
                        it.discountPrice && it.hasDiscount
                          ? it.discountPrice
                          : it.price ?? 0
                      ).toFixed(2)}
                    </p>

                    <div className='flex items-center justify-between mt-2'>
                      <span className='text-sm text-gray-500'>
                        Qty: {it.quantity}
                      </span>

                      <span className='font-bold text-sm sm:text-base'>
                        $
                        {(
                          (it.discountPrice && it.hasDiscount
                            ? it.discountPrice
                            : it.price ?? 0) * it.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOTALS */}
          <div className='bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-500'>Subtotal</span>
                <span className='font-semibold'>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-gray-500'>Shipping</span>
                <span className='font-semibold text-green-600'>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {discount > 0 && (
                <div className='flex items-center justify-between text-green-600'>
                  <span>Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}

              <div className='border-t pt-4 flex items-center justify-between'>
                <span className='text-lg font-bold'>Total</span>
                <span className='text-xl font-extrabold'>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
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
            {({ values, setFieldValue }) => (
              <Form className='space-y-5'>
                {/* Payment Methods */}
                <div className='bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm'>
                  <h3 className='text-lg font-bold'>Payment Method</h3>

                  {/* BANK */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      values.paymentMethod === 'bank'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='bank'
                      checked={values.paymentMethod === 'bank'}
                      onChange={(e) =>
                        setFieldValue('paymentMethod', e.target.value)
                      }
                      className='w-4 h-4 accent-red-500'
                    />

                    <div>
                      <p className='font-semibold'>Bank</p>
                      <p className='text-sm text-gray-500'>
                        Visa / Mastercard
                      </p>
                    </div>

                    <div className='ml-auto flex gap-2'>
                      <img
                        src='https://via.placeholder.com/40x24?text=Visa'
                        alt='Visa'
                        className='h-6 rounded'
                      />
                      <img
                        src='https://via.placeholder.com/40x24?text=MC'
                        alt='Mastercard'
                        className='h-6 rounded'
                      />
                    </div>
                  </label>

                  {/* CASH */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      values.paymentMethod === 'cash'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='cash'
                      checked={values.paymentMethod === 'cash'}
                      onChange={(e) =>
                        setFieldValue('paymentMethod', e.target.value)
                      }
                      className='w-4 h-4 accent-red-500'
                    />

                    <div>
                      <p className='font-semibold'>Cash on delivery</p>
                      <p className='text-sm text-gray-500'>
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <ErrorMessage name='paymentMethod'>
                    {(msg) => (
                      <p className='text-red-500 text-sm'>{msg}</p>
                    )}
                  </ErrorMessage>
                </div>

                {/* COUPON */}
                <div className='flex flex-col sm:flex-row gap-3'>
                  <input
                    type='text'
                    placeholder='Coupon Code'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className='flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500'
                  />

                  <button
                    type='button'
                    onClick={applyCoupon}
                    className='w-full sm:w-auto px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition'
                  >
                    Apply
                  </button>
                </div>

                {/* BUTTON */}
                <div className='pt-2'>
                  <SonnerTypes />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}