import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [brandId, setBrandId] = useState(localStorage.getItem('brandId'))

  //  Watch brand change (multi-brand support)
  useEffect(() => {
    const handleStorageChange = () => {
      const newBrandId = localStorage.getItem('brandId')
      if (newBrandId !== brandId) {
        setBrandId(newBrandId)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [brandId])

  //  Load cart for brand
  useEffect(() => {
    if (!brandId) return

    const savedCart = localStorage.getItem(`shoppingCart_${brandId}`)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (err) {
        console.error('Invalid cart data', err)
        setCart([])
      }
    } else {
      setCart([])
    }
  }, [brandId])

  // Persist cart
  useEffect(() => {
    if (brandId) {
      localStorage.setItem(`shoppingCart_${brandId}`, JSON.stringify(cart))
    }
  }, [cart, brandId])

  // ===============================
  //  CART ACTIONS (PRODUCT + COMBO)
  // ===============================

  // ➕ Add product or combo
  const addToCart = item => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.cartItemId === item.cartItemId
      )

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.cartItemId === item.cartItemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  //  Remove product or combo
  const removeFromCart = cartItemId => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId))
  }

  // Update quantity
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  //  Clear cart
  const clearCart = () => {
    setCart([])
    if (brandId) {
      localStorage.removeItem(`shoppingCart_${brandId}`)
    }
  }

  //  Totals
  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const getCartItemsCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
