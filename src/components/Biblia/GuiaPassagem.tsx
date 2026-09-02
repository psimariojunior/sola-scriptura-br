'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  Compass,
  GraduationCap,
  Landmark,
  Languages,
  Link2,
  List,
  MapPin,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { hrefBiblia, hrefFromRef, hrefHarmonia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { temComentario } from '@/data/comentarios-index';
import type { EstudoCapitulo } from '@/data/estudosCapitulo';
import type { Comentario } from '@/data/comentarios';
import type { PalavraStrong } from '@/data/biblia/strong';
import type { Pericope } from '@/data/biblia/pericopes';
import type { EstudoVersiculo } from '@/data/estudosTeologicos';
import type { LocalBiblico } from '@/data/biblia/locais';
import { CadeiaReferencias } from './CadeiaReferencias';
import { montarCadeia, type EloCadeia } from '@/lib/cadeiaReferencias';
import { ensinarPalavra } from '@/lib/ensinarPalavra';
import { ParalelosDoCapitulo } from './ParalelosDoCapitulo';
import { obterTrilhaPorLivro } from '@/data/trilhasLivro';
import { RespostaCapituloTrilha } from '@/components/cursos/RespostaCapituloTrilha';

export interface GuiaPassagemProps {
  livro: string;
  capitulo: number;
  versiculo?: number;
  compact?: boolean;
}

const NIVEL: Record<string, { label: string; className: string }> = {
  profundo: { label: 'Ficha profunda', className: 'bg-[var(--brand-subtle)] text-[var(--brand-default)]' },
  legado: { label: 'Estudo do capítulo', className: 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]' },
  sintese: { label: 'Síntese automática', className: 'bg-[var(--surface-sunken)] text-[var(--content-muted)]' },
};

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

function formatTsk(ref: string): string {
  const [abrev, cap, ver] = ref.split(':');
  const nome = nomeLivro(abrev);
  if (cap && ver) return `${nome} ${cap}:${ver}`;
  if (cap) return `${nome} ${cap}`;
  return ref;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-xl bg-[var(--surface-sunken)]', className)} />;
}

export function GuiaPassagem({ livro, capitulo, versiculo, compact = false }: GuiaPassagemProps) {
  const livroLower = livro.toLowerCase();
  const nome = nomeLivro(livroLower);
  const refLabel = versiculo ? `${nome} ${capitulo}:${versiculo}` : `${nome} ${capitulo}`;

  const [estudo, setEstudo] = useState<EstudoCapitulo | null>(null);
  const [texto, setTexto] = useState<string | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [palavras, setPalavras] = useState<PalavraStrong[]>([]);
  const [tsk, setTsk] = useState<string[]>([]);
  const [cadeia, setCadeia] = useState<EloCadeia[]>([]);
  const [mostrarTsk, setMostrarTsk] = useState(false);
  const [comentarioProximoDe, setComentarioProximoDe] = useState<number | null>(null);
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [estudosTeo, setEstudosTeo] = useState<EstudoVersiculo[]>([]);
  const [locais, setLocais] = useState<LocalBiblico[]>([]);
  const [loading, setLoading] = useState(true);

  const versosComComentario = useMemo(() => {
    const out: number[] = [];
    for (let v = 1; v <= 180; v++) {
      if (temComentario(livroLower, capitulo, v)) out.push(v);
    }
    return out;
  }, [livroLower, capitulo]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setEstudo(null);
    setTexto(null);
    setComentarios([]);
    setPalavras([]);
    setTsk([]);
    setCadeia([]);
    setMostrarTsk(false);
    setComentarioProximoDe(null);
    setPericopes([]);
    setEstudosTeo([]);
    setLocais([]);

    const load = async () => {
      const [estudosMod, carregarMod, comentariosMod, strongMod, tskMod, pericopesMod, teoMod, locaisMod] =
        await Promise.all([
          import('@/lib/estudosLoader'),
          import('@/data/biblia/texto/carregar'),
          import('@/data/comentarios'),
          versiculo ? import('@/data/biblia/strong') : Promise.resolve(null),
          versiculo ? import('@/data/crossReferences') : Promise.resolve(null),
          import('@/data/biblia/pericopes'),
          import('@/data/estudosTeologicos'),
          import('@/data/biblia/locais'),
        ]);

      if (cancelled) return;

      setEstudo(estudosMod.obterEstudoCapitulo(livroLower, capitulo));

      try {
        const data = await carregarMod.carregarTraducao('nvi');
        const cap = data[livroLower]?.[capitulo];
        if (versiculo && cap?.[versiculo - 1]) {
          setTexto(cap[versiculo - 1]);
        } else if (!versiculo && cap?.[0]) {
          setTexto(cap[0]);
        } else {
          const ara = await carregarMod.carregarTraducao('ara');
          const cap2 = ara[livroLower]?.[capitulo];
          if (versiculo && cap2?.[versiculo - 1]) setTexto(cap2[versiculo - 1]);
          else if (cap2?.[0]) setTexto(cap2[0]);
        }
      } catch {
        /* texto opcional */
      }

      const versesToLoad = versiculo
        ? [versiculo]
        : versosComComentario.slice(0, 6);
      const comps: Comentario[] = [];
      for (const v of versesToLoad) {
        comps.push(...comentariosMod.obterComentarios(livroLower, capitulo, v));
      }
      if (comps.length === 0 && versiculo) {
        const classicosMod = await import('@/data/comentariosClassicos');
        const proximo = classicosMod.obterComentarioClassicoProximo(livroLower, capitulo, versiculo);
        if (proximo.length > 0) {
          comps.push(...proximo);
          setComentarioProximoDe(proximo[0].versiculo);
        }
      }
      const seen = new Set<string>();
      setComentarios(
        comps.filter((c) => {
          const k = `${c.autor}:${c.versiculo}:${c.texto.slice(0, 40)}`;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        }).slice(0, 8)
      );

      if (strongMod && versiculo) {
        const p = await strongMod.getStrongPorVersiculo(livroLower, capitulo, versiculo);
        if (!cancelled) setPalavras(p ?? []);
      }

      if (versiculo) {
        const curatedMod = await import('@/data/biblia/crossReferences');
        const tskList = tskMod ? (tskMod.crossReferences[`${livroLower}:${capitulo}:${versiculo}`] || []) : [];
        setTsk(tskList);
        setCadeia(montarCadeia({
          livro: livroLower,
          curated: curatedMod.getCrossReferencesByVerse(livroLower, capitulo, versiculo),
          tsk: tskList,
          limite: 5,
        }));
      }

      setPericopes(pericopesMod.getPericopesCapitulo(nome, capitulo).slice(0, 8));

      if (versiculo) {
        setEstudosTeo(teoMod.obterEstudos(livroLower, capitulo, versiculo));
      } else {
        setEstudosTeo(
          teoMod.listarTodosEstudos().filter((e) => e.livro === livroLower && e.capitulo === capitulo).slice(0, 4)
        );
      }

      const needle = `${nome} ${capitulo}`.toLowerCase();
      setLocais(
        locaisMod.locaisBiblicos
          .filter((l) => l.referencias.some((r) => r.toLowerCase().includes(needle)))
          .slice(0, 4)
      );

      if (!cancelled) setLoading(false);
    };

    load().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [livroLower, capitulo, versiculo, nome, versosComComentario]);

  const nivel = estudo?.nivel ? NIVEL[estudo.nivel] ?? NIVEL.sintese : null;
  const trilhaCap = obterTrilhaPorLivro(livroLower);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--content-muted)] mb-3">
          <Compass className="w-4 h-4 text-[var(--brand-default)]" />
          <span className="uppercase tracking-wider font-semibold">{refLabel}</span>
          {nivel && (
            <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold', nivel.className)}>
              {nivel.label}
            </span>
          )}
        </div>
        {loading && !texto ? (
          <Skeleton className="h-16" />
        ) : texto ? (
          <p className="font-serif text-lg sm:text-xl text-[var(--content-primary)] leading-relaxed italic">
            “{texto.replace(/^[“"«]+|[”"»]+$/g, '')}”
            {!versiculo && <span className="not-italic text-sm text-[var(--content-muted)] ml-2">v. 1</span>}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2 mt-4">
          <Link
            href={hrefBiblia(livroLower, capitulo, versiculo)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:opacity-90 min-h-[44px]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Abrir na Bíblia
          </Link>
          {['mt', 'mc', 'lc', 'jo'].includes(livroLower) && (
            <Link
              href={hrefHarmonia(livroLower, capitulo)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:text-[var(--content-primary)] min-h-[44px]"
            >
              <List className="w-3.5 h-3.5" />
              Paralelos sinóticos
            </Link>
          )}
          <Link
            href={`/exegese?ref=${encodeURIComponent(refLabel)}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:text-[var(--content-primary)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Exegese
          </Link>
          {versiculo && (
            <Link
              href={`/palavras?ref=${encodeURIComponent(refLabel)}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:text-[var(--content-primary)]"
            >
              <Languages className="w-3.5 h-3.5" />
              Palavras
            </Link>
          )}
        </div>
      </section>

      <ParalelosDoCapitulo livro={livroLower} capitulo={capitulo} defaultAberto />

      {estudo && (
        <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
          <header className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]/40">
            <GraduationCap className="w-4 h-4 text-[var(--brand-default)]" />
            <h2 className="text-sm font-semibold text-[var(--content-primary)]">{estudo.titulo}</h2>
          </header>
          <div className="p-5 space-y-4">
            {estudo.contextoHistorico && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-1 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" /> Contexto
                </h3>
                <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{estudo.contextoHistorico}</p>
              </div>
            )}
            <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{estudo.resumo}</p>
            {estudo.estrutura && estudo.estrutura.length > 0 && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-2 flex items-center gap-1.5">
                  <List className="w-3.5 h-3.5" /> Estrutura
                </h3>
                <ul className="space-y-1">
                  {estudo.estrutura.map((item) => (
                    <li key={item} className="text-sm text-[var(--content-secondary)] pl-3 border-l-2 border-[var(--brand-default)]/30">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {estudo.temas.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {estudo.temas.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                    {t}
                  </span>
                ))}
              </div>
            )}
            {estudo.significadoTeologico && !compact && (
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{estudo.significadoTeologico}</p>
            )}
            {estudo.aplicacaoPratica && (
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed border-l-2 border-[var(--brand-default)]/40 pl-3">
                {estudo.aplicacaoPratica}
              </p>
            )}
            {!compact && estudo.perguntasEstudo.length > 0 && (
              <ol className="list-decimal pl-5 space-y-1">
                {estudo.perguntasEstudo.map((p) => (
                  <li key={p} className="text-sm text-[var(--content-secondary)]">{p}</li>
                ))}
              </ol>
            )}
            {trilhaCap && (
              <div className="pt-2 space-y-2">
                <Link
                  href={`/cursos/${trilhaCap.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-default)] hover:underline"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Voltar à trilha de {trilhaCap.livroNome}
                </Link>
                <RespostaCapituloTrilha trilha={trilhaCap} capitulo={capitulo} compact />
              </div>
            )}
          </div>
        </section>
      )}

      {pericopes.length > 0 && (
        <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
          <header className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]/40">
            <List className="w-4 h-4 text-[var(--brand-default)]" />
            <h2 className="text-sm font-semibold">Perícopes</h2>
          </header>
          <ul className="divide-y divide-[var(--border)]/40">
            {pericopes.map((p) => (
              <li key={p.id}>
                <Link
                  href={hrefBiblia(livroLower, p.capituloInicio, p.versiculoInicio)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--surface-sunken)]/50"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--content-muted)]" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--content-primary)] truncate">{p.titulo}</p>
                    <p className="text-[11px] text-[var(--content-muted)]">
                      {p.capituloInicio}:{p.versiculoInicio}–{p.capituloFim}:{p.versiculoFim} · {p.tema}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
        <header className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]/40">
          <MessageSquare className="w-4 h-4 text-[var(--brand-default)]" />
          <h2 className="text-sm font-semibold">Comentários</h2>
          {comentarios.length > 0 && (
            <span className="ml-auto text-[10px] tabular-nums px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">
              {comentarios.length}
            </span>
          )}
        </header>
        {loading && comentarios.length === 0 ? (
          <div className="p-5 space-y-3">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        ) : comentarios.length === 0 ? (
          <div className="px-5 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2">
              Síntese da ficha (não é citação de Henry ou JFB)
            </p>
            <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
              {estudo?.resumo
                ?? 'Não há comentário clássico de domínio público neste versículo. Use a ficha acima — ela não inventa falas de autores.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]/40">
            {comentarioProximoDe && versiculo && comentarioProximoDe !== versiculo && (
              <p className="px-5 pt-4 text-[11px] text-[var(--content-muted)]">
                Sem ficha clássica neste versículo. Comentário de domínio público em {nome} {capitulo}:{comentarioProximoDe} (mesmo capítulo).
              </p>
            )}
            {comentarios.map((c, i) => (
              <article key={`${c.autor}-${c.versiculo}-${i}`} className="p-5">
                <p className="text-xs font-semibold text-[var(--content-primary)] mb-1">
                  {c.autor}
                  <span className="font-normal text-[var(--content-muted)]">
                    {' '}· {nome} {c.capitulo}:{c.versiculo}
                    {c.fonte === 'dominio-publico' ? ' · domínio público' : c.fonte === 'resumo' ? ' · síntese rotulada' : ''}
                  </span>
                </p>
                <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{c.texto}</p>
              </article>
            ))}
          </div>
        )}
        {!versiculo && versosComComentario.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border)]/40 flex flex-wrap gap-1.5">
            {versosComComentario.slice(0, 16).map((v) => (
              <Link
                key={v}
                href={`/guia?livro=${livroLower}&capitulo=${capitulo}&versiculo=${v}`}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:text-[var(--brand-default)]"
              >
                v.{v}
              </Link>
            ))}
          </div>
        )}
      </section>

      {palavras.length > 0 && (
        <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
          <header className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]/40">
            <Languages className="w-4 h-4 text-[var(--brand-default)]" />
            <h2 className="text-sm font-semibold">Palavras originais</h2>
          </header>
          <div className="divide-y divide-[var(--border)]/40">
            {palavras.map((p) => (
              <div key={`${p.strong}-${p.palavra}`} className="px-5 py-3 flex items-start gap-3">
                <span className={cn(
                  'shrink-0 text-[10px] font-mono font-bold px-1.5 py-1 rounded-md',
                  p.idioma === 'grego'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                )}>
                  {p.strong}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--content-primary)]">
                    {p.palavra}{' '}
                    <span className="italic font-normal text-[var(--content-muted)]">/{p.transliteracao}/</span>
                  </p>
                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{ensinarPalavra(p)}</p>
                  <p className="text-[11px] text-[var(--content-muted)] mt-1">Glossário: {p.definicao}</p>
                  <Link href={`/palavras?strong=${encodeURIComponent(p.strong)}`} className="text-[11px] text-[var(--brand-default)] hover:underline">
                    Ver ocorrências
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {cadeia.length > 0 && (
        <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
          <header className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]/40">
            <Link2 className="w-4 h-4 text-[var(--brand-default)]" />
            <h2 className="text-sm font-semibold">Daqui → Cristo</h2>
          </header>
          <div className="p-3">
            <CadeiaReferencias elos={cadeia} />
            {tsk.length > cadeia.length && (
              <button
                type="button"
                onClick={() => setMostrarTsk((v) => !v)}
                className="mt-2 px-3 py-1.5 text-[11px] text-[var(--content-muted)] hover:text-[var(--brand-default)]"
              >
                {mostrarTsk ? 'Ocultar dump do TSK' : `Ver as ${tsk.length} refs do TSK`}
              </button>
            )}
            {mostrarTsk && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tsk.map((ref) => (
                  <Link
                    key={ref}
                    href={hrefFromRef(ref)}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-2 rounded-lg bg-[var(--surface-sunken)] hover:bg-[var(--brand-subtle)] text-[var(--content-secondary)] hover:text-[var(--brand-default)]"
                  >
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    <span className="truncate">{formatTsk(ref)}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {estudosTeo.length > 0 && !compact && (
        <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
          <header className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]/40">
            <GraduationCap className="w-4 h-4 text-[var(--brand-default)]" />
            <h2 className="text-sm font-semibold">Leituras teológicas</h2>
          </header>
          <div className="divide-y divide-[var(--border)]/40">
            {estudosTeo.map((e) => (
              <div key={`${e.tema}-${e.versiculo}`} className="p-5">
                <p className="text-sm font-semibold text-[var(--content-primary)] mb-1">{e.tema}</p>
                <p className="text-sm text-[var(--content-secondary)] leading-relaxed mb-3">{e.contexto}</p>
                <ul className="space-y-2">
                  {e.interpretacoes.slice(0, 3).map((i) => (
                    <li key={i.teologo} className="text-sm">
                      <span className="font-medium text-[var(--content-primary)]">{i.teologo}</span>
                      <span className="text-[var(--content-muted)]"> · {i.tradicao}</span>
                      <p className="text-[var(--content-secondary)] mt-0.5">{i.resumo}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {locais.length > 0 && (
        <section className="rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
          <header className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]/40">
            <MapPin className="w-4 h-4 text-[var(--brand-default)]" />
            <h2 className="text-sm font-semibold">Locais</h2>
          </header>
          <ul className="divide-y divide-[var(--border)]/40">
            {locais.map((l) => (
              <li key={l.id} className="px-5 py-3">
                <Link href={`/atlas?local=${encodeURIComponent(l.id)}`} className="block hover:opacity-90">
                  <p className="text-sm font-medium">{l.nome}</p>
                  <p className="text-xs text-[var(--content-muted)] line-clamp-2">{l.descricao}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
