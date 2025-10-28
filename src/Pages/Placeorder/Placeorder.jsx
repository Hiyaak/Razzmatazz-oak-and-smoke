import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Menu, PenLine } from 'lucide-react'
import { useCart } from '../../Context/CartContext'
import ApiService from '../../Services/Apiservice'
import { toast } from 'react-toastify'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { useEffect, useState } from 'react'
import { LuContact } from 'react-icons/lu'
import { FaBuilding } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'

const Placeorder = () => {
  const navigate = useNavigate()
  const { cart } = useCart()
  const [userAdress, setUserAdress] = useState([])
  const [profile, setProfile] = useState(null)

  const storedBrandId = localStorage.getItem('brandId')
  const registredUserId = localStorage.getItem(
    `registredUserId_${storedBrandId}`
  )

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${storedBrandId}`) || '{}'
  )

  console.log('Selected Area:', selectedArea)

  const handleEditProfile = () => {
    navigate('/usercheckout', { state: { profile } })
  }

  const fetchAdress = async () => {
    try {
      const { data } = await ApiService.get(
        `getAddressesByUser/${registredUserId}`
      )
      if (data.status) {
        setUserAdress(data.addresses)
        console.log('adress API response:', data.addresses)
      } else {
        toast.error('Failed to load adress')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Something went wrong while loading your profile.')
    }
  }

  const fetchProfile = async () => {
    if (!registredUserId) {
      toast.error('User not found. Please log in again.')
      navigate('/profile')
      return
    }
    try {
      const payload = { id: registredUserId }
      const { data } = await ApiService.post('getProfileById', payload)
      if (data.status) {
        setProfile(data.profile)
      } else {
        toast.error(data.message || 'Failed to load profile.')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Something went wrong while loading your profile.')
    }
  }
  useEffect(() => {
    fetchAdress()
    fetchProfile()
  }, [])

  const handlePlaceOrder = async () => {
    try {
      const storedBrandId = localStorage.getItem('brandId')
      if (!storedBrandId) return toast.error('No brand selected')

      // Get user ID for this brand
      const userId =
        sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
        localStorage.getItem(`registredUserId_${storedBrandId}`)

      if (!userId) return toast.error('Please login or continue as guest')

      // Get location for this brand
      const locationData = JSON.parse(
        localStorage.getItem(`selectedLocation_${storedBrandId}`) || '{}'
      )
      const { selectedMethod, selectedGovernateId, selectedAreaId } =
        locationData

      if (!selectedMethod || !selectedGovernateId || !selectedAreaId)
        return toast.error('Please select your location')

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
        deliveryType: selectedMethod,
        governateId: selectedGovernateId,
        areaId: selectedAreaId
      }

      const { data } = await ApiService.post('placeOrder', payload)

      if (data.status) {
        console.log('Order placed successfully — Server Response:', data)
        toast.success('Order placed successfully!')
        navigate('/myorders')
      } else {
        toast.error('Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Place order error:', error)
      toast.error('Something went wrong while placing your order.')
    }
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

            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* delivery Section */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Deliver to
              </h2>
            </div>

            {/* White Box Container */}
            <div className='bg-white p-5 border-gray-300 space-y-4'>
              {/* Address Row */}
              <div className='flex items-center justify-between'>
                <FaBuilding className='text-gray-500 text-lg flex-shrink-0' />
                <div className='flex-1 text-center'>
                  <p className='text-gray-700 text-sm'>
                    {selectedArea || 'No address selected'}
                  </p>
                </div>
                <button
                  // onClick={handleEditAddress}
                  className='text-gray-600 hover:text-[#FA0303] transition-colors'
                >
                  <HiPencil className='text-lg' />
                </button>
              </div>

              {/* Profile Row */}
              <div className='flex items-center justify-between'>
                <LuContact className='text-gray-500 text-xl flex-shrink-0' />
                <div className='flex-1 text-center'>
                  <p className='text-gray-800 font-medium'>
                    {profile?.firstName || 'Guest User'}
                    {profile?.mobileNumber
                      ? `, +965 ${profile.mobileNumber}`
                      : ''}
                  </p>
                </div>
                <button
                  onClick={handleEditProfile}
                  className='text-gray-600 hover:text-[#FA0303] transition-colors'
                >
                  <HiPencil className='text-lg' />
                </button>
              </div>
            </div>
          </div>

          {/* items Section */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>items</h2>
            </div>
            {cart.length === 0 ? (
              <p className='text-gray-500 text-center py-4'>No items in cart</p>
            ) : (
              cart.map(item => (
                <div
                  key={item._id}
                  className='grid grid-cols-3 items-center border-b border-gray-200 px-4 py-2 last:border-b-0'
                >
                  {/* Quantity */}
                  <div className='text-left font-semibold'>
                    {item.quantity}x
                  </div>

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

          {/* Promotions Section */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Promotions
              </h2>
            </div>

            {/* White Box Container */}
            <div className='bg-white p-5 border-gray-300'>
              <div className='flex items-center'>
                {/* Tag Icon */}
                <PenLine className='w-5 h-5 text-gray-500 mr-3' />

                {/* Input Field */}
                <input
                  type='text'
                  placeholder='Enter promotion code'
                  className='w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1'
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'>
                Payment Method{' '}
              </h2>
            </div>
            <div className='bg-white p-5 border-gray-300'>
              <div className='flex items-center'></div>
            </div>
          </div>

          {/* <div>
            <div className='bg-gray-100 p-4'>
              <h2 className='text-base font-semibold text-gray-800'></h2>
            </div>
          </div> */}
        </div>

        {/* Fixed bottom section */}
        <div className='fixed bottom-0 left-0 md:w-2/5 w-full border-t border-gray-200 bg-white p-3 space-y-2'>
          <div className='flex justify-between items-center text-gray-800 font-semibold text-lg'>
            <span>Total</span>
            <span>
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(3)}{' '}
              KD
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors text-center'
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Placeorder
