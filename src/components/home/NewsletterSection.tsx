import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Send } from 'lucide-react';

const NewsletterSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  return (
    <section className="bg-gradient-hero py-14 lg:py-20">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <h2 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
          {t('newsletter.title')}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80">
          {t('newsletter.description')}
        </p>
        <div className="mx-auto mt-6 flex max-w-md overflow-hidden rounded-lg bg-card shadow-elevated">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('newsletter.placeholder')}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">{t('newsletter.subscribe')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
