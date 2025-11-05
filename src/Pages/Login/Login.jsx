import { useState } from 'react'
import { ArrowLeft, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../Services/Apiservice'
import { toast } from 'react-toastify'
import { MdOutlineMoreTime, MdContacts, MdApartment } from 'react-icons/md'
import { IoIosContact } from 'react-icons/io'
import RightPanelLayout from '../../Layout/RightPanelLayout'

const ContactInfoForm = () => {
  const [showGuestForm, setShowGuestForm] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const storedBrandId = localStorage.getItem('brandId')
  console.log('Retrieved brandId:', storedBrandId)

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGuestlogin = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        brandId: storedBrandId
      }
      const { data } = await ApiService.post('guestUser', payload)
      if (data.status) {
        sessionStorage.setItem(`guestUserId_${storedBrandId}`, data.user._id)
        toast.success('Guest login successful!')
        navigate('/shoopingcart')
      } else {
      }
    } catch (error) {
      toast.error('Something went wrong during login. Please try again.')
    }
  }

  const handleSignUp = () => {
    navigate('/profile')
  }

  const handleContinueAsGuest = () => {
    setShowGuestForm(true)
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-white'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] min-h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => navigate(-1)}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div className='w-9' />
          </div>
          {/* Progress Bar */}
          <div className='mt-4 h-1 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className={`h-full bg-red-600 transition-all duration-300 ${
                showGuestForm ? 'w-1/2' : 'w-1/2'
              }`}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className='flex-1 flex flex-col items-center justify-start px-6 py-8 md:py-12'>
          {!showGuestForm ? (
            // Initial View - Benefits and Buttons
            <>
              <div className='w-full max-w-md mx-auto'>
                {/* Icon */}
                <div className='flex justify-center mb-6'>
                  <div className='w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden'>
                    {/* Top bar */}
                    <div className='absolute top-0 left-0 right-0 h-3 bg-yellow-400 rounded-t-lg'></div>

                    {/* Window control dots */}
                    <div className='absolute top-1 right-1.5 flex gap-0.5'>
                      <div className='w-1.5 h-1.5 bg-cyan-700 rounded-sm'></div>
                      <div className='w-1.5 h-1.5 bg-cyan-700 rounded-sm'></div>
                      <div className='w-1.5 h-1.5 bg-cyan-700 rounded-sm'></div>
                    </div>

                    {/* User photo area - blue box */}
                    <div className='absolute left-2 top-6 w-7 h-7 bg-blue-500 rounded flex items-center justify-center'>
                      <IoIosContact className='w-5 h-5 text-yellow-400' />
                    </div>

                    {/* Text lines */}
                    <div className='absolute right-2 top-7 space-y-1'>
                      <div className='w-8 h-0.5 bg-yellow-400 rounded-full'></div>
                      <div className='w-8 h-0.5 bg-yellow-400 rounded-full'></div>
                      <div className='w-6 h-0.5 bg-yellow-400 rounded-full'></div>
                      <div className='w-7 h-0.5 bg-yellow-400 rounded-full'></div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h2 className='text-2xl font-semibold text-gray-700 text-center mb-8'>
                  Contact Information
                </h2>

                {/* Benefits List - Perfectly Aligned */}
                <div className='space-y-5 mb-8 flex flex-col items-center'>
                  <div className='flex items-center justify-center gap-4'>
                    <MdApartment className='w-5 h-5 text-gray-700' />
                    <span className='text-gray-800 font-medium'>
                      Save your addresses
                    </span>
                  </div>

                  {/* Slight icon adjustment for visual balance */}
                  <div className='flex items-center justify-center gap-4'>
                    <MdContacts className='w-5 h-5 text-gray-700 translate-x-[34px]' />
                    <span className='text-gray-800 font-medium translate-x-[34px]'>
                      Save your contact information
                    </span>
                  </div>

                  <div className='flex items-center justify-center gap-4'>
                    <MdOutlineMoreTime className='w-5 h-5 text-gray-700' />
                    <span className='text-gray-800 font-medium'>
                      One-tap re-ordering
                    </span>
                  </div>
                </div>

                {/* Sign Up Button - Reduced Width */}
                <div className='flex justify-center mb-6'>
                  <button
                    onClick={handleSignUp}
                    className='w-1/2 bg-[#FA0303] hover:bg-[#AF0202] text-white font-semibold py-3 rounded-lg transition-colors shadow-sm'
                  >
                    SIGN UP
                  </button>
                </div>

                {/* Continue as Guest - Centered */}
                <div className='text-center'>
                  <button
                    onClick={handleContinueAsGuest}
                    className='text-gray-800 font-medium hover:text-gray-900 transition-colors border-b-2 border-red-600 pb-0.5'
                  >
                    Or continue as Guest
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Guest Form View - Only Input Fields
            <>
              <div className='w-full max-w-md'>
                {/* Icon */}
                <div className='flex justify-center mb-6'>
                  <div className='w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center relative'>
                    <div className='absolute top-2 left-2 right-2 h-1.5 bg-cyan-600 rounded-full'></div>
                    <div className='absolute top-2 right-2 flex gap-1'>
                      <div className='w-1.5 h-1.5 bg-yellow-400 rounded-full'></div>
                      <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                    </div>
                    <div className='mt-3'>
                      <User className='w-8 h-8 text-white' />
                    </div>
                    <div className='absolute bottom-4 right-4 space-y-1'>
                      <div className='w-8 h-1 bg-yellow-300 rounded-full'></div>
                      <div className='w-6 h-1 bg-yellow-300 rounded-full'></div>
                      <div className='w-7 h-1 bg-yellow-300 rounded-full'></div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h2 className='text-2xl font-semibold text-gray-700 text-center mb-8'>
                  Contact Information
                </h2>

                {/* Form Fields */}
                <div className='space-y-4 mb-8'>
                  {/* Name Field */}
                  <div>
                    <input
                      type='text'
                      name='name'
                      placeholder='Name *'
                      value={formData.name}
                      onChange={handleInputChange}
                      className='w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-800 placeholder-gray-500 transition-colors'
                    />
                  </div>

                  {/* Email Field */}
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email (for your invoice)'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-800 placeholder-gray-500 transition-colors pr-10'
                    />
                    <div className='absolute right-0 top-1/2 -translate-y-1/2'>
                      <svg
                        className='w-5 h-5 text-teal-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className='relative'>
                    <div className='flex items-center border-b-2 border-gray-300 focus-within:border-gray-500 transition-colors'>
                      <div className='flex items-center gap-2 pr-3 border-r border-gray-300'>
                        <span className='text-xl'>🇦🇪</span>
                        <span className='text-gray-800 font-medium'>+965</span>
                      </div>
                      <input
                        type='tel'
                        name='phone'
                        placeholder='Phone *'
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength={8}
                        className='flex-1 px-3 py-3 border-0 focus:outline-none text-gray-800 placeholder-gray-500'
                      />
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleGuestlogin}
                  className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm'
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Hero Image */}
      <RightPanelLayout />
    </div>
  )
}

export default ContactInfoForm
