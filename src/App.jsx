import React, { lazy, Suspense } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './Components/Loader/Loader'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Oakandsomke = lazy(() => import('./Pages/Oakandsomke/Ordernowsomke'))
const Profile = lazy(() => import('./Pages/Profile/Profile'))
const Otpverification = lazy(() => import('./Pages/Profile/Otpverification'))
const Subproducts = lazy(() => import('./Pages/Oakandsomke/Subproducts'))
const SubproductDetails = lazy(() =>
  import('./Pages/Oakandsomke/SubproductDetails')
)
const Shoopingcart = lazy(() => import('./Pages/Oakandsomke/Shoopingcart'))
const Adress = lazy(() => import('./Pages/Oakandsomke/Adress'))
const Contact = lazy(() => import('./Pages/Contact/Contact'))
const Pickupdeviler = lazy(() => import('./Pages/Oakandsomke/Pickupdeviler'))
const Login = lazy(() => import('./Pages/Login/Login'))
const Placeorder = lazy(() => import('./Pages/Placeorder/Placeorder'))
const Myorders = lazy(() => import('./Pages/Placeorder/Myorders'))
const Search = lazy(() => import('./Pages/Search/Search'))
const BrandDetails = lazy(() =>
  import('./Pages/Contact/BrandDetails/BrandDetails')
)
const Userprofile = lazy(() => import('./Pages/Profile/Userprofile'))
const Usercheckout = lazy(() => import('./Pages/Profile/Usercheckout'))
const Getnotification = lazy(() =>
  import('./Pages/Notofication/Getnotification')
)
const GetAllPackages = lazy(() => import('./Pages/Oakandsomke/GetAllPackages'))
const PackagesDetails = lazy(() =>
  import('./Pages/Oakandsomke/PackagesDetails')
)
const Combos = lazy(() => import('./Pages/Oakandsomke/Combo'))
const Diy = lazy(() => import('./Pages/Oakandsomke/Diy'))
const DiyProducts = lazy(() => import('./Pages/Oakandsomke/DiyProducts'))
const DiyProductDetails = lazy(() =>
  import('./Pages/Oakandsomke/DiyProductDetails')
)

function App () {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Oakandsomke />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/otpverification' element={<Otpverification />} />
            <Route path='/combo' element={<Combos />} />
            <Route path='/diy' element={<Diy />} />
            <Route
              path='/diyproductdetails/:id'
              element={<DiyProductDetails />}
            />
            <Route path='/diyproducts/:productId' element={<DiyProducts />} />
            <Route path='/subproduct/:productId' element={<Subproducts />} />
            <Route
              path='/subproductdetails/:id'
              element={<SubproductDetails />}
            />
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
            <Route path='/notifications' element={<Getnotification />} />
            <Route path='/getAllPackages' element={<GetAllPackages />} />
            {/* <Route path="/packagesdetails" element={<PackagesDetails />} /> */}
            <Route path='/package/:packageId' element={<PackagesDetails />} />
          </Routes>
        </Suspense>
      </Router>

      <ToastContainer position='top-center' autoClose={2000} theme='colored' />
    </>
  )
}

export default App
