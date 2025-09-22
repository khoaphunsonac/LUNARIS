"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { useCart } from "@/lib/cart-context"
import { loadProducts, formatPrice, resetData, type Product } from "@/lib/data-manager"

interface CartItemWithProduct {
  productId: number
  quantity: number
  size?: string
  color?: string
  product: Product
}

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [cartItemsWithProducts, setCartItemsWithProducts] = useState<CartItemWithProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartProducts = async () => {
      const products = await loadProducts()
      const itemsWithProducts = cartItems
        .map((item) => {
          const product = products.find((p) => p.id === item.productId)
          return product ? { ...item, product } : null
        })
        .filter((item): item is CartItemWithProduct => item !== null)

      setCartItemsWithProducts(itemsWithProducts)
      setLoading(false)
    }

    fetchCartProducts()
  }, [cartItems])

  const calculateSubtotal = () => {
    return cartItemsWithProducts.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    return subtotal >= 500000 ? 0 : 30000 // Free shipping over 500k VND
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  }

  const handleCheckoutComplete = () => {
    clearCart()
    // Có thể thêm toast notification ở đây
    window.location.href = "/shop"
  }

  const handleResetData = async () => {
    await resetData()
    clearCart()
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded" />
                ))}
              </div>
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Giỏ hàng</h1>
            <p className="text-muted-foreground">{cartItemsWithProducts.length} sản phẩm trong giỏ hàng</p>
          </div>
        </div>

        {/* Reset Data Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleResetData}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            Reset Data
          </Button>
        </div>

        {cartItemsWithProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Giỏ hàng trống</h2>
            <p className="text-muted-foreground mb-6">Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
            <Button asChild>
              <Link href="/shop">Tiếp tục mua sắm</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {cartItemsWithProducts.map((item, index) => (
                      <div key={`${item.productId}-${item.size}-${item.color}`}>
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.product.id}`}>
                              <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                                {item.product.name}
                              </h3>
                            </Link>

                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              {item.size && <span>Size: {item.size}</span>}
                              {item.color && <span>Màu: {item.color}</span>}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() =>
                                    updateQuantity(item.productId, item.quantity - 1, item.size, item.color)
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const newQuantity = Number.parseInt(e.target.value) || 1
                                    updateQuantity(item.productId, newQuantity, item.size, item.color)
                                  }}
                                  className="w-16 text-center"
                                  min="1"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() =>
                                    updateQuantity(item.productId, item.quantity + 1, item.size, item.color)
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="font-semibold text-primary">
                                  {formatPrice(item.product.price * item.quantity)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => removeFromCart(item.productId, item.size, item.color)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < cartItemsWithProducts.length - 1 && <Separator className="mt-6" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>{formatPrice(calculateSubtotal())}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phí vận chuyển</span>
                      <span className={calculateShipping() === 0 ? "text-green-600" : ""}>
                        {calculateShipping() === 0 ? "Miễn phí" : formatPrice(calculateShipping())}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Tổng cộng</span>
                      <span className="text-primary">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>

                  <CheckoutDialog 
                    total={calculateTotal()} 
                    onCheckoutComplete={handleCheckoutComplete}
                  >
                    <Button className="w-full mt-6 bg-accent hover:bg-accent/90" size="lg">
                      Thanh toán
                    </Button>
                  </CheckoutDialog>

                  <div className="mt-4 text-center">
                    <Link href="/shop">
                      <Button variant="ghost" className="text-sm">
                        Tiếp tục mua sắm
                      </Button>
                    </Link>
                  </div>

                  {calculateShipping() > 0 && (
                    <div className="mt-4 p-3 bg-muted rounded-md text-sm text-center">
                      Mua thêm {formatPrice(500000 - calculateSubtotal())} để được miễn phí vận chuyển
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
