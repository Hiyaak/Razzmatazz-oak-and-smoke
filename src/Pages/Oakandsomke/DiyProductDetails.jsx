import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { ImagePath } from '../../Services/Apiservice'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useCart } from '../../Context/CartContext'

const DiyProductDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const timeScrollRef = useRef(null)
  const [quantity, setQuantity] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [disabledDates, setDisabledDates] = useState([])
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

        const response = await ApiService.post('getMonthlyDiyComboReport', {
          brandId: product?.brandId,
          year,
          month
        })

        if (response.data.status) {
          const exceededDates = response.data.report
            .filter(item => item.exceeded)
            .map(item => new Date(item._id))

          setDisabledDates(exceededDates)
        }
      } catch (error) {
        console.log('Report API error:', error)
      }
    }

    if (product?.brandId) {
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
    { start: '6:00 PM', end: '7:00 PM' },
    { start: '7:00 PM', end: '8:00 PM' }
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
                      if (!selectedDate || !selectedSlot) {
                        return toast.error('Please select date and time')
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
                    className='border border-[#FA0303] text-[#FA0303] px-4 py-1 rounded-full hover:bg-red-50 transition-colors font-medium'
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
                  tileClassName={({ date }) =>
                    disabledDates.some(
                      disabled =>
                        date.toDateString() === disabled.toDateString()
                    )
                      ? 'bg-red-200 text-red-600 font-semibold'
                      : null
                  }
                  tileDisabled={({ date }) =>
                    disabledDates.some(
                      disabled =>
                        date.toDateString() === disabled.toDateString()
                    )
                  }
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

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedSlot(slotLabel)}
                          className={`min-w-fit px-5 py-2 rounded-md border text-sm transition
                ${
                  selectedSlot === slotLabel
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
