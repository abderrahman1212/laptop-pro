import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Truck, Headphones, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Award, title: t('trust.quality'), desc: t('trust.qualityDesc') },
    { icon: Shield, title: t('trust.warranty'), desc: t('trust.warrantyDesc') },
    { icon: Truck, title: t('trust.shipping'), desc: t('trust.shippingDesc') },
    { icon: Headphones, title: t('trust.support'), desc: t('trust.supportDesc') },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {t('trust.title')}
          </h2>
          <p className="mt-3 text-muted-foreground">{t('trust.subtitle')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-soft transition-all hover:shadow-hover"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
