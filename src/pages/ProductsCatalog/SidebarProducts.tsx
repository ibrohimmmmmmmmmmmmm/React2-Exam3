import React, { useState } from 'react'

import { ChevronUp } from 'lucide-react'
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

// ── Stars ──────────────────────────────────────────────────────────────────
function Stars({ filled }: { filled: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} className={`w-5 h-5 ${i <= filled ? 'text-orange-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-gray-200 py-5">
      <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full mb-4">
        <span className="text-sm font-bold text-gray-900">{title}</span>
        <ChevronUp className={`w-4 h-4 text-gray-500 transition-transform ${open ? '' : 'rotate-180'}`} />
      </button>
      {open && children}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────
const CATEGORIES = ['Electronics', 'Home & Lifestyle', 'Medicine', 'Sports & Outdoor']
const BRANDS = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo']
const FEATURES = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
const CONDITIONS = [
  { value: 'any', label: 'Any' },
  { value: 'refurbished', label: 'Refurbished' },
  { value: 'brand-new', label: 'Brand new' },
  { value: 'old', label: 'Old items' },
]

type Filters = {
  category: string | null
  brands: string[]
  priceRange: [number, number]
  condition: string
  ratings: number[]
}

type SidebarProps = {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export default function ProductsSidebar({ filters, onFiltersChange }: SidebarProps) {
  const handleCategoryChange = (cat: string | null) => {
    onFiltersChange({ ...filters, category: cat })
  }

  const handlePriceChange = (range: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: range })
  }

  const handleConditionChange = (cond: string) => {
    onFiltersChange({ ...filters, condition: cond })
  }

  const handleRatingChange = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating]
    onFiltersChange({ ...filters, ratings: newRatings })
  }

  return (
    <aside className="w-[250px] flex-shrink-0">

      {/* Category */}
      <Section title="Category">
        <ul className="flex flex-col gap-3">
          <li>
            <button
              onClick={() => handleCategoryChange(null)}
              className={`text-sm w-full text-left ${filters.category === null ? 'text-[#DB4444] font-semibold' : 'text-gray-500 hover:text-[#DB4444]'}`}
            >
              All products
            </button>
          </li>
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button
                onClick={() => handleCategoryChange(cat)}
                className={`text-sm w-full text-left ${filters.category === cat ? 'text-[#DB4444] font-semibold' : 'text-gray-500 hover:text-[#DB4444]'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
        <button className="text-sm text-[#DB4444] mt-3 hover:underline">See all</button>
      </Section>

      {/* Brands */}
      <Section title="Brands">
        <ul className="flex flex-col gap-3">
          {BRANDS.map(brand => (
            <li key={brand} className="flex items-center gap-2.5">
              <Checkbox id={`brand-${brand}`} className="border-gray-300 data-[state=checked]:bg-[#DB4444] data-[state=checked]:border-[#DB4444]" />
              <Label htmlFor={`brand-${brand}`} className="text-sm text-gray-600 cursor-pointer font-normal">{brand}</Label>
            </li>
          ))}
        </ul>
        <button className="text-sm text-[#DB4444] mt-3 hover:underline">See all</button>
      </Section>

      {/* Features */}
      <Section title="Features">
        <ul className="flex flex-col gap-3">
          {FEATURES.map(f => (
            <li key={f} className="flex items-center gap-2.5">
              <Checkbox id={`feature-${f}`} className="border-gray-300 data-[state=checked]:bg-[#DB4444] data-[state=checked]:border-[#DB4444]" />
              <Label htmlFor={`feature-${f}`} className="text-sm text-gray-600 cursor-pointer font-normal">{f}</Label>
            </li>
          ))}
        </ul>
        <button className="text-sm text-[#DB4444] mt-3 hover:underline">See all</button>
      </Section>

      {/* Price range */}
      <Section title="Price range">
        <Slider
          min={0}
          max={999999}
          step={1}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="mb-4 [&_[role=slider]]:border-[#DB4444] [&_[role=slider]]:bg-white [&_.range]:bg-[#DB4444]"
        />
        <div className="flex gap-3 mb-3">
          <div className="flex-1 border border-gray-300 rounded px-2 py-1.5">
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">Min</p>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={e => handlePriceChange([Number(e.target.value), filters.priceRange[1]])}
              className="w-full text-sm text-gray-900 outline-none bg-transparent"
            />
          </div>
          <div className="flex-1 border border-gray-300 rounded px-2 py-1.5">
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">Max</p>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={e => handlePriceChange([filters.priceRange[0], Number(e.target.value)])}
              className="w-full text-sm text-gray-900 outline-none bg-transparent"
            />
          </div>
        </div>
        <Button variant="outline" className="w-full border-[#DB4444] text-[#DB4444] hover:bg-[#DB4444] hover:text-white">
          Apply
        </Button>
      </Section>

      {/* Condition */}
      <Section title="Condition">
        <RadioGroup value={filters.condition} onValueChange={handleConditionChange} className="flex flex-col gap-3">
          {CONDITIONS.map(c => (
            <div key={c.value} className="flex items-center gap-2.5">
              <RadioGroupItem
                value={c.value}
                id={`cond-${c.value}`}
                className="border-gray-300 text-[#DB4444] data-[state=checked]:border-[#DB4444] data-[state=checked]:text-[#DB4444]"
              />
              <Label htmlFor={`cond-${c.value}`} className="text-sm text-gray-600 cursor-pointer font-normal">{c.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </Section>

      {/* Ratings */}
      <Section title="Ratings">
        <ul className="flex flex-col gap-3">
          {[5,4,3,2].map(star => (
            <li key={star} className="flex items-center gap-2.5">
              <Checkbox
                id={`rating-${star}`}
                checked={filters.ratings.includes(star)}
                onCheckedChange={() => handleRatingChange(star)}
                className="border-gray-300 data-[state=checked]:bg-[#DB4444] data-[state=checked]:border-[#DB4444]"
              />
              <Label htmlFor={`rating-${star}`} className="cursor-pointer">
                <Stars filled={star} />
              </Label>
            </li>
          ))}
        </ul>
      </Section>

    </aside>
  )
}
