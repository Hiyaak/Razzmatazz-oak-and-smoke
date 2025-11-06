import React, { useEffect, useState } from 'react'
import {
  Clock,
  MapPin,
  Menu,
  ShoppingBag,
  Search,
  AlertCircle,
  Instagram
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'

import oak from '../../assets/oaklogo1.png'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { LuBike } from 'react-icons/lu'

const FoodDeliveryApp = () => {
  const [productCategories, setproductCategories] = useState([])
  const [managementStatus, setManagementStatus] = useState({
    deliveryStatus: true,
    pickupStatus: true
  })
  const [selectedTab, setSelectedTab] = useState('Delivery')
  const [brandId, setBrandId] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState({})
  const navigate = useNavigate()

  const getProductCategories = async () => {
    try {
      const { data } = await ApiService.get(
        `getAllProductByBrandName/Oak and Smoke`
      )
      if (data.status) {
        setproductCategories(data.products)

        if (data.management) {
          setManagementStatus(data.management)
        }

        if (data.products.length > 0) {
          const brandIdFromApi = data.products[0].brand_id
          setBrandId(brandIdFromApi)
          localStorage.setItem('brandId', brandIdFromApi)
        }
      }
    } catch (error) {
      console.error('Error fetching product categories:', error)
    }
  }

  useEffect(() => {
    if (brandId) {
      const locationData = localStorage.getItem(`selectedLocation_${brandId}`)
      if (locationData) {
        try {
          setSelectedLocation(JSON.parse(locationData))
        } catch (err) {
          console.error('Invalid JSON in location storage:', err)
        }
      }
    }
  }, [brandId])

  useEffect(() => {
    getProductCategories()
  }, [])

  const {
    selectedMethod,
    selectedGovernate,
    selectedGovernateId,
    selectedArea,
    selectedAreaId
  } = selectedLocation || {}

  console.log('Full selectedLocation:', {
    selectedMethod,
    selectedGovernate,
    selectedGovernateId,
    selectedArea,
    selectedAreaId
  })

  const handleProduct = (productId, productName) => {
    navigate(
      `/subproduct/${encodeURIComponent(productName)}?productId=${productId}`
    )
  }

  const handleMenuClick = () => {
    const storedBrandId = localStorage.getItem('brandId')
    const registredUserId = localStorage.getItem(
      `registredUserId_${storedBrandId}`
    )

    if (registredUserId) {
      navigate('/userprofile')
    } else {
      navigate('/profile')
    }
  }

  const handleshoopingcartClick = () => {
    navigate('/shoopingcart')
  }

  const handeleSearch = () => {
    navigate('/search')
  }

  const handleBrandClick = () => {
    navigate('/contact')
  }

  const pickupdelivery = method => {
    navigate('/pickupdeviler', { state: { method } })
  }

  return (
    <>
      {/* Desktop layout  */}
      <div className='hidden md:flex min-h-screen bg-gray-50'>
        {/* Left Panel*/}
        <div className='w-[42%] bg-white border-r border-gray-100 flex flex-col h-screen'>
          <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {/* Header Section */}
            <div
              onClick={handleBrandClick}
              className='cursor-pointer transition-colors border-b border-gray-200'
            >
              <div className='flex items-center justify-between px-6 py-4 hover:bg-gray-100'>
                {/* Left side - logo and text */}
                <div className='flex items-center space-x-3'>
                  <img
                    src={oak}
                    alt='Logo'
                    className='w-16 h-16 object-contain'
                  />
                  <div>
                    <h1 className='font-quicksand font-bold text-[16px] leading-tight text-gray-900 tracking-wide'>
                      Oak and Smoke
                    </h1>

                    <p className='text-sm text-gray-500'>Smoke Meat Everyday</p>
                  </div>
                </div>

                {/* Right side - centered FiAlertCircle */}
                <div className='flex items-center justify-center'>
                  <AlertCircle className='w-5 h-5 text-gray-600' />
                </div>
              </div>

              {/* Delivery/Pickup Tabs */}
              <div className='flex justify-center gap-24 px-6 py-4 border-t border-gray-300'>
                {managementStatus.deliveryStatus && (
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setSelectedTab('delivery')
                      pickupdelivery('delivery')
                    }}
                    className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                      selectedTab === 'delivery'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-400 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Delivery
                  </button>
                )}

                {managementStatus.pickupStatus && (
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setSelectedTab('pickup')
                      pickupdelivery('pickup')
                    }}
                    className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                      selectedTab === 'pickup'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-400 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Pickup
                  </button>
                )}
              </div>
            </div>

            {/* Location and Time Section */}
            <div className='px-4 pb-4 space-y-4 mt-2 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-10 pl-4'>
                  <LuBike className='w-5 h-5 text-gray-400' />
                  <p className='text-sm text-gray-600'>
                    {selectedMethod === 'delivery'
                      ? 'Deliver to'
                      : 'Pickup from'}
                  </p>
                </div>

                <div className='flex items-center gap-3'>
                  {selectedGovernate && selectedArea ? (
                    <>
                      <p className='text-sm font-medium text-gray-900'>
                        {selectedArea}
                      </p>
                      <button
                        onClick={() => navigate('/pickupdeviler')}
                        className='text-sm text-red-500 hover:text-red-600'
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate('/pickupdeviler')}
                      className='text-sm font-medium text-gray-900 hover:text-gray-700'
                    >
                      Choose location
                    </button>
                  )}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-10 pl-4'>
                  <Clock className='w-5 h-5 text-gray-400' />
                  <p className='text-sm text-gray-600'>Earliest arrival</p>
                </div>
              </div>
            </div>

            {/* Food Categories */}
            <div className='px-2 pt-8 pb-4 bg-gray-100 grid grid-cols-2 gap-2 cursor-pointer'>
              {productCategories.map(item => (
                <div
                  key={item._id}
                  className='relative rounded-lg overflow-hidden shadow'
                  onClick={() => handleProduct(item._id, item.productName)}
                >
                  <img
                    src={`${ImagePath}${item.product_img[0]}`}
                    alt={item.productName}
                    className='w-full h-60 object-cover'
                  />
                  <div className='absolute inset-0 bg-black/25 flex items-center justify-center'>
                    <h3 className='text-gray-100 font-bold text-lg text-center'>
                      {item.productName.toUpperCase()}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Button at Bottom */}
          {!(selectedMethod && (selectedArea || selectedGovernate)) && (
            <div className='p-2 border-t border-gray-200 bg-white flex-shrink-0'>
              <button
                onClick={() => navigate('/pickupdeviler')}
                className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white py-3 rounded-lg transition-colors'
              >
                Select your location
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - 60% - No Scroll */}
        <RightPanelLayout />
      </div>

      {/* Mobile layout (below md) */}
      <div className='block md:hidden flex flex-col h-screen bg-gray-50'>
        <div className='flex flex-col h-full'>
          {/* Header Section - Fixed */}
          <nav className='w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm flex-shrink-0'>
            <div className='flex items-center space-x-2'>
              <button onClick={handleMenuClick} className='p-2'>
                <Menu className='w-6 h-6 text-gray-700' />
              </button>
            </div>

            <div className='flex items-center space-x-2'>
              <button onClick={handleshoopingcartClick} className='p-2'>
                <ShoppingBag className='w-6 h-6 text-gray-700' />
              </button>
              <button className='p-2'>
                <Search
                  onClick={handeleSearch}
                  className='w-6 h-6 text-gray-700'
                />
              </button>
            </div>
          </nav>

          {/* Instagram Floating Button */}
          <div className='absolute top-1/3 right-0 z-20 transform -translate-y-1/2'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm'>
              <Instagram className='w-6 h-6 text-white' />
            </div>
          </div>

          {/* Scrollable Content Below Header */}
          <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {/* Hero Image */}
            <div className='w-full relative'>
              <img
                src={heroImage}
                alt='Hero Food'
                className='w-full h-48 object-fill'
              />
            </div>

            <div
              onClick={handleBrandClick}
              className='flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition'
            >
              {/* Left side - Logo and Text */}
              <div className='flex items-center space-x-3'>
                <img
                  src={oak}
                  alt='Logo'
                  className='w-12 h-12 object-contain'
                />
                <div>
                  <h1 className='text-md font-bold text-gray-900'>
                    Oak and Smoke
                  </h1>
                  <p className='text-sm text-gray-500'>Smoke Meat Everyday</p>
                </div>
              </div>

              {/* Right side - Info icon */}
              <div className='flex items-center justify-center'>
                <AlertCircle className='w-5 h-5 text-gray-600' />
              </div>
            </div>

            {/* Delivery/Pickup Tabs */}
            <div className='flex justify-center gap-24 px-6 py-4 border-t border-gray-300'>
              <button
                onClick={e => {
                  e.stopPropagation()
                  setSelectedTab('Delivery')
                  pickupdelivery('delivery')
                }}
                className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                  selectedTab === 'delivery'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-400 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Delivery
              </button>
              <button
                onClick={e => {
                  e.stopPropagation()
                  setSelectedTab('Pickup')
                  pickupdelivery('pickup')
                }}
                className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                  selectedTab === 'Pickup'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-400 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pickup
              </button>
            </div>

            {/* Location and Time Info */}
            <div className='px-4 pb-4 space-y-4 mt-2 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                  <MapPin className='w-5 h-5 text-gray-400' />
                  <p className='text-sm text-gray-600'>
                    {selectedMethod === 'delivery'
                      ? 'Deliver to'
                      : 'Pickup from'}
                  </p>
                </div>
                <div className='flex items-center gap-6'>
                  {selectedGovernate && selectedArea ? (
                    <>
                      <p className='text-sm font-medium text-gray-900'>
                        {selectedArea}
                      </p>
                      <button
                        onClick={() => navigate('/pickupdeviler')}
                        className='text-sm text-red-500 hover:text-red-600'
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate('/pickupdeviler')}
                      className='text-sm font-medium text-gray-900 hover:text-gray-700'
                    >
                      Choose location
                    </button>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-6'>
                <Clock className='w-5 h-5 text-gray-400' />
                <p className='text-sm text-gray-600'>Earliest arrival</p>
              </div>
            </div>

            {/* Product Grid Section - Scrollable */}
            <div className='px-1 py-1'>
              <div className='px-2 pt-8 pb-4 bg-gray-100 grid grid-cols-2 gap-2 cursor-pointer'>
                {productCategories.map(item => (
                  <div
                    key={item._id}
                    className='relative rounded-lg overflow-hidden shadow'
                    onClick={() => handleProduct(item._id, item.productName)}
                  >
                    <img
                      src={`${ImagePath}${item.product_img[0]}`}
                      alt={item.productName}
                      className='w-full h-60 object-cover'
                    />
                    <div className='absolute inset-0 bg-black/25 flex items-center justify-center'>
                      <h3 className='text-gray-100 font-bold text-lg text-center'>
                        {item.productName.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Select Location Button - Fixed at bottom */}
        {!(selectedMethod && (selectedArea || selectedGovernate)) && (
          <div className='p-3 border-t border-gray-200 bg-white flex-shrink-0'>
            <button
              onClick={() => navigate('/pickupdeviler')}
              className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors'
            >
              Select your location
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default FoodDeliveryApp
