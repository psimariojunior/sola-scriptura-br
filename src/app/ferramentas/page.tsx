'use client';

import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, Search, Map, Brain, MessageSquare, Languages, 
  Calendar, Users, Lightbulb, FileText, Compass, BookMarked,
  Globe, Mic, BarChart3, GraduationCap, Edit3, BookText,
  Sparkles, ChevronRight, GitBranch
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

interface Ferramenta {
  id: string;
  titulo: string;
  descricao: string;
  icone: React.ReactNode;
  cor: string;
  href: string;
  categoria: 'estudo' | 'busca' | 'aprendizado' | 'criacao';
  novo?: boolean;
}

const FERRAMENTAS: Ferramenta[] = [
  // Estudo
  {
    id: 'biblia',
    titulo: 'Leitura Bíblica',
    descricao: '10 traduções com interlinear, karaoke e comentários inline',
    icone: <BookOpen className="w-6 h-6" />,
    cor: 'tile-brand',
    href: '/biblia',
    categoria: 'estudo',
  },
  {
    id: 'word-study',
    titulo: 'Estudo Palavra-a-Palavra',
    descricao: 'Guia completo com 50 domínios semânticos Louw-Nida',
    icone: <Languages className="w-6 h-6" />,
    cor: 'tile-cool',
    href: '/word-study',
    categoria: 'estudo',
  },
  {
    id: 'exegese',
    titulo: 'Exegese com IA',
    descricao: 'Análise exegetica automática de qualquer versículo',
    icone: <Brain className="w-6 h-6" />,
    cor: 'tile-brand',
    href: '/exegese',
    categoria: 'estudo',
  },
  {
    id: 'harmonia',
    titulo: 'Harmonia Sinótica',
    descricao: 'Comparação interativa de Mateus, Marcos, Lucas e João',
    icone: <FileText className="w-6 h-6" />,
    cor: 'tile-success',
    href: '/harmonia',
    categoria: 'estudo',
  },
  {
    id: 'uso-nt-not',
    titulo: 'Uso do NT no OT',
    descricao: 'Citações, alusões e ecos do AT no Novo Testamento',
    icone: <BookOpen className="w-6 h-6" />,
    cor: 'tile-cool',
    href: '/uso-nt-not',
    categoria: 'estudo',
  },
  {
    id: 'diagramas',
    titulo: 'Diagramas de Sentença',
    descricao: 'Análise sintática visual de versículos-chave',
    icone: <Sparkles className="w-6 h-6" />,
    cor: 'tile-info',
    href: '/diagramas',
    categoria: 'estudo',
  },
  {
    id: 'idiomas-ferramentas',
    titulo: 'Ferramentas de Línguas',
    descricao: 'Paradigmas completos, léxico e concordância grego/hebraico',
    icone: <Languages className="w-6 h-6" />,
    cor: 'tile-info',
    href: '/idiomas/ferramentas',
    categoria: 'estudo',
    novo: true,
  },
  {
    id: 'comparar-comentarios',
    titulo: 'Comparar Comentários',
    descricao: '8 teólogos lado a lado para cada versículo',
    icone: <MessageSquare className="w-6 h-6" />,
    cor: 'tile-warning',
    href: '/comparar-comentarios',
    categoria: 'estudo',
  },
  {
    id: 'referencias-explorer',
    titulo: 'Referências Cruzadas',
    descricao: 'Exploração visual de 29K conexões AT-NT por tipo teológico',
    icone: <GitBranch className="w-6 h-6" />,
    cor: 'tile-cool',
    href: '/referencias',
    categoria: 'estudo',
  },
  {
    id: 'comparar-traducoes',
    titulo: 'Comparar Traduções',
    descricao: '6 traduções lado a lado com modo foco e interlinear',
    icone: <Languages className="w-6 h-6" />,
    cor: 'tile-cool',
    href: '/comparar',
    categoria: 'estudo',
  },
  {
    id: 'quiz-vocabulario',
    titulo: 'Vocabulário Grego & Hebraico',
    descricao: 'Flashcards e quiz de vocabulário grego/hebraico',
    icone: <Brain className="w-6 h-6" />,
    cor: 'tile-warm',
    href: '/quiz/vocabulario',
    categoria: 'aprendizado',
  },
  {
    id: 'dashboard',
    titulo: 'Dashboard de Estudo',
    descricao: 'Progresso, conquistas e atividade recente',
    icone: <BarChart3 className="w-6 h-6" />,
    cor: 'tile-success',
    href: '/dashboard',
    categoria: 'aprendizado',
  },
  // Busca
  {
    id: 'pesquisa',
    titulo: 'Pesquisa Avançada',
    descricao: 'Busca semântica com 50 grupos de sinônimos',
    icone: <Search className="w-6 h-6" />,
    cor: 'tile-success',
    href: '/pesquisa',
    categoria: 'busca',
  },
  {
    id: 'concordancia',
    titulo: 'Concordância',
    descricao: 'Todas as ocorrências de uma palavra na Bíblia',
    icone: <BookMarked className="w-6 h-6" />,
    cor: 'tile-info',
    href: '/ferramentas/concordancia',
    categoria: 'busca',
  },
  {
    id: 'referencias',
    titulo: 'Referências Cruzadas',
    descricao: '29.000 conexões entre versículos',
    icone: <Compass className="w-6 h-6" />,
    cor: 'tile-cool',
    href: '/referencias',
    categoria: 'busca',
  },
  {
    id: 'palavras',
    titulo: 'Estudo por Palavra',
    descricao: '5.526 palavras gregas com Strong\'s, morfologia e frequência',
    icone: <Languages className="w-6 h-6" />,
    cor: 'tile-cool',
    href: '/palavras',
    categoria: 'busca',
  },
  {
    id: 'syntax-search',
    titulo: 'Syntax Search',
    descricao: 'Busca morfológica avançada: tempo, voz, categoria, Strong\'s',
    icone: <Search className="w-6 h-6" />,
    cor: 'tile-brand',
    href: '/ferramentas/syntax-search',
    categoria: 'busca',
    novo: true,
  },
  // Aprendizado
  {
    id: 'teologia',
    titulo: 'Teologia Sistemática',
    descricao: '13 categorias doutrinárias com estudos aprofundados',
    icone: <GraduationCap className="w-6 h-6" />,
    cor: 'tile-warning',
    href: '/teologia',
    categoria: 'aprendizado',
  },
  {
    id: 'historia',
    titulo: 'Contexto Histórico',
    descricao: 'O contexto histórico de cada livro da Bíblia',
    icone: <Calendar className="w-6 h-6" />,
    cor: 'tile-warning',
    href: '/historia',
    categoria: 'aprendizado',
  },
  {
    id: 'personagens',
    titulo: 'Personagens Bíblicos',
    descricao: 'Biografias detalhadas de personagens do AT e NT',
    icone: <Users className="w-6 h-6" />,
    cor: 'tile-warm',
    href: '/personagens',
    categoria: 'aprendizado',
  },
  {
    id: 'quiz',
    titulo: 'Quiz Bíblico',
    descricao: 'Teste seus conhecimentos com perguntas desafiadoras',
    icone: <Lightbulb className="w-6 h-6" />,
    cor: 'tile-warning',
    href: '/quiz',
    categoria: 'aprendizado',
  },
  // Criação
  {
    id: 'atlas',
    titulo: 'Atlas Bíblico',
    descricao: 'Mapa interativo com 150+ locais mapeados',
    icone: <Map className="w-6 h-6" />,
    cor: 'tile-success',
    href: '/atlas',
    categoria: 'criacao',
  },
  {
    id: 'compartilhar',
    titulo: 'Criador de Imagens',
    descricao: 'Crie imagens 1080x1080 para compartilhar versículos',
    icone: <Edit3 className="w-6 h-6" />,
    cor: 'tile-warm',
    href: '/compartilhar',
    categoria: 'criacao',
    novo: true,
  },
  {
    id: 'sermon-builder',
    titulo: 'Gerador de Sermão',
    descricao: 'Crie esboços e slides para pregações',
    icone: <Mic className="w-6 h-6" />,
    cor: 'tile-info',
    href: '/sermon-builder',
    categoria: 'criacao',
    novo: true,
  },
  {
    id: 'estatisticas',
    titulo: 'Estatísticas de Estudo',
    descricao: 'Acompanhe seu progresso e hábitos de leitura',
    icone: <BarChart3 className="w-6 h-6" />,
    cor: 'tile-info',
    href: '/estatisticas',
    categoria: 'criacao',
  },
];

const CATEGORIAS = [
  { id: 'estudo', label: 'Estudo', cor: 'bg-primary' },
  { id: 'busca', label: 'Busca', cor: 'bg-[var(--accent-cool)]' },
  { id: 'aprendizado', label: 'Aprendizado', cor: 'bg-[var(--accent-warning)]' },
  { id: 'criacao', label: 'Criação', cor: 'bg-[var(--accent-success)]' },
] as const;

export default function FerramentasHubPage() {
  return (
    <PageShell maxWidth="6xl">
      <ScrollReveal>
        <PageHero
          icon={Sparkles}
          title={
            <>Ferramentas <span className="italic text-primary">Bíblicas</span></>
          }
          subtitle="Explore todas as ferramentas de estudo bíblico disponíveis. Tudo gratuito, sem anúncios, sem assinatura."
        />
      </ScrollReveal>

      <div>
        {CATEGORIAS.map((cat, catIndex) => {
            const ferramentasDaCategoria = FERRAMENTAS.filter(f => f.categoria === cat.id);
            if (ferramentasDaCategoria.length === 0) return null;
            
            return (
              <ScrollReveal key={cat.id} delay={catIndex * 0.1}>
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-2.5 h-2.5 rounded-full ${cat.cor}`} />
                    <h2 className="text-h3 text-[var(--content-primary)]">
                      {cat.label}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ferramentasDaCategoria.map((ferramenta, i) => (
                      <motion.div
                        key={ferramenta.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (catIndex * 0.1) + (i * 0.05) }}
                      >
                        <Link
                          href={ferramenta.href}
                          className="group block h-full"
                        >
                          <div className="h-full p-5 rounded-xl border border-[var(--border)]/40 bg-[var(--surface-raised)] hover:border-[var(--brand-default)]/40 hover:shadow-lg hover:shadow-[var(--brand-default)]/5 transition-all duration-300">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl ${ferramenta.cor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                {ferramenta.icone}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-display text-lg font-medium text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
                                    {ferramenta.titulo}
                                  </h3>
                                  {ferramenta.novo && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--brand-default)] text-[var(--brand-contrast)]">
                                      NOVO
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-[var(--content-muted)] mt-1 line-clamp-2">
                                  {ferramenta.descricao}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-[var(--content-muted)] group-hover:text-[var(--brand-default)] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h2 className="text-h2 mb-4">
              Estudo completo, <span className="italic text-primary">sem anúncios</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-5">
                <div className="text-h2 text-primary mb-2">Livre</div>
                <div className="text-sm text-muted-foreground">Acesso completo</div>
                <div className="text-xs text-muted-foreground mt-1">Sem assinatura para ler e estudar</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-5">
                <div className="text-h2 text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Anúncios</div>
                <div className="text-xs text-muted-foreground mt-1">A Palavra em primeiro plano</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-5">
                <div className="text-h2 text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Ferramentas</div>
                <div className="text-xs text-muted-foreground mt-1">Léxico, harmonia, atlas e comentários</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollReveal>
    </PageShell>
  );
}
