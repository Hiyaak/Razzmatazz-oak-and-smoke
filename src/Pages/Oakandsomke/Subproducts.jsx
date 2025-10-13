import React, { useEffect, useState } from 'react'
import heroImage from '../../assets/concept.jpg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Menu, ShoppingBag, Search, ArrowLeft, LogOut } from 'lucide-react'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import { useCart } from '../../Context/CartContext'

const Subproducts = () => {
  const { name } = useParams()

  const location = useLocation()
  const navigate = useNavigate()
  const { cart, addToCart, updateQuantity } = useCart()

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem('selectedLocation') || '{}'
  )

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
      const { data } = await ApiService.post('getAllSubproducts', payload)
      if (data.status) setSubProductCategories(data.subproducts)
    } catch (error) {
      console.log('Error fetching subproducts:', error)
    }
  }

  const handleReviewOrder = () => {
    navigate('/shoopingcart')
  }

  const getProductQuantity = productId => {
    const cartItem = cart.find(item => item._id === productId)
    return cartItem ? cartItem.quantity : 0
  }

  const handleMenuClick = () => {
    navigate('/menu')
  }

  const handleshoopingcartClick = () => {
    navigate('/shoopingcart')
  }

  const handeleSearch = () => {
    navigate('/search')
  }
  const handleLogout = () => {
    localStorage.removeItem('guestUserId')
    localStorage.removeItem('registredUserId')
    localStorage.removeItem('selectedLocation')

    navigate('/') 
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 h-screen border-r border-gray-200 flex flex-col'>
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
              {decodeURIComponent(name).toUpperCase()}
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Subproducts - Scrollable */}
        <div className='flex-1  overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <div className='grid grid-cols-2 gap-4 cursor-pointer mt-8 pb-4'>
            {subProductCategories.map(item => {
              const quantity = getProductQuantity(item._id)
              return (
                <div
                  key={item._id}
                  className='relative rounded-md overflow-hidden p-4 flex flex-col'
                >
                  {/* Image */}
                  <img
                    src={`${ImagePath}${item.image}`}
                    alt={item.name}
                    className='w-full h-48 object-cover rounded-md mb-4'
                  />

                  {/* Name & Price */}
                  <div className='flex justify-between items-center mb-2'>
                    <h2 className='text-lg font-semibold'>{item.name}</h2>
                    <span className='text-red-500 font-bold'>
                      {item.price} KD
                    </span>
                  </div>

                  {/* Description */}
                  <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                    {item.description}
                  </p>

                  {/* Add to Cart / Quantity Controls */}
                  {quantity === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className='border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-50 transition-colors font-medium'
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className='flex items-center justify-between border border-red-500 rounded-md overflow-hidden'>
                      <button
                        onClick={() => updateQuantity(item._id, quantity - 1)}
                        className='bg-red-500 text-white py-2 px-4 hover:bg-red-600 transition-colors'
                      >
                        -
                      </button>
                      <span className='font-semibold px-4'>{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, quantity + 1)}
                        className='bg-red-500 text-white py-2 px-4 hover:bg-red-600 transition-colors'
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Section */}
        {!(selectedMethod && (selectedArea || selectedGovernate)) ? (
          // ❌ Location not selected — show "Select your location"
          <div className='p-3 border-t border-gray-200 bg-white flex-shrink-0'>
            <button
              onClick={() => navigate('/pickupdeviler')}
              className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors'
            >
              Select your location
            </button>
          </div>
        ) : (
          // Location selected — show "Review Order"
          <div
            className='p-3 border-t border-gray-200 bg-white flex-shrink-0'
            onClick={handleReviewOrder}
          >
            <button className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-between px-6'>
              {/* Left - Items Count */}
              <div className='flex items-center'>
                <span className='bg-white/20 rounded-sm w-6 h-6 flex items-center justify-center text-sm'>
                  {cart.length}
                </span>
              </div>

              {/* Center - Review Order Text */}
              <span>Review Order</span>

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
        )}
      </div>

      {/* Right Panel - Fixed, No Scroll */}
      <div className='flex-1 relative bg-black h-screen overflow-hidden'>
        {/* Top Navigation — hidden on mobile */}
        <div className='hidden md:absolute md:top-6 md:left-6 md:right-6 md:z-10 md:block'>
          <div className='flex justify-between items-center'>
            <div className='flex space-x-4'>
              <button
                onClick={handleMenuClick}
                className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'
              >
                <Menu className='w-6 h-6' />
              </button>
              <button
                onClick={handleshoopingcartClick}
                className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'
              >
                <ShoppingBag className='w-6 h-6' />
              </button>
              <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'>
                <Search onClick={handeleSearch} className='w-6 h-6' />
              </button>
              <button
                onClick={handleLogout}
                className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'
              >
                <LogOut className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section — hidden on mobile */}
        <div className='hidden md:block relative h-full'>
          <img
            src={heroImage}
            alt='Hero Food'
            className='w-full h-full object-cover'
          />

          {/* Bottom IG button */}
          <div className='absolute top-1/2 right-0 z-20 transform -translate-y-1/2'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm'>
              IG
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subproducts
