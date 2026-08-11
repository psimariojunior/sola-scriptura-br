'use client';

import { useState, useMemo } from 'react';
import { crossReferencesMap, CrossReference, formatReference } from '@/data/biblia/crossReferences';
import { Search, Filter, ChevronDown, ChevronRight, ArrowRight, BookOpen, BarChart3, GitBranch } from 'lucide-react';

const TYPES = [
  { id: 'all' as const, label: 'Todos', color: 'bg-gold-100 text-gold-800', icon: '📖' },
  { id: 'quotation' as const, label: 'Citações', color: 'bg-blue-100 text-blue-800', icon: '📜' },
  { id: 'fulfillment' as const, label: 'Cumprimentos', color: 'bg-emerald-100 text-emerald-800', icon: '✅' },
  { id: 'typology' as const, label: 'Tipologias', color: 'bg-purple-100 text-purple-800', icon: '🔗' },
  { id: 'thematic' as const, label: 'Temáticos', color: 'bg-amber-100 text-amber-800', icon: '💡' },
  { id: 'parallel' as const, label: 'Paralelos', color: 'bg-cyan-100 text-cyan-800', icon: '⚖️' },
  { id: 'contrast' as const, label: 'Contrastes', color: 'bg-rose-100 text-rose-800', icon: '⚡' },
];

const TYPE_DESCRIPTIONS: Record<string, string> = {
  quotation: 'O autor do NT cita explicitamente o AT com fórmula de citação',
  fulfillment: 'Profecia ou tipo do AT cumprido em Cristo ou no NT',
  typology: 'Conexão tipológica entre pessoa, evento ou instituição do AT e NT',
  thematic: 'Mesmo tema ou ensino aparecendo em ambos os testamentos',
  parallel: 'Passagens paralelas que tratam do mesmo evento ou ensino',
  contrast: 'Contraste ou antítese entre duas passagens',
};

export default function ReferenciasCruzadasPage() {
  const [tipoFiltro, setTipoFiltro] = useState<string>('all');
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState<Set<string>>(new Set());
  const [aba, setAba] = useState<'explorar' | 'por-livro' | 'estatisticas'>('explorar');

  const todasRefs = useMemo(() => {
    const all: CrossReference[] = [];
    for (const key of Object.keys(crossReferencesMap)) {
      all.push(...crossReferencesMap[key]);
    }
    return all;
  }, []);

  const stats = useMemo(() => {
    const s: Record<string, number> = {};
    for (const r of todasRefs) {
      s[r.type] = (s[r.type] || 0) + 1;
    }
    return s;
  }, [todasRefs]);

  const refsFiltradas = useMemo(() => {
    let refs = tipoFiltro === 'all' ? todasRefs : todasRefs.filter(r => r.type === tipoFiltro);
    if (busca) {
      const q = busca.toLowerCase();
      refs = refs.filter(r =>
        r.from.toLowerCase().includes(q) ||
        r.to.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q)
      );
    }
    return refs;
  }, [tipoFiltro, busca, todasRefs]);

  const refsPorLivro = useMemo(() => {
    const map: Record<string, CrossReference[]> = {};
    for (const ref of todasRefs) {
      const livro = ref.from.split(/\s/)[0];
      if (!map[livro]) map[livro] = [];
      map[livro].push(ref);
    }
    return map;
  }, [todasRefs]);

  const toggleExpand = (key: string) => {
    setExpandido(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-900 dark:text-gold-100 mb-2">
            <GitBranch className="w-10 h-10 inline mr-3 text-gold-600" />
            Referências Cruzadas
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Exploração visual das conexões entre o Antigo e Novo Testamento.
            {todasRefs.length} referências classificadas em 6 tipos teológicos.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {TYPES.filter(t => t.id !== 'all').map(t => (
            <div key={t.id} className={`rounded-xl p-4 text-center border ${t.color} cursor-pointer hover:shadow-md transition-all ${
              tipoFiltro === t.id ? 'ring-2 ring-gold-400 scale-105' : ''
            }`} onClick={() => setTipoFiltro(tipoFiltro === t.id ? 'all' : t.id)}>
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className="text-2xl font-bold">{stats[t.id] || 0}</div>
              <div className="text-xs opacity-75">{t.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['explorar', 'por-livro', 'estatisticas'] as const).map(tab => (
            <button key={tab} onClick={() => setAba(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                aba === tab ? 'bg-gold-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gold-100 dark:hover:bg-gray-700'
              }`}>
              {tab === 'explorar' ? 'Explorar' : tab === 'por-livro' ? 'Por Livro' : 'Estatísticas'}
            </button>
          ))}
        </div>

        {aba === 'explorar' && (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar por referência ou descrição..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gold-200 dark:border-gold-700 rounded-xl focus:ring-2 focus:ring-gold-500" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {TYPES.map(t => (
                <button key={t.id} onClick={() => setTipoFiltro(t.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    tipoFiltro === t.id ? `${t.color} ring-2 ring-gold-400` : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mb-4">{refsFiltradas.length} referências</p>

            <div className="space-y-2">
              {refsFiltradas.slice(0, 200).map((r, i) => {
                const key = `${r.from}-${r.to}`;
                return (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 overflow-hidden">
                    <button onClick={() => toggleExpand(key)}
                      className="w-full flex items-center justify-between p-3 hover:bg-gold-50 dark:hover:bg-gray-750 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          TYPES.find(t => t.id === r.type)?.color || ''
                        }`}>
                          {TYPES.find(t => t.id === r.type)?.icon}
                        </span>
                        <span className="font-semibold text-gold-800 dark:text-gold-200 text-sm">
                          {formatReference(r.from)}
                        </span>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span className="font-semibold text-blue-700 dark:text-blue-300 text-sm">
                          {formatReference(r.to)}
                        </span>
                        {r.description && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:inline truncate max-w-md">
                            — {r.description}
                          </span>
                        )}
                      </div>
                      {expandido.has(key) ? <ChevronDown className="w-4 h-4 text-gold-500" /> : <ChevronRight className="w-4 h-4 text-gold-500" />}
                    </button>
                    {expandido.has(key) && r.description && (
                      <div className="px-4 pb-3 border-t border-gold-100 dark:border-gold-800 pt-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{r.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {TYPE_DESCRIPTIONS[r.type] || r.type}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {aba === 'por-livro' && (
          <div className="space-y-4">
            {Object.keys(refsPorLivro).sort().map(livro => (
              <div key={livro} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-4">
                <button onClick={() => toggleExpand(livro)}
                  className="w-full flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gold-800 dark:text-gold-200 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {livro}
                    <span className="text-sm font-normal text-gray-500">({refsPorLivro[livro].length} refs)</span>
                  </h3>
                  {expandido.has(livro) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandido.has(livro) && (
                  <div className="mt-3 space-y-1">
                    {refsPorLivro[livro].map((r, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gold-50 dark:hover:bg-gray-750 text-sm">
                        <span className={`px-1.5 py-0.5 rounded text-xs ${TYPES.find(t => t.id === r.type)?.color}`}>
                          {TYPES.find(t => t.id === r.type)?.icon}
                        </span>
                        <span className="font-medium text-gold-700 dark:text-gold-300">{formatReference(r.from)}</span>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span className="text-blue-600 dark:text-blue-400">{formatReference(r.to)}</span>
                        <span className="text-gray-400 text-xs flex-1 truncate">{r.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {aba === 'estatisticas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-6">
              <h3 className="text-lg font-bold text-gold-800 dark:text-gold-200 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> Distribuição por Tipo
              </h3>
              <div className="space-y-3">
                {TYPES.filter(t => t.id !== 'all').map(t => {
                  const count = stats[t.id] || 0;
                  const pct = ((count / todasRefs.length) * 100).toFixed(1);
                  return (
                    <div key={t.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{t.icon} {t.label}</span>
                        <span className="text-sm text-gray-500">{count} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${t.color.split(' ')[0]}`}
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-6">
              <h3 className="text-lg font-bold text-gold-800 dark:text-gold-200 mb-4">
                Descrição dos Tipos
              </h3>
              <div className="space-y-4">
                {TYPES.filter(t => t.id !== 'all').map(t => (
                  <div key={t.id} className={`p-3 rounded-lg ${t.color.split(' ')[0]}/10`}>
                    <h4 className="font-semibold text-sm mb-1">
                      {t.icon} {t.label} ({stats[t.id] || 0})
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {TYPE_DESCRIPTIONS[t.id]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-gold-800 dark:text-gold-200 mb-4">
                Livros com Mais Referências Cruzadas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(refsPorLivro)
                  .sort((a, b) => b[1].length - a[1].length)
                  .slice(0, 16)
                  .map(([livro, refs]) => (
                    <div key={livro} className="bg-gold-50 dark:bg-gold-900/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gold-700 dark:text-gold-300">{livro}</div>
                      <div className="text-sm text-gray-500">{refs.length} refs</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
