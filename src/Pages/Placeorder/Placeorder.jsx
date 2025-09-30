import { useNavigate } from 'react-router-dom'
import heroImage from '../../assets/concept.jpg'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '../../Context/CartContext'

const Placeorder = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart } = useCart()

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
          <button className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors text-center'>
            Place Order
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

export default Placeorder
