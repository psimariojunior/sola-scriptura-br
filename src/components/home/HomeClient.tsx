'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BookOpen, Map, Brain, ScrollText, ArrowRight, Sparkles, Columns2,
  Globe, Shield, Heart, MonitorPlay, Music, Zap, Play,
  CheckCircle2, ChevronDown, Tv, Smartphone, Cast, Languages,
  BookMarked, GraduationCap, WifiOff, Share2, Gift, GitCompareArrows,
  Star, Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const HeroParticles = dynamic(() => import('@/components/home/HeroParticles').then(m => ({ default: m.HeroParticles })), { ssr: false });
const RotatingVerse = dynamic(() => import('@/components/home/RotatingVerse').then(m => ({ default: m.RotatingVerse })), { ssr: false });
const AnimatedCounter = dynamic(() => import('@/components/home/AnimatedCounter').then(m => ({ default: m.AnimatedCounter })), { ssr: false });
const VerseDoDia = dynamic(() => import('@/components/VerseDoDia'), { ssr: false });
const ContinuarLeitura = dynamic(() => import('@/components/ContinuarLeitura'), { ssr: false });
const WordOfDayWidget = dynamic(() => import('@/components/WordOfDay').then(m => ({ default: m.WordOfDay })), { ssr: false });
const InstallBanner = dynamic(() => import('@/components/InstallBanner'), { ssr: false });
const NotificationSetup = dynamic(() => import('@/components/NotificationSetup').then(m => ({ default: m.NotificationSetup })), { ssr: false });

const features = [
  { icon: Columns2, title: 'Multi-Tradução', desc: 'ARC, NVI, ARA, ACF, KJV e WEB lado a lado com destaque automático de diferenças.', accent: 'amber' },
  { icon: ScrollText, title: 'Exegese Versículo a Versículo', desc: 'Análise contextual, gramatical e teológica para cada versículo, com referências cruzadas.', accent: 'emerald' },
  { icon: Brain, title: 'IA Teológica', desc: 'Assistente treinado em teologia reformada e exegese bíblica — respostas fundamentadas.', accent: 'purple' },
  { icon: Map, title: 'Atlas Bíblico Interativo', desc: 'Mapas detalhados de locais bíblicos com rotas narrativas e contexto histórico.', accent: 'sky' },
  { icon: Music, title: 'Áudio com Narração Dramática', desc: 'ElevenLabs + Web Speech API: narração profissional com vozes por personagem.', accent: 'rose' },
  { icon: MonitorPlay, title: 'Modo Apresentação', desc: 'Projete versículos em TVs e projetores via QR code — sem instalar nada.', accent: 'gold', highlight: true },
  { icon: Languages, title: 'Línguas Originais (Strong)', desc: 'Grego Koiné e Hebraico Bíblico com léxico Strong palavra por palavra.', accent: 'violet' },
  { icon: Brain, title: 'Concordância & Crítica Textual', desc: 'Pesquise cada palavra em toda a Bíblia e compare manuscritos antigos.', accent: 'cyan' },
  { icon: BookMarked, title: 'Flashcards & Memorização', desc: 'Memorize versículos e conceitos com decks inteligentes e revisão espaçada.', accent: 'rose' },
  { icon: GraduationCap, title: 'Planos de Leitura', desc: 'Cronogramas estruturados para leitura diária de toda a Escritura.', accent: 'emerald' },
  { icon: WifiOff, title: 'Modo Offline', desc: 'Leve a Bíblia e seus estudos para qualquer lugar, mesmo sem internet.', accent: 'slate' },
  { icon: Share2, title: 'Compartilhar Versículos', desc: 'Crie imagens lindas de versículos para compartilhar em redes sociais.', accent: 'amber' },
];

const comoEstudar = [
  { step: '01', title: 'Escolha sua tradução', desc: 'Selecione entre ARC, NVI, ARA, ACF, KJV e WEB. Compare versões lado a lado para entender cada nuance.', icon: Columns2 },
  { step: '02', title: 'Explore as línguas originais', desc: 'Mergulhe no grego e hebraico com o léxico Strong, concordância e crítica textual — direto na página.', icon: Languages },
  { step: '03', title: 'Pergunte à IA', desc: 'Tire dúvidas teológicas com o assistente treinado em exegese reformada, fundamentado na Escritura.', icon: Brain },
];

const comoFunciona = [
  { step: '01', title: 'Abra qualquer versículo', desc: 'Navegue pelas 6 traduções, escolha o livro e capítulo. Recursos aparecem ao lado.' },
  { step: '02', title: 'Explore os recursos', desc: 'Comentários de teólogos clássicos, grego e hebraico, referências cruzadas, áudio e mais.' },
  { step: '03', title: 'Apresente em qualquer tela', desc: 'Abra o modo Apresentação, escaneie o QR code e compartilhe versículos em tempo real.' },
];

const paraGrupos = ['Projete versículos em qualquer tela', 'Ideal para cultos, células, escolas bíblicas', 'Sem instalação, sem cadastro'];

const trustBadges = [
  { label: 'Sem anúncios', icon: Shield },
  { label: 'Código aberto', icon: Globe },
  { label: 'Dados privados', icon: Heart },
];

const depoimentos: { texto: string; autor: string; cargo: string }[] = [];

const referenciadoPor = ['Seminários Teológicos', 'Escolas Bíblicas', 'Igrejas Locais', 'Pastores e Líderes', 'Estudantes', 'Missionários'];

const provasSociais = [
  { icon: BookOpen, label: '66 livros' },
  { icon: Languages, label: '6 traduções' },
  { icon: Brain, label: 'IA teológica' },
  { icon: Smartphone, label: 'Modo offline' },
];

const stats = [
  { value: 66, label: 'Livros', suffix: '' },
  { value: 6, label: 'Traduções', suffix: '' },
  { value: 31102, label: 'Versículos', suffix: '' },
  { value: 29266, label: 'Ref. Cruzadas', suffix: '' },
  { value: 4911, label: 'Comentários', suffix: '' },
  { value: 14200, label: 'Verbetes', suffix: '' },
];

function ApresentacaoMockup() {
  return (
    <div className="mockup-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[10px] text-white/40 ml-2 tracking-wider">sola-scriptura.app/apresentar</span>
        </div>
      </div>
      <div className="mockup-screen-content pt-8">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-amber-400/80 mb-3">
          <Tv className="w-3 h-3" />
          Modo Apresentação
        </div>
        <p className="mockup-verse">
          Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito
        </p>
        <p className="mockup-ref">— João 3:16</p>
        <div className="mt-6 flex items-center gap-4 text-[10px] text-white/50">
          <span className="flex items-center gap-1.5">
            <Cast className="w-3 h-3" /> Projetando
          </span>
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3 h-3" /> QR Conectado
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, highlight, align = 'center' }: { eyebrow?: string; title: React.ReactNode; highlight: React.ReactNode; align?: 'center' | 'left' }) {
  return (
    <div className={`mb-10 sm:mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] tracking-tight">
        {title} <span className="italic text-primary">{highlight}</span>
      </h2>
    </div>
  );
}

function FeatureCard({ feature, index, large = false }: { feature: typeof features[number]; index: number; large?: boolean }) {
  const Icon = feature.icon;
  return (
    <div className={`group h-full p-6 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all duration-200 ${large ? 'p-8' : ''}`}>
      <div className="flex items-start gap-4">
        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <div>
          <h3 className={`font-semibold mb-1.5 ${large ? 'text-lg' : 'text-base'}`}>{feature.title}</h3>
          <p className={`text-muted-foreground leading-relaxed ${large ? 'text-sm' : 'text-[13px]'}`}>{feature.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main id="main-content" className="relative">
        <section className="relative pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <Gift className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Acesso Livre · Sem anúncios</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-6">
              <span className="block">Estude a Bíblia</span>
              <span className="block"><span className="text-primary">em profundidade</span>,</span>
              <span className="block italic text-foreground/80">gratuitamente.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              6 traduções da Bíblia, comentários de teólogos clássicos, léxico grego e hebraico, referências cruzadas, IA teológica e modo apresentação para igrejas e células.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Link href="/biblia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Começar a Estudar
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/apresentar" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-border hover:bg-secondary transition-colors">
                <Play className="w-4 h-4 fill-current" /> Apresentar em Tela
              </Link>
              <Link href="/ia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-border hover:bg-secondary transition-colors">
                <Brain className="w-4 h-4" /> Conheça a IA
              </Link>
            </div>

            <RotatingVerse />
          </div>
        </section>

        <VerseDoDia />
        <ContinuarLeitura />
        <WordOfDayWidget />

        <section className="py-8 px-4 sm:px-6" aria-label="Destaques do Sola Scriptura">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {provasSociais.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.label} className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                    <span className="text-sm font-medium">{p.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-secondary/30" aria-label="Estatísticas do Sola Scriptura">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-card border border-border">
                  <p className="font-display text-2xl sm:text-3xl font-light tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6" aria-label="Recursos">
          <div className="max-w-6xl mx-auto">
            <SectionHeading title="Tudo que você precisa para" highlight="estudar a Palavra." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div key={f.title} className={f.highlight ? 'sm:col-span-2 lg:col-span-2' : ''}>
                  <FeatureCard feature={f} index={i} large={f.highlight} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 sm:px-6" aria-label="Dados da plataforma">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-display text-xl font-medium mb-2">Dados da plataforma</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Comentários', desc: 'Matthew Henry, Adam Clarke, John Gill e outros' },
                { label: 'Léxico Strong', desc: '5.526 gregos + 8.674 hebraicos' },
                { label: 'Referências Cruzadas', desc: '29.266 refs do TSK' },
                { label: 'Traduções', desc: 'ARC, ARA, ACF, KJV, NVI, WEB' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 rounded-lg bg-card border border-border">
                  <p className="text-sm font-medium mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30" aria-label="Como estudar">
          <div className="max-w-6xl mx-auto">
            <SectionHeading title="Seu estudo em" highlight="3 passos." />
            <div className="grid md:grid-cols-3 gap-5">
              {comoEstudar.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="h-full p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{step.step}</span>
                    </div>
                    <h3 className="font-display text-xl font-medium mb-2 leading-tight">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6" aria-label="Como funciona">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Comece a estudar em" highlight="3 passos." />
            <div className="grid md:grid-cols-3 gap-5">
              {comoFunciona.map((step, i) => (
                <div key={step.step} className="h-full p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">{step.step}</span>
                    {i < comoFunciona.length - 1 && (
                      <span className="hidden md:block flex-1 h-px bg-border" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="font-display text-xl font-medium mb-2 leading-tight">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30" aria-label="Modo Apresentação para grupos">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-4 flex items-center gap-2">
                  <MonitorPlay className="w-3.5 h-3.5" /> Para Grupos e Igrejas
                </p>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] tracking-tight mb-6">
                  Mostre a Palavra<br /><span className="italic text-primary">em qualquer tela.</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  O Modo Apresentação transforma qualquer TV, projetor ou monitor em uma ferramenta de culto. Controle tudo do seu celular via QR code.
                </p>
                <ul className="space-y-3 mb-8">
                  {paraGrupos.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href="/apresentar" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Experimentar Modo Apresentação
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/biblia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-border hover:bg-secondary transition-colors">
                    <BookOpen className="w-4 h-4" /> Abrir a Bíblia
                  </Link>
                </div>
              </div>
              <div>
                <ApresentacaoMockup />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 px-4 sm:px-6" aria-label="Compare traduções">
          <div className="max-w-6xl mx-auto">
            <Link href="/comparar" className="group block rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all duration-200 p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
                <GitCompareArrows className="w-8 h-8 text-primary flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl sm:text-3xl font-light leading-tight mb-2">Compare traduções <span className="italic text-primary">lado a lado</span></h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">Veja até 3 versões do mesmo versículo simultaneamente e descubra as diferenças de tradução que mudam o entendimento do texto bíblico.</p>
                </div>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-border group-hover:bg-secondary transition-colors shrink-0">
                  Experimentar <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border" aria-label="Comece a estudar">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] mb-5">
              Comece hoje o seu<br /><span className="italic text-primary">estudo bíblico.</span>
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Acesse todas as ferramentas gratuitamente. Estude a Bíblia com o rigor acadêmico que ela merece.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Link href="/biblia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <BookOpen className="w-4 h-4" /> Comece a estudar a Bíblia hoje
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/ia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-border hover:bg-secondary transition-colors">
                <Brain className="w-4 h-4" /> Conheça a IA
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <badge.icon className="w-3.5 h-3.5 text-primary" />{badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border" aria-label="Notificações">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-display text-xl font-medium mb-3">Versículo Diário</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Receba um versículo inspirador toda manhã às 7h direto no seu navegador.
            </p>
            <NotificationSetup />
          </div>
        </section>
      </main>
      <Footer />
      <InstallBanner />
    </div>
  );
}
