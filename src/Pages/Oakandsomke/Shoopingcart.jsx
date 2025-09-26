import React from "react";
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/concept.jpg";

const ShoppingCartPage = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from state management
  const cartItems = []; // Empty cart for now

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar (40% on desktop, full on mobile) */}
      <div className="w-full md:w-2/5 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/menu")}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Shopping Cart
          </h1>
        </div>

        {/* Promotions Section */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Promotions</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter promotion code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Items Section */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Items</h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Your cart is empty.</p>
              <p className="text-gray-500 text-sm mb-6">
                Add some items to your cart.
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Example cart item */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Item Name</h3>
                    <p className="text-gray-600 text-sm">Description</p>
                    <p className="text-gray-900 font-medium mt-1">$12.99</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-full hover:bg-gray-200">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-2">1</span>
                    <button className="p-1 rounded-full hover:bg-gray-200">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-red-100 ml-2">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary - Only show when cart has items */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
            <button className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Checkout
            </button>
          </div>
        )}
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

export default ShoppingCartPage;
