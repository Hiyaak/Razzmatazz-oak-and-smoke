import React, { useEffect, useState } from 'react'
import { ArrowLeft, MapPin, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'
import ApiService from '../../Services/Apiservice'

const HeroSection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const brandId = localStorage.getItem('brandId')

  // Initial method from navigation or default
  const methodFromState = location.state?.method || 'delivery'

  // States
  const [selectedMethod, setSelectedMethod] = useState(methodFromState)
  const [selectedGovernate, setSelectedGovernate] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [governates, setGovernates] = useState([])
  const [areas, setAreas] = useState([])
  const [selectedGovernateId, setSelectedGovernateId] = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState('')
  
  // Fetch all governates for the brand
  const getAllGovernates = async () => {
    try {
      const { data } = await ApiService.get(`/getAllGovernate/${brandId}`)
      if (data.status && data.governates) {
        setGovernates(data.governates)
      } else {
        setGovernates([])
      }
    } catch (error) {
      console.error('Error fetching governates:', error)
    }
  }

  // Fetch all areas for a selected governate
  const getAreasByGovernate = async governateId => {
    try {
      const { data } = await ApiService.get('/getAllArea', {
        governateId,
        brandId
      })
      if (data.status && data.areas) {
        setAreas(data.areas)
      } else {
        setAreas([])
      }
    } catch (error) {
      console.error('Error fetching areas:', error)
    }
  }

  useEffect(() => {
    if (brandId) getAllGovernates()
  }, [brandId])

  // Handle method change
  const handleMethodChange = method => {
    setSelectedMethod(method)
    setSelectedGovernate('')
    setSelectedArea('')
    setAreas([])
    setSearchQuery('')
    setShowDropdown(false)
  }

  // Handle governate selection
  const handleGovernateSelect = governate => {
    setSelectedGovernate(governate.governateName)
    setSelectedGovernateId(governate._id)
    setSelectedArea('')
    setSearchQuery('')
    getAreasByGovernate(governate._id)
    setShowDropdown(true)
  }

  // Handle area selection
  const handleAreaSelect = area => {
    setSelectedArea(area.areaName)
    setSelectedAreaId(area._id)
    setShowDropdown(false)
  }

  // Filter governates based on search query
  const filteredGovernates = governates.filter(g =>
    g.governateName.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Panel */}
      <div className='w-full md:w-2/5 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center mb-4'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
          </div>
          <h1 className='text-2xl font-semibold text-gray-900'>Order Now</h1>
        </div>

        {/* Method Selection */}
        <div className='p-6 space-y-6 flex-1'>
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

          {/* Governate / Area Selection */}
          <div>
            <div className='flex items-center space-x-2 mb-2'>
              <MapPin className='w-5 h-5 text-red-600' />
              <span className='text-gray-700 font-medium'>
                {selectedMethod === 'delivery' ? 'Deliver to' : 'Pickup from'}
              </span>
            </div>

            {/* Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className='w-full p-3 border border-gray-300 bg-white rounded-lg flex items-center justify-between text-gray-700 hover:bg-gray-50 transition'
              >
                <span>
                  {selectedArea || selectedGovernate || 'Select location'}
                </span>
                <ChevronDown className='w-5 h-5' />
              </button>

              {showDropdown && (
                <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-20'>
                  {/* Search Bar */}
                  <div className='p-3 border-b border-gray-200'>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                      <input
                        type='text'
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  {/* Governates / Areas List */}
                  <div className='py-2 space-y-1'>
                    {/* If no governate selected, show governates */}
                    {!selectedGovernate &&
                      (filteredGovernates.length > 0 ? (
                        filteredGovernates.map(g => (
                          <button
                            key={g._id}
                            onClick={() => handleGovernateSelect(g)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                              selectedGovernate === g.governateName
                                ? 'bg-red-50 border-l-4 border-l-red-500 text-gray-900'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {g.governateName}
                          </button>
                        ))
                      ) : (
                        <div className='p-4 text-gray-500 text-sm text-center'>
                          No governates found
                        </div>
                      ))}

                    {/* If governate selected, show areas */}
                    {selectedGovernate &&
                      (areas.length > 0 ? (
                        areas.map(area => (
                          <button
                            key={area._id}
                            onClick={() => handleAreaSelect(area)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                              selectedArea === area.areaName
                                ? 'bg-red-50 border-l-4 border-l-red-500 text-gray-900'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {area.areaName}
                          </button>
                        ))
                      ) : (
                        <div className='p-4 text-gray-500 text-sm text-center'>
                          No areas found
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Start Ordering Button */}
        <button
          onClick={handleStartOrdering}
          className={`w-full py-4 text-white rounded-lg font-semibold text-lg transition ${
            selectedArea || selectedGovernate
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedArea && !selectedGovernate}
        >
          {selectedArea || selectedGovernate
            ? 'Start Ordering'
            : 'Select your location'}
        </button>
      </div>

      {/* Right Panel */}
      <div className='hidden md:block md:w-3/5 relative'>
        <img
          src={heroImage}
          alt='Background'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  )
}

export default HeroSection
