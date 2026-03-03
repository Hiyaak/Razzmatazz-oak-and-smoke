import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageContext } from '../../Context/LanguageContext'

const PackageDetails = () => {
  const { packageId } = useParams()
  const { cart, addToCart } = useCart()
  const location = useLocation()
  const { t } = useTranslation()
  const { language } = useContext(LanguageContext)
  const [selectedItems, setSelectedItems] = useState({})

  const navigate = useNavigate()
  const timeScrollRef = useRef(null)

  const brandId = localStorage.getItem('brandId')

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [specialRequest, setSpecialRequest] = useState('')

  const [packageData, setPackageData] = useState(null)
  const [extraPersons, setExtraPersons] = useState(0)
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

  const allowExtraPersons = packageData?.package?.allowExtraPersons
  const extraPersonPrice = packageData?.package?.extraPersonPrice || 0
  const maxExtraPersons = packageData?.package?.maxExtraPersons || 0

  const increaseExtraPersons = () => {
    if (extraPersons >= maxExtraPersons) {
      toast.error(`Maximum ${maxExtraPersons} extra persons allowed`)
      return
    }
    setExtraPersons(prev => prev + 1)
  }

  const decreaseExtraPersons = () => {
    if (extraPersons <= 0) return
    setExtraPersons(prev => prev - 1)
  }

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

  const cartItemIdFromState = location.state?.cartItemId
  const isEdit = location.state?.isEdit

  // const existingItem = cart.find(item => item.cartItemId === cartItemId)

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

  const basePrice = packageData?.package?.packagePrice || 0

  const extraPersonsTotal = extraPersons * extraPersonPrice

  const finalTotal = basePrice + additionalTotal + extraPersonsTotal

  const formatDateOnly = date => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const isDateBlocked = packageData?.blockedDates?.some(
    blocked => blocked.date === formatDateOnly(selectedDate)
  )

  useEffect(() => {
    if (!isEdit || !cartItemIdFromState) return

    const existingItem = cart.find(
      item => item.cartItemId === cartItemIdFromState
    )

    if (!existingItem) return

    // 🔥 Prefill everything
    setSelectedDate(new Date(existingItem.date))
    setSelectedSlot(existingItem.time)
    setSpecialRequest(existingItem.specialInstructions || '')

    // ✅ Prefill Extra Persons
    setExtraPersons(existingItem.extraPersons || 0)

    // selections
    const prefilledOptions = {}
    const prefilledAdditional = {}

    Object.entries(existingItem.selections || {}).forEach(
      ([categoryId, categoryData]) => {
        if (categoryData.items[0]?.isYesNoType) {
          prefilledOptions[categoryId] = categoryData.items[0].selectedValue
        } else {
          prefilledOptions[categoryId] = categoryData.items.map(item => item.id)
        }
      }
    )

    Object.entries(existingItem.additionalServices || {}).forEach(
      ([itemId, service]) => {
        prefilledAdditional[itemId] = service.quantity
      }
    )

    setSelectedOptions(prefilledOptions)
    setSelectedItems(prefilledAdditional)
  }, [isEdit, cartItemIdFromState, cart])

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
                {t('Catering.Select Date')}
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
                {t('Catering.Select Time')}
              </h2>
            </div>

            <div className='p-4'>
              <div className='flex items-center gap-2'>
                {/* LEFT ARROW (only if not blocked) */}
                {!isDateBlocked && (
                  <button
                    onClick={scrollLeft}
                    className='p-2 rounded-full border bg-white hover:bg-gray-100'
                  >
                    <ChevronLeft className='w-5 h-5' />
                  </button>
                )}

                {/* TIME SLOTS OR BLOCK MESSAGE */}
                {isDateBlocked ? (
                  <div className='flex-1 text-red-500 text-center font-medium py-2'>
                    This date is blocked for booking
                  </div>
                ) : (
                  <div
                    ref={timeScrollRef}
                    className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth [&::-webkit-scrollbar]:hidden'
                  >
                    {packageData?.allTimeSlots?.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`min-w-fit px-5 py-2 rounded-md border text-sm transition
              ${
                selectedSlot === slot
                  ? 'bg-green-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }
            `}
                      >
                        {formatTo12Hour(slot)} - {getEndTime(slot)}
                      </button>
                    ))}
                  </div>
                )}

                {/* RIGHT ARROW (only if not blocked) */}
                {!isDateBlocked && (
                  <button
                    onClick={scrollRight}
                    className='p-2 rounded-full border bg-white hover:bg-gray-100'
                  >
                    <ChevronRight className='w-5 h-5' />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='border-b border-gray-200'>
            {/* Heading */}
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                {t('Catering.Description')}
              </h2>
            </div>

            {/* Content */}
            <div className='p-4 space-y-3'>
              {/* API Description */}
              <p className='text-sm whitespace-pre-line'>
                {packageData?.package?.description}
              </p>

              {/* Static Note */}
              <p className='text-sm leading-relaxed'>{t('Catering.Note')}</p>
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
                {t('Catering.Special Requests')}
              </h2>
            </div>

            <div className='bg-white p-5 border-gray-300'>
              <div className='flex items-center'>
                <MessageSquareText className='w-5 h-5 text-gray-500 mr-3' />

                <input
                  type='text'
                  value={specialRequest}
                  onChange={e => setSpecialRequest(e.target.value)}
                  placeholder={t('Catering.placeholder')}
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1'
                />
              </div>
            </div>
          </div>
          {allowExtraPersons && (
            <div>
              <div className='bg-gray-100 p-4'>
                <h2 className='text-base font-semibold text-gray-800'>
                  {t('Catering.Add People')}
                </h2>
              </div>

              <div className='bg-white p-5 border-gray-300 space-y-3'>
                <div className='flex items-center justify-between text-sm text-gray-600'>
                  <span>
                    {t('Catering.Per Person')}: {extraPersonPrice}{' '}
                    {packageData?.package?.currency}
                  </span>

                  <span>
                    {t('Catering.max people')}: {maxExtraPersons}
                  </span>
                </div>

                <div className='flex flex-col items-center justify-center space-y-3'>
                  <div className='flex items-center gap-4'>
                    <button
                      type='button'
                      onClick={decreaseExtraPersons}
                      className='bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center'
                    >
                      −
                    </button>

                    <span className='font-semibold text-lg'>
                      {extraPersons}
                    </span>

                    <button
                      type='button'
                      onClick={increaseExtraPersons}
                      className='bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center'
                    >
                      +
                    </button>
                  </div>

                  {extraPersons > 0 && (
                    <p className='text-sm text-green-600 font-medium'>
                      + {extraPersonsTotal.toFixed(3)}{' '}
                      {packageData?.package?.currency}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className='p-3 bg-white border-t flex-shrink-0'>
          <button
            onClick={() => {
              if (!validateSelections()) return

              if (!selectedDate || !selectedSlot) {
                return toast.error('Please select date and time')
              }

              // ===============================
              // ✅ STORE ID + NAME
              // ===============================
              const formattedSelections = {}

              packageData?.package?.categories?.forEach(category => {
                if (category.name === 'Addittional Services') return

                const selected = selectedOptions[category.id]
                if (selected === undefined) return

                // YES / NO CATEGORY
                if (category.items?.[0]?.isYesNoType) {
                  const item = category.items[0]

                  formattedSelections[category.id] = {
                    name: category.name,
                    items: [
                      {
                        id: item.id,
                        name: item.name,
                        isYesNoType: true,
                        selectedValue: selected // ✅ TRUE or FALSE
                      }
                    ]
                  }
                }

                // NORMAL CATEGORY
                else if (Array.isArray(selected)) {
                  formattedSelections[category.id] = {
                    name: category.name,
                    items: category.items
                      .filter(item => selected.includes(item.id))
                      .map(item => ({
                        id: item.id,
                        name: item.name,
                        isYesNoType: false
                      }))
                  }
                }

                // SINGLE SELECTION
                else {
                  const found = category.items.find(
                    item => item.id === selected
                  )
                  if (found) {
                    formattedSelections[category.id] = {
                      name: category.name,
                      items: [
                        {
                          id: found.id,
                          name: found.name,
                          isYesNoType: false
                        }
                      ]
                    }
                  }
                }
              })
              // ===============================
              // ✅ ADDITIONAL SERVICES (ID + NAME)
              // ===============================
              const formattedAdditionalServices = {}

              const additionalCategory = packageData?.package?.categories?.find(
                cat => cat.name === 'Addittional Services'
              )

              Object.entries(selectedItems).forEach(([itemId, qty]) => {
                if (qty > 0) {
                  const item = additionalCategory?.items?.find(
                    i => i.id === itemId
                  )

                  if (item) {
                    formattedAdditionalServices[itemId] = {
                      name: item.name,
                      quantity: qty,
                      price: item.price
                    }
                  }
                }
              })

              const cartPayload = {
                cartItemId: isEdit
                  ? cartItemIdFromState
                  : `catering-${packageData.package.id}-${Date.now()}`,
                type: 'catering',
                orderType: 'catering',

                packageId: packageData.package.id,
                brandId: packageData.brand?.id,
                persons: packageData.package.persons,

                name: packageData.package.name,
                image: packageData.package.images?.[0],

                selections: formattedSelections,
                additionalServices: formattedAdditionalServices,

                date: selectedDate,
                time: selectedSlot,
                specialInstructions: specialRequest,
                extraPersons,
                extraPersonPrice,

                price: finalTotal,
                quantity: 1
              }

              if (isEdit) {
                addToCart({
                  ...cartPayload,
                  cartItemId: cartItemIdFromState
                })
              } else {
                addToCart(cartPayload)
              }
              navigate('/shoopingcart')
            }}
            className='relative w-full bg-[#FA0303] text-white py-3 rounded-lg font-bold'
          >
            {/* Center Text */}
            <span className='block text-center'>
              {isEdit ? t('Catering.Update Cart') : t('Catering.Add to Cart')}
            </span>

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
