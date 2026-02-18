import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, RotateCcw, Star, Wrench, Search, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { repairServices } from '@/data/products';
import { getCategories, getProducts } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import heroImg from '@/assets/hero-laptops.jpg';
import repairImg from '@/assets/repair-service.jpg';
import partsImg from '@/assets/laptop-parts.jpg';


const reviews = [
  { name: 'James R.', rating: 5, text: 'Got a refurbished ThinkPad T480 — it looks and works like new. The warranty gave me total peace of mind.', product: 'ThinkPad T480' },
  { name: 'Sarah M.', rating: 5, text: 'Screen replacement done same day, half the price of the Apple Store. Technicians were professional and fast.', product: 'Screen Replacement Service' },
  { name: 'David K.', rating: 5, text: 'Ordered a replacement battery for my HP. Arrived in 2 days, easy to install with the guide. Works perfectly.', product: 'HP Battery' },
  { name: 'Lisa T.', rating: 4, text: 'Great selection of refurbished laptops at fair prices. Customer support was very responsive.', product: 'Dell XPS 15' },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [featuredLaptops, setFeaturedLaptops] = useState<any[]>([]);
  const [featuredParts, setFeaturedParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cats = await getCategories(language);
        setCategories(cats);

        const productsResponse = await getProducts({ lang: language });
        const products = productsResponse.data;

        // Split products for display (mocking the split if categories are limited)
        setFeaturedLaptops(products.slice(0, 4));
        setFeaturedParts(products.slice(4, 8));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[580px] lg:min-h-[660px] bg-hero overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" aria-hidden="true" />

        <div className="relative container mx-auto px-4 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-fade-in-up">
              <Zap className="w-3 h-3" /> Trusted by 10,000+ customers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-fade-in-up-delay-1">
              Laptops. Parts.{' '}
              <span className="text-gradient-hero">Repairs.</span>
            </h1>
            <p className="text-lg text-white/75 mb-8 leading-relaxed animate-fade-in-up-delay-2">
              Shop refurbished & new laptops with warranty, genuine repair parts, and professional repair services — all in one place.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mb-8 animate-fade-in-up-delay-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search laptops, parts, brands..."
                  className="pl-9 h-12 text-base bg-white/95 border-0 text-foreground"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6 shadow-blue">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap gap-3 animate-fade-in-up-delay-3">
              <Button size="lg" asChild className="shadow-blue">
                <Link to="/laptops">Shop Laptops <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <Link to="/services">Book a Repair <Wrench className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative container mx-auto px-4 pb-8">
          <div className="grid grid-cols-3 max-w-lg gap-4">
            {[
              ['10,000+', 'Happy Customers'],
              ['500+', 'SKUs In Stock'],
              ['4.8/5', 'Customer Rating'],
            ].map(([stat, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat}</div>
                <div className="text-xs text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: '12-Month Warranty', sub: 'All refurbished products' },
              { icon: Truck, label: 'Free Shipping $100+', sub: 'Express available' },
              { icon: RotateCcw, label: '30-Day Returns', sub: 'Hassle-free' },
              { icon: Star, label: 'Expert Support', sub: 'Mon–Sat, 9AM–6PM' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 py-1">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground mb-8">Everything your laptop needs, in one place.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.length > 0 ? (
              categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/laptops?category_id=${cat.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border card-hover shadow-product"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cat.image || heroImg}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{cat.description || 'Quality products in this category.'}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all gap-1">
                      Browse Category <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              // Loading or Empty state
              [1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-muted rounded-2xl animate-pulse" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Featured Laptops ── */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Top Laptops</h2>
              <p className="text-muted-foreground">Refurbished and new — all with warranty</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/laptops">View All <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-[400px] bg-muted rounded-xl animate-pulse" />)
            ) : (
              featuredLaptops.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Repair Services Banner ── */}
      <section className="py-16 bg-hero overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${repairImg})` }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 bg-primary/30 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Wrench className="w-3 h-3" /> Professional Repair Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Laptop broke? We fix it <span className="text-gradient-hero">same day.</span>
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Cracked screen, dead battery, overheating, data loss — our certified technicians handle it all. Free diagnostic, no obligation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {repairServices.slice(0, 3).map(svc => (
                <div key={svc.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left border border-white/20">
                  <div className="text-white font-semibold mb-1">{svc.title}</div>
                  <div className="text-primary font-bold text-lg">
                    {svc.price === 0 ? 'FREE' : `From $${svc.price}`}
                  </div>
                  <div className="text-white/50 text-xs mt-1">{svc.turnaround}</div>
                </div>
              ))}
            </div>
            <Button size="lg" asChild className="shadow-blue">
              <Link to="/services">Book a Repair Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Featured Parts ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Popular Parts</h2>
              <p className="text-muted-foreground">Quality components for DIY repairs</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/parts">View All <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-[400px] bg-muted rounded-xl animate-pulse" />)
            ) : (
              featuredParts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">What Customers Say</h2>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-warning text-warning" />)}
              <span className="text-lg font-bold text-foreground ml-1">4.8</span>
              <span className="text-muted-foreground">from 3,000+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-product">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-warning text-warning' : 'fill-muted text-muted'}`} />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">"{review.text}"</p>
                <div>
                  <div className="text-sm font-semibold text-foreground">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.product}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Get deals before anyone else</h2>
          <p className="text-muted-foreground mb-6">Subscribe for exclusive discounts, new arrivals, and repair tips.</p>
          <form className="flex gap-2 max-w-md mx-auto">
            <Input type="email" placeholder="your@email.com" className="flex-1 h-11" />
            <Button type="submit" className="h-11 px-6">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe anytime. By subscribing you agree to our Privacy Policy.</p>
        </div>
      </section>
    </main>
  );
}
