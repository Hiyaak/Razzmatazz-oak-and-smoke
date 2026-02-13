import { ArrowLeft, Minus, Plus } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { useCart } from '../../Context/CartContext'
import ApiService, { ImagePath } from '../../Services/Apiservice'

const Combo = () => {
  const navigate = useNavigate()
  const { cart, addToCart, updateQuantity } = useCart()
  const brandId = localStorage.getItem('brandId')
  const [combos, setCombos] = useState([])
  const [allSubProducts, setAllSubProducts] = useState([])

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )

  const getComboCategories = async () => {
    const response = await ApiService.get('getFixedComboForUser/Oak and Smoke')
    console.log('Combo Categories:', response.data.fixedCombos)
    setCombos(response.data.fixedCombos)
  }

  useEffect(() => {
    getComboCategories()
  }, [])

  useEffect(() => {
    fetchSubProducts()
  }, [])

  const fetchSubProducts = async () => {
    try {
      const brandName = sessionStorage.getItem('brandName')
      const response = await fetch(API_URL + `getByBrandName/${brandName}`)
      const result = await response.json()

      let list = []

      result.products.forEach(product => {
        product.subproducts.forEach(sub => {
          list.push({
            ...sub,
            productName: product.productName
          })
        })
      })

      setAllSubProducts(list)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleSubProduct = id => {
    setComboDetails(prev => {
      const exists = prev.subproductIds.includes(id)

      return {
        ...prev,
        subproductIds: exists
          ? prev.subproductIds.filter(x => x !== id)
          : [...prev.subproductIds, id]
      }
    })
  }

  const handleReviewOrder = () => {
    navigate('/shoopingcart')
  }

  const getComboQuantity = comboId => {
    const cartItem = cart.find(item => item.cartItemId === `combo-${comboId}`)
    return cartItem ? cartItem.quantity : 0
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
              COMBOS
            </h1>

            <div className='w-9' />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <div className='grid grid-cols-2 gap-4 mt-6 pb-4'>
            {combos.map(combo => {
              const quantity = getComboQuantity(combo._id)

              return (
                <div
                  key={combo._id}
                  className='relative overflow-hidden p-4 flex flex-col h-full '
                >
                  <div className='w-full h-56 mb-2 rounded-sm overflow-hidden'>
                    {combo.comboImage && (
                      <img
                        src={`${ImagePath}${combo.comboImage}`}
                        alt={combo.comboName}
                        className='w-full h-full object-cover'
                      />
                    )}
                  </div>

                  {/* Combo Name */}
                  <h2 className='text-lg font-semibold mb-1'>
                    {combo.comboName}
                  </h2>

                  {/* Description */}
                  <p className='text-gray-600 text-sm mb-2 line-clamp-2 flex-1'>
                    {combo.description}
                  </p>

                  {/* Price */}
                  <div className='text-[#FA0303] font-bold text-right mb-3'>
                    {combo.price} KD
                  </div>

                  {/* Add / Quantity */}
                  {quantity === 0 ? (
                    <button
                      onClick={() =>
                        addToCart({
                          cartItemId: `combo-${combo._id}`,
                          _id: combo._id,
                          type: 'combo',
                          name: combo.comboName,
                          price: combo.price,
                          image: combo.subproductIds?.[0]?.image,
                          items: combo.subproductIds
                        })
                      }
                      className='border border-[#FA0303] text-[#FA0303] px-4 rounded hover:bg-red-50 transition-colors font-medium w-full'
                    >
                      + Add Combo
                    </button>
                  ) : (
                    <div className='flex items-center justify-between rounded-md px-2 py-1'>
                      <button
                        onClick={() =>
                          updateQuantity(`combo-${combo._id}`, quantity - 1)
                        }
                        className='w-4 h-4 flex items-center justify-center bg-white text-[#FA0303] border-2 border-[#FA0303] rounded-full hover:bg-red-50'
                      >
                        −
                      </button>

                      <span className='px-3 py-0.5 text-center font-medium text-red-500 text-sm'>
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(`combo-${combo._id}`, quantity + 1)
                        }
                        className='w-4 h-4 flex items-center justify-center bg-white text-[#FA0303] border-2 border-[#FA0303] rounded-full hover:bg-red-50'
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Section */}
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
              <span>Review Order</span>

              {/* Right - Total Price */}
              <span>
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(3)}{' '}
                KD
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default Combo
