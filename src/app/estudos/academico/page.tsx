'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, ChevronRight, Search, Filter, Star, Clock, Users, Award, Bookmark, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';

type NivelEnsino = 'introductory' | 'intermediate' | 'advanced' | 'seminary';
type CategoriaEstudo = 'teologia' | 'hermeneutica' | 'exegese' | 'historia' | 'filosofia' | 'linguas';

interface EstudoAcademico {
  id: string;
  titulo: string;
  descricao: string;
  nivel: NivelEnsino;
  categoria: CategoriaEstudo;
  duracao: string;
  modulos: number;
  avaliacao: boolean;
  certificado: boolean;
  instrutor: string;
  requisitos?: string[];
  objetivos: string[];
  bibliografia: { autor: string; obra: string; ano: number; editora: string }[];
  cor: string;
}

const ESTUDOS: EstudoAcademico[] = [
  {
    id: 'hermeneutica-avancada',
    titulo: 'Hermenêutica Avançada',
    descricao: 'Métodos de interpretação bíblica: histórico-crítico, literário, canônico, teológico. Princípios de exegese e aplicação.',
    nivel: 'advanced',
    categoria: 'hermeneutica',
    duracao: '8 semanas',
    modulos: 12,
    avaliacao: true,
    certificado: true,
    instrutor: 'Prof. Dr. Sola Scriptura',
    requisitos: ['Conhecimento básico de hermenêutica', 'Familiaridade com o texto bíblico'],
    objetivos: [
      'Dominar os métodos de interpretação histórico-crítico',
      'Aplicar princípios de análise literária aos gêneros bíblicos',
      'Distinguir entre exegese e homilética',
      'Avaliar criticamente diferentes abordagens interpretativas',
    ],
    bibliografia: [
      { autor: 'Klein, William W.', obra: 'Introdução ao Estudo do Antigo Testamento', ano: 2004, editora: 'Vida Nova' },
      { autor: 'Silva, Moisés', obra: 'Novo Dicionário do Novo Testamento', ano: 2004, editora: 'Vida Nova' },
      { autor: 'Tasker, R.V.G.', obra: 'O Novo Testamento Traduzido do Grego', ano: 1979, editora: 'Cultrix' },
    ],
    cor: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 'exegese-grego-nt',
    titulo: 'Exegese do Novo Testamento em Grego',
    descricao: 'Análise gramatical e exegética do texto grego do NT. Sintaxe, semântica e teologia textual.',
    nivel: 'seminary',
    categoria: 'linguas',
    duracao: '12 semanas',
    modulos: 16,
    avaliacao: true,
    certificado: true,
    instrutor: 'Prof. Dr. Sola Scriptura',
    requisitos: ['Grego koiné intermediário', 'Morfologia grega'],
    objetivos: [
      'Parsing morfológico completo de textos do NT',
      'Análise sintática de frases gregas complexas',
      'Identificação de vozes verbais e suas implicações teológicas',
      'Tradução exegética com apparatus crítico',
    ],
    bibliografia: [
      { autor: 'Mounce, Robert H.', obra: 'Gramática Grega do Novo Testamento', ano: 2000, editora: 'Vida Nova' },
      { autor: 'Wallace, Daniel B.', obra: 'Gramática Grega do Novo Testamento Beyond the Basics', ano: 1996, editora: 'Zondervan' },
      { autor: 'Metzger, Bruce M.', obra: 'Manual do Texto do Novo Testamento', ano: 2014, editora: 'Edições Loyola' },
    ],
    cor: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'teologia-sistematica',
    titulo: 'Teologia Sistematizada',
    descricao: 'Estudo sistemático das grandes doutrinas da fé: Deus, Cristo, Espírito, Escritura, Salvação, Escatologia.',
    nivel: 'intermediate',
    categoria: 'teologia',
    duracao: '13 semanas',
    modulos: 13,
    avaliacao: true,
    certificado: true,
    instrutor: 'Prof. Dr. Sola Scriptura',
    objetivos: [
      'Articular as grandes doutrinas bíblicas com precisão terminológica',
      'Comparar perspectivas teológicas entre tradições cristãs',
      'Aplicar doutrinas à vida cristã e à teologia prática',
      'Avaliar o valor e as limitações de cada sistema teológico',
    ],
    bibliografia: [
      { autor: 'Grudem, Wayne', obra: 'Teologia Sistematizada', ano: 2016, editora: 'Cultura Cristã' },
      { autor: 'Berkhof, Louis', obra: 'Teologia Sistematizada', ano: 2014, editora: 'Cultura Cristã' },
      { autor: 'Chadwick, Henry', obra: 'A Igreja Primitiva', ano: 2005, editora: 'Edições Loyola' },
    ],
    cor: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'contexto-historico',
    titulo: 'Contexto Histórico-Cultural da Bíblia',
    descricao: 'Geografia, arqueologia, costumes e cultura do antigo Oriente Próximo. Impacto na interpretação bíblica.',
    nivel: 'intermediate',
    categoria: 'historia',
    duracao: '10 semanas',
    modulos: 14,
    avaliacao: true,
    certificado: true,
    instrutor: 'Prof. Dr. Sola Scriptura',
    objetivos: [
      'Mapear os eventos históricos que cercam os textos bíblicos',
      'Relacionar descobertas arqueológicas com narrativas bíblicas',
      'Compreender as convenções literárias do antigo Oriente Próximo',
      'Contextualizar culturalmente passagens problemáticas',
    ],
    bibliografia: [
      { autor: 'Kitchen, Kenneth A.', obra: 'Na Rasca dos Textos Bíblicos', ano: 2016, editora: 'Edições Vida Nova' },
      { autor: 'Mazar, Amihai', obra: 'Arqueologia da Terra de Israel', ano: 2000, editora: 'Editora APIs' },
    ],
    cor: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 'filosofia-religiao',
    titulo: 'Filosofia da Religião',
    descricao: 'Argumentos para a existência de Deus, o problema do mal, epistemologia religiosa e ética cristã.',
    nivel: 'advanced',
    categoria: 'filosofia',
    duracao: '8 semanas',
    modulos: 10,
    avaliacao: true,
    certificado: true,
    instrutor: 'Prof. Dr. Sola Scriptura',
    objetivos: [
      'Avaliar criticamente os argumentos clássicos para a existência de Deus',
      'Analisar o problema do mal sob diferentes perspectivas filosóficas',
      'Compreender a epistemologia religiosa e a racionalidade da fé',
      'Articular uma defesa intelectual da fé cristã (apologética)',
    ],
    bibliografia: [
      { autor: 'Craig, William Lane', obra: 'Deus Existe?', ano: 2016, editora: 'Edições Vida Nova' },
      { autor: 'Plantinga, Alvin', obra: 'Por que a Fé é Razoável', ano: 2001, editora: 'Cultura Cristã' },
    ],
    cor: 'from-rose-500/20 to-red-500/20',
  },
  {
    id: 'exegese-ot',
    titulo: 'Exegese do Antigo Testamento em Hebraico',
    descricao: 'Análise gramatical do texto massorético. Sintaxe hebraica, poesia, profecia e narração.',
    nivel: 'seminary',
    categoria: 'linguas',
    duracao: '12 semanas',
    modulos: 16,
    avaliacao: true,
    certificado: true,
    instrutor: 'Prof. Dr. Sola Scriptura',
    requisitos: ['Hebraico intermediário', 'Conhecimento de sistema massorético'],
    objetivos: [
      'Parsing verbal hebraico (binyanim) com precisão',
      'Análise de prosódia em poesia hebraica',
      'Compreensão do sistema de acentos massoréticos',
      'Tradução exegética de narrativa, lei, profecia e poesia',
    ],
    bibliografia: [
      { autor: 'Waltke, Bruce K.', obra: 'An Introductory Grammar of Biblical Hebrew', ano: 2014, editora: 'Hendrickson' },
      { autor: 'Gesenius, Wilhelm', obra: 'Hebraico e Caldaico Handwörterbuch', ano: 2018, editora: 'Hendrickson' },
    ],
    cor: 'from-cyan-500/20 to-blue-500/20',
  },
];

const NIVEL_LABELS: Record<NivelEnsino, { label: string; cor: string }> = {
  introductory: { label: 'Introdutório', cor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  intermediate: { label: 'Intermediário', cor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300' },
  advanced: { label: 'Avançado', cor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300' },
  seminary: { label: 'Seminarista', cor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300' },
};

const CATEGORIA_LABELS: Record<CategoriaEstudo, string> = {
  teologia: 'Teologia',
  hermeneutica: 'Hermenêutica',
  exegese: 'Exegese',
  historia: 'História',
  filosofia: 'Filosofia',
  linguas: 'Línguas Originais',
};

export default function EstudoAcademicoPage() {
  const [filtroNivel, setFiltroNivel] = useState<NivelEnsino | 'todos'>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<CategoriaEstudo | 'todos'>('todos');
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState<string | null>(null);

  const estudosFiltrados = useMemo(() => {
    return ESTUDOS.filter(e => {
      if (filtroNivel !== 'todos' && e.nivel !== filtroNivel) return false;
      if (filtroCategoria !== 'todos' && e.categoria !== filtroCategoria) return false;
      if (busca && !e.titulo.toLowerCase().includes(busca.toLowerCase()) && !e.descricao.toLowerCase().includes(busca.toLowerCase())) return false;
      return true;
    });
  }, [filtroNivel, filtroCategoria, busca]);

  return (
    <div className="min-h-screen bg-pattern-diamond">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Nível Acadêmico
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-light mb-4">
              Estudos <span className="text-[var(--brand-default)] italic">Superiores</span>
            </h1>
            <p className="text-[var(--content-muted)] text-lg max-w-2xl mx-auto">
              Cursos com rigor acadêmico, avaliações, bibliografias e certificação. Estudo teológico de nível seminário.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="glass-card p-4 rounded-2xl mb-8 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar curso..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] self-center mr-1">Nível:</span>
              {(['todos', 'introductory', 'intermediate', 'advanced', 'seminary'] as const).map(n => (
                <button
                  key={n}
                  onClick={() => setFiltroNivel(n)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                    filtroNivel === n
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                      : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
                  )}
                >
                  {n === 'todos' ? 'Todos' : NIVEL_LABELS[n].label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] self-center mr-1">Categoria:</span>
              {(['todos', 'teologia', 'hermeneutica', 'exegese', 'historia', 'filosofia', 'linguas'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setFiltroCategoria(c)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                    filtroCategoria === c
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                      : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
                  )}
                >
                  {c === 'todos' ? 'Todas' : CATEGORIA_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Cursos', value: ESTUDOS.length, icon: BookOpen },
              { label: 'Módulos Total', value: ESTUDOS.reduce((s, e) => s + e.modulos, 0), icon: GraduationCap },
              { label: 'Com Avaliação', value: ESTUDOS.filter(e => e.avaliacao).length, icon: Award },
              { label: 'Com Certificado', value: ESTUDOS.filter(e => e.certificado).length, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 rounded-xl text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-[var(--brand-default)]" />
                <p className="font-display text-2xl font-light text-[var(--content-primary)]">{stat.value}</p>
                <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Course list */}
          <div className="space-y-4">
            {estudosFiltrados.map((estudo) => (
              <motion.div
                key={estudo.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className={cn('p-6 bg-gradient-to-r', estudo.cor)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', NIVEL_LABELS[estudo.nivel].cor)}>
                          {NIVEL_LABELS[estudo.nivel].label}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--surface-raised)]/50 text-[var(--content-muted)]">
                          {CATEGORIA_LABELS[estudo.categoria]}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-1">{estudo.titulo}</h3>
                      <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{estudo.descricao}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-xs text-[var(--content-muted)]">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {estudo.duracao}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {estudo.modulos} módulos</span>
                    {estudo.avaliacao && <span className="flex items-center gap-1"><Award className="w-3 h-3" /> Avaliação</span>}
                    {estudo.certificado && <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Certificado</span>}
                  </div>

                  <button
                    onClick={() => setExpandido(expandido === estudo.id ? null : estudo.id)}
                    className="mt-4 flex items-center gap-1 text-xs font-medium text-[var(--brand-default)] hover:underline"
                  >
                    {expandido === estudo.id ? 'Ocultar detalhes' : 'Ver detalhes'}
                    <ChevronDown className={cn('w-3 h-3 transition-transform', expandido === estudo.id && 'rotate-180')} />
                  </button>
                </div>

                <AnimatePresence>
                  {expandido === estudo.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-4 border-t border-[var(--border)]/30">
                        {/* Requisitos */}
                        {estudo.requisitos && estudo.requisitos.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">Pré-requisitos</h4>
                            <ul className="space-y-1">
                              {estudo.requisitos.map((r, i) => (
                                <li key={i} className="text-xs text-[var(--content-secondary)] flex items-start gap-2">
                                  <span className="text-[var(--brand-default)]">•</span> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Objetivos */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">🎯 Objetivos de Aprendizagem</h4>
                          <ul className="space-y-1.5">
                            {estudo.objetivos.map((obj, i) => (
                              <li key={i} className="text-xs text-[var(--content-secondary)] flex items-start gap-2">
                                <span className="text-[var(--brand-default)] font-bold">{i + 1}.</span> {obj}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bibliografia */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">📚 Bibliografia Recomendada</h4>
                          <ul className="space-y-1.5">
                            {estudo.bibliografia.map((b, i) => (
                              <li key={i} className="text-xs text-[var(--content-secondary)] flex items-start gap-2">
                                <span className="shrink-0">•</span>
                                <span><strong>{b.autor}</strong>. <em>{b.obra}</em>. {b.editora}, {b.ano}.</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Instrutor */}
                        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]/20">
                          <div className="w-8 h-8 rounded-full bg-[var(--brand-default)]/10 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-[var(--brand-default)]" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">{estudo.instrutor}</p>
                            <p className="text-[10px] text-[var(--content-muted)]">Professor</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {estudosFiltrados.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-[var(--content-muted)]" strokeWidth={1} />
              <p className="text-[var(--content-muted)]">Nenhum curso encontrado com esses filtros.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
