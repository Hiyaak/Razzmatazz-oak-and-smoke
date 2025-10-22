import React, { useEffect, useState } from 'react'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import {
  ArrowLeft,
  ShoppingCart,
  FileText,
  Clock,
  MapPin,
  Trash2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../Services/Apiservice'

const Userprofile = () => {
  const [profile, setProfile] = useState(null)

  const navigate = useNavigate()
  const storedBrandId = localStorage.getItem('brandId')
  const registredUserId = localStorage.getItem(
    `registredUserId_${storedBrandId}`
  )

  const fetchProfile = async () => {
    if (!registredUserId) {
      toast.error('User not found. Please log in again.')
      navigate('/profile')
      return
    }
    try {
      const payload = { id: registredUserId }
      const { data } = await ApiService.post('getProfileById', payload)
      if (data.status) {
        console.log('Profile API response:', data)
        setProfile(data.profile)
      } else {
        toast.error(data.message || 'Failed to load profile.')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Something went wrong while loading your profile.')
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleSignOut = () => {
    console.log('Sign out clicked')
  }

  const handleEditProfile = () => {
    navigate('/usercheckout')
  }

  const handleDeleteAccount = () => {
    console.log('Delete account clicked')
  }

  const menuItems = [
    {
      icon: <ShoppingCart className='w-5 h-5 text-gray-600 ' />,
      label: 'My cart',
      path: '/shoopingcart'
    },
    {
      icon: <FileText className='w-5 h-5 text-gray-600' />,
      label: 'Menu',
      path: '/'
    },
    {
      icon: <Clock className='w-5 h-5 text-gray-600' />,
      label: 'My orders',
      path: '/myorders'
    },
    {
      icon: <MapPin className='w-5 h-5 text-gray-600' />,
      label: 'Delivery addresses'
    },
    {
      icon: <Trash2 className='w-5 h-5 text-[#FA0303]' />,
      label: 'Delete account',
      isDelete: true,
      onClick: handleDeleteAccount
    }
  ]

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-white overflow-hidden'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div className='w-9' />
          </div>
        </div>

        {/* Profile Section */}
        <div className='p-4 border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-semibold text-gray-700'>Profile</h1>
            <button
              onClick={handleSignOut}
              className='text-[#FA0303] font-semibold text-sm '
            >
              sign out
            </button>
          </div>

          <div className='flex items-start gap-4 mt-6'>
            {/* Avatar */}
            <div className='w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0'>
              <svg
                className='w-12 h-12 text-gray-400'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8
                1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
                />
              </svg>
            </div>

            {/* Profile Info */}
            <div className='flex-1'>
              <h2 className='text-base font-normal text-gray-900 mb-1'>
                {profile?.firstName || profile?.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : ''}
              </h2>
              <p className='text-sm text-gray-600 mb-0.5'>{profile?.email}</p>
              {profile?.mobileNumber && (
                <p className='text-sm text-gray-600 mb-2'>
                  +{profile.mobileNumber}
                </p>
              )}
              <button
                onClick={handleEditProfile}
                className='text-[#FA0303] font-semibold text-sm '
              >
                edit
              </button>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className='px-6 py-3 flex-shrink-0'>
          <h1 className='text-xl font-semibold text-gray-700'>Menu</h1>
        </div>

        {/* Menu Items */}
        <div className='flex-1'>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick || (() => navigate(item.path))}
              className={`w-full px-6 py-3 flex items-center gap-4 text-left hover:bg-gray-50 transition border-b border-gray-200 ${
                item.isDelete ? '' : 'text-gray-700'
              }`}
            >
              {item.icon}
              <span className='flex-1 font-normal'>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Userprofile
