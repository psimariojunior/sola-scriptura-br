'use client';

import { useState, useEffect, useCallback, useMemo, useRef, Fragment, lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TODOS_LIVROS, traducoes, carregarTraducao, ABREV_PARA_MIDVASH } from '@/data/biblia';
import type { CapituloComparado } from '@/data/biblia';
import {
  BookOpen, ChevronRight, ChevronLeft, Columns2, LayoutList, AlignJustify,
  Menu, Search, Minus, Plus, X, Heart, StickyNote, Share2, Copy, Check,
  History, Settings, Eye, EyeOff, Download, BookMarked, GraduationCap, Brain, Palette, FileText, Music
} from 'lucide-react';
import { toggleFavorito, obterMarca, setAnotacao as salvarAnotacao } from '@/lib/estudos';
import { useEstudos } from '@/components/EstudosProvider';
import { temComentario } from '@/data/comentarios';
import { temEstudo } from '@/data/estudosTeologicos';
import { diffWords } from '@/lib/diff';
import { exportChapterPdf } from '@/lib/exportPdf';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { getCrossReferences } from '@/data/crossReferences';
import Link from 'next/link';
import VersiculoAudioNatural from '@/components/VersiculoAudioNatural';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import ReadingPlanBanner from '@/components/ReadingPlanBanner';
import { useFlashcards } from '@/hooks/useFlashcards';
import { setMarcador, removeMarcador, getMarcador, CORES } from '@/lib/marcadores';
import { CompartilharVersiculo } from '@/components/CompartilharVersiculo';
import { useAudioCapitulo } from '@/hooks/useAudioCapitulo';
import { isOnline, cacheChapter, getCachedChapter } from '@/lib/offline';
import { recordReading, getStats } from '@/lib/estatisticas';
import OfflineBanner from '@/components/OfflineBanner';
import PainelDoVersiculo from '@/components/PainelDoVersiculo';
import { getTiposRecursoDisponiveis } from '@/data/biblia/versiculoRecursos';
import { useNotas } from '@/hooks/useNotas';

const PainelStrong = lazy(() => import('@/components/PainelStrong'));
const PainelNotas = lazy(() => import('@/components/PainelNotas'));
const PainelComentarios = lazy(() => import('@/components/PainelComentarios'));
const NotaEditor = lazy(() => import('@/components/NotaEditor').then(m => ({ default: m.NotaEditor })));
const PainelEstudosInline = lazy(() => import('@/components/PainelEstudosInline'));
const AudioMiniPlayer = lazy(() => import('@/components/VerseAudio').then(m => ({ default: m.AudioMiniPlayer })));
const AudioNaturalPlayer = lazy(() => import('@/components/AudioNaturalPlayer'));
const NarradorSelector = lazy(() => import('@/components/NarradorSelector'));
const NarracaoDramaticaLazy = lazy(() => import('@/components/NarracaoDramatica'));
import type { CenaDramatica, PersonagemVoz } from '@/components/NarracaoDramatica';

function PanelFallback() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

type ViewMode = 'single' | 'parallel' | 'comparison';

const TRAD_IDS = ['arc', 'nvi', 'ara', 'acf', 'aa', 'ntlh', 'kjv', 'web'] as const;
const TRADS_LOCAIS = new Set(['arc', 'kjv', 'web']);
const MIDVASH_API = 'https://api.midvash.com/v1';
const cacheApi = new Map<string, string[]>();

async function fetchFromMidvash(trad: string, livro: string, cap: number): Promise<string[]> {
  const cacheKey = `${trad}:${livro}:${cap}`;
  if (cacheApi.has(cacheKey)) return cacheApi.get(cacheKey)!;
  const slug = ABREV_PARA_MIDVASH[livro];
  if (!slug) return [];
  try {
    const res = await fetch(`${MIDVASH_API}/${trad}/${slug}/${cap}`, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return [];
    const json = await res.json();
    const verses: string[] = [];
    const raw = json?.data?.verses;
    if (Array.isArray(raw)) {
      for (const v of raw) {
        const text = typeof v === 'string' ? v : v?.text;
        if (text?.trim()) verses.push(text.trim());
      }
    }
    cacheApi.set(cacheKey, verses);
    return verses;
  } catch { return []; }
}

async function loadTranslation(trad: string, livro: string, cap: number): Promise<CapituloComparado | null> {
  try {
    if (TRADS_LOCAIS.has(trad)) {
      const data = await carregarTraducao(trad);
      const arr = data[livro]?.[cap];
      if (!arr || arr.length === 0) return null;
      return { traducao: trad, versiculos: arr.map((t, i) => ({ numero: i + 1, texto: t })) };
    } else {
      const verses = await fetchFromMidvash(trad, livro, cap);
      if (verses.length === 0) return null;
      return { traducao: trad, versiculos: verses.map((t, i) => ({ numero: i + 1, texto: t })) };
    }
  } catch { return null; }
}

async function carregarMulti(livro: string, cap: number, trads: string[]): Promise<CapituloComparado[]> {
  const promises = trads.map(t => loadTranslation(t, livro, cap));
  const results = await Promise.all(promises);
  return results.filter((r): r is CapituloComparado => r !== null);
}

const labelMap: Record<string, string> = { arc: 'ARC', nvi: 'NVI', ara: 'ARA', acf: 'ACF', aa: 'AA', ntlh: 'NTLH', kjv: 'KJV', web: 'WEB' };
const nomeMap: Record<string, string> = { arc: 'Almeida Revista e Corrigida', nvi: 'Nova Versão Internacional', ara: 'Almeida Revista e Atualizada', acf: 'Almeida Corrigida Fiel', aa: 'Almeida Atualizada', ntlh: 'Nova Tradução na Linguagem de Hoje', kjv: 'King James Version', web: 'World English Bible' };
const tradBadgeColors: Record<string, string> = { arc: 'bg-primary/10 text-primary', nvi: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', ara: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', acf: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', aa: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', ntlh: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', kjv: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', web: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };
const tradTextColors: Record<string, string> = { arc: 'text-blue-600 dark:text-blue-400', nvi: 'text-green-600 dark:text-green-400', ara: 'text-purple-600 dark:text-purple-400', acf: 'text-rose-600 dark:text-rose-400', aa: 'text-cyan-600 dark:text-cyan-400', ntlh: 'text-orange-600 dark:text-orange-400', kjv: 'text-amber-600 dark:text-amber-400', web: 'text-emerald-600 dark:text-emerald-400' };

const PASSAGENS_DRAMATICAS: Record<string, { titulo: string; subtitulo: string; cenas: CenaDramatica[]; personagens: PersonagemVoz[] }> = {
  'gn-1': {
    titulo: 'A Criação do Mundo',
    subtitulo: 'Gênesis 1',
    cenas: [
      { id: 'g1-1', narrador: 'Narrador', texto: 'No princípio criou Deus os céus e a terra.', tipo: 'narracao', tom: 'solene' },
      { id: 'g1-2', narrador: 'Narrador', texto: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-3', personagem: 'Deus', texto: 'Haja luz.', tipo: 'dialogo', tom: 'intenso' },
      { id: 'g1-4', narrador: 'Narrador', texto: 'E houve luz. E viu Deus que a luz era boa; e fez Deus separação entre a luz e as trevas.', tipo: 'narracao', tom: 'alegre' },
      { id: 'g1-5', narrador: 'Narrador', texto: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, um dia.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-6', personagem: 'Deus', texto: 'Haja uma expansão no meio das águas, e haja separação entre águas e águas.', tipo: 'dialogo', tom: 'solene' },
      { id: 'g1-7', narrador: 'Narrador', texto: 'E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-8', narrador: 'Narrador', texto: 'E Deus chamou à expansão Céus. E foi a tarde e a manhã, o segundo dia.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-9', personagem: 'Deus', texto: 'Ajuntem-se as águas debaixo dos céus num lugar; e apareça a porção seca.', tipo: 'dialogo', tom: 'intenso' },
      { id: 'g1-10', narrador: 'Narrador', texto: 'E assim foi. E Deus chamou à porção seca Terra; e ao ajuntamento das águas chamou Mares. E viu Deus que era bom.', tipo: 'narracao', tom: 'alegre' },
      { id: 'g1-11', personagem: 'Deus', texto: 'A terra produza erva verde, semente que semeie, árvore frutífera que dê fruto segundo a sua espécie.', tipo: 'dialogo', tom: 'solene' },
      { id: 'g1-12', narrador: 'Narrador', texto: 'E a terra produziu erva verde, semente que semeia segundo a sua espécie, e árvore frutífera que dá fruto segundo a sua espécie. E viu Deus que era bom.', tipo: 'narracao', tom: 'alegre' },
      { id: 'g1-13', narrador: 'Narrador', texto: 'E foi a tarde e a manhã, o terceiro dia.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-14', personagem: 'Deus', texto: 'Haja luminares na expansão dos céus, para separar o dia da noite.', tipo: 'dialogo', tom: 'intenso' },
      { id: 'g1-15', narrador: 'Narrador', texto: 'E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e as estrelas.', tipo: 'narracao', tom: 'solene' },
      { id: 'g1-16', narrador: 'Narrador', texto: 'E Deus os pôs na expansão dos céus, para alumiar a terra, e para governar o dia e a noite, e para separar a luz das trevas. E viu Deus que era bom.', tipo: 'narracao', tom: 'alegre' },
      { id: 'g1-17', narrador: 'Narrador', texto: 'E foi a tarde e a manhã, o quarto dia.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-18', personagem: 'Deus', texto: 'As águas se enchaam de seres vivos, e voem aves sobre a face da expansão dos céus.', tipo: 'dialogo', tom: 'solene' },
      { id: 'g1-19', narrador: 'Narrador', texto: 'E criou Deus os grandes animais marinhos, e todo ser vivente que se move, de que se encheram as águas, segundo a sua espécie; e toda ave conforme a sua espécie. E viu Deus que era bom.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-20', narrador: 'Narrador', texto: 'E foi a tarde e a manhã, o quinto dia.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-21', personagem: 'Deus', texto: 'A terra produza seres vivos segundo a sua espécie; animais domésticos, répteis e animais da terra, segundo a sua espécie.', tipo: 'dialogo', tom: 'intenso' },
      { id: 'g1-22', narrador: 'Narrador', texto: 'E fez Deus os animais da terra segundo a sua espécie, e o gado segundo a sua espécie, e todo réptil da terra segundo a sua espécie. E viu Deus que era bom.', tipo: 'narracao', tom: 'alegre' },
      { id: 'g1-23', narrador: 'Narrador', texto: 'E foi a tarde e a manhã, o sexto dia.', tipo: 'narracao', tom: 'calmo' },
      { id: 'g1-24', personagem: 'Deus', texto: 'Façamos o homem à nossa imagem, conforme a nossa semelhança.', tipo: 'dialogo', tom: 'solene' },
      { id: 'g1-25', narrador: 'Narrador', texto: 'E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou.', tipo: 'narracao', tom: 'solene' },
      { id: 'g1-26', personagem: 'Deus', texto: 'Frutificai e multiplicai-vos, enchei a terra e sujeitai-a.', tipo: 'dialogo', tom: 'alegre' },
      { id: 'g1-27', narrador: 'Narrador', texto: 'E viu Deus tudo o que tinha feito, e era muito bom. E foi a tarde e a manhã, o sexto dia.', tipo: 'narracao', tom: 'alegre' },
    ],
    personagens: [
      { nome: 'Narrador', cor: '#8B5CF6', corBg: 'rgba(139,92,246,0.1)', voiceId: '21m00Tcm4TlvDq8ikWAM' },
      { nome: 'Deus', cor: '#F59E0B', corBg: 'rgba(245,158,11,0.1)', voiceId: 'pNInz6obpgDQGcFmaJgB' },
    ],
  },
  'sl-23': {
    titulo: 'O Senhor é o Meu Pastor',
    subtitulo: 'Salmos 23',
    cenas: [
      { id: 's23-1', narrador: 'Narrador', texto: 'O Senhor é o meu pastor; nada me faltará.', tipo: 'narracao', tom: 'calmo' },
      { id: 's23-2', narrador: 'Narrador', texto: 'Deitar-me faz em verdes pastos; guia-me mansamente a águas tranquilas.', tipo: 'narracao', tom: 'calmo' },
      { id: 's23-3', narrador: 'Narrador', texto: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.', tipo: 'narracao', tom: 'calmo' },
      { id: 's23-4', narrador: 'Narrador', texto: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.', tipo: 'narracao', tom: 'solene' },
      { id: 's23-5', narrador: 'Narrador', texto: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.', tipo: 'narracao', tom: 'alegre' },
      { id: 's23-6', narrador: 'Narrador', texto: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.', tipo: 'narracao', tom: 'solene' },
    ],
    personagens: [
      { nome: 'Narrador', cor: '#8B5CF6', corBg: 'rgba(139,92,246,0.1)', voiceId: '21m00Tcm4TlvDq8ikWAM' },
    ],
  },
  'jo-1': {
    titulo: 'O Verbo se Fez Carne',
    subtitulo: 'João 1:1-14',
    cenas: [
      { id: 'j1-1', narrador: 'Narrador', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', tipo: 'narracao', tom: 'solene' },
      { id: 'j1-2', narrador: 'Narrador', texto: 'Ele estava no princípio com Deus.', tipo: 'narracao', tom: 'calmo' },
      { id: 'j1-3', narrador: 'Narrador', texto: 'Todas as coisas foram feitas por ele, e nada do que foi feito foi feito sem ele.', tipo: 'narracao', tom: 'calmo' },
      { id: 'j1-4', narrador: 'Narrador', texto: 'Nele estava a vida, e a vida era a luz dos homens.', tipo: 'narracao', tom: 'alegre' },
      { id: 'j1-5', narrador: 'Narrador', texto: 'E a luz resplandece nas trevas, e as trevas não prevaleceram contra ela.', tipo: 'narracao', tom: 'intenso' },
      { id: 'j1-6', narrador: 'Narrador', texto: 'Houve um homem enviado de Deus, cujo nome era João.', tipo: 'narracao', tom: 'calmo' },
      { id: 'j1-7', narrador: 'Narrador', texto: 'Este veio para testemunho, para que testemunhasse da luz, para que todos cressem por ele.', tipo: 'narracao', tom: 'calmo' },
      { id: 'j1-8', narrador: 'Narrador', texto: 'Ele não era a luz, mas veio para que testemunhasse da luz.', tipo: 'narracao', tom: 'calmo' },
      { id: 'j1-9', narrador: 'Narrador', texto: 'Aquela era a luz verdadeira, que alumia a todo homem que vem ao mundo.', tipo: 'narracao', tom: 'alegre' },
      { id: 'j1-10', narrador: 'Narrador', texto: 'Estava no mundo, e o mundo foi feito por ele, e o mundo não o conheceu.', tipo: 'narracao', tom: 'triste' },
      { id: 'j1-11', narrador: 'Narrador', texto: 'Veio para os que eram seus, e os seus não o receberam.', tipo: 'narracao', tom: 'triste' },
      { id: 'j1-12', narrador: 'Narrador', texto: 'Mas, quantos o receberam, deu-lhes o poder de serem filhos de Deus, aos que creem no seu nome.', tipo: 'narracao', tom: 'alegre' },
      { id: 'j1-13', narrador: 'Narrador', texto: 'Os quais não nasceram do sangue, nem da vontade da carne, nem da vontade do homem, mas de Deus.', tipo: 'narracao', tom: 'solene' },
      { id: 'j1-14', narrador: 'Narrador', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glória do unigênito do Pai, cheio de graça e de verdade.', tipo: 'narracao', tom: 'solene' },
    ],
    personagens: [
      { nome: 'Narrador', cor: '#8B5CF6', corBg: 'rgba(139,92,246,0.1)', voiceId: '21m00Tcm4TlvDq8ikWAM' },
    ],
  },
  'mt-27': {
    titulo: 'A Crucificação de Jesus',
    subtitulo: 'Mateus 27',
    cenas: [
      { id: 'm27-1', narrador: 'Narrador', texto: 'Então Pilatos tomou água e lavou as mãos diante da multidão, dizendo: Estou inocente do sangue deste justo.', tipo: 'narracao', tom: 'triste' },
      { id: 'm27-2', narrador: 'Narrador', texto: 'E crucificaram-no, e repartiram entre si as suas vestes, lançando sortes; para que se cumprisse o que foi dito pelo profeta.', tipo: 'narracao', tom: 'solene' },
      { id: 'm27-3', personagem: 'Jesus', texto: 'Deus meu, Deus meu, por que me desamparaste?', tipo: 'dialogo', tom: 'triste' },
      { id: 'm27-4', narrador: 'Narrador', texto: 'Alguns dos que passavam ali zombavam dele, dizendo: Tu que destróis o templo e em três dias o edificas, salva-te a ti mesmo.', tipo: 'narracao', tom: 'intenso' },
      { id: 'm27-5', personagem: 'Jesus', texto: 'Tenho sede.', tipo: 'dialogo', tom: 'triste' },
      { id: 'm27-6', narrador: 'Narrador', texto: 'Imediatamente um deles, correndo, tomou uma esponja, encheu-a de vinagre, e pondo-a num caniço, dava-lhe de beber.', tipo: 'narracao', tom: 'calmo' },
      { id: 'm27-7', personagem: 'Jesus', texto: 'Tudo está consumado.', tipo: 'dialogo', tom: 'solene' },
      { id: 'm27-8', narrador: 'Narrador', texto: 'E, inclinando Jesus a cabeça, rendeu o espírito.', tipo: 'narracao', tom: 'solene' },
      { id: 'm27-9', narrador: 'Narrador', texto: 'E eis que o véu do templo se rasgou em dois, de cima abaixo; e a terra tremeu, e as pedras se fenderam.', tipo: 'narracao', tom: 'intenso' },
      { id: 'm27-10', narrador: 'Narrador', texto: 'E os túmulos se abriram; e muitos corpos dos santos que dormiam ressuscitaram.', tipo: 'narracao', tom: 'alegre' },
      { id: 'm27-11', narrador: 'Narrador', texto: 'E, saindo dos túmulos, depois da ressurreição dele, entraram na santa cidade e apareceram a muitos.', tipo: 'narracao', tom: 'alegre' },
      { id: 'm27-12', narrador: 'Narrador', texto: 'O centurião e os que com ele guardavam a Jesus, vendo o terremoto e o que se passava, tiveram grande medo, dizendo: Verdadeiramente este era Filho de Deus.', tipo: 'narracao', tom: 'solene' },
    ],
    personagens: [
      { nome: 'Narrador', cor: '#8B5CF6', corBg: 'rgba(139,92,246,0.1)', voiceId: '21m00Tcm4TlvDq8ikWAM' },
      { nome: 'Jesus', cor: '#F59E0B', corBg: 'rgba(245,158,11,0.1)', voiceId: 'pNInz6obpgDQGcFmaJgB' },
    ],
  },
};

export default function BibliaPage() {
  const [livroIdx, setLivroIdx] = useState(0);
  const [capituloIdx, setCapituloIdx] = useState(0);
  const [selectedTrads, setSelectedTrads] = useState<string[]>(['arc', 'nvi']);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [data, setData] = useState<CapituloComparado[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [chapterGridOpen, setChapterGridOpen] = useState(false);
  const [studyPanel, setStudyPanel] = useState<'notas' | 'strong' | 'anotacoes' | 'historico' | 'comentarios' | null>(null);
  const [anotandoVersiculo, setAnotandoVersiculo] = useState<string | null>(null);
  const [anotacaoTexto, setAnotacaoTexto] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [readingHistory, setReadingHistory] = useState<Array<{livro: string, capitulo: number, data: Date}>>([]);
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);
  const [readingMode, setReadingMode] = useState(false);
  const [showDiff, setShowDiff] = useState(true);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const [comentarioVersiculo, setComentarioVersiculo] = useState<number | null>(null);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [quickSearchResults, setQuickSearchResults] = useState<Array<{livro: string, nome: string, cap: number, versiculo: number, texto: string, traducao: string}>>([]);
  const [chapterDirection, setChapterDirection] = useState<'next' | 'prev'>('next');
  const [selectedCrossRef, setSelectedCrossRef] = useState<{verse: number; refs: string[]} | null>(null);
  const [estudoAberto, setEstudoAberto] = useState<number | null>(null);
  const [showPlan, setShowPlan] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { isFavorito, refresh } = useEstudos();
  const audio = useVerseAudio();
  const audioNatural = useAudioNatural();
  const flashcards = useFlashcards();
  const [colorPickerVerse, setColorPickerVerse] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<ReturnType<typeof getStats> | null>(null);
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<{livro: string, cap: number, ver: number} | null>(null);
  const [mostrarNotas, setMostrarNotas] = useState(false);
  const [notaAtiva, setNotaAtiva] = useState<import('@/components/NotaEditor').Nota | null>(null);
  const { notas, criarNota, salvarNota: salvarNotaHook, excluirNota } = useNotas();
  const [mostrarNarracao, setMostrarNarracao] = useState(false);

  const livro = TODOS_LIVROS[livroIdx];
  const chaveDramatica = `${livro.abreviacao}-${capituloIdx + 1}`;
  const passagemDramatica = PASSAGENS_DRAMATICAS[chaveDramatica];

  const capituloAudio = useAudioCapitulo(
    livro.abreviacao,
    capituloIdx + 1,
    data[0]?.versiculos?.map(v => ({ numero: v.numero, texto: v.texto })) ?? []
  );

  const loadChapter = useCallback(async () => {
    setLoading(true);
    const livroAbrev = livro.abreviacao;
    const cap = capituloIdx + 1;
    if (!isOnline()) {
      const cached = selectedTrads.map(trad => {
        const verses = getCachedChapter(livroAbrev, cap, trad);
        if (!verses || verses.length === 0) return null;
        return { traducao: trad, versiculos: verses.map((t, i) => ({ numero: i + 1, texto: t })) };
      }).filter(Boolean) as CapituloComparado[];
      if (cached.length > 0) { setData(cached); setLoading(false); return; }
    }
    const result = await carregarMulti(livroAbrev, cap, selectedTrads);
    setData(result);
    for (const item of result) {
      cacheChapter(livroAbrev, cap, item.traducao, item.versiculos.map(v => v.texto));
    }
    setLoading(false);
    recordReading(livroAbrev, cap);
    setStatsData(getStats());
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setReadingHistory(prev => {
      const newHistory = [{ livro: livroAbrev, capitulo: cap, data: new Date() }, ...prev];
      return newHistory.slice(0, 20);
    });
  }, [livro.abreviacao, capituloIdx, selectedTrads]);

  useEffect(() => { loadChapter(); }, [loadChapter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const livroParam = params.get('livro');
    const capituloParam = params.get('capitulo');
    const tradsParam = params.get('trads');
    if (livroParam) {
      const idx = TODOS_LIVROS.findIndex((l) => l.abreviacao === livroParam);
      if (idx >= 0) { setLivroIdx(idx); if (capituloParam) setCapituloIdx(Number(capituloParam) - 1); }
    }
    if (tradsParam) {
      const t = tradsParam.split(',').filter((x) => (TRAD_IDS as readonly string[]).includes(x));
      if (t.length > 0) setSelectedTrads(t);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('livro', livro.abreviacao);
    params.set('capitulo', String(capituloIdx + 1));
    params.set('trads', selectedTrads.join(','));
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [livro.abreviacao, capituloIdx, selectedTrads]);

  const [quickSearchAutoComplete, setQuickSearchAutoComplete] = useState<Array<{livro: string; nome: string}>>([]);
  const [recentSearches, setRecentSearches] = useState<Array<{query: string; livro: string; nome: string; cap: number; versiculo: number}>>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ssb_recent_searches');
      if (raw) setRecentSearches(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setQuickSearchOpen(p => !p); return; }
      if (quickSearchOpen && e.key === 'Escape') { setQuickSearchOpen(false); return; }
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
      if (e.key === '/') { e.preventDefault(); setQuickSearchOpen(true); return; }
      if (e.key === 'ArrowLeft' && capituloIdx > 0) { e.preventDefault(); setChapterDirection('prev'); setCapituloIdx(p => Math.max(0, p - 1)); }
      else if (e.key === 'ArrowRight' && livro && capituloIdx < livro.totalCapitulos - 1) { e.preventDefault(); setChapterDirection('next'); setCapituloIdx(p => p + 1); }
      else       if (e.key === 'Escape') { setSidebarOpen(false); setMobileMenu(false); setChapterGridOpen(false); setColorPickerVerse(null); setMostrarNarracao(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [capituloIdx, livro, quickSearchOpen]);

  useEffect(() => {
    const handler = () => setColorPickerVerse(null);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const toggleTrad = (id: string) => setSelectedTrads(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  const handleQuickSearch = useCallback(async (q: string) => {
    setQuickSearchQuery(q);
    const query = q.toLowerCase().trim();

    // Autocomplete: match books
    if (query.length > 0) {
      const books = TODOS_LIVROS
        .filter(l => l.nome.toLowerCase().includes(query) || l.abreviacao.toLowerCase().includes(query))
        .slice(0, 5)
        .map(l => ({ livro: l.abreviacao, nome: l.nome }));
      setQuickSearchAutoComplete(books);
    } else {
      setQuickSearchAutoComplete([]);
    }

    if (q.length < 2) { setQuickSearchResults([]); return; }
    const results: Array<{livro: string, nome: string, cap: number, versiculo: number, texto: string, traducao: string}> = [];
    const d = await carregarTraducao('arc');
    for (const l of TODOS_LIVROS) {
      if (results.length >= 30) break;
      const bookData = d[l.abreviacao];
      if (!bookData) continue;
      for (const cap of Object.keys(bookData)) {
        if (results.length >= 30) break;
        const versos = bookData[Number(cap)];
        if (!versos) continue;
        for (let i = 0; i < versos.length; i++) {
          if (versos[i].toLowerCase().includes(query)) {
            results.push({ livro: l.abreviacao, nome: l.nome, cap: Number(cap), versiculo: i + 1, texto: versos[i], traducao: 'ARC' });
            break;
          }
        }
      }
    }
    setQuickSearchResults(results);
  }, []);

  const goToQuickResult = (r: { livro: string; nome: string; cap: number; versiculo?: number }) => {
    const idx = TODOS_LIVROS.findIndex(l => l.abreviacao === r.livro);
    if (idx >= 0) {
      // Save to recent searches
      const entry = { query: quickSearchQuery, livro: r.livro, nome: r.nome, cap: r.cap, versiculo: r.versiculo || 1 };
      setRecentSearches(prev => {
        const next = [entry, ...prev.filter(s => s.livro !== r.livro || s.cap !== r.cap)].slice(0, 5);
        try { localStorage.setItem('ssb_recent_searches', JSON.stringify(next)); } catch {}
        return next;
      });
      setLivroIdx(idx);
      setCapituloIdx(r.cap - 1);
      setQuickSearchOpen(false);
      setQuickSearchQuery('');
      setQuickSearchResults([]);
      setQuickSearchAutoComplete([]);
    }
  };

  const livrosFiltrados = useMemo(() => searchQuery
    ? TODOS_LIVROS.filter(l => l.nome.toLowerCase().includes(searchQuery.toLowerCase()) || l.abreviacao.toLowerCase().includes(searchQuery.toLowerCase()))
    : TODOS_LIVROS, [searchQuery]);

  const temDados = data.length > 0 && data.some(d => d.versiculos.length > 0);
  const maxVersiculos = temDados ? Math.max(...data.map(d => d.versiculos.length)) : 0;

  const goToBook = (idx: number) => { setLivroIdx(idx); setCapituloIdx(0); setMobileMenu(false); setChapterGridOpen(false); };

  const changeChapter = (newIdx: number) => {
    setChapterDirection(newIdx > capituloIdx ? 'next' : 'prev');
    setCapituloIdx(newIdx);
  };

  const copyVerse = async (text: string, reference: string) => {
    await navigator.clipboard.writeText(`${reference}\n${text}`);
    setCopiedVerse(reference);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const shareVerse = async (text: string, reference: string) => {
    if (navigator.share) await navigator.share({ title: reference, text: `${reference}\n\n${text}` });
  };

  const chapterAnimProps = {
    initial: { opacity: 0, x: chapterDirection === 'next' ? 40 : -40, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: chapterDirection === 'next' ? -40 : 40, filter: 'blur(4px)' },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <OfflineBanner />
      <main id="main-content" className="pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} hidden lg:block border-r border-[var(--border)] bg-[var(--card-bg)] transition-all duration-300 overflow-hidden shrink-0`}>
            <div className="p-4 h-full flex flex-col">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
                <input type="text" placeholder="Buscar livro..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-300" />
              </div>
              <div className="flex gap-1 mb-3">
                {(['AT', 'NT'] as const).map(test => (
                  <button key={test} className="flex-1 text-[11px] font-semibold py-1.5 rounded-md bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--fg)] transition-all duration-300">
                    {test === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto space-y-0.5">
                {livrosFiltrados.map((l) => {
                  const idx = TODOS_LIVROS.indexOf(l);
                  return (
                    <button key={l.abreviacao} onClick={() => goToBook(idx)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-300 flex items-center gap-2 group ${
                        idx === livroIdx ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'
                      }`}>
                      <span className="truncate">{l.nome}</span>
                      <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-50 transition-opacity duration-300">{l.totalCapitulos}c</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <div className="border-b border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block p-1.5 rounded-lg hover:bg-[var(--bg)] transition-all duration-300" aria-label={sidebarOpen ? 'Fechar barra lateral' : 'Abrir barra lateral'} aria-expanded={sidebarOpen}>
                  <Menu className="w-4 h-4" />
                </button>
                <button onClick={() => setMobileMenu(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--bg)]" aria-label="Abrir menu de livros">
                  <Menu className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button onClick={() => changeChapter(Math.max(0, capituloIdx - 1))} disabled={capituloIdx === 0}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg)] disabled:opacity-50 transition-all duration-300 hover:scale-110"
                    aria-label="Capítulo anterior">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="text-sm font-semibold min-w-[140px] text-center">
                    {livro.nome} <span className="text-[var(--primary)]">{capituloIdx + 1}</span>
                    <span className="text-[var(--muted-fg)] font-normal"> / {livro.totalCapitulos}</span>
                  </div>
                  <button onClick={() => changeChapter(Math.min(livro.totalCapitulos - 1, capituloIdx + 1))}
                    disabled={capituloIdx >= livro.totalCapitulos - 1}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg)] disabled:opacity-50 transition-all duration-300 hover:scale-110"
                    aria-label="Próximo capítulo">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1" />

                <div className="hidden sm:flex items-center gap-1">
                  {TRAD_IDS.map(id => {
                    const active = selectedTrads.includes(id);
                    return (
                      <motion.button key={id} onClick={() => toggleTrad(id)} title={nomeMap[id]}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all duration-300 ${
                          active ? `${tradBadgeColors[id]} shadow-sm` : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'
                        }`}
                        aria-label={`${active ? 'Desativar' : 'Ativar'} tradução ${labelMap[id]}`}
                        aria-pressed={active}>
                        {labelMap[id]}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1">
                  {selectedTrads.length > 1 && (
                    <div className="hidden sm:flex items-center gap-0.5 border-l border-[var(--border)] pl-2 ml-1">
                      {([
                        { mode: 'single' as ViewMode, icon: AlignJustify, label: 'Única' },
                        { mode: 'parallel' as ViewMode, icon: Columns2, label: 'Lado a lado' },
                        { mode: 'comparison' as ViewMode, icon: LayoutList, label: 'Comparação' },
                      ]).map(({ mode, icon: Icon, label }) => (
                        <motion.button key={mode} onClick={() => setViewMode(mode)} title={label}
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className={`p-1.5 rounded-md transition-all duration-300 ${viewMode === mode ? 'bg-primary text-primary-foreground' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'}`}
                          aria-label={`Visualização ${label}`}
                          aria-pressed={viewMode === mode}>
                          <Icon className="w-3.5 h-3.5" />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  <motion.button onClick={() => setReadingMode(!readingMode)} title="Modo leitura"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`p-1.5 rounded-md transition-all duration-300 ${readingMode ? 'bg-primary text-primary-foreground' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'}`}
                    aria-label={readingMode ? 'Sair do modo leitura' : 'Ativar modo leitura'}
                    aria-pressed={readingMode}>
                    {readingMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      if (!mostrarNotas && !notaAtiva) {
                        const nova = criarNota(`${livro.nome} ${capituloIdx + 1}`);
                        setNotaAtiva(nova);
                      }
                      setMostrarNotas(!mostrarNotas);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-1.5 rounded-md transition-all duration-300 ${mostrarNotas ? 'bg-primary text-primary-foreground' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'}`}
                    title="Minhas Anotações"
                    aria-label="Minhas Anotações"
                    aria-pressed={mostrarNotas}
                  >
                    <FileText className="w-4 h-4" />
                  </motion.button>

                  <motion.button onClick={() => data.length > 0 && exportChapterPdf(livro.nome, capituloIdx + 1, data)}
                    title="Exportar PDF" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="p-1.5 rounded-md text-[var(--muted-fg)] hover:bg-[var(--bg)] transition-all duration-300"
                    aria-label="Exportar capítulo em PDF">
                    <Download className="w-4 h-4" />
                  </motion.button>

                  <motion.button onClick={() => setShowPlan(!showPlan)} title="Plano de Leitura"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`p-1.5 rounded-md transition-all duration-300 ${showPlan ? 'bg-primary text-primary-foreground' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'}`}
                    aria-label="Plano de Leitura"
                    aria-pressed={showPlan}>
                    <BookMarked className="w-4 h-4" />
                  </motion.button>

                  {passagemDramatica && (
                    <motion.button
                      onClick={() => setMostrarNarracao(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 rounded-md text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                      title="Narração Dramática"
                      aria-label="Ouvir narração dramática"
                    >
                      <Music className="w-4 h-4" />
                    </motion.button>
                  )}

                  <motion.button onClick={() => setShowSettings(!showSettings)} title="Configurações"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="p-1.5 rounded-md text-[var(--muted-fg)] hover:bg-[var(--bg)] transition-all duration-300"
                    aria-label="Configurações de exibição"
                    aria-expanded={showSettings}>
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {showSettings && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-[var(--border)] flex items-center gap-4 flex-wrap"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[var(--muted-fg)]">Tamanho:</span>
                    <button onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="p-1 rounded hover:bg-[var(--bg)] transition-all duration-200 hover:scale-110" aria-label="Diminuir tamanho da fonte"><Minus className="w-3 h-3" /></button>
                    <span className="text-xs font-mono w-6 text-center" aria-live="polite">{fontSize}</span>
                    <button onClick={() => setFontSize(Math.min(28, fontSize + 1))} className="p-1 rounded hover:bg-[var(--bg)] transition-all duration-200 hover:scale-110" aria-label="Aumentar tamanho da fonte"><Plus className="w-3 h-3" /></button>
                  </div>
                  {viewMode === 'comparison' && data.length >= 2 && (
                    <button onClick={() => setShowDiff(!showDiff)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-300 ${showDiff ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20' : 'text-[var(--muted-fg)] border-[var(--border)]'}`}>
                      Diferenças
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Stats bar */}
            {statsData && !readingMode && (
              <div className="border-b border-[var(--border)]/30 bg-[var(--card-bg)]/50 px-4 py-2">
                <div className="max-w-4xl mx-auto flex items-center gap-4 text-[11px] text-[var(--muted-fg)]">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Sequência: <strong className="text-[var(--fg)]">{statsData.streak}d</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Semana: <strong className="text-[var(--fg)]">{statsData.chaptersThisWeek} cap.</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Total: <strong className="text-[var(--fg)]">{statsData.totalChapters} cap.</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Gradient separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />

            {/* Reading area */}
            <div ref={mainRef} className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {showPlan && !readingMode && <ReadingPlanBanner />}
                {loading ? (
                  <div className="space-y-6 chapter-enter">
                    <div className="skeleton skeleton-title w-48 mx-auto animate-pulse" />
                    <div className="ornament w-20 mx-auto mb-8 opacity-30" />
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="flex gap-3 items-center" style={{ animationDelay: `${i * 50}ms` }}>
                        <div className="skeleton skeleton-text w-6 h-4 shrink-0 rounded" />
                        <div className="skeleton skeleton-text flex-1 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                      </div>
                    ))}
                  </div>
                ) : temDados ? (
                  <AnimatePresence mode="wait">
                    <motion.div key={`${livro.abreviacao}-${capituloIdx}`} {...chapterAnimProps}>
                      {readingMode ? (
                        <div className="max-w-[680px] mx-auto chapter-enter">
                          <div className="text-center mb-14 relative">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="mb-4"
                            >
                              <div className="inline-block px-6 py-1.5 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10 mb-4">
                                <span className="text-xs font-medium text-[var(--primary)]/70 tracking-widest uppercase">Capítulo {capituloIdx + 1}</span>
                              </div>
                            </motion.div>
                            <motion.h2 
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="font-display text-4xl md:text-5xl font-light text-[var(--primary)] mb-3"
                            >
                              {livro.nome}
                            </motion.h2>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                              className="text-[var(--muted-fg)] text-sm"
                            >
                              {data[0]?.versiculos?.length} versículos
                            </motion.p>
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                              className="ornament w-20 mx-auto mt-6 origin-center"
                            />
                          </div>
                          {data[0]?.versiculos.map((v, i) => (
                            <motion.p 
                              key={v.numero} 
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + i * 0.025, ease: 'easeOut' }}
                              className="font-serif-body leading-[2] mb-1 verse-hover pl-4 group cursor-pointer hover:bg-[var(--primary)]/5 hover:rounded-lg transition-all duration-300 -mx-4 px-4"
                            >
                              <sup className="text-[var(--primary)]/40 font-bold text-xs mr-1.5 select-none group-hover:text-[var(--primary)]/70 transition-colors duration-300">{v.numero}</sup>
                              {v.texto}
                            </motion.p>
                          ))}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 + (data[0]?.versiculos?.length ?? 0) * 0.025 }}
                          >
                            <div className="ornament w-20 mx-auto mt-12 mb-6" />
                            <p className="text-center text-xs text-[var(--muted-fg)] tracking-wide">{labelMap[data[0]?.traducao || 'arc']} — {livro.nome} {capituloIdx + 1}</p>
                          </motion.div>
                        </div>
                      ) : (
                        <>
                          {!readingMode && data[0]?.versiculos && data[0].versiculos.length > 0 && (
                            <div className="mb-6">
                              <motion.button
                                onClick={() => {
                                  if (capituloAudio.state.isPlaying || capituloAudio.state.isPaused) {
                                    capituloAudio.stop();
                                  } else {
                                    capituloAudio.play();
                                  }
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                  capituloAudio.state.isPlaying
                                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg shadow-[var(--primary)]/20'
                                    : capituloAudio.state.isPaused
                                    ? 'bg-[var(--primary)]/80 text-[var(--primary-foreground)] shadow-md'
                                    : 'bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 border border-[var(--primary)]/20'
                                }`}
                                aria-label={capituloAudio.state.isPlaying ? 'Pausar áudio do capítulo' : capituloAudio.state.isPaused ? 'Continuar áudio do capítulo' : 'Ouvir capítulo em áudio'}
                                aria-pressed={capituloAudio.state.isPlaying}
                              >
                                {capituloAudio.state.isLoading ? (
                                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : capituloAudio.state.isPlaying ? (
                                  <span className="flex gap-0.5">
                                    <span className="w-1 h-3 bg-current rounded-full" />
                                    <span className="w-1 h-3 bg-current rounded-full" />
                                  </span>
                                ) : (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                )}
                                {capituloAudio.state.isPlaying
                                  ? `Ouvindo${capituloAudio.state.currentVerseIndex >= 0 ? ` — v.${data[0].versiculos[capituloAudio.state.currentVerseIndex]?.numero ?? ''}` : ''}`
                                  : capituloAudio.state.isPaused
                                  ? 'Pausado'
                                  : 'Ouvir Capítulo'}
                              </motion.button>
                            </div>
                          )}
                          {viewMode === 'single' && data.map((item, idx) => (
                            <div key={item.traducao} className="mb-8">
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]/50"
                              >
                                <div className={`w-2 h-2 rounded-full ${tradBadgeColors[item.traducao]}`} />
                                <span className="text-sm font-semibold">{labelMap[item.traducao]}</span>
                                <span className="text-xs text-[var(--muted-fg)]">{nomeMap[item.traducao]}</span>
                              </motion.div>
                              <div className="space-y-1">
                                {item.versiculos.map((v, i) => {
                                  const key = `${livro.abreviacao}:${capituloIdx + 1}:${v.numero}:${item.traducao}`;
                                  const fav = isFavorito(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                                  const ref = `${livro.nome} ${capituloIdx + 1}:${v.numero}`;
                                  const isPlaying = audio.isVersePlaying(v.numero);
                                  const estudoInline = estudoAberto === v.numero;
                                  const marca = obterMarca(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                                  const temAnotacao = marca?.anotacao?.texto && marca.anotacao.texto.length > 0;
                                  const flashKey = `${livro.abreviacao}:${capituloIdx + 1}:${v.numero}:${item.traducao}`;
                                  const isFlashcard = flashcards.cards.find(c => c.verseKey === flashKey);
                                  const marcaMarcador = getMarcador(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao);
                                  const corMarca = marcaMarcador?.cor ?? null;
                                  return (
                                    <Fragment key={v.numero}>
                                      <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.01 }}
                                        className={`group flex items-start gap-2 py-1.5 px-2 -mx-2 rounded-lg transition-all duration-300 cursor-pointer ${isPlaying ? 'bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]/20 shadow-sm shadow-[var(--primary)]/5 border-l-2 border-l-[var(--primary)]' : 'verse-hover'} ${temAnotacao ? 'border-l-2 border-l-amber-500/50' : ''} ${corMarca ? `mark-${corMarca}-bg` : ''}`}
                                        onClick={() => setVersiculoSelecionado({ livro: livro.abreviacao, cap: capituloIdx + 1, ver: v.numero })}
                                      >
                                        <sup className="text-[var(--primary)] font-bold text-xs mt-1 select-none min-w-[20px] text-right relative">
                                          {v.numero}
                                          {corMarca && (
                                            <span className={`absolute -top-0.5 -right-1.5 w-1.5 h-1.5 rounded-full ${
                                              corMarca === 'yellow' ? 'bg-yellow-400' :
                                              corMarca === 'green' ? 'bg-green-400' :
                                              corMarca === 'blue' ? 'bg-blue-400' :
                                              corMarca === 'pink' ? 'bg-pink-400' :
                                              corMarca === 'orange' ? 'bg-orange-400' : 'bg-purple-400'
                                            }`} />
                                          )}
                                        </sup>
                                        <div className="flex-1">
                                          <p className="font-serif-body leading-relaxed" style={{ fontSize: `${fontSize}px` }}>{v.texto}</p>
                                          {(() => {
                                            const recursos = getTiposRecursoDisponiveis(livro.abreviacao, capituloIdx + 1, v.numero);
                                            if (recursos.length === 0) return null;
                                            return (
                                              <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium" title={`${recursos.length} recurso(s) disponível(eis)`}>
                                                  {recursos.length} recurso{recursos.length !== 1 ? 's' : ''}
                                                </span>
                                              </div>
                                            );
                                          })()}
                                          {(() => {
                                            const refs = getCrossReferences(livro.abreviacao, capituloIdx + 1, v.numero);
                                            if (refs.length === 0) return null;
                                            return (
                                              <div className="mt-1 flex items-center gap-1 flex-wrap">
                                                <span className="text-[10px] text-[var(--muted-fg)]">🔗</span>
                                                {refs.slice(0, 3).map(ref => {
                                                  const parts = ref.split(':');
                                                  const book = parts[0];
                                                  const cap = parts[1];
                                                  return (
                                                    <Link key={ref} href={`/biblia?livro=${book}&capitulo=${cap}`}
                                                       className="text-[10px] text-[var(--primary)] hover:underline opacity-80 hover:opacity-100 transition-opacity">
                                                      {ref}
                                                    </Link>
                                                  );
                                                })}
                                                {refs.length > 3 && (
                                                  <span className="text-[10px] text-[var(--muted-fg)]">+{refs.length - 3}</span>
                                                )}
                                              </div>
                                            );
                                          })()}
                                        </div>
                                        <div className="flex items-center gap-0.5 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                                          <VersiculoAudioNatural
                                            text={v.texto}
                                            verseNumber={v.numero}
                                            isCurrentlyPlaying={audioNatural.state.isPlaying}
                                            isLoading={audioNatural.state.isLoading}
                                            engine={audioNatural.state.engine}
                                            onPlay={(num, txt) => {
                                              audioNatural.play(txt);
                                            }}
                                            onStop={() => {
                                              audioNatural.stop();
                                            }}
                                            onSpeedChange={(s) => audioNatural.setSpeed(s)}
                                            currentSpeed={audioNatural.state.speed}
                                          />
                                          <CompartilharVersiculo
                                            livro={livro.nome}
                                            capítulo={capituloIdx + 1}
                                            versículo={v.numero}
                                            texto={v.texto}
                                          />
                                          <div className="relative">
                                            <motion.button
                                              onClick={() => setColorPickerVerse(colorPickerVerse === key ? null : key)}
                                              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                              className={`p-1 rounded-md transition-all duration-200 ${corMarca ? 'text-[var(--primary)] bg-[var(--primary)]/10 shadow-sm' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'}`}
                                              title="Marcar cor"
                                              aria-label={`Marcar versículo ${v.numero} com cor`}
                                              aria-expanded={colorPickerVerse === key}
                                            >
                                              <Palette className="w-3.5 h-3.5" />
                                            </motion.button>
                                            {colorPickerVerse === key && (
                                              <div className="absolute right-0 top-full mt-1 z-50 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-xl p-2 flex gap-1"
                                                onClick={e => e.stopPropagation()}>
                                                {CORES.map(cor => {
                                                  const ativa = corMarca === cor;
                                                  const corMap: Record<string, string> = {
                                                    yellow: 'bg-yellow-400', green: 'bg-green-400', blue: 'bg-blue-400',
                                                    pink: 'bg-pink-400', orange: 'bg-orange-400', purple: 'bg-purple-400',
                                                  };
                                                  return (
                                                    <motion.button
                                                      key={cor}
                                                      whileHover={{ scale: 1.2 }}
                                                      whileTap={{ scale: 0.9 }}
                                                      onClick={() => {
                                                        if (ativa) { removeMarcador(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao); }
                                                        else { setMarcador(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao, cor); }
                                                        setColorPickerVerse(null);
                                                      }}
                                                      className={`w-5 h-5 rounded-full ${corMap[cor]} ${ativa ? 'ring-2 ring-offset-1 ring-primary' : ''} transition-all duration-200`}
                                                      title={cor}
                                                    />
                                                  );
                                                })}
                                              </div>
                                            )}
                                          </div>
                                          <motion.button onClick={() => { toggleFavorito(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao, v.texto); refresh(); }}
                                            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                            className={`p-1 rounded-md transition-all duration-200 ${fav ? 'text-red-400 bg-red-500/10 shadow-sm' : 'text-[var(--muted-fg)] hover:text-red-400 hover:bg-red-500/5'}`}
                                            aria-label={fav ? `Remover versículo ${v.numero} dos favoritos` : `Adicionar versículo ${v.numero} aos favoritos`}
                                            aria-pressed={fav}>
                                            <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-current' : ''}`} />
                                          </motion.button>
                                          <motion.button onClick={() => { const m = obterMarca(livro.abreviacao, capituloIdx + 1, v.numero, item.traducao); setAnotandoVersiculo(key); setAnotacaoTexto(m?.anotacao?.texto || ''); }}
                                            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                            className="p-1 rounded-md text-[var(--muted-fg)] hover:text-amber-400 hover:bg-amber-500/5 transition-all duration-200"
                                            aria-label={`Anotar versículo ${v.numero}`}>
                                            <StickyNote className="w-3.5 h-3.5" />
                                          </motion.button>
                                          <motion.button onClick={() => copyVerse(v.texto, ref)} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                            className="p-1 rounded-md text-[var(--muted-fg)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all duration-200"
                                            aria-label={copiedVerse === ref ? `Versículo ${v.numero} copiado` : `Copiar versículo ${v.numero}`}>
                                            {copiedVerse === ref ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                          </motion.button>
                                          <motion.button onClick={() => shareVerse(v.texto, ref)} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                            className="p-1 rounded-md text-[var(--muted-fg)] hover:text-sky-400 hover:bg-sky-500/5 transition-all duration-200"
                                            aria-label={`Compartilhar versículo ${v.numero}`}>
                                            <Share2 className="w-3.5 h-3.5" />
                                          </motion.button>
                                            {temComentario(livro.abreviacao, capituloIdx + 1, v.numero) && (
                                              <motion.button onClick={() => { setComentarioVersiculo(v.numero); setStudyPanel('comentarios'); }}
                                                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                                className="p-1 rounded-md text-amber-400 hover:bg-amber-500/10 transition-all duration-200"
                                                aria-label={`Ver comentário do versículo ${v.numero}`}>
                                                <BookOpen className="w-3.5 h-3.5" />
                                              </motion.button>
                                            )}
                                          {temAnotacao && (
                                            <span className="flex items-center" title="Anotação salva">
                                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            </span>
                                          )}
                                            {temEstudo(livro.abreviacao, capituloIdx + 1, v.numero) && (
                                              <motion.button onClick={() => setEstudoAberto(estudoInline ? null : v.numero)}
                                                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                                className={`p-1 rounded-md transition-all duration-200 ${estudoInline ? 'text-purple-400 bg-purple-500/15 shadow-sm' : 'text-purple-400 hover:bg-purple-500/10'}`}
                                                title="Estudos Teológicos"
                                                aria-label={`Estudos teológicos do versículo ${v.numero}`}
                                                aria-expanded={estudoInline}>
                                                <GraduationCap className="w-3.5 h-3.5" />
                                              </motion.button>
                                            )}
                                          <motion.button
                                            onClick={() => { isFlashcard ? flashcards.removeCard(flashKey) : flashcards.addCard(flashKey); }}
                                            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                            className={`p-1 rounded-md transition-all duration-200 ${isFlashcard ? 'text-cyan-400 bg-cyan-500/15 shadow-sm' : 'text-[var(--muted-fg)] hover:text-cyan-400 hover:bg-cyan-500/5'}`}
                                            title={isFlashcard ? 'Remover flashcard' : 'Adicionar flashcard'}
                                            aria-label={isFlashcard ? `Remover versículo ${v.numero} dos flashcards` : `Adicionar versículo ${v.numero} aos flashcards`}
                                            aria-pressed={!!isFlashcard}>
                                            <Brain className="w-3.5 h-3.5" />
                                          </motion.button>
                                        </div>
                                      </motion.div>

                                      {/* Inline study panel */}
                                      <AnimatePresence>
                                        {estudoInline && (
                                          <Suspense fallback={<PanelFallback />}>
                                            <PainelEstudosInline
                                              livro={livro.abreviacao}
                                              capitulo={capituloIdx + 1}
                                              versiculo={v.numero}
                                              nomeLivro={livro.nome}
                                              onClose={() => setEstudoAberto(null)}
                                            />
                                          </Suspense>
                                        )}
                                      </AnimatePresence>
                                    </Fragment>
                                  );
                                })}
                              </div>
                            </div>
                          ))}

                          {viewMode === 'parallel' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {data.map((item, idx) => (
                                <motion.div 
                                  key={item.traducao} 
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.15 }}
                                  className="border border-[var(--border)]/50 rounded-xl p-5 hover:shadow-md transition-shadow duration-300"
                                >
                                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]/30">
                                    <div className={`w-2 h-2 rounded-full ${tradBadgeColors[item.traducao]}`} />
                                    <span className="text-sm font-semibold">{labelMap[item.traducao]}</span>
                                  </div>
                                  {item.versiculos.map(v => (
                                    <p key={v.numero} className="mb-1.5 leading-relaxed font-serif-body" style={{ fontSize: `${fontSize - 2}px` }}>
                                      <sup className="text-[var(--primary)] font-bold text-[10px] mr-1 select-none">{v.numero}</sup>
                                      {v.texto}
                                    </p>
                                  ))}
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {viewMode === 'comparison' && data.length >= 2 && (
                            <div className="border border-[var(--border)]/50 rounded-xl overflow-x-auto">
                              <div className="bg-[var(--bg)] px-4 py-2 border-b border-[var(--border)]/30 flex items-center justify-between">
                                <span className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Comparação</span>
                                <button onClick={() => setShowDiff(!showDiff)}
                                  className={`text-[11px] px-2.5 py-1 rounded-full transition-all duration-300 ${showDiff ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'text-[var(--muted-fg)]'}`}
                                  aria-label={showDiff ? 'Ocultar diferenças' : 'Mostrar diferenças'}
                                  aria-pressed={showDiff}>
                                  {showDiff ? 'Diferenças ON' : 'Diferenças OFF'}
                                </button>
                              </div>
                              <div className="grid border-b border-[var(--border)]/30" style={{ gridTemplateColumns: `44px repeat(${data.length}, 1fr)` }}>
                                <div className="p-2" />
                                {data.map(item => (
                                  <div key={item.traducao} className="p-2 border-l border-[var(--border)]/20">
                                    <div className="flex items-center gap-1.5">
                                      <div className={`w-1.5 h-1.5 rounded-full ${tradBadgeColors[item.traducao]}`} />
                                      <span className="text-[11px] font-bold">{labelMap[item.traducao]}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {Array.from({ length: maxVersiculos }, (_, i) => {
                                const verseNum = i + 1;
                                if (!data.some(d => d.versiculos[i])) return null;
                                const baseText = data[0].versiculos[i]?.texto || '';
                                return (
                                  <motion.div key={verseNum}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.01 }}
                                    className={`grid border-b border-[var(--border)]/15 last:border-b-0 hover:bg-[var(--bg)]/50 transition-all duration-300 cursor-pointer ${highlightedVerse === verseNum ? 'bg-[var(--primary)]/5 border-l-2 border-l-[var(--primary)]' : ''}`}
                                    style={{ gridTemplateColumns: `44px repeat(${data.length}, 1fr)` }}
                                    onClick={() => setHighlightedVerse(highlightedVerse === verseNum ? null : verseNum)}>
                                    <div className="p-3 flex items-start justify-end">
                                      <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 w-6 h-6 flex items-center justify-center rounded-full">{verseNum}</span>
                                    </div>
                                    {data.map((item, idx) => {
                                      const v = item.versiculos[i];
                                      if (!v) return <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20" />;
                                      if (showDiff && idx > 0 && baseText) {
                                        const segments = diffWords(baseText, v.texto);
                                        return (
                                          <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20">
                                            <p className="font-serif-body leading-relaxed" style={{ fontSize: `${fontSize - 3}px` }}>
                                              {segments.map((seg, si) => seg.changed ? <span key={si} className="diff-word">{seg.text}</span> : <span key={si}>{seg.text}</span>)}
                                            </p>
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20">
                                          <p className="font-serif-body leading-relaxed" style={{ fontSize: `${fontSize - 3}px` }}>{v.texto}</p>
                                        </div>
                                      );
                                    })}
                                  </motion.div>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}

                      {!readingMode && (
                        <div className="flex items-center justify-center gap-4 mt-16 pt-10 border-t border-[var(--border)]/30">
                          <motion.button onClick={() => changeChapter(Math.max(0, capituloIdx - 1))} disabled={capituloIdx === 0}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-1.5 px-5 py-2.5 text-sm border border-[var(--border)] rounded-xl disabled:opacity-30 hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/30 transition-all duration-300">
                            <ChevronLeft className="w-4 h-4" /> Anterior
                          </motion.button>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xs text-[var(--muted-fg)] font-mono">{capituloIdx + 1} / {livro.totalCapitulos}</span>
                            <div className="w-24 h-1 rounded-full bg-[var(--border)]/50 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-[var(--primary)]/40"
                                initial={false}
                                animate={{ width: `${((capituloIdx + 1) / livro.totalCapitulos) * 100}%` }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                          <motion.button onClick={() => changeChapter(Math.min(livro.totalCapitulos - 1, capituloIdx + 1))}
                            disabled={capituloIdx >= livro.totalCapitulos - 1}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-1.5 px-5 py-2.5 text-sm border border-[var(--border)] rounded-xl disabled:opacity-30 hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/30 transition-all duration-300">
                            Próximo <ChevronRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      )}

                      <AnimatePresence>
                        {mostrarNotas && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-8 overflow-hidden"
                          >
                            <div className="border-t border-[var(--border)]/30 pt-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-[var(--primary)]" />
                                  <h3 className="text-sm font-semibold">Minhas Anotações</h3>
                                  <span className="text-[10px] px-1.5 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                                    {notas.length}
                                  </span>
                                </div>
                                {notas.length > 0 && !notaAtiva && (
                                  <div className="flex gap-1 max-h-32 overflow-y-auto">
                                    {notas.slice(0, 10).map(n => (
                                      <button
                                        key={n.id}
                                        onClick={() => setNotaAtiva(n)}
                                        className="text-[10px] px-2 py-1 rounded-md bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--primary)]/10 transition-colors truncate max-w-[120px]"
                                        title={n.titulo}
                                      >
                                        {n.titulo || 'Sem título'}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <Suspense fallback={<PanelFallback />}>
                                <NotaEditor
                                  key={notaAtiva?.id ?? 'new'}
                                  nota={notaAtiva ?? undefined}
                                  autoSalvar={true}
                                  onSalvar={(nota) => {
                                    setNotaAtiva(nota);
                                    salvarNotaHook(nota.id, nota.conteudo);
                                  }}
                                  onExcluir={(id) => {
                                    excluirNota(id);
                                    setNotaAtiva(null);
                                    setMostrarNotas(false);
                                  }}
                                />
                              </Suspense>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-20 chapter-enter">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--muted-fg)]" strokeWidth={1} />
                    <p className="text-lg text-[var(--muted-fg)]">Selecione um livro e capítulo</p>
                  </div>
                )}
              </div>

              {(studyPanel === 'notas' || studyPanel === 'strong' || studyPanel === 'comentarios') && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-[var(--border)] bg-[var(--card-bg)] p-4"
                >
                  <div className="max-w-4xl mx-auto">
                    <Suspense fallback={<PanelFallback />}>
                      {studyPanel === 'notas' && <PainelNotas livroAbrev={livro.abreviacao} capitulo={capituloIdx + 1} />}
                      {studyPanel === 'strong' && <PainelStrong onClose={() => setStudyPanel(null)} />}
                      {studyPanel === 'comentarios' && comentarioVersiculo && (
                        <PainelComentarios livro={livro.abreviacao} capitulo={capituloIdx + 1} versiculo={comentarioVersiculo}
                          onClose={() => { setStudyPanel(null); setComentarioVersiculo(null); }} />
                      )}
                    </Suspense>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile sidebar */}
            <AnimatePresence>
              {mobileMenu && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 lg:hidden"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                    onClick={() => setMobileMenu(false)} 
                  />
                  <motion.aside 
                    initial={{ x: -288 }}
                    animate={{ x: 0 }}
                    exit={{ x: -288 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[var(--card-bg)] border-r border-[var(--border)] overflow-y-auto p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold">Livros</span>
                      <button onClick={() => setMobileMenu(false)} className="p-1 rounded-lg hover:bg-[var(--bg)]" aria-label="Fechar menu de livros"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-0.5">
                      {TODOS_LIVROS.map(l => {
                        const idx = TODOS_LIVROS.indexOf(l);
                        return (
                          <button key={l.abreviacao} onClick={() => { goToBook(idx); setMobileMenu(false); }}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-300 ${idx === livroIdx ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium' : 'text-[var(--muted-fg)] hover:bg-[var(--bg)]'}`}>
                            {l.nome}
                          </button>
                        );
                      })}
                    </div>
                  </motion.aside>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Audio natural player - ElevenLabs + Web Speech API fallback */}
      <Suspense fallback={null}>
        {audioNatural.state.isPlaying && (
          <AudioNaturalPlayer
            isPlaying={audioNatural.state.isPlaying}
            isLoading={audioNatural.state.isLoading}
            currentTime={audioNatural.state.currentTime}
            duration={audioNatural.state.duration}
            currentVerse={audio.playingVerse ?? undefined}
            totalVerses={data[0]?.versiculos?.length}
            verseText={data[0]?.versiculos?.find(v => v.numero === audio.playingVerse)?.texto}
            bookName={livro.nome}
            chapter={capituloIdx + 1}
            engine={audioNatural.state.engine}
            onPlay={() => {
              const verseText = data[0]?.versiculos?.find(v => v.numero === (audio.playingVerse ?? 1))?.texto ?? '';
              if (verseText) audioNatural.play(verseText);
            }}
            onPause={audioNatural.pause}
            onStop={() => { audioNatural.stop(); audio.stop(); }}
            onSeek={audioNatural.seek}
            onSkipForward={() => audioNatural.seek(Math.min(audioNatural.state.currentTime + 15, audioNatural.state.duration))}
            onSkipBackward={() => audioNatural.seek(Math.max(audioNatural.state.currentTime - 15, 0))}
            volume={audioNatural.state.volume}
            speed={audioNatural.state.speed}
            isMuted={audioNatural.state.isMuted}
            onSetVolume={audioNatural.setVolume}
            onSetSpeed={audioNatural.setSpeed}
            onToggleMute={audioNatural.toggleMute}
          />
        )}
      </Suspense>

      {/* Legacy audio mini player fallback */}
      <Suspense fallback={null}>
        {!audioNatural.state.isPlaying && (
          <AudioMiniPlayer
            isPlaying={audio.isPlaying}
            currentVerse={audio.playingVerse ?? -1}
            totalVerses={data[0]?.versiculos?.length ?? 0}
            verseText={data[0]?.versiculos?.find(v => v.numero === audio.playingVerse)?.texto ?? ''}
            onStop={audio.stop}
          />
        )}
      </Suspense>

      {/* Annotation modal */}
      <AnimatePresence>
        {anotandoVersiculo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" 
            onClick={() => setAnotandoVersiculo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4" 
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-medium mb-1">Anotação</h3>
              <p className="text-xs text-[var(--muted-fg)] mb-4">{anotandoVersiculo}</p>
              <textarea value={anotacaoTexto} onChange={e => setAnotacaoTexto(e.target.value)}
                placeholder="Digite sua anotação pessoal..."
                className="w-full h-32 p-3 text-sm bg-[var(--bg)] border border-[var(--border)] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-300" autoFocus />
              <div className="flex items-center justify-end gap-3 mt-4">
                <button onClick={() => setAnotandoVersiculo(null)} className="px-4 py-2 text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors duration-300">Cancelar</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => {
                  const parts = anotandoVersiculo.split(':');
                  salvarAnotacao(parts[0], Number(parts[1]), Number(parts[2]), parts[3], anotacaoTexto || null);
                  refresh(); setAnotandoVersiculo(null); setAnotacaoTexto('');
                }} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-[var(--primary)]/90 transition-all duration-300">Salvar</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Search Ctrl+K / */}
      <AnimatePresence>
        {quickSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setQuickSearchOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-lg mx-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search className="w-5 h-5 text-[var(--muted-fg)] shrink-0" />
                <input autoFocus type="text" placeholder="Buscar versículos ou livro..." value={quickSearchQuery}
                  onChange={e => handleQuickSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && quickSearchAutoComplete.length > 0) {
                      const first = quickSearchAutoComplete[0];
                      goToQuickResult({ livro: first.livro, nome: first.nome, cap: 1 });
                    }
                  }}
                  className="flex-1 bg-transparent text-sm outline-none" />
                <kbd className="text-[10px] bg-[var(--bg)] px-1.5 py-0.5 rounded text-[var(--muted-fg)]">ESC</kbd>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Autocomplete: book suggestions */}
                {quickSearchAutoComplete.length > 0 && quickSearchQuery.length >= 2 && quickSearchResults.length === 0 && (
                  <div className="p-2 border-b border-[var(--border)]/30">
                    <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider px-3 py-1 font-semibold">Livros</p>
                    {quickSearchAutoComplete.map((b, i) => (
                      <motion.button key={b.livro} onClick={() => goToQuickResult({ livro: b.livro, nome: b.nome, cap: 1 })}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg)] transition-colors duration-200 flex items-center gap-2"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[var(--primary)]" />
                        <span className="text-sm font-medium">{b.nome}</span>
                        <span className="text-[10px] text-[var(--muted-fg)]">Capítulo 1</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Recent searches */}
                {quickSearchQuery.length === 0 && recentSearches.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider px-3 py-1 font-semibold">Buscas recentes</p>
                    {recentSearches.map((s, i) => (
                      <motion.button key={i} onClick={() => goToQuickResult({ livro: s.livro, nome: s.nome, cap: s.cap, versiculo: s.versiculo })}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg)] transition-colors duration-200 flex items-center gap-2"
                      >
                        <History className="w-3.5 h-3.5 text-[var(--muted-fg)]" />
                        <span className="text-sm">{s.nome} {s.cap}:{s.versiculo}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Search results */}
                {quickSearchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="flex items-center justify-between px-3 py-1">
                      <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider font-semibold">
                        Resultados ({quickSearchResults.length})
                      </p>
                      <span className="text-[10px] text-[var(--muted-fg)]">ARC</span>
                    </div>
                    {quickSearchResults.map((r, i) => {
                      const queryLower = quickSearchQuery.toLowerCase();
                      const idx = r.texto.toLowerCase().indexOf(queryLower);
                      const before = idx > 0 ? r.texto.slice(0, idx) : '';
                      const match = idx >= 0 ? r.texto.slice(idx, idx + queryLower.length) : '';
                      const after = idx >= 0 ? r.texto.slice(idx + queryLower.length) : r.texto;
                      return (
                        <motion.button key={i} onClick={() => goToQuickResult(r)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg)] transition-colors duration-200 group"
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold text-[var(--primary)]">{r.nome} {r.cap}:{r.versiculo}</span>
                            <span className="text-[9px] px-1 py-0.5 bg-[var(--bg)] rounded text-[var(--muted-fg)]">{r.traducao}</span>
                          </div>
                          <p className="text-xs text-[var(--muted-fg)] line-clamp-2 group-hover:text-[var(--fg)] transition-colors duration-200">
                            {before && <span>{before}</span>}
                            {match && <mark className="bg-[var(--primary)]/20 text-[var(--primary)] rounded-sm px-0.5">{match}</mark>}
                            {after && <span>{after}</span>}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                ) : quickSearchQuery.length >= 2 ? (
                  <div className="p-8 text-center text-sm text-[var(--muted-fg)]">Nenhum resultado encontrado</div>
                ) : quickSearchQuery.length === 0 && recentSearches.length === 0 ? (
                  <div className="p-8 text-center text-sm text-[var(--muted-fg)]">
                    <kbd className="text-xs bg-[var(--bg)] px-2 py-1 rounded border border-[var(--border)]">Ctrl+K</kbd>
                    <span className="mx-2">ou</span>
                    <kbd className="text-xs bg-[var(--bg)] px-2 py-1 rounded border border-[var(--border)]">/</kbd>
                    <span className="ml-2">para buscar</span>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narração Dramática overlay */}
      <AnimatePresence>
        {mostrarNarracao && passagemDramatica && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--bg)]"
          >
            <Suspense fallback={<PanelFallback />}>
              <NarracaoDramaticaLazy
                titulo={passagemDramatica.titulo}
                subtitulo={passagemDramatica.subtitulo}
                cenas={passagemDramatica.cenas}
                personagens={passagemDramatica.personagens}
                onFechar={() => setMostrarNarracao(false)}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Painel do Versículo */}
      <PainelDoVersiculo
        livro={versiculoSelecionado?.livro ?? ''}
        capitulo={versiculoSelecionado?.cap ?? 1}
        versiculo={versiculoSelecionado?.ver ?? 1}
        aberto={versiculoSelecionado !== null}
        onFechar={() => setVersiculoSelecionado(null)}
      />

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-[var(--card-bg)] lg:hidden z-30">
        <div className="flex items-center justify-around px-2 py-2">
          <motion.button onClick={() => setMobileMenu(true)} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-0.5 p-2.5 min-h-[44px] min-w-[44px] text-[var(--muted-fg)]" aria-label="Abrir lista de livros">
            <BookOpen className="w-5 h-5" /><span className="text-[10px]">Livros</span>
          </motion.button>
          <div className="flex items-center gap-1">
            <motion.button onClick={() => changeChapter(Math.max(0, capituloIdx - 1))} disabled={capituloIdx === 0} whileTap={{ scale: 0.9 }} className="p-2.5 min-h-[44px] min-w-[44px] text-[var(--muted-fg)] disabled:opacity-50" aria-label="Capítulo anterior">
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-xs font-mono min-w-[3rem] text-center">{capituloIdx + 1}/{livro.totalCapitulos}</span>
            <motion.button onClick={() => changeChapter(Math.min(livro.totalCapitulos - 1, capituloIdx + 1))} disabled={capituloIdx >= livro.totalCapitulos - 1} whileTap={{ scale: 0.9 }} className="p-2.5 min-h-[44px] min-w-[44px] text-[var(--muted-fg)] disabled:opacity-50" aria-label="Próximo capítulo">
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          <motion.button onClick={() => setChapterGridOpen(!chapterGridOpen)} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-0.5 p-2.5 min-h-[44px] min-w-[44px] text-[var(--muted-fg)]" aria-label="Abrir grade de capítulos" aria-expanded={chapterGridOpen}>
            <LayoutList className="w-5 h-5" /><span className="text-[10px]">Capítulos</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
