import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { parts } from '@/data/products';

const categories = ['All', 'Batteries', 'Screens', 'Keyboards', 'Chargers', 'RAM', 'Storage', 'Cooling', 'Accessories'];
const brands = ['All', 'Kingston', 'Samsung', 'Anker', 'OEM', 'Thermal Grizzly', 'Compatible', 'Universal'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

const tagMap: Record<string, string> = {
  Batteries: 'battery',
  Screens: 'screen',
  Keyboards: 'keyboard',
  Chargers: 'charger',
  RAM: 'ram',
  Storage: 'ssd',
  Cooling: 'cooling',
  Accessories: 'accessories',
};

export default function Parts() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [sort, setSort] = useState('Featured');

  const filtered = useMemo(() => {
    let list = [...parts];
    if (search) list = list.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'All') {
      const tag = tagMap[category];
      list = list.filter(p => p.tags?.includes(tag));
    }
    if (brand !== 'All') list = list.filter(p => p.brand === brand);
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    else if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    else if (sort === 'Top Rated') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, brand, sort]);

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground py-10">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-white/50 mb-3">
            <a href="/" className="hover:text-white">Home</a> / <span className="text-white/80">Parts & Accessories</span>
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">Parts & Accessories</h1>
          <p className="text-white/60">Genuine replacement parts for DIY laptop repairs</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-sm px-3 py-1.5 rounded-full font-medium transition-colors ${
                category === c
                  ? 'bg-primary text-primary-foreground shadow-blue'
                  : 'bg-card border border-border text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parts..." className="pl-9" />
          </div>
          <select
            value={brand}
            onChange={e => setBrand(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} part{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No parts match your search.</p>
            <Button onClick={() => { setCategory('All'); setBrand('All'); setSearch(''); }}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
