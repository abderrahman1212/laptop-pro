import { useState } from 'react';
import { mockOrders } from '@/data/adminMockData';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  processing: 'bg-primary/10 text-primary',
  shipped: 'bg-accent/10 text-accent',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

const AdminOrders = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { t } = useLanguage();

  const statusOptions = [
    { value: 'all', label: t('admin.allStatus') },
    { value: 'pending', label: t('admin.pending') },
    { value: 'processing', label: t('admin.processing') },
    { value: 'shipped', label: t('admin.shipped') },
    { value: 'delivered', label: t('admin.delivered') },
    { value: 'cancelled', label: t('admin.cancelled') },
  ];

  const statusLabel: Record<string, string> = {
    pending: t('admin.pending'),
    processing: t('admin.processing'),
    shipped: t('admin.shipped'),
    delivered: t('admin.delivered'),
    cancelled: t('admin.cancelled'),
  };

  const filtered = mockOrders.filter((o) => {
    const matchesSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('admin.searchOrders')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 sm:w-72"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 text-start">{t('admin.orderId')}</th>
              <th className="px-4 py-3 text-start">{t('admin.customer')}</th>
              <th className="px-4 py-3 text-start">{t('admin.city')}</th>
              <th className="px-4 py-3 text-center">{t('admin.items')}</th>
              <th className="px-4 py-3 text-end">{t('admin.total')}</th>
              <th className="px-4 py-3 text-start">{t('admin.status')}</th>
              <th className="px-4 py-3 text-start">{t('admin.date')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{o.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <span className="font-medium text-foreground">{o.customer}</span>
                    <p className="text-xs text-muted-foreground">{o.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{o.city}</td>
                <td className="px-4 py-3 text-center text-muted-foreground">{o.items}</td>
                <td className="px-4 py-3 text-end font-medium text-foreground">{o.total.toLocaleString()} DH</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[o.status] || ''}`}>
                    {statusLabel[o.status] || o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t('admin.noOrders')}</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
