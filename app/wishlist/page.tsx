"use client"

import { useEffect, useState } from "react"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { loadProducts, resetData, type Product } from "@/lib/data-manager"
import { useWishlist } from "@/lib/wishlist-context"

export default function WishlistPage() {
  const { wishlistItems, clearWishlist } = useWishlist()
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      const products = await loadProducts()
      const wishlistProductIds = wishlistItems.map((item) => item.productId)
      const filteredProducts = products.filter((product) => wishlistProductIds.includes(product.id))
      setWishlistProducts(filteredProducts)
      setLoading(false)
    }
    fetchWishlist()
  }, [wishlistItems])

  const handleResetData = async () => {
    await resetData()
    clearWishlist()
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <div className="aspect-square bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-3 bg-muted rounded mb-3" />
                    <div className="h-4 bg-muted rounded w-20" />
                  </CardContent>
                </Card>
              ))}
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Danh sách yêu thích
          </h1>
          <p className="text-muted-foreground">Những sản phẩm bạn đã lưu để mua sau</p>
        </div>

        {/* Reset Data Button */}
        <div className="mb-6 flex gap-4">
          <Button
            variant="outline"
            onClick={handleResetData}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            Reset Data
          </Button>
          {wishlistProducts.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa tất cả
            </Button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlistProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Danh sách yêu thích trống</h2>
            <p className="text-muted-foreground mb-6">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích</p>
            <Button asChild>
              <a href="/shop">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Khám phá sản phẩm
              </a>
            </Button>
          </Card>
        ) : (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              {wishlistProducts.length} sản phẩm trong danh sách yêu thích
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
