'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import {
  BookOpen, Search, Brain, Map, Languages, ArrowRight,
  Heart, BookMarked, Clock, Columns, Library,
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { OBRAS } from '@/data/biblioteca/catalogo';
import { CapaLivro } from '@/components/biblioteca/CapaLivro';
import { hrefBiblia } from '@/lib/bibliaHref';

const VerseDoDia = dynamic(() => import('@/components/VerseDoDia'), { ssr: false });
const ContinuarLeitura = dynamic(() => import('@/components/ContinuarLeitura'), { ssr: false });

const FERRAMENTAS = [
  { href: '/biblia', icon: BookOpen, label: 'Bíblia' },
  { href: '/pesquisa', icon: Search, label: 'Pesquisa' },
  { href: '/exegese', icon: Brain, label: 'Exegese' },
  { href: '/idiomas', icon: Languages, label: 'Grego e Hebraico' },
  { href: '/harmonia', icon: Columns, label: 'Harmonia' },
  { href: '/atlas', icon: Map, label: 'Atlas' },
  { href: '/biblioteca', icon: Library, label: 'Clássicos' },
];

const LEITURAS = [
  { titulo: 'Salmos', dias: 30, href: '/planos?plano=salmos-30' },
  { titulo: 'Os Evangelhos', dias: 60, href: '/planos?plano=evangelhos-60' },
  { titulo: 'Novo Testamento', dias: 90, href: '/planos?plano=nt-90' },
  { titulo: 'Bíblia inteira', dias: 365, href: '/planos?plano=biblia-1-ano' },
];

const OBRAS_DESTAQUE = OBRAS.slice(0, 6);

const ESTUDOS_PRONTOS = [
  { href: '/estudos/joao', titulo: 'João', desc: 'Os sete “Eu sou”, os sinais e o que é vida eterna.' },
  { href: '/estudos/romanos', titulo: 'Romanos', desc: 'Justificação pela fé — o coração da carta de Paulo.' },
  { href: '/estudos/genesis', titulo: 'Gênesis', desc: 'Criação, queda e a primeira promessa do Redentor.' },
  { href: '/estudos/apocalipse', titulo: 'Apocalipse', desc: 'A esperança da Igreja e o Cordeiro que vence.' },
];

const PASSAGENS_COMECO = [
  { href: hrefBiblia('jo', 1), titulo: 'João 1', desc: 'O Verbo se fez carne' },
  { href: hrefBiblia('sl', 23), titulo: 'Salmo 23', desc: 'O Senhor é o meu pastor' },
  { href: hrefBiblia('rm', 8), titulo: 'Romanos 8', desc: 'Nada nos separará do amor' },
  { href: hrefBiblia('gn', 1), titulo: 'Gênesis 1', desc: 'No princípio, Deus criou' },
];

export default function HomeClient() {
  const router = useRouter();
  const [busca, setBusca] = useState('');

  const enviarBusca = (e: FormEvent) => {
    e.preventDefault();
    const q = busca.trim();
    router.push(q ? `/pesquisa?q=${encodeURIComponent(q)}` : '/pesquisa');
  };

  return (
    <PageShell noContainer noPadding>
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <header className="pt-12 sm:pt-16 text-center">
          <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-primary/80">
            Estudo Bíblico Acadêmico
          </p>
          <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl font-normal tracking-tight mt-3 text-foreground leading-[0.95]">
            <span className="italic text-primary">Sola</span>{' '}
            Scriptura
          </h1>
          <p className="mt-5 text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Abra a Bíblia, toque no versículo e estude de graça — comentários clássicos, hebraico, grego e referências, sem anúncios.
          </p>
          <div className="lectern-ornament mt-7" aria-hidden="true" />
        </header>
      </div>

      <VerseDoDia />

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 -mt-2 mb-10">
          <Link
            href="/biblia"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md text-sm font-semibold
              bg-primary text-primary-foreground shadow-md hover:brightness-110 transition-[filter]"
          >
            <BookOpen className="w-4 h-4" />
            Abrir a Bíblia
          </Link>
          <Link
            href="/exegese"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium
              text-primary border border-primary/35 bg-card/70 hover:bg-primary/10 hover:border-primary/55 transition-colors"
          >
            Estudo com IA
          </Link>
        </div>

        <form onSubmit={enviarBusca} className="mb-12" role="search">
          <label htmlFor="home-search" className="sr-only">Buscar nas Escrituras</label>
          <div className="ssb-panel px-4">
            <div className="search-underline border-0">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                id="home-search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="João 3:16, Strong G26, fé…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                autoComplete="off"
              />
              <button
                type="submit"
                className="text-xs font-semibold tracking-wide uppercase text-primary hover:brightness-110"
                aria-label="Pesquisar"
              >
                Buscar
              </button>
            </div>
          </div>
        </form>

        <ol className="grid sm:grid-cols-3 gap-4 mb-12 text-left" aria-label="Como começar">
          {[
            { n: '1', t: 'Abra um capítulo', d: 'Comece pela Bíblia. O texto aparece versículo a versículo, fácil de acompanhar.' },
            { n: '2', t: 'Toque ou selecione', d: 'Toque abre o estudo. Selecione um trecho para marcar com cor ou gerar imagem.' },
            { n: '3', t: 'Leia com profundidade', d: 'Comentários clássicos, léxico Strong e clássicos da fé — tudo livre.' },
          ].map((passo) => (
            <li key={passo.n} className="ssb-panel p-4">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/80 mb-1.5">{passo.n}</p>
              <p className="text-sm font-semibold text-foreground mb-1">{passo.t}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{passo.d}</p>
            </li>
          ))}
        </ol>

        <nav
          aria-label="Ferramentas de estudo"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-12"
        >
          {FERRAMENTAS.map((f, i) => (
            <span key={f.href} className="inline-flex items-center">
              {i > 0 && (
                <span className="hidden sm:inline text-muted-foreground/30 mr-5" aria-hidden="true">·</span>
              )}
              <Link href={f.href} className="tool-link">
                <f.icon className="w-3.5 h-3.5" />
                {f.label}
              </Link>
            </span>
          ))}
        </nav>

        <ContinuarLeitura />

        <section className="mb-14" aria-labelledby="passagens-home">
          <div className="flex items-baseline justify-between mb-4">
            <h2 id="passagens-home" className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Comece por uma passagem
            </h2>
            <Link href="/biblia" className="text-xs font-medium text-primary hover:underline">
              Abrir a Bíblia
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {PASSAGENS_COMECO.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="ssb-panel block p-4 h-full hover:border-primary/35 transition-colors"
                >
                  <p className="text-sm font-semibold text-foreground">{p.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14" aria-labelledby="estudos-home">
          <div className="flex items-baseline justify-between mb-4">
            <h2 id="estudos-home" className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Estudos de livros
            </h2>
            <Link href="/estudos" className="text-xs font-medium text-primary hover:underline">
              Todos os estudos
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {ESTUDOS_PRONTOS.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="ssb-panel block p-4 h-full hover:border-primary/35 transition-colors"
                >
                  <p className="text-sm font-semibold text-foreground">{e.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{e.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14" aria-labelledby="estante-home">
          <div className="flex items-baseline justify-between mb-5">
            <h2 id="estante-home" className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Clássicos da Fé
            </h2>
            <Link href="/biblioteca" className="text-xs font-medium text-primary hover:underline">
              Estante completa
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-1 px-1">
            {OBRAS_DESTAQUE.map((obra) => (
              <CapaLivro key={obra.id} obra={obra} size="sm" href={`/biblioteca/${obra.id}`} />
            ))}
          </div>
        </section>

        <section className="mb-14" aria-labelledby="planos-home">
          <div className="flex items-baseline justify-between mb-4">
            <h2 id="planos-home" className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Planos de leitura
            </h2>
            <Link href="/planos" className="text-xs font-medium text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {LEITURAS.map((l) => (
              <li key={l.titulo}>
                <Link
                  href={l.href}
                  className="flex items-baseline justify-between py-3.5 group"
                >
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {l.titulo}
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {l.dias} dias
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-center font-display text-xl sm:text-2xl text-foreground/90 leading-snug mb-3">
          Tudo o que a Logos cobra — aqui é livre.
        </p>
        <p className="text-center text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
          Interlinear, léxico Strong’s, comentários clássicos, harmonia sinótica e biblioteca de domínio público. Sem anúncios.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-8 text-xs text-muted-foreground">
          <Link href="/favoritos" className="hover:text-primary inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" /> Favoritos
          </Link>
          <Link href="/marcacoes" className="hover:text-primary">Marcações</Link>
          <Link href="/notas" className="hover:text-primary">Notas</Link>
          <Link href="/colecoes" className="hover:text-primary inline-flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5" /> Coleções
          </Link>
          <Link href="/planos" className="hover:text-primary inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Planos
          </Link>
          <Link href="/estudar" className="hover:text-primary inline-flex items-center gap-1">
            Mesa de estudo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
