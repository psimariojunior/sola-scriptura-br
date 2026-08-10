'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Search, X, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { temComentario } from '@/data/comentarios-index';

interface Comentario {
  livro: string;
  capitulo: number;
  versiculo: number;
  autor: string;
  texto: string;
  tipo: 'historico' | 'teologico' | 'gramatical' | 'cultural' | 'aplicacao' | 'escatologico';
}

const TIPO_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  historico: { label: 'Histórico', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  teologico: { label: 'Teológico', color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  gramatical: { label: 'Gramatical', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  cultural: { label: 'Cultural', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  aplicacao: { label: 'Aplicação', color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  escatologico: { label: 'Escatológico', color: 'text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
};

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
};

const REFERS_RAPIDAS = [
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

function parseReferencia(input: string): { livro: string; capitulo: number; versiculo: number } | null {
  const cleaned = input.trim().replace(/\s+/g, ' ');
  const match = cleaned.match(/^(.+?)\s+(\d+):(\d+)$/i);
  if (!match) return null;

  let rawBook = match[1].trim().toLowerCase();
  const capitulo = parseInt(match[2], 10);
  const versiculo = parseInt(match[3], 10);

  if (capitulo < 1 || versiculo < 1) return null;

  const abrev = ABREV_MAP[rawBook];
  if (!abrev) return null;

  return { livro: abrev, capitulo, versiculo };
}

function formatReferencia(livro: string, cap: number, ver: number): string {
  const nomes: Record<string, string> = {
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
    jd: 'Judas', ap: 'Apocalipse',
  };
  return `${nomes[livro] || livro} ${cap}:${ver}`;
}

function getInitials(name: string): string {
  return name.split(' ').filter(p => p.length > 2 || p === name.split(' ')[0]).slice(0, 2).map(p => p[0]).join('').toUpperCase();
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

export default function ComentariosPage() {
  const [inputValue, setInputValue] = useState('');
  const [referenciaAtiva, setReferenciaAtiva] = useState<{ livro: string; capitulo: number; versiculo: number } | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [comentariosMod, setComentariosMod] = useState<{ obterComentarios: (l: string, c: number, v: number) => Comentario[] } | null>(null);

  useEffect(() => {
    import('@/data/comentarios').then(mod => {
      setComentariosMod({ obterComentarios: mod.obterComentarios });
    });
  }, []);

  const buscar = useCallback((refText?: string) => {
    const text = refText || inputValue;
    const parsed = parseReferencia(text);
    if (!parsed) {
      setErro('Referência inválida. Use o formato: Livro Capítulo:Versículo (ex: João 3:16)');
      setComentarios([]);
      setReferenciaAtiva(null);
      return;
    }

    if (!comentariosMod) {
      setErro('Carregando dados...');
      return;
    }

    const tem = temComentario(parsed.livro, parsed.capitulo, parsed.versiculo);
    if (!tem) {
      setErro(`Nenhum comentário encontrado para ${formatReferencia(parsed.livro, parsed.capitulo, parsed.versiculo)}.`);
      setComentarios([]);
      setReferenciaAtiva(parsed);
      return;
    }

    setErro(null);
    setReferenciaAtiva(parsed);
    setCarregando(true);
    setFiltroTipo(null);
    setBusca('');

    setTimeout(() => {
      const result = comentariosMod.obterComentarios(parsed.livro, parsed.capitulo, parsed.versiculo);
      setComentarios(result);
      setCarregando(false);
    }, 50);
  }, [inputValue, comentariosMod]);

  const comentariosFiltrados = useMemo(() => {
    let result = comentarios;
    if (filtroTipo) result = result.filter(c => c.tipo === filtroTipo);
    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(c => c.texto.toLowerCase().includes(termo) || c.autor.toLowerCase().includes(termo));
    }
    return result;
  }, [comentarios, filtroTipo, busca]);

  const tiposDisponiveis = useMemo(() => {
    const tipos = new Set(comentarios.map(c => c.tipo));
    return Array.from(tipos);
  }, [comentarios]);

  const autores = useMemo(() => {
    const map = new Map<string, Comentario[]>();
    comentariosFiltrados.forEach(c => {
      if (!map.has(c.autor)) map.set(c.autor, []);
      map.get(c.autor)!.push(c);
    });
    return Array.from(map.entries());
  }, [comentariosFiltrados]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-light mb-2">
                Comentários <span className="text-primary italic">Lado a Lado</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                Compare o que diferentes teólogos dizem sobre o mesmo versículo
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && buscar()}
                  placeholder="Ex: João 3:16, Gn 1:1, Romanos 8:28"
                  className="w-full pl-11 pr-24 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
                <button
                  onClick={() => buscar()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  Buscar
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 justify-center">
                {REFERS_RAPIDAS.map(r => (
                  <button
                    key={r.ref}
                    onClick={() => { setInputValue(r.ref); buscar(r.ref); }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-border/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {carregando && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-16"
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                <p className="text-sm text-muted-foreground">Carregando comentários...</p>
              </motion.div>
            )}

            {erro && !carregando && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-muted/30 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">{erro}</p>
              </motion.div>
            )}

            {!carregando && !erro && comentarios.length > 0 && referenciaAtiva && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScrollReveal>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h2 className="font-display text-xl sm:text-2xl font-medium text-primary">
                        {formatReferencia(referenciaAtiva.livro, referenciaAtiva.capitulo, referenciaAtiva.versiculo)}
                      </h2>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                        {comentarios.length} {comentarios.length === 1 ? 'comentário' : 'comentários'}
                      </span>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        placeholder="Filtrar nos comentários..."
                        className="w-full pl-9 pr-8 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {busca && (
                        <button onClick={() => setBusca('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted/50">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </ScrollReveal>

                {tiposDisponiveis.length > 1 && (
                  <ScrollReveal>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      <button
                        onClick={() => setFiltroTipo(null)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                          !filtroTipo ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted/50'
                        )}
                      >
                        Todos ({comentarios.length})
                      </button>
                      {tiposDisponiveis.map(tipo => {
                        const info = TIPO_LABELS[tipo];
                        const count = comentarios.filter(c => c.tipo === tipo).length;
                        return (
                          <button
                            key={tipo}
                            onClick={() => setFiltroTipo(filtroTipo === tipo ? null : tipo)}
                            className={cn(
                              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                              filtroTipo === tipo
                                ? `${info.bg} ${info.color} border border-current/20`
                                : 'border border-border text-muted-foreground hover:bg-muted/50'
                            )}
                          >
                            {info.label} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </ScrollReveal>
                )}

                {comentariosFiltrados.length === 0 && (
                  <div className="text-center py-10">
                    <MessageSquare className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Nenhum comentário encontrado com esses filtros.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {autores.map(([autor, comps], idx) => (
                    <ScrollReveal key={autor}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="glass-card rounded-xl border border-border/30 overflow-hidden"
                      >
                        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/20">
                          <div className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br flex-shrink-0',
                            getAvatarGradient(autor)
                          )}>
                            {getInitials(autor)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{autor}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {comps.map(c => (
                                <span
                                  key={c.tipo}
                                  className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', TIPO_LABELS[c.tipo]?.bg, TIPO_LABELS[c.tipo]?.color)}
                                >
                                  {TIPO_LABELS[c.tipo]?.label}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] text-muted-foreground flex-shrink-0">
                            {comps.length} {comps.length === 1 ? 'comentário' : 'comentários'}
                          </span>
                        </div>
                        <div className="px-5 py-4 space-y-3">
                          {comps.map((c, i) => (
                            <div key={i} className={cn('pl-3 border-l-2', i > 0 && 'mt-3 pt-3 border-t border-border/20')}
                              style={{ borderColor: c.tipo === 'historico' ? '#3b82f6' : c.tipo === 'teologico' ? '#a855f7' : c.tipo === 'gramatical' ? '#10b981' : c.tipo === 'cultural' ? '#f59e0b' : c.tipo === 'aplicacao' ? '#f43f5e' : '#06b6d4' }}
                            >
                              <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded inline-block mb-1.5', TIPO_LABELS[c.tipo]?.bg, TIPO_LABELS[c.tipo]?.color)}>
                                {TIPO_LABELS[c.tipo]?.label}
                              </span>
                              <p className="text-sm text-foreground/85 leading-relaxed">{c.texto}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            )}

            {!carregando && !erro && comentarios.length === 0 && !referenciaAtiva && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-muted/20 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-muted-foreground/40" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Digite uma referência bíblica para ver os comentários
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
