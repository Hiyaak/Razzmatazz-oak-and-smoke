import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AlarmClock, ArrowLeft } from 'lucide-react'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import { useCart } from '../../Context/CartContext'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { Minus, Plus } from 'lucide-react'

const Subproducts = () => {
  const { name } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { cart, addToCart, updateQuantity } = useCart()

  const brandId = localStorage.getItem('brandId')

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )

  const [subProductCategories, setSubProductCategories] = useState([])

  useEffect(() => {
    getAllPackages()
  }, [])

  const getAllPackages = async () => {
    try {
      const { data } = await ApiService.get(
        `getAllPackagesForCustomer?brandId=${brandId}`
      )

      if (data.status) {
        setSubProductCategories(data.data)
      }
    } catch (error) {
      console.log('Error fetching packages:', error)
    }
  }

  const handleReviewOrder = () => {
    navigate('/shoopingcart')
  }

  const getProductQuantity = productId => {
    const cartItem = cart.find(item => item._id === productId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              {decodeURIComponent(name || 'Packages').toUpperCase()}
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Packages Grid */}
        <div className='flex-1 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden'>
          <div className='grid grid-cols-2 gap-4 cursor-pointer mt-8 pb-4'>
            {subProductCategories.map(item => {
              const quantity = getProductQuantity(item._id)

              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/package/${item._id}`)}
                  className='relative rounded-md overflow-hidden p-4 flex flex-col h-full cursor-pointer'
                >
                  {/* Image */}
                  <div className='w-full h-56 mb-2 overflow-hidden rounded-sm relative'>
                    <img
                      src={`${ImagePath}${item.images[0]}`}
                      alt={item.name}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Name */}
                  <h2 className='text-lg font-semibold mb-3'>{item.name}</h2>

                  {/* Description */}
                  <p className='text-gray-600 text-sm mb-2 line-clamp-2 flex-1'>
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className='text-[#FA0303] font-bold text-right mb-3'>
                    {item.basePricePerPerson} KD
                  </div>

                  {/* Add / Quantity */}
                  {quantity === 0 ? (
                    <button
                      onClick={() =>
                        addToCart({
                          ...item,
                          price: item.basePricePerPerson // normalize
                        })
                      }
                      className='border border-[#FA0303] text-[#FA0303] px-4 rounded hover:bg-red-50 transition-colors font-medium w-full'
                    >
                      + Add
                    </button>
                  ) : (
                    <div className='flex items-center justify-between rounded-md px-2 py-1'>
                      <button
                        onClick={() => updateQuantity(item._id, quantity - 1)}
                        className='w-4 h-4 flex items-center justify-center bg-white text-[#FA0303] border-2 border-[#FA0303] rounded-full'
                      >
                        <Minus className='w-3 h-3' />
                      </button>

                      <span className='px-3 py-0.5 font-medium text-red-500 text-sm border rounded'>
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item._id, quantity + 1)}
                        className='w-4 h-4 flex items-center justify-center bg-white text-[#FA0303] border-2 border-[#FA0303] rounded-full'
                      >
                        <Plus className='w-3 h-3' />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Button */}
        {!(selectedMethod && (selectedArea || selectedGovernate)) ? (
          <div className='p-3 bg-white flex-shrink-0'>
            <button
              onClick={() => navigate('/pickupdeviler')}
              className='w-full bg-[#FA0303] text-white font-semibold py-3 rounded-lg'
            >
              Select your location
            </button>
          </div>
        ) : (
          <div
            className='p-3 bg-white flex-shrink-0'
            onClick={handleReviewOrder}
          >
            <button className='w-full bg-[#FA0303] text-white font-bold py-3 rounded-lg flex justify-between px-6'>
              <span className='bg-white/20 w-6 h-6 flex items-center justify-center text-sm'>
                {cart.length}
              </span>

              <span>Review Order</span>

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
        )}
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Subproducts
