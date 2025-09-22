"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getCartFromStorage, saveCart, type CartItem } from "@/lib/data-manager"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (productId: number, quantity?: number, size?: string, color?: string) => void
  removeFromCart: (productId: number, size?: string, color?: string) => void
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number
  getCartItemQuantity: (productId: number, size?: string, color?: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    setCartItems(getCartFromStorage())
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cartItems)
  }, [cartItems])

  const addToCart = (productId: number, quantity = 1, size?: string, color?: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === productId && item.size === size && item.color === color,
      )

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prev, { productId, quantity, size, color }]
    })
  }

  const removeFromCart = (productId: number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size && item.color === color)),
    )
  }

  const updateQuantity = (productId: number, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color)
      return
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    // This would need product data to calculate total
    // For now, return 0 - will be implemented when products are loaded
    return 0
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartItemQuantity = (productId: number, size?: string, color?: string) => {
    const item = cartItems.find((item) => item.productId === productId && item.size === size && item.color === color)
    return item?.quantity || 0
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        getCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
