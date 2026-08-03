'use client';

import Link from 'next/link';
import { memo } from 'react';
import { BookOpen, Mail, ExternalLink, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal';

function FooterInner() {
  const { t } = useTranslation();

  const ferramentas = [
    { href: '/biblia', label: t('nav.bible') },
    { href: '/comparar', label: t('footer.compareTranslations') },
    { href: '/pesquisa', label: t('nav.search') },
    { href: '/exegese', label: t('footer.exegesis') },
    { href: '/idiomas', label: t('footer.originalLanguages') },
    { href: '/ferramentas', label: t('footer.tools') },
    { href: '/ferramentas/critica-textual', label: t('footer.textualCriticism') },
    { href: '/ferramentas/concordancia', label: t('footer.concordance') },
    { href: '/estudo-colaborativo', label: t('footer.collaborativeStudy') },
  ];

  const estudo = [
    { href: '/teologia', label: t('footer.systematicTheology') },
    { href: '/historia', label: t('footer.biblicalHistory') },
    { href: '/cronologia', label: t('nav.chronology') },
    { href: '/personagens', label: t('nav.characters') },
    { href: '/atlas', label: t('footer.biblicalAtlas') },
    { href: '/ia', label: t('footer.aiAssistant') },
  ];

  return (
    <footer className="border-t border-border bg-card/50 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 40%)',
      }} />
      
      <div className="max-w-6xl mx-auto px-5 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <motion.div 
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <BookOpen className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </motion.div>
              <span className="font-display text-xl font-semibold">Sola Scriptura</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              {t('footer.description')}
            </p>

            <div className="flex items-center gap-3">
              <a href="mailto:contato@solascripura.com" className="text-muted-foreground hover:text-foreground transition-colors duration-200" aria-label="Enviar email de contato">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200" aria-label="GitHub">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200" aria-label="Twitter">
                <X className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.tools')}</h3>
            <ul className="space-y-2" aria-label="Ferramentas">
              {ferramentas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.study')}</h3>
            <ul className="space-y-2" aria-label="Estudo">
              {estudo.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>

        <div className="mt-10 pt-6 divider-gradient">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Sola Scriptura — Estudo Bíblico Acadêmico · Feito com <Heart className="w-3 h-3 inline text-red-500 fill-current" /> para o povo de Deus · 100% gratuito
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-muted-foreground text-center md:text-right">
                &copy; {new Date().getFullYear()} Sola Scriptura. {t('footer.rightsReserved')}
              </p>
              <Link href="/privacidade" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterInner);
