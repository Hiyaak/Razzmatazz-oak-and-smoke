import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, ShoppingBag, Search, LogOut } from 'lucide-react'
import heroImage from '../assets/concept.jpg'

const RightPanelLayout = () => {
  const navigate = useNavigate()

  const handleMenuClick = () => navigate('/profile')
  const handleShopingCartClick = () => navigate('/shoopingcart')
  const handleSearch = () => navigate('/search')

  const handleLogout = () => {
    localStorage.removeItem('guestUserId')
    localStorage.removeItem('registredUserId')
    localStorage.removeItem(`selectedLocation_${brandId}`)
    navigate('/')
  }
  return (
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
              onClick={handleShopingCartClick}
              className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'
            >
              <ShoppingBag className='w-6 h-6' />
            </button>
            <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'>
              <Search onClick={handleSearch} className='w-6 h-6' />
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
  )
}

export default RightPanelLayout
