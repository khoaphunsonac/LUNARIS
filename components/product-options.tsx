"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ProductOptionsProps {
  sizes: string[]
  colors: string[]
  onSelectionChange: (size?: string, color?: string) => void
}

export function ProductOptions({ sizes, colors, onSelectionChange }: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState<string>()
  const [selectedColor, setSelectedColor] = useState<string>()

  const handleSizeChange = (size: string) => {
    const newSize = selectedSize === size ? undefined : size
    setSelectedSize(newSize)
    onSelectionChange(newSize, selectedColor)
  }

  const handleColorChange = (color: string) => {
    const newColor = selectedColor === color ? undefined : color
    setSelectedColor(newColor)
    onSelectionChange(selectedSize, newColor)
  }

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      {sizes && sizes.length > 0 && (
        <div>
          <Label className="text-base font-medium mb-3 block">Kích thước</Label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => handleSizeChange(size)}
                className="min-w-12"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {colors && colors.length > 0 && (
        <div>
          <Label className="text-base font-medium mb-3 block">Màu sắc</Label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                size="sm"
                onClick={() => handleColorChange(color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
