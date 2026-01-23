// // import React from 'react'

// // const PackagesDetails = () => {
// //   return (
// //     <div>
// //       <h1>Packages Details</h1>
// //     </div>
// //   )
// // }

// // export default PackagesDetails


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ApiService, { ImagePath } from "../../Services/Apiservice";
// import { ArrowLeft } from "lucide-react";
// import RightPanelLayout from "../../Layout/RightPanelLayout";

// const PackageDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [pkg, setPkg] = useState(null);

//   useEffect(() => {
//     fetchPackage();
//   }, []);

//   const fetchPackage = async () => {
//     const brandId = localStorage.getItem("brandId");

//     const { data } = await ApiService.get(
//       `getAllPackagesForCustomer?brandId=${brandId}`
//     );

//     const selected = data.data.find((p) => p._id === id);
//     setPkg(selected);
//   };

//   if (!pkg) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto bg-white min-h-screen">
//       {/* Header */}
//       <div className="p-4 border-b flex items-center gap-3">
//         <button onClick={() => navigate(-1)}>
//           <ArrowLeft />
//         </button>
//         <h1 className="text-xl font-bold">{pkg.name}</h1>
//       </div>

//       {/* Image */}
//       <img
//         src={`${ImagePath}${pkg.images[0]}`}
//         className="w-full h-64 object-cover"
//       />

//       {/* Description */}
//       <div className="p-6 border-b">
//         <h2 className="font-bold mb-2">Description</h2>
//         <p className="text-gray-600 text-sm whitespace-pre-line">
//           {pkg.description}
//         </p>
//       </div>

//       {/* Rules */}
//       {pkg.categoryRules.map((rule) => (
//         <div key={rule.categoryId._id} className="p-6 border-b">
//           <div className="flex items-center gap-3 mb-2">
//             <h2 className="font-bold">{rule.categoryId.name}</h2>
//             <span className="bg-gray-300 text-xs px-3 py-1 rounded-full">
//               Required
//             </span>
//             <span className="text-sm text-gray-500">
//               min: {rule.minItems}, max: {rule.maxItems}
//             </span>
//           </div>

//           {/* Options */}
//           {rule.items?.map((item, i) => (
//             <label
//               key={i}
//               className="flex justify-between items-center py-2"
//             >
//               <div className="flex items-center gap-3">
//                 <input type="checkbox" />
//                 <span>{item.name}</span>
//               </div>
//               <span className="text-green-600">
//                 KD {item.price.toFixed(3)}
//               </span>
//             </label>
//           ))}

//           {rule.options?.map((opt, i) => (
//             <label key={i} className="flex items-center gap-3 py-2">
//               <input type="radio" name={rule.categoryId._id} />
//               <span>{opt.label}</span>
//             </label>
//           ))}
//         </div>
//       ))}

//       {/* Bottom Bar */}
//       <div className="p-4 sticky bottom-0 bg-white border-t">
//         <button className="w-full bg-[#FA0303] text-white py-3 rounded-lg font-bold">
//           Add Package to Cart
//         </button>
//       </div>

//        {/* Right Panel */}
//      <RightPanelLayout />
//     </div>
    
//   );
// };

// export default PackageDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService, { ImagePath } from "../../Services/Apiservice";
import { ArrowLeft } from "lucide-react";
import RightPanelLayout from "../../Layout/RightPanelLayout";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    fetchPackage();
  }, []);

  const fetchPackage = async () => {
    try {
      const brandId = localStorage.getItem("brandId");
      const { data } = await ApiService.get(
        `getAllPackagesForCustomer?brandId=${brandId}`
      );
      const selected = data.data.find((p) => p._id === id);
      setPkg(selected);
    } catch (error) {
      console.log("Error fetching package:", error);
    }
  };

  if (!pkg) return <div className="p-10">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* LEFT PANEL */}
      <div className="w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col">

        {/* Header */}
        <div className="p-2 border-b border-gray-200 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">{pkg.name}</h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">

          {/* Image */}
          <div className="w-full h-64">
            <img
              src={`${ImagePath}${pkg.images[0]}`}
              alt={pkg.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="p-6 border-b">
            <h2 className="font-bold mb-2">Description</h2>
            <p className="text-gray-600 text-sm whitespace-pre-line">
              {pkg.description}
            </p>
          </div>

          {/* Category Rules */}
          {pkg.categoryRules.map((rule) => (
            <div key={rule.categoryId._id} className="p-6 border-b">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="font-bold">{rule.categoryId.name}</h2>
                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                  Required
                </span>
                <span className="text-sm text-gray-500">
                  min: {rule.minItems}, max: {rule.maxItems}
                </span>
              </div>

              {/* Checkbox Items */}
              {rule.items?.map((item, i) => (
                <label
                  key={i}
                  className="flex justify-between items-center py-2 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="accent-red-500" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-green-600 font-medium">
                    KD {item.price.toFixed(3)}
                  </span>
                </label>
              ))}

              {/* Radio Options */}
              {rule.options?.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 py-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={rule.categoryId._id}
                    className="accent-red-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-white border-t flex-shrink-0">
          <button className="w-full bg-[#FA0303] text-white py-3 rounded-lg font-bold">
            Add Package to Cart
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <RightPanelLayout />
    </div>
  );
};

export default PackageDetails;
