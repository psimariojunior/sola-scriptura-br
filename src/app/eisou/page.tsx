'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { eisou as EU_SOUS } from '@/data/eisou';

export default function EISOUPage() {
  const [expandido, setExpandido] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <Crown className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                As Sete Declarações <span className="italic text-primary">&ldquo;Eu Sou&rdquo;</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                As sete declarações joaninas onde Jesus usa a expressão divina &ldquo;Eu Sou&rdquo; (ἐγώ εἰμί), revelando sua identidade messiânica e divina no Evangelho de João.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: '7', label: 'Declarações' },
                { value: 'João', label: 'Evangelho' },
                { value: 'ἐγώ εἰμί', label: 'Grego' },
                { value: 'AT', label: 'Referência' },
              ].map((stat) => (
                <motion.div key={stat.label} className="sola-card p-4 text-center" whileHover={{ y: -2 }}>
                  <p className="font-display text-2xl font-light text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {EU_SOUS.map((eu, i) => (
              <ScrollReveal key={eu.id} delay={i * 0.08}>
                <motion.div
                  className="glass-card rounded-xl overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setExpandido(expandido === eu.id ? null : eu.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-display text-lg font-bold text-primary">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-display text-2xl font-semibold mb-1">{eu.titulo}</h2>
                        <Link
                          href={`/biblia?livro=${eu.livro}&capitulo=${eu.capitulo}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {eu.referencia}
                        </Link>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${expandido === eu.id ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandido === eu.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                          <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                            <p className="font-serif-body text-sm leading-relaxed italic text-foreground">
                               &ldquo;{eu.texto}&rdquo;
                            </p>
                          </div>

                          <div>
                            <h4 className="font-display text-sm font-bold text-primary mb-1 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Significado Teológico
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{eu.significado}</p>
                          </div>

                          <div>
                            <h4 className="font-display text-sm font-bold text-primary mb-1 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Contexto Histórico
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{eu.contexto}</p>
                          </div>

                          <div>
                            <h4 className="font-display text-sm font-bold text-primary mb-1 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                               Cristologia
                             </h4>
                             <p className="text-sm text-muted-foreground leading-relaxed">{eu.tema}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-12 text-center">
              <div className="sola-card p-6 rounded-xl max-w-2xl mx-auto">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg font-semibold mb-2">A Expressão &ldquo;Eu Sou&rdquo;</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aexpressão grega <span className="font-bold">ἐγώ εἰμί</span> (ego eimi) conecta Jesus diretamente ao nome divino revelado a Moisés em Êxodo 3:14 — <span className="font-bold">אֶהְיֶה אֲשֶׁר אֶהְיֶה</span> (&ldquo;Eu Sou o que Sou&rdquo;). Nos Sinóticos, Jesus também usa estaexpressão, mas são em João onde elas aparecem de forma mais pronunciada e deliberada, formando o núcleo da cristologia joanina.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
