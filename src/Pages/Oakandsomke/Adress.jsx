import React, { useState } from 'react'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { ArrowLeft, CarFront } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  FaCarSide,
  FaWalking,
  FaHome,
  FaBuilding,
  FaBriefcase
} from 'react-icons/fa'

const Adress = () => {
  const [selectedType, setSelectedType] = useState('Home')
  const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar  */}
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
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* Method Section */}
          <div>
            <div className='bg-gray-100 p-4 border-b'>
              <h2 className='text-base font-semibold text-gray-800'>Method</h2>
            </div>

            {/* White Box Container */}
            <div className='bg-white p-5 border-gray-300'>
              <div className='flex justify-center gap-24'>
                <button className='flex items-center gap-3 px-6 py-2 rounded-sm font-medium transition-all duration-200 bg-white text-[#FA0303] border border-[#FA0303] hover:bg-red-50'>
                  <FaCarSide className='w-5 h-5' />
                  Delivery
                </button>
                <button className='flex items-center gap-3 px-6 py-2 rounded-sm font-medium transition-all duration-200 bg-white text-[#FA0303] border border-[#FA0303] hover:bg-red-50'>
                  <FaWalking className='w-5 h-5' />
                  Pickup
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Area & Location section*/}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Delivery Area & Location
              </h2>
            </div>

            {/* White Box Container */}
            <div className='bg-white p-5 border-gray-300'>
              <div className='flex items-center'></div>
            </div>
          </div>

          {/* Address Details */}
          <div>
            <div className='bg-gray-100 p-4 border-b'>
              <h2 className='text-base font-semibold text-gray-800'>
                Address Details
              </h2>
            </div>

            {/* White Box Container */}
            <div className='bg-white p-5 border-gray-300'>
              {/* Buttons */}
              <div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10 px-4'>
                <button
                  onClick={() => setSelectedType('Home')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-sm font-medium transition-all duration-200 ${
                    selectedType === 'Home'
                      ? 'bg-[#FA0303] text-white border border-[#FA0303]'
                      : 'bg-white text-gray-700 border border-gray-400 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaHome className='w-5 h-5' />
                  Home
                </button>
                <button
                  onClick={() => setSelectedType('Apartment')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-sm font-medium transition-all duration-200 ${
                    selectedType === 'Apartment'
                      ? 'bg-[#FA0303] text-white border border-[#FA0303]'
                      : 'bg-white text-gray-700 border border-gray-400 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaBuilding className='w-5 h-5' />
                  Apartment
                </button>

                <button
                  onClick={() => setSelectedType('Office')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-sm font-medium transition-all duration-200 ${
                    selectedType === 'Office'
                      ? 'bg-[#FA0303] text-white border border-[#FA0303]'
                      : 'bg-white text-gray-700 border border-gray-400 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaBriefcase className='w-5 h-5' />
                  Office
                </button>
              </div>

              {/* Input Fields */}
              <div className='space-y-8'>
                <input
                  type='text'
                  placeholder='Block *'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                />

                <input
                  type='text'
                  placeholder='Street *'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                />

                {/* Home specific field */}
                {selectedType === 'Home' && (
                  <input
                    type='text'
                    placeholder='House # *'
                    className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                  />
                )}

                {/* Apartment specific fields */}
                {selectedType === 'Apartment' && (
                  <>
                    <input
                      type='text'
                      placeholder='Floor *'
                      className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                    />
                    <input
                      type='text'
                      placeholder='Building Name *'
                      className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                    />
                    <input
                      type='text'
                      placeholder='Apartment # *'
                      className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                    />
                  </>
                )}

                {/* Office specific fields */}
                {selectedType === 'Office' && (
                  <>
                    <input
                      type='text'
                      placeholder='Floor *'
                      className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                    />
                    <input
                      type='text'
                      placeholder='Building Name *'
                      className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                    />
                    <input
                      type='text'
                      placeholder='Office # *'
                      className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                    />
                  </>
                )}

                {/* Common fields */}
                <input
                  type='text'
                  placeholder='Avenue'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                />
                <input
                  type='text'
                  placeholder='PACI'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                />
                <input
                  type='text'
                  placeholder='Additional'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-md pb-1'
                />
              </div>
            </div>
          </div>
        </div>
        {/* Fixed at Bottom  */}
        <div className='p-3 border-t border-gray-200 bg-white flex-shrink-0'>
          <button className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white py-3 rounded-lg transition-colors'>
            Next
          </button>
        </div>
      </div>

      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default Adress
