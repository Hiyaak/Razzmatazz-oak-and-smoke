// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { CartProvider } from './Context/CartContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <CartProvider>
//     <App />
//   </CartProvider>
// )


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

// ✅ REGISTER FIREBASE SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("🔥 Service Worker registered successfully:", registration);
    })
    .catch((err) => {
      console.log("❌ Service Worker registration failed:", err);
    });
}

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);
