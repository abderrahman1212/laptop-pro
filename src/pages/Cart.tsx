import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some laptops or parts to get started.</p>
          <div className="flex flex-col gap-3">
            <Button asChild><Link to="/laptops">Shop Laptops</Link></Button>
            <Button variant="outline" asChild><Link to="/parts">Browse Parts</Link></Button>
          </div>
        </div>
      </main>
    );
  }

  const shipping = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Shopping Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-card border border-border rounded-xl p-4 flex gap-4">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg bg-muted"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mb-2">
                    Condition: {product.condition} · SKU: {product.sku}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2.5 py-1 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-semibold">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2.5 py-1 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-foreground">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

              <div className="space-y-2.5 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-success' : 'text-foreground'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(100 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2.5 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-xl text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input placeholder="Promo code" className="pl-8 h-9 text-sm" />
                </div>
                <Button variant="outline" size="sm">Apply</Button>
              </div>

              <Button className="w-full mb-3 shadow-blue" size="lg" asChild>
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/laptops">Continue Shopping</Link>
              </Button>

              <div className="mt-4 pt-4 border-t border-border text-center text-xs text-muted-foreground">
                🔒 Secure checkout · SSL encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
