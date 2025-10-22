import React, { lazy, Suspense } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './Components/Loader/Loader'

//  Import Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Oakandsomke = lazy(() => import('./Pages/Oakandsomke/Ordernowsomke'))
const Profile = lazy(() => import('./Pages/Profile/Profile'))
const Shoopingcart = lazy(() => import('./Pages/Oakandsomke/Shoopingcart'))
const Contact = lazy(() => import('./Pages/Contact/Contact'))
const Pickupdeviler = lazy(() => import('./Pages/Oakandsomke/Pickupdeviler'))
const Subproducts = lazy(() => import('./Pages/Oakandsomke/Subproducts'))
const Login = lazy(() => import('./Pages/Login/Login'))
const Placeorder = lazy(() => import('./Pages/Placeorder/Placeorder'))
const Myorders = lazy(() => import('./Pages/Placeorder/Myorders'))
const Search = lazy(() => import('./Pages/Search/Search'))
const BrandDetails = lazy(() =>
  import('./Pages/Contact/BrandDetails/BrandDetails')
)
const Adress = lazy(() => import('./Pages/Oakandsomke/Adress'))
const Otpverification = lazy(() => import('./Pages/Profile/Otpverification'))
const Userprofile = lazy(() => import('./Pages/Profile/Userprofile'))
const Usercheckout = lazy(() => import('./Pages/Profile/Usercheckout'))

function App () {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Oakandsomke />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/otpverification' element={<Otpverification />} />
            <Route path='/subproduct/:name' element={<Subproducts />} />
            <Route path='/shoopingcart' element={<Shoopingcart />} />
            <Route path='/adress' element={<Adress />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/pickupdeviler' element={<Pickupdeviler />} />
            <Route path='/login' element={<Login />} />
            <Route path='/placeorder' element={<Placeorder />} />
            <Route path='/myorders' element={<Myorders />} />
            <Route path='/search' element={<Search />} />
            <Route path='/branddetails' element={<BrandDetails />} />
            <Route path='/userprofile' element={<Userprofile />} />
            <Route path='/usercheckout' element={<Usercheckout />} />
          </Routes>
        </Suspense>
      </Router>

      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme='colored'
      />
    </>
  )
}

export default App
