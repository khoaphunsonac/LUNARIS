"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type SortOption = "newest" | "price-low" | "price-high" | "name-asc" | "name-desc"

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sắp xếp:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Mới nhất</SelectItem>
          <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
          <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
          <SelectItem value="name-asc">Tên A-Z</SelectItem>
          <SelectItem value="name-desc">Tên Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
