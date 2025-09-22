import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">LUNARIS</h3>
            <p className="text-muted-foreground mb-4 text-sm md:text-base">
              Thương hiệu bảo vệ cao cấp, mang đến sự an toàn và thoải mái tối ưu cho những khoảnh khắc thân mật.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-base md:text-lg">Liên kết nhanh</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Trang chủ
              </Link>
              <Link
                href="/shop"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Cửa hàng
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Về chúng tôi
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Liên hệ
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-base md:text-lg">Sản phẩm</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/shop?category=classic"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Classic
              </Link>
              <Link
                href="/shop?category=ultra-thin"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Ultra-thin
              </Link>
              <Link
                href="/shop?category=premium"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Premium
              </Link>
              <Link
                href="/shop?category=for-her"
                className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
              >
                Luxury
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-base md:text-lg">Liên hệ</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">0123 456 789</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">info@lunaris.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center text-muted-foreground">
          <p className="text-sm md:text-base">&copy; 2024 LUNARIS. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
