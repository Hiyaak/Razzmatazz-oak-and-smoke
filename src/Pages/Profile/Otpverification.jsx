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
  const pendingOtp = sessionStorage.getItem('pendingOtp') // for testing display only

  const handleVerifyOtp = async () => {
    if (!otpInput) {
      toast.error('Please enter the OTP')
      return
    }

    try {
      // 1) Verify OTP
      const verifyPayload = {
        email: pendingEmail,
        otp: otpInput
      }

      console.log('verifyEmailOtp payload:', verifyPayload)

      const { data } = await ApiService.post('verifyEmailOtp', verifyPayload)

      console.log('verifyEmailOtp response:', data)

      if (!data || !data.status) {
        const msg = data?.message || 'Invalid OTP or verification failed'
        toast.error(msg)
        console.warn('verifyEmailOtp failed response:', data)
        return
      }

      // 2) Get verified userId
      const userId = data.userId

      if (!userId) {
        toast.error('No userId returned from server. Check backend response.')
        console.error('verifyEmailOtp success but missing userId:', data)
        return
      }

      localStorage.setItem(`registredUserId_${storedBrandId}`, userId)
      console.log('Saved registredUserId:', userId)

      // 3) Get local FCM Token
      const fcmToken = localStorage.getItem('fcmToken')
      console.log('local fcmToken:', fcmToken)

      // 4) Update backend with correct payload
      if (fcmToken) {
        try {
          // Backend expects:  { user_id , fcmToken }
          const updatePayload = {
            user_id: userId,
            fcmToken: fcmToken // ✔ FIXED
          }

          console.log('Calling updateUserToken with:', updatePayload)

          const updateResp = await ApiService.post(
            'updateUserToken',
            updatePayload
          )

          console.log(
            'updateUserToken response:',
            updateResp?.data ?? updateResp
          )

          if (!updateResp?.data?.status) {
            toast.info('OTP verified — but token update failed. Check backend.')
            console.warn(
              'updateUserToken returned non-success:',
              updateResp?.data
            )
          } else {
            console.log('Token updated successfully in backend.')
          }
        } catch (err) {
          console.error('updateUserToken error:', err?.response ?? err)
          toast.info('OTP verified but token update failed.')
        }
      } else {
        console.warn('No fcmToken in localStorage.')
        toast.info('OTP verified but no saved FCM token found.')
      }

      // 5) Cleanup and redirect
      sessionStorage.removeItem('pendingOtp')
      sessionStorage.removeItem('pendingEmail')

      toast.success('OTP verified successfully!')
      navigate('/')
    } catch (err) {
      console.error('OTP verification error:', err)

      if (err?.response) {
        const message =
          err.response.data?.message || `Server error (${err.response.status})`
        toast.error(message)
      } else if (err?.message) {
        toast.error(`Error: ${err.message}`)
      } else {
        toast.error('Something went wrong while verifying OTP')
      }
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
              className='bg-[#0099CC] text-white font-semibold py-3 px-20 rounded-lg transition-colors'
            >
              VERIFY
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Otpverification
