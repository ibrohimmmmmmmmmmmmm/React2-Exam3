import { useState } from 'react'
import { ChevronUp, Filter, X } from 'lucide-react'
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

// ── Stars ──────────────────────────────────────────────────────────────────
function Stars({ filled }: { filled: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-5 h-5 ${i <= filled ? 'text-orange-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full mb-3">
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
  categoryId: number | null
  brands: string[]
  priceRange: [number, number]
  condition: string
  ratings: number[]
  features: string[]
}

type SidebarProps = {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  selectedCategoryName?: string
}

export default function ProductsSidebar({ filters, onFiltersChange, selectedCategoryName }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleCategoryChange = (cat: string | null) => onFiltersChange({ ...filters, category: cat, categoryId: null })
  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand) ? filters.brands.filter((b) => b !== brand) : [...filters.brands, brand]
    onFiltersChange({ ...filters, brands: newBrands })
  }
  const handleFeatureChange = (feature: string) => {
    const newFeatures = filters.features.includes(feature) ? filters.features.filter((f) => f !== feature) : [...filters.features, feature]
    onFiltersChange({ ...filters, features: newFeatures })
  }
  const handlePriceChange = (range: [number, number]) => onFiltersChange({ ...filters, priceRange: range })
  const handleConditionChange = (cond: string) => onFiltersChange({ ...filters, condition: cond })
  const handleRatingChange = (rating: number) => {
    const newRatings = filters.ratings.includes(rating) ? filters.ratings.filter((r) => r !== rating) : [...filters.ratings, rating]
    onFiltersChange({ ...filters, ratings: newRatings })
  }

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="lg:hidden mb-4">
        <Button onClick={() => setMobileOpen(true)} variant="outline" className="w-full flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filter Products
        </Button>
      </div>

      {/* Sidebar Content (Overlay on mobile, Fixed on Desktop) */}
      <div className={`
        fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform lg:static lg:block lg:z-0 lg:p-0 lg:w-[250px]
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex justify-between items-center lg:hidden mb-6">
          <h2 className="font-bold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}><X /></Button>
        </div>

        {/* Categories, Brands, Features, etc. remain the same inside this wrapper */}
        <Section title="Category">
            <ul className="flex flex-col gap-2">
              <li><button onClick={() => handleCategoryChange(null)} className={`text-sm w-full text-left ${!filters.category && !selectedCategoryName ? 'text-[#DB4444] font-semibold' : 'text-gray-500 hover:text-[#DB4444]'}`}>All products</button></li>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button onClick={() => handleCategoryChange(cat)} className={`text-sm w-full text-left ${(selectedCategoryName === cat || filters.category === cat) ? 'text-[#DB4444] font-semibold' : 'text-gray-500 hover:text-[#DB4444]'}`}>{cat}</button>
                </li>
              ))}
            </ul>
        </Section>

        {/* ... (Keep your existing Section components for Brands, Features, Price, Condition, Ratings here) ... */}
        {/* I have kept the structure above, just ensure all remaining Sections are nested inside this main div */}
        
        <Section title="Brands">
            <ul className="flex flex-col gap-3">
              {BRANDS.map(brand => (
                <li key={brand} className="flex items-center gap-2.5">
                  <Checkbox id={`brand-${brand}`} checked={filters.brands.includes(brand)} onCheckedChange={() => handleBrandChange(brand)} className="border-gray-300 data-[state=checked]:bg-[#DB4444] data-[state=checked]:border-[#DB4444]" />
                  <Label htmlFor={`brand-${brand}`} className="text-sm text-gray-600 cursor-pointer font-normal">{brand}</Label>
                </li>
              ))}
            </ul>
        </Section>

        <Section title="Price range">
          <Slider min={0} max={999999} step={1} value={filters.priceRange} onValueChange={handlePriceChange} className="mb-4 [&_[role=slider]]:border-[#DB4444] [&_.range]:bg-[#DB4444]" />
          <Button variant="outline" className="w-full border-[#DB4444] text-[#DB4444] hover:bg-[#DB4444] hover:text-white" onClick={() => setMobileOpen(false)}>Apply Filters</Button>
        </Section>
      </div>
    </>
  )
}