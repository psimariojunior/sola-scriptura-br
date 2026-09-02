'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen, User, ChevronDown, ChevronUp, GraduationCap, Quote,
  Sparkles, HelpCircle, ChevronRight, List, Landmark, Languages,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { obterEstudoCapitulo } from '@/lib/estudosLoader';
import type { Comentario } from '@/data/comentarios';
import { temComentario } from '@/data/comentarios-index';
import { listarTodosEstudos, type EstudoVersiculo } from '@/data/estudosTeologicos';
import { tradicaoCores } from '@/lib/tradicaoCores';
import type { EstudoCapitulo } from '@/data/estudosCapitulo';

function rotuloCampo(nivel: EstudoCapitulo['nivel'], seSintese: string, seProfundo: string) {
  return nivel === 'sintese' ? seSintese : seProfundo;
}

interface Props {
  livro: string;
  capitulo: number;
  nomeLivro: string;
}

interface TeologoCapitulo {
  nome: string;
  periodo: string;
  tradicao: string;
  interpretacoes: EstudoVersiculo['interpretacoes'];
  comentarios: Comentario[];
  totalVersiculos: number;
}

function agruparPorTeologo(
  estudos: EstudoVersiculo[],
  comentarios: Comentario[]
): TeologoCapitulo[] {
  const mapa = new Map<string, TeologoCapitulo>();

  for (const estudo of estudos) {
    for (const interp of estudo.interpretacoes) {
      const existente = mapa.get(interp.teologo);
      if (existente) {
        existente.interpretacoes.push(interp);
      } else {
        mapa.set(interp.teologo, {
          nome: interp.teologo,
          periodo: interp.periodo,
          tradicao: interp.tradicao,
          interpretacoes: [interp],
          comentarios: [],
          totalVersiculos: 0,
        });
      }
    }
  }

  for (const c of comentarios) {
    const existente = mapa.get(c.autor);
    if (existente) {
      existente.comentarios.push(c);
    } else {
      mapa.set(c.autor, {
        nome: c.autor,
        periodo: '',
        tradicao: '',
        interpretacoes: [],
        comentarios: [c],
        totalVersiculos: 0,
      });
    }
  }

  const versiculosPorAutor = new Map<string, Set<number>>();
  for (const c of comentarios) {
    if (!versiculosPorAutor.has(c.autor)) versiculosPorAutor.set(c.autor, new Set());
    versiculosPorAutor.get(c.autor)!.add(c.versiculo);
  }
  for (const e of estudos) {
    for (const i of e.interpretacoes) {
      if (!versiculosPorAutor.has(i.teologo)) versiculosPorAutor.set(i.teologo, new Set());
      versiculosPorAutor.get(i.teologo)!.add(e.versiculo);
    }
  }

  for (const [nome, teologo] of mapa) {
    teologo.totalVersiculos = versiculosPorAutor.get(nome)?.size ?? 0;
  }

  return [...mapa.values()].sort((a, b) => b.totalVersiculos - a.totalVersiculos);
}

function BlocoTeologo({ teologo }: { teologo: TeologoCapitulo }) {
  const [expandido, setExpandido] = useState(false);
  const tradicaoCor = tradicaoCores[teologo.tradicao] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300';

  return (
    <motion.div
      layout
      className="border border-[var(--border)]/40 rounded-lg overflow-hidden hover:border-[var(--border)] transition-all"
    >
      <button
        onClick={() => setExpandido(o => !o)}
        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[var(--bg)]/50 transition-colors text-left"
      >
        <div className="w-6 h-6 rounded bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
          <User className="w-3 h-3 text-[var(--primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-semibold truncate">{teologo.nome}</span>
            {teologo.periodo && (
              <span className="text-[9px] text-[var(--muted-fg)] shrink-0">{teologo.periodo}</span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {teologo.tradicao && (
              <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${tradicaoCor}`}>
                {teologo.tradicao}
              </span>
            )}
            <span className="text-[9px] text-[var(--muted-fg)]">
              {teologo.totalVersiculos} versículo{teologo.totalVersiculos !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        {expandido
          ? <ChevronUp className="w-3 h-3 text-[var(--muted-fg)] shrink-0" />
          : <ChevronDown className="w-3 h-3 text-[var(--muted-fg)] shrink-0" />
        }
      </button>

      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 border-t border-[var(--border)]/20 space-y-2 mt-1">
              {teologo.interpretacoes.length > 0 && (
                <div className="pt-2 space-y-2">
                  {teologo.interpretacoes.map((interp, i) => (
                    <div key={i}>
                      <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                        {interp.resumo}
                      </p>
                      {interp.citacao && (
                        <div className="mt-1.5 p-2 bg-[var(--bg)]/60 rounded-lg border-l-2 border-[var(--primary)]/20">
                          <div className="flex items-start gap-1.5">
                            <Quote className="w-2.5 h-2.5 text-[var(--primary)] mt-0.5 shrink-0" />
                            <p className="text-[11px] text-[var(--fg)] italic leading-relaxed font-serif-body">
                              {interp.citacaoFonte === 'resumo' ? (
                                <><span className="text-[var(--fg-muted)] not-italic">Paráfrase: </span>{interp.citacao.replace(/[«»]/g, '')}</>
                              ) : (
                                interp.citacao
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {teologo.comentarios.length > 0 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)]">
                    Comentários
                  </p>
                  {teologo.comentarios.map((c, i) => (
                    <div key={i} className="bg-[var(--bg)]/60 rounded-lg p-2.5 border-l-2 border-[var(--primary)]/20">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] font-medium capitalize mb-1 inline-block">
                        {c.tipo}
                      </span>
                      <p className="text-[11px] text-[var(--fg)] italic leading-relaxed font-serif-body">
                        &ldquo;{c.texto}&rdquo;
                      </p>
                      <p className="text-[10px] text-[var(--muted-fg)] mt-1">
                        — {c.livro.toUpperCase()} {c.capitulo}:{c.versiculo}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PainelEstudosCapitulo({ livro, capitulo, nomeLivro }: Props) {
  const estudoCap = useMemo(
    () => obterEstudoCapitulo(livro, capitulo),
    [livro, capitulo]
  );

  const [comentariosCapitulo, setComentariosCapitulo] = useState<Comentario[]>([]);
  const [carregandoComentarios, setCarregandoComentarios] = useState(true);

  useEffect(() => {
    let cancelado = false;
    import('@/data/comentarios').then(mod => {
      if (!cancelado) {
        const todos = mod.obterTodosComentarios();
        setComentariosCapitulo(todos.filter(c => c.livro === livro && c.capitulo === capitulo));
        setCarregandoComentarios(false);
      }
    });
    return () => { cancelado = true; };
  }, [livro, capitulo]);

  const todosEstudos = useMemo(() => listarTodosEstudos(), []);
  const estudosCapitulo = useMemo(
    () => todosEstudos.filter(e => e.livro === livro && e.capitulo === capitulo),
    [todosEstudos, livro, capitulo]
  );

  const teologos = useMemo(
    () => agruparPorTeologo(estudosCapitulo, comentariosCapitulo),
    [estudosCapitulo, comentariosCapitulo]
  );

  const temConteudo = estudoCap || teologos.length > 0;

  if (!temConteudo) {
    return (
      <div className="mt-4 border-l-2 border-[var(--primary)]/30 pl-4 py-2">
        <p className="text-xs text-[var(--muted-fg)]">
          Nenhum estudo disponível para {nomeLivro} capítulo {capitulo}.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 border-l-2 border-[var(--primary)]/30 pl-4 py-2 space-y-4">
      <Link
        href={`/guia?livro=${encodeURIComponent(livro)}&capitulo=${capitulo}`}
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--primary)] hover:underline"
      >
        Abrir guia completo da passagem
        <ChevronRight className="w-3 h-3" />
      </Link>
      {/* Resumo do capítulo */}
      {estudoCap && (
        <>
          <p className="text-sm text-[var(--muted-fg)] leading-relaxed font-serif-body">
            {estudoCap.resumo}
          </p>

          {estudoCap.nivel && (
            <p className="text-[10px] uppercase tracking-wider text-[var(--primary)]/80 font-medium">
              {estudoCap.nivel === 'profundo'
                ? 'Ficha de estudo profundo'
                : estudoCap.nivel === 'sintese'
                  ? 'Síntese automática (livro + perícopes) — não é ficha profunda'
                  : 'Ficha do capítulo'}
            </p>
          )}

          {estudoCap.contextoHistorico && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center gap-1">
                <Landmark className="w-3 h-3" /> {rotuloCampo(estudoCap.nivel, 'Síntese — histórico', 'Contexto histórico')}
              </p>
              <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                {estudoCap.contextoHistorico}
              </p>
            </div>
          )}

          {estudoCap.contextoCultural && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                {rotuloCampo(estudoCap.nivel, 'Síntese — cultural', 'Contexto cultural')}
              </p>
              <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                {estudoCap.contextoCultural}
              </p>
            </div>
          )}

          {estudoCap.contextoGeografico && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                {rotuloCampo(estudoCap.nivel, 'Síntese — geográfico', 'Contexto geográfico')}
              </p>
              <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                {estudoCap.contextoGeografico}
              </p>
            </div>
          )}

          {estudoCap.notaExegetica && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                {rotuloCampo(estudoCap.nivel, 'Síntese — exegese', 'Nota exegética')}
              </p>
              <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                {estudoCap.notaExegetica}
              </p>
            </div>
          )}

          {estudoCap.notaHermeneutica && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">
                {rotuloCampo(estudoCap.nivel, 'Síntese — hermenêutica', 'Nota hermenêutica')}
              </p>
              <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                {estudoCap.notaHermeneutica}
              </p>
            </div>
          )}

          {estudoCap.estrutura && estudoCap.estrutura.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center gap-1">
                <List className="w-3 h-3" /> Estrutura
              </p>
              <ol className="space-y-1 list-decimal list-inside">
                {estudoCap.estrutura.map((item, i) => (
                  <li key={i} className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">{item}</li>
                ))}
              </ol>
            </div>
          )}

          {estudoCap.significadoTeologico && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> Teologia no cânon
              </p>
              <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                {estudoCap.significadoTeologico}
              </p>
            </div>
          )}

          {estudoCap.palavrasOriginais && estudoCap.palavrasOriginais.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center gap-1">
                <Languages className="w-3 h-3" /> Palavras originais
              </p>
              <div className="flex flex-wrap gap-1.5">
                {estudoCap.palavrasOriginais.map((p, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--primary)]/20 text-[11px] font-serif-body">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {estudoCap.temas.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {estudoCap.temas.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-medium">
                  {t}
                </span>
              ))}
            </div>
          )}

          {estudoCap.VersiculosChave.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-2 flex items-center gap-1">
                <Quote className="w-3 h-3" /> Versículos-Chave
              </p>
              <div className="space-y-2">
                {estudoCap.VersiculosChave.map((vc, i) => (
                  <div key={i} className="bg-[var(--bg)]/60 rounded-lg p-3 border-l-2 border-[var(--primary)]/20">
                    <p className="text-xs font-bold text-[var(--primary)] mb-1">{vc.referencia}</p>
                    <p className="text-xs text-[var(--fg)] italic leading-relaxed font-serif-body mb-1">&ldquo;{vc.texto}&rdquo;</p>
                    <p className="text-xs text-[var(--muted-fg)] leading-relaxed">{vc.explicacao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Aplicação Prática
            </p>
            <p className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">
              {estudoCap.aplicacaoPratica}
            </p>
          </div>

          {estudoCap.perguntasEstudo.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Perguntas de Estudo
              </p>
              <ol className="space-y-1 list-decimal list-inside">
                {estudoCap.perguntasEstudo.map((p, i) => (
                  <li key={i} className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">{p}</li>
                ))}
              </ol>
            </div>
          )}

          {estudoCap.fontes && estudoCap.fontes.length > 0 && (
            <p className="text-[10px] text-[var(--muted-fg)] leading-relaxed">
              Fontes da ficha: {estudoCap.fontes.join(' · ')}
            </p>
          )}
        </>
      )}

      {/* Visão dos Teólogos */}
      {teologos.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-2 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" /> Visão dos Teólogos ({teologos.length})
          </p>
          <div className="space-y-1.5">
            {teologos.map((t) => (
              <BlocoTeologo key={t.nome} teologo={t} />
            ))}
          </div>
        </div>
      )}

      {/* Link para guia de metodologia */}
      <Link
        href="/estudo"
        className="inline-flex items-center gap-1 text-[10px] text-[var(--primary)] hover:underline mt-2"
      >
        <BookOpen className="w-3 h-3" /> Guia completo de estudo bíblico
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
