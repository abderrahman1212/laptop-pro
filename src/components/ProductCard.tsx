import { Link } from 'react-router-dom';
import { ShoppingCart, Star, BadgeCheck } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
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
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${conditionColors[product.condition]}`}>
            {product.condition}
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
          <p className="text-xs text-muted-foreground mb-1 font-medium">{product.brand}</p>
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
                className={`w-3 h-3 ${i <= Math.round(product.rating) ? 'fill-warning text-warning' : 'fill-muted text-muted'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
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
        {product.condition === 'Refurbished' && (
          <div className="flex items-center gap-1 text-xs text-success mb-3">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span className="font-medium">12-month warranty</span>
          </div>
        )}

        {/* Stock */}
        {product.stockCount <= 5 && product.inStock && (
          <p className="text-xs text-destructive font-medium mb-2">
            Only {product.stockCount} left in stock!
          </p>
        )}

        <div className="mt-auto pt-2">
          <Button
            className="w-full"
            size="sm"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}
