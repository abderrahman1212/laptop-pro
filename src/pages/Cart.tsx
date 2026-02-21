import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle2, User, Phone, MapPin, FileText, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { language, t } = useLanguage();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(language === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price);

  const orderSchema = z.object({
    fullName: z.string().trim().min(1, t('cart.required')).max(100),
    phone: z.string().trim().min(1, t('cart.required')).regex(/^[0-9+\s()-]{8,20}$/, t('cart.invalidPhone')),
    city: z.string().trim().min(1, t('cart.required')).max(100),
    address: z.string().trim().min(1, t('cart.required')).max(300),
    notes: z.string().max(500).optional(),
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = orderSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setOrderPlaced(true);
    toast({ title: t('cart.orderSuccess') });
    clearCart();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{t('cart.title')}</h1>

          {orderPlaced ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-16 flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-primary/10 p-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
              <p className="mt-6 text-lg font-semibold text-foreground">{t('cart.orderSuccess')}</p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                {t('cart.continueShopping')}
              </Link>
            </motion.div>
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 flex flex-col items-center text-center"
            >
              <ShoppingBag className="h-16 w-16 text-muted" />
              <p className="mt-4 text-lg text-muted-foreground">{t('cart.empty')}</p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                {t('cart.continueShopping')}
              </Link>
            </motion.div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 rounded-xl border bg-card p-4 shadow-soft"
                  >
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name[language] || item.product.name.fr}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-display text-sm font-semibold text-foreground hover:text-primary transition-colors">
                          {item.product.name[language] || item.product.name.fr}
                        </h3>
                      </Link>
                      <span className="text-xs text-muted-foreground">{item.product.brand}</span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 text-foreground/70 hover:text-foreground"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 text-foreground/70 hover:text-foreground"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-sm font-bold text-foreground">
                            {formatPrice(item.product.price * item.quantity)} {t('currency')}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary + Order Form */}
              <div className="space-y-4 lg:sticky lg:top-24 h-fit">
                {/* Summary */}
                <div className="rounded-xl border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">{t('cart.checkout')}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                      <span className="font-medium text-foreground">{formatPrice(totalPrice)} {t('currency')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('cart.shipping')}</span>
                      <span className="font-medium text-primary">{t('cart.free')}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-display font-bold text-foreground">{t('cart.total')}</span>
                      <span className="font-display text-lg font-bold text-foreground">{formatPrice(totalPrice)} {t('currency')}</span>
                    </div>
                  </div>

                  {!showForm && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-5 w-full rounded-lg bg-gradient-hero py-3 font-display text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-hover"
                    >
                      {t('cart.checkout')}
                    </button>
                  )}
                  <Link to="/products" className="mt-3 block text-center text-sm text-primary hover:underline">
                    {t('cart.continueShopping')}
                  </Link>
                </div>

                {/* Order Form */}
                <AnimatePresence>
                  {showForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleSubmit}
                      className="rounded-xl border bg-card p-6 shadow-soft space-y-4 overflow-hidden"
                    >
                      <h3 className="font-display text-lg font-bold text-foreground">{t('cart.orderForm')}</h3>

                      {/* Full Name */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <User className="h-3.5 w-3.5 text-muted-foreground" /> {t('cart.fullName')}
                        </label>
                        <input
                          value={form.fullName}
                          onChange={e => handleChange('fullName', e.target.value)}
                          placeholder={t('cart.fullNamePlaceholder')}
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" /> {t('cart.phone')}
                        </label>
                        <input
                          value={form.phone}
                          onChange={e => handleChange('phone', e.target.value)}
                          placeholder={t('cart.phonePlaceholder')}
                          type="tel"
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                      </div>

                      {/* City */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <Building className="h-3.5 w-3.5 text-muted-foreground" /> {t('cart.city')}
                        </label>
                        <input
                          value={form.city}
                          onChange={e => handleChange('city', e.target.value)}
                          placeholder={t('cart.cityPlaceholder')}
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                        {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                      </div>

                      {/* Address */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {t('cart.address')}
                        </label>
                        <input
                          value={form.address}
                          onChange={e => handleChange('address', e.target.value)}
                          placeholder={t('cart.addressPlaceholder')}
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                        {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" /> {t('cart.notes')}
                        </label>
                        <textarea
                          value={form.notes}
                          onChange={e => handleChange('notes', e.target.value)}
                          placeholder={t('cart.notesPlaceholder')}
                          rows={3}
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-lg bg-gradient-hero py-3 font-display text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-hover"
                      >
                        {t('cart.placeOrder')}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
