import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { revenueData, categoryBreakdown, mockOrders } from '@/data/adminMockData';
import { products } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminDashboard = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('admin.totalRevenue'), value: '2,430,000 DH', change: '+12.5%', up: true, icon: TrendingUp, color: 'text-primary' },
    { label: t('admin.orders'), value: '299', change: '+8.2%', up: true, icon: ShoppingCart, color: 'text-accent' },
    { label: t('admin.products'), value: String(products.length), change: '0', up: true, icon: Package, color: 'text-warning' },
    { label: t('admin.customers'), value: '187', change: '+15.3%', up: true, icon: Users, color: 'text-success' },
  ];

  const recentOrders = mockOrders.slice(0, 5);

  const statusLabel: Record<string, string> = {
    pending: t('admin.pending'),
    processing: t('admin.processing'),
    shipped: t('admin.shipped'),
    delivered: t('admin.delivered'),
    cancelled: t('admin.cancelled'),
  };

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
              <div className={`rounded-lg bg-secondary p-2 ${s.color}`}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-2xl font-bold text-foreground">{s.value}</p>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium">
              {s.up ? (
                <ArrowUpRight className="h-3 w-3 text-success" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-destructive" />
              )}
              <span className={s.up ? 'text-success' : 'text-destructive'}>{s.change}</span>
              <span className="text-muted-foreground">{t('admin.vsLastMonth')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-foreground">{t('admin.revenueOverview')}</h3>
          <p className="text-sm text-muted-foreground">{t('admin.last6Months')}</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} DH`, t('admin.revenue')]}
                  contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', fontSize: 13, background: 'hsl(var(--card))' }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-base font-semibold text-foreground">{t('admin.salesByCategory')}</h3>
          <p className="text-sm text-muted-foreground">{t('admin.revenueShare')}</p>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {categoryBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, t('admin.share')]} contentStyle={{ borderRadius: 12, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {categoryBreakdown.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.fill }} />
                {c.name} ({c.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h3 className="font-display text-base font-semibold text-foreground">{t('admin.recentOrders')}</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 pe-4 text-start">{t('admin.orderId')}</th>
                <th className="pb-3 pe-4 text-start">{t('admin.customer')}</th>
                <th className="pb-3 pe-4 text-start">{t('admin.status')}</th>
                <th className="pb-3 text-end">{t('admin.total')}</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pe-4 font-medium text-foreground">{o.id}</td>
                  <td className="py-3 pe-4 text-muted-foreground">{o.customer}</td>
                  <td className="py-3 pe-4">
                    <StatusBadge status={o.status} label={statusLabel[o.status] || o.status} />
                  </td>
                  <td className="py-3 text-end font-medium text-foreground">{o.total.toLocaleString()} DH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  processing: 'bg-primary/10 text-primary',
  shipped: 'bg-accent/10 text-accent',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

const StatusBadge = ({ status, label }: { status: string; label: string }) => (
  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status] || ''}`}>
    {label}
  </span>
);

export default AdminDashboard;
