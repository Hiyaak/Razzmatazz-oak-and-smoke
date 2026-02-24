import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Search, BellMinus, Languages } from 'lucide-react'
import heroImage from '../assets/oak.jpg'
import { Instagram } from 'lucide-react'
import { RiShoppingBagLine } from 'react-icons/ri'
import { LanguageContext } from '../Context/LanguageContext'

const RightPanelLayout = () => {
  const navigate = useNavigate()
  const { language, changeLanguage } = useContext(LanguageContext)

  const handleMenuClick = () => {
    const storedBrandId = localStorage.getItem('brandId')
    const guestUserId = sessionStorage.getItem(`guestUserId_${storedBrandId}`)
    const registredUserId = localStorage.getItem(
      `registredUserId_${storedBrandId}`
    )

    const userId = registredUserId || guestUserId

    if (userId) navigate('/userprofile')
    else navigate('/profile')
  }

  const handleShopingCartClick = () => navigate('/shoopingcart')
  const handleSearch = () => navigate('/search')
  const handleNotificationClick = () => navigate('/notifications')

  return (
    <div className='flex-1 relative bg-black h-screen overflow-hidden'>
      {/* Top Navigation — hidden on mobile */}
      <div className='hidden md:absolute md:top-4 md:left-6 md:right-6 md:z-10 md:block'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-6'>
            <button
              onClick={handleMenuClick}
              className='w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all'
            >
              <Menu className='w-5 h-5' />
            </button>

            <button
              onClick={handleShopingCartClick}
              className='w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all'
            >
              <RiShoppingBagLine className='w-5 h-5' />
            </button>

            <button
              onClick={handleSearch}
              className='w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all'
            >
              <Search className='w-5 h-5' />
            </button>

            {/* Notification / Bell Icon */}
            <button
              onClick={handleNotificationClick}
              className='w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all'
            >
              <BellMinus className='w-5 h-5' />
            </button>

            <button
              onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
              className='w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all'
            >
              <Languages className='w-4 h-4' />
              {language === 'en' ? 'EN' : 'AR'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section — hidden on mobile */}
      <div className='hidden md:block relative h-full'>
        <img
          src={heroImage}
          alt='Hero'
          className='w-full h-full object-cover'
        />

        {/* Bottom IG button */}
        <div className='absolute top-1/2 right-0 z-20 transform -translate-y-1/2'>
          <div className='w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white'>
            <Instagram className='w-6 h-6' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightPanelLayout
