'use client';

import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

const features = [
  {
    icon: '📖',
    title: 'Bíblia em 10 Traduções',
    description: 'ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA, AA, NBV — compare traduções lado a lado.',
  },
  {
    icon: '🔤',
    title: 'Léxico Grego e Hebraico',
    description: '5.526 palavras gregas + 8.674 hebraicas com Strong, morfologia e concordância.',
  },
  {
    icon: '🤖',
    title: 'IA para Estudo Bíblico',
    description: 'Exegese automática, modo socrático e respostas contextuais via Groq AI.',
  },
  {
    icon: '🗺️',
    title: 'Atlas Bíblico Interativo',
    description: '20 locais bíblicos com mapa OpenStreetMap e coordenadas geográficas.',
  },
  {
    icon: '🎵',
    title: 'Áudio com Karaoke',
    description: 'Edge TTS gratuito, sincronização versículo-a-versículo, pré-carregamento automático.',
  },
  {
    icon: '📊',
    title: 'Referências Cruzadas',
    description: '29.000+ referências TSK com visualização em árvore interativa.',
  },
  {
    icon: '🔍',
    title: 'Busca Semântica',
    description: '50 grupos de sinônimos bíblicos para encontrar versículos por conceito.',
  },
  {
    icon: '📱',
    title: 'PWA Offline',
    description: 'Funciona sem internet. Leia, estude e ouça em qualquer lugar.',
  },
  {
    icon: '🎯',
    title: 'Modo Imersivo',
    description: 'Leitura cinematográfica com narração automática e 5 temas visuais.',
  },
  {
    icon: '🧠',
    title: 'Modo Socrático',
    description: 'Estudo guiado por perguntas que estimulam o raciocínio bíblico.',
  },
  {
    icon: '🔥',
    title: 'Jornada Emocional',
    description: 'Heatmap emocional de 40 livros bíblicos com 6 emoções.',
  },
  {
    icon: '✨',
    title: '100% Gratuito',
    description: 'Sem anúncios, sem assinatura, sem limite de uso. Estudo bíblico para todos.',
  },
];

const destaques = [
  { titulo: 'Léxico hebraico e grego', texto: '8.674 entradas hebraicas e 5.526 gregas, com Strong e morfologia.' },
  { titulo: 'Interlinear palavra a palavra', texto: 'Texto original alinhado à leitura, para o estudo do versículo.' },
  { titulo: 'Comentários clássicos', texto: 'Pais da Igreja, Reforma e puritanos, em português do Brasil.' },
  { titulo: 'Referências cruzadas', texto: 'Mais de 29 mil ligações TSK, com exploração visual.' },
  { titulo: 'Exegese e harmonia', texto: 'Análise do texto, paralelos sinóticos e atlas bíblico.' },
  { titulo: 'Biblioteca de clássicos', texto: 'Obras de domínio público com leitor e fichas acadêmicas.' },
];

const stats = [
  { value: '10', label: 'Traduções' },
  { value: '14.200', label: 'Palavras originais' },
  { value: '4.911', label: 'Comentários' },
  { value: '29.000', label: 'Referências cruzadas' },
  { value: '102', label: 'Páginas interativas' },
  { value: '0', label: 'Anúncios' },
];

export default function LandingPage() {
  return (
    <PageShell noContainer noPadding>
      <section className="relative px-6 py-20 text-center overflow-hidden">
        <div className="relative max-w-4xl mx-auto">
          <p className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-[0.18em] uppercase">
            Estudo Bíblico Acadêmico com IA
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-normal text-foreground mb-6 leading-tight">
            Sola Scriptura
            <span className="block text-primary italic">BR</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A plataforma mais completa para estudo bíblico. 10 traduções, léxico original, IA, exegese automática — e 100% gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/biblia"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-lg hover:opacity-90 transition-opacity"
            >
              Começar agora
            </Link>
            <Link
              href="/socratico"
              className="px-8 py-4 border border-border text-foreground font-medium rounded-xl text-lg hover:bg-muted/40 transition-colors"
            >
              Experimentar modo socrático
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-y border-border/40">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-normal text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground text-center mb-4">Tudo que você precisa</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Ferramentas de estudo acadêmico em português do Brasil — gratuitas e sem anúncios.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="sola-card p-6 rounded-2xl"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-y border-border/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground text-center mb-4">Por que estudar aqui</h2>
          <p className="text-muted-foreground text-center mb-12">Recursos pensados para o leitor brasileiro, com fontes clássicas e texto bíblico em primeiro lugar.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {destaques.map((d) => (
              <div key={d.titulo} className="sola-card p-5 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-1">{d.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-normal text-foreground mb-6">Comece hoje</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Junte-se a milhares de pessoas que estudam a Bíblia de forma mais profunda.
          </p>
          <Link
            href="/biblia"
            className="inline-block px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-xl text-xl hover:opacity-90 transition-opacity"
          >
            Abrir Bíblia
          </Link>
          <p className="text-muted-foreground text-sm mt-6">Não precisa de cadastro. Comece a ler agora.</p>
        </div>
      </section>
    </PageShell>
  );
}
