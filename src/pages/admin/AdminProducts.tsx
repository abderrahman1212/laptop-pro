import { useState } from 'react';
import { products } from '@/data/products';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminProducts = () => {
  const [search, setSearch] = useState('');
  const { t, language } = useLanguage();

  const filtered = products.filter((p) =>
    p.name[language]?.toLowerCase().includes(search.toLowerCase()) ||
    p.name.fr.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const stockLabels: Record<string, string> = {
    in_stock: t('admin.inStock'),
    low_stock: t('admin.lowStock'),
    out_of_stock: t('admin.outOfStock'),
  };

  const stockColors: Record<string, string> = {
    in_stock: 'bg-success/10 text-success',
    low_stock: 'bg-warning/10 text-warning',
    out_of_stock: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('admin.searchProducts')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 sm:w-72"
          />
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          {t('admin.addProduct')}
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 text-start">{t('admin.product')}</th>
              <th className="px-4 py-3 text-start">{t('admin.category')}</th>
              <th className="px-4 py-3 text-start">{t('admin.brandLabel')}</th>
              <th className="px-4 py-3 text-end">{t('admin.price')}</th>
              <th className="px-4 py-3 text-start">{t('admin.stock')}</th>
              <th className="px-4 py-3 text-end">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <span className="font-medium text-foreground line-clamp-1">
                      {p.name[language] || p.name.fr}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                <td className="px-4 py-3 text-end font-medium text-foreground">{p.price.toLocaleString()} DH</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${stockColors[p.stock] || ''}`}>
                    {stockLabels[p.stock] || p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t('admin.noProducts')}</p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
