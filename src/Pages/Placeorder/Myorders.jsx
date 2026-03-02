import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { toast } from 'react-toastify'
import { useCart } from '../../Context/CartContext'
import { useTranslation } from 'react-i18next'

const Myorders = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { clearCart } = useCart()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)
  const [refundingId, setRefundingId] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [rating, setRating] = useState('')
  const [feedback, setFeedback] = useState('')

  // ✅ Verify Payment
  const verifyPayment = async tapId => {
    try {
      const { data } = await ApiService.post('getPaymentData', {
        payment_id: tapId
      })

      if (data.status) {
        setPaymentStatus(data.payment_status)

        if (data.payment_status === 'CAPTURED') {
          toast.success('Payment Successful')
          clearCart()
        } else {
          toast.error('Payment Failed')
        }

        await getOrders()

        window.history.replaceState(
          {},
          document.title,
          window.location.origin +
            window.location.pathname +
            window.location.hash
        )
      } else {
        toast.error('Payment verification failed')
        setLoading(false)
      }
    } catch (error) {
      console.log('Payment verification error:', error)
      toast.error('Error verifying payment')
      setLoading(false)
    }
  }

  // ✅ Fetch Orders
  const getOrders = async () => {
    try {
      const storedBrandId = localStorage.getItem('brandId')

      if (!storedBrandId) {
        setLoading(false)
        return
      }

      const userId =
        sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
        localStorage.getItem(`registredUserId_${storedBrandId}`)

      if (!userId) {
        setLoading(false)
        return
      }

      const { data } = await ApiService.get(`getOrdersByUserId/${userId}`)

      if (data.status) {
        const sanitizedOrders = Array.isArray(data.orders)
          ? data.orders.map(order => ({
              ...order,

              // ✅ normalize totals safely
              finalTotal: order.finalTotal || 0,
              totalAmount: order.totalAmount || 0,
              deliveryCharge: order.deliveryCharge || 0,

              // ✅ IMPORTANT: use items instead of products
              items: Array.isArray(order.items)
                ? order.items.map(item => ({
                    ...item,
                    quantity: item.quantity || 0,
                    price: item.price || 0,
                    image: item.image || null,
                    name: item.name || ''
                  }))
                : []
            }))
          : []

        setOrders(sanitizedOrders)
      } else {
        setOrders([])
      }
    } catch (error) {
      console.log('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const tapId = queryParams.get('tap_id')

    if (tapId) {
      verifyPayment(tapId)
    } else {
      getOrders()
    }
  }, [])

  useEffect(() => {
    if (paymentStatus) {
      const timer = setTimeout(() => {
        setPaymentStatus(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [paymentStatus])

  const formatPrice = price => {
    const num = Number(price)
    return isNaN(num) ? '0.000' : num.toFixed(3)
  }

  const handleSubmitFeedback = async () => {
    try {
      if (!rating) {
        toast.error('Please select rating')
        return
      }

      const storedBrandId = localStorage.getItem('brandId')

      const userId =
        sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
        localStorage.getItem(`registredUserId_${storedBrandId}`)

      if (!userId) {
        toast.error('User not found')
        return
      }

      const payload = {
        userId: userId,
        orderId: selectedOrderId,
        name: 'Customer', // you can replace with actual user name
        comment: feedback,
        rating: Number(rating)
      }

      const { data } = await ApiService.post('createOrderFeedback', payload)

      if (data.status) {
        toast.success('Feedback submitted successfully')

        localStorage.setItem(`feedback_${selectedOrderId}`, 'true')

        setShowFeedback(false)
        setRating('')
        setFeedback('')
      } else {
        toast.error('Failed to submit feedback')
      }
    } catch (error) {
      console.log('Feedback error:', error)
      toast.error('Something went wrong')
    }
  }

  // const checkFeedbackExists = async orderId => {
  //   try {
  //     const { data } = await ApiService.get(`getFeedbacksByOrder/${orderId}`)

  //     return data.status && data.feedback?.length > 0
  //   } catch (error) {
  //     console.log('Check feedback error:', error)
  //     return false
  //   }
  // }

  // ✅ Cancel Order
  const cancelOrder = async orderId => {
    try {
      const storedBrandId = localStorage.getItem('brandId')

      const userId =
        sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
        localStorage.getItem(`registredUserId_${storedBrandId}`)

      if (!userId) {
        toast.error('User not found')
        return
      }

      const reason = prompt('Please enter reason for cancellation')

      if (!reason) return

      setCancellingId(orderId)

      const response = await ApiService.post('cancelOrder', {
        order_id: orderId,
        user_id: userId,
        reason: reason
      })

      const result = response.data

      if (result.status) {
        toast.success('Order cancelled successfully')
        getOrders()
      } else {
        toast.error(result.message || 'Failed to cancel order')
      }
    } catch (error) {
      console.error('Cancel order error:', error)
      toast.error('Something went wrong')
    } finally {
      setCancellingId(null)
    }
  }

  // ✅ Request Refund
  const requestRefund = async orderId => {
    try {
      const storedBrandId = localStorage.getItem('brandId')

      const userId =
        sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
        localStorage.getItem(`registredUserId_${storedBrandId}`)

      if (!userId) {
        toast.error('User not found')
        return
      }

      setRefundingId(orderId)

      const payload = {
        order_id: orderId,
        user_id: userId
      }

      const { data } = await ApiService.post('order/request-refund', payload)

      if (data?.status) {
        // ✅ Show backend message
        toast.success(data.message)

        // ✅ Update order locally (no need to refetch)
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId
              ? { ...order, status: 'Refund Requested' }
              : order
          )
        )
      } else {
        toast.error(data?.message || 'Something went wrong')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setRefundingId(null)
    }
  }

  // ✅ Loading Screen
  if (loading) {
    return (
      <div className='flex flex-col md:flex-row min-h-screen'>
        <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex items-center justify-center'>
          <p className='text-gray-500'>Loading orders...</p>
        </div>
        <RightPanelLayout />
      </div>
    )
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              {t('MyOrders.MyOrders')}
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Orders */}
        <div className='p-4 flex-1 overflow-y-auto space-y-4'>
          {/* Payment Banner */}
          {paymentStatus && (
            <div
              className={`p-3 text-center font-semibold rounded-md ${
                paymentStatus === 'CAPTURED'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              Payment Status: {paymentStatus}
            </div>
          )}

          {orders.length === 0 ? (
            <p className='text-gray-500 text-center'>
              {t('MyOrders.NoOrders')}
            </p>
          ) : (
            orders.map(order => {
              // ✅ catering uses totalAmount
              const totalPrice =
                order.totalAmount || order.finalTotal || order.totalPrice

              return (
                <div
                  key={order._id}
                  className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
                >
                  {/* Order Header */}
                  <div className='flex justify-between mb-2'>
                    <span className='font-medium text-gray-900'>
                      {t('MyOrders.Order ID')}: {order._id?.slice(-6)}
                    </span>

                    <span className='text-gray-500 text-sm'>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Products */}
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 border-b pb-2'
                    >
                      {/* ✅ Only show image if exists */}
                      {item.image && (
                        <img
                          src={`${ImagePath}${item.image}`}
                          alt={item.name || 'product'}
                          className='w-12 h-12 rounded-md object-cover'
                        />
                      )}

                      <div className='flex-1'>
                        <p className='font-medium'>
                          {item.name || item.itemType}
                        </p>

                        <p className='text-sm'>
                          {t('MyOrders.Qty')}: {item.quantity} x{' '}
                          {formatPrice(item.price)} {t('ShoopingCart.KD')}
                        </p>
                      </div>

                      <p className='font-semibold'>
                        {formatPrice(item.quantity * item.price)}{' '}
                        {t('ShoopingCart.KD')}
                      </p>
                    </div>
                  ))}

                  {/* Delivery */}
                  {order.deliveryType === 'delivery' && (
                    <div className='flex justify-between mt-2'>
                      <span>{t('MyOrders.Delivery Charges')}</span>

                      <span>
                        {formatPrice(order.deliveryCharge)}{' '}
                        {t('ShoopingCart.KD')}
                      </span>
                    </div>
                  )}

                  {/* ✅ Total */}
                  <div className='flex justify-between mt-2 font-semibold'>
                    <span>{t('MyOrders.Total')}</span>

                    <span>
                      {formatPrice(totalPrice)} {t('ShoopingCart.KD')}
                    </span>
                  </div>

                  {/* Status */}
                  {/* <div className="text-sm mt-1">
                    {t("MyOrders.Status")}: {order.status}
                  </div> */}

                  {/* Status */}
                  <div className='text-sm mt-1 flex justify-between items-center'>
                    <span>
                      {t('MyOrders.Status')}: {order.status}
                    </span>

                    {order.status === 'Delivered' &&
                      !localStorage.getItem(`feedback_${order._id}`) && (
                        <button
                          onClick={() => {
                            setSelectedOrderId(order._id)
                            setShowFeedback(true)
                          }}
                          className='text-green-600 underline text-sm'
                        >
                          Give Feedback
                        </button>
                      )}
                  </div>

                  {/* Cancel Button */}
                  {(() => {
                    switch (order.status) {
                      case 'CancelledByUser':
                        return (
                          <button
                            onClick={() => requestRefund(order._id)}
                            className='mt-3 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600'
                          >
                            {t('MyOrders.Request Refund')}
                          </button>
                        )

                      case 'Refund Requested':
                        return (
                          <div className='mt-3 w-full bg-yellow-100 text-yellow-700 py-2 rounded-lg text-center font-medium'>
                            {t('MyOrders.Refund Requested')}
                          </div>
                        )

                      case 'Refunded':
                        return (
                          <div className='mt-3 w-full bg-green-100 text-green-700 py-2 rounded-lg text-center font-medium'>
                            {t('MyOrders.Refunded')}
                          </div>
                        )

                      case 'Delivered':
                        return null

                      default:
                        return (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            disabled={cancellingId === order._id}
                            className='mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:opacity-50'
                          >
                            {cancellingId === order._id
                              ? t('MyOrders.Cancelling')
                              : t('MyOrders.Cancel Order')}
                          </button>
                        )
                    }
                  })()}
                </div>
              )
            })
          )}
        </div>

        {showFeedback && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
              <h2 className='text-lg font-semibold mb-4'>
                {t('Give Your Feedback')}
              </h2>

              {/* Rating */}
              <div className='mb-3'>
                <label className='block mb-1 text-sm font-medium'>
                  {t('Rating')}
                </label>
                <select
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  className='w-full border rounded-md p-2'
                >
                  <option value=''>Select Rating</option>
                  <option value='5'>⭐⭐⭐⭐⭐</option>
                  <option value='4'>⭐⭐⭐⭐</option>
                  <option value='3'>⭐⭐⭐</option>
                  <option value='2'>⭐⭐</option>
                  <option value='1'>⭐</option>
                </select>
              </div>

              {/* Feedback */}
              <div className='mb-4'>
                <label className='block mb-1 text-sm font-medium'>
                  {t('Feedback')}
                </label>
                <textarea
                  rows='3'
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  className='w-full border rounded-md p-2'
                  placeholder='Write your feedback...'
                />
              </div>

              {/* Buttons */}
              <div className='flex justify-end gap-2'>
                <button
                  onClick={() => setShowFeedback(false)}
                  className='px-4 py-2 bg-gray-300 rounded-md'
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitFeedback}
                  className='px-4 py-2 bg-green-600 text-white rounded-md'
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <RightPanelLayout />
    </div>
  )
}

export default Myorders
