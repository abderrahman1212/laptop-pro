import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'react-router-dom';

const brands = ['All', 'Lenovo', 'Dell', 'HP', 'ASUS', 'Microsoft', 'Acer'];
const conditions = ['All', 'New', 'Refurbished'];
const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $400', min: 0, max: 400 },
  { label: '$400–$600', min: 400, max: 600 },
  { label: '$600–$900', min: 600, max: 900 },
  { label: 'Over $900', min: 900, max: Infinity },
];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'];

export default function Laptops() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState('All');
  const [condition, setCondition] = useState(params.get('condition') || 'All');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    params.get('category_id') ? parseInt(params.get('category_id')!) : null
  );
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState('Featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cats = await getCategories(language);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchInitialData();
  }, [language]);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const response = await getProducts({
          lang: language,
          category_id: selectedCategoryId || undefined,
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [language, selectedCategoryId]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || (p.brand && p.brand.toLowerCase().includes(search.toLowerCase())));
    if (brand !== 'All') list = list.filter(p => p.brand === brand);
    if (condition !== 'All') list = list.filter(p => p.condition === condition);
    const range = priceRanges[priceRange];
    list = list.filter(p => (p.price || 0) >= range.min && (p.price || 0) <= range.max);
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    else if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    else if (sort === 'Top Rated') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [search, brand, condition, priceRange, sort, products]);

  const activeFilters = [
    brand !== 'All' && brand,
    condition !== 'All' && condition,
    priceRange !== 0 && priceRanges[priceRange].label,
  ].filter(Boolean) as string[];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-10">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-white/50 mb-3">
            <a href="/" className="hover:text-white">Home</a> / <span className="text-white/80">Laptops</span>
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">Laptops</h1>
          <p className="text-white/60">New & certified refurbished laptops with warranty</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search laptops..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map(s => <option key={s}>{s}</option>)}
            </select>
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(v => !v)}
              className="sm:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </Button>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map(f => (
              <span key={f} className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                {f}
                <button onClick={() => {
                  if (f === brand) setBrand('All');
                  else if (f === condition) setCondition('All');
                  else setPriceRange(0);
                }}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={() => { setBrand('All'); setCondition('All'); setPriceRange(0); }}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className={`${filtersOpen ? 'block' : 'hidden'} sm:block w-full sm:w-56 shrink-0 space-y-6`}>
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => { setSelectedCategoryId(null); setParams({}); }}
                  className={`w-full text-left text-sm px-2 py-1 rounded-lg transition-colors ${selectedCategoryId === null ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-muted'}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategoryId(cat.id); setParams({ category_id: cat.id.toString() }); }}
                    className={`w-full text-left text-sm px-2 py-1 rounded-lg transition-colors ${selectedCategoryId === cat.id ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-muted'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map(b => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className={`w-full text-left text-sm px-2 py-1 rounded-lg transition-colors ${brand === b ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-muted'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Condition</h3>
              <div className="space-y-2">
                {conditions.map(c => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`w-full text-left text-sm px-2 py-1 rounded-lg transition-colors ${condition === c ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-muted'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setPriceRange(i)}
                    className={`w-full text-left text-sm px-2 py-1 rounded-lg transition-colors ${priceRange === i ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-muted'}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} laptop{filtered.length !== 1 ? 's' : ''} found</p>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-80 bg-muted rounded-xl animate-pulse" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No laptops match your filters.</p>
                <Button onClick={() => { setBrand('All'); setCondition('All'); setPriceRange(0); setSearch(''); setSelectedCategoryId(null); setParams({}); }}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
