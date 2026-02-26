import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, PenLine } from 'lucide-react'
import { useCart } from '../../Context/CartContext'
import ApiService from '../../Services/Apiservice'
import { toast } from 'react-toastify'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { useEffect, useState } from 'react'
import { LuContact } from 'react-icons/lu'
import { FaBuilding } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

const Placeorder = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { cart } = useCart()
  const isCatering = cart.some(item => item.orderType === 'catering')

  console.log('Cart in Placeorder:', cart)

  const location = useLocation()

  const specialRemark = location.state?.specialRemark || ''
  console.log('specialRemark in Placeorder:', specialRemark)

  const [userAdress, setUserAdress] = useState([])
  const [deliveryCharges, setDeliveryCharges] = useState(0)
  const [profile, setProfile] = useState(null)
  const [carDetails, setCarDetails] = useState({
    make: '',
    color: '',
    plate: ''
  })

  const [coupons, setCoupons] = useState([])
  const [couponInput, setCouponInput] = useState('')
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [loadingCoupons, setLoadingCoupons] = useState(true)
  const [showAllCoupons, setShowAllCoupons] = useState(false)

  const storedBrandId = localStorage.getItem('brandId')
  const guestUserId = sessionStorage.getItem(`guestUserId_${storedBrandId}`)
  const registredUserId = localStorage.getItem(
    `registredUserId_${storedBrandId}`
  )
  const userId = registredUserId || guestUserId

  const { selectedMethod, selectedGovernate, selectedArea, selectedAreaId } =
    JSON.parse(
      localStorage.getItem(`selectedLocation_${storedBrandId}`) || '{}'
    )

  const handleEditProfile = () => {
    navigate('/usercheckout', { state: { profile } })
  }

  const fetchAdress = async () => {
    try {
      const { data } = await ApiService.get(`getAddressesByUser/${userId}`)
      if (data.status) {
        setUserAdress(data.addresses)
      } else {
        toast.error('Failed to load address')
      }
    } catch (error) {
      toast.error('Something went wrong while loading your profile.')
    }
  }

  const fetchProfile = async () => {
    if (!userId) {
      toast.error('User not found. Please log in again.')
      navigate('/profile')
      return
    }
    try {
      const payload = { id: userId }
      const { data } = await ApiService.post('getProfileById', payload)
      if (data.status) {
        setProfile(data.profile)
      } else {
        toast.error(data.message || 'Failed to load profile.')
      }
    } catch (error) {
      toast.error('Something went wrong while loading your profile.')
    }
  }

  const getDeliveryCharges = async () => {
    try {
      const locationData = JSON.parse(
        localStorage.getItem(`selectedLocation_${storedBrandId}`) || '{}'
      )

      const { selectedMethod, selectedAreaId } = locationData

      // Only call API if delivery method selected
      if (selectedMethod === 'delivery' && selectedAreaId) {
        const { data } = await ApiService.get(
          `getDeliveryChargeByArea/${selectedAreaId}`
        )

        if (data.status) {
          setDeliveryCharges(data.deliveryCharge ?? 0)
        } else {
          setDeliveryCharges(0)
        }
      } else {
        setDeliveryCharges(0)
      }
    } catch (error) {
      console.log('Error fetching delivery charge:', error)
      setDeliveryCharges(0)
    }
  }
  const fetchCoupons = async () => {
    try {
      setLoadingCoupons(true)

      const brandName = 'Oak and Smoke'

      const { data } = await ApiService.get(
        `getCouponsByBrandName?brandName=${encodeURIComponent(brandName)}`
      )

      if (data.success) {
        const now = new Date()

        const validCoupons = data.coupons.filter(coupon => {
          if (!coupon.isActive) return false

          if (
            new Date(coupon.validFrom) > now ||
            new Date(coupon.validTo) < now
          ) {
            return false
          }

          return true
        })

        const cartProductIds = cart.map(item => String(item.product_id))

        // Product-specific coupons
        const productCoupons = validCoupons.filter(coupon => {
          if (!coupon.productIds || coupon.productIds.length === 0) return false

          const couponProductIds = coupon.productIds.map(id => String(id))

          return cartProductIds.some(id => couponProductIds.includes(id))
        })

        //  General coupons (productIds empty)
        const generalCoupons = validCoupons.filter(
          coupon => !coupon.productIds || coupon.productIds.length === 0
        )

        //  FINAL DECISION
        if (productCoupons.length > 0) {
          // If product-specific exists → show them only
          setCoupons(productCoupons)
        } else {
          // If no product coupon → show general coupons
          setCoupons(generalCoupons)
        }
      }
    } catch (error) {
      console.log('Coupon fetch error', error)
    } finally {
      setLoadingCoupons(false)
    }
  }

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      toast.error('Please enter coupon code')
      return
    }

    const coupon = coupons.find(
      c => c.code.toLowerCase() === couponInput.toLowerCase()
    )

    if (!coupon) {
      toast.error('Coupon not applicable for this cart')
      return
    }

    setSelectedCoupon(coupon)
    toast.success(`Coupon ${coupon.code} applied`)
  }

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null)
    setCouponInput('')
    toast.success('Coupon removed')
  }

  const handleCarChange = e => {
    const { name, value } = e.target

    setCarDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    fetchAdress()
    fetchProfile()
    getDeliveryCharges()
  }, [])

  useEffect(() => {
    if (cart.length === 0) {
      setCoupons([])
      setSelectedCoupon(null)
      return
    }

    fetchCoupons()
  }, [cart])

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  // const total = subtotal + deliveryCharges

  let discount = 0

  if (selectedCoupon) {
    if (selectedCoupon.discountPercentage) {
      discount = (subtotal * selectedCoupon.discountPercentage) / 100
    } else if (selectedCoupon.flatAmount) {
      discount = selectedCoupon.flatAmount
    }
  }

  const finalTotal = subtotal - discount + (!isCatering ? deliveryCharges : 0)

  const handlePlaceOrder = async () => {
    try {
      const storedBrandId = localStorage.getItem('brandId')
      if (!storedBrandId) return toast.error('No brand selected')

      const userId =
        sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
        localStorage.getItem(`registredUserId_${storedBrandId}`)

      if (!userId) return toast.error('Please login or continue as guest')

      const locationData = JSON.parse(
        localStorage.getItem(`selectedLocation_${storedBrandId}`) || '{}'
      )

      const { selectedMethod, selectedGovernateId, selectedAreaId } =
        locationData

      if (!selectedMethod) return toast.error('Please select delivery type')

      const items = cart
        .map(item => {
          // 🟢 NORMAL PRODUCT
          if (item.type === 'product') {
            return {
              itemType: 'subproduct',
              subproduct_id: item._id,
              quantity: item.quantity
            }
          }

          // 🔵 FIXED COMBO
          if (item.type === 'combo') {
            return {
              itemType: 'fixedCombo',
              fixedComboId: item._id,
              quantity: item.quantity
            }
          }

          // 🟣 DIY
          if (item.type === 'diycombo') {
            if (!item.selectedDate || !item.selectedSlot) {
              toast.error('Please select date & time for DIY item')
              return null
            }

            return {
              itemType: 'diy',
              subproduct_id: item._id,
              quantity: item.quantity,
              diyDate: new Date(item.selectedDate).toISOString().split('T')[0],
              diyTime: item.selectedSlot
            }
          }

          // 🟠 CATERING
          if (item.orderType === 'catering') {
            const formattedSelections = {}

            Object.entries(item.selections || {}).forEach(
              ([categoryId, categoryData]) => {
                const ids = categoryData.items
                  .filter(menu =>
                    menu.isYesNoType ? menu.selectedValue === true : true
                  )
                  .map(menu => menu.id)

                if (ids.length > 0) {
                  formattedSelections[categoryId] = ids
                }
              }
            )

            return {
              itemType: 'catering',
              packageId: item.packageId,
              persons: item.persons,
              selections: formattedSelections,
              eventDate: new Date(item.date).toISOString().split('T')[0],
              eventTime: item.time,
              address: item.address,
              contactPhone: item.contactPhone,
              contactName: item.contactName,
              specialInstructions: item.specialInstructions || ''
            }
          }

          return null
        })
        .filter(Boolean)

      if (!items.length) {
        return toast.error('Cart is empty')
      }

      // =========================================
      // 🔥 BUILD FINAL PAYLOAD (BACKEND FORMAT)
      // =========================================

      const payload = {
        user_id: userId,
        items: items,
        finalTotal: Number(finalTotal),
        deliveryType: selectedMethod,
        branchId: storedBrandId,
        paymentMethod: 'online'
      }

      // 🔹 DELIVERY
      if (selectedMethod === 'delivery') {
        if (!selectedGovernateId || !selectedAreaId) {
          return toast.error('Please select your location')
        }

        payload.governateId = selectedGovernateId
        payload.areaId = selectedAreaId
        payload.deliveryCharge = Number(deliveryCharges)
      }

      // 🔹 PICKUP
      if (selectedMethod === 'pickup') {
        if (
          !carDetails?.model ||
          !carDetails?.color ||
          !carDetails?.plateNumber
        ) {
          return toast.error('Please enter car details')
        }

        payload.pickupDetails = {
          location: 'Main Branch',
          carName: carDetails.model,
          carColor: carDetails.color,
          carPlate: carDetails.plateNumber
        }
      }

      console.log('FINAL PLACE ORDER PAYLOAD:', payload)

      const { data } = await ApiService.post('placeOrder', payload)

      if (data.status) {
        toast.success('Redirecting to payment...')

        if (data.payment_url) {
          window.location.href = data.payment_url
        } else {
          toast.error('Payment URL not received')
        }
      } else {
        toast.error(data.message || 'Order failed.')
      }
    } catch (error) {
      console.log('PLACE ORDER ERROR:', error?.response?.data || error)
      toast.error('Something went wrong while placing your order.')
    }
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col relative'>
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
        <div className='flex-1 overflow-y-auto overflow-x-hidden pb-64 no-scrollbar'>
          {/* Deliver To */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                {selectedMethod === 'pickup'
                  ? t('PlaceOrder.Pickupfrom')
                  : t('PlaceOrder.Deliverto')}
              </h2>
            </div>

            <div className='bg-white p-5 border-gray-300 space-y-4'>
              <div className='flex items-center justify-between'>
                <FaBuilding className='text-gray-500 text-lg' />
                <div className='flex-1 text-center'>
                  <p className='text-gray-700 text-sm'>
                    {selectedArea || 'No address selected'}
                  </p>
                </div>
                <button className='text-gray-600 hover:text-[#FA0303]'>
                  <HiPencil className='text-lg' />
                </button>
              </div>

              <div className='flex items-center justify-between'>
                <LuContact className='text-gray-500 text-xl' />

                <div className='flex-1 flex items-center justify-center gap-3'>
                  <p className='text-gray-600 '>
                    {profile?.name || 'User Name'},
                  </p>

                  <p className='text-gray-900 font-bold'>
                    {profile?.mobileNumber
                      ? `+965 ${profile.mobileNumber}`
                      : 'Mobile Number'}
                  </p>
                </div>

                <button
                  onClick={handleEditProfile}
                  className='text-gray-600 hover:text-[#FA0303]'
                >
                  <HiPencil className='text-lg' />
                </button>
              </div>
            </div>
          </div>

          {selectedMethod === 'pickup' && (
            <>
              <div className='bg-gray-100 p-4'>
                <h2 className='text-gray-700 font-medium'>Car details</h2>
              </div>

              <div className='bg-white p-5 border-b border-gray-300 space-y-4'>
                <input
                  type='text'
                  name='model'
                  value={carDetails.model}
                  onChange={handleCarChange}
                  placeholder='Car Model'
                  className='w-full border-b border-gray-300 outline-none py-2'
                />

                <input
                  type='text'
                  name='color'
                  value={carDetails.color}
                  onChange={handleCarChange}
                  placeholder='Car Color'
                  className='w-full border-b border-gray-300 outline-none py-2'
                />

                <input
                  type='text'
                  name='plateNumber'
                  value={carDetails.plateNumber}
                  onChange={handleCarChange}
                  placeholder='Car Plate number'
                  className='w-full border-b border-gray-300 outline-none py-2'
                />
              </div>
            </>
          )}

          {/* Item List */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                {t('PlaceOrder.Items')}
              </h2>
            </div>

            {cart.length === 0 ? (
              <p className='text-gray-500 text-center py-4'>No items in cart</p>
            ) : (
              cart.map(item => (
                <div
                  key={item._id}
                  className='grid grid-cols-3 items-center border-b border-gray-200 px-4 py-3'
                >
                  <div className='text-left font-semibold'>
                    {item.quantity}x
                  </div>
                  <div className='text-center text-gray-800'>{item.name}</div>
                  <div className='text-right text-red-500 font-semibold'>
                    {(item.price * item.quantity).toFixed(3)}{' '}
                    {t('ShoopingCart.KD')}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Promotions */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                {t('PlaceOrder.Promotions')}
              </h2>
            </div>

            <div className='bg-white p-5 border-gray-300 space-y-4'>
              {/* Coupon Input */}
              <div className='flex items-center gap-3'>
                <input
                  type='text'
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder={t('PlaceOrder.Enter promotion code')}
                  disabled={!!selectedCoupon} // disable when applied
                  className='flex-1 border-b border-gray-300 focus:border-red-500 outline-none text-gray-700 text-sm pb-1 disabled:opacity-60'
                />

                {selectedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className='bg-gray-500 text-white px-4 py-1 rounded text-sm'
                  >
                    {t('PlaceOrder.Remove')}
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className='bg-[#FA0303] text-white px-4 py-1 rounded text-sm'
                  >
                    {t('PlaceOrder.Apply')}
                  </button>
                )}
              </div>

              {/* Available Coupons */}
              {coupons.length > 0 && (
                <div className='space-y-2'>
                  <p className='text-sm font-medium text-gray-700'>
                    {t('PlaceOrder.Available Coupons')}
                  </p>

                  {coupons.map(coupon => (
                    <div
                      key={coupon._id}
                      onClick={() => {
                        setSelectedCoupon(coupon)
                        setCouponInput(coupon.code)
                        toast.success('Coupon applied')
                      }}
                      className='border p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-50'
                    >
                      <div>
                        <p className='font-semibold text-sm'>{coupon.code}</p>
                        <p className='text-xs text-gray-500'>
                          {coupon.discountPercentage > 0 && (
                            <span>
                              {coupon.discountPercentage}% {t('PlaceOrder.OFF')}
                            </span>
                          )}

                          {coupon.discountPercentage > 0 &&
                            coupon.flatAmount > 0 && <span> • </span>}

                          {coupon.flatAmount > 0 && (
                            <span>
                              {coupon.flatAmount} {t('PlaceOrder.KD OFF')}
                            </span>
                          )}
                        </p>
                      </div>

                      <span className='text-green-600 text-sm'>
                        {t('PlaceOrder.Apply')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Summary + Place Order */}
        <div className='absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white p-4 space-y-2 shadow-lg'>
          <div className='flex justify-between text-gray-800'>
            <span>{t('PlaceOrder.Subtotal')}</span>
            <span>
              {subtotal.toFixed(3)} {t('ShoopingCart.KD')}
            </span>
          </div>

          {!isCatering && (
            <div className='flex justify-between text-gray-800'>
              <span>{t('PlaceOrder.Delivery Services')}</span>
              <span>
                {deliveryCharges.toFixed(3)} {t('ShoopingCart.KD')}
              </span>
            </div>
          )}

          {selectedCoupon && (
            <div className='flex justify-between text-green-700 font-medium'>
              <span>Coupon ({selectedCoupon.code})</span>
              <span>
                - {discount.toFixed(3)} {t('ShoopingCart.KD')}
              </span>
            </div>
          )}

          <hr className='my-2' />

          <div className='flex justify-between text-gray-900 font-bold text-lg'>
            <span>{t('PlaceOrder.Total')}</span>
            <span>
              {finalTotal.toFixed(3)} {t('ShoopingCart.KD')}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg'
          >
            {t('PlaceOrder.PlaceOrder')}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Placeorder
