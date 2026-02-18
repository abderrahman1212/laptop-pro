import { Link } from 'react-router-dom';
import { ShoppingCart, Star, BadgeCheck } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: any; // Using any for now to facilitate early integration with dynamic data
}

const conditionColors: Record<string, string> = {
  'New': 'badge-new',
  'Refurbished': 'badge-refurbished',
  'Used - Good': 'bg-warning text-warning-foreground',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden card-hover shadow-product flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-muted">
        <img
          src={product.images?.[0] ? `${import.meta.env.VITE_STORAGE_URL}/${product.images[0]}` : '/placeholder-product.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${conditionColors[product.condition || 'New']}`}>
            {product.condition || 'New'}
          </span>
          {product.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary text-primary-foreground">
              {product.badge}
            </span>
          )}
        </div>
        {discount > 0 && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md badge-sale">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-muted-foreground mb-1 font-medium">{product.brand || product.category?.name || 'Laptop'}</p>
          <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= Math.round(product.rating || 5) ? 'fill-warning text-warning' : 'fill-muted text-muted'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating || '5.0'} ({product.reviewCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Warranty badge */}
        {(product.condition === 'Refurbished' || !product.condition) && (
          <div className="flex items-center gap-1 text-xs text-success mb-3">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span className="font-medium">12-month warranty</span>
          </div>
        )}

        {/* Stock */}
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-destructive font-medium mb-2">
            Only {product.stock} left in stock!
          </p>
        )}

        <div className="mt-auto pt-2">
          <Button
            className="w-full"
            size="sm"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            {(product.stock > 0 || product.inStock) ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}
