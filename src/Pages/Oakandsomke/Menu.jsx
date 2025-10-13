import React, { useState } from 'react'
import {
  ArrowLeft,
  ShoppingCart,
  FileText,
  Clock,
  Mail,
  Eye,
  EyeOff,
  Menu,
  ShoppingBag,
  Search,
  User,
  LogOut
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'
import ApiService from '../../Services/Apiservice'

const MenuPage = () => {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState('menu') // 'menu' | 'form'
  const [activeTab, setActiveTab] = useState('register')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const storedBrandId = localStorage.getItem('brandId')

  const handleRegisterUser = async () => {
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        brandId: storedBrandId
      }

      const { data } = await ApiService.post('registerWithEmail', payload)

      if (data.status) {
        alert('User Registered successfully. Please login now.')

        // Clear form fields if you want
        setFormData({ email: '', password: '' })

        // Switch tab to Login
        setActiveTab('login')

        // Optionally switch view to 'form' if not already
        setActiveView('form')
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      console.log('error ', error)
      alert('Something went wrong during registration')
    }
  }

  const handleLoginUser = async () => {
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        brandId: storedBrandId
      }

      const { data } = await ApiService.post('loginWithEmail', payload)

      if (data.status) {
        // Save user ID
        localStorage.setItem('registredUserId', data.user._id)
        alert(data.message) // "Login successful"
        navigate('/shoopingcart') // go to cart after login
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Something went wrong')
    }
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

  const menuItems = [
    {
      icon: <ShoppingCart className='w-5 h-5 text-gray-600' />,
      label: 'My Cart',
      path: '/shoopingcart'
    },
    {
      icon: <FileText className='w-5 h-5 text-gray-600' />,
      label: 'Menu',
      path: '/'
    },
    {
      icon: <Clock className='w-5 h-5 text-gray-600' />,
      label: 'My Orders',
      path: '/myorders'
    }
  ]
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 min-h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => {
                if (activeView === 'form') setActiveView('menu')
                else navigate('/')
              }}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div className='w-9' />
          </div>
        </div>

        {activeView === 'menu' ? (
          <>
            {/* Menu Header */}
            <div className='p-4 border-b border-gray-200'>
              <div className='flex items-center justify-between mb-1'>
                <h1 className='text-2xl font-semibold text-gray-900'>Menu</h1>
                <div className='w-9' />
              </div>
            </div>

            {/* Menu Items */}
            <div className='border-b border-gray-200'>
              {menuItems.map((item, i, arr) => (
                <button
                  key={i}
                  onClick={() => navigate(item.path)} // ✅ navigate to route
                  className={`w-full p-3 flex items-center space-x-3 text-left hover:bg-gray-50 transition ${
                    i !== arr.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  {item.icon}
                  <span className='text-gray-700 font-medium'>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Sign In Section */}
            <div className='p-4'>
              <div className='flex items-center justify-between mb-1'>
                <h1 className='text-2xl font-semibold text-gray-900'>
                  Sign in with
                </h1>
                <div className='w-9' />
              </div>
            </div>

            {/* Sign In Options */}
            <div className='flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-200 overflow-hidden'>
              {[
                {
                  icon: (
                    <div className='w-6 h-6 bg-orange-500 rounded flex items-center justify-center'>
                      <Mail className='w-4 h-4 text-white' />
                    </div>
                  ),
                  label: 'Email',
                  onClick: () => setActiveView('form')
                },
                {
                  icon: (
                    <div className='w-6 h-6 bg-black rounded flex items-center justify-center'>
                      <svg
                        className='w-4 h-4 text-white'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                      >
                        <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
                      </svg>
                    </div>
                  ),
                  label: 'Apple'
                },
                {
                  icon: (
                    <div className='w-6 h-6 rounded flex items-center justify-center'>
                      <svg className='w-6 h-6' viewBox='0 0 24 24'>
                        <path
                          fill='#4285F4'
                          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                        />
                        <path
                          fill='#34A853'
                          d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                        />
                        <path
                          fill='#FBBC05'
                          d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                        />
                        <path
                          fill='#EA4335'
                          d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                        />
                      </svg>
                    </div>
                  ),
                  label: 'Google'
                }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.onClick}
                  className='w-full flex items-center space-x-4 p-3 text-left hover:bg-gray-50 transition'
                >
                  {item.icon}
                  <span className='text-gray-700 font-medium'>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* ---------------- FORM VIEW ---------------- */
          <div className='px-4 pb-8 overflow-y-auto '>
            {/* Tab Navigation */}
            <div className='flex gap-3 mt-6 mb-8'>
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white text-cyan-500 border-2 border-cyan-500'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'register'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white text-cyan-500 border-2 border-cyan-500'
                }`}
              >
                Register
              </button>
            </div>

            {/* Title */}
            <h2 className='text-2xl font-bold text-gray-700 mb-8'>
              {activeTab === 'login' ? 'Login' : 'Register'}
            </h2>

            {/* Form Fields */}
            <div className='space-y-4'>
              {/* Email Field */}
              <div>
                <label className='block text-sm text-gray-500 mb-2'>
                  Email *
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full text-base border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 outline-none transition-colors'
                />
              </div>

              {/* Password Field */}
              <div>
                <label className='block text-sm text-gray-500 mb-2'>
                  Password *
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='w-full pr-10 text-base border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 outline-none transition-colors'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className='flex items-center gap-4 my-8'>
                <div className='flex-1 h-px bg-gray-300'></div>
                <span className='text-gray-400 text-sm font-medium'>OR</span>
                <div className='flex-1 h-px bg-gray-300'></div>
              </div>

              {/* Social Login */}
              <div>
                <h3 className='text-lg font-bold text-gray-700 mb-4'>
                  Login with
                </h3>
                <div className='space-y-4'>
                  <button
                    type='button'
                    className='w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    <svg className='w-6 h-6' viewBox='0 0 24 24'>
                      <path
                        d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z'
                        fill='currentColor'
                      />
                    </svg>
                    <span className='flex-1 text-left text-gray-700 font-medium'>
                      Apple
                    </span>
                  </button>

                  <button
                    type='button'
                    className='w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    <svg className='w-6 h-6' viewBox='0 0 24 24'>
                      <path
                        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                        fill='#4285F4'
                      />
                      <path
                        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                        fill='#34A853'
                      />
                      <path
                        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                        fill='#FBBC05'
                      />
                      <path
                        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                        fill='#EA4335'
                      />
                    </svg>
                    <span className='flex-1 text-left text-gray-700 font-medium'>
                      Google
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}

              <button
                onClick={
                  activeTab === 'login' ? handleLoginUser : handleRegisterUser
                }
                className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mt-8 text-lg'
              >
                {activeTab === 'login' ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className='hidden md:block fixed right-0 top-0 w-3/5 h-screen bg-black z-0'>
        {/* Top Navigation */}
        <div className='absolute top-6 left-6 right-6 z-10'>
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
              <button
                onClick={handeleSearch}
                className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'
              >
                <Search className='w-6 h-6' />
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

        {/* Hero Banner Image */}
        <img
          loading='lazy'
          src={heroImage}
          alt='Hero Food'
          className='w-full h-full object-cover'
        />

        {/* Floating Icon */}
        <div className='absolute top-1/2 right-6 z-20 transform -translate-y-1/2'>
          <div className='w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg'>
            IG
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuPage
