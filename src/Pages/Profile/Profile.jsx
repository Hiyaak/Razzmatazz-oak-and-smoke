import React, { useState } from 'react'
import {
  ArrowLeft,
  ShoppingCart,
  FileText,
  Clock,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import ApiService from '../../Services/Apiservice'
import { toast } from 'react-toastify'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { FaShoppingCart } from 'react-icons/fa'
import { MdMenuBook, MdOutlineMoreTime } from 'react-icons/md'
import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase/firebaseConfig"; 
import * as Yup from 'yup'
import { Formik, Form } from 'formik'

const MenuPage = () => {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState('menu') // 'menu' | 'form'
  const [activeTab, setActiveTab] = useState('register')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [formData, setFormData] = useState({ email: '', password: '' })

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  })

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  })

  // const handleInputChange = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }
  const storedBrandId = localStorage.getItem('brandId')

  // const handleRegisterUser = async values => {
  //   try {
  //     const payload = {
  //       email: values.email,
  //       password: values.password,
  //       brandId: storedBrandId
  //     }

  //     const { data } = await ApiService.post('registerWithEmail', payload)

  //     if (data.status) {
  //       sessionStorage.setItem('pendingEmail', values.email)

  //       if (data.otp) {
  //         sessionStorage.setItem('pendingOtp', data.otp)
  //         console.log('📩 OTP from backend:', data.otp)
  //       }

  //       navigate('/otpverification')
  //     } else {
  //       toast.error(data.message || 'Registration failed')
  //     }
  //   } catch (error) {
  //     console.error('Registration error:', error)
  //     toast.error('Something went wrong during registration')
  //   }
  // }

//  const handleRegisterUser = async values => {
//   try {
//     // 1️⃣ Request permission
//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       toast.error("Notifications permission denied");
//       return;
//     }

//     // 2️⃣ Generate NEW FCM token for THIS user
//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const newToken = await getToken(messaging, { vapidKey });

//     console.log("📱 New User FCM Token:", newToken);

//     // 3️⃣ Build payload with NEW token
//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: newToken || ""
//     };

//     // 4️⃣ Save token for later use (optional)
//     localStorage.setItem("fcmToken", newToken);

//     // 5️⃣ API call
//     const { data } = await ApiService.post('registerWithEmail', payload);

//     if (data.status) {
//       sessionStorage.setItem('pendingEmail', values.email);

//       if (data.otp) {
//         sessionStorage.setItem('pendingOtp', data.otp);
//         console.log("📩 OTP:", data.otp);
//       }

//       navigate("/otpverification");
//     } else {
//       toast.error(data.message || "Registration failed");
//     }
//   } catch (error) {
//     console.error("Registration error:", error);
//     toast.error("Something went wrong during registration");
//   }
// };



// const handleRegisterUser = async (values) => {
//   try {
//     console.log("🔄 Registering user…");

//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       toast.error("Please allow notifications");
//       return;
//     }

//     // Auto-detect correct path for service worker
//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("🧩 SW Registered:", registration);

//     // Remove old token
//     try {
//       await deleteToken(messaging);
//       console.log("🧹 Old token deleted");
//     } catch (e) {}

//     // Generate new token
//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("📱 NEW FCM TOKEN:", fcmToken);

//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: fcmToken,
//     };

//     const { data } = await ApiService.post("registerWithEmail", payload);

//     if (data.status) {
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);
//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Registration failed");
//   }
// };

// const handleRegisterUser = async (values) => {
//   try {
//     console.log("🔄 Registering user…");

//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       toast.error("Please allow notifications");
//       return;
//     }

//     // Auto detect correct service worker path
//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("🧩 SW Registered:", registration);

//     // Generate FCM token
//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("📱 NEW FCM TOKEN:", fcmToken);

//     if (!fcmToken) {
//       toast.error("Failed to generate FCM token");
//       return;
//     }

//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: fcmToken,
//     };

//     const { data } = await ApiService.post("registerWithEmail", payload);

//     if (data.status) {
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);
//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Registration failed");
//   }
// };

// const handleRegisterUser = async (values) => {
//   try {
//     console.log("🔄 Registering new user…");

//     // 1️⃣ Ask for notification permission first
//     const permission = await Notification.requestPermission();
//     console.log("📌 Permission:", permission);

//     if (permission !== "granted") {
//       toast.error("Please allow notifications to continue.");
//       return;
//     }

//     // 2️⃣ Correct SW path
//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     // 3️⃣ Register service worker
//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("🧩 SW Registered:", registration);

//     // 4️⃣ Generate FCM token
//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("🔥 NEW FCM TOKEN:", fcmToken);

//     if (!fcmToken) {
//       toast.error("❌ Failed to generate FCM token");
//       return;
//     }

//     // 5️⃣ Prepare payload for backend
//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: fcmToken,
//     };

//     // 6️⃣ Send to backend
//     const { data } = await ApiService.post("registerWithEmail", payload);

//     if (data.status) {
//       // Save OTP & email temporarily
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);

//       toast.success("Account created! OTP sent.");
//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Registration failed.");
//   }
// }; 

// const handleRegisterUser = async (values) => {
//   try {
//     console.log("🔄 Registering new user…");

//     // 1️⃣ Ask permission
//     const permission = await Notification.requestPermission();
//     console.log("📌 Permission:", permission);

//     if (permission !== "granted") {
//       toast.error("Please allow notifications to continue.");
//       return;
//     }

//     // 2️⃣ Correct SW path for BOTH dev & production
//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     console.log("🛠 SW Path used:", swPath);

//     // 3️⃣ Register service worker
//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("🧩 SW Registered:", registration);

//     // 4️⃣ Generate NEW FCM token
//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("🔥 NEW FCM TOKEN:", fcmToken);

//     if (!fcmToken) {
//       toast.error("Unable to generate FCM token");
//       return;
//     }

//     // 5️⃣ Send token to backend
//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: fcmToken,
//     };

//     const { data } = await ApiService.post("registerWithEmail", payload);

//     if (data.status) {
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);
//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error("🔥 Registration error:", error);
//     toast.error("Something went wrong.");
//   }
// };

// const handleRegisterUser = async (values) => {
//   try {
//     console.log("STEP 1: Asking notification permission...");

//     const permission = await Notification.requestPermission();
//     console.log("STEP 2: Permission result =", permission);

//     if (permission !== "granted") {
//       toast.error("Please allow notifications");
//       return;
//     }

//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     console.log("STEP 3: Service worker path =", swPath);

//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("STEP 4: SW registration object =", registration);

//     console.log("STEP 5: Generating FCM token...");

//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("STEP 6: NEW FCM TOKEN =", fcmToken);

//     if (!fcmToken) {
//       toast.error("Failed to generate FCM token");
//       return;
//     }

//     localStorage.setItem("fcmToken", fcmToken);

//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: fcmToken
//     };

//     const { data } = await ApiService.post("registerWithEmail", payload);

//     if (data.status) {
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);
//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (err) {
//     console.error("🔥 Registration error =", err);
//   }
// };

// const handleRegisterUser = async (values) => {
//   try {
//     console.log("STEP 1: Asking notification permission...");

//     const permission = await Notification.requestPermission();
//     console.log("STEP 2: Permission result =", permission);

//     if (permission !== "granted") {
//       toast.error("Please allow notifications");
//       return;
//     }

//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     console.log("STEP 3: Service worker path =", swPath);

//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("STEP 4: SW registration object =", registration);

//     console.log("STEP 5: Generating FCM token...");

//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("STEP 6: NEW FCM TOKEN =", fcmToken);

//     if (!fcmToken) {
//       toast.error("Failed to generate FCM token");
//       return;
//     }

//     // Save token locally
//     localStorage.setItem("fcmToken", fcmToken);

//     // ⭐ IMPORTANT FIX — SEND correct key: fcmToken
//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       fcmToken: fcmToken,   // <-- FIXED
//     };

//     const { data } = await ApiService.post("registerWithEmail", payload);

//     if (data.status) {
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);
//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (err) {
//     console.error("🔥 Registration error =", err);
//   }
// };

// const handleRegisterUser = async (values) => {
//   try {
//     console.log("STEP 1: Asking notification permission...");

//     const permission = await Notification.requestPermission();
//     console.log("STEP 2: Permission result =", permission);

//     if (permission !== "granted") {
//       toast.error("Please allow notifications");
//       return;
//     }

//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     console.log("STEP 3: Service worker path =", swPath);

//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("STEP 4: SW registration =", registration);

//     console.log("STEP 5: Generating FCM token...");

//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("STEP 6: NEW FCM TOKEN =", fcmToken);

//     if (!fcmToken) {
//       toast.error("Failed to generate FCM token");
//       return;
//     }

//     // Save token locally
//     localStorage.setItem("fcmToken", fcmToken);

//     // IMPORTANT — MUST MATCH BACKEND PARAM NAME
//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: fcmToken,  // <-- Backend expects 'token'
//     };

//     const { data } = await ApiService.post("registerWithEmail", payload);

//     console.log("Register API response:", data);

//     if (data.status) {
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);
//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (err) {
//     console.error("🔥 Registration error =", err);
//   }
// };


// const handleRegisterUser = async (values) => {
//   try {
//     console.log("STEP 1: Asking notification permission...");

//     const permission = await Notification.requestPermission();
//     console.log("STEP 2: Permission result =", permission);

//     if (permission !== "granted") {
//       toast.error("Please allow notifications");
//       return;
//     }

//     const swPath =
//       import.meta.env.MODE === "production"
//         ? "/oakandsmoke/firebase-messaging-sw.js"
//         : "/firebase-messaging-sw.js";

//     console.log("STEP 3: Service worker path =", swPath);

//     const registration = await navigator.serviceWorker.register(swPath);
//     console.log("STEP 4: SW registration =", registration);

//     console.log("STEP 5: Generating FCM token...");

//     const vapidKey =
//       "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//     const fcmToken = await getToken(messaging, {
//       vapidKey,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("STEP 6: NEW FCM TOKEN =", fcmToken);

//     if (!fcmToken) {
//       toast.error("Failed to generate FCM token");
//       return;
//     }

//     // Store token for later use
//     localStorage.setItem("fcmToken", fcmToken);

//     // MUST MATCH BACKEND — backend expects "token"
//     const payload = {
//       email: values.email,
//       password: values.password,
//       brandId: storedBrandId,
//       token: fcmToken,   // <-- IMPORTANT
//     };

//     const { data } = await ApiService.post("registerWithEmail", payload);

//     if (data.status) {
//       // store email & OTP temporarily
//       sessionStorage.setItem("pendingEmail", values.email);
//       sessionStorage.setItem("pendingOtp", data.otp);

//       navigate("/otpverification");
//     } else {
//       toast.error(data.message);
//     }
//   } catch (err) {
//     console.error("🔥 Registration error =", err);
//     toast.error("Something went wrong during registration.");
//   }
// };

const handleRegisterUser = async (values) => {
  try {
    console.log("STEP 1: Asking notification permission...");
    
    // Request notification permission
    const permission = await Notification.requestPermission();
    console.log("STEP 2: Permission result =", permission);
    
    if (permission !== "granted") {
      toast.error("Please allow notifications to continue with registration");
      return;
    }

    // Determine service worker path based on environment
    const swPath = import.meta.env.MODE === "production" 
      ? "/oakandsmoke/firebase-messaging-sw.js" 
      : "/firebase-messaging-sw.js";
    
    console.log("STEP 3: Service worker path =", swPath);

    // Register service worker
    const registration = await navigator.serviceWorker.register(swPath);
    console.log("STEP 4: SW registration successful =", registration);

    console.log("STEP 5: Generating FCM token...");
    
    // VAPID key for FCM
    const vapidKey = "BLoCrkSlGVLc0e3Q-QZqvByyFyEIZ9JQEQcZyAiOLkwVEXm7m_RxNzzSAsUmnvozhuOs69mvVoJPqvlr8dNUdMM";
    
    // Generate FCM token
    const fcmToken = await getToken(messaging, { 
      vapidKey, 
      serviceWorkerRegistration: registration 
    });
    
    console.log("STEP 6: NEW FCM TOKEN =", fcmToken);

    if (!fcmToken) {
      toast.error("Failed to generate notification token");
      return;
    }

    // Store token in localStorage for future use
    localStorage.setItem("fcmToken", fcmToken);

    // Prepare registration payload
    const payload = {
      email: values.email,
      password: values.password,
      brandId: storedBrandId,
      token: fcmToken, // Must match backend expectation
    };

    // Send registration request to API
    const { data } = await ApiService.post("registerWithEmail", payload);
    console.log("data error:-",data)

    if (data.status) {
      // Store temporary data for OTP verification
      sessionStorage.setItem("pendingEmail", values.email);
      sessionStorage.setItem("pendingOtp", data.otp);
      
      // Navigate to OTP verification page
      navigate("/otpverification");
    } else {
      toast.error(data.message || "Registration failed");
    }

  } catch (error) {
    console.error("🔥 Registration error =", error);
    
    // More specific error handling
    if (error.name === "NotAllowedError") {
      toast.error("Notification permission denied. Please enable notifications in browser settings.");
    } else if (error.message?.includes("service worker")) {
      toast.error("Failed to setup notifications. Please try again.");
    } else {
      toast.error("Something went wrong during registration. Please try again.");
    }
  }
};








  const handleLoginUser = async values => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        brandId: storedBrandId
      }

      const { data } = await ApiService.post('loginWithEmail', payload)

      if (data.status) {
        localStorage.setItem(`registredUserId_${storedBrandId}`, data.user._id)
        toast.success('Login successful!')
        navigate('/')
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Something went wrong')
    }
  }

  const menuItems = [
    {
      icon: <FaShoppingCart className='w-5 h-5 text-gray-600 font-semibold' />,
      label: 'My Cart',
      path: '/shoopingcart'
    },
    {
      icon: <MdMenuBook className='w-5 h-5 text-gray-600' />,
      label: 'Menu',
      path: '/'
    },
    {
      icon: <MdOutlineMoreTime className='w-5 h-5 text-gray-600' />,
      label: 'My Orders',
      path: '/myorders'
    }
  ]
  return (
    <div className='flex flex-col md:flex-row h-screen overflow-hidden'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] min-h-screen border-r border-gray-200 flex flex-col relative'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => {
                if (activeView === 'form') setActiveView('menu')
                else navigate('/')
              }}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div className='w-9' />
          </div>
        </div>

        {activeView === 'menu' ? (
          <>
            {' '}
            {/* Menu Header */}
            <div className='p-4 border-b border-gray-200'>
              <div className='flex items-center justify-between mb-1'>
                <h1 className='text-2xl font-semibold text-gray-900'>Menu</h1>
                <div className='w-9' />
              </div>
            </div>
            {/* Menu Items */}
            <div className='border-b border-gray-200'>
              {menuItems.map((item, i, arr) => (
                <button
                  key={i}
                  onClick={() => navigate(item.path)} // ✅ navigate to route
                  className={`w-full p-3 flex items-center space-x-3 text-left hover:bg-gray-50 transition ${
                    i !== arr.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  {item.icon}
                  <span className='text-gray-700 font-medium'>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Sign In Section */}
            <div className='p-4'>
              <div className='flex items-center justify-between mb-1'>
                <h1 className='text-2xl font-semibold text-gray-900'>
                  Sign in with
                </h1>
                <div className='w-9' />
              </div>
            </div>
            {/* Sign In Options */}
            <div className='flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-200 overflow-hidden'>
              {[
                {
                  icon: (
                    <div className='w-6 h-6 bg-orange-500 rounded flex items-center justify-center'>
                      <Mail className='w-4 h-4 text-white' />
                    </div>
                  ),
                  label: 'Email',
                  onClick: () => setActiveView('form')
                },
                {
                  icon: (
                    <div className='w-6 h-6 bg-black rounded flex items-center justify-center'>
                      <svg
                        className='w-4 h-4 text-white'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                      >
                        <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
                      </svg>
                    </div>
                  ),
                  label: 'Apple'
                },
                {
                  icon: (
                    <div className='w-6 h-6 rounded flex items-center justify-center'>
                      <svg className='w-6 h-6' viewBox='0 0 24 24'>
                        <path
                          fill='#4285F4'
                          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                        />
                        <path
                          fill='#34A853'
                          d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                        />
                        <path
                          fill='#FBBC05'
                          d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                        />
                        <path
                          fill='#EA4335'
                          d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                        />
                      </svg>
                    </div>
                  ),
                  label: 'Google'
                }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.onClick}
                  className='w-full flex items-center space-x-4 p-3 text-left hover:bg-gray-50 transition'
                >
                  {item.icon}
                  <span className='text-gray-700 font-medium'>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <Formik
            initialValues={formData}
            enableReinitialize
            validationSchema={
              activeTab === 'login' ? loginSchema : registerSchema
            }
            onSubmit={values =>
              activeTab === 'login'
                ? handleLoginUser(values)
                : handleRegisterUser(values)
            }
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <Form className='flex flex-col h-full flex-1 relative'>
                <div
                  className='px-4 pb-24 overflow-y-auto flex-1 
      [&::-webkit-scrollbar]:hidden 
      [-ms-overflow-style:none] 
      [scrollbar-width:none]'
                >
                  {/* Tab Navigation UI untouched */}
                  <div className='flex gap-3 mt-6 mb-8'>
                    <button
                      onClick={() => setActiveTab('login')}
                      type='button'
                      className={`flex-1 py-2 rounded-md font-medium transition-all ${
                        activeTab === 'login'
                          ? 'bg-[#0099CC] text-white'
                          : 'bg-white text-cyan-500 border-2 border-[#0099CC]'
                      }`}
                    >
                      Login
                    </button>

                    <button
                      onClick={() => setActiveTab('register')}
                      type='button'
                      className={`flex-1 py-2 rounded-md font-medium transition-all ${
                        activeTab === 'register'
                          ? 'bg-[#0099CC] text-white'
                          : 'bg-white text-cyan-500 border-2 border-[#0099CC]'
                      }`}
                    >
                      Register
                    </button>
                  </div>

                  <h2 className='text-2xl font-bold text-gray-700 mb-8'>
                    {activeTab === 'login' ? 'Login' : 'Register'}
                  </h2>

                  {/* --- FORM FIELDS --- */}
                  <div className='space-y-4'>
                    {/* Email */}
                    <div>
                      <label className='block text-sm text-gray-500 mb-2'>
                        Email *
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        className='w-full text-base border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 outline-none transition-colors'
                      />
                      {errors.email && touched.email && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className='block text-sm text-gray-500 mb-2'>
                        Password *
                      </label>
                      <div className='relative'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          className='w-full pr-10 text-base border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 outline-none transition-colors'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                          {showPassword ? (
                            <EyeOff className='w-5 h-5' />
                          ) : (
                            <Eye className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* SOCIAL LOGIN UI stays same */}
                    <div>
                      <h3 className='text-lg font-bold text-gray-700 mb-4'>
                        Login with
                      </h3>
                      <div className='space-y-4'>
                        {/* Apple */}
                        <button
                          type='button'
                          className='w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                          {/* ICON SVG remains */}
                          Apple
                        </button>

                        {/* Google */}
                        <button
                          type='button'
                          className='w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                          {/* ICON SVG remains */}
                          Google
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='p-3 bg-white sticky bottom-0'>
                  <button
                    type='submit'
                    className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors text-center'
                  >
                    {activeTab === 'login' ? 'Login' : 'Register'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default MenuPage
