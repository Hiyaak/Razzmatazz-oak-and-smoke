import React from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MessageSquareText,
  PenLine,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import ApiService, { ImagePath } from '../../Services/Apiservice';
import RightPanelLayout from '../../Layout/RightPanelLayout';
import { RiShoppingBasketLine } from 'react-icons/ri';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const brandId = localStorage.getItem('brandId');

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  );

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleGotocheckout = async () => {
    const storedBrandId = localStorage.getItem('brandId');

    if (!storedBrandId) {
      toast.error('No brand selected');
      return;
    }

    const guestUserId = sessionStorage.getItem(`guestUserId_${storedBrandId}`);
    const registredUserId = localStorage.getItem(
      `registredUserId_${storedBrandId}`
    );

    if (!guestUserId && !registredUserId) {
      // User not logged in
      navigate('/login');
      return;
    }

    const userId = registredUserId || guestUserId;

    try {
      const { data } = await ApiService.get(`getAddressesByUser/${userId}`);
      if (data.status && data.addresses.length > 0) {
        navigate('/placeorder');
      } else {
        navigate('/adress');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Something went wrong while fetching your addresses.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar (40% on desktop, full on mobile) */}
      <div className="w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-2 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <h1 className="text-2xl font-semibold text-gray-900 text-center flex-1">
              Shopping Cart
            </h1>

            <div className="w-9" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Promotions Section */}
          <div>
            <div className="bg-gray-100 p-4">
              <h2 className="text-base font-semibold text-gray-800">
                Promotions
              </h2>
            </div>

            {/* White Box Container */}
            <div className="bg-white p-5 border-gray-300">
              <div className="flex items-center">
                {/* Tag Icon */}
                <PenLine className="w-5 h-5 text-gray-500 mr-3" />

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Enter promotion code"
                  className="w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1"
                />
              </div>
            </div>
          </div>

          {/* Special Remarks Section */}
          <div>
            <div className="bg-gray-100 p-4">
              <h2 className="text-base font-semibold text-gray-800">
                Special Remarks
              </h2>
            </div>

            {/* White Box Container */}
            <div className="bg-white p-5 border-gray-300">
              <div className="flex items-center">
                {/* Message Icon */}
                <MessageSquareText className="w-5 h-5 text-gray-500 mr-3" />

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Enter Your Special Remarks"
                  className="w-full bg-transparent border-b border-gray-300 focus:border-red-500 outline-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm pb-1"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div>
            <div className="bg-gray-100 p-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-800">Items</h2>
            </div>

            {cart.length === 0 ? (
              // Empty Cart State
              <div className="flex px-4 gap-5 py-10 bg-white">
                {/* Left: Shopping Icon */}
                <RiShoppingBasketLine className="w-16 h-16 text-red-300 relative top-3" />

                {/* Right: Text + Button */}
                <div>
                  <p className="text-gray-800 font-semibold mb-1">
                    Your cart is empty.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Add some items to your cart.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-5 py-2 border border-[#FA0303] text-[#FA0303] font-medium rounded-md hover:bg-red-50 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            ) : (
              // Cart Items List
              <div className="space-y-4 mt-1 px-4 border-b border-gray-200">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    {/* Edit Button */}
                    <button className="text-[#FA0303] text-sm font-medium mb-2">
                      edit
                    </button>

                    <div className="flex items-center justify-between">
                      {/* Product Image */}
                      <img
                        src={`${ImagePath}${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />

                      {/* Name */}
                      <div className="flex-1 px-4 mb-9">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                      </div>

                      {/* Price - Top Right */}
                      <div className="flex flex-col items-end">
                        <span className="text-[#FA0303] font-medium mb-5">
                          KD {(item.price * item.quantity).toFixed(3)}
                        </span>

                        {/* Quantity Controls - Circular Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className={`w-4 h-4 flex items-center justify-center border-2 rounded-full hover:bg-gray-100 transition-colors ${
                              item.quantity > 1
                                ? 'border-[#FA0303] text-[#FA0303]'
                                : 'border-gray-300 text-gray-300'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-0.5 text-center font-medium text-[#FA0303] text-sm border border-gray-300 rounded">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="w-4 h-4 flex items-center justify-center border-2 border-[#FA0303] rounded-full text-[#FA0303] hover:bg-red-50 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-[#f34f4f] text-sm font-medium"
                    >
                      remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary - Fixed at Bottom (No Scroll) */}
        {cart.length > 0 &&
          (!(selectedMethod && (selectedArea || selectedGovernate)) ? (
            // ❌ Location not selected — show "Select your location"
            <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
              <button
                onClick={() => navigate('/pickupdeviler')}
                className="w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors"
              >
                Select your location
              </button>
            </div>
          ) : (
            // ✅ Location selected — show "Go to checkout"
            <div
              className="p-3  bg-white flex-shrink-0"
              onClick={handleGotocheckout}
            >
              <button className="w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-between px-6">
                {/* Left - Items Count */}
                <div className="flex items-center">
                  <span className="bg-white/20 rounded-sm w-6 h-6 flex items-center justify-center text-sm">
                    {cart.length}
                  </span>
                </div>

                {/* Center - Checkout Text */}
                <span>Go to checkout</span>

                {/* Right - Total Price */}
                <span>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(3)}{' '}
                  KD
                </span>
              </button>
            </div>
          ))}
      </div>

      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  );
};

export default ShoppingCartPage;
