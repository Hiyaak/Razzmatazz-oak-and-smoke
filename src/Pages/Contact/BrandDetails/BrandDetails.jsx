import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Phone, MapPin, ArrowLeft } from 'lucide-react'
import ApiService from '../../../Services/Apiservice'
import RightPanelLayout from '../../../Layout/RightPanelLayout'

const BrabdDetails = () => {
  const [brandDetails, setBrandDetails] = useState(null)
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (state?.brandId && state?.locationName) {
      console.log('Selected Location Name:', state.locationName)
      fetchBrandAddress(state.brandId, state.locationName)
    }
  }, [state])

  const fetchBrandAddress = async (brandId, locationName) => {
    try {
      const { data } = await ApiService.get(
        `getBrandAddressByBrandAndLocationName/${brandId}/${locationName}`
      )
      if (data.success && data.data) {
        setBrandDetails(data.data)
        console.log('Brand Details:', data.data)
      } else {
        console.log('No branch details found')
      }
    } catch (error) {
      console.log('Error fetching brand details:', error)
    }
  }

  const handleBack = () => navigate('/contact')

  const handleDirections = () => {
    if (brandDetails?.address) {
      const query = encodeURIComponent(brandDetails.address)
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        '_blank'
      )
    } else {
      console.log('No address available for directions')
    }
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Left Panel - Reduced Width */}
      <div
        className='w-full md:w-[42%] h-screen overflow-y-auto scrollbar-hide bg-gray-50'
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

              <div className='bg-white p-3 border-t border-gray-200'>
                <h1 className='text-md font-semibold text-[#FA0303] mb-3'>
                  {state?.locationName || 'Branch'}
                </h1>

                {/* Call Section */}
                <div className='flex items-center justify-between py-2'>
                  <span className='text-gray-900 font-semibold'>Call</span>
                  <button className='flex items-center text-gray-700 hover:text-red-600 transition-colors'>
                    <span className='mr-2 text-sm'>
                      {brandDetails?.phone || 'N/A'}
                    </span>
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
                    <span className='mr-2 text-sm'>
                      {state?.locationName || 'N/A'}
                    </span>
                    <MapPin className='w-4 h-4 text-[#FA0303]' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section with White Background */}
          <div className='bg-white p-3'>
            <div className='bg-gray-100 p-3 -mx-3 -mt-3 mb-3 border-b'>
              <h2 className='text-base font-semibold text-gray-500'>Address</h2>
            </div>
            <div className='flex items-start'>
              <MapPin className='w-5 h-5 text-[#FA0303] mr-2 mt-0.5 flex-shrink-0' />
              <div className='px-2'>
                <h3 className='font-semibold text-gray-800 text-md'>
                  {state?.locationName || 'Branch'}
                </h3>
                <p className='text-gray-600 mt-1 text-sm leading-relaxed'>
                  {brandDetails?.address || 'No address available'}
                </p>
              </div>
            </div>
          </div>

          {/* Hours Section*/}
          <div className='mb-6 bg-white p-3 border-t border-gray-200'>
            <div className='bg-gray-100 p-4 rounded-md -mx-3 -mt-3 mb-3 border-b'>
              <h2 className='text-base font-semibold text-gray-500'>Hours</h2>
            </div>

            <div className='space-y-2'>
              {brandDetails?.days?.length > 0 ? (
                brandDetails.days.map((item, index) => {
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
                        {formatTime(item.startingTime)} -{' '}
                        {formatTime(item.closingTime)}
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

      <RightPanelLayout />
    </div>
  )
}

export default BrabdDetails
