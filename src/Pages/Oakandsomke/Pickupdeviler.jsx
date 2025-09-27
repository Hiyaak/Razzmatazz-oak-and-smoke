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
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Left Sidebar (40% on desktop, full on mobile) */}
//       <div className="w-full md:w-2/5 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col">
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

//       {/* Right Panel (hidden on mobile, visible on md+) */}
//       <div className="hidden md:block md:w-3/5 relative">
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
import { ArrowLeft, MapPin, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/concept.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("delivery");
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const locations = [
    { name: 'Mubarak Al-Kabeer', subLocations: ['Abu Fatira', 'Airport', 'Adan', 'Al-Masayel', 'Mubarak Al-Kabeer'] },
    { name: 'Ahmadi', subLocations: ['Ahmadi City', 'Al-Khiran', 'Al-Wafra', 'Fahaheel', 'Mahboula', 'Mangaf'] },
    { name: 'Farwaniya', subLocations: ['Abdullah Al-Mubarak', 'Andalous', 'Ardhiya', 'Farwaniya', 'Jleeb Al-Shuyoukh', 'Rabiya'] },
    { name: 'Hawalli', subLocations: ['Bayan', 'Hawalli', 'Jabriya', 'Mishref', 'Salwa', 'Salmiya'] },
    { name: 'Jahra', subLocations: ['Jahra City', 'Kabd', 'Nasseem', 'Oyoun', 'Qasr', 'Sulaibiya'] },
    { name: 'Kuwait City', subLocations: ['Adailiya', 'Daiya', 'Dasma', 'Kuwait City', 'Qadsia', 'Shamiya'] }
  ];

  const pickupStores = [
    "Main Store - Mubarak Al-Kabeer",
    "Airport Branch",
    "Al-Adan Branch",
    "Al-Masayel Branch"
  ];

  const filteredLocations = locations.filter(
    location => location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.subLocations.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleAccordion = (locationName) => setExpandedLocation(expandedLocation === locationName ? null : locationName);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setExpandedLocation(null);
    setSearchQuery("");
    setSelectedLocation("");
    setShowDropdown(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setExpandedLocation(null);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleStartOrdering = () => {
    if (selectedLocation) navigate("/food-delivery");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Panel */}
      <div className="w-full md:w-2/5 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <button onClick={() => navigate("/")} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
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

          {/* Location / Store Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-gray-700 font-medium">
                {selectedMethod === "delivery" ? "Deliver to" : "Pickup from"}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full p-3 border border-gray-300 bg-white rounded-lg flex items-center justify-between text-gray-700 hover:bg-gray-50 transition"
              >
                <span>{selectedLocation || (selectedMethod === "delivery" ? "Select delivery area" : "Select store")}</span>
                <ChevronDown className="w-5 h-5" />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-20">
                  {/* Search Bar */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Location / Store List */}
                  <div className="py-2 space-y-2">
                    {selectedMethod === "delivery"
                      ? filteredLocations.map(location => (
                          <div key={location.name} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleAccordion(location.name)}
                              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                            >
                              <span className="font-medium text-gray-900">{location.name}</span>
                              {expandedLocation === location.name ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </button>
                            {expandedLocation === location.name && (
                              <div className="bg-white">
                                {location.subLocations.map(sub => (
                                  <button
                                    key={sub}
                                    onClick={() => handleLocationSelect(sub)}
                                    className="w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 border-t border-gray-100 first:border-t-0"
                                  >
                                    {sub}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      : pickupStores.map(store => (
                          <button
                            key={store}
                            onClick={() => handleLocationSelect(store)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                              selectedLocation === store
                                ? 'bg-red-50 border-l-4 border-l-red-500 shadow-sm'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <span className={`font-medium ${selectedLocation === store ? 'text-gray-900' : 'text-gray-700'}`}>
                              {store}
                            </span>
                          </button>
                        ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Start Ordering Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleStartOrdering}
            className={`w-full py-4 text-white rounded-lg font-semibold text-lg transition ${
              selectedLocation
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedLocation}
          >
            {selectedLocation ? "Start Ordering" : "Select your location"}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:block md:w-3/5 relative">
        <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default HeroSection;


