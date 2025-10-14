import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu,
  ShoppingBag,
  Search,
  LogOut,
  Phone,
  MapPin,
  ArrowLeft
} from 'lucide-react'
import heroImage from '../../../assets/concept.jpg'
import ApiService from '../../../Services/Apiservice'

const BrabdDetails = () => {
  const [timings, setTimings] = useState([])
  const navigate = useNavigate()
  const brandId = localStorage.getItem('brandId')

  const getTimngs = async () => {
    try {
      const { data } = await ApiService.get(`getWorkingHours/${brandId}`)
      if (data.success) {
        setTimings(data.data.days)
        console.log('timings', data.data.days)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTimngs()
  }, [])

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

  const handleBack = () => {
    navigate('/contact')
  }

  const handleCall = () => {
    window.location.href = 'tel:+9655307160'
  }

  const handleDirections = () => {
    console.log('Get directions clicked')
  }
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Left Panel - Reduced Width */}
      <div
        className='w-full md:w-2/5 h-screen overflow-y-auto scrollbar-hide bg-gray-50'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className='min-h-screen bg-gray-50'>
          {/* Header */}
          <div className='sticky top-0 bg-gray-50 z-10  border-gray-200'>
            <div className='flex items-center p-4'>
              <button onClick={handleBack} className='mr-4'>
                <ArrowLeft className='w-6 h-6 text-gray-700' />
              </button>
            </div>
          </div>

          {/* Content */}

          <div>
            <div className='border-b border-t border-gray-200'>
              <h2 className='px-4 py-3 text-sm font-medium text-gray-500 bg-gray-100'>
                Details
              </h2>

              <div className='bg-white p-3 border-t border-gray-100 '>
                <h1 className='text-md font-semibold text-[#FA0303] mb-3'>
                  Shuwaikh
                </h1>

                {/* Call Section */}
                <div className='flex items-center justify-between py-2  border-gray-100'>
                  <span className='text-gray-900 font-semibold'>Call</span>
                  <button
                    onClick={handleCall}
                    className='flex items-center text-gray-700 hover:text-red-600 transition-colors'
                  >
                    <span className='mr-2 text-sm'>+9655307160</span>
                    <Phone className='w-4 h-4 text-[#FA0303]' />
                  </button>
                </div>

                {/* Get Directions Section */}
                <div className='flex items-center justify-between py-2'>
                  <span className='text-gray-900 font-semibold'>
                    Get Directions
                  </span>
                  <button
                    onClick={handleDirections}
                    className='flex items-center text-gray-700 hover:text-red-600 transition-colors'
                  >
                    <span className='mr-2 text-sm'>Shuwaikh Industrial 1</span>
                    <MapPin className='w-4 h-4 text-[#FA0303]' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section with White Background */}
          <div className=' bg-white p-3'>
            <div className='bg-gray-100 p-3  -mx-3 -mt-3 mb-3'>
              <h2 className='text-base font-semibold text-gray-500'>Address</h2>
            </div>
            <div className='flex items-start'>
              <MapPin className='w-5 h-5 text-[#FA0303] mr-2 mt-0.5 flex-shrink-0' />
              <div className='px-2'>
                <h3 className='font-semibold text-gray-800 text-md'>
                  Shuwaikh Industrial 1
                </h3>
                <p className='text-gray-600 mt-1 text-sm leading-relaxed'>
                  Avenue: oak and smoke restaurant, Block: 1, Street: 10,
                  Building: creative design, Floor: ground floor
                </p>
              </div>
            </div>
          </div>

          {/* Hours Section*/}
          <div className='mb-6 bg-white p-3 border-t border-gray-200'>
            <div className='bg-gray-100 p-4 rounded-md -mx-3 -mt-3 mb-3'>
              <h2 className='text-base font-semibold text-gray-500'>Hours</h2>
            </div>

            <div className='space-y-2'>
              {timings.length > 0 ? (
                timings.map((item, index) => {
                  const start = item.startingTime
                  const end = item.closingTime

                  // Convert 24h time to 12h format
                  const formatTime = time => {
                    const [h, m] = time.split(':')
                    const hour = parseInt(h)
                    const suffix = hour >= 12 ? 'PM' : 'AM'
                    const formattedHour = hour % 12 === 0 ? 12 : hour % 12
                    return `${formattedHour}:${m} ${suffix}`
                  }

                  return (
                    <div
                      key={index}
                      className='flex items-center justify-between py-1 last:border-b-0'
                    >
                      <span className='text-gray-700 text-sm'>{item.day}</span>
                      <span className='text-gray-600 text-sm'>
                        {formatTime(start)} - {formatTime(end)}
                      </span>
                    </div>
                  )
                })
              ) : (
                <p className='text-gray-500 text-sm text-center py-2'>
                  No hours available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Increased Width to 3/5 */}
      <div className='hidden md:block md:w-3/5 relative bg-black h-screen overflow-hidden'>
        {/* Top Navigation */}
        <div className='absolute top-6 left-6 right-6 z-10'>
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

export default BrabdDetails
