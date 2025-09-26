// // import React, { useState } from "react";
// // import { Clock, MapPin, Menu, ShoppingBag, Search, User } from "lucide-react";
// // import heroImage from "../../assets/concept.jpg";
// // import dash from "../../assets/productimage.jpg";
// // import board from "../../assets/subproductimage.jpg"

// // const FoodDeliveryApp = () => {
// //   const [selectedTab, setSelectedTab] = useState("Delivery");

// //   const productCategories = [
// //     {
// //       _id: 2,
// //       productName: "Ma'bouch",
// //       product_img:
// //         "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
// //     },
// //     {
// //       _id: 3,
// //       productName: "Smoked Meat",
// //       product_img:
// //         "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
// //     },
// //     {
// //       _id: 4,
// //       productName: "Fresh Salad",
// //       product_img:
// //         "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800",
// //     },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       {/* Left Panel */}
// //       <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
// //         {/* Header Tabs */}
// //         <div className="flex p-4 space-x-4">
// //           <button
// //             onClick={() => setSelectedTab("Delivery")}
// //             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
// //               selectedTab === "Delivery"
// //                 ? "bg-gray-900 text-white"
// //                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //             }`}
// //           >
// //             Delivery
// //           </button>
// //           <button
// //             onClick={() => setSelectedTab("Pickup")}
// //             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
// //               selectedTab === "Pickup"
// //                 ? "bg-gray-900 text-white"
// //                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //             }`}
// //           >
// //             Pickup
// //           </button>
// //         </div>

// //         {/* Location and Time */}
// //         <div className="px-4 pb-4 space-y-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-3">
// //               <MapPin className="w-5 h-5 text-gray-400" />
// //               <div>
// //                 <p className="text-sm text-gray-500">Deliver to</p>
// //                 <p className="font-medium text-gray-900">Choose location</p>
// //               </div>
// //             </div>
// //             <button className="text-red-500 font-medium hover:text-red-600">
// //               Edit
// //             </button>
// //           </div>

// //           <div className="flex items-center space-x-3">
// //             <Clock className="w-5 h-5 text-gray-400" />
// //             <div>
// //               <p className="text-sm text-gray-500">Earliest arrival</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Food Categories (Images instead of gradients) */}
// //         <div className="flex-1 px-4 space-y-4">
// //           {productCategories.map((item) => (
// //             <div
// //               key={item._id}
// //               className="relative rounded-lg overflow-hidden shadow group"
// //             >
// //               <img
// //                 src={item.product_img}
// //                 alt={item.productName}
// //                 className="w-full h-40 object-cover"
// //               />
// //               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
// //                 <h3 className="text-white font-bold text-lg text-center">
// //                   {item.productName}
// //                 </h3>
// //               </div>
// //             </div>
// //           ))}

// //           {/* Bottom Images */}
// //           <div className="grid grid-cols-2 gap-4">
// //             <img
// //               src="https://images.unsplash.com/photo-1543353071-873f17a7a088?w=400"
// //               alt="Extra1"
// //               className="rounded-lg h-24 w-full object-cover"
// //             />
// //             <img
// //               src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400"
// //               alt="Extra2"
// //               className="rounded-lg h-24 w-full object-cover"
// //             />
// //           </div>
// //         </div>

// //         {/* Select Location Button */}
// //         <div className="p-4">
// //           <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-colors">
// //             Select your location
// //           </button>
// //         </div>
// //       </div>

// //       {/* Right Panel - Hero Image */}
// //       <div className="flex-1 relative bg-black">
// //         {/* Top Navigation */}
// //         <div className="absolute top-6 left-6 right-6 z-10">
// //           <div className="flex justify-between items-center">
// //             <div className="flex space-x-4">
// //               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
// //                 <Menu className="w-6 h-6" />
// //               </button>
// //               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
// //                 <ShoppingBag className="w-6 h-6" />
// //               </button>
// //               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
// //                 <Search className="w-6 h-6" />
// //               </button>
// //               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
// //                 <User className="w-6 h-6" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Hero Banner Image - Using local asset */}
// //         <img
// //           src={heroImage}
// //           alt="Hero Food"
// //           className="w-full h-full object-cover"
// //         />

// //         {/* Brand Logo */}
// //         <div className="absolute bottom-8 right-8 z-10">
// //           <div className="text-red-500 font-bold text-4xl transform -rotate-12">
// //             <span className="text-red-600">Oak</span>
// //             <span className="text-white mx-2">and</span>
// //             <span className="text-red-600">Smoke</span>
// //           </div>
// //         </div>

// //         {/* Instagram Icon */}
// //         <div className="absolute bottom-8 left-8 z-20">
// //           <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
// //             IG
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FoodDeliveryApp;

// import React, { useState } from "react";
// import { Clock, MapPin, Menu, ShoppingBag, Search, User } from "lucide-react";
// import heroImage from "../../assets/concept.jpg";
// import dash from "../../assets/productimage.jpg";
// import board from "../../assets/subproductimage.jpg";

// const FoodDeliveryApp = () => {
//   const [selectedTab, setSelectedTab] = useState("Delivery");

//   // Only local images in productCategories
//   const productCategories = [
//     {
//       _id: 2,
//       productName: "Dash Product",
//       product_img: dash,
//     },
//     {
//       _id: 3,
//       productName: "Board Product",
//       product_img: board,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Left Panel - 40% */}
//       <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
//         {/* Header Tabs */}
//         <div className="flex p-4 space-x-4">
//           <button
//             onClick={() => setSelectedTab("Delivery")}
//             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//               selectedTab === "Delivery"
//                 ? "bg-gray-900 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Delivery
//           </button>
//           <button
//             onClick={() => setSelectedTab("Pickup")}
//             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//               selectedTab === "Pickup"
//                 ? "bg-gray-900 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Pickup
//           </button>
//         </div>

//         {/* Location and Time */}
//         <div className="px-4 pb-4 space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <MapPin className="w-5 h-5 text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500">Deliver to</p>
//                 <p className="font-medium text-gray-900">Choose location</p>
//               </div>
//             </div>
//             <button className="text-red-500 font-medium hover:text-red-600">
//               Edit
//             </button>
//           </div>

//           <div className="flex items-center space-x-3">
//             <Clock className="w-5 h-5 text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-500">Earliest arrival</p>
//             </div>
//           </div>
//         </div>

//         {/* Food Categories */}
//         {/* Food Categories - Side by Side */}
//       {/* Food Categories - Side by Side */}
// <div className="flex-1 px-4 space-y-4">
//   <div className="grid grid-cols-2 gap-4">
//     {productCategories.map((item) => (
//       <div
//         key={item._id}
//         className="relative rounded-lg overflow-hidden shadow group"
//       >
//         <img
//           src={item.product_img}
//           alt={item.productName}
//           className="w-full h-56 object-cover" // Increased height from h-40 to h-56
//         />
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//           <h3 className="text-white font-bold text-lg text-center">
//             {item.productName}
//           </h3>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//         {/* Select Location Button */}
//         <div className="p-4">
//           <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-colors">
//             Select your location
//           </button>
//         </div>
//       </div>

//       {/* Right Panel - 60% */}
//       <div className="flex-1 relative bg-black">
//         {/* Top Navigation */}
//         <div className="absolute top-6 left-6 right-6 z-10">
//           <div className="flex justify-between items-center">
//             <div className="flex space-x-4">
//               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
//                 <Menu className="w-6 h-6" />
//               </button>
//               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
//                 <ShoppingBag className="w-6 h-6" />
//               </button>
//               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
//                 <Search className="w-6 h-6" />
//               </button>
//               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
//                 <User className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Hero Banner Image */}
//         <img
//           src={heroImage}
//           alt="Hero Food"
//           className="w-full h-full object-cover"
//         />

//         {/* Brand Logo */}
//         <div className="absolute bottom-8 right-8 z-10">
//           <div className="text-red-500 font-bold text-4xl transform -rotate-12">
//             <span className="text-red-600">Oak</span>
//             <span className="text-white mx-2">and</span>
//             <span className="text-red-600">Smoke</span>
//           </div>
//         </div>

//         {/* Instagram Icon */}
//         <div className="absolute bottom-8 left-8 z-20">
//           <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
//             IG
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodDeliveryApp;

// import React, { useState } from "react";
// import { Clock, MapPin, Menu, ShoppingBag, Search, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import heroImage from "../../assets/concept.jpg";
// import dash from "../../assets/productimage.jpg";
// import board from "../../assets/subproductimage.jpg";

// const FoodDeliveryApp = () => {
//   const [selectedTab, setSelectedTab] = useState("Delivery");
//   const navigate = useNavigate();

//   const productCategories = [
//     {
//       _id: 2,
//       productName: "Dash Product",
//       product_img: dash,
//     },
//     {
//       _id: 3,
//       productName: "Board Product",
//       product_img: board,
//     },
//   ];

//   const handleMenuClick = () => {
//     navigate("/menu");
//   };

//   const handleshoopingcartClick = () => {
//     navigate("/shoopingcart");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Left Panel - 40% */}
//       <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
//         {/* Header Tabs */}

//         {/* Location and Time */}
//         <div className="px-4 pb-4 space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <MapPin className="w-5 h-5 text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500">Deliver to</p>
//                 <p className="font-medium text-gray-900">Choose location</p>
//               </div>
//             </div>
//             <button className="text-red-500 font-medium hover:text-red-600">
//               Edit
//             </button>
//           </div>

//           <div className="flex items-center space-x-3">
//             <Clock className="w-5 h-5 text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-500">Earliest Pickup</p>
//             </div>
//           </div>
//         </div>

//         {/* <div className="flex p-4 justify-between">
//           <button
//             onClick={() => setSelectedTab("Delivery")}
//             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//               selectedTab === "Delivery"
//                 ? "bg-gray-900 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Delivery
//           </button>
//           <button
//             onClick={() => setSelectedTab("Pickup")}
//             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//               selectedTab === "Pickup"
//                 ? "bg-gray-900 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Pickup
//           </button>
//         </div> */}

//         <div className="flex p-4 justify-center space-x-4">
//           <button
//             onClick={() => setSelectedTab("Delivery")}
//             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//               selectedTab === "Delivery"
//                 ? "bg-gray-900 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Delivery
//           </button>
//           <button
//             onClick={() => setSelectedTab("Pickup")}
//             className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//               selectedTab === "Pickup"
//                 ? "bg-gray-900 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Pickup
//           </button>
//         </div>

//         {/* Food Categories - Side by Side */}
//         <div className="flex-1 px-4 space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             {productCategories.map((item) => (
//               <div
//                 key={item._id}
//                 className="relative rounded-lg overflow-hidden shadow group"
//               >
//                 <img
//                   src={item.product_img}
//                   alt={item.productName}
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                   <h3 className="text-white font-bold text-lg text-center">
//                     {item.productName}
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Select Location Button */}
//         <div className="p-4">
//           <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-colors">
//             Select your location
//           </button>
//         </div>
//       </div>

//       {/* Right Panel - 60% */}
//       <div className="flex-1 relative bg-black">
//         {/* Top Navigation */}
//         <div className="absolute top-6 left-6 right-6 z-10">
//           <div className="flex justify-between items-center">
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleMenuClick}
//                 className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={handleshoopingcartClick}
//                 className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
//               >
//                 <ShoppingBag className="w-6 h-6" />
//               </button>
//               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
//                 <Search className="w-6 h-6" />
//               </button>
//               <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
//                 <User className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Hero Banner Image */}
//         <img
//           src={heroImage}
//           alt="Hero Food"
//           className="w-full h-full object-cover"
//         />

//         {/* Brand Logo */}
//         <div className="absolute bottom-8 right-8 z-10">
//           <div className="text-red-500 font-bold text-4xl transform -rotate-12">
//             <span className="text-red-600">Oak</span>
//             <span className="text-white mx-2">and</span>
//             <span className="text-red-600">Smoke</span>
//           </div>
//         </div>

//         {/* Instagram Icon */}
//         <div className="absolute bottom-8 left-8 z-20">
//           <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
//             IG
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodDeliveryApp;


import React, { useState } from "react";
import { Clock, MapPin, Menu, ShoppingBag, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/concept.jpg";
import dash from "../../assets/productimage.jpg";
import board from "../../assets/subproductimage.jpg";

const FoodDeliveryApp = () => {
  const [selectedTab, setSelectedTab] = useState("Delivery");
  const navigate = useNavigate();

  const productCategories = [
    {
      _id: 2,
      productName: "Dash Product",
      product_img: dash,
    },
    {
      _id: 3,
      productName: "Board Product",
      product_img: board,
    },
  ];

  const handleMenuClick = () => {
    navigate("/menu");
  };

  const handleshoopingcartClick = () => {
    navigate("/shoopingcart");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Panel - 40% */}
      <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
        {/* Header Tabs */}

        {/* Brand Header */}
        <div className="px-4 py-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Oak and Smoke
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Smoke Meet Everyday
          </p>
        </div>

        {/* Location and Time */}
        <div className="px-4 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Deliver to</p>
                <p className="font-medium text-gray-900">Choose location</p>
              </div>
            </div>
            <button className="text-red-500 font-medium hover:text-red-600">
              Edit
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Earliest Pickup</p>
            </div>
          </div>
        </div>

        <div className="flex p-4 justify-center space-x-4">
          <button
            onClick={() => setSelectedTab("Delivery")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === "Delivery"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setSelectedTab("Pickup")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === "Pickup"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Pickup
          </button>
        </div>

        {/* Food Categories - Side by Side */}
        <div className="flex-1 px-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {productCategories.map((item) => (
              <div
                key={item._id}
                className="relative rounded-lg overflow-hidden shadow group"
              >
                <img
                  src={item.product_img}
                  alt={item.productName}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-white font-bold text-lg text-center">
                    {item.productName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Select Location Button */}
        <div className="p-4">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-colors">
            Select your location
          </button>
        </div>
      </div>

      {/* Right Panel - 60% */}
      <div className="flex-1 relative bg-black">
        {/* Top Navigation */}
        <div className="absolute top-6 left-6 right-6 z-10">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={handleMenuClick}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={handleshoopingcartClick}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
              >
                <ShoppingBag className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                <Search className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Banner Image */}
        <img
          src={heroImage}
          alt="Hero Food"
          className="w-full h-full object-cover"
        />

        {/* Brand Logo */}
        <div className="absolute bottom-8 right-8 z-10">
          <div className="text-red-500 font-bold text-4xl transform -rotate-12">
            <span className="text-red-600">Oak</span>
            <span className="text-white mx-2">and</span>
            <span className="text-red-600">Smoke</span>
          </div>
        </div>

        {/* Instagram Icon */}
        <div className="absolute bottom-8 left-8 z-20">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            IG
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDeliveryApp;
