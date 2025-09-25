import React, { lazy, Suspense } from "react";
import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader/Loader";

const Oakandsomke = lazy(() => import("./Pages/Oakandsomke/Ordernowsomke"));
const Menu = lazy(() => import("./Pages/Oakandsomke/Menu"));
function App() {
  return (
    <>
      <Router>
       
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Oakandsomke/>} />
            <Route path="/" element={<Menu/>} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
