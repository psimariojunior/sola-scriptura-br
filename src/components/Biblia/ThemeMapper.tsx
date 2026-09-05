'use client';

import { useState, useMemo } from 'react';
import { X, Search, BookOpen, ArrowRight, Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { hrefBiblia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';

interface ThemeMapperProps {
  open: boolean;
  onClose: () => void;
}

interface Theme {
  id: string;
  nome: string;
  cor: string;
  icone: string;
  descricao: string;
  versiculos: { livro: string; capitulo: number; versiculo: number; texto: string; contexto: string }[];
}

const THEOLOGICAL_THEMES: Theme[] = [
  {
    id: 'graça',
    nome: 'Graça',
    cor: '#10b981',
    icone: '🌊',
    descricao: 'A graça de Deus como fundamento da salvação',
    versiculos: [
      { livro: 'ef', capitulo: 2, versiculo: 8, texto: 'Porque pela graça sois salvos, por meio da fé.', contexto: 'Paulo ensina que a salvação é dom de Deus, não mérito humano' },
      { livro: 'rm', capitulo: 3, versiculo: 24, texto: 'Sendo justificados gratuitamente pela sua graça.', contexto: 'A justificação pela graça é central na teologia paulina' },
      { livro: 'rm', capitulo: 5, versiculo: 8, texto: 'Mas Deus prova o seu amor para conosco.', contexto: 'O amor de Deus se manifesta na cruz de Cristo' },
      { livro: 'jn', capitulo: 1, versiculo: 14, texto: 'E o Verbo se fez carne, e habitou entre nós.', contexto: 'A encarnação é o maior ato de graça' },
      { livro: 'ti', capitulo: 3, versiculo: 7, texto: 'Para que, justificados pela sua graça, sejamos herdeiros.', contexto: 'A graça nos torna herdeiros da vida eterna' },
    ],
  },
  {
    id: 'justiça',
    nome: 'Justiça',
    cor: '#f59e0b',
    icone: '⚖️',
    descricao: 'A justiça divina e a justificação do crente',
    versiculos: [
      { livro: 'rm', capitulo: 3, versiculo: 26, texto: 'Para demonstrar a sua justiça neste tempo.', contexto: 'Deus é justo e justificador dos que creem' },
      { livro: 'rm', capitulo: 5, versiculo: 1, texto: 'Sendo, pois, justificados pela fé, temos paz.', contexto: 'A justificação traz paz com Deus' },
      { livro: '2co', capitulo: 5, versiculo: 21, texto: 'Aquele que não conheceu pecado.', contexto: 'Cristo se fez pecado por nós para nos tornar justiça' },
      { livro: 'gl', capitulo: 3, versiculo: 11, texto: 'Pela fé vive o homem.', contexto: 'A justiça de Deus se revela no evangelho' },
    ],
  },
  {
    id: 'aliança',
    nome: 'Aliança',
    cor: '#8b5cf6',
    icone: '🤝',
    descricao: 'O pacto de Deus com a humanidade ao longo da história',
    versiculos: [
      { livro: 'gn', capitulo: 9, versiculo: 9, texto: 'Mas eu firmo a minha aliança convosco.', contexto: 'Aliança de Deus com Noé após o dilúvio' },
      { livro: 'gn', capitulo: 15, versiculo: 18, texto: 'Naquele mesmo dia, o Senhor fez aliança com Abrão.', contexto: 'Aliança abraâmica — promessa de terra e descendência' },
      { livro: 'ex', capitulo: 24, versiculo: 7, texto: 'Eis o sangue da aliança.', contexto: 'Aliança sinaitica — Lei e povo escolhido' },
      { livro: 'jr', capitulo: 31, versiculo: 33, texto: 'Porei a minha lei no seu interior.', contexto: 'Promessa de nova aliança escrita no coração' },
      { livro: 'lc', capitulo: 22, versiculo: 20, texto: 'Este cálice é a nova aliança no meu sangue.', contexto: 'Jesus institui a nova aliança na ceia' },
    ],
  },
  {
    id: 'reino',
    nome: 'Reino de Deus',
    cor: '#ef4444',
    icone: '👑',
    descricao: 'O reinado de Deus e o Reino que Jesus anunciou',
    versiculos: [
      { livro: 'mc', capitulo: 1, versiculo: 15, texto: 'O Reino de Deus está próximo.', contexto: 'Jesus proclama o início do Reino' },
      { livro: 'mt', capitulo: 6, versiculo: 33, texto: 'Buscai primeiro o Reino de Deus.', contexto: 'Prioridade do Reino sobre todas as coisas' },
      { livro: 'mt', capitulo: 13, versiculo: 31, texto: 'O Reino dos céus é como grão de mostarda.', contexto: 'Parábolas do Reino — crescimento progressivo' },
      { livro: 'ap', capitulo: 11, versiculo: 15, texto: 'Os reinos do mundo se tornaram do nosso Senhor.', contexto: 'Consumação final do Reino de Deus' },
    ],
  },
  {
    id: 'missão',
    nome: 'Missão',
    cor: '#06b6d4',
    icone: '🌍',
    descricao: 'A Grande Comissão e a missão da igreja',
    versiculos: [
      { livro: 'mt', capitulo: 28, versiculo: 19, texto: 'Ide, portanto, fazei discípulos de todas as nações.', contexto: 'A Grande Comissão de Jesus' },
      { livro: 'at', capitulo: 1, versiculo: 8, texto: 'Sereis minhas testemunhas.', contexto: 'O poder do Espírito para testemunhar' },
      { livro: 'rm', capitulo: 10, versiculo: 14, texto: 'Como pregarão, se não forem enviados?', contexto: 'A necessidade de heraldos do evangelho' },
      { livro: '2co', capitulo: 5, versiculo: 20, texto: 'Somos embaixadores de Cristo.', contexto: 'A igreja como representante de Deus' },
    ],
  },
  {
    id: 'sabedoria',
    nome: 'Sabedoria',
    cor: '#ec4899',
    icone: '📚',
    descricao: 'A sabedoria divina e sua aplicação na vida',
    versiculos: [
      { livro: 'pv', capitulo: 1, versiculo: 7, texto: 'O princípio da sabedoria é o temor do Senhor.', contexto: 'Fundamento de toda sabedoria bíblica' },
      { livro: 'pv', capitulo: 3, versiculo: 5, texto: 'Confia no Senhor de todo o teu coração.', contexto: 'Sabedoria prática para a vida diária' },
      { livro: 'ec', capitulo: 12, versiculo: 13, texto: 'Teme a Deus e guarda os seus mandamentos.', contexto: 'Conclusão do Eclesiastes sobre sabedoria' },
      { livro: 'tg', capitulo: 1, versiculo: 5, texto: 'Se algum de vós tem falta de sabedoria, peça-a.', contexto: 'A sabedoria como dom divino' },
    ],
  },
  {
    id: 'esperança',
    nome: 'Esperança',
    cor: '#f97316',
    icone: '🌅',
    descricao: 'A esperança cristã na ressurreição e vida eterna',
    versiculos: [
      { livro: 'rm', capitulo: 8, versiculo: 24, texto: 'Pois fomos salvos nessa esperança.', contexto: 'A esperança como fundamento da salvação' },
      { livro: '1co', capitulo: 15, versiculo: 19, texto: 'Se apenas para esta vida temos esperança.', contexto: 'A ressurreição como esperança central' },
      { livro: 'fp', capitulo: 1, versiculo: 21, texto: 'Para mim é viver Cristo, e morrer é ganho.', contexto: 'A esperança além da morte' },
      { livro: '1pe', capitulo: 1, versiculo: 3, texto: 'Em esperança de uma viva esperança.', contexto: 'A ressurreição de Jesus como fundamento' },
    ],
  },
  {
    id: 'amor',
    nome: 'Amor',
    cor: '#f43f5e',
    icone: '❤️',
    descricao: 'O amor de Deus e o amor ao próximo',
    versiculos: [
      { livro: 'jn', capitulo: 3, versiculo: 16, texto: 'Porque Deus amou o mundo de tal maneira.', contexto: 'O maior versículo sobre o amor divino' },
      { livro: 'jn', capitulo: 13, versiculo: 34, texto: 'Um novo mandamento vos dou: que vos ameis.', contexto: 'O mandamento do amor na nova aliança' },
      { livro: '1co', capitulo: 13, versiculo: 4, texto: 'O amor é sofredor, é benigno.', contexto: 'A definição mais famosa de amor bíblico' },
      { livro: 'rm', capitulo: 8, versiculo: 38, texto: 'Nada poderá separar-nos do amor de Deus.', contexto: 'A inabalabilidade do amor divino' },
    ],
  },
];

export function ThemeMapper({ open, onClose }: ThemeMapperProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThemes = useMemo(() => {
    if (!searchQuery) return THEOLOGICAL_THEMES;
    return THEOLOGICAL_THEMES.filter(t =>
      t.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.descricao.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const activeTheme = THEOLOGICAL_THEMES.find(t => t.id === selectedTheme);

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-[var(--border)]/50 bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--content-primary)]">
                Mapeador de Temas Teológicos
              </h2>
              <p className="text-[10px] text-[var(--content-muted)]">
                {THEOLOGICAL_THEMES.length} temas · {THEOLOGICAL_THEMES.reduce((a, t) => a + t.versiculos.length, 0)} versículos
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Fechar">
            <X className="w-5 h-5 text-[var(--content-muted)]" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tema..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {!selectedTheme ? (
          <div className="grid grid-cols-1 gap-3">
            {filteredThemes.map((theme) => (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedTheme(theme.id)}
                className="text-left rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-4 hover:shadow-lg transition-all group"
                style={{ borderLeftColor: theme.cor, borderLeftWidth: '3px' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{theme.icone}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[var(--content-primary)] group-hover:text-violet-500 transition-colors">
                      {theme.nome}
                    </h3>
                    <p className="text-[11px] text-[var(--content-muted)] mt-0.5">
                      {theme.descricao}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: theme.cor + '20', color: theme.cor }}>
                    {theme.versiculos.length} versículos
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : activeTheme ? (
          <div className="space-y-4">
            {/* Back button */}
            <button
              onClick={() => setSelectedTheme(null)}
              className="flex items-center gap-2 text-xs font-medium text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              Voltar para temas
            </button>

            {/* Theme header */}
            <div className="rounded-xl p-4" style={{ backgroundColor: activeTheme.cor + '10', borderLeft: `3px solid ${activeTheme.cor}` }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeTheme.icone}</span>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: activeTheme.cor }}>
                    {activeTheme.nome}
                  </h3>
                  <p className="text-xs text-[var(--content-muted)]">
                    {activeTheme.descricao}
                  </p>
                </div>
              </div>
            </div>

            {/* Verses */}
            <div className="space-y-3">
              {activeTheme.versiculos.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={hrefBiblia(v.livro, v.capitulo, v.versiculo)}
                    className="block rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-4 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold" style={{ color: activeTheme.cor }}>
                        {v.livro.toUpperCase()} {v.capitulo}:{v.versiculo}
                      </span>
                      <ArrowRight className="w-3 h-3 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm font-serif-body italic text-[var(--content-primary)] leading-relaxed mb-2">
                      &ldquo;{v.texto}&rdquo;
                    </p>
                    <p className="text-[11px] text-[var(--content-muted)]">
                      {v.contexto}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-raised)] rounded-t-3xl shadow-2xl h-[90vh]"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 rounded-full bg-[var(--content-muted)] opacity-20" />
            </div>
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
