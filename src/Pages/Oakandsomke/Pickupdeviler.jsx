import React, { useEffect, useState } from 'react'
import { ArrowLeft, ChevronDown, Search, CarFront, Store } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCarSide, FaWalking } from 'react-icons/fa'

import ApiService from '../../Services/Apiservice'
import RightPanelLayout from '../../Layout/RightPanelLayout'

const HeroSection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const brandId = localStorage.getItem('brandId')

  const methodFromState = location.state?.method || 'delivery'

  const [selectedMethod, setSelectedMethod] = useState(methodFromState)
  const [managementStatus, setManagementStatus] = useState({
    deliveryStatus: true,
    pickupStatus: true
  })
  const [governates, setGovernates] = useState([])
  const [expandedGovernateId, setExpandedGovernateId] = useState(null)
  const [areasByGovernate, setAreasByGovernate] = useState({})
  const [selectedGovernate, setSelectedGovernate] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedGovernateId, setSelectedGovernateId] = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [manuallyExpanded, setManuallyExpanded] = useState(new Set())

  // ✅ Enhanced filter logic - Search only areas, not governates
  const filteredGovernates = governates
    .map(gov => {
      const filteredAreas =
        areasByGovernate[gov._id]?.filter(area =>
          area.areaName.toLowerCase().includes(searchQuery.toLowerCase())
        ) || []

      // Show all governates when no search, only matching ones during search
      const shouldShowGovernate = searchQuery
        ? filteredAreas.length > 0 // During search: only show if has matching areas
        : true // No search: show all governates

      if (shouldShowGovernate) {
        return {
          ...gov,
          filteredAreas: searchQuery
            ? filteredAreas
            : areasByGovernate[gov._id] || []
        }
      }
      return null
    })
    .filter(Boolean)

  //GetmanagementStatus
  const handlemanagementStatus = async () => {
    try {
      const { data } = await ApiService.get(`getmanagementByBrandId/${brandId}`)

      if (data.status && data.data) {
        setManagementStatus({
          deliveryStatus: data.data.deliveryStatus ?? true, // null/undefined → true
          pickupStatus: data.data.pickupStatus ?? true
        })
      }
    } catch (error) {
      console.error('Error in fetching managementStatus:', error)
    }
  }

  useEffect(() => {
    handlemanagementStatus()
  }, [])

  // Fetch all governates for the brand based on selected method
  const getAllGovernates = async () => {
    try {
      let response

      if (selectedMethod === 'pickup') {
        response = await ApiService.get(
          `/getAllPickUpGovernateByBrandId/${brandId}`
        )
      } else {
        response = await ApiService.get(`/getAllGovernateByBrandId/${brandId}`)
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
    if (areasByGovernate[governateId]) return

    try {
      let response

      if (selectedMethod === 'pickup') {
        response = await ApiService.get('/getAllPickUPArea', {
          governateId,
          brandId
        })
      } else {
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
      setManuallyExpanded(new Set())
      setExpandedGovernateId(null)
      getAllGovernates()
    }
  }, [brandId, selectedMethod])

  // Auto-fetch areas for visible governates during search
  useEffect(() => {
    if (searchQuery && filteredGovernates.length > 0) {
      filteredGovernates.forEach(gov => {
        if (!areasByGovernate[gov._id]) {
          getAreasByGovernate(gov._id)
        }
      })
    }
  }, [searchQuery, filteredGovernates])

  const handleMethodChange = method => {
    setSelectedMethod(method)
    setSelectedGovernate('')
    setSelectedArea('')
    setExpandedGovernateId(null)
    setManuallyExpanded(new Set())
    setSearchQuery('')
  }

  const handleGovernateClick = governate => {
    // If clicking the same governate that's already expanded, collapse it
    if (expandedGovernateId === governate._id) {
      setExpandedGovernateId(null)
      setManuallyExpanded(prev => {
        const newSet = new Set(prev)
        newSet.delete(governate._id)
        return newSet
      })
    } else {
      // Expand the clicked governate
      setExpandedGovernateId(governate._id)
      setManuallyExpanded(prev => {
        const newSet = new Set(prev)
        newSet.add(governate._id)
        return newSet
      })
      getAreasByGovernate(governate._id)
    }
  }

  const handleAreaSelect = (governate, area) => {
    setSelectedGovernate(governate.governateName)
    setSelectedGovernateId(governate._id)
    setSelectedArea(area.areaName)
    setSelectedAreaId(area._id)
    setExpandedGovernateId(null)
    setManuallyExpanded(prev => {
      const newSet = new Set(prev)
      newSet.delete(governate._id)
      return newSet
    })
  }

  const handleStartOrdering = () => {
    if (selectedArea || selectedGovernate) {
      localStorage.setItem(
        `selectedLocation_${brandId}`,
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

  // Determine if areas should be shown for a governate
  const shouldShowAreas = gov => {
    const hasSearchMatches =
      searchQuery && gov.filteredAreas && gov.filteredAreas.length > 0
    const isManuallyExpanded = manuallyExpanded.has(gov._id)

    return (
      isManuallyExpanded ||
      hasSearchMatches ||
      (!searchQuery && expandedGovernateId === gov._id)
    )
  }

  return (
    <div className='flex flex-col md:flex-row h-screen overflow-hidden'>
      {/* Left Panel */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0 sticky top-0 bg-white z-10'>
          <div className='flex items-center'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* Method Selection */}
          <div className='space-y-6  border-gray-200'>
            <h2 className='font-medium text-gray-700 bg-gray-100 px-6 py-3 border-b border-gray-200'>
              Method
            </h2>
            <div className='px-5 pb-6 border-b border-gray-200'>
              <div className='flex space-x-4'>
                {managementStatus.deliveryStatus && (
                  <button
                    onClick={() => handleMethodChange('delivery')}
                    className={`w-20 h-20 rounded-md font-medium text-base transition-all flex flex-col items-center justify-center border ${
                      selectedMethod === 'delivery'
                        ? 'text-red-600 border-red-600'
                        : `text-gray-700 border-gray-300 hover:bg-[#AF0303] hover:border-red-600`
                    }`}
                  >
                    <FaCarSide className='w-5 h-5' />
                    Delivery
                  </button>
                )}

                {managementStatus.pickupStatus && (
                  <button
                    onClick={() => handleMethodChange('pickup')}
                    className={`w-20 h-20 rounded-md font-medium text-base transition-all flex flex-col items-center justify-center border ${
                      selectedMethod === 'pickup'
                        ? 'text-red-600 border-red-600'
                        : `text-gray-700 border-gray-300 hover:text-red-600 hover:border-red-600`
                    }`}
                  >
                    <FaWalking className='w-5 h-5' />
                    Pickup
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Governate / Area Selection */}
          <div className='pb-6'>
            <div className='flex items-center bg-gray-100 space-x-2 mb-3 border-b border-gray-300 py-4 px-6 w-full'>
              <span className='text-gray-700 font-medium'>
                {selectedMethod === 'delivery' ? 'Location' : 'Choose a store'}
              </span>
            </div>

            {/* 🔍 Search Bar */}
            <div className='pb-6'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-6 py-3 border-b border-gray-200 outline-none focus:border-red-500 transition-colors'
                />
              </div>
            </div>

            {/* List Governates */}
            <div className='space-y-2'>
              {filteredGovernates.length > 0 ? (
                filteredGovernates.map(gov => {
                  const isExpanded = manuallyExpanded.has(gov._id)
                  const showAreas = shouldShowAreas(gov)

                  return (
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
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {showAreas && (
                        <div className='px-4 py-2 space-y-2'>
                          {gov.filteredAreas?.length > 0 ? (
                            gov.filteredAreas.map(area => (
                              <button
                                key={area._id}
                                onClick={() => handleAreaSelect(gov, area)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                                  selectedAreaId === area._id
                                    ? 'bg-[#FA0303] hover:bg-[#AF0202] text-white font-semibold'
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
                  )
                })
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
                ? `bg-[#FA0303] hover:bg-[#AF0202]`
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedArea || selectedGovernate
              ? 'Done'
              : 'Select your location'}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default HeroSection
