import React from 'react'
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MessageSquareText,
  PenLine
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../Context/CartContext'
import { ImagePath } from '../../Services/Apiservice'
import RightPanelLayout from '../../Layout/RightPanelLayout'

const ShoppingCartPage = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart } = useCart()

  const brandId = localStorage.getItem('brandId')

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleGotocheckout = () => {
    const storedBrandId = localStorage.getItem('brandId')
    if (!storedBrandId) {
      toast.error('No brand selected')
      return
    }

    // Get user IDs for this brand
    const guestUserId = sessionStorage.getItem(`guestUserId_${storedBrandId}`)
    const registredUserId = localStorage.getItem(
      `registredUserId_${storedBrandId}`
    )

    if (guestUserId || registredUserId) {
      navigate('/adress')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar (40% on desktop, full on mobile) */}
      <div className='w-full md:w-2/5 h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate(-1)}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              Shopping Cart
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* Promotions Section */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Promotions
              </h2>
            </div>

            {/* White Box Container */}
            <div className='bg-white p-5 border-gray-300'>
              <div className='flex items-center'>
                {/* Tag Icon */}
                <PenLine className='w-5 h-5 text-gray-500 mr-3' />

                {/* Input Field */}
                <input
                  type='text'
                  placeholder='Enter promotion code'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1'
                />
              </div>
            </div>
          </div>

          {/* Special Remarks Section */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Special Remarks
              </h2>
            </div>

            {/* White Box Container */}
            <div className='bg-white p-5 border-gray-300'>
              <div className='flex items-center'>
                {/* Message Icon */}
                <MessageSquareText className='w-5 h-5 text-gray-500 mr-3' />

                {/* Input Field */}
                <input
                  type='text'
                  placeholder='Enter Your Special Remarks'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1'
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>Items</h2>
            </div>

            {cart.length === 0 ? (
              // Empty Cart State
              <div className='text-center py-6 bg-white'>
                <ShoppingCart className='w-16 h-16 text-gray-300 mx-auto mb-3' />
                <p className='text-gray-700 font-semibold mb-1'>
                  Your cart is empty.
                </p>
                <p className='text-gray-500 text-sm mb-4'>
                  Add some items to your cart.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className='px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 mx-auto'
                >
                  <span>Start Shopping</span>
                </button>
              </div>
            ) : (
              // Cart Items List
              <div className='space-y-4 mt-4 px-4 pb-4'>
                {cart.map(item => (
                  <div
                    key={item._id}
                    className='flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0'
                  >
                    {/* Product Image */}
                    <img
                      src={`${ImagePath}${item.image}`}
                      alt={item.name}
                      className='w-20 h-20 object-cover rounded-md'
                    />

                    {/* Name & Price */}
                    <div className='flex-1 flex flex-col justify-center px-4'>
                      <h2 className='text-lg font-semibold'>{item.name}</h2>
                      <span className='text-red-500 font-bold'>
                        {item.price} KD
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className='flex items-center border border-gray-300 rounded-lg'>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        className='p-2 hover:bg-gray-100 transition-colors'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='px-3 py-1 min-w-8 text-center'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        className='p-2 hover:bg-gray-100 transition-colors'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className='p-2 rounded-full hover:bg-red-100 transition-colors ml-4'
                      title='Remove item'
                    >
                      <Trash2 className='w-4 h-4 text-red-500' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary - Fixed at Bottom (No Scroll) */}
        {cart.length > 0 &&
          (!(selectedMethod && (selectedArea || selectedGovernate)) ? (
            // ❌ Location not selected — show "Select your location"
            <div className='p-3 border-t border-gray-200 bg-white flex-shrink-0'>
              <button
                onClick={() => navigate('/pickupdeviler')}
                className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors'
              >
                Select your location
              </button>
            </div>
          ) : (
            // ✅ Location selected — show "Go to checkout"
            <div
              className='p-3 border-t border-gray-200 bg-white flex-shrink-0'
              onClick={handleGotocheckout}
            >
              <button className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-between px-6'>
                {/* Left - Items Count */}
                <div className='flex items-center'>
                  <span className='bg-white/20 rounded-sm w-6 h-6 flex items-center justify-center text-sm'>
                    {cart.length}
                  </span>
                </div>

                {/* Center - Checkout Text */}
                <span>Go to checkout</span>

                {/* Right - Total Price */}
                <span>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(3)}{' '}
                  KD
                </span>
              </button>
            </div>
          ))}
      </div>

      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default ShoppingCartPage
