import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ThumbsUp,
  ChevronRight,
  X,
  Send,
  Instagram,
  Phone,
  Mail,
  ChevronLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import ApiService from '../../Services/Apiservice'
import { toast } from 'react-toastify'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { IoSendSharp } from 'react-icons/io5'
import { IoMdThumbsUp } from 'react-icons/io'

const Contact = () => {
  const navigate = useNavigate()
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [showReviews, setShowReviews] = useState(false)
  const [locations, setLocations] = useState([])
  const [branchDetails, setBranchDetails] = useState([])
  const [feedback, setFeedback] = useState({
    name: '',
    phone: '',
    comment: '',
    rating: 0
  })

  const [reviews, setReviews] = useState([])
  const brandId = localStorage.getItem('brandId')

  const [currentSlide, setCurrentSlide] = useState(0)

  const getLocations = async () => {
    try {
      const { data } = await ApiService.get(
        'getLocationsByBrand?brandName=Oak and Smoke'
      )
      if (data.status && data.locations) {
        setLocations(data.locations)
        console.log('locations data', data.locations)
      } else {
        console.log('No locations found')
      }
    } catch (error) {
      console.log('Error fetching locations:', error)
    }
  }

  const getBranchDetails = async () => {
    try {
      const { data } = ApiService.get(`/${brandId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const getReviews = async () => {
    try {
      const { data } = await ApiService.get(`getFeedbacksByBrand/${brandId}`)
      if (data.status) {
        setReviews(data.feedbacks)
        console.log('reviews', data.feedbacks)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocations()
    getBranchDetails()
    getReviews()
  }, [])

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle rating (emoji click)
  const handleRatingChange = value => {
    setFeedback(prev => ({
      ...prev,
      rating: value
    }))
  }

  // Submit feedback
  const handleSendFeedback = async () => {
    if (!feedback.comment.trim()) {
      toast.error('Please enter your feedback comment.')
      return
    }

    try {
      const payload = {
        name: feedback.name || 'Anonymous',
        phone: feedback.phone,
        comment: feedback.comment,
        rating: feedback.rating,
        brandId
      }

      const { data } = await ApiService.post('/createFeedback', payload)

      if (data.status) {
        toast.success('Thank you for your feedback!')
        setShowFeedbackForm(false)
        setFeedback({ name: '', phone: '', comment: '', rating: 0 })
        getReviews()
      } else {
        toast.error('Failed to submit feedback.')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast.error('Something went wrong.')
    }
  }

  const renderStars = rating => {
    const total = 5
    return [...Array(total)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
      >
        ★
      </span>
    ))
  }

  const timeAgo = date => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    }
    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value)
      if (count > 1) return `${count} ${unit}s ago`
      if (count === 1) return `1 ${unit} ago`
    }
    return 'Just now'
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 h-screen border-r border-gray-200 flex flex-col overflow-hidden'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* Our Branches Section */}
          <div className='border-b border-gray-200'>
            <h2 className='px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100'>
              Our branches
            </h2>

            {locations && locations.length > 0 ? (
              locations.map(loc => (
                <div
                  key={loc._id}
                  onClick={() =>
                    navigate('/branddetails', {
                      state: {
                        brandId: brandId,
                        locationName: loc.locname
                      }
                    })
                  }
                  className='border-t border-gray-200'
                >
                  <div className='px-4 py-4 flex items-center justify-between cursor-pointer group relative'>
                    {/* background hover except top border */}
                    <div className='absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 top-[14px] bottom-[10px]'></div>

                    <span className='text-gray-800 relative z-10'>
                      {loc.locname}
                    </span>
                    <button className='p-2 text-gray-400 hover:text-gray-600 relative z-10'>
                      <div className='w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                        <span className='text-xs'>?</span>
                      </div>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='px-4 py-4 text-gray-500 text-sm'>
                No branches available
              </div>
            )}
          </div>

          {/* Your Opinion Matters Section */}
          <div className='border-b border-gray-200'>
            <h2 className='px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100'>
              Your opinion matters
            </h2>

            <div className='px-4 py-6 flex justify-center border-t'>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className='flex items-center gap-2 text-[#FA0303] font-medium hover:text-red-600 hover:bg-red-50 transition-colors'
              >
                <span className='uppercase text-sm tracking-wide'>
                  Leave Feedback
                </span>
                <IoMdThumbsUp className='w-5 h-5' />
              </button>
            </div>
          </div>

          {/* Customer Reviews Section */}

          <div className='border-b border-gray-200'>
            <div className='px-4 py-3 flex items-center justify-between bg-gray-100'>
              <div className='flex items-center gap-2'>
                <h2 className='text-sm font-medium text-gray-700'>
                  Customer reviews
                </h2>
                <button
                  onClick={() => setShowReviews(true)}
                  className='text-[#FA0303] text-sm font-medium underline hover:text-red-600'
                >
                  View more
                </button>
              </div>
            </div>

            {/* Slideshow Container */}
            <div className='relative overflow-hidden'>
              {reviews.length > 0 ? (
                <>
                  {/* Slides */}
                  <div
                    className='flex transition-transform duration-500'
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`
                    }}
                  >
                    {reviews.slice(0, 5).map(review => (
                      <div
                        key={review._id}
                        className='min-w-full px-4 py-4 border-t border-gray-200'
                      >
                        <div className='flex items-start justify-between px-10'>
                          <div className='flex-1'>
                            <h3 className='font-medium text-gray-900 mb-1'>
                              {review.name || 'Anonymous'}
                            </h3>
                            <div className='flex items-center gap-2 mb-2'>
                              <div className='flex'>
                                {renderStars(Number(review.rating))}
                              </div>
                              <span className='text-xs text-gray-500'>
                                {timeAgo(review.createdAt)}
                              </span>
                            </div>
                            <p className='text-sm text-gray-700'>
                              {review.comment || 'No comment provided.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {reviews.length > 1 && (
                    <>
                      {/* Left Arrow */}
                      {currentSlide > 0 && (
                        <button
                          onClick={() => setCurrentSlide(prev => prev - 1)}
                          className='absolute left-0 ml-2 top-1/2 transform -translate-y-1/2 bg-[#FA0303] hover:bg-[#AF0202] text-white rounded-full p-2 shadow transition'
                        >
                          <ChevronLeft className='w-4 h-4' />
                        </button>
                      )}

                      {/* Right Arrow */}
                      {currentSlide < Math.min(4, reviews.length - 1) && (
                        <button
                          onClick={() =>
                            setCurrentSlide(prev =>
                              prev === Math.min(4, reviews.length - 1)
                                ? prev
                                : prev + 1
                            )
                          }
                          className='absolute mr-2 right-0 top-1/2 transform -translate-y-1/2 bg-[#FA0303] hover:bg-[#AF0202] text-white rounded-full p-2 shadow transition'
                        >
                          <ChevronRight className='w-4 h-4' />
                        </button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <p className='text-center text-gray-500 py-4'>
                  No reviews available
                </p>
              )}
            </div>

            {/* Pagination Dots */}
            {reviews.length > 1 && (
              <div className='flex justify-center gap-2 py-4 bg-gray-50'>
                {reviews.slice(0, 5).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      index === currentSlide
                        ? 'bg-gray-800 scale-110'
                        : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Connect With Us Section */}
          <div>
            <h2 className='px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100'>
              Connect with us
            </h2>
            <div className='px-4 py-6 flex justify-center gap-16 md:gap-16 lg:gap-28 border-t border-b'>
              <button className='p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                <div className='w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center'>
                  <Instagram className='w-6 h-6 text-white' />
                </div>
              </button>
              <button className='p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                <div className='w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center'>
                  <Phone className='w-6 h-6 text-white' />
                </div>
              </button>
              <button className='p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center'>
                  <Mail className='w-6 h-6 text-white' />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form Modal - Opens from bottom */}
      {showFeedbackForm && (
        <div className='fixed inset-0 z-50 flex flex-col md:flex-row'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black bg-opacity-50'
            onClick={() => setShowFeedbackForm(false)}
          ></div>

          {/* Modal Content */}
          <div className='absolute bottom-0 left-0 w-full md:w-2/5 bg-white max-h-[60vh] md:max-h-[70vh] rounded-t-lg md:rounded-lg shadow-xl flex flex-col overflow-hidden'>
            <div className='p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0'>
              <h2 className='text-xl font-semibold'>Leave feedback</h2>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <div className='flex-1 p-6 overflow-y-auto md:overflow-hidden'>
              {/* Rating Emojis */}
              <div className='flex justify-center gap-4 mb-6'>
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    key={value}
                    onClick={() => handleRatingChange(value)}
                    className={`text-3xl transition-transform duration-200 hover:scale-110 hover:opacity-100 ${
                      feedback.rating >= value ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    😊
                  </button>
                ))}
              </div>

              {/* Name and Phone side by side */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                {/* Name Input */}
                <div>
                  <label className='block text-sm font-medium text-gray-800 mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={feedback.name}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white'
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className='block text-sm font-medium text-gray-800 mb-2'>
                    Phone (Optional)
                  </label>
                  <div className='flex gap-2'>
                    <input
                      type='tel'
                      name='phone'
                      value={feedback.phone}
                      onChange={handleInputChange}
                      maxLength={8}
                      className='flex-1 px-3 py-2 border border-gray-300 hover:border-gray-500  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white'
                    />
                  </div>
                </div>
              </div>

              {/* Comment Textarea */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-800 mb-2'>
                  Leave us a comment
                </label>
                <textarea
                  name='comment'
                  value={feedback.comment}
                  onChange={handleInputChange}
                  rows='1'
                  className='w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendFeedback}
                className='w-full bg-[#FA0303] text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
              >
                <span>SEND</span>
                <IoSendSharp className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Modal - Center Overlay */}
      {showReviews && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg border border-gray-300 shadow-lg w-[550px] max-h-[90vh] flex flex-col'>
            <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
              <h2 className='text-2xl font-bold flex-1'>Customer reviews</h2>
              <button
                onClick={() => setShowReviews(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <div className='flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div
                    key={review._id}
                    className='border border-gray-200 rounded-lg p-3'
                  >
                    <h3 className='font-medium text-gray-900 mb-1'>
                      {review.name || 'Anonymous'}
                    </h3>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='flex'>
                        {renderStars(Number(review.rating))}
                      </div>
                      <span className='text-xs text-gray-500'>
                        {timeAgo(review.createdAt)}
                      </span>
                    </div>
                    {review.comment && (
                      <p className='text-sm text-gray-700'>{review.comment}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500 py-4'>
                  No reviews available
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default Contact
