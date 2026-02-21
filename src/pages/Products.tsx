import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, categories, brands } from '@/data/products';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

const Products = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryParam) result = result.filter(p => p.category === categoryParam);
    if (selectedBrand) result = result.filter(p => p.brand === selectedBrand);

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') result.sort((a, b) => a.name.fr.localeCompare(b.name.fr));
    else result.sort((a, b) => b.reviewCount - a.reviewCount);

    return result;
  }, [categoryParam, selectedBrand, sortBy]);

  const setCategory = (cat: string) => {
    if (cat) searchParams.set('category', cat);
    else searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{t('products.title')}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{filtered.length} {t('products.results')}</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="rounded-lg border bg-card px-3 py-2 text-sm text-foreground"
              >
                <option value="popularity">{t('products.sortPopularity')}</option>
                <option value="price-asc">{t('products.sortPrice')} ↑</option>
                <option value="price-desc">{t('products.sortPrice')} ↓</option>
                <option value="name">{t('products.sortName')}</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium text-foreground lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t('products.filters')}
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-card p-6 overflow-auto' : 'hidden'} lg:block lg:relative lg:w-56 lg:shrink-0 lg:p-0`}>
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-display text-lg font-bold">{t('products.filters')}</h3>
                <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
              </div>

              {/* Category filter */}
              <div className="mb-6">
                <h4 className="mb-3 font-display text-sm font-semibold text-foreground">{t('products.category')}</h4>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setCategory('')}
                    className={`rounded-md px-3 py-1.5 text-start text-sm transition-colors ${!categoryParam ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-secondary'}`}
                  >
                    {t('products.all')}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setCategory(cat.id); setShowFilters(false); }}
                      className={`rounded-md px-3 py-1.5 text-start text-sm transition-colors ${categoryParam === cat.id ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-secondary'}`}
                    >
                      {cat.icon} {t(`categories.${cat.id}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand filter */}
              <div>
                <h4 className="mb-3 font-display text-sm font-semibold text-foreground">{t('products.brand')}</h4>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setSelectedBrand('')}
                    className={`rounded-md px-3 py-1.5 text-start text-sm transition-colors ${!selectedBrand ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-secondary'}`}
                  >
                    {t('products.all')}
                  </button>
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => { setSelectedBrand(brand); setShowFilters(false); }}
                      className={`rounded-md px-3 py-1.5 text-start text-sm transition-colors ${selectedBrand === brand ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-secondary'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <p className="text-lg text-muted-foreground">{t('products.noResults')}</p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
