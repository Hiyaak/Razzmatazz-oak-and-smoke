import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import { ArrowLeft } from 'lucide-react'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const PackageDetails = () => {
  const { packageId } = useParams()
  console.log('packageId:', packageId)

  const navigate = useNavigate()
  const brandId = localStorage.getItem('brandId')

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)

  const [packageData, setPackageData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!packageId || !brandId) return

      setLoading(true)
      setError('')

      try {
        const { data } = await ApiService.get(
          `getBrandCateringPackages?packageId=${packageId}&brandId=${brandId}`
        )
        console.log('API RESPONSE:', data)
        if (data.status) {
          setPackageData(data)
        } else {
          setError('Failed to load package details')
        }
      } catch (err) {
        console.error('Package API Error:', err.response?.data || err)
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchPackageDetails()
  }, [packageId, brandId])

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* LEFT PANEL */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='p-2 hover:bg-gray-200 rounded-full'
          >
            <ArrowLeft className='w-5 h-5 text-gray-600' />
          </button>
          <h1 className='text-xl font-bold'>{packageData?.package?.name}</h1>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
          {/* Image */}
          <div className='w-full h-96'>
            <img
              src={`${ImagePath}${packageData?.package?.images?.[0]}`}
              alt={packageData?.package?.name}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Calendar Section */}
          <div className='border-b border-gray-200'>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Select Date
              </h2>
            </div>

            <div className='p-4'>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
                className='w-full border-0'
              />
            </div>
          </div>

          {/* Time Slots */}
          <div className='border-b border-gray-200'>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Select Time
              </h2>
            </div>

            <div className='p-4'>
              {/* Availability Note */}
              {packageData?.dateAvailable && (
                <p className='text-green-600 text-sm mb-3'>
                  {packageData?.note}
                </p>
              )}

              {!packageData?.dateAvailable && (
                <p className='text-red-500 text-sm mb-3'>Date not available</p>
              )}

              <div className='flex flex-wrap gap-3'>
                {packageData?.allTimeSlots?.map((slot, index) => {
                  const isBooked = packageData?.bookedTimeSlots?.includes(slot)
                  const isAvailable =
                    packageData?.availableTimeSlots?.includes(slot)

                  return (
                    <button
                      key={index}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-2 rounded-md border text-sm transition
              
              ${
                selectedSlot === slot
                  ? 'bg-green-600 text-white'
                  : isAvailable
                  ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='border-b border-gray-200'>
            {/* Heading */}
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Description
              </h2>
            </div>

            {/* Content */}
            <div className='p-4 space-y-3'>
              {/* API Description */}
              <p className='text-sm whitespace-pre-line'>
                {packageData?.package?.description}
              </p>

              {/* Static Note */}
              <p className='text-sm leading-relaxed'>
                *Please note that the set up may differ from the photo. Please
                contact us to request specific details relating to chafing dish
                & decor selection. We will try our best to accommodate your
                request.
              </p>
            </div>
          </div>

          {/* Categories */}
          {packageData?.package?.categories?.map(category => (
            <div key={category.id} className='border-b border-gray-200'>
              {/* Category Section */}
              <div className=' border-gray-200'>
                {/* Heading Only (Grey Background) */}
                <div className='bg-gray-100 p-4'>
                  <h2 className='text-base font-semibold text-gray-800'>
                    {category.name}
                  </h2>
                </div>

                {/* Required + Min/Max (White Section) */}
                <div className='p-4 flex items-center justify-between'>
                  {/* Left Side */}
                  {category.minItems > 0 && (
                    <p className='text-sm font-medium text-gray-700'>
                      Required
                    </p>
                  )}

                  {/* Right Side */}
                  <p className='text-sm text-gray-600'>
                    min: {category.minItems}, max: {category.maxItems}
                  </p>
                </div>
              </div>

              {/* Items Section (White Area) */}
              <div className='p-4 pt-0 space-y-3'>
                {category.items?.map(item => (
                  <div key={item.id}>
                    {/* YES / NO Type */}
                    {item.isYesNoType && item.options?.length > 0 ? (
                      <div>
                        {item.options.map((opt, i) => (
                          <label
                            key={i}
                            className='flex items-center gap-3 py-1 cursor-pointer'
                          >
                            <input
                              type='radio'
                              name={item.id}
                              value={opt.value}
                              className='accent-red-500'
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      /* Multiple / Single Selection */
                      <label className='flex justify-between items-center cursor-pointer'>
                        <div className='flex items-center gap-3'>
                          <input
                            type={
                              category.selectionType === 'multiple'
                                ? 'checkbox'
                                : 'radio'
                            }
                            name={category.id}
                            className='accent-red-500'
                          />
                          <span>{item.name}</span>
                        </div>

                        <span className='text-green-600 font-medium'>
                          {packageData?.package?.currency}{' '}
                          {item.price.toFixed(3)}
                        </span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className='p-3 bg-white border-t flex-shrink-0'>
          <button className='w-full bg-[#FA0303] text-white py-3 rounded-lg font-bold'>
            Add Package to Cart
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <RightPanelLayout />
    </div>
  )
}

export default PackageDetails
