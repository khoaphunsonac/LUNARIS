"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartItemsCount } = useCart()
  const { getWishlistCount } = useWishlist()
  const cartItemsCount = getCartItemsCount()
  const wishlistCount = getWishlistCount()

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground">
          <div>Miễn phí vận chuyển cho đơn hàng từ 500.000đ</div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/about" className="hover:text-foreground">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Liên hệ
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            LUNARIS
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input type="text" placeholder="Tìm kiếm sản phẩm..." className="pr-10" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center py-3 border-t border-border">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary font-medium">
              Trang chủ
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary font-medium">
              Cửa hàng
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary font-medium">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary font-medium">
              Liên hệ
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input type="text" placeholder="Tìm kiếm sản phẩm..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/" className="py-2 text-foreground hover:text-primary font-medium">
                  Trang chủ
                </Link>
                <Link href="/shop" className="py-2 text-foreground hover:text-primary font-medium">
                  Cửa hàng
                </Link>
                <Link href="/about" className="py-2 text-foreground hover:text-primary font-medium">
                  Về chúng tôi
                </Link>
                <Link href="/contact" className="py-2 text-foreground hover:text-primary font-medium">
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
