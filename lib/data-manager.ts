export interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
  images: string[]
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface CartItem {
  productId: number
  quantity: number
  size?: string
  color?: string
}

export interface WishlistItem {
  productId: number
}

// Load data from JSON files
export async function loadProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/data/products.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error("Error loading products:", error)
    return []
  }
}

export async function loadCategories(): Promise<Category[]> {
  try {
    const response = await fetch("/data/categories.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.categories
  } catch (error) {
    console.error("Error loading categories:", error)
    return []
  }
}

export async function loadCart(): Promise<CartItem[]> {
  try {
    const response = await fetch("/data/cart.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.items
  } catch (error) {
    console.error("Error loading cart:", error)
    return []
  }
}

export async function loadWishlist(): Promise<WishlistItem[]> {
  try {
    const response = await fetch("/data/wishlist.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.items
  } catch (error) {
    console.error("Error loading wishlist:", error)
    return []
  }
}

// Save data to JSON files (for demo purposes - in real app would use API)
export async function saveCart(items: CartItem[]): Promise<void> {
  // In a real application, this would make an API call
  // For demo purposes, we'll use localStorage
  localStorage.setItem("lunaris-cart", JSON.stringify({ items }))
}

export async function saveWishlist(items: WishlistItem[]): Promise<void> {
  // In a real application, this would make an API call
  // For demo purposes, we'll use localStorage
  localStorage.setItem("lunaris-wishlist", JSON.stringify({ items }))
}

// Reset data function
export async function resetData(): Promise<void> {
  localStorage.removeItem("lunaris-cart")
  localStorage.removeItem("lunaris-wishlist")
}

// Get data from localStorage (fallback for demo)
export function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem("lunaris-cart")
    return data ? JSON.parse(data).items : []
  } catch {
    return []
  }
}

export function getWishlistFromStorage(): WishlistItem[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem("lunaris-wishlist")
    return data ? JSON.parse(data).items : []
  } catch {
    return []
  }
}

// Format price in Vietnamese currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}
