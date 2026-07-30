'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { useFlashcards } from '@/hooks/useFlashcards';
import { listarFavoritos, type MarcaBiblia } from '@/lib/estudos';
import { carregarTraducao } from '@/data/biblia/texto/carregar';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import { getSummary } from '@/lib/gamificationTracker';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, RotateCcw, Check, X, BookOpen, BarChart3, ArrowRight, Sparkles, Plus, Trash2, Flame, Clock, Star, Lightbulb, Dices, Bookmark } from 'lucide-react';

const QUALITY_BUTTONS = [
  { quality: 1, label: 'Errei', sub: 'Repetir', color: 'text-red-500', bg: 'bg-red-500/10 hover:bg-red-500/20', border: 'border-red-500/30' },
  { quality: 3, label: 'Difícil', sub: 'Repetir', color: 'text-amber-500', bg: 'bg-amber-500/10 hover:bg-amber-500/20', border: 'border-amber-500/30' },
  { quality: 4, label: 'Bom', sub: '1d', color: 'text-emerald-500', bg: 'bg-emerald-500/10 hover:bg-emerald-500/20', border: 'border-emerald-500/30' },
  { quality: 5, label: 'Fácil', sub: '4d', color: 'text-sky-500', bg: 'bg-sky-500/10 hover:bg-sky-500/20', border: 'border-sky-500/30' },
];

export default function FlashcardsPage() {
  const { cards, dueCards, dueCount, totalCards, stats, learnedStreak, addCardManual, removeCard, review, getVerseData, autoPopulateFromBookmarks } = useFlashcards();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [refInput, setRefInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [reviewedThisSession, setReviewedThisSession] = useState(0);
  const [showFav, setShowFav] = useState(false);
  const [favoritos, setFavoritos] = useState<MarcaBiblia[]>([]);
  const [carregandoFav, setCarregandoFav] = useState(false);
  const [adicionados, setAdicionados] = useState<Set<string>>(new Set());
  const [sugestoes, setSugestoes] = useState<Array<{ ref: string; texto: string; motivo: string }>>([]);
  const [autoPopMsg, setAutoPopMsg] = useState<string | null>(null);

  // Referências já existentes como card manual
  const chavesExistentes = useMemo(
    () => new Set(cards.map((c) => c.manualReferencia?.toLowerCase()).filter(Boolean) as string[]),
    [cards],
  );

  // Smart suggestions based on reading history
  useEffect(() => {
    try {
      const summary = getSummary();
      if (summary.totalVersiculos < 3) return;

      const favs = listarFavoritos();
      const existingRefs = new Set(cards.map(c => c.manualReferencia?.toLowerCase()).filter(Boolean));
      const addedRefs = new Set(adicionados);

      const suggestions: Array<{ ref: string; texto: string; motivo: string }> = [];

      // Priority 1: Favorited verses not yet in flashcards
      for (const fav of favs) {
        const ref = `${livroPorAbreviacao.get(fav.livro)?.nome || fav.livro} ${fav.capitulo}:${fav.versiculo}`;
        if (!existingRefs.has(ref.toLowerCase()) && !addedRefs.has(ref.toLowerCase()) && fav.texto) {
          suggestions.push({ ref, texto: fav.texto, motivo: '❤️ Seu favorito' });
        }
      }

      // Priority 2: Verses from most-read books
      const bookCounts: Record<string, number> = {};
      const events = (() => {
        try { return JSON.parse(localStorage.getItem('ssb_gamification_tracker') || '[]'); } catch { return []; }
      })();
      for (const evt of events) {
        if (evt.tipo === 'versiculo_lido' && evt.dados?.livro) {
          const book = evt.dados.livro as string;
          bookCounts[book] = (bookCounts[book] || 0) + evt.quantidade;
        }
      }
      const topBooks = Object.entries(bookCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

      const KEY_VERSES: Record<string, { ref: string; texto: string }[]> = {
        'rom': [{ ref: 'Romanos 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, aos que são chamados segundo o seu propósito.' }, { ref: 'Romanos 12:2', texto: 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.' }, { ref: 'Romanos 5:8', texto: 'Mas Deus prova o seu amor por nós em que Cristo morreu por nós, sendo nós ainda pecadores.' }],
        'jo': [{ ref: 'João 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' }, { ref: 'João 14:27', texto: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá.' }, { ref: 'João 15:5', texto: 'Eu sou a vide, e vós as varas. Quem permanece em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.' }],
        'ef': [{ ref: 'Efésios 2:8-9', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' }, { ref: 'Efésios 6:10', texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.' }],
        'fp': [{ ref: 'Filipenses 4:13', texto: 'Posso todas as coisas naquele que me fortalece.' }, { ref: 'Filipenses 4:6-7', texto: 'Não vos preocupeis com coisa alguma; mas em tudo sejam conhecidas, diante de Deus, as vossas petições, pela oração e súplicas.' }],
        'sl': [{ ref: 'Salmos 23:1', texto: 'O Senhor é o meu pastor; nada me faltará.' }, { ref: 'Salmos 119:105', texto: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' }, { ref: 'Salmos 46:10', texto: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.' }],
        'pv': [{ ref: 'Provérbios 3:5-6', texto: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' }],
        'mt': [{ ref: 'Mateus 11:28', texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' }, { ref: 'Mateus 6:33', texto: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' }],
        'hb': [{ ref: 'Hebreus 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' }, { ref: 'Hebreus 12:1', texto: 'Portanto, nós também, pois temos tal nuvem de testemunhas ao redor de nós, deixemos todo o peso e o pecado que nos assedia.' }],
        '1jo': [{ ref: '1 João 4:19', texto: 'Nós o amamos a ele, porque ele nos amou primeiro.' }],
        'rm': [{ ref: 'Romanos 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.' }, { ref: 'Romanos 12:2', texto: 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.' }],
        'atos': [{ ref: 'Atos 1:8', texto: 'Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas em Jerusalém, e em toda a Judeia e Samaria, e até os confins da terra.' }],
      };

      for (const [book] of topBooks) {
        const verses = KEY_VERSES[book];
        if (verses) {
          for (const v of verses) {
            if (!existingRefs.has(v.ref.toLowerCase()) && !addedRefs.has(v.ref.toLowerCase())) {
              suggestions.push({ ref: v.ref, texto: v.texto, motivo: `📖 Livro mais lido` });
            }
          }
        }
      }

      if (suggestions.length === 0 && favs.length > 0) {
        const recent = favs.slice(0, 3);
        for (const fav of recent) {
          const ref = `${livroPorAbreviacao.get(fav.livro)?.nome || fav.livro} ${fav.capitulo}:${fav.versiculo}`;
          if (!existingRefs.has(ref.toLowerCase()) && !addedRefs.has(ref.toLowerCase()) && fav.texto) {
            suggestions.push({ ref, texto: fav.texto, motivo: '⭐ Recomendado' });
          }
        }
      }

      setSugestoes(suggestions.slice(0, 5));
    } catch {}
  }, [cards, adicionados]);

  const abrirFavoritos = useCallback(() => {
    setShowFav(true);
    setCarregandoFav(true);
    const favs = listarFavoritos();
    setFavoritos(favs);
    setCarregandoFav(false);
  }, []);

  const handleAutoPopulate = useCallback(() => {
    const added = autoPopulateFromBookmarks();
    if (added > 0) {
      setAutoPopMsg(`${added} flashcards criados dos seus marcadores!`);
    } else {
      setAutoPopMsg('Nenhum marcador novo encontrado.');
    }
    setTimeout(() => setAutoPopMsg(null), 3000);
  }, [autoPopulateFromBookmarks]);

  const referenciaDe = (m: MarcaBiblia): string => {
    const nome = livroPorAbreviacao.get(m.livro)?.nome || m.livro;
    return `${nome} ${m.capitulo}:${m.versiculo}`;
  };

  const adicionarDosFavoritos = useCallback(async (m: MarcaBiblia) => {
    const ref = referenciaDe(m);
    const chave = ref.toLowerCase();
    if (chavesExistentes.has(chave) || adicionados.has(chave)) return;
    let texto = m.texto?.trim();
    if (!texto) {
      try {
        const trad = await carregarTraducao(m.traducao || 'arc');
        const arr = trad[m.livro]?.[m.capitulo];
        texto = arr?.[m.versiculo - 1] ?? '';
      } catch { texto = ''; }
    }
    if (!texto) texto = 'Versículo não disponível na tradução selecionada.';
    addCardManual(ref, texto);
    setAdicionados(prev => new Set(prev).add(chave));
  }, [chavesExistentes, adicionados, addCardManual]);

  const adicionarSugestao = useCallback((s: { ref: string; texto: string }) => {
    if (chavesExistentes.has(s.ref.toLowerCase()) || adicionados.has(s.ref.toLowerCase())) return;
    addCardManual(s.ref, s.texto);
    setAdicionados(prev => new Set(prev).add(s.ref.toLowerCase()));
  }, [chavesExistentes, adicionados, addCardManual]);

  const adicionarTodasSugestoes = useCallback(() => {
    for (const s of sugestoes) {
      if (!chavesExistentes.has(s.ref.toLowerCase()) && !adicionados.has(s.ref.toLowerCase())) {
        addCardManual(s.ref, s.texto);
        setAdicionados(prev => new Set(prev).add(s.ref.toLowerCase()));
      }
    }
  }, [sugestoes, chavesExistentes, adicionados, addCardManual]);

  const currentCard = dueCards[currentIdx];
  const currentData = currentCard ? getVerseData(currentCard) : null;

  // Reset flip when moving to a new card
  useEffect(() => { setFlipped(false); }, [currentIdx, dueCards.length]);

  const handleReview = (quality: number) => {
    if (!currentCard) return;
    review(currentCard.verseKey, quality);
    setReviewedThisSession(prev => prev + 1);
    setFlipped(false);
    setCurrentIdx(prev => Math.min(prev + 1, dueCards.length - 1));
  };

  const handleAdd = () => {
    if (!refInput.trim() || !textInput.trim()) return;
    addCardManual(refInput.trim(), textInput.trim());
    setRefInput('');
    setTextInput('');
    setShowAdd(false);
  };

  if (showStats) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <button onClick={() => setShowStats(false)} className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <Brain className="w-6 h-6 text-[var(--brand-default)]" />
                <h1 className="font-display text-3xl font-light">Estatísticas</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Novos', value: stats.new, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { label: 'Aprendendo', value: stats.learning, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Revisão', value: stats.review, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  { label: 'Domínio', value: stats.known, color: 'text-green-500', bg: 'bg-green-500/10' },
                ].map(s => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-5 text-center`}>
                    <p className={`font-display text-4xl font-light ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-[var(--muted-fg)] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="border border-[var(--border)]/50 rounded-xl p-5 mb-4">
                <h3 className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3">Progresso</h3>
                <div className="h-3 bg-[var(--border)]/30 rounded-full overflow-hidden flex">
                  {[
                    { value: stats.new, color: 'bg-blue-500' },
                    { value: stats.learning, color: 'bg-amber-500' },
                    { value: stats.review, color: 'bg-purple-500' },
                    { value: stats.known, color: 'bg-green-500' },
                  ].map(s => (
                    s.value > 0 && (
                      <motion.div
                        key={s.color}
                        className={`${s.color} h-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.value / Math.max(totalCards, 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    )
                  ))}
                </div>
              </div>
              <div className="border border-[var(--border)]/50 rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-[var(--content-primary)]">Maior sequência de acertos</span>
                </div>
                <span className="font-display text-2xl font-light text-orange-500">{learnedStreak}</span>
              </div>
              <p className="text-xs text-[var(--muted-fg)] mt-6 text-center">
                Agenda de repetição espaçada (algoritmo SM-2).
              </p>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-[var(--brand-default)]" />
                <div>
                  <h1 className="font-display text-3xl font-light">Flashcards</h1>
                  <p className="text-xs text-[var(--muted-fg)] flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {dueCount} pendentes · {totalCards} total
                    {learnedStreak > 0 && (
                      <span className="flex items-center gap-1 text-orange-500"><Flame className="w-3 h-3" />{learnedStreak}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleAutoPopulate} className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors" title="Criar flashcards dos marcadores">
                  <Bookmark className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
                <button onClick={abrirFavoritos} className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors" title="Adicionar dos favoritos">
                  <Star className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
                <button onClick={() => setShowAdd(v => !v)} className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors" title="Adicionar flashcard">
                  <Plus className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
                <button onClick={() => setShowStats(true)} className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors" title="Estatísticas">
                  <BarChart3 className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Auto-populate message */}
          <AnimatePresence>
            {autoPopMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-xl bg-[var(--brand-subtle)] border border-[var(--brand-default)]/20 text-sm text-[var(--brand-default)] font-medium text-center">
                {autoPopMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add form */}
          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="border border-[var(--border)]/50 rounded-xl p-5 bg-[var(--card-bg)]">
                  <h3 className="text-sm font-semibold text-[var(--content-primary)] mb-3">Novo flashcard</h3>
                  <input
                    value={refInput}
                    onChange={e => setRefInput(e.target.value)}
                    placeholder="Referência (ex: João 3:16)"
                    aria-label="Referência do versículo"
                    className="w-full px-3 py-2.5 mb-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30"
                  />
                  <textarea
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    placeholder="Texto do versículo"
                    aria-label="Texto do versículo"
                    rows={3}
                    className="w-full px-3 py-2.5 mb-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 resize-none"
                  />
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm rounded-lg text-[var(--muted-fg)] hover:bg-[var(--bg)] transition-colors">Cancelar</button>
                    <button
                      onClick={handleAdd}
                      disabled={!refInput.trim() || !textInput.trim()}
                      className="px-4 py-2 text-sm rounded-lg bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold disabled:opacity-40 hover:opacity-90 transition-all"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Favorites picker modal */}
          <AnimatePresence>
            {showFav && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowFav(false)}
                role="dialog"
                aria-modal="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onClick={e => e.stopPropagation()}
                  className="w-full max-w-md max-h-[80vh] flex flex-col bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                    <h2 className="font-display text-lg font-semibold text-[var(--content-primary)] flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400" /> Adicionar dos favoritos
                    </h2>
                    <button
                      onClick={() => setShowFav(false)}
                      className="p-1.5 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
                      aria-label="Fechar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                    {carregandoFav ? (
                      <p className="text-center text-sm text-[var(--muted-fg)] py-8">Carregando…</p>
                    ) : favoritos.length === 0 ? (
                      <div className="text-center py-10">
                        <BookOpen className="w-10 h-10 mx-auto mb-3 text-[var(--content-muted)]" strokeWidth={1} />
                        <p className="text-sm text-[var(--muted-fg)]">Você ainda não tem versículos favoritos.</p>
                        <Link
                          href="/biblia"
                          onClick={() => setShowFav(false)}
                          className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 text-xs rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Ir para a Bíblia
                        </Link>
                      </div>
                    ) : (
                      favoritos.map((m, i) => {
                        const ref = referenciaDe(m);
                        const jaAdicionado = chavesExistentes.has(ref.toLowerCase()) || adicionados.has(ref.toLowerCase());
                        return (
                          <button
                            key={`${m.livro}-${m.capitulo}-${m.versiculo}-${m.traducao}-${i}`}
                            onClick={() => adicionarDosFavoritos(m)}
                            disabled={jaAdicionado}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg border border-[var(--border)]/50 hover:border-[var(--brand-default)]/30 hover:bg-[var(--brand-subtle)] transition-all disabled:opacity-50 disabled:cursor-default"
                          >
                            <Star className={`w-4 h-4 shrink-0 ${jaAdicionado ? 'text-amber-400' : 'text-[var(--muted-fg)]'}`} />
                            <span className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-[var(--content-primary)] block truncate">{ref}</span>
                              <span className="text-[10px] uppercase text-[var(--muted-fg)]">{(m.traducao || 'arc').toUpperCase()}</span>
                            </span>
                            {jaAdicionado ? (
                              <Check className="w-4 h-4 text-green-500 shrink-0" />
                            ) : (
                              <Plus className="w-4 h-4 text-[var(--brand-default)] shrink-0" />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)] bg-[var(--surface-sunken)]/40">
                    <span className="text-[11px] text-[var(--muted-fg)]">{favoritos.length} favorito{favoritos.length !== 1 ? 's' : ''}</span>
                    <button
                      onClick={() => setShowFav(false)}
                      className="px-4 py-2 text-sm rounded-lg font-medium text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
                    >
                      Concluído
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {dueCards.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-16">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h2 className="font-display text-2xl font-light mb-2">Tudo revisado!</h2>
                <p className="text-sm text-[var(--muted-fg)] mb-6">
                  {totalCards === 0
                    ? 'Adicione flashcards dos seus versículos favoritos para começar a memorizar.'
                    : 'Volte mais tarde para as próximas revisões agendadas.'}
                </p>
                {totalCards === 0 ? (
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => setShowAdd(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-default)] text-[var(--brand-contrast)] rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Criar flashcard
                    </button>
                    <Link
                      href="/biblia"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-lg text-sm font-semibold hover:bg-[var(--bg)] transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      Ir para a Bíblia
                    </Link>
                  </div>
                ) : (
                  <span className="text-xs text-[var(--muted-fg)]">{stats.known} dominados · {stats.learning} aprendendo · {stats.new} novos</span>
                )}
              </div>

              {/* Smart Suggestions */}
              {sugestoes.length > 0 && (
                <div className="mt-8 p-5 rounded-2xl border border-[var(--border)]/50 bg-[var(--card-bg)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <h3 className="font-display text-lg font-semibold text-[var(--content-primary)]">Sugestões Inteligentes</h3>
                    </div>
                    <button
                      onClick={adicionarTodasSugestoes}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar todas
                    </button>
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] mb-4">Baseado no que você mais lê e nos seus favoritos.</p>
                  <div className="space-y-2">
                    {sugestoes.map((s, i) => {
                      const jaExiste = chavesExistentes.has(s.ref.toLowerCase()) || adicionados.has(s.ref.toLowerCase());
                      return (
                        <motion.div
                          key={s.ref}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)]/50 hover:border-amber-500/30 transition-all"
                        >
                          <span className="text-lg shrink-0">{s.motivo.split(' ')[0]}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--content-primary)] truncate">{s.ref}</p>
                            <p className="text-[10px] text-[var(--muted-fg)] truncate">{s.texto.slice(0, 60)}...</p>
                          </div>
                          <button
                            onClick={() => adicionarSugestao(s)}
                            disabled={jaExiste}
                            className="shrink-0 p-2 rounded-lg hover:bg-amber-500/10 transition-colors disabled:opacity-40"
                          >
                            {jaExiste ? <Check className="w-4 h-4 text-green-500" /> : <Plus className="w-4 h-4 text-amber-500" />}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </ScrollReveal>
          ) : currentData && (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-[var(--border)]/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--brand-default)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / dueCards.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[var(--muted-fg)]">{currentIdx + 1}/{dueCards.length}</span>
              </div>

              {/* Card */}
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="perspective-[1200px]"
              >
                <motion.div
                  onClick={() => setFlipped(!flipped)}
                  className="relative cursor-pointer select-none"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformStyle: 'preserve-3d', minHeight: '280px' }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 backface-hidden border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[var(--card-bg)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <p className="text-xs text-[var(--brand-default)] font-semibold mb-4 uppercase tracking-wider">Memorize</p>
                    <p className="font-display text-2xl font-light leading-relaxed text-[var(--content-primary)]">{currentData.referencia}</p>
                    <p className="text-[10px] text-[var(--muted-fg)] mt-6 flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Clique para revelar
                    </p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 backface-hidden border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[var(--card-bg)]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <p className="text-xs text-[var(--brand-default)] font-semibold mb-4">{currentData.referencia}</p>
                    <p className="font-serif-body text-lg leading-relaxed text-[var(--content-primary)]/90">{currentData.texto}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Quality buttons */}
              {flipped && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
                >
                  {QUALITY_BUTTONS.map(b => (
                    <motion.button
                      key={b.quality}
                      onClick={() => handleReview(b.quality)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`flex flex-col items-center gap-0.5 px-3 py-3 rounded-xl border ${b.border} ${b.bg} ${b.color} transition-all text-sm font-semibold min-h-[44px]`}
                    >
                      {b.quality === 1 ? <X className="w-4 h-4" /> : b.quality === 5 ? <Sparkles className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      {b.label}
                      <span className="text-[10px] font-normal opacity-70">{b.sub}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {!flipped && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setFlipped(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] text-sm font-semibold hover:opacity-90 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Revelar
                  </button>
                </div>
              )}

              {/* Manage */}
              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={() => { if (currentCard) removeCard(currentCard.verseKey); setCurrentIdx(prev => Math.min(prev, Math.max(0, dueCards.length - 2))); }}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-fg)] hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remover este card
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
