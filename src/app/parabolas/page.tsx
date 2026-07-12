'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ChevronRight, Quote } from 'lucide-react';
import Link from 'next/link';
import { getParalelosPorCategoria } from '@/data/biblia/sinopticos';

const EVANGELHOS = [
  { chave: 'todos', label: 'Todos' },
  { chave: 'mt', label: 'Mateus' },
  { chave: 'mc', label: 'Marcos' },
  { chave: 'lc', label: 'Lucas' },
  { chave: 'jo', label: 'João' },
];

const PARABOLAS_EXTRA = [
  { id: 'extra-001', titulo: 'Parábola do Bom Samaritano', referencia: 'Lc 10:25-37', tema: 'Misericórdia', interpretacao: 'O amor ao próximo não conhece fronteiras. Jesus redefine o \"próximo\" como todo aquele que precisa de ajuda, independentemente de etnia ou religião.' },
  { id: 'extra-002', titulo: 'Parábola do Filho Pródigo', referencia: 'Lc 15:11-32', tema: 'Perdão / Arrependimento', interpretacao: 'O amor do Pai é incondicional. Deus busca o perdido com alegria e restaura com generosidade. A religiosidade pode impedir a celebração da graça.' },
  { id: 'extra-003', titulo: 'Parábola do Rico e Lázaro', referencia: 'Lc 16:19-31', tema: 'Justiça Social', interpretacao: 'A indiferença com os pobres tem consequências eternas. Os ricos têm responsabilidade moral com os necessitados.' },
  { id: 'extra-004', titulo: 'Parábola do Juiz Injusto', referencia: 'Lc 18:1-8', tema: 'Oração / Perseverança', interpretacao: 'Se um juiz injusto concede justiça por insistência, quanto mais o Deus justo responderá à oração dos seus eleitos.' },
  { id: 'extra-005', titulo: 'Parábola do Fariseu e do Publicano', referencia: 'Lc 18:9-14', tema: 'Humildade / Justificação', interpretacao: 'A justiça própria não agrada a Deus. A humildade que reconhece o próprio pecado é aceita diante do Pai.' },
  { id: 'extra-006', titulo: 'Parábola das Dez Virgens', referencia: 'Mt 25:1-13', tema: 'Vigilância', interpretacao: 'Preparar-se para a vinda do noivo exige fé ativa e não apenas nominal. A prudente usa os recursos que tem com sabedoria.' },
  { id: 'extra-007', titulo: 'Parábola dos Talentos', referencia: 'Mt 25:14-30', tema: 'Responsabilidade', interpretacao: 'Deus espera que usemos os dons recebidos para o Seu reino. A estagnação por medo não é aceita por Deus.' },
  { id: 'extra-008', titulo: 'Parábola da Videira', referencia: 'Jo 15:1-17', tema: 'União com Cristo', interpretacao: 'Sem Cristo nada podemos fazer. A comunhão com Ele produz fruto abundante. Os ramos que não frutificam são cortados.' },
];

function parseRef(ref: string): { livro: string; capitulo: string } {
  const parts = ref.split(':');
  return { livro: parts[0] || 'mt', capitulo: parts[1] || '1' };
}

export default function ParabolasPage() {
  const [busca, setBusca] = useState('');
  const [filtroEvangelho, setFiltroEvangelho] = useState('todos');
  const [expandido, setExpandido] = useState<string | null>(null);

  const parabolasBase = useMemo(() => getParalelosPorCategoria('parabola'), []);

  const todasParabolas = useMemo(() => {
    const base = parabolasBase.map((p) => ({
      ...p,
      titulo: p.titulo,
      referencia: p.mateus?.[0] || p.marcos?.[0] || p.lucas?.[0] || p.joao?.[0] || '',
      tema: p.categoria,
      interpretacao: p.notas || '',
      evangelho: [
        p.mateus ? 'mt' : null,
        p.marcos ? 'mc' : null,
        p.lucas ? 'lc' : null,
        p.joao ? 'jo' : null,
      ].filter(Boolean),
    }));

    const extras = PARABOLAS_EXTRA.map((pe) => ({
      id: pe.id,
      titulo: pe.titulo,
      referencia: pe.referencia,
      tema: pe.tema,
      interpretacao: pe.interpretacao,
      evangelho: [pe.referencia.split(' ')[0].toLowerCase()],
      mateus: pe.referencia.includes('Mt') ? [pe.referencia.replace('Mt ', 'mt:')] : undefined,
      marcos: pe.referencia.includes('Mc') ? [pe.referencia.replace('Mc ', 'mc:')] : undefined,
      lucas: pe.referencia.includes('Lc') ? [pe.referencia.replace('Lc ', 'lc:')] : undefined,
      joao: pe.referencia.includes('Jo') ? [pe.referencia.replace('Jo ', 'jo:')] : undefined,
    }));

    return [...base, ...extras];
  }, [parabolasBase]);

  const parabolasFiltradas = useMemo(() => {
    let lista = todasParabolas;
    if (filtroEvangelho !== 'todos') {
      const chaveMap: Record<string, string> = { mt: 'mateus', mc: 'marcos', lc: 'lucas', jo: 'joao' };
      lista = lista.filter((p) => p[chaveMap[filtroEvangelho] as keyof typeof p] && (p[chaveMap[filtroEvangelho] as keyof typeof p] as string[]).length > 0);
    }
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.referencia.toLowerCase().includes(q) ||
          p.tema.toLowerCase().includes(q) ||
          (p.interpretacao && p.interpretacao.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [todasParabolas, busca, filtroEvangelho]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <Quote className="w-8 h-8 text-amber-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Parábolas <span className="italic text-primary">de Jesus</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Índice completo das parábolas de Cristo. Referências sinóticas, temas e interpretações resumidas.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar parábola, tema ou referência..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {EVANGELHOS.map((ev) => (
                    <motion.button
                      key={ev.chave}
                      onClick={() => setFiltroEvangelho(ev.chave)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                        filtroEvangelho === ev.chave
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {ev.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {parabolasFiltradas.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  <div
                    className="glass-card p-5 cursor-pointer rounded-xl"
                    onClick={() => setExpandido(expandido === p.id ? null : p.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl font-semibold mb-2">{p.titulo}</h3>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                            {p.tema}
                          </span>
                          {p.mateus && p.mateus.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(p.mateus[0]).livro}&capitulo=${parseRef(p.mateus[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:opacity-80 transition-opacity"
                            >
                              Mt {p.mateus[0].replace('mt:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                          {p.marcos && p.marcos.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(p.marcos[0]).livro}&capitulo=${parseRef(p.marcos[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 hover:opacity-80 transition-opacity"
                            >
                              Mc {p.marcos[0].replace('mc:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                          {p.lucas && p.lucas.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(p.lucas[0]).livro}&capitulo=${parseRef(p.lucas[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 hover:opacity-80 transition-opacity"
                            >
                              Lc {p.lucas[0].replace('lc:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                          {p.joao && p.joao.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(p.joao[0]).livro}&capitulo=${parseRef(p.joao[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 hover:opacity-80 transition-opacity"
                            >
                              Jo {p.joao[0].replace('jo:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${expandido === p.id ? 'rotate-90' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {expandido === p.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 border-t border-border mt-3">
                            {p.interpretacao && (
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-xs font-bold text-primary mt-0.5">INT.</span>
                                <p className="text-sm text-muted-foreground leading-relaxed">{p.interpretacao}</p>
                              </div>
                            )}
                            {'notas' in p && p.notas && (p as { notas?: string }).notas !== p.interpretacao && (
                              <p className="text-xs text-muted-foreground italic mt-2">{(p as { notas?: string }).notas}</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {parabolasFiltradas.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl text-muted-foreground">Nenhuma parábola encontrada</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
