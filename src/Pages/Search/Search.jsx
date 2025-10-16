import { ArrowLeft, Search as SearchIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import ApiService, { ImagePath } from '../../Services/Apiservice'
import { useCart } from '../../Context/CartContext'
import RightPanelLayout from '../../Layout/RightPanelLayout'

const Search = () => {
  const navigate = useNavigate()
  const [subProducts, setSubProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const { cart, addToCart, updateQuantity } = useCart()

  // Fetch all products once
  const getAllSubProducts = async () => {
    try {
      const { data } = await ApiService.get(
        `getAllSubProductByBrandName/${encodeURIComponent('Oak and Smoke')}`
      )
      if (data.status) {
        setSubProducts(data.subproducts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllSubProducts()
  }, [])

  // Filter products when typing
  const handleSearch = e => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (query.trim() === '') {
      setFilteredProducts([])
      return
    }

    const filtered = subProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    )
    setFilteredProducts(filtered)
  }

  const getProductQuantity = productId => {
    const cartItem = cart.find(item => item._id === productId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-2/5 min-h-screen border-r border-gray-200 flex flex-col'>
        {/* Header — only input */}
        <div className='p-3 border-b border-gray-200 flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='p-2 hover:bg-gray-200 rounded-full transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-gray-600' />
          </button>

          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleSearch}
            className='w-full bg-transparent focus:outline-none text-md text-gray-800 placeholder-gray-400'
          />
        </div>

        {/* Product List */}
        {searchQuery && (
          <div className='flex-1 overflow-y-auto p-2'>
            {filteredProducts.length === 0 ? (
              <p className='text-gray-500 text-center py-6'>
                No products found
              </p>
            ) : (
              <ul className='space-y-3'>
                {filteredProducts.map(item => {
                  const quantity = getProductQuantity(item._id)

                  return (
                    <li
                      key={item._id}
                      className='flex flex-col gap-2 p-3 hover:bg-gray-50 transition cursor-pointer'
                    >
                      <div className='flex items-start gap-3'>
                        {/* Image */}
                        <img
                          src={`${ImagePath}${item.image}`}
                          alt={item.name}
                          className='w-16 h-16 object-cover rounded-md flex-shrink-0'
                        />

                        {/* Text + Price + Controls */}
                        <div className='flex-1 flex flex-col'>
                          {/* Name + Description */}
                          <div>
                            <h2 className='font-bold text-gray-900'>
                              {item.name}
                            </h2>
                            <p className='text-sm text-gray-600'>
                              {item.description}
                            </p>
                          </div>

                          {/* Price + Quantity Controls */}
                          <div className='flex justify-end items-center mt-2 gap-4'>
                            <span className='text-red-500 font-semibold whitespace-nowrap'>
                              {item.price} KD
                            </span>

                            {quantity === 0 ? (
                              <button
                                onClick={() => addToCart(item)}
                                className='border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-50 text-sm font-medium'
                              >
                                Add
                              </button>
                            ) : (
                              <div className='flex items-center border border-red-500 rounded-md overflow-hidden text-sm'>
                                <button
                                  onClick={() =>
                                    updateQuantity(item._id, quantity - 1)
                                  }
                                  className='bg-red-500 text-white px-2 py-1 hover:bg-red-600 transition-colors'
                                >
                                  -
                                </button>
                                <span className='px-3 font-semibold'>
                                  {quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item._id, quantity + 1)
                                  }
                                  className='bg-red-500 text-white px-2 py-1 hover:bg-red-600 transition-colors'
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  )
}

export default Search
