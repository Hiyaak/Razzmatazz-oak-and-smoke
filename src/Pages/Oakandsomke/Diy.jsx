import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import { useEffect, useState } from 'react'
import { useCart } from '../../Context/CartContext'

const Diy = () => {
  const navigate = useNavigate()
  const [subProducts, setSubProducts] = useState([])
  const { cart, addToCart, updateQuantity } = useCart()
  const brandId = localStorage.getItem('brandId')

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )

  const getAllSubProducts = async () => {
    try {
      const response = await ApiService.get(
        'getAllSubProductByBrandName/Oak and Smoke'
      )

      const data = response.data

      if (data.status) {
        setSubProducts(data.subproducts)
      } else {
        setSubProducts([])
        console.log('No subproducts found')
      }
    } catch (error) {
      console.log('Error fetching subproducts:', error)
      setSubProducts([])
    }
  }

  useEffect(() => {
    getAllSubProducts()
  }, [])

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              DIY
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Subproducts - Scrollable */}
        <div className='flex-1 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <div className='grid grid-cols-2 gap-4 cursor-pointer mt-8 pb-4'>
            {subProducts.map(item => (
              <div
                key={item._id}
                className='relative rounded-md overflow-hidden p-4 flex flex-col h-full'
              >
                {/* Image */}
                <div className='w-full h-56 mb-2 overflow-hidden rounded-sm relative'>
                  <img
                    src={`${ImagePath}${item.image}`}
                    alt={item.name}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Name */}
                <h2 className='text-lg font-semibold mb-3'>{item.name}</h2>

                {/* Description - Added flex-1 here */}
                <p className='text-gray-600 text-sm mb-2 line-clamp-2 flex-1'>
                  {item.description}
                </p>

                {/* Price moved here (just above Add button) */}
                <div className='text-[#FA0303] font-bold text-right mb-3'>
                  {item.price} KD
                </div>

                <button className='border border-[#FA0303] text-[#FA0303] px-4 rounded hover:bg-red-50 transition-colors font-medium w-full'>
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {!(selectedMethod && (selectedArea || selectedGovernate)) ? (
          // Location not selected — show "Select your location"
          <div className='p-3 bg-white flex-shrink-0'>
            <button
              onClick={() => navigate('/pickupdeviler')}
              className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-semibold py-3 rounded-lg transition-colors'
            >
              Select your location
            </button>
          </div>
        ) : (
          // Location selected — show "Review Order"
          <div className='p-3 bg-white flex-shrink-0'>
            <button className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-between px-6'>
              {/* Left - Items Count */}
              <div className='flex items-center'>
                <span className='bg-white/20 rounded-sm w-6 h-6 flex items-center justify-center text-sm'>
                  {cart.length}
                </span>
              </div>
              {/* Center - Review Order Text */}
              <span>Review Order</span>

              {/* Right - Total Price */}
              <span>KD</span>
            </button>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <RightPanelLayout />
    </div>
  )
}

export default Diy
