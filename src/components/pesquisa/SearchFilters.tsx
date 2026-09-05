'use client';

import { X, Filter, ChevronDown, Settings, Hash, Type, AlignLeft, Sparkles, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TRAD_SELECIONAVEIS = [
  { id: 'arc', nome: 'ARC', descricao: 'Almeida Revista e Corrigida' },
  { id: 'nvi', nome: 'NVI', descricao: 'Nova Versão Internacional' },
  { id: 'ara', nome: 'ARA', descricao: 'Almeida Revista e Atualizada' },
  { id: 'acf', nome: 'ACF', descricao: 'Almeida Corrigida Fiel' },
  { id: 'kjv', nome: 'KJV', descricao: 'King James Version' },
  { id: 'web', nome: 'WEB', descricao: 'World English Bible' },
];

const SEARCH_MODES = [
  { id: 'contains', label: 'Contém', icon: AlignLeft, description: 'Busca parcial' },
  { id: 'exact', label: 'Exato', icon: Type, description: 'Frase exata' },
  { id: 'startsWith', label: 'Começa com', icon: Hash, description: 'Início da frase' },
  { id: 'regex', label: 'Regex', icon: Settings, description: 'Padrão regular' },
  { id: 'strongs', label: "Strong's", icon: Hash, description: 'Número Strong' },
  { id: 'morphology', label: 'Morfologia', icon: Languages, description: 'Busca gramatical' },
];

const MORPHOLOGY_FILTERS = {
  tipo: {
    label: 'Tipo',
    options: ['substantivo', 'verbo', 'adjetivo', 'advérbio', 'preposição', 'conjunção', 'pronome', 'numeral', 'partícula', 'interjeição'],
  },
  tempo: {
    label: 'Tempo Verbal',
    options: ['presente', 'pretérito', 'imperfeito', 'aoristo', 'futuro', 'perfeito', 'pluperfeito'],
  },
  voz: {
    label: 'Voz',
    options: ['ativa', 'passiva', 'média', 'passiva/média'],
  },
  modo: {
    label: 'Modo',
    options: ['indicativo', 'subjuntivo', 'imperativo', 'optativo', 'infinitivo', 'particípio'],
  },
  pessoa: {
    label: 'Pessoa',
    options: ['1ª', '2ª', '3ª'],
  },
  numero: {
    label: 'Número',
    options: ['singular', 'plural'],
  },
  genero: {
    label: 'Gênero',
    options: ['masculino', 'feminino', 'neutro', 'comum'],
  },
  caso: {
    label: 'Caso',
    options: ['nominativo', 'genitivo', 'dativo', 'acusativo', 'vocativo'],
  },
};

interface SearchFiltersProps {
  searchMode: string;
  setSearchMode: (mode: string) => void;
  testamento: 'all' | 'AT' | 'NT';
  setTestamento: (t: 'all' | 'AT' | 'NT') => void;
  livroFiltro: string;
  setLivroFiltro: (l: string) => void;
  capituloFiltro: number | null;
  setCapituloFiltro: (c: number | null) => void;
  capituloDe: number | null;
  setCapituloDe: (c: number | null) => void;
  capituloAte: number | null;
  setCapituloAte: (c: number | null) => void;
  tradSel: Set<string>;
  alternarTrad: (id: string) => void;
  buscaSemantica: boolean;
  setBuscaSemantica: (v: boolean) => void;
  isExactPhrase: boolean;
  setIsExactPhrase: (v: boolean) => void;
  morphFilters: Record<string, string>;
  setMorphFilters: (f: Record<string, string>) => void;
  livrosFiltrados: Array<{ abreviacao: string; nome: string; totalCapitulos: number }>;
  selectedBook: { totalCapitulos: number } | undefined;
  hasAnyInput: boolean;
  limpar: () => void;
  mobileFilters: boolean;
  setMobileFilters: (v: boolean) => void;
}

export function SearchFilters({
  searchMode, setSearchMode,
  testamento, setTestamento,
  livroFiltro, setLivroFiltro,
  capituloFiltro, setCapituloFiltro,
  capituloDe, setCapituloDe,
  capituloAte, setCapituloAte,
  tradSel, alternarTrad,
  buscaSemantica, setBuscaSemantica,
  isExactPhrase, setIsExactPhrase,
  morphFilters, setMorphFilters,
  livrosFiltrados, selectedBook,
  hasAnyInput, limpar,
  mobileFilters, setMobileFilters,
}: SearchFiltersProps) {
  const { t } = useTranslation();

  return (
    <aside className="sola-card p-4 h-fit lg:sticky lg:top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Filter className="w-4 h-4" strokeWidth={1.5} />
          {t('pesquisa.filters')}
        </h2>
        <button
          className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileFilters(!mobileFilters)}
          aria-label={t('pesquisa.toggleFilters')}
        >
          {mobileFilters ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className={`space-y-5 ${mobileFilters ? '' : 'hidden lg:block'}`}>
        <div>
          <button
            onClick={() => setIsExactPhrase(!isExactPhrase)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-sm transition-all ${
              isExactPhrase
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span className="font-semibold">Busca por frase exata</span>
            <span className={`ml-auto w-8 h-4 rounded-full relative transition-colors ${
              isExactPhrase ? 'bg-primary' : 'bg-border'
            }`}>
              <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                isExactPhrase ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </span>
          </button>
          {isExactPhrase && (
            <p className="text-[10px] text-muted-foreground mt-1 px-1 leading-relaxed">
              Busca pela frase exata como digitada. Desative para buscar palavra por palavra.
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.searchMode')}</label>
          <div className="grid grid-cols-3 gap-1.5" role="tablist">
            {SEARCH_MODES.map((mode) => (
              <button
                key={mode.id}
                role="tab"
                aria-selected={searchMode === mode.id}
                onClick={() => setSearchMode(mode.id)}
                className={`flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-sm transition-colors ${
                  searchMode === mode.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                title={mode.description}
              >
                <mode.icon className="w-3 h-3" />
                <span className="truncate">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setBuscaSemantica(!buscaSemantica)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-sm transition-all ${
              buscaSemantica
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold">{t('pesquisa.semanticSearch')}</span>
            <span className={`ml-auto w-8 h-4 rounded-full relative transition-colors ${
              buscaSemantica ? 'bg-primary' : 'bg-border'
            }`}>
              <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                buscaSemantica ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </span>
          </button>
          {buscaSemantica && (
            <p className="text-[10px] text-muted-foreground mt-1 px-1 leading-relaxed">
              {t('pesquisa.semanticHint')}
            </p>
          )}
        </div>

        {searchMode === 'morphology' && (
          <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Languages className="w-3 h-3" />
              Filtros Morfológicos
            </p>
            {Object.entries(MORPHOLOGY_FILTERS).map(([campo, config]) => (
              <div key={campo}>
                <label className="block text-[10px] font-medium text-muted-foreground mb-1">{config.label}</label>
                <select
                  value={morphFilters[campo] || ''}
                  onChange={(e) => setMorphFilters({ ...morphFilters, [campo]: e.target.value })}
                  className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                >
                  <option value="">Todos</option>
                  {config.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
            {Object.values(morphFilters).some(v => v) && (
              <button
                onClick={() => setMorphFilters({})}
                className="w-full text-[10px] text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.translation')}</label>
          <div className="space-y-1.5">
            {TRAD_SELECIONAVEIS.map((trad) => (
              <label
                key={trad.id}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors"
              >
                <input
                  type="checkbox"
                  checked={tradSel.has(trad.id)}
                  onChange={() => alternarTrad(trad.id)}
                  className="accent-primary"
                />
                <span className="font-medium">{trad.nome}</span>
                <span className="text-xs text-muted-foreground hidden 2xl:inline">{trad.descricao}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.testament')}</label>
          <div className="flex gap-1">
            {(['all', 'AT', 'NT'] as const).map((test) => (
              <button
                key={test}
                onClick={() => { setTestamento(test); setLivroFiltro('all'); setCapituloFiltro(null); }}
                className={`flex-1 text-xs py-2 rounded-sm transition-colors ${
                  testamento === test
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {test === 'all' ? t('common.all') : test}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.book')}</label>
          <select
            value={livroFiltro}
            onChange={(e) => { setLivroFiltro(e.target.value); setCapituloFiltro(null); }}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">{t('pesquisa.allBooks')}</option>
            {livrosFiltrados.map((l) => (
              <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>
            ))}
          </select>
        </div>

        {selectedBook && (
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">{t('pesquisa.chapter')} (intervalo)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={selectedBook.totalCapitulos}
                placeholder="De"
                value={capituloDe ?? ''}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : null;
                  setCapituloDe(val);
                  setCapituloFiltro(null);
                }}
                className="flex-1 px-2 py-1.5 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-0"
              />
              <span className="text-muted-foreground text-xs">até</span>
              <input
                type="number"
                min={1}
                max={selectedBook.totalCapitulos}
                placeholder="Até"
                value={capituloAte ?? ''}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : null;
                  setCapituloAte(val);
                  setCapituloFiltro(null);
                }}
                className="flex-1 px-2 py-1.5 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-0"
              />
            </div>
            {(capituloDe !== null || capituloAte !== null) && (
              <button
                onClick={() => { setCapituloDe(null); setCapituloAte(null); }}
                className="text-[10px] text-muted-foreground hover:text-foreground mt-1 px-1"
              >
                Limpar intervalo
              </button>
            )}
          </div>
        )}

        {hasAnyInput && (
          <button
            onClick={limpar}
            className="w-full text-xs py-2 border border-border rounded-sm text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1"
          >
            <X className="w-3 h-3" />
            {t('pesquisa.clearFilters')}
          </button>
        )}
      </div>
    </aside>
  );
}
