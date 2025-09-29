

import React from "react";
import {
  ArrowLeft,
  ShoppingCart,
  FileText,
  Clock,
  Mail,
  Info,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import heroImage from "../../assets/concept.jpg";

const Menu = () => {
 
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-semibold text-gray-900">Menu</h1>
        </div>

        {/* Navigation Items */}
        <div className="p-6 space-y-3 flex-1">
          <button className="w-full p-3 flex items-center space-x-3 text-left rounded-lg hover:bg-gray-100 transition">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">My Cart</span>
          </button>

          <button className="w-full p-3 flex items-center space-x-3 text-left rounded-lg hover:bg-gray-100 transition">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Menu</span>
          </button>

          <button className="w-full p-3 flex items-center space-x-3 text-left rounded-lg hover:bg-gray-100 transition">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">My Orders</span>
          </button>
        </div>

        {/* Sign in section */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Sign in with</h2>
            <Info className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-3">
            {/* Email */}
            <button className="w-full flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 font-medium">Email</span>
            </button>

            {/* Apple */}
            <button className="w-full flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Apple</span>
            </button>

            {/* Google */}
            <button className="w-full flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <div className="w-6 h-6 rounded flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Google</span>
            </button>
          </div>
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

export default Menu;



