import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageSquareText
} from 'lucide-react'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useCart } from '../../Context/CartContext'

const PackageDetails = () => {
  const { packageId } = useParams()
  const { cart, addToCart } = useCart()

  const [selectedItems, setSelectedItems] = useState({})

  const navigate = useNavigate()
  const timeScrollRef = useRef(null)

  const brandId = localStorage.getItem('brandId')

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [validationErrors, setValidationErrors] = useState({})

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

  const formatTo12Hour = time24 => {
    const [hour, minute] = time24.split(':')
    const date = new Date()
    date.setHours(hour)
    date.setMinutes(minute)

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getEndTime = time24 => {
    const [hour, minute] = time24.split(':')
    const date = new Date()
    date.setHours(hour)
    date.setMinutes(minute)
    date.setHours(date.getHours() + 1) // add 1 hour

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const cartItemId = packageData?.package?.id

  const existingItem = cart.find(item => item.cartItemId === cartItemId)

  const scrollLeft = () => {
    timeScrollRef.current?.scrollBy({
      left: -200,
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    timeScrollRef.current?.scrollBy({
      left: 200,
      behavior: 'smooth'
    })
  }

  const increaseItem = item => {
    setSelectedItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }))
  }

  const decreaseItem = item => {
    setSelectedItems(prev => {
      const currentQty = prev[item.id] || 0

      if (currentQty <= 1) {
        const updated = { ...prev }
        delete updated[item.id]
        return updated
      }

      return {
        ...prev,
        [item.id]: currentQty - 1
      }
    })
  }

  const validateSelections = () => {
    if (!selectedSlot) {
      alert('Please select a time slot')
      return false
    }

    const errors = {}

    packageData?.package?.categories?.forEach(category => {
      if (category.name === 'Addittional Services') return

      const selected = selectedOptions[category.id]

      let selectedCount = 0

      if (Array.isArray(selected)) {
        selectedCount = selected.length
      } else if (selected !== undefined) {
        selectedCount = 1
      }

      if (selectedCount < category.minItems) {
        errors[category.id] = 'This field is required'
      }

      if (category.maxItems > 0 && selectedCount > category.maxItems) {
        errors[category.id] = `Maximum ${category.maxItems} allowed`
      }
    })

    setValidationErrors(errors)

    return Object.keys(errors).length === 0
  }

  const additionalCategory = packageData?.package?.categories?.find(
    cat => cat.name === 'Addittional Services'
  )

  const additionalTotal = Object.entries(selectedItems).reduce(
    (total, [itemId, qty]) => {
      const item = additionalCategory?.items?.find(i => i.id === itemId)
      return total + (item?.price || 0) * qty
    },
    0
  )

  const basePrice = packageData?.package?.basePricePerPerson || 0

  const finalTotal = basePrice + additionalTotal

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
              {!packageData?.dateAvailable && (
                <p className='text-red-500 text-sm mb-3'>Date not available</p>
              )}

              <div className='flex items-center gap-2'>
                {/* LEFT ARROW */}
                <button
                  onClick={scrollLeft}
                  className='p-2 rounded-full border bg-white hover:bg-gray-100'
                >
                  <ChevronLeft className='w-5 h-5' />
                </button>

                {/* TIME SLOTS */}
                <div
                  ref={timeScrollRef}
                  className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth [&::-webkit-scrollbar]:hidden'
                >
                  {packageData?.allTimeSlots?.map((slot, index) => {
                    const isAvailable =
                      packageData?.availableTimeSlots?.includes(slot)

                    return (
                      <button
                        key={index}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSlot(slot)}
                        className={`min-w-fit px-5 py-2 rounded-md border text-sm transition
            ${
              selectedSlot === slot
                ? 'bg-green-600 text-white'
                : isAvailable
                ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
                      >
                        {formatTo12Hour(slot)} - {getEndTime(slot)}
                      </button>
                    )
                  })}
                </div>

                {/* RIGHT ARROW */}
                <button
                  onClick={scrollRight}
                  className='p-2 rounded-full border bg-white hover:bg-gray-100'
                >
                  <ChevronRight className='w-5 h-5' />
                </button>
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
          {[...(packageData?.package?.categories || [])]
            .sort((a, b) => {
              // 1️⃣ Additional Services always last
              if (a.name === 'Addittional Services') return 1
              if (b.name === 'Addittional Services') return -1

              // 2️⃣ Yes/No categories after normal categories
              const aIsYesNo = a.items?.[0]?.isYesNoType
              const bIsYesNo = b.items?.[0]?.isYesNoType

              if (aIsYesNo && !bIsYesNo) return 1
              if (!aIsYesNo && bIsYesNo) return -1

              return 0
            })
            .map(category => (
              <div key={category.id} className='border-b border-gray-200'>
                {/* Category Section */}
                <div className=' border-gray-200'>
                  {/* Heading Only (Grey Background) */}
                  <div className='bg-gray-100  p-4'>
                    <h2 className='text-base font-semibold text-gray-800'>
                      {category.name}
                    </h2>
                  </div>

                  {/* Required + Min/Max */}
                  <div className='p-4 flex items-center justify-between'>
                    {/* Left Side */}
                    {category.name === 'Addittional Services' ? (
                      <p className='text-sm font-medium text-gray-700'>
                        Optional
                      </p>
                    ) : category.minItems > 0 ? (
                      <p className='text-sm font-medium text-gray-700'>
                        Required
                      </p>
                    ) : null}

                    {/* Right Side */}
                    {(category.minItems > 0 || category.maxItems > 0) && (
                      <p className='text-sm text-gray-600'>
                        {category.minItems > 0 && `min: ${category.minItems}`}
                        {category.minItems > 0 && category.maxItems > 0 && ', '}
                        {category.maxItems > 0 && `max: ${category.maxItems}`}
                      </p>
                    )}
                  </div>
                  {validationErrors[category.id] && (
                    <p className='text-red-500 text-sm px-4 pb-2'>
                      {validationErrors[category.id]}
                    </p>
                  )}
                </div>

                {/* Items Section (White Area) */}
                <div className='p-4 pt-0 space-y-3'>
                  {category.items?.[0]?.isYesNoType
                    ? category.items[0].options.map((opt, i) => (
                        <label
                          key={i}
                          className='flex items-center gap-3 py-1 cursor-pointer'
                        >
                          <input
                            type='radio'
                            name={category.id}
                            value={opt.value}
                            checked={selectedOptions[category.id] === opt.value}
                            onChange={() => {
                              setSelectedOptions(prev => ({
                                ...prev,
                                [category.id]: opt.value
                              }))

                              setValidationErrors(prev => ({
                                ...prev,
                                [category.id]: null
                              }))
                            }}
                            className='accent-red-500'
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))
                    : category.items?.map(item => {
                        const quantity = selectedItems[item.id] || 0

                        return (
                          <div
                            key={item.id}
                            className='flex justify-between items-center'
                          >
                            <div className='flex items-center gap-3'>
                              {/*  Only Additional Services gets + - */}
                              {category.name === 'Addittional Services' ? (
                                <span>{item.name}</span>
                              ) : (
                                <>
                                  <input
                                    type={
                                      category.selectionType === 'multiple'
                                        ? 'checkbox'
                                        : 'radio'
                                    }
                                    name={category.id}
                                    value={item.id}
                                    checked={
                                      category.selectionType === 'multiple'
                                        ? selectedOptions[
                                            category.id
                                          ]?.includes(item.id)
                                        : selectedOptions[category.id] ===
                                          item.id
                                    }
                                    disabled={
                                      category.selectionType === 'multiple' &&
                                      category.maxItems > 0 &&
                                      !selectedOptions[category.id]?.includes(
                                        item.id
                                      ) &&
                                      (selectedOptions[category.id]?.length ||
                                        0) >= category.maxItems
                                    }
                                    onChange={e => {
                                      setSelectedOptions(prev => {
                                        const updated = { ...prev }

                                        if (
                                          category.selectionType === 'multiple'
                                        ) {
                                          const existing =
                                            updated[category.id] || []

                                          if (e.target.checked) {
                                            updated[category.id] = [
                                              ...existing,
                                              item.id
                                            ]
                                          } else {
                                            updated[category.id] =
                                              existing.filter(
                                                id => id !== item.id
                                              )
                                          }
                                        } else {
                                          updated[category.id] = item.id
                                        }

                                        return updated
                                      })

                                      setValidationErrors(prev => ({
                                        ...prev,
                                        [category.id]: null
                                      }))
                                    }}
                                    className='accent-red-500'
                                  />

                                  <span>{item.name}</span>
                                </>
                              )}
                            </div>

                            <div className='flex items-center gap-3'>
                              {/* Price */}
                              {item.price > 0 && (
                                <span className='text-green-600 font-semibold text-sm'>
                                  {packageData?.package?.currency}{' '}
                                  {item.price.toFixed(3)}
                                </span>
                              )}

                              {/*  Only Additional Services gets + - */}
                              {category.name === 'Addittional Services' &&
                                (quantity === 0 ? (
                                  <button
                                    type='button'
                                    onClick={() => increaseItem(item)}
                                    className='bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                                  >
                                    +
                                  </button>
                                ) : (
                                  <div className='flex items-center gap-2'>
                                    <button
                                      type='button'
                                      onClick={() => decreaseItem(item)}
                                      className='bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center'
                                    >
                                      −
                                    </button>

                                    <span className='font-medium'>
                                      {quantity}
                                    </span>

                                    <button
                                      type='button'
                                      onClick={() => increaseItem(item)}
                                      className='bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                                    >
                                      +
                                    </button>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )
                      })}
                </div>
              </div>
            ))}

            
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Special Requests
              </h2>
            </div>

            <div className='bg-white p-5 border-gray-300'>
              <div className='flex items-center'>
                <MessageSquareText className='w-5 h-5 text-gray-500 mr-3' />

                <input
                  type='text'
                  placeholder='Enter Your Special Requests'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='p-3 bg-white border-t flex-shrink-0'>
          <button
            onClick={() => {
              if (!validateSelections()) return

              const formattedSelections = {}

              packageData?.package?.categories?.forEach(category => {
                if (category.name === 'Addittional Services') return

                const selected = selectedOptions[category.id]
                if (!selected) return

                if (Array.isArray(selected)) {
                  formattedSelections[category.name] = category.items
                    .filter(item => selected.includes(item.id))
                    .map(item => item.name)
                } else {
                  const found = category.items.find(
                    item => item.id === selected
                  )
                  if (found) {
                    formattedSelections[category.name] = found.name
                  }
                }
              })

              const formattedAdditionalServices = {}

              const additionalCategory = packageData?.package?.categories?.find(
                cat => cat.name === 'Addittional Services'
              )

              Object.entries(selectedItems).forEach(([itemId, qty]) => {
                const item = additionalCategory?.items?.find(
                  i => i.id === itemId
                )

                if (item) {
                  formattedAdditionalServices[item.name] = {
                    quantity: qty,
                    price: item.price
                  }
                }
              })

              const cartPayload = {
                cartItemId: packageData.package.id,
                packageId: packageData.package.id,
                name: packageData.package.name,
                date: selectedDate,
                time: selectedSlot,
                image: packageData.package.images?.[0],
                selections: formattedSelections,
                additionalServices: formattedAdditionalServices,
                price: finalTotal,
                quantity: 1
              }

              addToCart(cartPayload)

              navigate('/shoopingcart')
            }}
            className='relative w-full bg-[#FA0303] text-white py-3 rounded-lg font-bold'
          >
            {/* Center Text */}
            <span className='block text-center'>Add to Cart</span>

            {/* Right Side Price */}
            <span className='absolute right-4 top-1/2 -translate-y-1/2'>
              {finalTotal.toFixed(3)} {packageData?.package?.currency}
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <RightPanelLayout />
    </div>
  )
}

export default PackageDetails
