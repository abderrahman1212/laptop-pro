import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ArrowLeft,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/hooks/useAdmin';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAdmin, loading, signOut } = useAdmin();
  const { t } = useLanguage();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: t('admin.dashboard'), end: true },
    { to: '/admin/products', icon: Package, label: t('admin.products') },
    { to: '/admin/orders', icon: ShoppingCart, label: t('admin.orders') },
    { to: '/admin/customers', icon: Users, label: t('admin.customers') },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (to: string, end?: boolean) => {
    if (end) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const currentPage = navItems.find((n) => isActive(n.to, n.end))?.label || 'Admin';

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <span className="text-sm font-bold text-primary-foreground">B</span>
        </div>
        <span className="font-display text-base font-bold text-foreground">{t('admin.brand')}</span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => {
          const active = isActive(item.to, item.end);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-4 w-4 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto space-y-1 border-t border-border p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-[18px] w-[18px]" />
          <span>{t('admin.backToStore')}</span>
        </Link>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-[18px] w-[18px]" />
          <span>{t('admin.logout')}</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-e border-border bg-card md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex h-full w-64 flex-col bg-card shadow-elevated">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute end-3 top-4 rounded-md p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-display text-lg font-semibold text-foreground">
              {currentPage}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
