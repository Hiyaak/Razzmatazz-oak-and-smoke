import React from 'react'
import { ArrowLeft, Edit, Trash2, Plus, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'

const ShoppingCart = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar (40% on desktop, full on mobile) */}
      <div className='w-full md:w-2/5  min-h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center mb-4'>
            <button className='p-2 hover:bg-gray-200 rounded-full transition-colors'>
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
          </div>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Shopping Cart
          </h1>
        </div>

        {/* Content */}
        <div className='flex-1 p-6'>
          {/* Promotions Section */}
          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Promotions
            </h2>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-orange-500 rounded'
                />
                <span className='text-gray-700'>Enter promotion code</span>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-orange-500 rounded'
                />
                <span className='text-gray-700'></span>
              </div>
            </div>
          </div>

          {/* Special Remarks Section */}
          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Special Remarks
            </h2>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-orange-500 rounded'
                />
                <span className='text-gray-700'>
                  Enter your Special Remarks
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-orange-500 rounded'
                />
                <span className='text-gray-700'></span>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>Items</h2>

            {/* Cart Item */}
            <div className='bg-white rounded-lg border border-gray-200 p-4 mb-4'>
              <div className='flex items-start justify-between mb-3'>
                <button className='flex items-center space-x-2 text-orange-500'>
                  <Edit className='w-4 h-4' />
                  <span className='text-sm font-medium'>edit</span>
                </button>
                <button className='text-red-500 hover:text-red-600'>
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>

              <div className='mb-3'>
                <h3 className='font-medium text-gray-900'>JAW BREAKER</h3>
                <p className='text-lg font-semibold text-gray-900'>KD 7.250</p>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>remove</span>
                <div className='flex items-center space-x-3'>
                  <button className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100'>
                    <Minus className='w-4 h-4 text-gray-600' />
                  </button>
                  <span className='text-gray-700'>1</span>
                  <button className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100'>
                    <Plus className='w-4 h-4 text-gray-600' />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className='border-t border-gray-200 my-6'></div>

            {/* Checkout Section */}
            <div className='flex items-center justify-between mb-6'>
              <button className='bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors'>
                1 Go to checkout
              </button>
              <div className='text-right'>
                <p className='text-2xl font-semibold text-gray-900'>7.250 KD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel with Background Image */}
      <div className='hidden md:block md:w-3/5 relative'>
        <img
          src={heroImage}
          alt='Shopping Cart Background'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  )
}

export default ShoppingCart
