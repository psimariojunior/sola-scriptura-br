'use client';
import { useState, useMemo } from 'react';
import { USOS_NT_NOT, buscarUsosPorLivroNT, buscarUsosPorLivroAT, getEstatisticas, UsoNTnoOT } from '@/data/biblia/usoNTnoOT';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { ChevronDown, ChevronRight, ExternalLink, BookOpen, Search, Filter } from 'lucide-react';

const categorias = [
  { id: 'todos' as const, label: 'Todos', icon: '📖', color: 'bg-gold-100 text-gold-800' },
  { id: 'citacao' as const, label: 'Citações Diretas', icon: '📜', color: 'bg-blue-100 text-blue-800' },
  { id: 'alusao' as const, label: 'Alusões', icon: '💡', color: 'bg-purple-100 text-purple-800' },
  { id: 'eco' as const, label: 'Ecos', icon: '🔊', color: 'bg-green-100 text-green-800' },
  { id: 'tipologia' as const, label: 'Tipologias', icon: '🔗', color: 'bg-amber-100 text-amber-800' },
  { id: 'reelaboracao' as const, label: 'Reelaborações', icon: '🔄', color: 'bg-rose-100 text-rose-800' },
];

const confiancaColors = {
  alta: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  moderada: 'bg-amber-100 text-amber-700 border-amber-200',
  baixa: 'bg-red-100 text-red-700 border-red-200',
};

export default function UsoNTnoOTPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todos');
  const [livroFiltro, setLivroFiltro] = useState('');
  const [expandido, setExpandido] = useState<Set<string>>(new Set());
  const [busca, setBusca] = useState('');
  const [aba, setAba] = useState<'explorar' | 'por-livro' | 'por-origem'>('explorar');

  const stats = useMemo(() => getEstatisticas(), []);

  const usosFiltrados = useMemo(() => {
    let usos = categoriaFiltro === 'todos' ? USOS_NT_NOT : USOS_NT_NOT.filter(u => u.categoria === categoriaFiltro);
    if (livroFiltro) {
      usos = usos.filter(u => u.novTestamentoRef.toLowerCase().startsWith(livroFiltro.toLowerCase()) || u.antigoTestamentoRef.toLowerCase().startsWith(livroFiltro.toLowerCase()));
    }
    if (busca) {
      const b = busca.toLowerCase();
      usos = usos.filter(u =>
        u.novTestamentoRef.toLowerCase().includes(b) ||
        u.antigoTestamentoRef.toLowerCase().includes(b) ||
        u.explicacao.toLowerCase().includes(b) ||
        (u.textoCitado || '').toLowerCase().includes(b)
      );
    }
    return usos;
  }, [categoriaFiltro, livroFiltro, busca]);

  const toggleExpand = (id: string) => {
    setExpandido(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-900 dark:text-gold-100 mb-2">
            Uso do Novo Testamento no Antigo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Como os autores do NT citam, aludem, ecoam e reinterpretam o AT.
            Baseado em NETS, Matthew&apos;s Emphatic Drawl e Gundry&apos;s Use of the OT.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gold-200 dark:border-gold-700">
            <div className="text-3xl font-bold text-gold-600">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-700">
            <div className="text-3xl font-bold text-blue-600">{stats.citacoes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">📜 Citações</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-700">
            <div className="text-3xl font-bold text-purple-600">{stats.alusoes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">💡 Alusões</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center border border-green-200 dark:border-green-700">
            <div className="text-3xl font-bold text-green-600">{stats.ecos}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">🔊 Ecos</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 text-center border border-amber-200 dark:border-amber-700">
            <div className="text-3xl font-bold text-amber-600">{stats.tipologias}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">🔗 Tipologias</div>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/30 rounded-xl p-4 text-center border border-rose-200 dark:border-rose-700">
            <div className="text-3xl font-bold text-rose-600">{stats.reelaboracoes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">🔄 Reelab.</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['explorar', 'por-livro', 'por-origem'] as const).map(tab => (
            <button key={tab} onClick={() => setAba(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                aba === tab ? 'bg-gold-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gold-100 dark:hover:bg-gray-700'
              }`}>
              {tab === 'explorar' ? 'Explorar' : tab === 'por-livro' ? 'Por Livro NT' : 'Por Origem AT'}
            </button>
          ))}
        </div>

        {aba === 'explorar' && (
          <>
            {/* Busca */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar por referência, palavra-chave..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gold-200 dark:border-gold-700 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>

            {/* Filtros de categoria */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categorias.map(cat => (
                <button key={cat.id} onClick={() => setCategoriaFiltro(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    categoriaFiltro === cat.id ? `${cat.color} ring-2 ring-gold-400` : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            {/* Filtro por livro */}
            <div className="mb-6">
              <select value={livroFiltro} onChange={e => setLivroFiltro(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gold-200 dark:border-gold-700 rounded-xl">
                <option value="">Todos os livros</option>
                <optgroup label="Novo Testamento">
                  {stats.livrosNT.map(l => <option key={l} value={l}>{l}</option>)}
                </optgroup>
                <optgroup label="Antigo Testamento">
                  {stats.livrosAT.sort().map(l => <option key={l} value={l}>{l}</option>)}
                </optgroup>
              </select>
            </div>

            {/* Lista */}
            <div className="space-y-3">
              {usosFiltrados.map(u => (
                <div key={u.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 overflow-hidden">
                  <button onClick={() => toggleExpand(u.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gold-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex items-center gap-3">
                      {expandido.has(u.id) ? <ChevronDown className="w-4 h-4 text-gold-500" /> : <ChevronRight className="w-4 h-4 text-gold-500" />}
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${categorias.find(c => c.id === u.categoria)?.color}`}>
                        {categorias.find(c => c.id === u.categoria)?.icon}
                      </span>
                      <span className="font-semibold text-gold-800 dark:text-gold-200">{u.novTestamentoRef}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-semibold text-blue-700 dark:text-blue-300">{u.antigoTestamentoRef}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${confiancaColors[u.confianca]}`}>
                      {u.confianca}
                    </span>
                  </button>
                  {expandido.has(u.id) && (
                    <div className="px-4 pb-4 border-t border-gold-100 dark:border-gold-800 pt-3">
                      {u.textoCitado && (
                        <div className="bg-gold-50 dark:bg-gold-900/20 rounded-lg p-3 mb-3 border-l-4 border-gold-400 italic text-gray-700 dark:text-gray-300">
                          &ldquo;{u.textoCitado}&rdquo;
                        </div>
                      )}
                      <p className="text-gray-700 dark:text-gray-300">{u.explicacao}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {u.novTestamentoLivro}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {u.antigoTestamentoLivro}</span>
                        <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> {u.categoria}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {usosFiltrados.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Nenhum uso encontrado com esses filtros.</p>
                </div>
              )}
            </div>
          </>
        )}

        {aba === 'por-livro' && (
          <div className="space-y-6">
            {stats.livrosNT.map(livro => {
              const usos = buscarUsosPorLivroNT(livro);
              if (usos.length === 0) return null;
              return (
                <div key={livro} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-4">
                  <h3 className="text-lg font-bold text-gold-800 dark:text-gold-200 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> {livro}
                    <span className="text-sm font-normal text-gray-500">({usos.length} usos)</span>
                  </h3>
                  <div className="space-y-2">
                    {usos.map(u => (
                      <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gold-50 dark:hover:bg-gray-750">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${categorias.find(c => c.id === u.categoria)?.color}`}>
                          {u.categoria}
                        </span>
                        <span className="font-medium text-sm">{u.novTestamentoRef}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{u.antigoTestamentoRef}</span>
                        <span className="text-gray-500 text-xs flex-1 truncate">{u.explicacao.substring(0, 80)}...</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {aba === 'por-origem' && (
          <div className="space-y-6">
            {stats.livrosAT.sort().map(livro => {
              const usos = buscarUsosPorLivroAT(livro);
              if (usos.length === 0) return null;
              return (
                <div key={livro} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-4">
                  <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> {livro}
                    <span className="text-sm font-normal text-gray-500">({usos.length} citações/alusões)</span>
                  </h3>
                  <div className="space-y-2">
                    {usos.map(u => (
                      <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-750">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${categorias.find(c => c.id === u.categoria)?.color}`}>
                          {u.categoria}
                        </span>
                        <span className="font-medium text-sm text-gold-700 dark:text-gold-300">{u.antigoTestamentoRef}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{u.novTestamentoRef}</span>
                        <span className="text-gray-500 text-xs flex-1 truncate">{u.explicacao.substring(0, 80)}...</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
