'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface EISOU {
  id: string;
  titulo: string;
  referencia: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  versiculoFim?: number;
  versoCompleto: string;
  significado: string;
  contexto: string;
  cristologia: string;
}

const EU_SOUS: EISOU[] = [
  {
    id: 'eu-001',
    titulo: 'Eu Sou o Pão da Vida',
    referencia: 'João 6:35',
    livro: 'jo',
    capitulo: 6,
    versiculo: 35,
    versoCompleto: 'Disse-lhes Jesus: Eu sou o pão da vida; quem vem a mim jamais terá fome, e quem crê em mim jamais terá sede.',
    significado: 'Jesus se declara como a fonte de sustento espiritual eterno. Assim como o maná sustentou Israel no deserto, Cristo é o almo que satisfaz a fome da alma por toda a eternidade.',
    contexto: 'Dito após a multiplicação dos pães, quando a multidão o procurava por terem comido dos pães multiplicados. Jesus direciona o foco do alimento físico para o alimento espiritual.',
    cristologia: 'Afirmação da divindade de Cristo — Ele não aponta para um meio de sustento, mas se identifica diretamente com a dádiva divina. Aexpressão "Eu sou" (ἐγώ εἰμί) ecoa o nome de Deus no AT.',
  },
  {
    id: 'eu-002',
    titulo: 'Eu Sou a Luz do Mundo',
    referencia: 'João 8:12',
    livro: 'jo',
    capitulo: 8,
    versiculo: 12,
    versoCompleto: 'Tornou-lhes Jesus Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.',
    significado: 'Jesus é a revelação divina que ilumina a escuridão do pecado e da ignorância. Ele é o guia seguro que conduz os seus ao conhecimento da verdade e à salvação.',
    contexto: 'Durante a festa dos tabernáculos, onde os candeeiros gigantes iluminavam o templo. Jesus se apresenta como a verdadeira luz que substitui todas as luzes simbólicas.',
    cristologia: 'Jesus usa aexpressão "Eu sou" (ἐγώ εἰμí) em conexão com uma metáfora do AT (Is 42:6, 49:6). Afirma ser a luz espiritual que os profetas prometeram.',
  },
  {
    id: 'eu-003',
    titulo: 'Eu Sou a Porta',
    referencia: 'João 10:7, 9',
    livro: 'jo',
    capitulo: 10,
    versiculo: 7,
    versiculoFim: 9,
    versoCompleto: 'Tornou-lhes Jesus outra vez: Em verdade, em verdade vos digo que Eu sou a porta das ovelhas... Eu sou a porta; quem entrar por mim será salvo.',
    significado: 'Jesus é o único caminho de acesso ao Pai e à salvação. Por Ele temos entrada no rebanho de Deus e encontramos pasto abundante.',
    contexto: 'No contexto da parábola do bom pastor, Jesus se diferencia dos ladrões e salteadores que entram pelo lado errado. Ele é tanto o portão de entrada quanto o pastor que cuida.',
    cristologia: 'A declaração "Eu sou" indica acesso exclusivo ao Pai. Cristo é a mediação única entre Deus e os homens (1 Tm 2:5).',
  },
  {
    id: 'eu-004',
    titulo: 'Eu Sou o Bom Pastor',
    referencia: 'João 10:11, 14',
    livro: 'jo',
    capitulo: 10,
    versiculo: 11,
    versiculoFim: 14,
    versoCompleto: 'Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas... Eu sou o bom pastor e conheço as minhas ovelhas, e as minhas me conhecem.',
    significado: 'Jesus cuida pessoalmente do seu povo, conhece cada um pelo nome e está disposto a sacrificar sua própria vida pela segurança do rebanho.',
    contexto: 'Contrastando com os mercenários que fogem do lobo, Jesus se apresenta como o pastor que permanece e defende até a morte. Referência a Ezequiel 34.',
    cristologia: 'Declaração cristológica profunda — Jesus é Deus como o bom pastor de Israel (Sl 23), mas agora encarnado e pronto a dar a sua vida.',
  },
  {
    id: 'eu-005',
    titulo: 'Eu Sou a Ressurreição e a Vida',
    referencia: 'João 11:25',
    livro: 'jo',
    capitulo: 11,
    versiculo: 25,
    versoCompleto: 'Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.',
    significado: 'A morte não tem a última palavra para quem crê em Cristo. Ele mesmo é a fonte da vida eterna e vence a morte.',
    contexto: 'Dito a Marta antes da ressurreição de Lázaro, em meio ao luto e à dor da perda. Jesus revela que a ressurreição não é apenas um evento futuro, mas uma realidade presente nele.',
    cristologia: 'A mais forte declaração de poder sobre a morte. Jesus não apenas dá a vida — Ele é a vida. Afirma ter autoridade soberana sobre a morte.',
  },
  {
    id: 'eu-006',
    titulo: 'Eu Sou o Caminho, a Verdade e a Vida',
    referencia: 'João 14:6',
    livro: 'jo',
    capitulo: 14,
    versiculo: 6,
    versoCompleto: 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.',
    significado: 'A exclusividade de Cristo como único caminho de salvação. Ele não é apenas um guia — Ele é o próprio caminho, a verdade absoluta e a fonte da vida.',
    contexto: 'No discurso de despedida, quando Tomé pergunta como ir ao lugar onde Jesus vai. A resposta elimina qualquer alternativa de salvação fora de Cristo.',
    cristologia: 'Declaração mais abrangente da identidade de Cristo. Ele é o caminho (mediação), a verdade (revelação) e a vida (salvação). Nega qualquer pluralismo religioso.',
  },
  {
    id: 'eu-007',
    titulo: 'Eu Sou a Videira',
    referencia: 'João 15:1, 5',
    livro: 'jo',
    capitulo: 15,
    versiculo: 1,
    versiculoFim: 5,
    versoCompleto: 'Eu sou a videira verdadeira, e meu Pai é o agricultor... Eu sou a videira, vós as cepas; quem permanece em mim, e eu nele, esse muito frutifica.',
    significado: 'A união vital com Cristo é condição indispensável para frutificar na vida cristã. Sem Ele nada podemos fazer.',
    contexto: 'Ultima parábola de Jesus antes da Paixão, dita no caminho para o Getsêmani. A metáfora da videira era conhecida no AT como símbolo de Israel (Is 5, Sl 80).',
    cristologia: 'Jesus se apresenta como a verdadeira videira de Israel — Ele cumpre e substitui a aliança que Israel quebrou. A vida espiritual depende exclusivamente dele.',
  },
];

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
                              &ldquo;{eu.versoCompleto}&rdquo;
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
                            <p className="text-sm text-muted-foreground leading-relaxed">{eu.cristologia}</p>
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
