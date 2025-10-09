import { useNavigate } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'
import { ArrowLeft, Menu, Search, User, ShoppingBag } from 'lucide-react'

import { useCart } from '../../Context/CartContext'
import ApiService from '../../Services/Apiservice'

const Placeorder = () => {
  const navigate = useNavigate()
  const { cart } = useCart()

  const handleMenuClick = () => {
    navigate('/menu')
  }

  const handleshoopingcartClick = () => {
    navigate('/shoopingcart')
  }

  const handeleSearch = () => {
    navigate('/search')
  }

  const handlePlaceOrder = async () => {
    try {
      // Get user ID (guest or registered)
      const userId =
        localStorage.getItem('guestUserId') ||
        localStorage.getItem('registredUserId')

      // Get location details from localStorage
      const { selectedMethod, selectedGovernateId, selectedAreaId } =
        JSON.parse(localStorage.getItem('selectedLocation') || '{}')

      // Build payload
      const payload = {
        user_id: userId,
        products: cart.map(item => ({
          subproduct_id: item._id,
          subProduct_img: item.image,
          subProduct_name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description || ''
        })),

        deliveryType: selectedMethod || '',
        governateId: selectedGovernateId || '',
        areaId: selectedAreaId || ''
      }

      const { data } = await ApiService.post('placeOrder', payload)

      if (data.status) {
        console.log('Order placed successfully — Server Response:', data)
        alert('Order placed successfully!')
        navigate('/myorders')
      } else {
        alert('Failed to place order.')
      }
    } catch (error) {
      console.error('❌ Error in placing order:', error)
    }
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 min-h-screen border-r border-gray-200 flex flex-col relative bg-white'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div className='w-9' />
          </div>
        </div>

        {/* Cart Items */}
        <div className='flex-1 overflow-y-auto p-3 space-y-2'>
          {/* Items Heading */}
          <div className='bg-gray-100 border border-gray-300 rounded px-3 py-2 font-semibold text-gray-700'>
            Items
          </div>

          {cart.length === 0 ? (
            <p className='text-gray-500 text-center py-4'>No items in cart</p>
          ) : (
            cart.map(item => (
              <div
                key={item._id}
                className='grid grid-cols-3 items-center border-b border-gray-200 px-2 py-2 last:border-b-0'
              >
                {/* Quantity */}
                <div className='text-left font-semibold'>{item.quantity}x</div>

                {/* Name */}
                <div className='text-center text-gray-800'>{item.name}</div>

                {/* Price */}
                <div className='text-right text-red-500 font-semibold'>
                  {(item.price * item.quantity).toFixed(3)} KD
                </div>
              </div>
            ))
          )}
        </div>

        {/* Fixed bottom section */}
        <div className='absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white p-3 space-y-2'>
          {/* Total Amount */}
          <div className='flex justify-between items-center text-gray-800 font-semibold text-lg'>
            <span>Total</span>
            <span>
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(3)}{' '}
              KD
            </span>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors text-center'
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className='flex-1 relative bg-black'>
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
                onClick={handleshoopingcartClick}
                className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'
              >
                <ShoppingBag className='w-6 h-6' />
              </button>
              <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'>
                <Search onClick={handeleSearch} className='w-6 h-6' />
              </button>
              <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all'>
                <User className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section — hidden on mobile */}
        <div className='hidden md:block relative h-screen'>
          <img
            src={heroImage}
            alt='Hero Food'
            className='w-full h-full object-cover'
          />

          {/* Bottom IG button */}
          <div className='absolute bottom-8 left-8 z-20'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm'>
              IG
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Placeorder
