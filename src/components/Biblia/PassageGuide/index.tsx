'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Copy, Share2, BookOpen, ExternalLink, ChevronDown, ChevronUp, MessageSquare, Link2, Languages, GraduationCap, MapPin, History, Sparkles, Loader2, Send, Quote, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePassageGuideData } from './hooks/usePassageGuideData';
import { hrefBiblia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';

export interface PassageGuideProps {
  open: boolean;
  onClose: () => void;
  livro: string;
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
  isMobile: boolean;
}

function SectionHeader({
  title,
  icon,
  count,
  isOpen,
  accentColor,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  isOpen: boolean;
  accentColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-left group"
      aria-expanded={isOpen}
    >
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)` }}
      >
        <span style={{ color: accentColor }}>{icon}</span>
      </span>
      <span className="flex-1 font-semibold text-sm text-[var(--content-primary)]">{title}</span>
      {count !== undefined && count > 0 && (
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide"
          style={{
            backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
            color: accentColor,
          }}
        >
          {count}
        </span>
      )}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-4 h-4 text-[var(--content-muted)]" />
      </motion.span>
    </button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 px-4 pb-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-3 bg-[var(--surface-sunken)] rounded w-1/4 mb-2" />
          <div className="h-2 bg-[var(--surface-sunken)] rounded w-full mb-1" />
          <div className="h-2 bg-[var(--surface-sunken)] rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function PassageGuide({
  open,
  onClose,
  livro,
  livroNome,
  capitulo,
  versiculo,
  texto,
  traducao,
  isMobile,
}: PassageGuideProps) {
  const data = usePassageGuideData(livro, capitulo, versiculo);
  const refLabel = `${livroNome} ${capitulo}:${versiculo}`;
  const href = hrefBiblia(livro, capitulo, versiculo);

  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['texto']));
  const [expandedComment, setExpandedComment] = useState<number | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiStreaming, setAiStreaming] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${refLabel}\n${texto}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: refLabel, text: `${refLabel}\n\n${texto}` });
    }
  };

  const askAI = async () => {
    if (!aiQuery.trim() || aiStreaming) return;
    setAiStreaming(true);
    setAiResponse('');
    setAiError(null);

    try {
      const ctx = `Você é um professor de Teologia. Analise o versículo ${refLabel} ("${texto}") e responda à pergunta abaixo.\n\nPERGUNTA: ${aiQuery}\n\nResponda em portugues brasileiro com rigor academico, citando fontes e referências bíblicas.`;
      const res = await fetch('/api/ia/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: ctx }),
      });
      if (!res.ok) throw new Error('Erro ao conectar com IA');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Sem resposta');
      const decoder = new TextDecoder();
      let buf = '';
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.tipo === 'token' && json.dados?.token) {
                accumulated += json.dados.token;
                setAiResponse(accumulated);
              } else if (json.tipo === 'erro') {
                setAiError(json.dados?.message || 'Erro');
              }
            } catch {}
          }
        }
      }
    } catch (err: any) {
      setAiError(err.message || 'Erro ao conectar com IA');
    } finally {
      setAiStreaming(false);
    }
  };

  // Count total resources
  const totalResources = useMemo(() => {
    let count = 0;
    if (data.comentarios.data.length > 0) count++;
    if (data.crossRefs.data.length > 0) count++;
    if (data.estudos.data.length > 0) count++;
    if (data.locais.data.length > 0) count++;
    if (data.lexico.data.length > 0) count++;
    count += 3; // texto, contexto, IA always available
    return count;
  }, [data]);

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-[var(--border)]/50 bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-default)]/70 flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--content-primary)] leading-tight">
                {refLabel}
              </h2>
              <p className="text-[11px] text-[var(--content-muted)] mt-0.5">
                {totalResources} recursos disponíveis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[var(--surface-sunken)] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-[var(--content-muted)]" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--brand-default)] hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ler na Bíblia
          </a>
          <span className="text-[var(--content-muted)] opacity-30">|</span>
          <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors">
            <Copy className="w-3.5 h-3.5" />
            Copiar
          </button>
          <span className="text-[var(--content-muted)] opacity-30">|</span>
          <button onClick={handleShare} className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* TEXTO */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Texto Sagrado"
            icon={<BookOpen className="w-4 h-4" />}
            isOpen={openSections.has('texto')}
            accentColor="var(--brand-default)"
            onClick={() => toggleSection('texto')}
          />
          <AnimatePresence>
            {openSections.has('texto') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <div className="relative pl-4 border-l-2 border-[var(--brand-default)]/30">
                    <p className="text-lg font-serif-body leading-relaxed text-[var(--content-primary)] italic">
                      &ldquo;{texto}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--content-muted)]">
                      {traducao.toUpperCase()}
                    </span>
                    <span className="text-[var(--content-muted)] opacity-30">·</span>
                    <span className="text-[10px] text-[var(--content-muted)]">
                      {livroNome} {capitulo}:{versiculo}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* COMENTÁRIOS */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Comentários Teológicos"
            icon={<MessageSquare className="w-4 h-4" />}
            count={data.comentarios.data.length}
            isOpen={openSections.has('comentarios')}
            accentColor="#f59e0b"
            onClick={() => toggleSection('comentarios')}
          />
          <AnimatePresence>
            {openSections.has('comentarios') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {data.comentarios.loading ? (
                  <LoadingSkeleton />
                ) : data.comentarios.data.length === 0 ? (
                  <p className="px-5 pb-4 text-sm text-[var(--content-muted)] italic">
                    Nenhum comentário disponível para este versículo.
                  </p>
                ) : (
                  <div className="px-5 pb-5 space-y-3">
                    {data.comentarios.data.slice(0, 5).map((c, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-[var(--border)]/50 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-raised)] p-4 cursor-pointer hover:border-amber-500/30 transition-all group"
                        onClick={() => setExpandedComment(expandedComment === i ? null : i)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <MessageSquare className="w-3 h-3 text-amber-500" />
                          </div>
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            {c.autor || 'Comentário Anônimo'}
                          </span>
                          {c.tipo && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                              {c.tipo}
                            </span>
                          )}
                        </div>
                        <p className={cn(
                          'text-sm text-[var(--content-secondary)] leading-relaxed',
                          expandedComment !== i && 'line-clamp-3'
                        )}>
                          {c.texto}
                        </p>
                        {c.texto && c.texto.length > 120 && expandedComment !== i && (
                          <span className="text-[10px] text-amber-500 mt-2 inline-flex items-center gap-1 font-medium">
                            Ler completo <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    ))}
                    {data.comentarios.data.length > 5 && (
                      <p className="text-xs text-[var(--content-muted)] text-center py-1">
                        +{data.comentarios.data.length - 5} comentários adicionais
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ESTUDOS TEOLÓGICOS */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Estudos Teológicos"
            icon={<GraduationCap className="w-4 h-4" />}
            count={data.estudos.data.length}
            isOpen={openSections.has('estudos')}
            accentColor="#10b981"
            onClick={() => toggleSection('estudos')}
          />
          <AnimatePresence>
            {openSections.has('estudos') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {data.estudos.loading ? (
                  <LoadingSkeleton />
                ) : data.estudos.data.length === 0 ? (
                  <p className="px-5 pb-4 text-sm text-[var(--content-muted)] italic">
                    Nenhum estudo teológico disponível.
                  </p>
                ) : (
                  <div className="px-5 pb-5 space-y-4">
                    {data.estudos.data.map((estudo, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <GraduationCap className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[var(--content-primary)]">
                              {estudo.tema}
                            </h4>
                            <p className="text-xs text-[var(--content-secondary)] mt-1 leading-relaxed">
                              {estudo.contexto}
                            </p>
                          </div>
                        </div>
                        {estudo.interpretacoes?.slice(0, 3).map((interp, j) => (
                          <div
                            key={j}
                            className="ml-11 rounded-xl border-l-3 border-emerald-500 bg-gradient-to-r from-emerald-500/5 to-transparent p-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                {interp.teologo}
                              </span>
                              <span className="text-[9px] text-[var(--content-muted)]">
                                {interp.periodo}
                              </span>
                              {interp.tradicao && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                                  {interp.tradicao}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[var(--content-secondary)] leading-relaxed mb-2">
                              {interp.resumo}
                            </p>
                            {interp.citacao && (
                              <div className="flex items-start gap-2 bg-[var(--surface)]/50 rounded-lg p-3 mt-2">
                                <Quote className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                <p className="text-[11px] italic text-[var(--content-muted)] leading-relaxed">
                                  {interp.citacao}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                        {estudo.interpretacoes && estudo.interpretacoes.length > 3 && (
                          <p className="text-[10px] text-[var(--content-muted)] text-center ml-11">
                            +{estudo.interpretacoes.length - 3} interpretações adicionais
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* REFERÊNCIAS CRUZADAS */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Referências Cruzadas"
            icon={<Link2 className="w-4 h-4" />}
            count={data.crossRefs.data.length}
            isOpen={openSections.has('refs')}
            accentColor="#06b6d4"
            onClick={() => toggleSection('refs')}
          />
          <AnimatePresence>
            {openSections.has('refs') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {data.crossRefs.loading ? (
                  <LoadingSkeleton />
                ) : data.crossRefs.data.length === 0 ? (
                  <p className="px-5 pb-4 text-sm text-[var(--content-muted)] italic">
                    Nenhuma referência cruzada encontrada.
                  </p>
                ) : (
                  <div className="px-5 pb-5 space-y-2">
                    {data.crossRefs.data.slice(0, 8).map((ref, i) => {
                      const typeColors: Record<string, { bg: string; text: string; label: string }> = {
                        parallel: { bg: 'bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-400', label: 'Paralelo' },
                        fulfillment: { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', label: 'Cumprimento' },
                        quotation: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', label: 'Citação' },
                        contrast: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', label: 'Contraste' },
                        thematic: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', label: 'Temático' },
                        typology: { bg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400', label: 'Tipologia' },
                      };
                      const tc = typeColors[ref.type] || typeColors.thematic;
                      const match = ref.to.match(/^(\d?\s*\w+)\s+(\d+):(\d+)/);
                      const linkHref = match ? hrefBiblia(match[1].toLowerCase().replace(/\s+/g, ''), parseInt(match[2]), parseInt(match[3])) : '#';

                      return (
                        <Link
                          key={i}
                          href={linkHref}
                          className="flex items-center gap-3 rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-3 hover:border-cyan-500/30 hover:bg-[var(--surface-raised)] transition-all group"
                        >
                          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', tc.bg)}>
                            <Link2 className={cn('w-4 h-4', tc.text)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[var(--content-primary)] group-hover:text-cyan-500 transition-colors">
                                {ref.to}
                              </span>
                              <span className={cn('text-[9px] px-1.5 py-0.5 rounded-full font-medium', tc.bg, tc.text)}>
                                {tc.label}
                              </span>
                            </div>
                            {ref.description && (
                              <p className="text-[11px] text-[var(--content-muted)] mt-0.5 truncate">
                                {ref.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                    {data.crossRefs.data.length > 8 && (
                      <p className="text-xs text-[var(--content-muted)] text-center py-1">
                        +{data.crossRefs.data.length - 8} referências adicionais
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LÉXICO */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Léxico Original"
            icon={<Languages className="w-4 h-4" />}
            count={data.lexico.data.length}
            isOpen={openSections.has('lexico')}
            accentColor="#8b5cf6"
            onClick={() => { toggleSection('lexico'); data.loadLexico(); }}
          />
          <AnimatePresence>
            {openSections.has('lexico') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {data.lexico.loading ? (
                  <LoadingSkeleton />
                ) : data.lexico.data.length === 0 ? (
                  <p className="px-5 pb-4 text-sm text-[var(--content-muted)] italic">
                    Carregue o léxico expandindo esta seção.
                  </p>
                ) : (
                  <div className="px-5 pb-5 space-y-2">
                    {data.lexico.data.map((p, i) => (
                      <Link
                        key={i}
                        href={`/idiomas?strong=${p.strong}`}
                        className="flex items-center gap-3 rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-3 hover:border-violet-500/30 hover:bg-[var(--surface-raised)] transition-all group"
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm',
                          p.idioma === 'hebraico' ? 'bg-amber-500/10 text-amber-600' : 'bg-violet-500/10 text-violet-600'
                        )}>
                          {p.idioma === 'hebraico' ? 'עב' : 'ελ'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[var(--content-primary)] group-hover:text-violet-500 transition-colors">
                              {p.palavra}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--content-muted)]">
                              {p.strong}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--content-muted)] mt-0.5 truncate">
                            {p.definicao}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MAPA */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Geografia Bíblica"
            icon={<MapPin className="w-4 h-4" />}
            count={data.locais.data.length}
            isOpen={openSections.has('mapa')}
            accentColor="#f97316"
            onClick={() => { toggleSection('mapa'); data.loadLocais(); }}
          />
          <AnimatePresence>
            {openSections.has('mapa') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {data.locais.loading ? (
                  <LoadingSkeleton />
                ) : data.locais.data.length === 0 ? (
                  <p className="px-5 pb-4 text-sm text-[var(--content-muted)] italic">
                    Nenhum local geográfico associado a este versículo.
                  </p>
                ) : (
                  <div className="px-5 pb-5 space-y-2">
                    {data.locais.data.map((local, i) => {
                      const catIcons: Record<string, string> = {
                        cidade: '🏙️', regiao: '🗺️', monte: '⛰️', mar: '🌊', rio: '🏞️',
                        deserto: '🏜️', estrutura: '🏛️', vale: '🌿', batalha: '⚔️',
                      };
                      return (
                        <Link
                          key={i}
                          href={`/atlas?local=${local.id}`}
                          className="flex items-center gap-3 rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-3 hover:border-orange-500/30 hover:bg-[var(--surface-raised)] transition-all group"
                        >
                          <span className="text-xl">{catIcons[local.categoria] || '📍'}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[var(--content-primary)] group-hover:text-orange-500 transition-colors">
                                {local.nome}
                              </span>
                              {local.nomeHebraico && (
                                <span className="text-[10px] text-[var(--content-muted)] font-hebrew">
                                  {local.nomeHebraico}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[var(--content-muted)] mt-0.5 line-clamp-2">
                              {local.descricao}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                    <Link
                      href={`/atlas?livro=${livro}&cap=${capitulo}&ver=${versiculo}`}
                      className="flex items-center justify-center gap-2 text-xs font-medium text-orange-500 hover:text-orange-600 py-2"
                    >
                      Ver no Atlas Bíblico <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CONTEXTO HISTÓRICO */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Contexto Histórico"
            icon={<History className="w-4 h-4" />}
            isOpen={openSections.has('contexto')}
            accentColor="#6366f1"
            onClick={() => toggleSection('contexto')}
          />
          <AnimatePresence>
            {openSections.has('contexto') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <div className="rounded-xl bg-gradient-to-br from-indigo-500/5 to-transparent border border-indigo-500/10 p-4">
                    <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
                      O livro de <strong>{livroNome}</strong>, capítulo <strong>{capitulo}</strong>,
                      faz parte do cânone bíblico e carrega significado teológico profundo.
                      Para uma análise completa do contexto histórico, cultural e literário,
                      consulte o painel de estudo detalhado.
                    </p>
                    <Link
                      href={`/historia?livro=${livro}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-500 hover:text-indigo-600 mt-3"
                    >
                      Ver contexto completo <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* IA */}
        <div className="border-b border-[var(--border)]/30">
          <SectionHeader
            title="Estudar com IA"
            icon={<Sparkles className="w-4 h-4" />}
            isOpen={openSections.has('ia')}
            accentColor="#d946ef"
            onClick={() => toggleSection('ia')}
          />
          <AnimatePresence>
            {openSections.has('ia') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && askAI()}
                      placeholder="Ex: Qual o significado original? Como se aplica hoje?"
                      className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all"
                      disabled={aiStreaming}
                    />
                    <button
                      onClick={askAI}
                      disabled={!aiQuery.trim() || aiStreaming}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-purple-500/20"
                    >
                      {aiStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                  {aiError && (
                    <p className="text-xs text-red-500 bg-red-500/10 rounded-lg p-2">{aiError}</p>
                  )}
                  {aiResponse && (
                    <div className="rounded-xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                          Resposta da IA
                        </span>
                      </div>
                      <div className="text-sm text-[var(--content-secondary)] whitespace-pre-wrap leading-relaxed">
                        {aiResponse}
                        {aiStreaming && <span className="inline-block w-0.5 h-4 bg-purple-500 animate-pulse ml-0.5" />}
                      </div>
                    </div>
                  )}
                  {!aiResponse && !aiStreaming && !aiError && (
                    <div className="grid grid-cols-2 gap-2">
                      {['Qual o contexto histórico?', 'Como se aplica hoje?', 'Quais as doutrinas?', 'Versículos relacionados'].map((q) => (
                        <button
                          key={q}
                          onClick={() => { setAiQuery(q); }}
                          className="text-[11px] text-left p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all text-[var(--content-muted)]"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              role="dialog"
              aria-label={`Guia da passagem: ${refLabel}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed bottom-0 left-0 right-0 z-50',
                'bg-[var(--surface-raised)] rounded-t-3xl shadow-2xl',
                'flex flex-col max-h-[90vh] min-h-[250px]'
              )}
            >
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-12 h-1.5 rounded-full bg-[var(--content-muted)] opacity-20" />
              </div>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-label={`Guia da passagem: ${refLabel}`}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed top-0 right-0 bottom-0 z-50',
              'bg-[var(--surface-raised)] shadow-2xl border-l border-[var(--border)]/50',
              'w-full sm:w-[400px] lg:w-[440px]'
            )}
          >
            {content}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
