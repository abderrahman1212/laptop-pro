import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const langLabels: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-secondary"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{langLabels[language]}</span>
      </button>
      {open && (
        <div className="absolute end-0 top-full mt-1 w-36 rounded-lg border bg-card p-1 shadow-elevated z-50">
          {(Object.keys(langLabels) as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setOpen(false); }}
              className={`w-full rounded-md px-3 py-2 text-start text-sm transition-colors ${
                language === lang ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
              }`}
            >
              {langLabels[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
