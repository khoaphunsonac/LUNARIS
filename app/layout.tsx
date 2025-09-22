import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
    title: "LUNARIS - Thời trang hiện đại",
    description: "Cửa hàng thời trang trực tuyến LUNARIS - Quần áo, phụ kiện chất lượng cao",
    generator: "v0.app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
                <WishlistProvider>
                    <CartProvider>
                        <Suspense fallback={null}>{children}</Suspense>
                    </CartProvider>
                </WishlistProvider>
                <Toaster />
                <Analytics />
            </body>
        </html>
    );
}
