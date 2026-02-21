import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-laptop.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid min-h-[520px] items-center gap-8 py-12 lg:grid-cols-2 lg:py-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('hero.title')}{' '}
              <span className="text-gradient">{t('hero.subtitle')}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-hero px-6 py-3 font-display text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-hover hover:scale-[1.02]"
              >
                {t('hero.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products?category=laptops"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-display text-sm font-semibold text-foreground shadow-soft transition-all hover:bg-secondary"
              >
                {t('hero.secondary')}
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={heroImage}
              alt="bh-tech Premium Laptop"
              className="w-full max-w-lg rounded-2xl shadow-elevated object-cover"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
