'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Search, X, Users, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface Personagem {
  nome: string;
  slug: string;
  testamento: 'AT' | 'NT';
  role: string;
  periodo: string;
  relations: { target: string; tipo: string }[];
  cor: string;
}

const PERSONAGENS: Personagem[] = [
  { nome: 'Adão', slug: 'adao', testamento: 'AT', role: 'Primeiro homem', periodo: 'Criação', relations: [{ target: 'Eva', tipo: 'Esposa' }, { target: 'Caim', tipo: 'Filho' }, { target: 'Seth', tipo: 'Filho' }], cor: '#8B4513' },
  { nome: 'Eva', slug: 'eva', testamento: 'AT', role: 'Primeira mulher', periodo: 'Criação', relations: [{ target: 'Adão', tipo: 'Esposo' }, { target: 'Caim', tipo: 'Filho' }], cor: '#D2691E' },
  { nome: 'Noé', slug: 'noe', testamento: 'AT', role: 'Construtor da arca', periodo: 'Gênesis', relations: [{ target: 'Abraão', tipo: 'Antepassado' }], cor: '#4682B4' },
  { nome: 'Abraão', slug: 'abraao', testamento: 'AT', role: 'Patriarca', periodo: 'Patriarcas', relations: [{ target: 'Isaque', tipo: 'Filho' }, { target: 'Jacó', tipo: 'Neto' }, { target: 'Sara', tipo: 'Esposa' }, { target: 'Moisés', tipo: 'Antepassado' }], cor: '#DAA520' },
  { nome: 'Isaque', slug: 'isaaque', testamento: 'AT', role: 'Patriarca', periodo: 'Patriarcas', relations: [{ target: 'Abraão', tipo: 'Pai' }, { target: 'Jacó', tipo: 'Filho' }, { target: 'Rebeca', tipo: 'Esposa' }], cor: '#DAA520' },
  { nome: 'Jacó', slug: 'jaco', testamento: 'AT', role: 'Patriarca (Israel)', periodo: 'Patriarcas', relations: [{ target: 'Isaque', tipo: 'Pai' }, { target: 'José', tipo: 'Filho' }, { target: 'Levi', tipo: 'Filho' }, { target: 'Judá', tipo: 'Filho' }], cor: '#DAA520' },
  { nome: 'José', slug: 'jose', testamento: 'AT', role: 'Governador do Egito', periodo: 'Patriarcas', relations: [{ target: 'Jacó', tipo: 'Pai' }, { target: 'Moisés', tipo: 'Ancestral' }], cor: '#9370DB' },
  { nome: 'Moisés', slug: 'moises', testamento: 'AT', role: 'Libertador de Israel', periodo: 'Êxodo', relations: [{ target: 'Aarão', tipo: 'Irmão' }, { target: 'Josué', tipo: 'Sucessor' }, { target: 'Abraão', tipo: 'Ancestral' }], cor: '#228B22' },
  { nome: 'Aarão', slug: 'aaraao', testamento: 'AT', role: 'Sumo sacerdote', periodo: 'Êxodo', relations: [{ target: 'Moisés', tipo: 'Irmão' }], cor: '#228B22' },
  { nome: 'Josué', slug: 'josue', testamento: 'AT', role: 'Líder de Israel', periodo: 'Conquista', relations: [{ target: 'Moisés', tipo: 'Sucessor' }], cor: '#2E8B57' },
  { nome: 'Davi', slug: 'davi', testamento: 'AT', role: 'Rei de Israel', periodo: 'Monarquia', relations: [{ target: 'Salomão', tipo: 'Filho' }, { target: 'Saul', tipo: 'Antecessor' }, { target: 'Jesus', tipo: 'Ancestral' }], cor: '#FFD700' },
  { nome: 'Salomão', slug: 'salomao', testamento: 'AT', role: 'Rei sábio', periodo: 'Monarquia', relations: [{ target: 'Davi', tipo: 'Pai' }], cor: '#FFD700' },
  { nome: 'Isaías', slug: 'isaias', testamento: 'AT', role: 'Profeta', periodo: 'Profetas', relations: [{ target: 'Jesus', tipo: 'Profetizou' }], cor: '#FF6347' },
  { nome: 'Jeremias', slug: 'jeremias', testamento: 'AT', role: 'Profeta', periodo: 'Profetas', relations: [], cor: '#FF6347' },
  { nome: 'Jonas', slug: 'jonas', testamento: 'AT', role: 'Profeta', periodo: 'Profetas', relations: [{ target: 'Jesus', tipo: 'Tipologia' }], cor: '#FF6347' },
  { nome: 'Maria', slug: 'maria', testamento: 'NT', role: 'Mãe de Jesus', periodo: 'Evangelhos', relations: [{ target: 'Jesus', tipo: 'Filho' }, { target: 'José', tipo: 'Esposa' }, { target: 'João', tipo: 'Primo' }], cor: '#C71585' },
  { nome: 'José', slug: 'jose-esposo-maria', testamento: 'NT', role: 'Esposo de Maria', periodo: 'Evangelhos', relations: [{ target: 'Maria', tipo: 'Esposa' }, { target: 'Jesus', tipo: 'Pai adotivo' }], cor: '#8B4513' },
  { nome: 'Jesus', slug: 'jesus', testamento: 'NT', role: 'Messias', periodo: 'Evangelhos', relations: [{ target: 'Maria', tipo: 'Mãe' }, { target: 'Pedro', tipo: 'Discípulo' }, { target: 'João', tipo: 'Discípulo' }, { target: 'Paulo', tipo: 'Encontro' }, { target: 'Davi', tipo: 'Ancestral' }], cor: '#FFD700' },
  { nome: 'Pedro', slug: 'pedro', testamento: 'NT', role: 'Apóstolo', periodo: 'Atos', relations: [{ target: 'Jesus', tipo: 'Mestre' }, { target: 'Paulo', tipo: 'Apóstolo' }, { target: 'João', tipo: 'Apóstolo' }], cor: '#4169E1' },
  { nome: 'Paulo', slug: 'paulo', testamento: 'NT', role: 'Apóstolo dos gentios', periodo: 'Atos', relations: [{ target: 'Jesus', tipo: 'Encontro' }, { target: 'Pedro', tipo: 'Apóstolo' }, { target: 'Tiago', tipo: 'Apóstolo' }, { target: 'Barnabé', tipo: 'Missionário' }], cor: '#4169E1' },
  { nome: 'João', slug: 'joao', testamento: 'NT', role: 'Apóstolo amado', periodo: 'Evangelhos', relations: [{ target: 'Jesus', tipo: 'Mestre' }, { target: 'Pedro', tipo: 'Apóstolo' }, { target: 'Tiago', tipo: 'Irmão' }], cor: '#4169E1' },
  { nome: 'Tiago', slug: 'tiago', testamento: 'NT', role: 'Líder da igreja', periodo: 'Atos', relations: [{ target: 'João', tipo: 'Irmão' }, { target: 'Jesus', tipo: 'Irmão' }, { target: 'Paulo', tipo: 'Apóstolo' }], cor: '#4169E1' },
  { nome: 'Barnabé', slug: 'barnabe', testamento: 'NT', role: 'Missionário', periodo: 'Atos', relations: [{ target: 'Paulo', tipo: 'Missionário' }], cor: '#20B2AA' },
];

const TESTAMENTO_COLORS = { AT: 'bg-amber-500/10 text-amber-600', NT: 'bg-blue-500/10 text-blue-600' };
const TIPO_COLORS: Record<string, string> = {
  'Pai': 'bg-blue-500/10 text-blue-500', 'Mãe': 'bg-pink-500/10 text-pink-500',
  'Filho': 'bg-green-500/10 text-green-500', 'Esposa': 'bg-purple-500/10 text-purple-500',
  'Esposo': 'bg-purple-500/10 text-purple-500', 'Irmão': 'bg-orange-500/10 text-orange-500',
  'Mestre': 'bg-amber-500/10 text-amber-500', 'Discípulo': 'bg-blue-500/10 text-blue-500',
  'Apóstolo': 'bg-indigo-500/10 text-indigo-500', 'Profeta': 'bg-red-500/10 text-red-500',
  'Ancestral': 'bg-gray-500/10 text-gray-500', 'Sucessor': 'bg-teal-500/10 text-teal-500',
  'Missionário': 'bg-cyan-500/10 text-cyan-500', 'Tipologia': 'bg-violet-500/10 text-violet-500',
  'Profetizou': 'bg-rose-500/10 text-rose-500',
};

export default function RelacoesBiblicasPage() {
  const [busca, setBusca] = useState('');
  const [selected, setSelected] = useState<Personagem | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const filtrados = useMemo(() => {
    if (!busca) return PERSONAGENS;
    const termo = busca.toLowerCase();
    return PERSONAGENS.filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      p.role.toLowerCase().includes(termo) ||
      p.periodo.toLowerCase().includes(termo)
    );
  }, [busca]);

  const selectedPersonagem = selected || (busca && filtrados.length === 1 ? filtrados[0] : null);

  const getRelated = useCallback((p: Personagem) => {
    const related = new Set<string>();
    p.relations.forEach(r => related.add(r.target));
    PERSONAGENS.forEach(other => {
      other.relations.forEach(r => { if (r.target === p.nome) related.add(other.nome); });
    });
    return PERSONAGENS.filter(o => related.has(o.nome));
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/20">
                <Network className="w-10 h-10 text-violet-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Relações <span className="text-primary italic">Bíblicas</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Mapa interativo de conexões entre personagens da Bíblia</p>
            </div>
          </ScrollReveal>

          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar personagem..."
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                <X className="w-4 h-4" /></button>}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtrados.map((p, idx) => {
              const isExpanded = expandedCards.has(p.slug) || selectedPersonagem?.slug === p.slug;
              const related = getRelated(p);
              return (
                <motion.div key={p.slug} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className={cn('rounded-xl border transition-all cursor-pointer',
                    isExpanded ? 'border-primary/50 bg-primary/5 col-span-2 row-span-2' : 'border-border/50 bg-card/50 hover:border-primary/30')}>
                  <div className="p-4" onClick={() => {
                    if (isExpanded) { setSelected(null); setExpandedCards(prev => { const n = new Set(prev); n.delete(p.slug); return n; }); }
                    else { setSelected(p); setExpandedCards(prev => new Set(prev).add(p.slug)); }
                  }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: p.cor }}>
                        {p.nome.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm truncate">{p.nome}</h3>
                        <p className="text-[10px] text-muted-foreground truncate">{p.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', TESTAMENTO_COLORS[p.testamento])}>
                        {p.testamento}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{p.periodo}</span>
                    </div>

                    {isExpanded && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Conexões ({related.length})</p>
                          <div className="space-y-1.5">
                            {p.relations.map((r, i) => {
                              const target = PERSONAGENS.find(t => t.nome === r.target);
                              return (
                                <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-sunken/50">
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                                    style={{ backgroundColor: target?.cor || '#666' }}>
                                    {r.target.charAt(0)}
                                  </div>
                                  <span className="text-xs font-medium flex-1">{r.target}</span>
                                  <span className={cn('text-[9px] px-1.5 py-0.5 rounded-full', TIPO_COLORS[r.tipo] || 'bg-gray-500/10 text-gray-500')}>
                                    {r.tipo}
                                  </span>
                                </div>
                              );
                            })}
                            {p.relations.length === 0 && <p className="text-xs text-muted-foreground">Sem conexões registradas</p>}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Conectado por</p>
                          <div className="space-y-1.5">
                            {PERSONAGENS.filter(other => other.relations.some(r => r.target === p.nome)).map(other => (
                              <div key={other.slug} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-sunken/50 cursor-pointer hover:bg-muted/50"
                                onClick={(e) => { e.stopPropagation(); setSelected(other); }}>
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                                  style={{ backgroundColor: other.cor }}>{other.nome.charAt(0)}</div>
                                <span className="text-xs font-medium flex-1">{other.nome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">{PERSONAGENS.length} personagens • Clique para ver conexões</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
