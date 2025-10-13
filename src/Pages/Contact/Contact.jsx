import { useState } from 'react'
import {
  ArrowLeft,
  Menu,
  ShoppingBag,
  Search,
  LogOut,
  ThumbsUp,
  ChevronRight,
  X,
  Send,
  Instagram,
  Phone,
  Mail
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'

const Contact = () => {
  const navigate = useNavigate()
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [showReviews, setShowReviews] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')

  const reviews = [
    {
      name: 'Ahmad Mohammad',
      rating: 5,
      date: 'More than a year ago',
      comment: 'it was perfect'
    },
    {
      name: 'Tiffany',
      rating: 5,
      date: 'More than a year ago',
      comment:
        "I'm from Houston Texas and I will say this is some of the BEST smoked BBQ I've ever had. I love the food. Thank You for all time and devotion placed into making such great BBQ. Delicious"
    },
    {
      name: 'Khadeejah alsharqawi',
      rating: 5,
      date: 'More than a year ago',
      comment: '.'
    },
    {
      name: 'Lolwah',
      rating: 5,
      date: 'More than a year ago',
      comment:
        'Winnie is great service with beautiful smile Thank you Winnie 💕'
    },
    {
      name: 'Khaled Alhattab',
      rating: 5,
      date: 'More than a year ago',
      comment: ''
    }
  ]

  const handleSendFeedback = () => {
    // Handle feedback submission
    console.log({ name, phone, comment, rating: selectedRating })
    // Reset form
    setName('')
    setPhone('')
    setComment('')
    setSelectedRating(0)
    setShowFeedbackForm(false)
  }

  const renderStars = rating => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className='text-yellow-400'>
          ★
        </span>
      ))
  }

  const renderRatingEmoji = index => {
    const emojis = ['😞', '😕', '😐', '🙂', '😊']
    return (
      <button
        key={index}
        onClick={() => setSelectedRating(index + 1)}
        className={`text-3xl transition-all ${
          selectedRating === index + 1
            ? 'scale-125'
            : 'opacity-50 hover:opacity-100'
        }`}
      >
        {emojis[index]}
      </button>
    )
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
      <div className='w-full md:w-2/5 h-screen border-r border-gray-200 flex flex-col overflow-hidden'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => window.history.back()}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <h1 className='text-xl font-semibold text-gray-900'>Contact</h1>
            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* Our Branches Section */}
          <div className='border-b border-gray-200'>
            <h2 className='px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50'>
              Our branches
            </h2>

            <div className='border-b border-gray-200'>
              <div className='px-4 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer'>
                <span className='text-gray-800'>Shuwaikh</span>
                <button className='p-2 text-gray-400 hover:text-gray-600'>
                  <div className='w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                    <span className='text-xs'>?</span>
                  </div>
                </button>
              </div>
            </div>

            <div className='border-b border-gray-200'>
              <div className='px-4 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer'>
                <span className='text-gray-800'>Al Khiran</span>
                <button className='p-2 text-gray-400 hover:text-gray-600'>
                  <div className='w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                    <span className='text-xs'>?</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Your Opinion Matters Section */}
          <div className='border-b border-gray-200'>
            <h2 className='px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50'>
              Your opinion matters
            </h2>

            <div className='px-4 py-6 flex justify-center'>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className='flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition-colors'
              >
                <span className='uppercase text-sm tracking-wide'>
                  Leave Feedback
                </span>
                <ThumbsUp className='w-5 h-5' />
              </button>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className='border-b border-gray-200'>
            <div className='px-4 py-3 flex items-center justify-between bg-gray-50'>
              <h2 className='text-sm font-medium text-gray-700'>
                Customer reviews
              </h2>
              <button
                onClick={() => setShowReviews(true)}
                className='text-red-500 text-sm font-medium hover:text-red-600'
              >
                View more
              </button>
            </div>

            {/* Single Review Preview */}
            <div className='px-4 py-4 border-b border-gray-200'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='font-medium text-gray-900 mb-1'>
                    Ahmad Mohammad
                  </h3>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='flex'>{renderStars(5)}</div>
                    <span className='text-xs text-gray-500'>
                      More than a year ago
                    </span>
                  </div>
                  <p className='text-sm text-gray-700'>it was perfect</p>
                </div>
                <button className='ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full'>
                  <ChevronRight className='w-5 h-5' />
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className='flex justify-center gap-2 py-4'>
              <div className='w-2 h-2 rounded-full bg-gray-800'></div>
              <div className='w-2 h-2 rounded-full bg-gray-300'></div>
              <div className='w-2 h-2 rounded-full bg-gray-300'></div>
              <div className='w-2 h-2 rounded-full bg-gray-300'></div>
              <div className='w-2 h-2 rounded-full bg-gray-300'></div>
            </div>
          </div>

          {/* Connect With Us Section */}
          <div>
            <h2 className='px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50'>
              Connect with us
            </h2>

            <div className='px-4 py-6 flex justify-center gap-8'>
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
          <div className='relative rounded-t-lg w-full md:w-2/5 bg-white md:h-auto md:max-h-[90vh] md:shadow-xl flex flex-col self-end md:self-auto md:absolute md:bottom-0 md:left-0  overflow-hidden'>
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
                {[0, 1, 2, 3, 4].map(renderRatingEmoji)}
              </div>

              {/* Name and Phone side by side */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                {/* Name Input */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Name (Optional)
                  </label>
                  <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white'
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Phone (Optional)
                  </label>
                  <div className='flex gap-2'>
                    <input
                      type='tel'
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder='+96591787948'
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white'
                    />
                  </div>
                </div>
              </div>

              {/* Comment Textarea */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Leave us a comment
                </label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows='1'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendFeedback}
                className='w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
              >
                <span>SEND</span>
                <Send className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Modal - Center Overlay */}
      {showReviews && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col'>
            <div className='p-4 border-b border-gray-200 flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>Customer reviews</h2>
              <button
                onClick={() => setShowReviews(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <div className='flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className='border-b border-gray-200 pb-4 mb-4 last:border-0'
                >
                  <h3 className='font-medium text-gray-900 mb-1'>
                    {review.name}
                  </h3>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='flex'>{renderStars(review.rating)}</div>
                    <span className='text-xs text-gray-500'>{review.date}</span>
                  </div>
                  {review.comment && (
                    <p className='text-sm text-gray-700'>{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

export default Contact
