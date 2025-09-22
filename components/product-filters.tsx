"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { Category } from "@/lib/data-manager"

interface ProductFiltersProps {
  categories: Category[]
  onFiltersChange: (filters: FilterState) => void
  activeFilters: FilterState
}

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  searchQuery: string
  inStock: boolean
}

export function ProductFilters({ categories, onFiltersChange, activeFilters }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...activeFilters.categories, categoryId]
      : activeFilters.categories.filter((id) => id !== categoryId)

    onFiltersChange({
      ...activeFilters,
      categories: newCategories,
    })
  }

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...activeFilters,
      priceRange: [value[0], value[1]],
    })
  }

  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...activeFilters,
      searchQuery: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 2000000],
      searchQuery: "",
      inStock: false,
    })
  }

  const hasActiveFilters =
    activeFilters.categories.length > 0 ||
    activeFilters.priceRange[0] > 0 ||
    activeFilters.priceRange[1] < 2000000 ||
    activeFilters.searchQuery ||
    activeFilters.inStock

  return (
    <div className="w-full lg:w-80">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between">
          Bộ lọc
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tìm kiếm</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={activeFilters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={activeFilters.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Khoảng giá</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider
                value={activeFilters.priceRange}
                onValueChange={handlePriceChange}
                max={2000000}
                min={0}
                step={50000}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{activeFilters.priceRange[0].toLocaleString("vi-VN")}đ</span>
                <span>{activeFilters.priceRange[1].toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tình trạng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={activeFilters.inStock}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    ...activeFilters,
                    inStock: checked as boolean,
                  })
                }
              />
              <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
                Còn hàng
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
            <X className="h-4 w-4 mr-2" />
            Xóa bộ lọc
          </Button>
        )}
      </div>
    </div>
  )
}
