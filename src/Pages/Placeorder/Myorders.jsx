import { ArrowLeft } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import RightPanelLayout from '../../Layout/RightPanelLayout'

const Myorders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const storedBrandId = localStorage.getItem('brandId')
      if (!storedBrandId) return // no brand selected

      const userId =
        sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
        localStorage.getItem(`registredUserId_${storedBrandId}`)

      if (!userId) return // no user logged in

      const { data } = await ApiService.get(`getOrdersByUserId/${userId}`)

      if (data.status) {
        console.log('orders', data.orders)
        setOrders(data.orders)
      }
    } catch (error) {
      console.log('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
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

        {/* Orders List */}
        <div className='p-4 flex-1 overflow-y-auto space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
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
                    Order ID: {order._id.slice(-6)}
                  </span>
                  <span className='text-gray-500 text-sm'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className='space-y-2'>
                  {order.products.map(product => (
                    <div
                      key={product._id}
                      className='flex items-center gap-3 border-b border-gray-100 pb-2'
                    >
                      <img
                        src={`${ImagePath}${product.subProduct_img}`}
                        alt={product.subProduct_name}
                        className='w-12 h-12 object-cover rounded-md'
                      />
                      <div className='flex-1'>
                        <p className='text-gray-900 font-medium'>
                          {product.subProduct_name}
                        </p>
                        <p className='text-gray-500 text-sm'>
                          Qty: {product.quantity} × {product.price} KD
                        </p>
                      </div>
                      <p className='text-gray-900 font-semibold'>
                        {product.quantity * product.price} KD
                      </p>
                    </div>
                  ))}
                </div>

                <div className='flex justify-between mt-2 font-semibold text-gray-900'>
                  <span>Total:</span>
                  <span>{order.totalPrice.toFixed(3)} KD</span>
                </div>

                <div className='mt-1 text-sm text-gray-500'>
                  Delivery Type: {order.deliveryType}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Myorders
