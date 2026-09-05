'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, ChevronDown, ChevronUp, Copy, Share2,
  Languages, Layers, Shield, Heart, BookMarked, Sparkles,
  ArrowRight, Info, Loader2, X, Bookmark, StickyNote, MessageSquare,
  ExternalLink, Globe, Map, Clock, Users, Brain, Link as Link2,
} from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface VerseStudy {
  referencia: string;
  textoOriginal: string;
  transliteracao: string;
  traducoes: { sigla: string; texto: string; tipo: 'formal' | 'dinamica' }[];
  morphology: { palavra: string; analise: string; Strong: string }[];
  apparatus: { testemunho: string; leitura: string; avaliacao: string; notas: string }[];
  comentarios: { teologo: string; periodo: string; texto: string }[];
  crossRefs: { referencia: string; conexao: string; texto: string }[];
  notasMarginais: { categoria: string; nota: string }[];
  contextoHistorico: string;
  aplicacaoPastoral: string;
}

// Sample data for João 3:16
const SAMPLE_VERSE: VerseStudy = {
  referencia: 'João 3:16',
  textoOriginal: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται, ἀλλ᾽ ἔχῃ ζωὴν αἰώνιον.',
  transliteracao: `houtōs gar ēgapēsen ho theos ton kosmon, hōste ton huion ton monogenē edōken, hina pas ho pisteuōn eis auton mē apolētai, all' echē zōēn aiōnion.`,
  traducoes: [
    { sigla: 'ARC', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', tipo: 'formal' },
    { sigla: 'NVI', texto: 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', tipo: 'dinamica' },
    { sigla: 'KJV', texto: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', tipo: 'formal' },
  ],
  morphology: [
    { palavra: 'οὕτως', analise: 'Adverbial de modo — "assim, desta maneira"', Strong: 'G3779' },
    { palavra: 'ἠγάπησεν', analise: 'Verbo: Aoristo Indicativo Ativo 3ª pessoa singular — "amou"', Strong: 'G25' },
    { palavra: 'ὁ θεός', analise: 'Substantivo: Nominativo Masculino Singular — "o Deus"', Strong: 'G2316' },
    { palavra: 'τὸν κόσμον', analise: 'Substantivo: Acusativo Masculino Singular — "o mundo"', Strong: 'G2889' },
    { palavra: 'τὸν υἱόν', analise: 'Substantivo: Acusativo Masculino Singular — "o Filho"', Strong: 'G5207' },
    { palavra: 'τὸν μονογενῆ', analise: 'Adjetivo: Acusativo Masculino Singular — "o unigênito"', Strong: 'G3439' },
    { palavra: 'ἔδωκεν', analise: 'Verbo: Aoristo Indicativo Ativo 3ª pessoa singular — "deu"', Strong: 'G1325' },
    { palavra: 'πιστεύων', analise: 'Particípio: Presente Nominativo Masculino Singular — "crê"', Strong: 'G4100' },
    { palavra: 'ἀπόληται', analise: 'Verbo: Aoristo Subjuntivo Médio-Passivo 3ª pessoa singular — "pereça"', Strong: 'G622' },
    { palavra: 'ζωήν', analise: 'Substantivo: Acusativo Feminino Singular — "vida"', Strong: 'G2222' },
  ],
  apparatus: [
    { testemunho: 'P66 (σ)', leitura: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον', avaliacao: 'Leitura majoritária', notas: 'Manuscrito do século III, fragmento de João' },
    { testemunho: 'ℵ', leitura: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον', avaliacao: 'Leitura majoritária', notas: 'Códice Sinaiticus, século IV' },
    { testemunho: 'B', leitura: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον', avaliacao: 'Leitura majoritária', notas: 'Códice Vaticano, século IV' },
    { testemunho: 'A', leitura: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον', avaliacao: 'Leitura majoritária', notas: 'Códice Alexandrino, século V' },
    { testemunho: 'D', leitura: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον', avaliacao: 'Leitura majoritária', notas: 'Códice Bezae, século V — variante com "unigênito Filho"' },
  ],
  comentarios: [
    { teologo: 'Agostinho de Hipona', periodo: 'Padres da Igreja (354-430)', texto: `"Tanto amou" — não apenas amou, mas "tanto amou". A intensidade do amor divino é medida pela dádiva: o Filho unigênito. Nenhuma maior prova de amor poderia ser dada.` },
    { teologo: 'João Calvino', periodo: 'Reforma (1509-1564)', texto: `A palavra monogenē (unigênito) denota não apenas singularidade, mas singular excelência. Cristo é unigênito porque não há outro como ele — é o único Filho do Pai por natureza.` },
    { teologo: 'C.H. Spurgeon', periodo: 'Pós-Reforma (1834-1892)', texto: `Observe que o objeto do amor de Deus é "o mundo" — não os judeus apenas, não os bons apenas, mas o mundo inteiro. Aqui está a universalidade da oferta de graça.` },
    { teologo: 'John Stott', periodo: 'Contemporâneo (1921-2011)', texto: `A cruz é o centro da história e o coração do evangelho. João 3:16 é o resumo de todo o cristianismo em uma frase — o amor de Deus, a dádiva do Filho, a fé do crente, a vida eterna.` },
  ],
  crossRefs: [
    { referencia: 'João 1:14', conexao: 'Mesmo autor — unigênito', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glária do unigênito do Pai.' },
    { referencia: 'Romanos 5:8', conexao: 'Tema: amor sacrificial', texto: 'Mas Deus prova o seu amor para conosco, sendo nós ainda pecadores, Cristo morreu por nós.' },
    { referencia: '1 João 4:9-10', conexao: 'Mesmo autor — amor manifesto', texto: 'Nisto se manifestou o amor de Deus em nós, em que Deus enviou o seu Filho unigênito ao mundo.' },
    { referencia: 'Efésios 2:4-5', conexao: 'Tema: graça', texto: 'Mas Deus, que é rico em misericórdia, por causa do grande amor com que nos amou, nos deu vida com Cristo.' },
  ],
  notasMarginais: [
    { categoria: 'Notas Textuais', nota: 'A variante "monogenē" (unigênito) é atestada por todos os principais manuscritos. Algumas traduções antigas renderam como "único" (LAT: unicus), mas o sentido de "unigênito" é preferido pela maioria dos estudiosos.' },
    { categoria: 'Notas Culturais', nota: 'O conceito de "mundo" (kosmos) em João pode ter sentido pejorativo (o mundo em oposição a Deus) ou neutro (a humanidade como objeto do amor divino). Aqui prevalece o sentido de universalidade.' },
    { categoria: 'Notas Teológicas', nota: 'Este versículo é frequentemente chamado de "o versículo mais importante da Bíblia" por resumir em uma frase o evangelho completo: o amor de Deus, a dádiva do Filho, a condição da fé, e o resultado da vida eterna.' },
  ],
  contextoHistorico: 'João 3:16 está no contexto do diálogo de Jesus com Nicodemus, um fariseu e membro do Sinédrio que veio à noite para questionar Jesus sobre o Reino de Deus. Jesus ensina sobre o novo nascimento (3:3-8) e então cita Números 21:8-9 (a serpente de bronze) como tipologia da crucificação. João 3:16 é a síntese teológica deste diálogo — a razão pela qual o Filho do homem deve ser levantado (3:14-15) é o amor de Deus pelo mundo.',
  aplicacaoPastoral: 'Este versículo é a porta de entrada para a compreensão do evangelho. Para o pregador, oferece: (1) a motivação divina (amor), (2) o meio divino (o Filho), (3) a resposta humana (fé), e (4) o resultado (vida eterna). A aplicação pastoral inclui: urgência evangelística (o mundo precisa ouvir), segurança do crente (quem crê não perece), e a centralidade da cruz (o Filho dado).',
};

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

export default function VerseStudyPage() {
  const [selectedBook, setSelectedBook] = useState('jn');
  const [chapter, setChapter] = useState(3);
  const [verseNum, setVerse] = useState(16);
  const [searchQuery, setSearchQuery] = useState('');
  const [generating, setGenerating] = useState(false);
  const [study, setStudy] = useState<VerseStudy>(SAMPLE_VERSE);
  const [activeSection, setActiveSection] = useState<string | null>('texto');
  const [showOriginal, setShowOriginal] = useState(true);

  const refLabel = `${nomeLivro(selectedBook)} ${chapter}:${verseNum}`;

  const filteredBooks = TODOS_LIVROS.filter(l =>
    !searchQuery || l.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sections = [
    { id: 'texto', label: 'Texto & Traduções', icon: BookOpen },
    { id: 'morfologia', label: 'Morfologia', icon: Languages },
    { id: 'apparatus', label: 'Apparatus Crítico', icon: Shield },
    { id: 'comentarios', label: 'Comentários', icon: MessageSquare },
    { id: 'referencias', label: 'Referências Cruzadas', icon: Link2 },
    { id: 'notas', label: 'Notas Marginais', icon: StickyNote },
    { id: 'contexto', label: 'Contexto Histórico', icon: Clock },
    { id: 'aplicacao', label: 'Aplicação Pastoral', icon: Heart },
  ];

  return (
    <PageShell maxWidth="5xl">
      <PageHero
        icon={BookOpen}
        eyebrow="Estudo Detalhado"
        title="Análise Acadêmica do Versículo"
        subtitle="Texto original, apparatus crítico, morfologia, comentários de teólogos, referências cruzadas e notas marginais."
      />

      {/* Reference input */}
      <div className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
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
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-1 block">Versículo</label>
            <input
              type="number"
              min={1}
              value={verseNum}
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

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar navigation */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left',
                  activeSection === section.id
                    ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                    : 'text-[var(--content-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]'
                )}
              >
                <section.icon className="w-4 h-4 shrink-0" />
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content area */}
        <div className="space-y-6">
          {/* Text & Translations */}
          <Section
            id="texto"
            title="Texto & Traduções"
            icon={BookOpen}
            color="#f59e0b"
            isOpen={activeSection === 'texto' || activeSection === null}
            onToggle={() => setActiveSection(activeSection === 'texto' ? null : 'texto')}
          >
            <div className="space-y-4">
              {/* Greek text */}
              <div className="rounded-xl bg-[var(--surface-sunken)] p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)]">Texto Grego</p>
                  <button
                    onClick={() => setShowOriginal(!showOriginal)}
                    className="text-[10px] text-[var(--brand-default)] font-bold"
                  >
                    {showOriginal ? 'Ocultar Transliteração' : 'Mostrar Transliteração'}
                  </button>
                </div>
                <p className="font-mono text-sm text-[var(--content-primary)] leading-relaxed">
                  {study.textoOriginal}
                </p>
                <AnimatePresence>
                  {showOriginal && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-xs text-[var(--content-muted)] mt-2 italic overflow-hidden"
                    >
                      {study.transliteracao}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Translations */}
              <div className="space-y-3">
                {study.traducoes.map((t) => (
                  <div
                    key={t.sigla}
                    className={cn(
                      'rounded-xl border p-4',
                      t.tipo === 'formal' ? 'border-blue-500/20 bg-blue-500/5' : 'border-emerald-500/20 bg-emerald-500/5'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-[var(--content-primary)]">{t.sigla}</span>
                      <span className={cn(
                        'text-[9px] px-2 py-0.5 rounded-full font-bold',
                        t.tipo === 'formal' ? 'bg-blue-500/20 text-blue-600' : 'bg-emerald-500/20 text-emerald-600'
                      )}>
                        {t.tipo === 'formal' ? 'Formal' : 'Dinâmica'}
                      </span>
                    </div>
                    <p className="text-sm font-serif-body leading-relaxed text-[var(--content-primary)]">
                      {t.texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Morphology */}
          <Section
            id="morfologia"
            title="Morfologia Grega"
            icon={Languages}
            color="#06b6d4"
            isOpen={activeSection === 'morfologia'}
            onToggle={() => setActiveSection(activeSection === 'morfologia' ? null : 'morfologia')}
          >
            <div className="space-y-2">
              {study.morphology.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)]/30"
                >
                  <span className="font-mono text-sm font-bold text-[var(--brand-default)] min-w-[100px]">
                    {m.palavra}
                  </span>
                  <span className="text-xs text-[var(--content-secondary)]">
                    {m.analise}
                  </span>
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-bold shrink-0">
                    {m.Strong}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* Apparatus Criticus */}
          <Section
            id="apparatus"
            title="Apparatus Crítico"
            icon={Shield}
            color="#3b82f6"
            isOpen={activeSection === 'apparatus'}
            onToggle={() => setActiveSection(activeSection === 'apparatus' ? null : 'apparatus')}
          >
            <div className="space-y-3">
              {study.apparatus.map((a, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface-sunken)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[var(--content-primary)] font-mono">{a.testemunho}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-bold">
                      {a.avaliacao}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-[var(--content-primary)] mb-1">{a.leitura}</p>
                  <p className="text-[11px] text-[var(--content-muted)]">{a.notas}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Commentaries */}
          <Section
            id="comentarios"
            title="Comentários de Teólogos"
            icon={MessageSquare}
            color="#8b5cf6"
            isOpen={activeSection === 'comentarios'}
            onToggle={() => setActiveSection(activeSection === 'comentarios' ? null : 'comentarios')}
          >
            <div className="space-y-4">
              {study.comentarios.map((c, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                      {c.teologo.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--content-primary)]">{c.teologo}</p>
                      <p className="text-[10px] text-[var(--content-muted)]">{c.periodo}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed italic">
                    &ldquo;{c.texto}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Cross References */}
          <Section
            id="referencias"
            title="Referências Cruzadas"
            icon={Link2}
            color="#06b6d4"
            isOpen={activeSection === 'referencias'}
            onToggle={() => setActiveSection(activeSection === 'referencias' ? null : 'referencias')}
          >
            <div className="space-y-3">
              {study.crossRefs.map((ref, i) => (
                <Link
                  key={i}
                  href={`/estudo?ref=${encodeURIComponent(ref.referencia)}`}
                  className="block rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-4 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[var(--brand-default)]">{ref.referencia}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 font-bold">
                      {ref.conexao}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
                  </div>
                  <p className="text-sm text-[var(--content-secondary)] italic">&ldquo;{ref.texto}&rdquo;</p>
                </Link>
              ))}
            </div>
          </Section>

          {/* Marginal Notes */}
          <Section
            id="notas"
            title="Notas Marginais"
            icon={StickyNote}
            color="#f97316"
            isOpen={activeSection === 'notas'}
            onToggle={() => setActiveSection(activeSection === 'notas' ? null : 'notas')}
          >
            <div className="space-y-3">
              {study.notasMarginais.map((n, i) => (
                <div key={i} className="rounded-xl border-l-4 border-amber-500 bg-amber-500/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">{n.categoria}</p>
                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{n.nota}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Historical Context */}
          <Section
            id="contexto"
            title="Contexto Histórico"
            icon={Clock}
            color="#14b8a6"
            isOpen={activeSection === 'contexto'}
            onToggle={() => setActiveSection(activeSection === 'contexto' ? null : 'contexto')}
          >
            <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
              {study.contextoHistorico}
            </p>
          </Section>

          {/* Pastoral Application */}
          <Section
            id="aplicacao"
            title="Aplicação Pastoral"
            icon={Heart}
            color="#ec4899"
            isOpen={activeSection === 'aplicacao'}
            onToggle={() => setActiveSection(activeSection === 'aplicacao' ? null : 'aplicacao')}
          >
            <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
              {study.aplicacaoPastoral}
            </p>
          </Section>
        </div>
      </div>
    </PageShell>
  );
}

// Section component
function Section({
  id,
  title,
  icon: Icon,
  color,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  icon: typeof BookOpen;
  color: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-5 hover:bg-[var(--surface-sunken)]/30 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: color + '20' }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h3 className="flex-1 text-sm font-bold text-[var(--content-primary)] text-left">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[var(--content-muted)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--content-muted)]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[var(--border)]/30 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
