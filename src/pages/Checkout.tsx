import { useState } from 'react';
import { CheckCircle, CreditCard, Truck, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

const steps = ['Contact', 'Shipping', 'Payment'];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [ordered, setOrdered] = useState(false);
  const { items, totalPrice, clearCart } = useCart();

  const shipping = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  if (ordered) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed! 🎉</h1>
          <p className="text-muted-foreground mb-2">Order #TFP-{Math.floor(Math.random() * 90000) + 10000}</p>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation to your email. Your order will be shipped within 1 business day.
          </p>
          <Button asChild className="shadow-blue"><a href="/">Back to Home</a></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${i < step ? 'bg-success text-success-foreground' :
                    i === step ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'}`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-px w-8 sm:w-16 mx-2 ${i < step ? 'bg-success' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Contact Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  <Button className="w-full shadow-blue" onClick={() => setStep(1)}>
                    Continue to Shipping <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" /> Shipping Address
                  </h2>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Address Line 1</label>
                    <Input placeholder="123 Main Street" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Address Line 2</label>
                    <Input placeholder="Apt, suite, etc. (optional)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">City</label>
                      <Input placeholder="San Francisco" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">ZIP Code</label>
                      <Input placeholder="94102" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Shipping Method</label>
                    <div className="space-y-2">
                      {[
                        { id: 'standard', label: 'Standard Shipping (3–5 days)', price: shipping === 0 ? 'FREE' : '$9.99' },
                        { id: 'express', label: 'Express Shipping (1–2 days)', price: '$19.99' },
                      ].map(opt => (
                        <label key={opt.id} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <div className="flex items-center gap-2">
                            <input type="radio" name="shipping" defaultChecked={opt.id === 'standard'} className="accent-primary" />
                            <span className="text-sm text-foreground">{opt.label}</span>
                          </div>
                          <span className={`text-sm font-semibold ${opt.price === 'FREE' ? 'text-success' : 'text-foreground'}`}>
                            {opt.price}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                    <Button className="flex-1 shadow-blue" onClick={() => setStep(2)}>
                      Continue to Payment <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" /> Payment
                  </h2>
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-foreground">
                    🔒 This is a demo checkout. No real payment will be processed.
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Card Number</label>
                    <Input placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Expiry</label>
                      <Input placeholder="MM / YY" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">CVV</label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name on Card</label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button
                      className="flex-1 shadow-blue"
                      onClick={() => { setOrdered(true); clearCart(); }}
                    >
                      Place Order — ${total.toFixed(2)}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover bg-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground line-clamp-2">{product.title}</p>
                      <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-foreground">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-success' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground border-t border-border pt-2">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
