import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { useTranslation } from 'react-i18next'
import ApiService from '../../Services/Apiservice'

const Getnotification = () => {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // const fetchNotifications = async () => {
  //   try {
  //     const storedBrandId = localStorage.getItem('brandId')
  //     const userIdKey = `registredUserId_${storedBrandId}`
  //     const userId = localStorage.getItem(userIdKey)

  //     if (!userId) {
  //       setLoading(false)
  //       return
  //     }

  //     const response = await fetch(
  //       `http://13.126.81.242:5001/getUserNotifications/${userId}`,
  //       { method: 'GET' }
  //     )

  //     const data = await response.json()

  //     if (data.status) {
  //       setNotifications(data.notifications || [])
  //     } else {
  //       setNotifications([])
  //     }
  //   } catch (error) {
  //     console.error('Fetch Error:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const fetchNotifications = async () => {
    try {
      const storedBrandId = localStorage.getItem('brandId')
      const userIdKey = `registredUserId_${storedBrandId}`
      const userId = localStorage.getItem(userIdKey)

      if (!userId) {
        setLoading(false)
        return
      }

      const { data } = await ApiService.get(`getUserNotifications/${userId}`)

      if (data.status) {
        setNotifications(data.notifications || [])
      } else {
        setNotifications([])
      }
    } catch (error) {
      console.error('Fetch Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  // ✅ Proper navigation (works with HashRouter)
  const handleNotificationClick = () => {
    navigate('/notifications')
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        <div className='p-4 border-b border-gray-200'>
          <h1 className='text-2xl font-semibold text-gray-900'>
            {t('notifications.title')}
          </h1>
        </div>

        <div className='flex-1 overflow-y-auto p-4'>
          {loading && (
            <p className='text-gray-500'>{t('notifications.loading')}</p>
          )}

          {!loading && notifications.length === 0 && (
            <p className='text-gray-500'>{t('notifications.empty')}</p>
          )}

          {notifications.map(n => (
            <div
              key={n._id}
              onClick={handleNotificationClick}
              className='cursor-pointer border rounded-xl p-4 mb-4 bg-white shadow-sm hover:bg-gray-50 transition'
            >
              <h2 className='text-lg font-semibold'>{n.title}</h2>

              <p>{n.message}</p>

              {n.metaData?.orderId && (
                <p>
                  {t('notifications.orderId')}: {n.metaData.orderId}
                </p>
              )}

              {n.metaData?.totalAmount && (
                <p>
                  {t('notifications.amount')}: ₹{n.metaData.totalAmount}
                </p>
              )}

              <p className='text-xs text-gray-400'>
                {new Date(n.createdAt).toLocaleString(
                  i18n.language === 'ar' ? 'ar-EG' : 'en-US'
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      <RightPanelLayout />
    </div>
  )
}

export default Getnotification
