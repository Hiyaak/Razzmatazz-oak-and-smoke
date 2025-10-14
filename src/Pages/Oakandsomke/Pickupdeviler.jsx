import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ChevronDown,
  Search,
  ShoppingBag,
  Menu,
  LogOut
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'
import ApiService from '../../Services/Apiservice'

const HeroSection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const brandId = localStorage.getItem('brandId')

  const methodFromState = location.state?.method || 'delivery'

  const [selectedMethod, setSelectedMethod] = useState(methodFromState)
  const [governates, setGovernates] = useState([])
  const [expandedGovernateId, setExpandedGovernateId] = useState(null)
  const [areasByGovernate, setAreasByGovernate] = useState({})
  const [selectedGovernate, setSelectedGovernate] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedGovernateId, setSelectedGovernateId] = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState('')

  // Fetch all governates for the brand based on selected method
  const getAllGovernates = async () => {
    try {
      let response

      if (selectedMethod === 'pickup') {
        // Pickup method → different API
        response = await ApiService.get(
          `/getAllPickUpGovernateByBrandId/${brandId}`
        )
      } else {
        // Delivery method → default API
        response = await ApiService.get(`/getAllGovernate/${brandId}`)
      }

      const { data } = response

      if (data.status && data.governates) {
        setGovernates(data.governates)
      } else {
        setGovernates([])
      }
    } catch (error) {
      console.error('Error fetching governates:', error)
      setGovernates([])
    }
  }

  // Fetch areas for a given governate based on selected method
  const getAreasByGovernate = async governateId => {
    if (areasByGovernate[governateId]) return // already loaded

    try {
      let response

      if (selectedMethod === 'pickup') {
        // Pickup method → different API
        response = await ApiService.get('/getAllPickUPArea', {
          governateId,
          brandId
        })
      } else {
        // Delivery method → default API
        response = await ApiService.get('/getAllArea', {
          governateId,
          brandId
        })
      }

      const { data } = response

      if (data.status && data.areas) {
        setAreasByGovernate(prev => ({
          ...prev,
          [governateId]: data.areas
        }))
      } else {
        setAreasByGovernate(prev => ({
          ...prev,
          [governateId]: []
        }))
      }
    } catch (error) {
      console.error('Error fetching areas:', error)
    }
  }

  useEffect(() => {
    if (brandId) {
      setGovernates([])
      setAreasByGovernate({})
      getAllGovernates()
    }
  }, [brandId, selectedMethod])

  const handleMethodChange = method => {
    setSelectedMethod(method)
    setSelectedGovernate('')
    setSelectedArea('')
    setExpandedGovernateId(null)
  }

  const handleGovernateClick = governate => {
    if (expandedGovernateId === governate._id) {
      setExpandedGovernateId(null)
    } else {
      setExpandedGovernateId(governate._id)
      getAreasByGovernate(governate._id)
    }
  }

  const handleAreaSelect = (governate, area) => {
    setSelectedGovernate(governate.governateName)
    setSelectedGovernateId(governate._id)
    setSelectedArea(area.areaName)
    setSelectedAreaId(area._id)
    setExpandedGovernateId(null)
  }

  const handleStartOrdering = () => {
    if (selectedArea || selectedGovernate) {
      localStorage.setItem(
        'selectedLocation',
        JSON.stringify({
          selectedMethod,
          selectedGovernate,
          selectedGovernateId,
          selectedArea,
          selectedAreaId
        })
      )
      navigate('/')
    }
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

    navigate('/') // if using react-router
  }

  const handleMenuClick = () => navigate('/menu')

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Panel */}
      <div className='w-full md:w-2/5 h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0 sticky top-0 bg-white z-10'>
          <div className='flex items-center'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              Method
            </h1>
            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* Method Selection */}
          <div className='space-y-6 px-6 py-6 border-b border-gray-200'>
            <div className='flex space-x-4'>
              <button
                onClick={() => handleMethodChange('delivery')}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-base transition-all ${
                  selectedMethod === 'delivery'
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                🚚 Delivery
              </button>
              <button
                onClick={() => handleMethodChange('pickup')}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-base transition-all ${
                  selectedMethod === 'pickup'
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                🏪 Pickup
              </button>
            </div>
          </div>

          {/* Governate / Area Selection */}
          <div className='pb-6   '>
            <div className='flex items-center bg-gray-100 space-x-2 mb-3 border-b border-gray-300 py-4 px-6 w-full'>
              <span className='text-gray-700 font-medium'>
                {selectedMethod === 'delivery' ? 'Location' : 'Choose a store'}
              </span>
            </div>

            {/* List Governates */}
            <div className='space-y-2'>
              {governates.length > 0 ? (
                governates.map(gov => (
                  <div key={gov._id} className='rounded-lg'>
                    <button
                      onClick={() => handleGovernateClick(gov)}
                      className='w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 transition rounded-lg'
                    >
                      <span className='text-gray-800 font-medium'>
                        {gov.governateName}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedGovernateId === gov._id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedGovernateId === gov._id && (
                      <div className='px-4 py-2 space-y-2'>
                        {areasByGovernate[gov._id]?.length > 0 ? (
                          areasByGovernate[gov._id].map(area => (
                            <button
                              key={area._id}
                              onClick={() => handleAreaSelect(gov, area)}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                                selectedAreaId === area._id
                                  ? 'bg-red-100 text-red-700 font-semibold'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              {area.areaName}
                            </button>
                          ))
                        ) : (
                          <p className='text-sm text-gray-500 italic'>
                            No areas found
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className='text-gray-500 text-sm text-center'>
                  No governates found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Start Ordering Button */}
        <div className='p-3 border-t border-gray-200 bg-white flex-shrink-0 sticky bottom-0'>
          <button
            onClick={handleStartOrdering}
            disabled={!selectedArea && !selectedGovernate}
            className={`w-full py-3 text-white rounded-lg font-semibold text-lg transition ${
              selectedArea || selectedGovernate
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedArea || selectedGovernate
              ? 'Start Ordering'
              : 'Select your location'}
          </button>
        </div>
      </div>

      {/* Right Panel - Fixed */}
      <div className='flex-1 relative bg-black h-screen overflow-hidden'>
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

export default HeroSection
