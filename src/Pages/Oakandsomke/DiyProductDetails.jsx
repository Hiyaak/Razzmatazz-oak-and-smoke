import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useCart } from '../../Context/CartContext'
import { toast } from 'react-toastify'

const DiyProductDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const timeScrollRef = useRef(null)
  const [quantity, setQuantity] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [disabledDates, setDisabledDates] = useState([])
  const [blockedDates, setBlockedDates] = useState([])
  const [blockedSlots, setBlockedSlots] = useState([])
  const [isOrderLimitExceeded, setIsOrderLimitExceeded] = useState(false)
  const product = location.state?.product

  const { cart, addToCart, updateQuantity } = useCart()
  const brandId = localStorage.getItem('brandId')

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )
  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const year = selectedDate.getFullYear()
        const month = selectedDate.getMonth() + 1

        console.log('Selected Date:', selectedDate)
        console.log('Year:', year, 'Month:', month)
        console.log('BrandId:', product?.brandId)

        const response = await ApiService.post('getMonthlyDiyComboReport', {
          brandId: product?.brandId,
          year,
          month
        })

        console.log('API Response:', response.data)

        if (response.data.status) {
          // 🔴 Blocked Dates
          const blocked = response.data.diyBlocks.flatMap(block =>
            block.blockedDate.map(d => new Date(d))
          )

          console.log(
            'Blocked Dates:',
            blocked.map(d => d.toDateString())
          )

          setBlockedDates(blocked)

          // ⏱ Blocked Slots
          const slots = response.data.diyBlocks.flatMap(
            block => block.blockedTimeSlots
          )

          console.log('Blocked Time Slots:', slots)

          setBlockedSlots(slots)

          // ⚠ Exceeded Order Limit
          const exceeded = response.data.report.some(r => r.exceeded)

          console.log('Order Limit Exceeded:', exceeded)

          setIsOrderLimitExceeded(exceeded)
        }
      } catch (error) {
        console.log('Report API error:', error)
      }
    }

    if (product?.brandId && selectedDate) {
      fetchMonthlyReport()
    }
  }, [selectedDate, product])

  const handleReviewOrder = () => {
    navigate('/shoopingcart')
  }

  const staticTimeSlots = [
    { start: '12:00 PM', end: '1:00 PM' },
    { start: '1:00 PM', end: '2:00 PM' },
    { start: '2:00 PM', end: '3:00 PM' },
    { start: '3:00 PM', end: '4:00 PM' },
    { start: '4:00 PM', end: '5:00 PM' },
    { start: '5:00 PM', end: '6:00 PM' },
    { start: '6:00 PM', end: '7:00 PM' },
    { start: '7:00 PM', end: '8:00 PM' },
    { start: '8:00 PM', end: '9:00 PM' },
    { start: '9:00 PM', end: '10:00 PM' },
    { start: '10:00 PM', end: '11:00 PM' }
  ]

  const scrollLeft = () => {
    if (timeScrollRef.current) {
      timeScrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (timeScrollRef.current) {
      timeScrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }
  }
  useEffect(() => {
    const existingItem = cart.find(
      item => item.cartItemId === `diycombo-${product?._id}`
    )

    if (existingItem) {
      setQuantity(existingItem.quantity)
    } else {
      setQuantity(0)
    }
  }, [cart, product])

  const isDateDisabled = selectedDate
    ? disabledDates.some(
        disabled => disabled.toDateString() === selectedDate.toDateString()
      )
    : false

  useEffect(() => {
    if (isDateDisabled) {
      setSelectedSlot(null)
    }
  }, [selectedDate])

  const isAddDisabled =
    isDateDisabled ||
    isOrderLimitExceeded ||
    (selectedSlot &&
      blockedSlots.some(slot => {
        const slotStart24 = new Date(
          `1970-01-01 ${selectedSlot.split(' - ')[0]}`
        )
          .toTimeString()
          .slice(0, 5)

        return slotStart24 >= slot.startTime && slotStart24 < slot.endTime
      }))

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
              {product?.name?.toUpperCase()}
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
          {/* Product Image */}
          <div className='w-full h-96'>
            <img
              src={`${ImagePath}${product?.image}`}
              alt={product?.name}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Product Info Section */}
          <div className=''>
            {/* Name + Quantity Row */}
            <div className='flex items-center justify-between'>
              {/* Left Side - Name & Price */}
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {product?.name}
                </h2>

                <p className='text-red-600 font-medium mt-1'>
                  {product?.price} KD
                </p>
              </div>

              {/* Right Side - Quantity Control */}
              <div className='mr-4'>
                {quantity === 0 ? (
                  <button
                    onClick={() => {
                      if (!selectedDate) {
                        return toast.error('Please select a date')
                      }

                      if (isAddDisabled) {
                        return toast.error('Order limit reached')
                      }

                      if (!selectedSlot) {
                        return toast.error('Please select time')
                      }

                      addToCart({
                        cartItemId: `diycombo-${product._id}`,
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        type: 'diycombo',
                        quantity: 1,
                        selectedDate,
                        selectedSlot
                      })
                    }}
                    className={`border px-4 py-1 rounded-full font-medium transition-colors
    ${
      isDateDisabled
        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
        : 'border-[#FA0303] text-[#FA0303] hover:bg-red-50'
    }
  `}
                  >
                    + Add
                  </button>
                ) : (
                  <div className='flex items-center border rounded-full overflow-hidden'>
                    <button
                      onClick={() =>
                        updateQuantity(`diycombo-${product._id}`, quantity - 1)
                      }
                      className='px-3 py-1 text-red-600 font-bold'
                    >
                      -
                    </button>

                    <span className='px-4 py-1 font-medium'>{quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(`diycombo-${product._id}`, quantity + 1)
                      }
                      className='px-3 py-1 text-red-600 font-bold'
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Calendar Section */}
            <div className='border-b border-gray-200 w-full'>
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
                  tileClassName={({ date }) => {
                    const normalizedDate = new Date(date).setHours(0, 0, 0, 0)

                    const isBlocked = blockedDates.some(
                      d => new Date(d).setHours(0, 0, 0, 0) === normalizedDate
                    )

                    if (isBlocked) {
                      return 'blocked-date'
                    }

                    return null
                  }}
                  tileDisabled={({ date }) => {
                    const normalizedDate = new Date(date).setHours(0, 0, 0, 0)

                    return blockedDates.some(
                      d => new Date(d).setHours(0, 0, 0, 0) === normalizedDate
                    )
                  }}
                />
              </div>
            </div>

            {/* Time Slots */}
            {!isDateDisabled && (
              <div className='border-b border-gray-200'>
                <div className='bg-gray-100 p-4'>
                  <h2 className='text-base font-semibold text-gray-800'>
                    Select Time
                  </h2>
                </div>

                <div className='p-4'>
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
                      {staticTimeSlots.map((slot, index) => {
                        const slotLabel = `${slot.start} - ${slot.end}`

                        // convert slot.start to 24h
                        const slotStart24 = new Date(`1970-01-01 ${slot.start}`)
                          .toTimeString()
                          .slice(0, 5)

                        const isBlocked = blockedSlots.some(
                          blocked =>
                            slotStart24 >= blocked.startTime &&
                            slotStart24 < blocked.endTime
                        )

                        return (
                          <button
                            key={index}
                            disabled={isBlocked}
                            onClick={() => setSelectedSlot(slotLabel)}
                            className={`min-w-fit px-5 py-2 rounded-md border text-sm transition
      ${
        isBlocked
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : selectedSlot === slotLabel
          ? 'bg-green-600 text-white'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
      }
    `}
                          >
                            {slotLabel}
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
            )}

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
                  {product?.description}
                </p>
              </div>
            </div>
          </div>

          {!(selectedMethod && (selectedArea || selectedGovernate)) ? (
            // Location not selected — show "Select your location"
            <div className='p-3 bg-white flex-shrink-0'>
              <button
                onClick={() => navigate('/pickupdeviler')}
                className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-semibold py-3 rounded-lg transition-colors'
              >
                Select your location
              </button>
            </div>
          ) : (
            // Location selected — show "Review Order"
            <div
              className='p-3 bg-white flex-shrink-0'
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
      </div>

      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default DiyProductDetails
