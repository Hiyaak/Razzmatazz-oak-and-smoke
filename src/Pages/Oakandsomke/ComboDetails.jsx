import React from 'react'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ImagePath } from '../../Services/Apiservice'
import { useCart } from '../../Context/CartContext'

const ComboDetails = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()
  const { cart, addToCart, updateQuantity } = useCart()
  const combo = location.state?.combo

  const cartItem = cart.find(item => item.cartItemId === `combo-${combo?._id}`)

  const quantity = cartItem ? cartItem.quantity : 0

  const brandId = localStorage.getItem('brandId')

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )

  console.log('combo:', combo)

  const handleReviewOrder = () => {
    navigate('/shoopingcart')
  }
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate(-1)}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              {combo?.comboName?.toUpperCase()}
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
          {/* combo Image */}
          <div className='w-full h-96'>
            <img
              src={`${ImagePath}${combo?.comboImage}`}
              alt={combo?.comboName}
              className='w-full h-full object-cover'
            />
          </div>
          {/* Product Info Section */}
          <div className=''>
            {/* Name + Quantity Row */}
            <div className='flex items-center justify-between'>
              {/* Left Side - Name & Price */}
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {combo?.comboName}
                </h2>

                <p className='text-red-600 font-medium mt-1'>
                  {combo?.price} {t('ShoopingCart.KD')}
                </p>
              </div>

              {/* Right Side - Quantity Control */}
              {quantity === 0 ? (
                <button
                  onClick={() =>
                    addToCart({
                      cartItemId: `combo-${combo._id}`,
                      _id: combo._id,
                      brandId: combo.brandId,
                      type: 'combo',
                      name: combo.comboName,
                      price: combo.price,
                      image: combo.comboImage
                    })
                  }
                  className='px-4 py-1 border border-red-600 text-red-600 rounded-full font-semibold mr-4'
                >
                  + {t('ShoopingCart.Add')}
                </button>
              ) : (
                <div className='flex items-center border rounded-full overflow-hidden mr-4'>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem.cartItemId, quantity - 1)
                    }
                    className='px-3 py-1 text-red-600 font-bold'
                  >
                    -
                  </button>

                  <span className='px-4 py-1'>{quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(cartItem.cartItemId, quantity + 1)
                    }
                    className='px-3 py-1 text-red-600 font-bold'
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className='border-b border-gray-200'>
              {/* Heading */}
              <div className='bg-gray-100 p-4'>
                <h2 className='text-base font-semibold text-gray-800'>
                  {t('PlaceOrder.Description')}
                </h2>
              </div>

              {/* Content */}
              <div className='p-4 space-y-3'>
                {/* API Description */}
                <p className='text-sm whitespace-pre-line'>
                  {combo?.description}
                </p>
              </div>
            </div>
          </div>

          {!(selectedMethod && (selectedArea || selectedGovernate)) ? (
            // Location not selected — show "Select your location"
            <div className='p-3 bg-white flex-shrink-0'>
              <button
                onClick={() => navigate('/pickupdeviler')}
                className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-semibold py-3 rounded-lg transition-colors'
              >
                {t('brand.Selectlocation')}
              </button>
            </div>
          ) : (
            // Location selected — show "Review Order"
            <div
              className='p-3 bg-white flex-shrink-0'
              onClick={handleReviewOrder}
            >
              <button className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-between px-6'>
                {/* Left - Items Count */}
                <div className='flex items-center'>
                  <span className='bg-white/20 rounded-sm w-6 h-6 flex items-center justify-center text-sm'>
                    {cart.length}
                  </span>
                </div>

                {/* Center - Review Order Text */}
                <span>{t('ShoopingCart.Review Order')}</span>

                {/* Right - Total Price */}
                <span>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(3)}{' '}
                  {t('ShoopingCart.KD')}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default ComboDetails
