// import React, { lazy, Suspense } from "react";
// import "./App.css";

// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import Loader from "./Components/Loader/Loader";

// const Oakandsomke = lazy(() => import("./Pages/Oakandsomke/Ordernowsomke"));
// const Menu = lazy(() => import("./Pages/Oakandsomke/Menu"));
// function App() {
//   return (
//     <>
//       <Router>
       
//         <Suspense fallback={<Loader />}>
//           <Routes>
//             <Route path="/" element={<Oakandsomke/>} />
//             <Route path="/" element={<Menu/>} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </>
//   );
// }

// export default App;


// App.js
import React, { lazy, Suspense } from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader/Loader";

const Oakandsomke = lazy(() => import("./Pages/Oakandsomke/Ordernowsomke"));
const Menu = lazy(() => import("./Pages/Oakandsomke/Menu"));
const Shoopingcart = lazy(() => import("./Pages/Oakandsomke/Shoopingcart"));
const Review = lazy(() => import("./Pages/Oakandsomke/Review"));
const Pickupdeviler = lazy(() => import("./Pages/Oakandsomke/Pickupdeviler"));


function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Oakandsomke/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/shoopingcart" element={<Shoopingcart/>} />
            <Route path="/review" element={<Review/>} />
            <Route path="/pickupdeviler" element={<Pickupdeviler/>} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
