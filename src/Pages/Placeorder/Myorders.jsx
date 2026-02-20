import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { toast } from 'react-toastify'

const Myorders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const verifyPayment = async tapId => {
    try {
      const { data } = await ApiService.post('getPaymentData', {
        payment_id: tapId
      })

      if (data.status) {
        setPaymentStatus(data.payment_status)

        toast.success(
          data.payment_status === 'CAPTURED'
            ? 'Payment Successful'
            : 'Payment Failed'
        )

        await getOrders()

        // 🔥 Clean URL safely
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
              deliveryCharges: order.deliveryCharges || 0,
              totalPrice: order.totalPrice || 0,
              products: Array.isArray(order.products)
                ? order.products.map(product => ({
                    ...product,
                    quantity: product.quantity || 0,
                    price: product.price || 0
                  }))
                : []
            }))
          : []
        setOrders(sanitizedOrders)
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

  // ✅ Cancel Order API Integration
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
        getOrders() // refresh list
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
        <div className='p-2 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              My Orders
            </h1>
            <div className='w-9' />
          </div>
        </div>

        <div className='p-4 flex-1 overflow-y-auto space-y-4'>
          {/* 🔥 Payment Status Banner */}
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
            <p className='text-gray-500 text-center'>No orders found</p>
          ) : (
            orders.map(order => (
              <div
                key={order._id}
                className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
              >
                <div className='flex justify-between mb-2'>
                  <span className='font-medium text-gray-900'>
                    Order ID: {order._id?.slice(-6)}
                  </span>
                  <span className='text-gray-500 text-sm'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {order.products.map(product => (
                  <div
                    key={product._id}
                    className='flex items-center gap-3 border-b pb-2'
                  >
                    <img
                      src={
                        product.subProduct_img
                          ? `${ImagePath}${product.subProduct_img}`
                          : '/placeholder-image.jpg'
                      }
                      className='w-12 h-12 rounded-md'
                    />
                    <div className='flex-1'>
                      <p className='font-medium'>{product.subProduct_name}</p>
                      <p className='text-sm'>
                        Qty: {product.quantity} x {formatPrice(product.price)}{' '}
                        KD
                      </p>
                    </div>
                    <p className='font-semibold'>
                      {formatPrice(product.quantity * product.price)} KD
                    </p>
                  </div>
                ))}

                {order.deliveryType === 'delivery' && (
                  <div className='flex justify-between mt-2'>
                    <span>Delivery Charges</span>
                    <span>{formatPrice(order.deliveryCharges)} KD</span>
                  </div>
                )}

                <div className='flex justify-between mt-2 font-semibold'>
                  <span>Total</span>
                  <span>{formatPrice(order.finalTotal)} KD</span>
                </div>

                <div className='text-sm mt-1'>Status: {order.status}</div>

                {/* ✅ Show cancel button only if not already cancelled */}
                {order.status !== 'CancelledByUser' && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    disabled={cancellingId === order._id}
                    className='mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:opacity-50'
                  >
                    {cancellingId === order._id
                      ? 'Cancelling...'
                      : 'Cancel Order'}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <RightPanelLayout />
    </div>
  )
}

export default Myorders
