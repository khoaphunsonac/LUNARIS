"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductOptions } from "@/components/product-options";
import { loadProducts, formatPrice, type Product } from "@/lib/data-manager";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = Number(params.id);

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState<string>();
    const [selectedColor, setSelectedColor] = useState<string>();
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const fetchProduct = async () => {
            const products = await loadProducts();
            const foundProduct = products.find((p) => p.id === productId);

            if (!foundProduct) {
                router.push("/shop");
                return;
            }

            setProduct(foundProduct);

            // Get related products from same category
            const related = products
                .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
                .slice(0, 4);
            setRelatedProducts(related);
            setLoading(false);
        };

        fetchProduct();
    }, [productId, router]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product.id, quantity, selectedSize, selectedColor);
    };

    const handleWishlist = () => {
        if (!product) return;
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    const handleSelectionChange = (size?: string, color?: string) => {
        setSelectedSize(size);
        setSelectedColor(color);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="aspect-square bg-muted rounded-lg" />
                            <div className="space-y-4">
                                <div className="h-8 bg-muted rounded w-3/4" />
                                <div className="h-6 bg-muted rounded w-1/2" />
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-12 bg-muted rounded w-full" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return null;
    }

    const isWishlisted = isInWishlist(product.id);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">
                        Trang chủ
                    </Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-foreground">
                        Cửa hàng
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{product.name}</span>
                </div>

                {/* Back Button */}
                <div className="mb-6">
                    <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại
                    </Button>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Product Images */}
                    <div>
                        <ProductImageGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-balance">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                                {product.inStock ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        Còn hàng
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">Hết hàng</Badge>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <span className="me-2">Số lượng: 3 cái/hộp</span>
                            <h3 className="font-semibold mb-2">Mô tả sản phẩm</h3>
                            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                        </div>

                        <Separator />

                        {/* Product Options */}
                        <ProductOptions
                            sizes={product.sizes}
                            colors={product.colors}
                            onSelectionChange={handleSelectionChange}
                        />

                        {/* Quantity */}
                        <div>
                            <label className="text-base font-medium mb-3 block">Số lượng</label>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                                    +
                                </Button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                className="flex-1 bg-accent hover:bg-accent/90"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Thêm vào giỏ hàng
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleWishlist}
                                className={isWishlisted ? "text-red-500 border-red-500" : ""}
                            >
                                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                            </Button>
                            <Button variant="outline" size="lg">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Features */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-primary" />
                                        <span>Miễn phí vận chuyển</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RotateCcw className="h-4 w-4 text-primary" />
                                        <span>Đổi trả 30 ngày</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-primary" />
                                        <span>Bảo hành chính hãng</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
