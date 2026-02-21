import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const featured = products.filter(p => p.featured).slice(0, 6);

  return (
    <section className="bg-gradient-subtle py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              {t('featured.title')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('featured.subtitle')}</p>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
          >
            {t('featured.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {t('featured.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
