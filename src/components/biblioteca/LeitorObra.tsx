'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  List,
  Minus,
  Plus,
  CheckCircle2,
  BookOpen,
  X,
} from 'lucide-react';
import type { ObraMeta, CapituloObra } from '@/data/biblioteca/types';

interface LeitorObraProps {
  meta: ObraMeta;
  capitulo: CapituloObra;
  titulos: { numero: number; titulo: string }[];
}

const TAMANHOS = ['text-base', 'text-lg', 'text-xl', 'text-2xl'];

/** renderiza **negrito** e citações (> prefix) dentro do parágrafo */
function renderizarParagrafo(texto: string, key: number) {
  if (texto.startsWith('> ')) {
    const conteudo = texto.slice(2);
    const partes = conteudo.split(/\*\*(.+?)\*\*/g);
    return (
      <blockquote
        key={key}
        className="border-l-4 border-primary/60 pl-5 pr-2 py-2 my-5 italic font-serif text-foreground/90 bg-primary/5 rounded-r-lg"
      >
        {partes.map((p, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="not-italic font-semibold">
              {p}
            </strong>
          ) : (
            p
          )
        )}
      </blockquote>
    );
  }
  const partes = texto.split(/\*\*(.+?)\*\*/g);
  const comNota = texto.startsWith('**Nota');
  return (
    <p
      key={key}
      className={`leading-relaxed mb-6 font-serif ${
        comNota
          ? 'text-sm text-muted-foreground bg-muted/60 border border-border/60 rounded-lg p-4 not-italic'
          : 'text-foreground/90'
      } ${partes.length === 1 && !comNota && key === 0 ? 'first-letter:text-5xl first-letter:font-display first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none' : ''}`}
    >
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {p}
          </strong>
        ) : (
          p
        )
      )}
    </p>
  );
}

export function LeitorObra({ meta, capitulo, titulos }: LeitorObraProps) {
  const [tamanho, setTamanho] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const v = parseInt(localStorage.getItem('ssb_bib_fontsize') ?? '1', 10);
      if (v >= 0 && v < TAMANHOS.length) return v;
    }
    return 1;
  });
  const [sumarioAberto, setSumarioAberto] = useState(false);
  const [lido, setLido] = useState(false);

  const { scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const anterior = titulos.find((t) => t.numero === capitulo.numero - 1);
  const proximo = titulos.find((t) => t.numero === capitulo.numero + 1);

  const salvarProgresso = useCallback(
    (marcarLido: boolean) => {
      try {
        const raw = localStorage.getItem('ssb_bib_leitura');
        const p = raw ? JSON.parse(raw) : {};
        const atual = p[meta.id] ?? { ultimoCap: capitulo.numero, lidos: [] };
        p[meta.id] = {
          ultimoCap: capitulo.numero,
          lidos: marcarLido
            ? [...new Set([...atual.lidos, capitulo.numero])]
            : atual.lidos,
        };
        localStorage.setItem('ssb_bib_leitura', JSON.stringify(p));
      } catch {
        /* ignora */
      }
    },
    [meta.id, capitulo.numero]
  );

  useEffect(() => {
    salvarProgresso(false);
    try {
      const raw = localStorage.getItem('ssb_bib_leitura');
      const p = raw ? JSON.parse(raw) : {};
      setLido(Boolean(p[meta.id]?.lidos?.includes(capitulo.numero)));
    } catch {
      /* ignora */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.id, capitulo.numero]);

  const marcarConcluido = useCallback(() => {
    salvarProgresso(true);
    setLido(true);
  }, [salvarProgresso]);

  useEffect(() => {
    localStorage.setItem('ssb_bib_fontsize', String(tamanho));
  }, [tamanho]);

  const tempoCap = useMemo(
    () => Math.max(2, Math.round(capitulo.paragrafos.join(' ').split(/\s+/).length / 200)),
    [capitulo]
  );

  return (
    <div className="min-h-screen">
      <Header />

      {/* barra de progresso de leitura */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: progresso }}
      />

      {/* barra de ferramentas do leitor */}
      <div className="sticky top-16 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <Link
            href={`/biblioteca/${meta.id}`}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors min-w-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate hidden sm:inline">{meta.titulo.replace(' (seleções)', '')}</span>
            <span className="sm:hidden">Obra</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setTamanho((t) => Math.max(0, t - 1))}
                className="p-1.5 hover:bg-muted transition-colors disabled:opacity-30"
                disabled={tamanho === 0}
                aria-label="Diminuir fonte"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] px-1.5 text-muted-foreground border-x border-border py-1.5">Aa</span>
              <button
                onClick={() => setTamanho((t) => Math.min(TAMANHOS.length - 1, t + 1))}
                className="p-1.5 hover:bg-muted transition-colors disabled:opacity-30"
                disabled={tamanho === TAMANHOS.length - 1}
                aria-label="Aumentar fonte"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={() => setSumarioAberto((v) => !v)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label="Sumário"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label="Voltar ao topo"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* sumário expansível */}
        {sumarioAberto && (
          <div className="max-w-3xl mx-auto px-4 pb-3 max-h-64 overflow-y-auto border-t border-border/50 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {titulos.map((t) => (
                <Link
                  key={t.numero}
                  href={`/biblioteca/${meta.id}/${t.numero}`}
                  onClick={() => setSumarioAberto(false)}
                  className={`text-xs px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors truncate ${
                    t.numero === capitulo.numero ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {t.numero}. {t.titulo}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════ CONTEÚDO ═══════════ */}
      <main className="pt-10 pb-16 px-4 sm:px-6">
        <article className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">
              {meta.autor.split('(')[0].trim()}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3 text-xs text-muted-foreground">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="truncate max-w-48 sm:max-w-none">{meta.titulo.replace(' (seleções)', '')}</span>
              <span>·</span>
              <span>Capítulo {capitulo.numero} de {titulos.length}</span>
              <span>·</span>
              <span>{tempoCap} min</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-light leading-tight mb-4">
              {capitulo.titulo}
            </h1>
            <div className="ornament w-16 mx-auto" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`${TAMANHOS[tamanho]} ${tamanho >= 2 ? 'md:px-2' : ''}`}
          >
            {capitulo.paragrafos.map((p, i) => renderizarParagrafo(p, i))}
          </motion.div>

          {/* fim de capítulo */}
          <div className="text-center my-10">
            <div className="flex items-center justify-center gap-2 text-primary/50">
              <span className="w-12 h-px bg-current" />
              <span className="text-xs">◆</span>
              <span className="w-12 h-px bg-current" />
            </div>
          </div>

          {/* marcar como lido */}
          <div className="flex justify-center mb-8">
            <button
              onClick={marcarConcluido}
              disabled={lido}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                lido
                  ? 'bg-primary/10 text-primary cursor-default'
                  : 'bg-muted hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {lido ? 'Capítulo concluído' : 'Marcar como lido'}
            </button>
          </div>

          {/* navegação */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {anterior ? (
              <Link
                href={`/biblioteca/${meta.id}/${anterior.numero}`}
                className="sola-card p-4 group flex items-center gap-3 hover:border-primary/40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Anterior</p>
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {anterior.numero}. {anterior.titulo}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {proximo ? (
              <Link
                href={`/biblioteca/${meta.id}/${proximo.numero}`}
                className="sola-card p-4 group flex items-center justify-end gap-3 text-right hover:border-primary/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Próximo</p>
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {proximo.numero}. {proximo.titulo}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ) : (
              <Link
                href={`/biblioteca/${meta.id}`}
                className="sola-card p-4 group flex items-center justify-end gap-3 text-right hover:border-primary/40 transition-colors"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Fim da leitura</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    Voltar à obra
                  </p>
                </div>
                <X className="w-4 h-4 text-muted-foreground shrink-0" />
              </Link>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}
