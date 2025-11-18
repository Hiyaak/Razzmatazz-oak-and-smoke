// import React from 'react'
// import RightPanelLayout from '../../Layout/RightPanelLayout'

// const Getnotification = () => {
//   return (
//     <div>
//       <h1>Hello World</h1>
//       <RightPanelLayout />
//     </div>
//   )
// }

// export default Getnotification

// import React from 'react'
// import RightPanelLayout from '../../Layout/RightPanelLayout'

// const Getnotification = () => {
//   return (
//     <div className='flex flex-col md:flex-row min-h-screen'>
      
//       {/* Left Content Area (42% on desktop, full width on mobile) */}
//       <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>

//         {/* Header */}
//         <div className='p-4 border-b border-gray-200'>
//           <h1 className='text-2xl font-semibold text-gray-900'>
//             Notifications
//           </h1>
//         </div>

//         {/* Scrollable Content */}
//         <div className='flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
           
//           {/* Your Page Content */}
//           <h1 className='text-lg font-bold text-gray-700'>Hello World</h1>

//         </div>
//       </div>

//       {/* Right Panel (Fixed, No Scroll) */}
//       <RightPanelLayout />
//     </div>
//   )
// }

// export default Getnotification



// import React, { useEffect, useState } from 'react';
// import RightPanelLayout from '../../Layout/RightPanelLayout';

// const Getnotification = () => {

//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔥 Fetch notifications from backend
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("userid");
//       if (!userId) {
//         console.log("⚠️ No user ID found");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`http://13.126.81.242:5001/getAllNotifications?userId=${userId}`);
//       const data = await response.json();

//       if (data.status) {
//         setNotifications(data.notifications);
//       } else {
//         console.log("⚠️ Failed to fetch notifications");
//       }
//     } catch (error) {
//       console.error("🔥 Error fetching notifications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   return (
//     <div className='flex flex-col md:flex-row min-h-screen'>
      
//       {/* Left Content Area */}
//       <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>

//         {/* Header */}
//         <div className='p-4 border-b border-gray-200'>
//           <h1 className='text-2xl font-semibold text-gray-900'>Notifications</h1>
//         </div>

//         {/* Scrollable Content */}
//         <div className='flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>

//           {loading && <p className="text-gray-500">Loading notifications...</p>}

//           {!loading && notifications.length === 0 && (
//             <p className="text-gray-500">No notifications found.</p>
//           )}

//           {/* 🔔 Notifications List */}
//           {notifications.map((n) => (
//             <div
//               key={n._id}
//               className="border border-gray-300 rounded-xl p-4 mb-4 bg-white shadow-sm"
//             >
//               <h2 className="text-lg font-semibold text-gray-800">{n.title}</h2>
//               <p className="text-gray-600 mt-1">{n.message}</p>

//               {n.metaData?.orderId && (
//                 <p className="text-sm text-gray-500 mt-1">
//                   Order ID: {n.metaData.orderId}
//                 </p>
//               )}

//               {n.metaData?.totalAmount && (
//                 <p className="text-sm text-gray-500">
//                   Amount: ₹{n.metaData.totalAmount}
//                 </p>
//               )}

//               <p className="text-xs text-gray-400 mt-2">
//                 {new Date(n.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))}

//         </div>
//       </div>

//       {/* Right Panel */}
//       <RightPanelLayout />
//     </div>
//   );
// };

// export default Getnotification;


import React, { useEffect, useState } from 'react';
import RightPanelLayout from '../../Layout/RightPanelLayout';

const Getnotification = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch user notifications
  const fetchNotifications = async () => {
    try {
      // ✅ Get brandId first
      const storedBrandId = localStorage.getItem("brandId");

      // ✅ Get userId based on your login storage format
      const userId = localStorage.getItem(`registredUserId_${storedBrandId}`);

      if (!userId) {
        console.log("⚠️ No user ID found in localStorage");
        setLoading(false);
        return;
      }

      // 🔥 Final API Call
      const response = await fetch(
        `http://13.126.81.242:5001/getUserNotifications/${userId}`,
        { method: "GET" }
      );

      const data = await response.json();

      if (data.status) {
        setNotifications(data.notifications);
      } else {
        console.log("⚠️ Failed to fetch notifications");
      }
    } catch (error) {
      console.error("🔥 Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      
      {/* Left Content Area */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>

        {/* Header */}
        <div className='p-4 border-b border-gray-200'>
          <h1 className='text-2xl font-semibold text-gray-900'>Notifications</h1>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>

          {loading && <p className="text-gray-500">Loading notifications...</p>}

          {!loading && notifications.length === 0 && (
            <p className="text-gray-500">No notifications found.</p>
          )}

          {/* 🔔 Notifications List */}
          {notifications.map((n) => (
            <div
              key={n._id}
              className="border border-gray-300 rounded-xl p-4 mb-4 bg-white shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-800">{n.title}</h2>
              <p className="text-gray-600 mt-1">{n.message}</p>

              {n.metaData?.orderId && (
                <p className="text-sm text-gray-500 mt-1">
                  Order ID: {n.metaData.orderId}
                </p>
              )}

              {n.metaData?.totalAmount && (
                <p className="text-sm text-gray-500">
                  Amount: ₹{n.metaData.totalAmount}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  );
};

export default Getnotification;
