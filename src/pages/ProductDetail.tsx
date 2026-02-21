import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { ShoppingCart, Star, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(language === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price);

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stockLabel =
    product.stock === 'in_stock' ? t('featured.inStock') :
    product.stock === 'low_stock' ? t('featured.lowStock') :
    t('featured.outOfStock');

  const stockColor =
    product.stock === 'in_stock' ? 'text-success' :
    product.stock === 'low_stock' ? 'text-warning' :
    'text-destructive';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/products" className="hover:text-primary transition-colors">{t('nav.products')}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{product.name[language] || product.name.fr}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden rounded-xl border bg-secondary"
            >
              <img
                src={product.image}
                alt={product.name[language] || product.name.fr}
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-sm font-medium text-primary">{product.brand}</span>
              <h1 className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                {product.name[language] || product.name.fr}
              </h1>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-warning text-warning' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount} {t('product.reviews')})</span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-foreground">
                  {formatPrice(product.price)} {t('currency')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)} {t('currency')}
                  </span>
                )}
              </div>

              <p className={`mt-2 text-sm font-medium ${stockColor}`}>{stockLabel}</p>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {product.description[language] || product.description.fr}
              </p>

              <button
                onClick={handleAdd}
                disabled={product.stock === 'out_of_stock'}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-hero px-6 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-hover hover:scale-[1.01] disabled:opacity-50 sm:w-auto"
              >
                {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                {added ? '✓' : t('product.addToCart')}
              </button>

              {/* Specs */}
              {product.specs && (
                <div className="mt-8">
                  <h3 className="font-display text-base font-semibold text-foreground mb-3">{t('product.specs')}</h3>
                  <div className="divide-y rounded-lg border overflow-hidden">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex text-sm">
                        <span className="w-36 shrink-0 bg-secondary px-4 py-2.5 font-medium text-foreground">{key}</span>
                        <span className="px-4 py-2.5 text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compatibility */}
              {product.compatibility && product.compatibility.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-display text-base font-semibold text-foreground mb-3">{t('product.compatibility')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map(c => (
                      <span key={c} className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 font-display text-xl font-bold text-foreground">{t('product.related')}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
