"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { ProductSort, type SortOption } from "@/components/product-sort"
import { loadProducts, loadCategories, type Product, type Category } from "@/lib/data-manager"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 2000000],
    searchQuery: "",
    inStock: false,
  })

  const updateFiltersFromParams = useCallback(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    setFilters((prev) => {
      const newCategories = category ? [category] : []
      const newSearchQuery = search || ""

      // Only update if values actually changed
      if (JSON.stringify(prev.categories) === JSON.stringify(newCategories) && prev.searchQuery === newSearchQuery) {
        return prev
      }

      return {
        ...prev,
        categories: newCategories,
        searchQuery: newSearchQuery,
      }
    })
  }, [searchParams])

  // Initialize filters from URL params
  useEffect(() => {
    updateFiltersFromParams()
  }, [updateFiltersFromParams])

  useEffect(() => {
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([loadProducts(), loadCategories()])
      setProducts(productsData)
      setCategories(categoriesData)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        if (!product.name.toLowerCase().includes(query) && !product.description.toLowerCase().includes(query)) {
          return false
        }
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name, "vi")
        case "name-desc":
          return b.name.localeCompare(a.name, "vi")
        case "newest":
        default:
          return b.id - a.id
      }
    })

    return filtered
  }, [products, filters, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-8" />
            <div className="flex gap-8">
              <div className="w-80 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded" />
                ))}
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
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
          <h1 className="text-3xl font-bold mb-2">Cửa hàng</h1>
          <p className="text-muted-foreground">Khám phá bộ sưu tập thời trang đa dạng từ LUNARIS</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <ProductFilters categories={categories} onFiltersChange={setFilters} activeFilters={filters} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="text-sm text-muted-foreground">Hiển thị {filteredAndSortedProducts.length} sản phẩm</div>

              <div className="flex items-center gap-4">
                <ProductSort value={sortBy} onChange={setSortBy} />

                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm nào</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      categories: [],
                      priceRange: [0, 2000000],
                      searchQuery: "",
                      inStock: false,
                    })
                  }
                >
                  Xóa bộ lọc
                </Button>
              </Card>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
