import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { q: 'What does "Certified Refurbished" mean?', a: 'Our certified refurbished laptops are professionally tested, cleaned, and repaired by our technicians. They come with a 12-month warranty and are graded to ensure they look and perform like new.' },
  { q: 'Do refurbished laptops come with Windows?', a: 'Yes — all our refurbished laptops include a genuine, licensed copy of Windows 11 Pro or Home (as specified in the product listing).' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy on all products. If you\'re not satisfied, contact us and we\'ll arrange a free return label.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days. Express shipping (1–2 business days) is available at checkout. Orders over $100 receive free standard shipping.' },
  { q: 'How do I book a repair?', a: 'You can book a repair online via our Services page, by calling +1 (555) 123-4567, or by walking into our workshop at 123 Tech Street, San Francisco.' },
  { q: 'Are the replacement parts compatible with my laptop?', a: 'Each part listing includes a compatibility section. If you\'re unsure, contact us with your laptop model and we\'ll confirm compatibility before you order.' },
  { q: 'Do you offer any warranty on repairs?', a: 'Yes — all repairs come with a minimum 90-day warranty. Battery replacements carry a 12-month warranty.' },
  { q: 'Can I sell my laptop to you?', a: 'We do buy laptops in bulk for business customers. Contact us at sales@techfixpro.com for a quote.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
          <p className="text-white/60">Everything you need to know about TechFix Pro</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
