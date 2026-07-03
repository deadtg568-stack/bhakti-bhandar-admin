import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

const DELIVERY_CHARGE = 50
const FREE_DELIVERY_MIN = 500

function loadCart() {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsDrawerOpen(true)
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id, qty) => {
    if (qty < 1) return
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, quantity: qty } : i
    ))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const deliveryCharge = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_CHARGE
  const total = subtotal + deliveryCharge

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      deliveryCharge,
      total,
      isDrawerOpen,
      openDrawer,
      closeDrawer
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
