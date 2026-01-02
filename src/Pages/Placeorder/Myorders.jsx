// import { ArrowLeft } from 'lucide-react'

// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import ApiService, { ImagePath } from '../../Services/Apiservice'
// import RightPanelLayout from '../../Layout/RightPanelLayout'

// const Myorders = () => {
//   const navigate = useNavigate()
//   const [orders, setOrders] = useState([])

//   const getOrders = async () => {
//     try {
//       const storedBrandId = localStorage.getItem('brandId')
//       if (!storedBrandId) return // no brand selected

//       const userId =
//         sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
//         localStorage.getItem(`registredUserId_${storedBrandId}`)

//       if (!userId) return // no user logged in

//       const { data } = await ApiService.get(`getOrdersByUserId/${userId}`)

//       if (data.status) {
//         console.log('orders', data.orders)
//         setOrders(data.orders)
//       }
//     } catch (error) {
//       console.log('Error fetching orders:', error)
//     }
//   }

//   useEffect(() => {
//     getOrders()
//   }, [])

//   return (
//     <div className='flex flex-col md:flex-row min-h-screen'>
//       {/* Left Sidebar */}
//       <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
//         {/* Header */}
//         <div className='p-2 border-b border-gray-200'>
//           <div className='flex items-center justify-between mb-1'>
//             <button
//               onClick={() => navigate('/')}
//               className='p-2 hover:bg-gray-200 rounded-full transition-colors'
//             >
//               <ArrowLeft className='w-5 h-5 text-gray-600' />
//             </button>

//             <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
//               My Orders
//             </h1>

//             <div className='w-9' />
//           </div>
//         </div>

//         {/* Orders List */}
//         <div className='p-4 flex-1 overflow-y-auto space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
//           {orders.length === 0 ? (
//             <p className='text-gray-500 text-center'>No orders found</p>
//           ) : (
//             orders.map(order => (
//               <div
//                 key={order._id}
//                 className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
//               >
//                 <div className='flex justify-between mb-2'>
//                   <span className='font-medium text-gray-900'>
//                     Order ID: {order._id.slice(-6)}
//                   </span>
//                   <span className='text-gray-500 text-sm'>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//                 <div className='space-y-2'>
//                   {order.products.map(product => (
//                     <div
//                       key={product._id}
//                       className='flex items-center gap-3 border-b border-gray-100 pb-2'
//                     >
//                       <img
//                         src={`${ImagePath}${product.subProduct_img}`}
//                         alt={product.subProduct_name}
//                         className='w-12 h-12 object-cover rounded-md'
//                       />
//                       <div className='flex-1'>
//                         <p className='text-gray-900 font-medium'>
//                           {product.subProduct_name}
//                         </p>
//                         <p className='text-gray-500 text-sm'>
//                           Qty: {product.quantity} × {product.price} KD
//                         </p>
//                       </div>
//                       <p className='text-gray-900 font-semibold'>
//                         {(product.quantity * product.price).toFixed(3)} KD
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* ✅ Delivery Charges */}
//                 <div className='flex justify-between mt-2 text-gray-700 font-medium'>
//                   <span>Delivery Charges:</span>
//                   <span>{order.deliveryCharges.toFixed(3)} KD</span>
//                 </div>

//                 {/* ✅ Total Price */}
//                 <div className='flex justify-between mt-1 font-semibold text-gray-900'>
//                   <span>Total:</span>
//                   <span>{order.totalPrice.toFixed(3)} KD</span>
//                 </div>

//                 <div className='mt-1 text-sm text-gray-500'>
//                   Delivery Type: {order.deliveryType}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <RightPanelLayout />
//     </div>
//   )
// }

// export default Myorders


// import { ArrowLeft } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import ApiService, { ImagePath } from '../../Services/Apiservice'
// import RightPanelLayout from '../../Layout/RightPanelLayout'

// const Myorders = () => {
//   const navigate = useNavigate()
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   const getOrders = async () => {
//     try {
//       const storedBrandId = localStorage.getItem('brandId')
//       if (!storedBrandId) {
//         setLoading(false)
//         return // no brand selected
//       }

//       const userId =
//         sessionStorage.getItem(`guestUserId_${storedBrandId}`) ||
//         localStorage.getItem(`registredUserId_${storedBrandId}`)

//       if (!userId) {
//         setLoading(false)
//         return // no user logged in
//       }

//       const { data } = await ApiService.get(`getOrdersByUserId/${userId}`)

//       if (data.status) {
//         console.log('orders', data.orders)
//         // Sanitize the data and add missing properties with default values
//         const sanitizedOrders = Array.isArray(data.orders) 
//           ? data.orders.map(order => ({
//               ...order,
//               deliveryCharges: order.deliveryCharges || 0, // Add default value if missing
//               totalPrice: order.totalPrice || 0,
//               products: Array.isArray(order.products) ? order.products.map(product => ({
//                 ...product,
//                 quantity: product.quantity || 0,
//                 price: product.price || 0
//               })) : []
//             }))
//           : []
//         setOrders(sanitizedOrders)
//       }
//     } catch (error) {
//       console.log('Error fetching orders:', error)
//       setOrders([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     getOrders()
//   }, [])

//   // Safe number formatting function
//   const formatPrice = (price) => {
//     const num = Number(price)
//     return isNaN(num) ? '0.000' : num.toFixed(3)
//   }

//   if (loading) {
//     return (
//       <div className="flex flex-col md:flex-row min-h-screen">
//         <div className="w-full md:w-[42%] h-screen border-r border-gray-200 flex items-center justify-center">
//           <p className="text-gray-500">Loading orders...</p>
//         </div>
//         <RightPanelLayout />
//       </div>
//     )
//   }

//   return (
//     <div className='flex flex-col md:flex-row min-h-screen'>
//       {/* Left Sidebar */}
//       <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
//         {/* Header */}
//         <div className='p-2 border-b border-gray-200'>
//           <div className='flex items-center justify-between mb-1'>
//             <button
//               onClick={() => navigate('/')}
//               className='p-2 hover:bg-gray-200 rounded-full transition-colors'
//             >
//               <ArrowLeft className='w-5 h-5 text-gray-600' />
//             </button>

//             <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
//               My Orders
//             </h1>

//             <div className='w-9' />
//           </div>
//         </div>

//         {/* Orders List */}
//         <div className='p-4 flex-1 overflow-y-auto space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
//           {orders.length === 0 ? (
//             <p className='text-gray-500 text-center'>No orders found</p>
//           ) : (
//             orders.map(order => (
//               <div
//                 key={order._id}
//                 className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
//               >
//                 <div className='flex justify-between mb-2'>
//                   <span className='font-medium text-gray-900'>
//                     Order ID: {order._id ? order._id.slice(-6) : 'N/A'}
//                   </span>
//                   <span className='text-gray-500 text-sm'>
//                     {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date not available'}
//                   </span>
//                 </div>

//                 <div className='space-y-2'>
//                   {order.products && order.products.map(product => (
//                     <div
//                       key={product._id || Math.random()}
//                       className='flex items-center gap-3 border-b border-gray-100 pb-2'
//                     >
//                       <img
//                         src={product.subProduct_img ? `${ImagePath}${product.subProduct_img}` : '/placeholder-image.jpg'}
//                         alt={product.subProduct_name || 'Product image'}
//                         className='w-12 h-12 object-cover rounded-md'
//                         onError={(e) => {
//                           e.target.src = '/placeholder-image.jpg'
//                         }}
//                       />
//                       <div className='flex-1'>
//                         <p className='text-gray-900 font-medium'>
//                           {product.subProduct_name || 'Unnamed Product'}
//                         </p>
//                         <p className='text-gray-500 text-sm'>
//                           Qty: {product.quantity} × {formatPrice(product.price)} KD
//                         </p>
//                       </div>
//                       <p className='text-gray-900 font-semibold'>
//                         {formatPrice(product.quantity * product.price)} KD
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* ✅ Delivery Charges - Only show if deliveryType is "delivery" */}
//                 {order.deliveryType === 'delivery' && (
//                   <div className='flex justify-between mt-2 text-gray-700 font-medium'>
//                     <span>Delivery Charges:</span>
//                     <span>{formatPrice(order.deliveryCharges)} KD</span>
//                   </div>
//                 )}

//                 {/* ✅ Total Price */}
//                 <div className='flex justify-between mt-1 font-semibold text-gray-900'>
//                   <span>Total:</span>
//                   <span>{formatPrice(order.totalPrice)} KD</span>
//                 </div>

//                 <div className='mt-1 text-sm text-gray-500'>
//                   Delivery Type: {order.deliveryType || 'Not specified'}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <RightPanelLayout />
//     </div>
//   )
// }

// export default Myorders


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
    getOrders()
  }, [])

  const formatPrice = (price) => {
    const num = Number(price)
    return isNaN(num) ? '0.000' : num.toFixed(3)
  }

  // ✅ Cancel Order API Integration
  const cancelOrder = async (orderId) => {
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

      const response = await fetch('http://13.126.81.242:5001/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId,
          user_id: userId,
          reason: reason
        })
      })

      const result = await response.json()

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
          {orders.length === 0 ? (
            <p className='text-gray-500 text-center'>No orders found</p>
          ) : (
            orders.map(order => (
              <div key={order._id} className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
                <div className='flex justify-between mb-2'>
                  <span className='font-medium text-gray-900'>
                    Order ID: {order._id?.slice(-6)}
                  </span>
                  <span className='text-gray-500 text-sm'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {order.products.map(product => (
                  <div key={product._id} className='flex items-center gap-3 border-b pb-2'>
                    <img
                      src={product.subProduct_img ? `${ImagePath}${product.subProduct_img}` : '/placeholder-image.jpg'}
                      className='w-12 h-12 rounded-md'
                    />
                    <div className='flex-1'>
                      <p className='font-medium'>{product.subProduct_name}</p>
                      <p className='text-sm'>Qty: {product.quantity} x {formatPrice(product.price)} KD</p>
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
                  <span>{formatPrice(order.totalPrice)} KD</span>
                </div>

                <div className='text-sm mt-1'>Status: {order.status}</div>

                {/* ✅ Show cancel button only if not already cancelled */}
                {order.status !== 'CancelledByUser' && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    disabled={cancellingId === order._id}
                    className='mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:opacity-50'
                  >
                    {cancellingId === order._id ? 'Cancelling...' : 'Cancel Order'}
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
