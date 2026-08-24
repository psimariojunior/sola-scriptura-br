'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Languages, Search, X, ChevronDown, ChevronLeft, ChevronRight,
  Copy, Check, Eye, EyeOff, Layers, BookOpen, Loader2, AlertCircle,
  Columns, Maximize2, Minimize2,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS, type LivroInfo } from '@/data/biblia/livros';
import { carregarCapitulo } from '@/lib/apresentacao/versiculos';

const TRADUCOES = [
  { id: 'arc', nome: 'ARC', cor: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', descricao: 'Almeida Revista e Corrigida' },
  { id: 'ara', nome: 'ARA', cor: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', descricao: 'Almeida Revista e Atualizada' },
  { id: 'acf', nome: 'ACF', cor: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', descricao: 'Almeida Corrigida e Fiel' },
  { id: 'nvi', nome: 'NVI', cor: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', descricao: 'Nova Versão Internacional' },
  { id: 'aa', nome: 'AA', cor: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-900/20', descricao: 'Nova Almeida Atualizada' },
  { id: 'ntlh', nome: 'NTLH', cor: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', descricao: 'Nova Tradução na Linguagem de Hoje' },
  { id: 'nvt', nome: 'NVT', cor: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20', descricao: 'Nova Versão Trinitariana' },
  { id: 'kja', nome: 'KJA', cor: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20', descricao: 'King James Atualizada' },
  { id: 'nbv', nome: 'NBV', cor: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-lime-900/20', descricao: 'Nova Bíblia Viva' },
  { id: 'kjv', nome: 'KJV', cor: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', descricao: 'King James Version' },
  { id: 'web', nome: 'WEB', cor: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-900/20', descricao: 'World English Bible' },
] as const;

const TRAD_PRINCIPAIS = ['arc', 'ara', 'acf', 'nvi', 'kjv', 'web'];

const REFERENCIAS_RAPIDAS = [
  { ref: 'Jo 3:16', label: 'João 3:16' },
  { ref: 'Rm 8:28', label: 'Romanos 8:28' },
  { ref: 'Sl 23:1', label: 'Salmos 23:1' },
  { ref: 'Gn 1:1', label: 'Gênesis 1:1' },
  { ref: 'Ef 2:8', label: 'Efésios 2:8' },
  { ref: 'Fp 4:13', label: 'Filipenses 4:13' },
  { ref: 'Mt 5:3', label: 'Mateus 5:3' },
  { ref: '1 Co 13:4', label: '1 Coríntios 13:4' },
];

type ModoView = 'cards' | 'parallel';

function detectarDiferencas(textos: string[]): Set<number> {
  const differents = new Set<number>();
  if (textos.length < 2) return differents;
  for (let i = 0; i < textos.length; i++) {
    for (let j = i + 1; j < textos.length; j++) {
      if (textos[i].trim().toLowerCase() !== textos[j].trim().toLowerCase()) {
        differents.add(i);
        differents.add(j);
      }
    }
  }
  return differents;
}

const GREGOS: Record<string, { palavra: string; def: string }> = {
  'deus': { palavra: 'θεός', def: 'Deus' },
  'amor': { palavra: 'ἀγάπη', def: 'Amor' },
  'mundo': { palavra: 'κόσμος', def: 'Mundo' },
  'vida': { palavra: 'ζωή', def: 'Vida' },
  'luz': { palavra: 'φῶς', def: 'Luz' },
  'pai': { palavra: 'πατήρ', def: 'Pai' },
  'filho': { palavra: 'υἱός', def: 'Filho' },
  'espírito': { palavra: 'πνεῦμα', def: 'Espírito' },
  'verbo': { palavra: 'λόγος', def: 'Verbo/Palavra' },
  'carne': { palavra: 'σάρξ', def: 'Carne' },
  'pecado': { palavra: 'ἁμαρτία', def: 'Pecado' },
  'fé': { palavra: 'πίστις', def: 'Fé' },
  'graça': { palavra: 'χάρις', def: 'Graça' },
  'crente': { palavra: 'πιστός', def: 'Crente' },
  'igreja': { palavra: 'ἐκκλησία', def: 'Igreja' },
  'reino': { palavra: 'βασιλεία', def: 'Reino' },
  'céu': { palavra: 'οὐρανός', def: 'Céu' },
  'terra': { palavra: 'γῆ', def: 'Terra' },
  'povo': { palavra: 'λαός', def: 'Povo' },
  'lei': { palavra: 'νόμος', def: 'Lei' },
  'justo': { palavra: 'δίκαιος', def: 'Justo' },
  'santo': { palavra: 'ἅγιος', def: 'Santo' },
  'senhor': { palavra: 'κύριος', def: 'Senhor' },
  'filhos': { palavra: 'τέκνα', def: 'Filhos' },
  'homem': { palavra: 'ἄνθρωπος', def: 'Homem' },
  'mulher': { palavra: 'γυνή', def: 'Mulher' },
};

const HEBRAICOS: Record<string, { palavra: string; def: string }> = {
  'deus': { palavra: 'אֱלֹהִים', def: 'Deus' },
  'céu': { palavra: 'שָׁמַיִם', def: 'Céus' },
  'terra': { palavra: 'אֶרֶץ', def: 'Terra' },
  'homem': { palavra: 'אָדָם', def: 'Homem' },
  'mulher': { palavra: 'אִשָּׁה', def: 'Mulher' },
  'água': { palavra: 'מַיִם', def: 'Água' },
  'luz': { palavra: 'אוֹר', def: 'Luz' },
  'vida': { palavra: 'חַיִּים', def: 'Vida' },
  'morte': { palavra: 'מָוֶת', def: 'Morte' },
  'lei': { palavra: 'תּוֹרָה', def: 'Lei' },
  'rei': { palavra: 'מֶלֶךְ', def: 'Rei' },
  'senhor': { palavra: 'יְהוָה', def: 'YHWH' },
  'povo': { palavra: 'עַם', def: 'Povo' },
  'casa': { palavra: 'בַּיִת', def: 'Casa' },
  'cidade': { palavra: 'עִיר', def: 'Cidade' },
  'filho': { palavra: 'בֵּן', def: 'Filho' },
  'filha': { palavra: 'בַּת', def: 'Filha' },
  'pai': { palavra: 'אָב', def: 'Pai' },
  'montanha': { palavra: 'הַר', def: 'Montanha' },
  'rio': { palavra: 'נָהָר', def: 'Rio' },
};

function InterlinearLine({ texto, testamento }: { texto: string; testamento: 'AT' | 'NT' }) {
  const palavras = texto.split(/\s+/).slice(0, 30);
  const dict = testamento === 'NT' ? GREGOS : HEBRAICOS;

  return (
    <div className="mt-2 pt-2 border-t border-[var(--border)]/15">
      <p className="text-[10px] leading-relaxed text-[var(--content-muted)]/70 font-mono italic space-x-3">
        {palavras.map((p, i) => {
          const clean = p.replace(/[.,;:!?'"()]/g, '').toLowerCase();
          const entry = dict[clean];
          if (entry) {
            return (
              <span key={i} className="inline-block mr-2" title={`${entry.def} (${entry.palavra})`}>
                <span className="text-[#d4a853] font-semibold">{entry.palavra}</span>
                <span className="text-[var(--content-muted)]/40 mx-0.5">·</span>
                <span className="text-[var(--content-muted)]/50 text-[9px]">{entry.def}</span>
              </span>
            );
          }
          return <span key={i} className="text-[var(--content-muted)]/30">·</span>;
        })}
      </p>
    </div>
  );
}

function DifferencedText({ base, target, highlight }: { base: string; target: string; highlight: boolean }) {
  const words = useMemo(() => {
    const baseWords = base.split(/\s+/);
    const targetWords = target.split(/\s+/);
    const maxLen = Math.max(baseWords.length, targetWords.length);
    return targetWords.map((w, i) => {
      const bw = baseWords[i]?.toLowerCase().replace(/[.,;:!?'"()]/g, '') || '';
      const tw = w.toLowerCase().replace(/[.,;:!?'"()]/g, '');
      return { word: w, isDiff: bw !== tw };
    });
  }, [base, target]);

  if (!highlight) return <>{target}</>;
  return (
    <>
      {words.map((item, i) => (
        <span key={i} className={cn(item.isDiff && 'bg-amber-200/60 dark:bg-amber-500/20 rounded px-0.5 text-amber-800 dark:text-amber-200')}>
          {item.word}{' '}
        </span>
      ))}
    </>
  );
}

export default function CompararPage() {
  const { t } = useTranslation();

  const [livroIdx, setLivroIdx] = useState(0);
  const [capitulo, setCapitulo] = useState(1);
  const [versiculoInicio, setVersiculoInicio] = useState(1);
  const [versiculoFim, setVersiculoFim] = useState(10);
  const [tradsVisiveis, setTradsVisiveis] = useState<Set<string>>(
    new Set(['arc', 'nvi', 'acf'])
  );
  const [modoFoco, setModoFoco] = useState(false);
  const [modoInterlinear, setModoInterlinear] = useState(false);
  const [modoView, setModoView] = useState<ModoView>('cards');
  const [dados, setDados] = useState<Record<string, { numero: number; texto: string }[]>>({});
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [livroFiltro, setLivroFiltro] = useState('');
  const [copiado, setCopiado] = useState<string | null>(null);

  const livro: LivroInfo = TODOS_LIVROS[livroIdx];

  useEffect(() => {
    const maxVersiculos = livro.totalCapitulos > 0 ? 200 : 10;
    if (versiculoFim > maxVersiculos) setVersiculoFim(maxVersiculos);
    if (versiculoInicio > maxVersiculos) setVersiculoInicio(1);
  }, [capitulo, livro, versiculoFim, versiculoInicio]);

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const tradsAtivas = Array.from(tradsVisiveis);
      if (tradsAtivas.length === 0) {
        setErro(t('compare.selectAtLeastOne', 'Selecione ao menos uma tradução'));
        setDados({});
        return;
      }

      const resultados: Record<string, { numero: number; texto: string }[]> = {};
      await Promise.all(tradsAtivas.map(async (trad) => {
        try {
          const verses = await carregarCapitulo(livro.abreviacao, capitulo, trad);
          if (verses) {
            resultados[trad] = verses.map(v => ({ numero: v.numero, texto: v.texto }));
          }
        } catch {}
      }));

      if (Object.keys(resultados).length === 0) {
        setErro(t('compare.noData', 'Nenhum dado disponível para esta passagem'));
      }
      setDados(resultados);
    } catch {
      setErro(t('compare.loadError', 'Erro ao carregar dados. Tente novamente.'));
    } finally {
      setCarregando(false);
    }
  }, [livro.abreviacao, capitulo, tradsVisiveis, t]);

  useEffect(() => { carregarDados(); }, [carregarDados]);

  const versiculosFiltrados = useMemo(() => {
    const tradsAtivas = Array.from(tradsVisiveis);
    if (tradsAtivas.length === 0) return [];
    const maxVersos = Math.max(...tradsAtivas.map(id => (dados[id] || []).length), 0);
    const startIdx = Math.max(0, versiculoInicio - 1);
    const endIdx = Math.min(maxVersos, versiculoFim);
    const versiculos: { numero: number; traducoes: Record<string, string> }[] = [];
    for (let i = startIdx; i < endIdx; i++) {
      const num = i + 1;
      const traducoes: Record<string, string> = {};
      tradsAtivas.forEach(id => {
        const v = (dados[id] || []).find(x => x.numero === num);
        if (v) traducoes[id] = v.texto;
      });
      versiculos.push({ numero: num, traducoes });
    }
    return versiculos;
  }, [dados, versiculoInicio, versiculoFim, tradsVisiveis]);

  const tradsArray = useMemo(
    () => Array.from(tradsVisiveis).filter(id => TRADUCOES.some(t => t.id === id)),
    [tradsVisiveis]
  );

  const toggleTrad = useCallback((id: string) => {
    setTradsVisiveis(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size > 1) next.delete(id); }
      else next.add(id);
      return next;
    });
  }, []);

  const livrosFiltrados = useMemo(() => {
    const termo = livroFiltro.toLowerCase();
    if (!termo) return TODOS_LIVROS;
    return TODOS_LIVROS.filter(l => l.nome.toLowerCase().includes(termo));
  }, [livroFiltro]);

  const livrosAT = useMemo(() => livrosFiltrados.filter(l => l.testamento === 'AT'), [livrosFiltrados]);
  const livrosNT = useMemo(() => livrosFiltrados.filter(l => l.testamento === 'NT'), [livrosFiltrados]);

  const copiarTexto = useCallback((trad: string, texto: string) => {
    const ref = `${livro.nome} ${capitulo}:${versiculoInicio}`;
    navigator.clipboard.writeText(`${texto} — ${trad.toUpperCase()} ${ref}`);
    setCopiado(trad);
    setTimeout(() => setCopiado(null), 2000);
  }, [livro, capitulo, versiculoInicio]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#d4a853]/20 to-amber-500/20 flex items-center justify-center border border-[#d4a853]/20">
                <Languages className="w-8 h-8 sm:w-10 sm:h-10 text-[#d4a853]" />
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-light mb-2 text-[var(--content-primary)]">
                {t('compare.title', 'Comparar')}{' '}
                <span className="text-[#d4a853] italic">{t('compare.subtitle', 'Traduções')}</span>
              </h1>
              <p className="text-[var(--content-secondary)] max-w-md mx-auto text-sm sm:text-base">
                {t('compare.description', 'Compare passagens bíblicas lado a lado em diferentes traduções')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card rounded-2xl border border-[var(--border)]/30 p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="text-xs font-medium text-[var(--content-secondary)] mb-1.5 block">
                    {t('compare.book', 'Livro')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={livroFiltro}
                      onChange={e => setLivroFiltro(e.target.value)}
                      placeholder={t('compare.searchBook', 'Buscar livro...')}
                      className="w-full px-3 py-2 bg-[var(--surface-raised)] border border-[var(--border)]/40 rounded-lg text-sm text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-[#d4a853]/30 mb-1.5"
                    />
                    <select
                      value={livroIdx}
                      onChange={e => { setLivroIdx(Number(e.target.value)); setCapitulo(1); setVersiculoInicio(1); setVersiculoFim(10); }}
                      className="w-full px-3 py-2.5 bg-[var(--surface-raised)] border border-[var(--border)]/40 rounded-lg text-sm text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-[#d4a853]/30 appearance-none cursor-pointer"
                    >
                      {livrosAT.length > 0 && (
                        <optgroup label={t('compare.ot', 'Antigo Testamento')}>
                          {livrosAT.map(l => (
                            <option key={l.abreviacao} value={TODOS_LIVROS.indexOf(l)}>
                              {l.nome}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {livrosNT.length > 0 && (
                        <optgroup label={t('compare.nt', 'Novo Testamento')}>
                          {livrosNT.map(l => (
                            <option key={l.abreviacao} value={TODOS_LIVROS.indexOf(l)}>
                              {l.nome}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 top-[42px] w-4 h-4 text-[var(--content-muted)] pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--content-secondary)] mb-1.5 block">
                    {t('compare.chapter', 'Capítulo')}
                  </label>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setCapitulo(c => Math.max(1, c - 1))} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)]">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={livro.totalCapitulos}
                      value={capitulo}
                      onChange={e => {
                        const v = Math.max(1, Math.min(livro.totalCapitulos, Number(e.target.value) || 1));
                        setCapitulo(v);
                        setVersiculoInicio(1);
                        setVersiculoFim(10);
                      }}
                      className="w-full px-3 py-2.5 bg-[var(--surface-raised)] border border-[var(--border)]/40 rounded-lg text-sm text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-[#d4a853]/30 tabular-nums text-center"
                    />
                    <button onClick={() => setCapitulo(c => Math.min(livro.totalCapitulos, c + 1))} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)]">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--content-secondary)] mb-1.5 block">
                    {t('compare.verseRange', 'Faixa de Versículos')}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={versiculoInicio}
                      onChange={e => setVersiculoInicio(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full px-3 py-2.5 bg-[var(--surface-raised)] border border-[var(--border)]/40 rounded-lg text-sm text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-[#d4a853]/30 tabular-nums"
                    />
                    <span className="text-[var(--content-muted)] text-sm">—</span>
                    <input
                      type="number"
                      min={versiculoInicio}
                      max={200}
                      value={versiculoFim}
                      onChange={e => setVersiculoFim(Math.max(versiculoInicio, Number(e.target.value) || versiculoInicio))}
                      className="w-full px-3 py-2.5 bg-[var(--surface-raised)] border border-[var(--border)]/40 rounded-lg text-sm text-[var(--content-primary)] focus:outline-none focus:ring-2 focus:ring-[#d4a853]/30 tabular-nums"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={carregarDados}
                    disabled={carregando}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-[#d4a853] to-amber-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#d4a853]/20 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {carregando ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : t('compare.load', 'Carregar')}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {REFERENCIAS_RAPIDAS.map(r => (
                  <button
                    key={r.ref}
                    onClick={() => {
                      const parts = r.ref.split(' ');
                      const bookPart = parts[0].toLowerCase();
                      const capVer = parts[1].split(':');
                      const capNum = parseInt(capVer[0]);
                      const verNum = parseInt(capVer[1]);
                      const match = TODOS_LIVROS.findIndex(l =>
                        l.abreviacao.toLowerCase() === bookPart ||
                        l.nome.toLowerCase().startsWith(bookPart) ||
                        l.nome.toLowerCase().includes(bookPart)
                      );
                      if (match >= 0) {
                        setLivroIdx(match);
                        setCapitulo(capNum);
                        setVersiculoInicio(verNum);
                        setVersiculoFim(verNum);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[var(--border)]/50 text-[var(--content-muted)] hover:bg-[#d4a853]/10 hover:text-[#d4a853] hover:border-[#d4a853]/30 transition-all"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-medium text-[var(--content-secondary)]">
                {t('compare.traductions', 'Traduções')}:
              </span>
              {TRADUCOES.map(trad => {
                const active = tradsVisiveis.has(trad.id);
                return (
                  <button
                    key={trad.id}
                    onClick={() => toggleTrad(trad.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                      active
                        ? `${trad.bg} ${trad.cor} border-current/20`
                        : 'border-[var(--border)]/40 text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]'
                    )}
                  >
                    {active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {trad.nome}
                  </button>
                );
              })}

              <div className="h-5 w-px bg-[var(--border)]/30 mx-1 hidden sm:block" />

              <button
                onClick={() => setModoFoco(!modoFoco)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                  modoFoco
                    ? 'bg-[#d4a853]/10 text-[#d4a853] border-[#d4a853]/30'
                    : 'border-[var(--border)]/40 text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]'
                )}
              >
                <Search className="w-3 h-3" />
                {t('compare.focus', 'Foco')}
              </button>

              <button
                onClick={() => setModoInterlinear(!modoInterlinear)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                  modoInterlinear
                    ? 'bg-[#d4a853]/10 text-[#d4a853] border-[#d4a853]/30'
                    : 'border-[var(--border)]/40 text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]'
                )}
              >
                <Layers className="w-3 h-3" />
                {t('compare.interlinear', 'Interlinear')}
              </button>

              <div className="h-5 w-px bg-[var(--border)]/30 mx-1 hidden sm:block" />

              <button
                onClick={() => setModoView(modoView === 'cards' ? 'parallel' : 'cards')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                  modoView === 'parallel'
                    ? 'bg-[#d4a853]/10 text-[#d4a853] border-[#d4a853]/30'
                    : 'border-[var(--border)]/40 text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]'
                )}
              >
                {modoView === 'parallel' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                {modoView === 'cards' ? 'Paralelo' : 'Cards'}
              </button>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {carregando && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center py-16">
                <Loader2 className="w-8 h-8 text-[#d4a853] animate-spin mb-3" />
                <p className="text-sm text-[var(--content-muted)]">{t('compare.loading', 'Carregando traduções...')}</p>
              </motion.div>
            )}

            {erro && !carregando && (
              <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-center py-12">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--surface-sunken)]/30 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-[var(--content-muted)]/50" />
                </div>
                <p className="text-[var(--content-muted)] text-sm max-w-sm mx-auto">{erro}</p>
              </motion.div>
            )}

            {!carregando && !erro && versiculosFiltrados.length > 0 && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ScrollReveal>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-[#d4a853]" />
                    <h2 className="font-display text-xl sm:text-2xl font-medium text-[var(--content-primary)]">
                      {livro.nome} {capitulo}:{versiculoInicio}
                      {versiculoInicio !== versiculoFim ? `–${versiculoFim}` : ''}
                    </h2>
                    <span className="text-xs text-[var(--content-muted)] bg-[var(--surface-sunken)]/50 px-2 py-0.5 rounded-full">
                      {tradsArray.length} {tradsArray.length === 1 ? 'tradução' : 'traduções'}
                    </span>
                  </div>
                </ScrollReveal>

                {modoView === 'parallel' ? (
                  <div className="flex gap-4 overflow-x-auto">
                    {tradsArray.map(tradId => {
                      const info = TRADUCOES.find(t => t.id === tradId);
                      return (
                        <div key={tradId} className="flex-1 min-w-[280px] rounded-xl border border-[var(--border)]/30 bg-card/50 overflow-hidden">
                          <div className="px-4 py-2.5 border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/40 flex items-center justify-between">
                            <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', info?.bg, info?.cor)}>
                              {info?.nome}
                            </span>
                            <button onClick={() => copiarTexto(tradId, versiculosFiltrados.map(v => `${v.numero}. ${v.traducoes[tradId] || ''}`).join('\n'))}
                              className="p-1 rounded hover:bg-[var(--surface-sunken)] transition-colors">
                              {copiado === tradId ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-[var(--content-muted)]" />}
                            </button>
                          </div>
                          <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                            {versiculosFiltrados.map(v => (
                              <div key={v.numero} className="group flex items-start gap-2">
                                <span className="text-[10px] font-bold text-[var(--content-muted)] mt-1 w-5 text-right flex-shrink-0">
                                  {v.numero}
                                </span>
                                <p className="text-sm leading-relaxed flex-1 font-serif-body text-[var(--content-primary)]">
                                  {v.traducoes[tradId] || <span className="text-[var(--content-muted)]">...</span>}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {versiculosFiltrados.map((verso, idx) => {
                      const textos = tradsArray.map(id => verso.traducoes[id] || '').filter(Boolean);
                      const differents = modoFoco ? detectarDiferencas(textos) : new Set<number>();

                      return (
                        <motion.div
                          key={verso.numero}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="glass-card rounded-xl border border-[var(--border)]/30 overflow-hidden"
                        >
                          <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]/20 bg-[var(--surface-raised)]/40">
                            <span className="text-[#d4a853] font-bold text-sm tabular-nums">{verso.numero}</span>
                            {modoFoco && differents.size > 0 && (
                              <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded">
                                {differents.size} {t('compare.differences', 'diferenças')}
                              </span>
                            )}
                          </div>

                          <div className={cn(
                            'grid gap-px bg-[var(--border)]/10',
                            tradsArray.length <= 2 && 'grid-cols-1 sm:grid-cols-2',
                            tradsArray.length === 3 && 'grid-cols-1 sm:grid-cols-3',
                            tradsArray.length === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
                            tradsArray.length >= 5 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                          )}>
                            {tradsArray.map((tradId, tIdx) => {
                              const texto = verso.traducoes[tradId];
                              if (!texto) return null;
                              const tradInfo = TRADUCOES.find(x => x.id === tradId);
                              const isDiff = differents.has(tIdx);

                              return (
                                <div key={tradId} className={cn(
                                  'px-4 py-3 bg-[var(--bg)]',
                                  isDiff && modoFoco && 'bg-amber-50/50 dark:bg-amber-900/10 border-l-2 border-l-amber-400'
                                )}>
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', tradInfo?.bg, tradInfo?.cor)}>
                                      {tradInfo?.nome}
                                    </span>
                                    <button onClick={() => copiarTexto(tradId, texto)}
                                      className="ml-auto p-1 rounded hover:bg-[var(--surface-sunken)] transition-colors opacity-0 group-hover:opacity-100">
                                      {copiado === tradId ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-[var(--content-muted)]" />}
                                    </button>
                                  </div>
                                  <p className="font-serif-body text-sm leading-relaxed text-[var(--content-primary)]">
                                    {modoFoco && tIdx > 0 ? (
                                      <DifferencedText
                                        base={verso.traducoes[tradsArray[0]] || ''}
                                        target={texto}
                                        highlight={isDiff}
                                      />
                                    ) : (
                                      texto
                                    )}
                                  </p>
                                  {modoInterlinear && (
                                    <InterlinearLine texto={texto} testamento={livro.testamento} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-[var(--border)]/20">
                  {capitulo > 1 && (
                    <button
                      onClick={() => { setCapitulo(c => c - 1); setVersiculoInicio(1); setVersiculoFim(10); }}
                      className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full hover:bg-[var(--surface-sunken)] transition-colors text-[var(--content-primary)]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t('compare.previousChapter', 'Capítulo anterior')}
                    </button>
                  )}
                  {capitulo < livro.totalCapitulos && (
                    <button
                      onClick={() => { setCapitulo(c => c + 1); setVersiculoInicio(1); setVersiculoFim(10); }}
                      className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)]/60 rounded-full hover:bg-[var(--surface-sunken)] transition-colors text-[var(--content-primary)]"
                    >
                      {t('compare.nextChapter', 'Próximo capítulo')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {!carregando && !erro && versiculosFiltrados.length === 0 && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--surface-sunken)]/20 flex items-center justify-center">
                  <Languages className="w-7 h-7 text-[var(--content-muted)]/40" />
                </div>
                <p className="text-[var(--content-muted)] text-sm">
                  {t('compare.empty', 'Selecione um livro, capítulo e clique em Carregar')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
