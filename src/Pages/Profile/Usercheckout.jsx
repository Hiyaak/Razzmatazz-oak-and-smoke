import { ArrowLeft } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'

const Usercheckout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [userId, setUserId] = useState('') // Will fetch dynamically

  // Initialize formData with profile data passed from Userprofile
  useEffect(() => {
    if (location.state?.profile) {
      const user = location.state.profile
      setFormData({
        name: user.firstName || '',
        email: user.email || '',
        phone: user.mobileNumber ? String(user.mobileNumber) : ''
      })
      setUserId(user._id || '') // use _id from profile if available
    }
  }, [location.state])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async () => {
    if (!userId) return
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        user_id: userId,
        Name: formData.name,
        phone: formData.phone.replace(/[^0-9]/g, '')
      })

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      const response = await fetch(
        'http://13.126.81.242:5001/updateUser',
        requestOptions
      )
      const result = await response.json()

      if (result.status) {
        setSuccess(true)
        navigate('/userprofile', { replace: true })
      } else {
        setError(result.message || 'Failed to update user information')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('An error occurred while updating. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-white'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate(-1)}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          className='flex-1 overflow-y-auto'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>{`
            .scrollable-content::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className='p-6 scrollable-content'>
            {/* Icon and Title */}
            <div className='flex flex-col items-center mb-8'>
              <div className='w-24 h-24 bg-cyan-400 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden'>
                <svg className='w-20 h-20' viewBox='0 0 100 100' fill='none'>
                  <rect
                    x='10'
                    y='18'
                    width='80'
                    height='65'
                    rx='3'
                    fill='#06B6D4'
                  />
                  <rect
                    x='13'
                    y='12'
                    width='74'
                    height='6'
                    rx='2'
                    fill='#FCD34D'
                  />
                  <rect
                    x='88'
                    y='14'
                    width='3'
                    height='3'
                    rx='1'
                    fill='#FCD34D'
                  />
                  <rect
                    x='82'
                    y='14'
                    width='3'
                    height='3'
                    rx='1'
                    fill='#FCD34D'
                  />
                  <circle cx='32' cy='42' r='9' fill='#F59E0B' />
                  <rect x='30' y='48' width='4' height='14' fill='#3B82F6' />
                  <rect
                    x='48'
                    y='35'
                    width='30'
                    height='3'
                    rx='1.5'
                    fill='#FCD34D'
                  />
                  <rect
                    x='48'
                    y='42'
                    width='30'
                    height='3'
                    rx='1.5'
                    fill='#FCD34D'
                  />
                  <rect
                    x='48'
                    y='49'
                    width='25'
                    height='3'
                    rx='1.5'
                    fill='#FCD34D'
                  />
                  <rect
                    x='48'
                    y='56'
                    width='20'
                    height='3'
                    rx='1.5'
                    fill='#FCD34D'
                  />
                </svg>
              </div>
              <h2 className='text-2xl font-semibold text-gray-600'>
                Contact Information
              </h2>
            </div>

            {/* Form */}
            <div className='space-y-3  mx-0'>
              {/* Name Field */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full px-0 py-2 border-b border-gray-300 focus:border-red-600 outline-none text-gray-800 transition-colors bg-transparent'
                  placeholder='Enter your name'
                />
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Email{' '}
                  <span className='text-xs text-gray-400'>
                    (for your invoice)
                  </span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  readOnly
                  className='w-full px-0 py-2 border-b border-gray-300  outline-none text-gray-400 transition-colors bg-gray-50'
                  placeholder='Enter your email'
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className='block text-sm text-gray-500 mb-1'>
                  Phone <span className='text-red-500'>*</span>
                </label>
                <div className='flex items-center border-b border-gray-300 focus-within:border-red-600 transition-colors py-3'>
                  <span className='text-base mr-2'>KW</span>
                  <span className='text-gray-800'>+965</span>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full px-0 outline-none text-gray-800 bg-transparent'
                    placeholder='Phone Number'
                    maxLength={8}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Save Button */}
        <div className='p-3 border-gray-200 flex-shrink-0 bg-white'>
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.name || !formData.phone}
            className='w-full bg-[#FA0303] hover:bg-[#AF0202] disabled:bg-red-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors text-base'
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Usercheckout
