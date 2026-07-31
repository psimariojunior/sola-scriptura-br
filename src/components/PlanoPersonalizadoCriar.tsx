'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, BookOpen, Menu, Trash2, Save, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';

const ALL_BOOKS: LivroInfo[] = [...LIVROS_AT, ...LIVROS_NT];

export interface DiaCustom {
  titulo: string;
  passagens: { livro: string; capitulo: number }[];
}

export interface PlanoPersonalizadoData {
  id: string;
  titulo: string;
  descricao: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  dias: DiaCustom[];
  criadoEm: string;
}

function gerarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function encodePlano(plano: PlanoPersonalizadoData): string {
  return btoa(encodeURIComponent(JSON.stringify(plano)));
}

export function decodePlano(encoded: string): PlanoPersonalizadoData | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

export function salvarPlanosCustom(planos: PlanoPersonalizadoData[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ssb_planos_custom', JSON.stringify(planos));
}

export function carregarPlanosCustom(): PlanoPersonalizadoData[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('ssb_planos_custom');
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

interface Props {
  onFechar: () => void;
  planoExistente?: PlanoPersonalizadoData | null;
  aoSalvar?: (plano: PlanoPersonalizadoData) => void;
}

export default function PlanoPersonalizadoCriar({ onFechar, planoExistente, aoSalvar }: Props) {
  const [titulo, setTitulo] = useState(planoExistente?.titulo ?? '');
  const [descricao, setDescricao] = useState(planoExistente?.descricao ?? '');
  const [nivel, setNivel] = useState<PlanoPersonalizadoData['nivel']>(planoExistente?.nivel ?? 'iniciante');
  const [dias, setDias] = useState<DiaCustom[]>(planoExistente?.dias ?? []);
  const [expandido, setExpandido] = useState<number | null>(null);

  const adicionarDia = useCallback(() => {
    setDias(prev => [...prev, { titulo: `Dia ${prev.length + 1}`, passagens: [] }]);
    setExpandido(dias.length);
  }, [dias.length]);

  const removerDia = useCallback((idx: number) => {
    setDias(prev => prev.filter((_, i) => i !== idx));
    if (expandido === idx) setExpandido(null);
  }, [expandido]);

  const atualizarDia = useCallback((idx: number, campo: Partial<DiaCustom>) => {
    setDias(prev => prev.map((d, i) => i === idx ? { ...d, ...campo } : d));
  }, []);

  const adicionarPassagem = useCallback((diaIdx: number) => {
    setDias(prev => prev.map((d, i) => i === diaIdx
      ? { ...d, passagens: [...d.passagens, { livro: 'gn', capitulo: 1 }] }
      : d
    ));
  }, []);

  const removerPassagem = useCallback((diaIdx: number, passIdx: number) => {
    setDias(prev => prev.map((d, i) => i === diaIdx
      ? { ...d, passagens: d.passagens.filter((_, j) => j !== passIdx) }
      : d
    ));
  }, []);

  const atualizarPassagem = useCallback((diaIdx: number, passIdx: number, campo: Partial<{ livro: string; capitulo: number }>) => {
    setDias(prev => prev.map((d, i) => i === diaIdx
      ? { ...d, passagens: d.passagens.map((p, j) => j === passIdx ? { ...p, ...campo } : p) }
      : d
    ));
  }, []);

  const salvar = useCallback(() => {
    if (!titulo.trim() || dias.length === 0) return;
    const plano: PlanoPersonalizadoData = {
      id: planoExistente?.id ?? gerarId(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      nivel,
      dias,
      criadoEm: planoExistente?.criadoEm ?? new Date().toISOString(),
    };
    aoSalvar?.(plano);
    onFechar();
  }, [titulo, descricao, nivel, dias, planoExistente, aoSalvar, onFechar]);

  const maxCapitulo = (abrev: string) => ALL_BOOKS.find(b => b.abreviacao === abrev)?.totalCapitulos ?? 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onFechar}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-xl"
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-lg font-semibold">
            {planoExistente ? 'Editar Plano' : 'Criar Plano Personalizado'}
          </h2>
          <button onClick={onFechar}><X className="w-5 h-5 text-muted-foreground hover:text-foreground" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Nome do Plano *</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)}
              placeholder="Ex: Estudo de Romanos em 2 semanas"
              className="w-full px-3 py-2 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:border-primary/50" />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Descrição</label>
            <input value={descricao} onChange={e => setDescricao(e.target.value)}
              placeholder="Uma breve descrição do plano"
              className="w-full px-3 py-2 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:border-primary/50" />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Nível</label>
            <div className="flex gap-2">
              {(['iniciante', 'intermediario', 'avancado'] as const).map(n => (
                <button key={n} onClick={() => setNivel(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                    nivel === n ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}>{n}</button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Dias de Leitura ({dias.length})</h3>
              <button onClick={adicionarDia}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                <Plus className="w-3 h-3" /> Dia
              </button>
            </div>

            {dias.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">
                Nenhum dia adicionado. Clique em &quot;+ Dia&quot; para começar.
              </p>
            )}

            <div className="space-y-2">
              {dias.map((dia, idx) => (
                <div key={idx} className="rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30">
                    <Menu className="w-3 h-3 text-muted-foreground" />
                    <input value={dia.titulo} onChange={e => atualizarDia(idx, { titulo: e.target.value })}
                      className="flex-1 text-xs font-medium bg-transparent focus:outline-none"
                      placeholder={`Dia ${idx + 1}`} />
                    <span className="text-[10px] text-muted-foreground">{dia.passagens.length} pass.</span>
                    <button onClick={() => setExpandido(expandido === idx ? null : idx)}>
                      {expandido === idx ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    <button onClick={() => removerDia(idx)}><Trash2 className="w-3 h-3 text-red-500" /></button>
                  </div>

                  {expandido === idx && (
                    <div className="px-3 py-2 space-y-2 bg-secondary/10">
                      {dia.passagens.map((pass, pi) => (
                        <div key={pi} className="flex items-center gap-2">
                          <select value={pass.livro} onChange={e => atualizarPassagem(idx, pi, { livro: e.target.value, capitulo: 1 })}
                            className="px-2 py-1 rounded-lg bg-secondary border border-border text-[11px] focus:outline-none focus:border-primary/50">
                            <optgroup label="Antigo Testamento">
                              {LIVROS_AT.map(b => <option key={b.abreviacao} value={b.abreviacao}>{b.nome}</option>)}
                            </optgroup>
                            <optgroup label="Novo Testamento">
                              {LIVROS_NT.map(b => <option key={b.abreviacao} value={b.abreviacao}>{b.nome}</option>)}
                            </optgroup>
                          </select>
                          <span className="text-[10px] text-muted-foreground">Cap.</span>
                          <input type="number" min={1} max={maxCapitulo(pass.livro)} value={pass.capitulo}
                            onChange={e => atualizarPassagem(idx, pi, { capitulo: Number(e.target.value) })}
                            className="w-14 px-2 py-1 rounded-lg bg-secondary border border-border text-[11px] text-center focus:outline-none focus:border-primary/50" />
                          <button onClick={() => removerPassagem(idx, pi)}>
                            <X className="w-3 h-3 text-muted-foreground hover:text-red-500" />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => adicionarPassagem(idx)}
                        className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors">
                        <Plus className="w-3 h-3" /> Adicionar passagem
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-border flex gap-2">
          <button onClick={onFechar}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary/50 transition-colors">
            Cancelar
          </button>
          <button onClick={salvar} disabled={!titulo.trim() || dias.length === 0}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> {planoExistente ? 'Salvar' : 'Criar Plano'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
