'use client';

import { useState, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import {
  Search,
  BookOpen,
  MessageSquare,
  Link2,
  Languages,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MapPin,
} from 'lucide-react';

interface ReferenciaParsed {
  livro: string;
  capitulo: number;
  versiculo: number;
}

interface Comentario {
  livro: string;
  capitulo: number;
  versiculo: number;
  autor: string;
  texto: string;
  tipo: 'historico' | 'teologico' | 'gramatical' | 'cultural' | 'aplicacao' | 'escatologico';
}

interface PalavraOriginal {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  definicaoResumida?: string;
  categoria?: string;
  morphologia?: string;
  pronuncia?: string;
  frequencia?: number;
  idioma: 'grego' | 'hebraico';
}

interface LocalBiblico {
  id: string;
  nome: string;
  nomeEn: string;
  descricao: string;
  categoria: string;
  periodo: string;
  referencias: string[];
}

interface SectionState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const ABREV_MAP: Record<string, string> = {
  gn: 'gn', genesis: 'gn', gen: 'gn',
  ex: 'ex', exodo: 'ex', exodus: 'ex', éxodo: 'ex',
  lv: 'lv', levitico: 'lv', leviticus: 'lv',
  nm: 'nm', numeros: 'nm', numbers: 'nm',
  dt: 'dt', deuteronomio: 'dt', deuteronomy: 'dt',
  js: 'js', josue: 'js', joshua: 'js',
  jz: 'jz', juizes: 'js', judges: 'js',
  rt: 'rt', rute: 'rt', ruth: 'rt',
  '1sm': '1sm', '1samuel': '1sm', '1 samuel': '1sm',
  '2sm': '2sm', '2samuel': '2sm', '2 samuel': '2sm',
  '1rs': '1rs', '1reis': '1rs', '1 kings': '1rs', '1 reis': '1rs',
  '2rs': '2rs', '2reis': '2rs', '2 kings': '2rs', '2 reis': '2rs',
  '1cr': '1cr', '1cronica': '1cr', '1 cronicas': '1cr', '1 crônicas': '1cr',
  '2cr': '2cr', '2cronica': '2cr', '2 cronicas': '2cr', '2 crônicas': '2cr',
  ed: 'ed', esdras: 'ed', ezra: 'ed',
  ne: 'ne', neemias: 'ne', nehemiah: 'ne',
  et: 'et', ester: 'et', esther: 'et',
  'jo': 'jo', joao: 'jo', john: 'jo', 'são joão': 'jo',
  at: 'at', atos: 'at', acts: 'at',
  rm: 'rm', romanos: 'rm', romans: 'rm',
  '1co': '1co', '1corintios': '1co', '1 corintios': '1co', '1 coríntios': '1co',
  '2co': '2co', '2corintios': '2co', '2 corintios': '2co', '2 coríntios': '2co',
  gl: 'gl', galatas: 'gl', galatians: 'gl', gálatas: 'gl',
  ef: 'ef', efesios: 'ef', ephesians: 'ef',
  fp: 'fp', filipenses: 'fp', philippians: 'fp',
  cl: 'cl', colossenses: 'cl', colossians: 'cl',
  '1ts': '1ts', '1tessalonicenses': '1ts', '1 tessalonicenses': '1ts',
  '2ts': '2ts', '2tessalonicenses': '2ts', '2 tessalonicenses': '2ts',
  '1tm': '1tm', '1timoteo': '1tm', '1 timoteo': '1tm', '1 timothy': '1tm',
  '2tm': '2tm', '2timoteo': '2tm', '2 timoteo': '2tm', '2 timothy': '2tm',
  tt: 'tt', tito: 'tt', titus: 'tt',
  fm: 'fm', filemon: 'fm', philemon: 'fm',
  hb: 'hb', hebreus: 'hb', hebrews: 'hb',
  tg: 'tg', tiago: 'tg', james: 'tg',
  '1pe': '1pe', '1pedro': '1pe', '1 pedro': '1pe', '1 peter': '1pe',
  '2pe': '2pe', '2pedro': '2pe', '2 pedro': '2pe', '2 peter': '2pe',
  '1jo': '1jo', '1joao': '1jo', '1 joao': '1jo', '1 john': '1jo', '1 joão': '1jo',
  '2jo': '2jo', '2joao': '2jo', '2 joao': '2jo', '2 john': '2jo', '2 joão': '2jo',
  '3jo': '3jo', '3joao': '3jo', '3 joao': '3jo', '3 john': '3jo', '3 joão': '3jo',
  jd: 'jd', judas: 'jd', jude: 'jd',
  ap: 'ap', apocalipse: 'ap', revelation: 'ap',
  sl: 'sl', salmos: 'sl', psalms: 'sl', salmo: 'sl',
  pv: 'pv', proverbs: 'pv', proverbios: 'pv', provérbios: 'pv',
  ec: 'ec', ecle: 'ec', ecclesiastes: 'ec', eclesiastes: 'ec',
  is: 'is', isaias: 'is', isaiah: 'is', isaías: 'is',
  jr: 'jr', jeremias: 'jr', jeremiah: 'jr',
  dn: 'dn', daniel: 'dn',
  os: 'os', oseias: 'os', hosea: 'os',
  am: 'am', amos: 'am', amós: 'am',
  mq: 'mq', miqueias: 'mq', micah: 'mq',
  na: 'na', naum: 'na', nahum: 'na',
  hc: 'hc', habacuque: 'hc', habakkuk: 'hc',
  sf: 'sf', sofonia: 'sf', zephaniah: 'sf',
  zc: 'zc', zacarias: 'zc', zechariah: 'zc',
  ml: 'ml', malaquias: 'ml', malachi: 'ml',
  lm: 'lm', lamentacoes: 'lm', lamentations: 'lm', lamentações: 'lm',
  mt: 'mt', mateus: 'mt', matthew: 'mt',
  mc: 'mc', marcos: 'mc', mark: 'mc',
  lc: 'lc', lucas: 'lc', luke: 'lc',
  ct: 'ct', cantares: 'ct', song: 'ct',
  jl: 'jl', joel: 'jl',
  ob: 'ob', obadias: 'ob', obadiah: 'ob',
  jn: 'jn', jonah: 'jn', jonias: 'jn', jonas: 'jn',
  ag: 'ag', ageu: 'ag', haggai: 'ag',
};

const NOMES_LIVROS: Record<string, string> = {
  gn: 'Gênesis', ex: 'Êxodo', lv: 'Levítico', nm: 'Números', dt: 'Deuteronômio',
  js: 'Josué', jz: 'Juízes', rt: 'Rute', '1sm': '1 Samuel', '2sm': '2 Samuel',
  '1rs': '1 Reis', '2rs': '2 Reis', '1cr': '1 Crônicas', '2cr': '2 Crônicas',
  ed: 'Esdras', ne: 'Neemias', et: 'Ester', sl: 'Salmos', pv: 'Provérbios',
  ec: 'Eclesiastes', is: 'Isaías', jr: 'Jeremias', lm: 'Lamentações',
  dn: 'Daniel', os: 'Oseias', am: 'Amós', jon: 'Jonas', mq: 'Miqueias',
  na: 'Naum', hc: 'Habacuque', sf: 'Sofonias', zc: 'Zacarias', ml: 'Malaquias',
  mt: 'Mateus', mc: 'Marcos', lc: 'Lucas', jo: 'João', at: 'Atos',
  rm: 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios', gl: 'Gálatas',
  ef: 'Efésios', fp: 'Filipenses', cl: 'Colossenses', '1ts': '1 Tessalonicenses',
  '2ts': '2 Tessalonicenses', '1tm': '1 Timóteo', '2tm': '2 Timóteo',
  tt: 'Tito', fm: 'Filémon', hb: 'Hebreus', tg: 'Tiago', '1pe': '1 Pedro',
  '2pe': '2 Pedro', '1jo': '1 João', '2jo': '2 João', '3jo': '3 João',
  jd: 'Judas', ap: 'Apocalipse', ct: 'Cantares', jl: 'Joel', ob: 'Obadias',
  jn: 'Jonas', ag: 'Ageu',
};

const TIPO_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  historico: { label: 'Histórico', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  teologico: { label: 'Teológico', color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  gramatical: { label: 'Gramatical', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  cultural: { label: 'Cultural', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  aplicacao: { label: 'Aplicação', color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  escatologico: { label: 'Escatológico', color: 'text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
};

const REFERENCIAS_RAPIDAS = [
  { ref: 'João 3:16', label: 'Jo 3:16' },
  { ref: 'Romanos 8:28', label: 'Rm 8:28' },
  { ref: 'Salmos 23:1', label: 'Sl 23:1' },
  { ref: 'Gênesis 1:1', label: 'Gn 1:1' },
  { ref: 'Efésios 2:8', label: 'Ef 2:8' },
  { ref: 'Filipenses 4:13', label: 'Fp 4:13' },
  { ref: 'Jeremias 29:11', label: 'Jr 29:11' },
  { ref: 'Isaías 41:10', label: 'Is 41:10' },
  { ref: 'Mateus 11:28', label: 'Mt 11:28' },
  { ref: 'Provérbios 3:5', label: 'Pv 3:5' },
  { ref: 'Romanos 12:2', label: 'Rm 12:2' },
  { ref: '2 Timóteo 3:16', label: '2Tm 3:16' },
];

function parseReferencia(input: string): ReferenciaParsed | null {
  const cleaned = input.trim().replace(/\s+/g, ' ');
  const match = cleaned.match(/^(.+?)\s+(\d+):(\d+)$/i);
  if (!match) return null;

  const rawBook = match[1].trim().toLowerCase();
  const capitulo = parseInt(match[2], 10);
  const versiculo = parseInt(match[3], 10);

  if (capitulo < 1 || versiculo < 1) return null;

  const abrev = ABREV_MAP[rawBook];
  if (!abrev) return null;

  return { livro: abrev, capitulo, versiculo };
}

function formatReferencia(livro: string, cap: number, ver: number): string {
  return `${NOMES_LIVROS[livro] || livro} ${cap}:${ver}`;
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-[var(--surface-sunken)]', className)}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[var(--surface-raised)] rounded w-1/3" />
        <div className="h-3 bg-[var(--surface-raised)] rounded w-full" />
        <div className="h-3 bg-[var(--surface-raised)] rounded w-5/6" />
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--surface-sunken)] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[var(--text-muted)]" />
      </div>
      <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{title}</p>
      <p className="text-xs text-[var(--text-muted)] max-w-xs">{description}</p>
    </div>
  );
}

function getAvatarGradient(name: string): string {
  const gradients = [
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-purple-500 to-violet-600',
    'from-blue-500 to-indigo-600',
    'from-rose-500 to-pink-600',
    'from-cyan-500 to-sky-600',
  ];
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

function getInitials(name: string): string {
  return name.split(' ').filter(p => p.length > 2 || p === name.split(' ')[0]).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

export default function GuiaPassagemPage() {
  const [inputValue, setInputValue] = useState('');
  const [referencia, setReferencia] = useState<ReferenciaParsed | null>(null);

  const [comentarios, setComentarios] = useState<SectionState<Comentario[]>>({ data: null, loading: false, error: null });
  const [crossRefs, setCrossRefs] = useState<SectionState<string[]>>({ data: null, loading: false, error: null });
  const [palavras, setPalavras] = useState<SectionState<PalavraOriginal[]>>({ data: null, loading: false, error: null });
  const [versiculoTexto, setVersiculoTexto] = useState<SectionState<string>>({ data: null, loading: false, error: null });
  const [locais, setLocais] = useState<SectionState<LocalBiblico[]>>({ data: null, loading: false, error: null });

  const buscar = useCallback((refText?: string) => {
    const text = refText || inputValue;
    const parsed = parseReferencia(text);
    if (!parsed) return;
    setReferencia(parsed);
  }, [inputValue]);

  useEffect(() => {
    if (!referencia) return;

    const { livro, capitulo, versiculo } = referencia;

    setComentarios({ data: null, loading: true, error: null });
    setCrossRefs({ data: null, loading: true, error: null });
    setPalavras({ data: null, loading: true, error: null });
    setVersiculoTexto({ data: null, loading: true, error: null });
    setLocais({ data: null, loading: true, error: null });

    // 1. Comments
    import('@/data/comentarios').then(mod => {
      const result = mod.obterComentarios(livro, capitulo, versiculo);
      setComentarios({ data: result, loading: false, error: result.length === 0 ? 'Nenhum comentário disponível para este versículo.' : null });
    }).catch(() => {
      setComentarios({ data: [], loading: false, error: 'Erro ao carregar comentários.' });
    });

    // 2. Cross-references (TSK)
    import('@/data/crossReferences').then(mod => {
      const key = `${livro}:${capitulo}:${versiculo}`;
      const refs = mod.crossReferences[key] || [];
      setCrossRefs({ data: refs, loading: false, error: refs.length === 0 ? 'Nenhuma referência cruzada encontrada para este versículo.' : null });
    }).catch(() => {
      setCrossRefs({ data: [], loading: false, error: 'Erro ao carregar referências cruzadas.' });
    });

    // 3. Bible text
    import('@/data/biblia/texto/carregar').then(async mod => {
      try {
        const data = await mod.carregarTraducao('nvi');
        const versiculos = data[livro]?.[capitulo];
        if (versiculos && versiculos[versiculo - 1]) {
          setVersiculoTexto({ data: versiculos[versiculo - 1], loading: false, error: null });
        } else {
          const dataAra = await mod.carregarTraducao('ara');
          const v2 = dataAra[livro]?.[capitulo];
          if (v2 && v2[versiculo - 1]) {
            setVersiculoTexto({ data: v2[versiculo - 1], loading: false, error: null });
          } else {
            setVersiculoTexto({ data: null, loading: false, error: 'Texto não disponível.' });
          }
        }
      } catch {
        setVersiculoTexto({ data: null, loading: false, error: 'Erro ao carregar texto bíblico.' });
      }
    }).catch(() => {
      setVersiculoTexto({ data: null, loading: false, error: 'Erro ao carregar texto bíblico.' });
    });

    // 4. Strong's lexicon words
    const isNT = ['mt', 'mc', 'lc', 'jo', 'at', 'rm', '1co', '2co', 'gl', 'ef', 'fp', 'cl', '1ts', '2ts', '1tm', '2tm', 'tt', 'fm', 'hb', 'tg', '1pe', '2pe', '1jo', '2jo', '3jo', 'jd', 'ap'].includes(livro);

    if (isNT) {
      import('@/lib/lexicon-lazy').then(async mod => {
        try {
          const grego = await mod.carregarLexicoGrego();
          const refStr = `${NOMES_LIVROS[livro] || livro} ${capitulo}:${versiculo}`;
          const shortRef = `${NOMES_LIVROS[livro]?.replace(/^(1 |2 )/, '') || livro} ${capitulo}:${versiculo}`;
          const matches = grego.filter(p =>
            p.versiculos?.some(v =>
              v === refStr || v === shortRef ||
              v.includes(`${capitulo}:${versiculo}`) ||
              v.includes(`${capitulo} `) ||
              v.toLowerCase().includes((NOMES_LIVROS[livro] || '').toLowerCase().slice(0, 4))
            )
          );
          const unique = matches.slice(0, 20).map(p => ({ ...p, idioma: 'grego' as const }));
          setPalavras({ data: unique, loading: false, error: unique.length === 0 ? 'Palavras gregas não mapeadas para este versículo.' : null });
        } catch {
          setPalavras({ data: [], loading: false, error: 'Erro ao carregar léxico grego.' });
        }
      });
    } else {
      import('@/lib/lexicon-lazy').then(async mod => {
        try {
          const hebraico = await mod.carregarLexicoHebraico();
          const sample = hebraico
            .filter((p) => (p.frequencia || 0) >= 10)
            .sort((a, b) => (b.frequencia || 0) - (a.frequencia || 0))
            .slice(0, 8)
            .map((p) => ({ ...p, idioma: 'hebraico' as const }));
          setPalavras({ data: sample, loading: false, error: null });
        } catch {
          setPalavras({ data: [], loading: false, error: 'Erro ao carregar léxico hebraico.' });
        }
      });
    }

    // 5. Historical locations
    import('@/data/biblia/locais').then(mod => {
      const refStr = `${NOMES_LIVROS[livro] || livro} ${capitulo}:${versiculo}`;
      const matches = mod.locaisBiblicos.filter(l =>
        l.referencias.some(r => r.includes(`${capitulo}:${versiculo}`) || r.toLowerCase().includes(refStr.toLowerCase().slice(0, 10)))
      );
      setLocais({ data: matches, loading: false, error: matches.length === 0 ? null : null });
    }).catch(() => {
      setLocais({ data: [], loading: false, error: null });
    });

  }, [referencia]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') buscar();
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Hero / Search */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Guia de Passagem
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
              Estudo Automático de Versículos
            </h1>
            <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
              Digite uma referência bíblica e obtenha automaticamente comentários, referências cruzadas, palavras originais e contexto histórico.
            </p>
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: João 3:16, Romanos 8:28, Gn 1:1..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all text-base"
                />
              </div>
              <button
                onClick={() => buscar()}
                disabled={!inputValue.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all"
              >
                Estudar
              </button>
            </div>

            {/* Quick references */}
            <div className="flex flex-wrap gap-2 mt-4">
              {REFERENCIAS_RAPIDAS.map(r => (
                <button
                  key={r.ref}
                  onClick={() => { setInputValue(r.ref); buscar(r.ref); }}
                  className="px-2.5 py-1 rounded-lg bg-[var(--surface-sunken)] hover:bg-[var(--accent)]/10 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors border border-[var(--border)]"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Results */}
        <AnimatePresence mode="wait">
          {referencia && (
            <motion.div
              key={`${referencia.livro}-${referencia.capitulo}-${referencia.versiculo}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Verse Header */}
              <ScrollReveal delay={0.05}>
                <div className="glass-card p-6 sm:p-8 border-l-4 border-[var(--accent)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
                    <BookOpen className="w-4 h-4" />
                    <span className="uppercase tracking-wider font-medium">
                      {formatReferencia(referencia.livro, referencia.capitulo, referencia.versiculo)}
                    </span>
                  </div>
                  {versiculoTexto.loading && (
                    <div className="space-y-2">
                      <div className="h-6 bg-[var(--surface-sunken)] rounded w-3/4 animate-pulse" />
                      <div className="h-6 bg-[var(--surface-sunken)] rounded w-1/2 animate-pulse" />
                    </div>
                  )}
                  {versiculoTexto.data && (
                    <p className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] leading-relaxed italic">
                      &ldquo;{versiculoTexto.data}&rdquo;
                    </p>
                  )}
                  {versiculoTexto.error && !versiculoTexto.loading && (
                    <p className="text-[var(--text-muted)] text-sm italic">
                      Não foi possível carregar o texto deste versículo.
                    </p>
                  )}
                </div>
              </ScrollReveal>

              {/* Section: Comments */}
              <ScrollReveal delay={0.1}>
                <div className="glass-card overflow-hidden">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
                    <MessageSquare className="w-5 h-5 text-[var(--accent)]" />
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Comentários</h2>
                    {!comentarios.loading && comentarios.data && (
                      <span className="ml-auto text-xs text-[var(--text-muted)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded-full">
                        {comentarios.data.length}
                      </span>
                    )}
                  </div>

                  {comentarios.loading && (
                    <div className="p-6 space-y-4">
                      <SkeletonBlock />
                      <SkeletonBlock />
                      <SkeletonBlock />
                    </div>
                  )}

                  {!comentarios.loading && comentarios.error && (
                    <EmptyState
                      icon={MessageSquare}
                      title="Sem comentários"
                      description={comentarios.error}
                    />
                  )}

                  {!comentarios.loading && comentarios.data && comentarios.data.length > 0 && (
                    <div className="divide-y divide-[var(--border)]">
                      {comentarios.data.map((c, i) => (
                        <div key={i} className="p-5 hover:bg-[var(--surface-sunken)]/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              'w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0',
                              getAvatarGradient(c.autor)
                            )}>
                              {getInitials(c.autor)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                <span className="text-sm font-semibold text-[var(--text-primary)]">{c.autor}</span>
                                <span className={cn(
                                  'text-[10px] px-2 py-0.5 rounded-full font-medium',
                                  TIPO_LABELS[c.tipo]?.bg || 'bg-gray-100',
                                  TIPO_LABELS[c.tipo]?.color || 'text-gray-700',
                                )}>
                                  {TIPO_LABELS[c.tipo]?.label || c.tipo}
                                </span>
                              </div>
                              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                {c.texto}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Section: Cross References */}
              <ScrollReveal delay={0.15}>
                <div className="glass-card overflow-hidden">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
                    <Link2 className="w-5 h-5 text-[var(--accent)]" />
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Referências Cruzadas</h2>
                    {!crossRefs.loading && crossRefs.data && (
                      <span className="ml-auto text-xs text-[var(--text-muted)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded-full">
                        {crossRefs.data.length}
                      </span>
                    )}
                  </div>

                  {crossRefs.loading && (
                    <div className="p-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <SkeletonBlock key={i} className="h-10" />
                        ))}
                      </div>
                    </div>
                  )}

                  {!crossRefs.loading && crossRefs.error && (
                    <EmptyState
                      icon={Link2}
                      title="Sem referências cruzadas"
                      description={crossRefs.error}
                    />
                  )}

                  {!crossRefs.loading && crossRefs.data && crossRefs.data.length > 0 && (
                    <div className="p-5">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {crossRefs.data.map((ref, i) => (
                          <a
                            key={i}
                            href={`/biblia?ref=${encodeURIComponent(ref)}`}
                            className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--surface-sunken)] hover:bg-[var(--accent)]/10 border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]"
                          >
                            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="truncate font-medium">{ref}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Section: Strong's Words */}
              <ScrollReveal delay={0.2}>
                <div className="glass-card overflow-hidden">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
                    <Languages className="w-5 h-5 text-[var(--accent)]" />
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                      Palavras Originais
                    </h2>
                    {!palavras.loading && palavras.data && (
                      <span className="ml-auto text-xs text-[var(--text-muted)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded-full">
                        {palavras.data.length}
                      </span>
                    )}
                  </div>

                  {palavras.loading && (
                    <div className="p-6 space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonBlock key={i} className="h-16" />
                      ))}
                    </div>
                  )}

                  {!palavras.loading && palavras.error && (
                    <EmptyState
                      icon={Languages}
                      title="Sem palavras originais"
                      description={palavras.error}
                    />
                  )}

                  {!palavras.loading && palavras.data && palavras.data.length > 0 && (
                    <div className="divide-y divide-[var(--border)]">
                      {palavras.data.map((p, i) => (
                        <div key={i} className="p-4 hover:bg-[var(--surface-sunken)]/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <span className={cn(
                              'inline-flex items-center justify-center w-12 h-8 rounded-lg text-xs font-mono font-bold shrink-0',
                              p.idioma === 'grego'
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                            )}>
                              {p.strong}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-base font-semibold text-[var(--text-primary)]">
                                  {p.palavra}
                                </span>
                                {p.transliteracao && (
                                  <span className="text-xs text-[var(--text-muted)] italic">
                                    /{p.transliteracao}/
                                  </span>
                                )}
                                {p.pronuncia && (
                                  <span className="text-xs text-[var(--text-muted)]">
                                    [{p.pronuncia}]
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                                {p.definicao || p.definicaoResumida}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                {p.categoria && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--text-muted)]">
                                    {p.categoria}
                                  </span>
                                )}
                                {p.morphologia && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--text-muted)]">
                                    {p.morphologia}
                                  </span>
                                )}
                                {p.frequencia && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--text-muted)]">
                                    {p.frequencia}×
                                  </span>
                                )}
                                <a
                                  href={`/palavras?strong=${p.strong}`}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors"
                                >
                                  Estudar
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Section: Historical Locations */}
              {locais.data && locais.data.length > 0 && (
                <ScrollReveal delay={0.25}>
                  <div className="glass-card overflow-hidden">
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
                      <MapPin className="w-5 h-5 text-[var(--accent)]" />
                      <h2 className="text-lg font-semibold text-[var(--text-primary)]">Locais Relacionados</h2>
                    </div>
                    <div className="divide-y divide-[var(--border)]">
                      {locais.data.map((local) => (
                        <div key={local.id} className="p-5 hover:bg-[var(--surface-sunken)]/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-sm font-semibold text-[var(--text-primary)]">{local.nome}</span>
                                <span className="text-xs text-[var(--text-muted)]">({local.nomeEn})</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                                  {local.categoria}
                                </span>
                              </div>
                              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                {local.descricao}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Section: Quick Links */}
              <ScrollReveal delay={0.3}>
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-[var(--accent)]" />
                    Links Rápidos
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { href: `/biblia?livro=${referencia.livro}&cap=${referencia.capitulo}`, label: 'Abrir na Bíblia', desc: 'Leia o capítulo completo' },
                      { href: `/exegese?ref=${formatReferencia(referencia.livro, referencia.capitulo, referencia.versiculo)}`, label: 'Exegese Automática', desc: 'Análise exegetica com IA' },
                      { href: `/comparar-comentarios?ref=${formatReferencia(referencia.livro, referencia.capitulo, referencia.versiculo)}`, label: 'Comparar Comentários', desc: 'Todos os teólogos lado a lado' },
                      { href: `/palavras?ref=${formatReferencia(referencia.livro, referencia.capitulo, referencia.versiculo)}`, label: 'Estudo de Palavras', desc: 'Léxico hebraico/grego' },
                      { href: `/referencias?ref=${formatReferencia(referencia.livro, referencia.capitulo, referencia.versiculo)}`, label: 'Referências Cruzadas', desc: 'Árvore de conexões' },
                      { href: `/compartilhar/versiculo?ref=${formatReferencia(referencia.livro, referencia.capitulo, referencia.versiculo)}`, label: 'Compartilhar', desc: 'Compartilhe esta passagem' },
                    ].map(link => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--accent)]/10 border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors">
                          <ExternalLink className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                            {link.label}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">{link.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state when no search yet */}
        {!referencia && (
          <ScrollReveal delay={0.2}>
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Comece seu estudo
              </h3>
              <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
                Digite uma referência bíblica acima ou clique em uma das referências rápidas para iniciar o estudo automático.
              </p>
            </div>
          </ScrollReveal>
        )}
      </main>

      <Footer />
    </div>
  );
}
