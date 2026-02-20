import React, { useEffect, useState } from 'react'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AlarmClock, ArrowLeft, Minus, Plus } from 'lucide-react'
import { useCart } from '../../Context/CartContext'
import ApiService, { ImagePath } from '../../Services/Apiservice'

const DiyProducts = () => {
  const navigate = useNavigate()
  const { name } = useParams()

  const location = useLocation()
  const { cart, addToCart, updateQuantity } = useCart()

  const [subProductCategories, setSubProductCategories] = useState([])
  const searchParams = new URLSearchParams(location.search)
  const productId = searchParams.get('productId')

  useEffect(() => {
    if (productId) {
      getSubProductCategories(productId)
    }
  }, [productId])

  const getSubProductCategories = async productId => {
    try {
      const payload = {
        product_id: productId,
        brandName: 'Oak and Smoke'
      }
      const { data } = await ApiService.post('getAllSubproducts1', payload)
      console.log('Subproducts Response:', data)
      if (data.status) setSubProductCategories(data.subproducts)
    } catch (error) {
      console.log('Error fetching subproducts:', error)
    }
  }

  const getProductQuantity = productId => {
    const cartItem = cart.find(
      item => item.cartItemId === `product-${productId}`
    )
    return cartItem ? cartItem.quantity : 0
  }

  const handleNavigate = item => {
    navigate(`/diyproductdetails/${item._id}`, {
      state: { product: item }
    })
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
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
              {decodeURIComponent(name).toUpperCase()}
            </h1>

            <div className='w-9' />
          </div>
        </div>
        {/* Subproducts - Scrollable */}
        <div className='flex-1 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <div className='grid grid-cols-2 gap-4 cursor-pointer mt-8 pb-4'>
            {subProductCategories.map(item => {
              const quantity = getProductQuantity(item._id)
              return (
                <div
                  key={item._id}
                  className='relative rounded-md overflow-hidden p-4 flex flex-col h-full' // Added h-full here
                >
                  {/* Image */}
                  <div className='w-full h-56 mb-2 overflow-hidden rounded-sm relative'>
                    <img
                      src={`${ImagePath}${item.image}`}
                      alt={item.name}
                      className='w-full h-full object-cover'
                      onClick={() => handleNavigate(item)}
                    />

                    {/* Light gray strip at the bottom of image for timeToPrepare */}
                    {item.timeToPrepare && (
                      <div className='absolute bottom-0 w-full bg-[#F4ECD9]/80 p-1 flex justify-center items-center gap-1'>
                        <AlarmClock className='w-4 h-4 text-[#FA0303]' />
                        <span className='text-[#FA0303] text-sm font-medium'>
                          {item.timeToPrepare}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h2 className='text-lg font-semibold mb-3'>{item.name}</h2>

                  {/* Description - Added flex-1 here */}
                  <p className='text-gray-600 text-sm mb-2 line-clamp-2 flex-1'>
                    {item.description}
                  </p>

                  {/* Price moved here (just above Add button) */}
                  <div className='text-[#FA0303] font-bold text-right mb-3'>
                    {item.price} KD
                  </div>

                  <button
                    onClick={() => handleNavigate(item)}
                    className='border border-[#FA0303] text-[#FA0303] px-4 rounded hover:bg-red-50 transition-colors font-medium w-full'
                  >
                    + Add
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default DiyProducts
