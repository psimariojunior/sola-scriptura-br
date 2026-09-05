'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, ChevronDown, ChevronUp, Download, Copy, Share2,
  Brain, Globe, Map, Clock, Languages, Layers, Shield, Heart,
  Users, BookMarked, Sparkles, ArrowRight, Info, Loader2, X,
} from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { cn } from '@/lib/utils';

interface ExegeseDimension {
  id: string;
  nome: string;
  icon: typeof BookOpen;
  color: string;
  descricao: string;
}

const EXEGESE_DIMENSIONS: ExegeseDimension[] = [
  { id: 'textual', nome: 'Análise Textual', icon: BookOpen, color: '#f59e0b', descricao: 'Variantes textuais, apparatus crítico, manuscritos' },
  { id: 'historica', nome: 'Contexto Histórico', icon: Clock, color: '#ef4444', descricao: 'Evento histórico, data, autor, audiência' },
  { id: 'literaria', nome: 'Análise Literária', icon: Layers, color: '#8b5cf6', descricao: 'Gênero, estrutura retórica, figuras de linguagem' },
  { id: 'teologica', nome: 'Teologia Bíblica', icon: Heart, color: '#ec4899', descricao: 'Temas teológicos, teologia do autor, arco narrativo' },
  { id: 'gramatical', nome: 'Gramática', icon: Languages, color: '#06b6d4', descricao: 'Sintaxe grega/hebraica, vocábulos-chave, construção' },
  { id: 'arqueologica', nome: 'Arqueologia', icon: Map, color: '#14b8a6', descricao: 'Evidências materiais, inscrições, artefatos' },
  { id: 'geografica', nome: 'Geografia', icon: Globe, color: '#22c55e', descricao: 'Localizações, topografia, rotas, distâncias' },
  { id: 'canonica', nome: 'Canonização', icon: Shield, color: '#3b82f6', descricao: 'Canonicidade, autoridade, cânone AT/NT' },
  { id: 'pastoral', nome: 'Aplicação Pastoral', icon: Users, color: '#f97316', descricao: 'Relevância, aplicação, homilética' },
  { id: 'comparativa', nome: 'Comparativa', icon: Search, color: '#a855f7', descricao: 'Paralelos, intertextualidade, influências' },
  { id: 'contextual', nome: 'Contexto do Autor', icon: BookMarked, color: '#10b981', descricao: 'Vida do autor, ocasião, propósito literário' },
  { id: 'exegese_completa', nome: 'Exegese Completa', icon: Sparkles, color: '#D4A843', descricao: 'Síntese integrada de todas as dimensões' },
];

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

export default function ExegesePage() {
  const [selectedBook, setSelectedBook] = useState('jn');
  const [chapter, setChapter] = useState(3);
  const [verse, setVerse] = useState(16);
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [expandedDim, setExpandedDim] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [activeDim, setActiveDim] = useState<string | null>(null);

  const refLabel = `${nomeLivro(selectedBook)} ${chapter}:${verse}`;

  const toggleDimension = (id: string) => {
    setDimensions(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const selectAllDimensions = () => {
    setDimensions(EXEGESE_DIMENSIONS.map(d => d.id));
  };

  const generateExegese = useCallback(async (dimId?: string) => {
    const dimsToGenerate = dimId ? [dimId] : dimensions;
    if (dimsToGenerate.length === 0) return;

    setGenerating(true);
    setActiveDim(dimId || null);

    const dimNames = dimsToGenerate.map(id =>
      EXEGESE_DIMENSIONS.find(d => d.id === id)?.nome || id
    ).join(', ');

    const prompt = `Você é um exegeta e teólogo reformado com décadas de experiência em exegese bíblica acadêmica. Faça uma exegese COMPLETA e PROFUNDA da passagem ${refLabel}.

DIMENSÕES SOLICITADAS: ${dimNames}

INSTRUÇÕES:
- Para cada dimensão, produza um texto acadêmico de 200-400 palavras
- Use terminologia técnica apropriada (mas acessível)
- Cite fontes e teólogos quando relevante
- Inclua o texto original (grego/hebraico) quando aplicável
- Formate em markdown com tópicos e subtópicos
- Seja específico e detalhado, não genérico

FORMATO DE SAÍDA:
Para cada dimensão, produza:
## [Nome da Dimensão]
[Texto acadêmico completo]

---
[Separação entre dimensões]

Responda APENAS com o conteúdo das dimensões solicitadas, sem texto adicional.`;

    try {
      const res = await fetch('/api/ia/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: prompt }),
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
                setStreamingText(accumulated);
              } else if (json.tipo === 'erro') {
                throw new Error(json.dados?.message || 'Erro');
              }
            } catch {}
          }
        }
      }

      // Parse results by dimension
      const newResults: Record<string, string> = {};
      const sections = accumulated.split(/---/);
      for (const section of sections) {
        const match = section.match(/##\s*(.+)/);
        if (match) {
          const dimName = match[1].trim();
          const dim = EXEGESE_DIMENSIONS.find(d => d.nome === dimName);
          if (dim) {
            newResults[dim.id] = section.replace(/##\s*.+\n/, '').trim();
          }
        }
      }

      // If no structured sections found, assign to first requested dimension
      if (Object.keys(newResults).length === 0 && dimsToGenerate.length === 1) {
        newResults[dimsToGenerate[0]] = accumulated;
      } else if (Object.keys(newResults).length === 0) {
        newResults['exegese_completa'] = accumulated;
      }

      setResults(prev => ({ ...prev, ...newResults }));
    } catch (err: any) {
      console.error('[exegese]', err);
    } finally {
      setGenerating(false);
      setActiveDim(null);
      setStreamingText('');
    }
  }, [selectedBook, chapter, verse, dimensions, refLabel]);

  const filteredBooks = TODOS_LIVROS.filter(l =>
    !searchQuery || l.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.abreviacao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const content = (
    <div className="space-y-8">
      {/* Reference input */}
      <div className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--content-primary)]">Exegese Bíblica</h2>
            <p className="text-[10px] text-[var(--content-muted)]">Análise em 12 dimensões hermenêuticas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {/* Book selector */}
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-1 block">Livro</label>
            <input
              type="text"
              value={searchQuery || nomeLivro(selectedBook)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const found = TODOS_LIVROS.find(l =>
                  l.nome.toLowerCase().includes(e.target.value.toLowerCase())
                );
                if (found) setSelectedBook(found.abreviacao);
              }}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              placeholder="Buscar livro..."
            />
          </div>

          {/* Chapter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-1 block">Capítulo</label>
            <input
              type="number"
              min={1}
              value={chapter}
              onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Verse */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-1 block">Versículo</label>
            <input
              type="number"
              min={1}
              value={verse}
              onChange={(e) => setVerse(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>
        </div>

        <div className="text-center">
          <span className="text-lg font-serif-body font-bold text-[var(--brand-default)]">
            {refLabel}
          </span>
        </div>
      </div>

      {/* Dimensions selector */}
      <div className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[var(--content-primary)]">Dimensões da Análise</h3>
          <button
            onClick={selectAllDimensions}
            className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-default)] hover:opacity-80"
          >
            Selecionar Todas
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXEGESE_DIMENSIONS.map((dim) => (
            <button
              key={dim.id}
              onClick={() => toggleDimension(dim.id)}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border transition-all text-left',
                dimensions.includes(dim.id)
                  ? 'border-amber-500/30 bg-amber-500/5 shadow-sm'
                  : 'border-[var(--border)]/50 bg-[var(--surface)] hover:border-[var(--border)]'
              )}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: dim.color + '20' }}
              >
                <dim.icon className="w-4 h-4" style={{ color: dim.color }} />
              </div>
              <div className="min-w-0">
                <p className={cn(
                  'text-xs font-bold truncate',
                  dimensions.includes(dim.id) ? 'text-[var(--brand-default)]' : 'text-[var(--content-primary)]'
                )}>
                  {dim.nome}
                </p>
                <p className="text-[10px] text-[var(--content-muted)] truncate">{dim.descricao}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <div className="flex gap-3">
        <button
          onClick={() => generateExegese()}
          disabled={generating || dimensions.length === 0}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Gerando exegese...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Gerar Exegese ({dimensions.length} dimensões)
            </>
          )}
        </button>

        {Object.keys(results).length > 0 && (
          <button
            onClick={() => {
              const text = Object.entries(results).map(([id, content]) => {
                const dim = EXEGESE_DIMENSIONS.find(d => d.id === id);
                return `## ${dim?.nome || id}\n\n${content}`;
              }).join('\n\n---\n\n');
              navigator.clipboard.writeText(text);
            }}
            className="px-6 py-3 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] transition-colors flex items-center gap-2"
          >
            <Copy className="w-3.5 h-3.5" />
            Copiar
          </button>
        )}
      </div>

      {/* Streaming preview */}
      {generating && streamingText && (
        <div className="rounded-2xl bg-[var(--surface-raised)] border border-amber-500/20 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            <span className="text-xs font-bold text-amber-500">Gerando...</span>
          </div>
          <div className="text-sm text-[var(--content-secondary)] whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
            {streamingText.slice(0, 1000)}
            {streamingText.length > 1000 && '...'}
            <span className="inline-block w-0.5 h-4 bg-amber-500 animate-pulse ml-0.5" />
          </div>
        </div>
      )}

      {/* Results */}
      {Object.keys(results).length > 0 && !generating && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--content-primary)]">Resultados da Exegese</h3>

          {Object.entries(results).map(([dimId, content]) => {
            const dim = EXEGESE_DIMENSIONS.find(d => d.id === dimId);
            if (!dim) return null;
            const isExpanded = expandedDim === dimId || expandedDim === null;

            return (
              <motion.div
                key={dimId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedDim(expandedDim === dimId ? null : dimId)}
                  className="w-full flex items-center gap-3 p-5 hover:bg-[var(--surface-sunken)]/30 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: dim.color + '20' }}
                  >
                    <dim.icon className="w-5 h-5" style={{ color: dim.color }} />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-bold text-[var(--content-primary)]">{dim.nome}</h4>
                    <p className="text-[10px] text-[var(--content-muted)]">{dim.descricao}</p>
                  </div>
                  {expandedDim === dimId ? (
                    <ChevronUp className="w-4 h-4 text-[var(--content-muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--content-muted)]" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-[var(--border)]/30">
                        <div className="pt-4 text-sm text-[var(--content-secondary)] whitespace-pre-wrap leading-relaxed">
                          {content}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => generateExegese(dimId)}
                            className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-default)] hover:opacity-80"
                          >
                            Regenerar esta dimensão
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {Object.keys(results).length === 0 && !generating && (
        <div className="text-center py-16">
          <Brain className="w-16 h-16 mx-auto mb-4 text-[var(--content-muted)] opacity-20" strokeWidth={1} />
          <p className="text-lg font-display text-[var(--content-muted)] mb-2">
            Selecione as dimensões e gere a exegese
          </p>
          <p className="text-sm text-[var(--content-muted)] opacity-70">
            A IA analisará a passagem em cada dimensão hermenêutica selecionada.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <PageShell maxWidth="5xl">
      <PageHero
        icon={Brain}
        eyebrow="Exegese Bíblica"
        title="Análise em 12 Dimensões"
        subtitle="Exegese acadêmica completa com IA — textual, histórica, literária, teológica, gramatical, arqueológica, geográfica, canônica, pastoral, comparativa, contextual e síntese."
      />
      {content}
    </PageShell>
  );
}
