import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
                <span className="text-sm font-bold text-primary-foreground">B</span>
              </div>
              <span className="font-display text-lg font-bold text-foreground">bh-tech</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.products')}</Link></li>
              <li><Link to="/products?category=laptops" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.laptops')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t('footer.faq')}</span></li>
              <li><span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t('footer.returns')}</span></li>
              <li><span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t('nav.contact')}</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t('footer.privacy')}</span></li>
              <li><span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t('footer.terms')}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
