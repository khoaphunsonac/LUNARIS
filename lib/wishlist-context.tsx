"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getWishlistFromStorage, saveWishlist, type WishlistItem } from "@/lib/data-manager"

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  getWishlistCount: () => number
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setWishlistItems(getWishlistFromStorage())
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    saveWishlist(wishlistItems)
  }, [wishlistItems])

  const addToWishlist = (productId: number) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.productId === productId)
      if (exists) return prev
      return [...prev, { productId }]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.productId === productId)
  }

  const getWishlistCount = () => {
    return wishlistItems.length
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
