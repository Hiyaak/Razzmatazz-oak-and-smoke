import React, { useEffect, useState } from 'react';
import RightPanelLayout from '../../Layout/RightPanelLayout';
import {
  ArrowLeft,
  ShoppingCart,
  FileText,
  Clock,
  MapPin,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/Apiservice';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import { MdMenuBook, MdOutlineMoreTime, MdDelete, MdApartment } from 'react-icons/md';


const Userprofile = () => {
  const [profile, setProfile] = useState(null);
  const [userAdress, setUserAdress] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // ✅ NEW STATES FOR DELETE MODAL
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const navigate = useNavigate();
  const storedBrandId = localStorage.getItem('brandId');
  const registredUserId = localStorage.getItem(
    `registredUserId_${storedBrandId}`
  );

  const fetchProfile = async () => {
    if (!registredUserId) {
      toast.error('User not found. Please log in again.');
      navigate('/profile');
      return;
    }
    try {
      const payload = { id: registredUserId };
      const { data } = await ApiService.post('getProfileById', payload);
      if (data.status) {
        setProfile(data.profile);
      } else {
        toast.error(data.message || 'Failed to load profile.');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Something went wrong while loading your profile.');
    }
  };

  const fetchAdress = async () => {
    try {
      const { data } = await ApiService.get(
        `getAddressesByUser/${registredUserId}`
      );
      if (data.status) {
        setUserAdress(data.addresses);
      } else {
        toast.error('Failed to load adress');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Something went wrong while loading your profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAdress();
  }, []);

  const handleSignOut = () => {
    const storedBrandId = localStorage.getItem('brandId');
    if (storedBrandId) {
      localStorage.removeItem(`registredUserId_${storedBrandId}`);
    }
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/usercheckout', { state: { profile } });
  };

  const handleDeleteadress = async (id) => {
    try {
      const { data } = await ApiService.delete(`deleteAddress`, {
        address_id: id,
      });
      if (data.status) {
        setUserAdress((prev) => prev.filter((addr) => addr._id !== id));
        toast.success('Address deleted successfully!');
      }
    } catch (error) {
      console.error('Error in delete:', error);
    }
  };

  // ✅ FIXED VERSION — deletes user & clears entire localStorage
  const handleAccountDelete = async () => {
    if (deleteConfirmText !== 'Delete') return;

    try {
      const { data } = await ApiService.delete(
        `deleteUser/${registredUserId}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (data.status) {
        toast.success('Account deleted successfully!');

        // ✅ Clear ALL local storage data
        localStorage.clear();

        // ✅ Redirect to home page
        navigate('/');
      } else {
        toast.error(data.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Something went wrong while deleting your account.');
    }
  };

  const menuItems = [
    {
      icon: <FaShoppingCart className="w-5 h-5 text-gray-600 font-semibold" />,
      label: 'My cart',
      path: '/shoopingcart',
    },
    {
      icon: <MdMenuBook className="w-5 h-5 text-gray-600" />,
      label: 'Menu',
      path: '/',
    },
    {
      icon: <MdOutlineMoreTime className="w-5 h-5 text-gray-600" />,
      label: 'My orders',
      path: '/myorders',
    },
    {
      icon: <MdApartment className="w-5 h-5 text-gray-600" />,
      label: 'Delivery addresses',
      onClick: () => setShowAddressModal(true),
    },
    {
      icon: <MdDelete className="w-5 h-5 text-[#FA0303]" />,
      label: 'Delete account',
      isDelete: true,
      onClick: () => setShowDeleteModal(true), // ✅ OPEN MODAL
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col relative">
        {/* Header */}
        <div className="p-2 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-9" />
          </div>
        </div>
        {/* Profile Section */}
        <div className="p-4 border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-700">Profile</h1>
            <button
              onClick={handleSignOut}
              className="text-[#FA0303] font-semibold text-md "
            >
              sign out
            </button>
          </div>

          <div className="flex items-start gap-4 mt-6">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8
                1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900 mb-1">
                {profile?.firstName || profile?.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : ''}
              </h2>
              <p className="text-md text-gray-600 mb-0.5">{profile?.email}</p>
              {profile?.mobileNumber && (
                <p className="text-md text-gray-600 mb-1">
                  +965{profile.mobileNumber}
                </p>
              )}
              <button
                onClick={handleEditProfile}
                className="text-[#FA0303] font-semibold text-md"
              >
                edit
              </button>
            </div>
          </div>
        </div>
        {/* Menu Section */}
        <div className="px-6 py-3 flex-shrink-0">
          <h1 className="text-xl font-semibold text-gray-700">Menu</h1>
        </div>
        <div className="flex-1 overflow-y-auto border-t border-gray-200">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick || (() => navigate(item.path))}
              className={`w-full px-6 py-3 flex items-center gap-4 text-left hover:bg-gray-50 transition border-b border-gray-200 ${
                item.isDelete ? 'text-[#FA0303] font-semibold' : 'text-gray-700'
              }`}
            >
              {item.icon}
              <span className="flex-1 font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
        {/* Address Modal (UNCHANGED) */}
        {showAddressModal && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end"
            onClick={() => setShowAddressModal(false)}
          >
            <div
              className="bg-white w-full max-h-[80vh] flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 overflow-y-auto p-4">
                {userAdress && userAdress.length > 0 ? (
                  <div className="space-y-2">
                    {userAdress.map((address, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 hover:border-[#FA0303] transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {address.type || ''}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {address.Street || ''}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              {address.Building &&
                                `Building: ${address.Building}`}
                              {address.floor && `, Floor: ${address.floor}`}
                              {address.Apartment &&
                                `, Apt: ${address.Apartment}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.area && `${address.area}, `}
                              {address.city || ''}
                            </p>
                            {address.additional && (
                              <p className="text-xs text-gray-500 mt-2">
                                Note: {address.additional}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteadress(address._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <p className="text-center font-semibold text-base">
                      You don't have saved addresses
                    </p>
                  </div>
                )}
              </div>
              <div className="px-3 py-2 flex-shrink-0">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="w-full bg-[#FA0303] text-white py-2 rounded font-medium hover:bg-red-600 transition-colors text-base"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Delete Account Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => {
              setShowDeleteModal(false);
              setDeleteConfirmText('');
            }}
          >
            <div
              className="bg-white w-[90%] md:w-[400px] p-6 rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold mb-4">
                Delete your account
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete your account? You will lose all
                data associated with it.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                To proceed, please type the word{' '}
                <span className="font-semibold">“Delete”</span> below
              </p>

              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type here"
                className="w-full border-b border-gray-300 outline-none focus:border-red-500 pb-1 placeholder:text-gray-400 text-sm mb-6"
              />

              <div className="flex justify-end">
                <button
                  disabled={deleteConfirmText !== 'Delete'}
                  onClick={handleAccountDelete}
                  className={`text-sm ${
                    deleteConfirmText === 'Delete'
                      ? 'text-red-600 font-semibold'
                      : 'text-gray-400'
                  }`}
                >
                  DELETE MY ACCOUNT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <RightPanelLayout />

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Userprofile;
