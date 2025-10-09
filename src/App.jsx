import React, { lazy, Suspense } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './Components/Loader/Loader'

const Oakandsomke = lazy(() => import('./Pages/Oakandsomke/Ordernowsomke'))
const Menu = lazy(() => import('./Pages/Oakandsomke/Menu'))
const Shoopingcart = lazy(() => import('./Pages/Oakandsomke/Shoopingcart'))
const Review = lazy(() => import('./Pages/Oakandsomke/Review'))
const Pickupdeviler = lazy(() => import('./Pages/Oakandsomke/Pickupdeviler'))
const Subproducts = lazy(() => import('./Pages/Oakandsomke/Subproducts'))
const Login = lazy(() => import('./Pages/Login/Login'))
const Placeorder = lazy(() => import('./Pages/Placeorder/Placeorder'))
const Myorders = lazy(() => import('./Pages/Placeorder/Myorders'))
const Search = lazy(() => import('./Pages/Search/Search'))
function App () {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Oakandsomke />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/subproduct/:name' element={<Subproducts />} />
            <Route path='/shoopingcart' element={<Shoopingcart />} />
            <Route path='/review' element={<Review />} />
            <Route path='/pickupdeviler' element={<Pickupdeviler />} />
            <Route path='/login' element={<Login />} />
            <Route path='/placeorder' element={<Placeorder />} />
            <Route path='/myorders' element={<Myorders />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
