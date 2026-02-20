import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import { useEffect, useState } from 'react'
import { useCart } from '../../Context/CartContext'

const Diy = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const brandId = localStorage.getItem('brandId')

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )

  const getProducts = async () => {
    try {
      const response = await ApiService.get(
        'getAllProductByBrandName1/Oak and Smoke'
      )

      const data = response.data
      console.log('response', data)

      if (data.status) {
        setProducts(data.products)
      } else {
        setProducts([])
        console.log('No products found')
      }
    } catch (error) {
      console.log('Error fetching products:', error)
      setProducts([])
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const handleProduct = (productId, productName) => {
    navigate(
      `/diyproducts/${encodeURIComponent(productName)}?productId=${productId}`
    )
  }

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
        <div className='flex-1 overflow-y-auto px-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <div className='grid grid-cols-2 gap-2 cursor-pointer mt-8 pb-4'>
            {products.map(item => (
              <div
                key={item._id}
                className='relative rounded-lg overflow-hidden shadow'
                 onClick={() => handleProduct(item._id, item.productName)}
              >
                <img
                  src={`${ImagePath}${item.product_img?.[0]}`}
                  alt={item.productName}
                  className='w-full h-60 object-cover'
                />

                <div className='absolute inset-0 bg-black/25 flex items-center justify-center'>
                  <h3 className='text-gray-100 font-bold text-lg text-center'>
                    {item.productName?.toUpperCase()}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Button at Bottom */}
        {!(selectedMethod && (selectedArea || selectedGovernate)) && (
          <div className='p-2 border-t border-gray-200 bg-white flex-shrink-0'>
            <button
              onClick={() => navigate('/pickupdeviler')}
              className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white py-3 rounded-lg transition-colors'
            >
              Select your location
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
