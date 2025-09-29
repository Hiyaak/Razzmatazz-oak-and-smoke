import React, { useEffect, useState } from 'react'
import heroImage from '../../assets/concept.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ApiService, { ImagePath } from '../../Services/Apiservice'

const Subproducts = () => {
  const { name } = useParams()
  const navigate = useNavigate()

  const [subProductCategories, setSubProductCategories] = useState([])

  const getsubProductCategories = async () => {
    try {
      const { data } = await ApiService.get(
        `getAllSubProductByBrandName/Oak and Smoke`
      )
      if (data.status) {
        setSubProductCategories(data.subproducts)
        console.log('products:', data.subproducts)
      }
    } catch (error) {
      console.log('error ')
    }
  }

  useEffect(() => {
    getsubProductCategories()
  }, [])

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 min-h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-1'>
            {/* Back button */}
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            {/* Title */}
            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              {decodeURIComponent(name)}
            </h1>

            {/* Spacer */}
            <div className='w-9' />
          </div>
        </div>
        {/*sub products */}
        <div className='flex-1 px-4 space-y-4 mt-8'>
          <div className='grid grid-cols-2 gap-4 cursor-pointer'>
            {subProductCategories.map(item => (
              <div
                key={item._id}
                className='relative rounded-md overflow-hidden p-4 flex flex-col'
              >
                {/* Image */}
                <img
                  src={`${ImagePath}${item.image}`}
                  alt={item.name}
                  className='w-full h-48 object-cover rounded-md mb-4'
                />

                {/* Name & Price */}
                <div className='flex justify-between items-center mb-2'>
                  <h2 className='text-lg font-semibold'>{item.name}</h2>
                  <span className='text-red-500 font-bold'>
                    {item.price} KD
                  </span>
                </div>

                {/* Description */}
                <p className='text-gray-600 text-sm mb-4'>{item.description}</p>

                {/* Add to Cart Button */}
                <button className='border border-red-500 text-red-500 py-1 px-4 rounded hover:bg-red-50 transition'>
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* review order */}
        <div className='p-3'>
          <button className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors'>
            Review Order
          </button>
        </div>
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

export default Subproducts
