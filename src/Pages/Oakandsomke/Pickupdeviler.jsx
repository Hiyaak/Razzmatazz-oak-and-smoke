// import React, { useState } from "react";
// import { ArrowLeft, MapPin, ChevronDown } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import heroImage from "../../assets/concept.jpg";

// const HeroSection = () => {
//   const navigate = useNavigate();
//   const [selectedMethod, setSelectedMethod] = useState("delivery");
//   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState("");

//   const deliveryAreas = [
//     "Downtown Area",
//     "North District",
//     "South District",
//     "East District",
//     "West District",
//   ];

//   const pickupStores = [
//     "Main Store - Downtown",
//     "North Branch",
//     "South Branch",
//     "East Branch",
//     "West Branch",
//   ];

//   const handleMethodChange = (method) => {
//     setSelectedMethod(method);
//     setSelectedLocation("");
//     setShowLocationDropdown(false);
//   };

//   const handleLocationSelect = (location) => {
//     setSelectedLocation(location);
//     setShowLocationDropdown(false);
//   };

//   const handleStartOrdering = () => {
//     if (selectedLocation) {
//       navigate("/food-delivery");
//     } else {
//       setShowLocationDropdown(true);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Sidebar - 40% */}
//       <div className="w-2/5 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center mb-4">
//             <button
//               onClick={() => navigate("/")}
//               className="p-2 hover:bg-gray-200 rounded-full transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//           <h1 className="text-2xl font-semibold text-gray-900">Order Now</h1>
//         </div>

//         {/* Method Selection */}
//         <div className="p-6 space-y-6 flex-1">
//           <div className="flex space-x-4">
//             <button
//               onClick={() => handleMethodChange("delivery")}
//               className={`flex-1 py-3 px-6 rounded-lg font-medium text-base transition-all ${
//                 selectedMethod === "delivery"
//                   ? "bg-red-600 text-white shadow"
//                   : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               🚚 Delivery
//             </button>
//             <button
//               onClick={() => handleMethodChange("pickup")}
//               className={`flex-1 py-3 px-6 rounded-lg font-medium text-base transition-all ${
//                 selectedMethod === "pickup"
//                   ? "bg-red-600 text-white shadow"
//                   : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               🏪 Pickup
//             </button>
//           </div>

//           {/* Location Selection */}
//           <div>
//             <div className="flex items-center space-x-2 mb-2">
//               <MapPin className="w-5 h-5 text-red-600" />
//               <span className="text-gray-700 font-medium">
//                 {selectedMethod === "delivery" ? "Deliver to" : "Pickup from"}
//               </span>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setShowLocationDropdown(!showLocationDropdown)}
//                 className="w-full p-3 border border-gray-300 bg-white rounded-lg flex items-center justify-between text-gray-700 hover:bg-gray-50 transition"
//               >
//                 <span>
//                   {selectedLocation ||
//                     `Choose ${
//                       selectedMethod === "delivery" ? "delivery area" : "store"
//                     }`}
//                 </span>
//                 <ChevronDown className="w-5 h-5" />
//               </button>

//               {showLocationDropdown && (
//                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto z-20">
//                   {(selectedMethod === "delivery"
//                     ? deliveryAreas
//                     : pickupStores
//                   ).map((location) => (
//                     <button
//                       key={location}
//                       onClick={() => handleLocationSelect(location)}
//                       className="w-full p-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition first:rounded-t-lg last:rounded-b-lg"
//                     >
//                       {location}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Start Ordering Button */}
//         <div className="p-6 border-t border-gray-200">
//           <button
//             onClick={handleStartOrdering}
//             className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg transition"
//           >
//             {selectedLocation ? "Start Ordering" : "Select your location"}
//           </button>
//         </div>
//       </div>

//       {/* Right Panel - 60% */}
//       <div className="w-3/5 relative">
//         <img
//           src={heroImage}
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;




import React, { useState } from "react";
import { ArrowLeft, MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/concept.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("delivery");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const deliveryAreas = [
    "Downtown Area",
    "North District",
    "South District",
    "East District",
    "West District",
  ];

  const pickupStores = [
    "Main Store - Downtown",
    "North Branch",
    "South Branch",
    "East Branch",
    "West Branch",
  ];

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setSelectedLocation("");
    setShowLocationDropdown(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  const handleStartOrdering = () => {
    if (selectedLocation) {
      navigate("/food-delivery");
    } else {
      setShowLocationDropdown(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar (40% on desktop, full on mobile) */}
      <div className="w-full md:w-2/5 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Order Now</h1>
        </div>

        {/* Method Selection */}
        <div className="p-6 space-y-6 flex-1">
          <div className="flex space-x-4">
            <button
              onClick={() => handleMethodChange("delivery")}
              className={`flex-1 py-3 px-6 rounded-lg font-medium text-base transition-all ${
                selectedMethod === "delivery"
                  ? "bg-red-600 text-white shadow"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              🚚 Delivery
            </button>
            <button
              onClick={() => handleMethodChange("pickup")}
              className={`flex-1 py-3 px-6 rounded-lg font-medium text-base transition-all ${
                selectedMethod === "pickup"
                  ? "bg-red-600 text-white shadow"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              🏪 Pickup
            </button>
          </div>

          {/* Location Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-gray-700 font-medium">
                {selectedMethod === "delivery" ? "Deliver to" : "Pickup from"}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="w-full p-3 border border-gray-300 bg-white rounded-lg flex items-center justify-between text-gray-700 hover:bg-gray-50 transition"
              >
                <span>
                  {selectedLocation ||
                    `Choose ${
                      selectedMethod === "delivery" ? "delivery area" : "store"
                    }`}
                </span>
                <ChevronDown className="w-5 h-5" />
              </button>

              {showLocationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto z-20">
                  {(selectedMethod === "delivery"
                    ? deliveryAreas
                    : pickupStores
                  ).map((location) => (
                    <button
                      key={location}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full p-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition first:rounded-t-lg last:rounded-b-lg"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Start Ordering Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleStartOrdering}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg transition"
          >
            {selectedLocation ? "Start Ordering" : "Select your location"}
          </button>
        </div>
      </div>

      {/* Right Panel (hidden on mobile, visible on md+) */}
      <div className="hidden md:block md:w-3/5 relative">
        <img
          src={heroImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;

