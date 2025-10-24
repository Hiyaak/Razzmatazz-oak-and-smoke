import React, { useState } from 'react'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../Services/Apiservice'
import { toast } from 'react-toastify'
import { ArrowLeft } from 'lucide-react'

const Otpverification = () => {
  const navigate = useNavigate()
  const [otpInput, setOtpInput] = useState('')
  const storedBrandId = localStorage.getItem('brandId')

  const pendingEmail = sessionStorage.getItem('pendingEmail')
  console.log('registered email:-', pendingEmail)
  const pendingOtp = sessionStorage.getItem('pendingOtp')
  console.log('otp recived:-', pendingOtp)

  const handleVerifyOtp = async () => {
    if (!otpInput) {
      toast.error('Please enter the OTP')
      return
    }
    try {
      const payload = { email: pendingEmail, otp: pendingOtp }
      const { data } = await ApiService.post('verifyEmailOtp', payload)
      if (data.status) {
        toast.success('OTP verified successfully!')
        sessionStorage.removeItem('pendingOtp')
        sessionStorage.removeItem('pendingEmail')
        localStorage.setItem(`registredUserId_${storedBrandId}`, data.userId)
        navigate('/')
      } else {
        toast.error(data.message || 'Invalid OTP')
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      toast.error('Something went wrong while verifying OTP')
    }
  }

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
            <div className='w-9' />
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 flex-col p-4'>
          {/* Title */}
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>Register</h2>

          <p className='text-gray-600 mb-6 text-center'>
            An email was sent to{' '}
            <span className='font-medium text-gray-800'>{pendingEmail}</span>{' '}
            with a 6-digit verification code. Please enter it below
          </p>
          <div className='mb-6'>
            <input
              type='text'
              value={otpInput}
              onChange={e =>
                setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              placeholder='Confirmation code *'
              className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1'
              maxLength={6}
            />
          </div>
          <div className='flex justify-center mb-2'>
            <button
              onClick={handleVerifyOtp}
              className='bg-[#0099CC]  text-white font-semibold py-3 px-20 rounded-lg transition-colors'
            >
              VERIFY
            </button>
          </div>
          {pendingOtp && (
            <p className='text-sm text-red-500 text-center mb-6'>
              OTP for testing:{' '}
              <span className='font-semibold'>{pendingOtp}</span>
            </p>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Otpverification
