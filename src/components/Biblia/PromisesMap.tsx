'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, ExternalLink, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Promessa {
  id: string;
  titulo: string;
  descricao: string;
  versiculos: { ref: string; texto: string }[];
  categoria: 'alianca' | 'protecao' | 'provisao' | 'perdao' | 'vitoria' | 'retorno' | 'eternidade';
  testamento: 'AT' | 'NT' | 'ambos';
  cor: string;
}

const CATEGORIAS: Record<string, { label: string; cor: string; emoji: string }> = {
  alianca: { label: 'Aliança', cor: 'from-blue-500 to-cyan-500', emoji: '🤝' },
  protecao: { label: 'Proteção', cor: 'from-green-500 to-emerald-500', emoji: '🛡️' },
  provisao: { label: 'Provisão', cor: 'from-amber-500 to-yellow-500', emoji: '🍞' },
  perdao: { label: 'Perdão', cor: 'from-purple-500 to-violet-500', emoji: '✝️' },
  vitoria: { label: 'Vitória', cor: 'from-red-500 to-rose-500', emoji: '🏆' },
  retorno: { label: 'Retorno', cor: 'from-indigo-500 to-blue-500', emoji: '👑' },
  eternidade: { label: 'Eternidade', cor: 'from-pink-500 to-fuchsia-500', emoji: '✨' },
};

const PROMESSAS: Promessa[] = [
  {
    id: 'genesis-3-15',
    titulo: 'O Primeiro Evangelho',
    descricao: 'A primeira promessa de redenção no Apocalipse 3:15 — a semente da mulher esmagará a cabeça da serpente.',
    versiculos: [
      { ref: 'Gênesis 3:15', texto: 'Porei inimizade entre ti e a mulher, entre a tua descendência e a dela; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar.' },
    ],
    categoria: 'alianca',
    testamento: 'AT',
    cor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'genesis-12-2',
    titulo: 'Abençoar todas as nações',
    descricao: 'Deus promete abençoar Abraão para que ele seja uma bênção a todas as famílias da terra.',
    versiculos: [
      { ref: 'Gênesis 12:2-3', texto: 'Far-te-ei uma grande nação; abençoar-te-ei; farei o teu nome grande, e tu serás uma bênção. Abençoarei os que te abençoarem, e amaldiçoarei os que te amaldiçoarem; em ti serão benditas todas as famílias da terra.' },
    ],
    categoria: 'alianca',
    testamento: 'AT',
    cor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'isaías-41-10',
    titulo: 'Não temas, estou contigo',
    descricao: 'Uma das promessas mais poderosas de presença e força de Deus em tempos de medo.',
    versiculos: [
      { ref: 'Isaías 41:10', texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.' },
    ],
    categoria: 'protecao',
    testamento: 'AT',
    cor: 'from-green-500 to-emerald-500',
  },
  {
    id: 'filipenses-4-19',
    titulo: 'Provisão according to His glory',
    descricao: 'Deus suprirá todas as nossas necessidades segundo a Sua riqueza em glória.',
    versiculos: [
      { ref: 'Filipenses 4:19', texto: 'Meu Deus, pois, suprirá todas as vossas necessidades, segundo a sua riqueza, em glória, por Cristo Jesus.' },
    ],
    categoria: 'provisao',
    testamento: 'NT',
    cor: 'from-amber-500 to-yellow-500',
  },
  {
    id: '1-joao-1-9',
    titulo: 'Perdão completo',
    descricao: 'Se confessarmos os pecados, Ele é fiel e justo para nos perdoar.',
    versiculos: [
      { ref: '1 João 1:9', texto: 'Se confessarmos os nossos pecados, Ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.' },
    ],
    categoria: 'perdao',
    testamento: 'NT',
    cor: 'from-purple-500 to-violet-500',
  },
  {
    id: 'romanos-8-28',
    titulo: 'Tudo coopera para o bem',
    descricao: 'Todas as coisas cooperam para o bem daqueles que amam a Deus.',
    versiculos: [
      { ref: 'Romanos 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
    ],
    categoria: 'vitoria',
    testamento: 'NT',
    cor: 'from-red-500 to-rose-500',
  },
  {
    id: 'apocalipse-21-4',
    titulo: 'Sem mais lágrimas',
    descricao: 'A promessa final — Deus enxugará toda lágrima, e não haverá mais morte nem dor.',
    versiculos: [
      { ref: 'Apocalipse 21:4', texto: 'Enxugará toda lágrima dos seus olhos, e a morte não haverá mais, nem haverá mais luto, nem clamor, nem dor; porque o primeiro passou.' },
    ],
    categoria: 'eternidade',
    testamento: 'NT',
    cor: 'from-pink-500 to-fuchsia-500',
  },
  {
    id: 'jeremias-29-11',
    titulo: 'Planos de prosperidade',
    descricao: 'Deus tem planos de paz e não de mal para dar esperança e futuro.',
    versiculos: [
      { ref: 'Jeremias 29:11', texto: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.' },
    ],
    categoria: 'alianca',
    testamento: 'AT',
    cor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'josue-1-9',
    titulo: 'Seja forte e corajoso',
    descricao: 'Deus estará conosco por onde formos, não nos deixaremos nem desampararemos.',
    versiculos: [
      { ref: 'Josué 1:9', texto: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.' },
    ],
    categoria: 'protecao',
    testamento: 'AT',
    cor: 'from-green-500 to-emerald-500',
  },
  {
    id: '2-pedros-3-9',
    titulo: 'O Senhor não retarda',
    descricao: 'Deus não retarda a Sua promessa, mas é paciente para que todos se arrependam.',
    versiculos: [
      { ref: '2 Pedro 3:9', texto: 'O Senhor não retarda a sua promessa, ainda que alguns a tenham por tardia, mas é paciente para convosco, não querendo que nenhum pereça, senão que todos venham a arrepender-se.' },
    ],
    categoria: 'retorno',
    testamento: 'NT',
    cor: 'from-indigo-500 to-blue-500',
  },
];

export function PromisesMap() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [testFilter, setTestFilter] = useState<'todos' | 'AT' | 'NT'>('todos');

  const filteredPromises = useMemo(() => {
    return PROMESSAS.filter(p => {
      if (selectedCategory && p.categoria !== selectedCategory) return false;
      if (testFilter !== 'todos' && p.testamento !== testFilter && p.testamento !== 'ambos') return false;
      return true;
    });
  }, [selectedCategory, testFilter]);

  const stats = useMemo(() => {
    const cats = PROMESSAS.reduce((acc, p) => {
      acc[p.categoria] = (acc[p.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return cats;
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent" />
        <div className="relative px-4 sm:px-6 pt-8 pb-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {PROMESSAS.length} promessas de Deus
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--content-primary)] mb-2">
              Mapa de Promessas de Deus
            </h1>
            <p className="text-sm text-[var(--content-muted)] max-w-md mx-auto">
              Explore as promessas de Deus da Gênesis ao Apocalipse. Cada linha conecta uma promessa ao seu cumprimento.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="max-w-3xl mx-auto">
          {/* Testament filter */}
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-3.5 h-3.5 text-[var(--content-muted)]" />
            <div className="flex gap-1">
              {(['todos', 'AT', 'NT'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTestFilter(t)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors',
                    testFilter === t
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                      : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
                  )}
                >
                  {t === 'todos' ? 'Todos' : t}
                </button>
              ))}
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                !selectedCategory
                  ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md'
                  : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
              )}
            >
              Todas ({PROMESSAS.length})
            </button>
            {Object.entries(CATEGORIAS).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  selectedCategory === key
                    ? 'bg-gradient-to-r ' + cat.cor + ' text-white shadow-md'
                    : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
                )}
              >
                {cat.emoji} {cat.label} ({stats[key] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 sm:px-6 pb-12">
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-orange-500/20 to-transparent" />

          <div className="space-y-4">
            {filteredPromises.map((promessa, idx) => (
              <motion.div
                key={promessa.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className={cn(
                  'absolute left-3 sm:left-5 w-3 h-3 rounded-full ring-4 ring-[var(--bg)]',
                  'bg-gradient-to-r',
                  promessa.cor
                )} />

                {/* Card */}
                <div
                  className={cn(
                    'rounded-xl border transition-all cursor-pointer',
                    expandedId === promessa.id
                      ? 'border-amber-500/30 bg-[var(--surface-raised)] shadow-lg'
                      : 'border-[var(--border)]/40 bg-[var(--surface-raised)]/50 hover:border-[var(--border)]/60'
                  )}
                  onClick={() => setExpandedId(expandedId === promessa.id ? null : promessa.id)}
                >
                  <div className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)]">
                            {promessa.testamento}
                          </span>
                          <span className={cn(
                            'px-1.5 py-0.5 rounded text-[9px] font-bold text-white bg-gradient-to-r',
                            promessa.cor
                          )}>
                            {CATEGORIAS[promessa.categoria]?.label}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-[var(--content-primary)]">
                          {promessa.titulo}
                        </h3>
                        <p className="text-xs text-[var(--content-muted)] mt-0.5 line-clamp-2">
                          {promessa.descricao}
                        </p>
                      </div>
                      {expandedId === promessa.id ? (
                        <ChevronUp className="w-4 h-4 text-[var(--content-muted)] shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[var(--content-muted)] shrink-0 mt-1" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === promessa.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)]/30 pt-3">
                          {promessa.versiculos.map((v, i) => (
                            <div key={i} className="bg-[var(--surface-sunken)]/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1.5">
                                <a
                                  href={`/biblia?ref=${encodeURIComponent(v.ref)}`}
                                  className="text-xs font-semibold text-[var(--brand-default)] hover:underline flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {v.ref}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                              <p className="text-sm text-[var(--content-primary)] leading-relaxed font-serif-body italic">
                                &ldquo;{v.texto}&rdquo;
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPromises.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-[var(--content-muted)]">Nenhuma promessa encontrada com esses filtros.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
