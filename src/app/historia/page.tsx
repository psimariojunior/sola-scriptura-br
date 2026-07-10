'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TODOS_LIVROS, carregarTraducao } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { BookOpen, Globe, CalendarDays, MapPin, Users, Crown, Sparkles, ArrowRight } from 'lucide-react';

type LivroData = Record<string, Record<number, string[]>>;

const periodos = [
  {
    titulo: 'Período Patriarcal',
    data: '~2000–1500 a.C.',
    desc: 'Abraão, Isaque, Jacó e José. A formação do povo de Deus.',
    cor: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    eventos: [
      { ref: 'Gn 12:1-3', label: 'Chamado de Abraão', abrevia: 'gn' },
      { ref: 'Gn 15:1-21', label: 'Aliança com Abraão', abrevia: 'gn' },
      { ref: 'Gn 35:23-26', label: 'Jacó e seus 12 filhos', abrevia: 'gn' },
      { ref: 'Gn 37:1-36', label: 'José no Egito', abrevia: 'gn' },
    ],
    icono: '🌍',
  },
  {
    titulo: 'Período da Lei',
    data: '~1500–1020 a.C.',
    desc: 'Êxodo, Sinai, a terra prometida e os juízes.',
    cor: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    eventos: [
      { ref: 'Ex 12:1-51', label: 'Êxodo do Egito', abrevia: 'ex' },
      { ref: 'Ex 19:1-25', label: 'Lei no Sinai', abrevia: 'ex' },
      { ref: 'Js 1:1-18', label: 'Conquista de Canaã', abrevia: 'js' },
      { ref: 'Jz 2:16-19', label: 'Período dos Juízes', abrevia: 'jz' },
    ],
    icono: '📜',
  },
  {
    titulo: 'Período dos Reis',
    data: '~1020–586 a.C.',
    desc: 'Monarquia unificada, reinos divididos e profetas.',
    cor: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    eventos: [
      { ref: '1Sm 10:1', label: 'Saul, primeiro rei', abrevia: '1sm' },
      { ref: '2Sm 5:1-5', label: 'Davi rei de Israel', abrevia: '2sm' },
      { ref: '1Rs 6:1', label: 'Salomão e o Templo', abrevia: '1rs' },
      { ref: '1Rs 12:1-20', label: 'Divisão do reino', abrevia: '1rs' },
    ],
    icono: '👑',
  },
  {
    titulo: 'Período do Exílio',
    data: '586–516 a.C.',
    desc: 'Destruição de Jerusalém, cativeiro na Babilônia e retorno.',
    cor: 'from-red-500 to-red-600',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    eventos: [
      { ref: '2Rs 25:1-12', label: 'Destruição do Templo', abrevia: '2rs' },
      { ref: 'Ed 1:1-4', label: 'Retorno sob Ciro', abrevia: 'ed' },
      { ref: 'Ed 3:8-13', label: 'Reconstrução do Templo', abrevia: 'ed' },
      { ref: 'Is 40:1-5', label: 'Consolo profético', abrevia: 'is' },
    ],
    icono: '🏛️',
  },
  {
    titulo: 'Período Intertestamentário',
    data: '516 a.C.–4 d.C.',
    desc: 'Domínio persa, grego e romano. Formação do judaísmo.',
    cor: 'from-slate-500 to-slate-600',
    bg: 'bg-slate-50 dark:bg-slate-950/30',
    border: 'border-slate-200 dark:border-slate-800',
    eventos: [
      { ref: 'Dn 8:1-14', label: 'Visão dos impérios', abrevia: 'dn' },
      { ref: 'Dn 11:1-45', label: 'Reis do Norte e do Sul', abrevia: 'dn' },
      { ref: 'Ml 3:1-4', label: 'Profecia final do AT', abrevia: 'ml' },
    ],
    icono: '⚔️',
  },
  {
    titulo: 'Vida de Cristo',
    data: '~4–30 d.C.',
    desc: 'Nascimento, ministério, crucificação e ressurreição de Jesus.',
    cor: 'from-green-500 to-green-600',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    eventos: [
      { ref: 'Mt 1:18-25', label: 'Nascimento em Belém', abrevia: 'mt' },
      { ref: 'Mc 1:9-13', label: 'Batismo e tentação', abrevia: 'mc' },
      { ref: 'Mc 15:1-39', label: 'Crucificação', abrevia: 'mc' },
      { ref: 'Mc 16:1-8', label: 'Ressurreição', abrevia: 'mc' },
    ],
    icono: '✝️',
  },
  {
    titulo: 'Igreja Primitiva',
    data: '30–100 d.C.',
    desc: 'Expansão do evangelho, epístolas e formação do cânon.',
    cor: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-cyan-200 dark:border-cyan-800',
    eventos: [
      { ref: 'At 2:1-13', label: 'Pentecostes', abrevia: 'at' },
      { ref: 'At 9:1-19', label: 'Conversão de Paulo', abrevia: 'at' },
      { ref: 'At 13:1-5', label: 'Primeira viagem missionária', abrevia: 'at' },
      { ref: 'Ap 1:9-11', label: 'João em Patmos', abrevia: 'ap' },
    ],
    icono: '🔥',
  },
];

const linhaTempoData: { ano: string; evento: string; periodo: string; cor: string }[] = [
  { ano: '~2000 a.C.', evento: 'Chamado de Abraão', periodo: 'Patriarcal', cor: 'bg-amber-500' },
  { ano: '~1440 a.C.', evento: 'Êxodo do Egito', periodo: 'Lei', cor: 'bg-blue-500' },
  { ano: '~1400 a.C.', evento: 'Conquista de Canaã', periodo: 'Lei', cor: 'bg-blue-500' },
  { ano: '~1020 a.C.', evento: 'Início da Monarquia (Saul)', periodo: 'Reis', cor: 'bg-purple-500' },
  { ano: '~1000 a.C.', evento: 'Davi em Jerusalém', periodo: 'Reis', cor: 'bg-purple-500' },
  { ano: '~960 a.C.', evento: 'Templo de Salomão', periodo: 'Reis', cor: 'bg-purple-500' },
  { ano: '722 a.C.', evento: 'Queda de Samaria (Israel)', periodo: 'Reis', cor: 'bg-purple-500' },
  { ano: '586 a.C.', evento: 'Queda de Jerusalém (Judá)', periodo: 'Exílio', cor: 'bg-red-500' },
  { ano: '539 a.C.', evento: 'Queda da Babilônia (Ciro)', periodo: 'Exílio', cor: 'bg-red-500' },
  { ano: '516 a.C.', evento: 'Templo reconstruído', periodo: 'Exílio', cor: 'bg-red-500' },
  { ano: '332 a.C.', evento: 'Império Grego', periodo: 'Intertestamentário', cor: 'bg-slate-500' },
  { ano: '167 a.C.', evento: 'Revolta dos Macabeus', periodo: 'Intertestamentário', cor: 'bg-slate-500' },
  { ano: '63 a.C.', evento: 'Domínio Romano', periodo: 'Intertestamentário', cor: 'bg-slate-500' },
  { ano: '~4 a.C.', evento: 'Nascimento de Jesus', periodo: 'Cristo', cor: 'bg-green-500' },
  { ano: '~30 d.C.', evento: 'Crucificação e Ressurreição', periodo: 'Cristo', cor: 'bg-green-500' },
  { ano: '~30 d.C.', evento: 'Pentecostes', periodo: 'Igreja', cor: 'bg-cyan-500' },
  { ano: '~50 d.C.', evento: 'Concílio de Jerusalém', periodo: 'Igreja', cor: 'bg-cyan-500' },
  { ano: '~70 d.C.', evento: 'Destruição de Jerusalém', periodo: 'Igreja', cor: 'bg-cyan-500' },
  { ano: '~95 d.C.', evento: 'Apocalipse de João', periodo: 'Igreja', cor: 'bg-cyan-500' },
];

const corPeriodo: Record<string, string> = {
  Patriarcal: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Lei: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Reis: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Exílio: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  Intertestamentário: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300',
  Cristo: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Igreja: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
};

export default function HistoriaPage() {
  const [aba, setAba] = useState<'periodos' | 'timeline'>('periodos');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                Contexto Histórico das Escrituras
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                História <span className="text-primary italic">Bíblica</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Contexto histórico, cultural e geográfico — viaje através dos tempos bíblicos
              </p>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal>
            <div className="glass-card p-1.5 mb-8 rounded-2xl">
              <div className="flex">
                {([
                  { id: 'periodos' as const, label: 'Períodos', icon: BookOpen },
                  { id: 'timeline' as const, label: 'Linha do Tempo', icon: CalendarDays },
                ]).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setAba(id)}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl transition-all ${
                      aba === id
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {aba === 'periodos' && (
            <div className="space-y-6">
              {periodos.map((p, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className={`glass-card rounded-2xl overflow-hidden border ${p.border}`}>
                    {/* Header */}
                    <div className={`px-6 py-5 bg-gradient-to-r ${p.cor}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                          {p.icono}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-display text-white font-semibold">{p.titulo}</h2>
                            <span className="text-xs font-medium text-white/80 bg-white/20 px-3 py-1 rounded-full">
                              {p.data}
                            </span>
                          </div>
                          <p className="text-sm text-white/80 mt-1">{p.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Events */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {p.eventos.map((e, j) => (
                          <Link
                            key={j}
                            href={`/biblia?livro=${e.abrevia}&capitulo=${e.ref.split(' ')[1]?.split(':')[0] ?? 1}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all group"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
                            <span className="text-sm font-medium group-hover:text-primary transition-colors flex-1">{e.label}</span>
                            <span className="text-xs text-muted-foreground font-mono">{e.ref}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {aba === 'timeline' && (
            <ScrollReveal>
              <div className="glass-card p-6 sm:p-8 rounded-2xl">
                <h2 className="font-display text-2xl font-semibold mb-2 flex items-center gap-3">
                  <CalendarDays className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  Linha do Tempo Bíblica
                </h2>
                <p className="text-sm text-muted-foreground mb-8">Aproximação cronológica dos principais eventos das Escrituras</p>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-primary to-cyan-500" />

                  <div className="space-y-6">
                    {linhaTempoData.map((item, i) => (
                      <div
                        key={i}
                        className={`relative flex items-center gap-4 sm:gap-8 ${
                          i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                        }`}
                      >
                        {/* Dot */}
                        <div className={`absolute left-4 sm:left-1/2 w-4 h-4 ${item.cor} rounded-full -translate-x-2 sm:-translate-x-2 z-10 ring-4 ring-background`} />

                        {/* Content */}
                        <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                          <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all">
                            <div className={`flex items-center gap-2 mb-1 ${i % 2 === 0 ? 'sm:justify-end' : ''}`}>
                              <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${corPeriodo[item.periodo]}`}>
                                {item.periodo}
                              </span>
                            </div>
                            <p className="font-mono text-sm text-primary font-semibold">{item.ano}</p>
                            <h3 className="font-semibold text-sm">{item.evento}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Contexto Cultural */}
          <ScrollReveal>
            <div className="glass-card p-6 sm:p-8 rounded-2xl mt-8">
              <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
                Contexto Cultural
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2">Geografia</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    A terra de Israel, o Crescente Fértil e as rotas comerciais conectam os eventos bíblicos. O Jordão, o Mediterrâneo e o deserto são cenários centrais.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-amber-500/5 to-amber-500/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-amber-600 mb-2">Cultura</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Sociedade tribal, pastoril e agrícola. A família e o clã são a base social. Honra, hospitalidade e aliança são valores fundamentais.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-purple-600 mb-2">Impérios</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Egito, Assíria, Babilônia, Pérsia, Grécia e Roma dominaram Israel em diferentes períodos, moldando seu contexto político e religioso.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
