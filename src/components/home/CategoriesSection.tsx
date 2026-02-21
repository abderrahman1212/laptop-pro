import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { useRef, useEffect, useState, useCallback } from 'react';

const CategoriesSection = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const speedRef = useRef(typeof window !== 'undefined' && window.innerWidth < 768 ? 0.8 : 0.5);

  useEffect(() => {
    const onResize = () => {
      speedRef.current = window.innerWidth < 768 ? 0.8 : 0.5;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Triple the items for seamless looping
  const items = [...categories, ...categories, ...categories];

  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Width of one set of categories
    const singleSetWidth = el.scrollWidth / 3;

    positionRef.current += speedRef.current;

    // Reset seamlessly when one full set has scrolled
    if (positionRef.current >= singleSetWidth) {
      positionRef.current -= singleSetWidth;
    }

    el.style.transform = `translateX(-${positionRef.current}px)`;
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, animate]);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {t('categories.title')}
          </h2>
          <p className="mt-3 text-muted-foreground">{t('categories.subtitle')}</p>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

        <div
          ref={scrollRef}
          className="flex w-max gap-3 will-change-transform"
          style={{ transition: isPaused ? 'transform 0.3s ease-out' : 'none' }}
        >
          {items.map((cat, i) => (
            <Link
              key={`${cat.id}-${i}`}
              to={`/products?category=${cat.id}`}
              className="group flex w-28 flex-shrink-0 flex-col items-center gap-2.5 rounded-xl border bg-card p-4 shadow-soft transition-all hover:shadow-hover hover:border-primary/20 hover:-translate-y-0.5 sm:w-32"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-center text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors line-clamp-1">
                {t(`categories.${cat.id}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
