"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { loadProducts, type Product } from "@/lib/data-manager"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await loadProducts()
      setFeaturedProducts(products.filter((p) => p.featured).slice(0, 4))
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <Image src="/images/banner.jpg" alt="LUNARIS Fashion Banner" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Thời trang hiện đại</h1>
              <p className="text-lg md:text-xl mb-8 text-pretty">
                Khám phá bộ sưu tập mới nhất từ LUNARIS - Nơi phong cách gặp gỡ chất lượng
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/shop" className="flex items-center gap-2">
                  Mua sắm ngay
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Miễn phí vận chuyển</h3>
                <p className="text-muted-foreground">Cho đơn hàng từ 500.000đ</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Đổi trả dễ dàng</h3>
                <p className="text-muted-foreground">Trong vòng 30 ngày</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Hỗ trợ 24/7</h3>
                <p className="text-muted-foreground">Luôn sẵn sàng hỗ trợ bạn</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-balance">Về thương hiệu LUNARIS</h2>
                <p className="text-muted-foreground mb-6 text-pretty">
                  LUNARIS ra đời với sứ mệnh mang đến những sản phẩm thời trang chất lượng cao, phù hợp với phong cách
                  sống hiện đại của người Việt. Chúng tôi tin rằng thời trang không chỉ là trang phục, mà còn là cách
                  thể hiện cá tính và phong cách riêng của mỗi người.
                </p>
                <p className="text-muted-foreground mb-8 text-pretty">
                  Với đội ngũ thiết kế tài năng và quy trình sản xuất nghiêm ngặt, LUNARIS cam kết mang đến những sản
                  phẩm không chỉ đẹp mà còn bền, thoải mái và phù hợp với túi tiền.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/about">
                    Tìm hiểu thêm
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image src="/images/shop.jpg" alt="LUNARIS Store" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Khám phá những sản phẩm được yêu thích nhất từ bộ sưu tập mới nhất của chúng tôi
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-3 bg-muted rounded mb-3" />
                      <div className="h-4 bg-muted rounded w-20" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/shop">
                  Xem tất cả sản phẩm
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Đăng ký nhận tin tức</h2>
                <p className="mb-8 opacity-90 max-w-2xl mx-auto">
                  Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và xu hướng thời trang mới nhất
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    className="flex-1 px-4 py-2 rounded-md text-foreground"
                  />
                  <Button variant="secondary">Đăng ký</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
