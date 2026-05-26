import { ChevronUp, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';



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

  const handlePriceChange = (range: [number, number]) => onFiltersChange({ ...filters, priceRange: range })
  

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
        fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform lg:static lg:block lg:z-0 lg:p-0 lg:w-62.5
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
          <Slider min={0} max={999999} step={1} value={filters.priceRange} onValueChange={handlePriceChange} className="mb-4 [&_[role=slider]]: border-[#DB4444] [&_.range]:bg-[#DB4444]" />
          <Button variant="outline" className="w-full border-[#DB4444] text-[#DB4444] hover:bg-[#DB4444] hover:text-white" onClick={() => setMobileOpen(false)}>Apply Filters</Button>
        </Section>
      </div>
    </>
  )
}