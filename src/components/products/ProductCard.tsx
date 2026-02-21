import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const stockLabel =
    product.stock === 'in_stock' ? t('featured.inStock') :
    product.stock === 'low_stock' ? t('featured.lowStock') :
    t('featured.outOfStock');

  const stockColor =
    product.stock === 'in_stock' ? 'text-success' :
    product.stock === 'low_stock' ? 'text-warning' :
    'text-destructive';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group flex flex-col rounded-xl border bg-card shadow-soft transition-all hover:shadow-hover overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name[language] || product.name.fr}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.originalPrice && (
          <span className="absolute start-3 top-3 rounded-md bg-destructive px-2 py-0.5 text-xs font-semibold text-destructive-foreground">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.name[language] || product.name.fr}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-foreground">
              {formatPrice(product.price)} {t('currency')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className={`text-xs font-medium ${stockColor}`}>{stockLabel}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 'out_of_stock'}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
          {t('featured.addToCart')}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
