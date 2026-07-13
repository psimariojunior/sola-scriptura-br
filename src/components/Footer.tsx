'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Mail, Github, Twitter, Heart, ArrowRight, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const ferramentas = [
  { href: '/biblia', label: 'Bíblia' },
  { href: '/pesquisa', label: 'Pesquisa' },
  { href: '/exegese', label: 'Exegese' },
  { href: '/idiomas', label: 'Línguas Originais' },
  { href: '/ferramentas', label: 'Atlas Bíblico' },
];

const estudo = [
  { href: '/teologia', label: 'Teologia Sistemática' },
  { href: '/historia', label: 'História Bíblica' },
  { href: '/cronologia', label: 'Cronologia' },
  { href: '/personagens', label: 'Personagens' },
  { href: '/ia', label: 'Assistente IA' },
];

const recursos = [
  { href: '/estudos', label: 'Meus Estudos' },
  { href: '/devocional', label: 'Devocional Diário' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/estatisticas', label: 'Estatísticas' },
  { href: '/admin', label: 'Painel Admin' },
  { href: '/auth/login', label: 'Minha Conta' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-border bg-card/50 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 40%)',
      }} />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
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
              Estudo bíblico acadêmico com rigor. Grego Koiné, Hebraico Bíblico, Teologia Sistemática,
              Exegese e Inteligência Artificial — tudo integrado em uma plataforma completa.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Receba novidades</p>
              {subscribed ? (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current" /> Obrigado por se inscrever!
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2" aria-label="Inscrever-se na newsletter">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    aria-label="Endereço de email para newsletter"
                    className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2.5 min-h-[44px] bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
                    aria-label="Inscrever-se"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-4">
              <motion.a href="mailto:contato@solascripura.com" whileHover={{ scale: 1.1, rotate: 5 }} className="text-muted-foreground hover:text-foreground transition-all duration-300" aria-label="Enviar email de contato">
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, rotate: -5 }} className="text-muted-foreground hover:text-foreground transition-all duration-300" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, rotate: 5 }} className="text-muted-foreground hover:text-foreground transition-all duration-300" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Ferramentas</h3>
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
            <h3 className="font-semibold text-sm mb-4">Estudo</h3>
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

          <div>
            <h3 className="font-semibold text-sm mb-4">Recursos</h3>
            <ul className="space-y-2" aria-label="Recursos">
              {recursos.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Sola Scriptura — Estudo Bíblico Acadêmico · Feito com <Heart className="w-3 h-3 inline text-red-500 fill-current" /> e rigor
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('ssb_onboarding_done');
                    window.dispatchEvent(new CustomEvent('ssb:reset-onboarding'));
                  } catch { /* ignore */ }
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Refazer tour
              </button>
              <p className="text-xs text-muted-foreground text-center md:text-right">
                &copy; {new Date().getFullYear()} Sola Scriptura. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
