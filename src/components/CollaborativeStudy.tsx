'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Share2, Copy, MessageSquare,
  BookOpen, X, Link as LinkIcon, Check, PhoneOff,
  Mic, Video, Send, MonitorPlay, StickyNote, Zap,
  Palette, Maximize2, Minimize2, Settings, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import {
  getParticipantId,
  getParticipantColor,
  getParticipantLabel,
  upsertStudyRoom,
  fetchColabRoom,
  createColabRoom,
  COLAB_API,
  type StudyRoom,
} from '@/lib/collaborative';
import { RealtimeCursors, useRealtimeCursors } from '@/components/RealtimeCursors';

const VideoCall = dynamic(
  () => import('@/components/VideoCall').then((m) => ({ default: m.VideoCall })),
  { ssr: false },
);
const PresentationInline = dynamic(
  () => import('@/components/Apresentacao/PresentationInline').then((m) => ({ default: m.PresentationInline })),
  { ssr: false },
);
const BibleBrowser = dynamic(
  () => import('@/components/BibleBrowser').then((m) => ({ default: m.BibleBrowser })),
  { ssr: false, loading: () => <p className="p-8 text-center text-sm text-[var(--content-muted)]">Carregando a Bíblia…</p> },
);
const SharedNotes = dynamic(
  () => import('@/components/SharedNotes').then((m) => ({ default: m.SharedNotes })),
  { ssr: false },
);
const LiveQuiz = dynamic(
  () => import('@/components/LiveQuiz').then((m) => ({ default: m.LiveQuiz })),
  { ssr: false },
);
import { RoomEntrance } from '@/components/RoomEntrance';
import { RoomThemeSelector, getRoomThemeClasses } from '@/components/RoomThemes';
import { BottomSheet } from '@/components/BottomSheet';
import { PullToRefreshWrapper } from '@/components/PullToRefresh';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useChapterPrefetch } from '@/hooks/useChapterPrefetch';
import {
  createWebRTCService,
  type WebRTCService,
  type ChatMessage,
  type VerseSharedEvent,
  type CallInviteEvent,
  loadIceStatus,
} from '@/lib/webrtc';
import { carregarCapitulo } from '@/lib/apresentacao/versiculos';

interface CollaborativeStudyProps {
  initialCode?: string;
  compact?: boolean;
}

type TabType = 'chat' | 'bible' | 'notes' | 'quiz';

interface SharedNote {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  verseRef?: string;
  timestamp: number;
  color: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  difficulty: 'facil' | 'medio' | 'dificil';
}

const SAMPLE_QUESTIONS: QuizQuestion[] = [
  { id: 'q1', question: 'Quem construiu a arca?', options: ['Abraão', 'Noé', 'Moisés', 'Davi'], correctIndex: 1, category: 'Antigo Testamento', difficulty: 'facil' },
  { id: 'q2', question: 'Qual é o primeiro livro da Bíblia?', options: ['Êxodo', 'Gênesis', 'Levítico', 'Números'], correctIndex: 1, category: 'Geral', difficulty: 'facil' },
  { id: 'q3', question: 'Quantos mandamentos Deus deu?', options: ['5', '7', '10', '12'], correctIndex: 2, category: 'Antigo Testamento', difficulty: 'facil' },
  { id: 'q4', question: 'Quem foi engolido pelo peixe?', options: ['Pedro', 'Paulo', 'Jonas', 'Tiago'], correctIndex: 2, category: 'Antigo Testamento', difficulty: 'facil' },
  { id: 'q5', question: 'Em que cidade Jesus nasceu?', options: ['Nazaré', 'Jerusalém', 'Belém', 'Cafarnaum'], correctIndex: 2, category: 'Evangelhos', difficulty: 'medio' },
];

function parseSharedNotes(raw: unknown): SharedNote[] {
  if (!raw || typeof raw !== 'object') return [];
  const values = Array.isArray(raw) ? raw : Object.values(raw as Record<string, unknown>);
  const out: SharedNote[] = [];
  for (const v of values) {
    try {
      const n = typeof v === 'string' ? JSON.parse(v) : v;
      if (n && typeof n === 'object' && typeof (n as SharedNote).id === 'string' && typeof (n as SharedNote).content === 'string') {
        out.push(n as SharedNote);
      }
    } catch { /* nota inválida */ }
  }
  return out;
}

export function CollaborativeStudy({ initialCode, compact = false }: CollaborativeStudyProps) {
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const [roomFull, setRoomFull] = useState<{ maxParticipants: number } | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [shareInput, setShareInput] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [verseInput, setVerseInput] = useState({ livro: '', capitulo: '', versiculo: '', texto: '' });
  const [isCallActive, setIsCallActive] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('bible');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [wsVerses, setWsVerses] = useState<VerseSharedEvent[]>([]);
  const [typingParticipants, setTypingParticipants] = useState<Map<string, string>>(new Map());
  const [incomingCall, setIncomingCall] = useState<CallInviteEvent | null>(null);
  const [callType, setCallType] = useState<'video' | 'voice'>('video');
  const [presentedVerse, setPresentedVerse] = useState<{
    texto: string;
    referencia: string;
    apresentadoPor: string;
  } | null>(null);
  const [presentationFontSize, setPresentationFontSize] = useState(48);
  const [presentationMirror, setPresentationMirror] = useState(false);
  const [chapterVerses, setChapterVerses] = useState<Array<{ numero: number; texto: string; referencia: string }>>([]);
  const [chapterVerseIndex, setChapterVerseIndex] = useState(-1);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [bibleSyncData, setBibleSyncData] = useState<{ livro: string; capitulo: number; traducao: string } | null>(null);
  const [showEntrance, setShowEntrance] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [roomTheme, setRoomTheme] = useState('default');
  const [sharedNotes, setSharedNotes] = useState<SharedNote[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Array<{ participantId: string; participantName: string; questionId: string; selectedIndex: number; timeSpent: number; isCorrect: boolean }>>([]);
  const [quizScores, setQuizScores] = useState<Array<{ participantId: string; participantName: string; score: number; correctAnswers: number; totalAnswered: number; avgTime: number }>>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(SAMPLE_QUESTIONS);
  const [quizLive, setQuizLive] = useState(false);
  const [showBiblePanel, setShowBiblePanel] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatServiceRef = useRef<WebRTCService | null>(null);
  const [chatServiceState, setChatServiceState] = useState<WebRTCService | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wsConnectedRef = useRef(false);
  const [participantId, setParticipantId] = useState('');
  const [participantName, setParticipantName] = useState('Você');
  const [wsStatus, setWsStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [presence, setPresence] = useState<Array<{ id: string; name: string }>>([]);
  const [roomBusy, setRoomBusy] = useState(false);
  const [hasTurn, setHasTurn] = useState<boolean | null>(null);
  const { containerRef, isFullscreen, toggleFullscreen } = useFullscreen();
  const { prefetchAdjacent } = useChapterPrefetch();
  const { cursors: realtimeCursors, broadcastCursor } = useRealtimeCursors({
    participantId,
    participantName,
    service: chatServiceState,
  });

  useEffect(() => {
    const id = getParticipantId();
    setParticipantId(id);
    setParticipantName(getParticipantLabel(id));
    loadIceStatus()
      .then((s) => setHasTurn(s.hasTurn))
      .catch(() => setHasTurn(false));
  }, []);

  // Conectar serviço WebSocket
  useEffect(() => {
    if (!room || !participantId || wsConnectedRef.current) return;
    wsConnectedRef.current = true;
    const svc = createWebRTCService();
    chatServiceRef.current = svc;
    setChatServiceState(svc);

    svc.onChatMessage((msg) => {
      setChatMessages(prev => prev.some(m => m.id === msg.id) ? prev : [...prev, msg]);
    });

    svc.onVerseShared((verse) => {
      setWsVerses(prev => prev.some(v => v.id === verse.id) ? prev : [...prev, verse]);
      setActiveTab('bible');
    });

    svc.onTypingStart((data) => {
      setTypingParticipants(prev => new Map(prev).set(data.participantId, data.displayName));
    });

    svc.onTypingStop((participantId) => {
      setTypingParticipants(prev => { const n = new Map(prev); n.delete(participantId); return n; });
    });

    svc.onCallInvite((data) => setIncomingCall(data));
    svc.onCallAccept(() => setIncomingCall(null));
    svc.onCallReject(() => setIncomingCall(null));
    svc.onBibleNavigation((data) => setBibleSyncData(data));
    svc.onParticipants((participants) => {
      setPresence(participants.map((p) => ({ id: p.participantId, name: p.displayName })));
      setRoom(prev => {
        if (!prev) return prev;
        const newParticipantIds = participants.map(p => p.participantId);
        const currentIds = prev.participants.join(',');
        const newIds = newParticipantIds.join(',');
        if (currentIds === newIds) return prev;
        return { ...prev, participants: newParticipantIds };
      });
    });

    svc.onRoomFull((data) => {
      setRoomFull({ maxParticipants: data.maxParticipants });
      setRoom(null);
      wsConnectedRef.current = false;
    });

    svc.onPresentationSync((data) => {
      if (data.action === 'stop') setPresentedVerse(null);
      else if (data.action === 'navigate' && data.texto) {
        setPresentedVerse({ texto: data.texto, referencia: data.livro ? `${data.livro} ${data.capitulo}:${data.versiculo}` : '', apresentadoPor: data.presentedBy || '' });
      } else if (data.action === 'fontSize' && data.fontSize) setPresentationFontSize(data.fontSize);
      else if (data.action === 'mirror' && data.mirror !== undefined) setPresentationMirror(data.mirror!);
    });

    svc.onNoteSync((data) => {
      if (data.notes) {
        setSharedNotes(parseSharedNotes(data.notes));
      } else if (data.action === 'add' && data.noteId && data.participantId) {
        setSharedNotes(prev => {
          if (prev.some(n => n.id === data.noteId)) return prev;
          const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'];
          return [...prev, {
            id: data.noteId!,
            authorId: data.participantId!,
            authorName: data.participantName || 'Anônimo',
            content: data.content || '',
            verseRef: data.verseRef,
            timestamp: data.timestamp || Date.now(),
            color: colors[prev.length % colors.length],
          }];
        });
      } else if (data.action === 'update' && data.noteId && data.content) {
        setSharedNotes(prev => prev.map(n => n.id === data.noteId ? { ...n, content: data.content! } : n));
      } else if (data.action === 'delete' && data.noteId) {
        setSharedNotes(prev => prev.filter(n => n.id !== data.noteId));
      }
    });

    svc.onQuizStart((data) => {
      const qs = (data.questions || []) as QuizQuestion[];
      if (qs.length === 0) return;
      setQuizQuestions(qs);
      setQuizIndex(0);
      setQuizAnswers([]);
      setQuizScores([]);
      setQuizLive(true);
      setActiveTab('quiz');
    });

    svc.onQuizAnswer((answer) => {
      if (!answer?.participantId || !answer?.questionId) return;
      setQuizAnswers(prev => prev.some(a => a.questionId === answer.questionId && a.participantId === answer.participantId) ? prev : [...prev, { ...answer, timeSpent: answer.timeSpent || 0 }]);
    });

    svc.onQuizSync((data) => {
      const idx = typeof data.currentQuestionIndex === 'number'
        ? data.currentQuestionIndex
        : Number((data as { currentQuestion?: number }).currentQuestion ?? 0);
      setQuizLive(true);
      setActiveTab('quiz');
      if (data.status === 'finished') {
        setQuizIndex((prev) => {
          const total = SAMPLE_QUESTIONS.length;
          return Number.isFinite(idx) && idx > 0 ? idx : total;
        });
      } else if (Number.isFinite(idx)) {
        setQuizIndex(idx);
      }
    });

    svc.onStatus((status) => setWsStatus(status));
    svc.connect(room.code, participantId, participantName);

    return () => {
      svc.disconnect();
      chatServiceRef.current = null;
      wsConnectedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.code, participantId]);

  // Auto-join via initialCode — buscar estado do backend e conectar ao WebSocket
  useEffect(() => {
    if (!participantId) return;
    if (initialCode && initialCode.length === 6) {
      fetchColabRoom(initialCode, AbortSignal.timeout(5000))
        .then((serverRoom) => {
          const roomId = serverRoom?.id || `room-${Date.now()}`;
          const joined: StudyRoom = { id: roomId, code: initialCode, participants: [participantId], createdAt: Date.now(), verses: [] };
          upsertStudyRoom(joined);
          setRoom(joined);
          if (serverRoom?.messages) {
            const chatMsgs = serverRoom.messages
              .filter((m) => m.type === 'chat')
              .map((m) => ({
                id: m.id, participantId: m.userId, displayName: m.userName,
                message: m.text, timestamp: new Date(m.timestamp).getTime(),
              }));
            if (chatMsgs.length > 0) setChatMessages(chatMsgs);

            const verseMsgs = serverRoom.messages
              .filter((m) => m.type === 'verse')
              .map((m) => ({
                id: m.id, participantId: m.userId, displayName: m.userName,
                verse: m.text.split(' - ')[0] || '', livro: '', capitulo: 0, versiculo: 0,
                texto: m.text.split(' - ').slice(1).join(' - ') || m.text,
                timestamp: new Date(m.timestamp).getTime(),
              }));
            if (verseMsgs.length > 0) setWsVerses(verseMsgs);
          }
          if (serverRoom?.sharedNotes) {
            const notes = parseSharedNotes(serverRoom.sharedNotes);
            if (notes.length > 0) setSharedNotes(notes);
          }
        })
        .catch(() => {
          const fallback: StudyRoom = { id: `room-${Date.now()}`, code: initialCode, participants: [participantId], createdAt: Date.now(), verses: [] };
          upsertStudyRoom(fallback);
          setRoom(fallback);
        });
    }
  }, [initialCode, participantId]);

  // Verificar versículo pendente
  useEffect(() => {
    if (!room) return;
    try {
      const pending = localStorage.getItem('ssb_collab_share_pending');
      if (pending) {
        const data = JSON.parse(pending);
        localStorage.removeItem('ssb_collab_share_pending');
        const verseData: VerseSharedEvent = {
          id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          participantId, displayName: participantName,
          verse: `${data.livro} ${data.capitulo}:${data.versiculo}`,
          livro: data.livro, capitulo: data.capitulo, versiculo: data.versiculo,
          texto: data.texto, timestamp: Date.now(),
        };
        setWsVerses(prev => [...prev, verseData]);
        chatServiceRef.current?.sendVerseShared(verseData);
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.code]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages.length]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [wsVerses.length]);

  useEffect(() => {
    if (!room?.code || typeof window === 'undefined') return;
    const next = `/estudo-colaborativo?code=${room.code}`;
    if (window.location.pathname + window.location.search !== next) {
      window.history.replaceState(null, '', next);
    }
  }, [room?.code]);

  useEffect(() => {
    if (!room || wsStatus === 'connected') return;
    const t = setInterval(() => {
      chatServiceRef.current?.reconnect();
    }, 4000);
    return () => clearInterval(t);
  }, [room, wsStatus]);

  // Prefetch adjacent chapters when bible navigates
  useEffect(() => {
    if (bibleSyncData) prefetchAdjacent(bibleSyncData.livro, bibleSyncData.capitulo);
  }, [bibleSyncData, prefetchAdjacent]);

  const handleCreate = useCallback(async () => {
    if (roomBusy) return;
    const id = participantId || getParticipantId();
    if (!participantId) {
      setParticipantId(id);
      setParticipantName(getParticipantLabel(id));
    }
    setRoomBusy(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    let created: StudyRoom = { id: `room-${Date.now()}`, code, participants: [id], createdAt: Date.now(), verses: [] };
    const abort = new AbortController();
    const abortTimer = setTimeout(() => abort.abort(), 5000);
    try {
      const saved = await createColabRoom(code, id, abort.signal);
      if (saved?.id) {
        created = { id: saved.id, code, participants: [id], createdAt: Date.now(), verses: [] };
      }
    } catch { /* WS + abas locais ainda funcionam */ }
    clearTimeout(abortTimer);
    upsertStudyRoom(created);
    setRoom(created);
    setRoomBusy(false);
    setShowEntrance(true);
  }, [participantId, roomBusy]);

  const handleJoin = useCallback(async () => {
    if (joinCode.length !== 6 || roomBusy) return;
    setRoomBusy(true);
    const id = participantId || getParticipantId();
    let serverRoom: Awaited<ReturnType<typeof fetchColabRoom>> = null;
    const abort = new AbortController();
    const abortTimer = setTimeout(() => abort.abort(), 5000);
    try {
      serverRoom = await fetchColabRoom(joinCode, abort.signal);
      if (!serverRoom) {
        serverRoom = await createColabRoom(joinCode, id, abort.signal);
      }
    } catch { /* entra mesmo sem REST — o WebSocket ainda sincroniza */ }

    clearTimeout(abortTimer);

    const roomId = serverRoom?.id || `room-${Date.now()}`;
    const existingMessages: ChatMessage[] = (serverRoom?.messages || [])
      .filter((m) => m.type === 'chat')
      .map((m) => ({
        id: m.id,
        participantId: m.userId,
        displayName: m.userName,
        message: m.text,
        timestamp: new Date(m.timestamp).getTime(),
      }));

    const existingVerses: VerseSharedEvent[] = (serverRoom?.messages || [])
      .filter((m) => m.type === 'verse')
      .map((m) => ({
        id: m.id,
        participantId: m.userId,
        displayName: m.userName,
        verse: m.text.split(' - ')[0] || '',
        livro: '', capitulo: 0, versiculo: 0,
        texto: m.text.split(' - ').slice(1).join(' - ') || m.text,
        timestamp: new Date(m.timestamp).getTime(),
      }));

    const joined: StudyRoom = { id: roomId, code: joinCode, participants: [id], createdAt: Date.now(), verses: [] };
    upsertStudyRoom(joined);
    setRoom(joined);
    if (existingMessages.length > 0) setChatMessages(existingMessages);
    if (existingVerses.length > 0) setWsVerses(existingVerses);
    const joinedNotes = parseSharedNotes(serverRoom?.sharedNotes);
    if (joinedNotes.length > 0) setSharedNotes(joinedNotes);

    try {
      await fetch(`${COLAB_API}/rooms/${joinCode}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: participantName, joinedAt: new Date().toISOString() }),
      });
    } catch {}

    setJoinCode('');
    setRoomBusy(false);
    setShowEntrance(true);
  }, [joinCode, participantId, participantName, roomBusy]);

  const handleShare = useCallback(() => {
    if (!room || !shareInput.trim()) return;
    const match = shareInput.trim().match(/^(\d{1,3})\s*[:\.]\s*(\d{1,3})$/);
    const texto = verseInput.texto || shareMessage || 'Versículo compartilhado';
    const livro = verseInput.livro || 'Bíblia';
    const cap = match ? parseInt(match[1]) : 1;
    const verso = match ? parseInt(match[2]) : 1;
    const ref = `${livro} ${cap}:${verso}`;
    const verseData: VerseSharedEvent = {
      id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      participantId, displayName: participantName, verse: ref,
      livro, capitulo: cap, versiculo: verso, texto, message: shareMessage || undefined, timestamp: Date.now(),
    };
    setWsVerses(prev => [...prev, verseData]);
    setActiveTab('bible');
    chatServiceRef.current?.sendVerseShared(verseData);
    setShareInput(''); setShareMessage(''); setVerseInput({ livro: '', capitulo: '', versiculo: '', texto: '' }); setShowShare(false);
  }, [room, shareInput, shareMessage, verseInput, participantId, participantName]);

  const handleShareBibleVerse = useCallback(async (ref: string, text: string) => {
    if (!room) return;
    const verseData: VerseSharedEvent = {
      id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      participantId, displayName: participantName, verse: ref,
      livro: ref, capitulo: 0, versiculo: 0, texto: text, timestamp: Date.now(),
    };
    setWsVerses(prev => [...prev, verseData]);
    chatServiceRef.current?.sendVerseShared(verseData);

    try {
      await fetch(`${COLAB_API}/rooms/${room.code}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: verseData.id, userId: participantId, userName: participantName,
          text: `${ref} - ${text}`, timestamp: new Date(verseData.timestamp).toISOString(), type: 'verse',
        }),
      });
    } catch {}
  }, [room, participantId, participantName]);

  const handleSendMessage = useCallback(async () => {
    if (!room || !shareMessage.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      participantId, displayName: participantName, message: shareMessage, timestamp: Date.now(),
    };
    setChatMessages(prev => [...prev, msg]);
    chatServiceRef.current?.sendChatMessage(msg.id, participantId, participantName, shareMessage);

    try {
      await fetch(`${COLAB_API}/rooms/${room.code}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: msg.id, userId: participantId, userName: participantName,
          text: shareMessage, timestamp: new Date(msg.timestamp).toISOString(), type: 'chat',
        }),
      });
    } catch {}

    setShareMessage('');
    chatServiceRef.current?.sendTypingStop(participantId);
  }, [room, shareMessage, participantId, participantName]);

  const handleTyping = useCallback(() => {
    if (!chatServiceRef.current) return;
    chatServiceRef.current.sendTypingStart(participantId, participantName);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => chatServiceRef.current?.sendTypingStop(participantId), 2000);
  }, [participantId, participantName]);

  const handlePresentVerse = useCallback(async (verseOrRef: VerseSharedEvent | string, text?: string) => {
    if (typeof verseOrRef === 'string') {
      // Parse reference like "Mateus 1:1" or "Mt 1:1"
      const refMatch = verseOrRef.match(/^(.+?)\s+(\d+):(\d+)$/);
      if (refMatch) {
        const [, livroNome, capStr, verStr] = refMatch;
        const capitulo = parseInt(capStr);
        const versiculo = parseInt(verStr);

        // Find book abbreviation
        const livroInfo = TODOS_LIVROS.find(l =>
          l.nome === livroNome || l.abreviacao === livroNome || l.nome.startsWith(livroNome)
        );
        const livroAbrev = livroInfo?.abreviacao || livroNome.toLowerCase().slice(0, 2);

        // Load full chapter
        try {
          const verses = await carregarCapitulo(livroAbrev, capitulo, 'nvi');
          if (verses && verses.length > 0) {
            const chapterVersesData = verses.map(v => ({
              numero: v.numero,
              texto: v.texto,
              referencia: `${livroNome} ${capitulo}:${v.numero}`,
            }));
            setChapterVerses(chapterVersesData);
            const idx = verses.findIndex(v => v.numero === versiculo);
            setChapterVerseIndex(idx >= 0 ? idx : 0);
            setPresentedVerse({
              texto: verses[idx >= 0 ? idx : 0].texto,
              referencia: verseOrRef,
              apresentadoPor: participantName,
            });
            chatServiceRef.current?.sendPresentationSync({
              action: 'navigate',
              livro: livroNome,
              capitulo,
              versiculo,
              texto: verses[idx >= 0 ? idx : 0].texto,
              presentedBy: participantName,
            });
          } else {
            // Fallback: use provided text
            setChapterVerses([{ numero: parseInt(refMatch?.[3] || '0'), texto: text || '', referencia: verseOrRef }]);
            setChapterVerseIndex(0);
            setPresentedVerse({ texto: text || '', referencia: verseOrRef, apresentadoPor: participantName });
            chatServiceRef.current?.sendPresentationSync({
              action: 'navigate',
              livro: livroNome,
              capitulo,
              versiculo,
              texto: text || '',
              presentedBy: participantName,
            });
          }
        } catch {
          // Fallback: use provided text
          setChapterVerses([{ numero: 1, texto: text || '', referencia: verseOrRef }]);
          setChapterVerseIndex(0);
          setPresentedVerse({ texto: text || '', referencia: verseOrRef, apresentadoPor: participantName });
          chatServiceRef.current?.sendPresentationSync({
            action: 'navigate',
            livro: livroNome,
            capitulo,
            versiculo,
            texto: text || '',
            presentedBy: participantName,
          });
        }
      } else {
        // Can't parse reference, use text as-is
        setChapterVerses([{ numero: 1, texto: text || '', referencia: verseOrRef }]);
        setChapterVerseIndex(0);
        setPresentedVerse({ texto: text || '', referencia: verseOrRef, apresentadoPor: participantName });
        chatServiceRef.current?.sendPresentationSync({ action: 'navigate', texto: text || '', presentedBy: participantName });
      }
      setCurrentVerseIndex(-1);
    } else {
      const idx = wsVerses.findIndex(v => v.id === verseOrRef.id);
      setCurrentVerseIndex(idx >= 0 ? idx : wsVerses.length);
      setPresentedVerse({ texto: verseOrRef.texto, referencia: verseOrRef.verse, apresentadoPor: verseOrRef.displayName || getParticipantLabel(verseOrRef.participantId) });
      chatServiceRef.current?.sendPresentationSync({ action: 'navigate', livro: verseOrRef.livro, capitulo: verseOrRef.capitulo, versiculo: verseOrRef.versiculo, texto: verseOrRef.texto, presentedBy: participantName });
    }
    setShowBiblePanel(true);
  }, [participantName, wsVerses]);

  const handleStopPresentation = useCallback(() => { setPresentedVerse(null); setCurrentVerseIndex(-1); chatServiceRef.current?.sendPresentationSync({ action: 'stop' }); }, []);
  const handlePresentationFontSize = useCallback((size: number) => { setPresentationFontSize(size); chatServiceRef.current?.sendPresentationSync({ action: 'fontSize', fontSize: size }); }, []);
  const handlePresentationMirror = useCallback((mirror: boolean) => { setPresentationMirror(mirror); chatServiceRef.current?.sendPresentationSync({ action: 'mirror', mirror }); }, []);

  // Navegação entre versículos na apresentação
  const navigateVerse = useCallback((direction: 'prev' | 'next') => {
    // Prefer wsVerses if available, otherwise use chapterVerses
    const verses = wsVerses.length > 0 ? wsVerses.map(v => ({ texto: v.texto, referencia: v.verse })) : chapterVerses;
    const idx = wsVerses.length > 0 ? currentVerseIndex : chapterVerseIndex;
    if (verses.length === 0) return;

    let newIndex: number;
    if (direction === 'next') {
      newIndex = idx < verses.length - 1 ? idx + 1 : 0;
    } else {
      newIndex = idx > 0 ? idx - 1 : verses.length - 1;
    }

    const verse = verses[newIndex];
    if (wsVerses.length > 0) {
      setCurrentVerseIndex(newIndex);
    } else {
      setChapterVerseIndex(newIndex);
    }
    setPresentedVerse({ texto: verse.texto, referencia: verse.referencia, apresentadoPor: participantName });
    broadcastCursor(newIndex);
    const refMatch = verse.referencia.match(/^(.+?)\s+(\d+):(\d+)$/);
    const livro = refMatch ? refMatch[1] : undefined;
    const capitulo = refMatch ? parseInt(refMatch[2]) : undefined;
    const versiculo = refMatch ? parseInt(refMatch[3]) : undefined;
    chatServiceRef.current?.sendPresentationSync({ action: 'navigate', livro, capitulo, versiculo, texto: verse.texto, presentedBy: participantName });
  }, [wsVerses, chapterVerses, currentVerseIndex, chapterVerseIndex, participantName, broadcastCursor]);

  const navigateToVerse = useCallback((index: number) => {
    const verses = wsVerses.length > 0 ? wsVerses.map(v => ({ texto: v.texto, referencia: v.verse, numero: 0 })) : chapterVerses;
    if (index < 0 || index >= verses.length) return;
    const verse = verses[index];
    if (wsVerses.length > 0) {
      setCurrentVerseIndex(index);
    } else {
      setChapterVerseIndex(index);
    }
    setPresentedVerse({ texto: verse.texto, referencia: verse.referencia, apresentadoPor: participantName });
    broadcastCursor(index);
    const refMatch = verse.referencia.match(/^(.+?)\s+(\d+):(\d+)$/);
    const livro = refMatch ? refMatch[1] : undefined;
    const capitulo = refMatch ? parseInt(refMatch[2]) : undefined;
    const versiculo = refMatch ? parseInt(refMatch[3]) : undefined;
    chatServiceRef.current?.sendPresentationSync({ action: 'navigate', livro, capitulo, versiculo, texto: verse.texto, presentedBy: participantName });
  }, [wsVerses, chapterVerses, participantName, broadcastCursor]);

  // Auto-advance timer
  useEffect(() => {
    if (!autoAdvance || !presentedVerse) {
      if (autoAdvanceTimerRef.current) { clearInterval(autoAdvanceTimerRef.current); autoAdvanceTimerRef.current = null; }
      return;
    }
    autoAdvanceTimerRef.current = setInterval(() => { navigateVerse('next'); }, 10000); // 10 seconds
    return () => { if (autoAdvanceTimerRef.current) { clearInterval(autoAdvanceTimerRef.current); autoAdvanceTimerRef.current = null; } };
  }, [autoAdvance, presentedVerse, navigateVerse]);

  // Navegação por teclado (setas esquerda/direita) quando apresentando
  useEffect(() => {
    if (!presentedVerse) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigateVerse('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateVerse('prev');
      } else if (e.key === 'Escape') {
        handleStopPresentation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentedVerse, navigateVerse, handleStopPresentation]);

  const handleStartCall = useCallback((type: 'video' | 'voice') => { setCallType(type); setIsCallActive(true); chatServiceRef.current?.sendCallInvite(participantId, participantName, type); }, [participantId, participantName]);
  const handleAcceptCall = useCallback(() => { if (incomingCall) { chatServiceRef.current?.sendCallAccept(incomingCall.callerSocketId, participantName); setCallType(incomingCall.callType); setIsCallActive(true); } setIncomingCall(null); }, [incomingCall, participantName]);
  const handleRejectCall = useCallback(() => { if (incomingCall) chatServiceRef.current?.sendCallReject(incomingCall.callerSocketId, participantName); setIncomingCall(null); }, [incomingCall, participantName]);

  const copyRoomLink = useCallback(() => {
    if (!room) return;
    navigator.clipboard.writeText(`${window.location.origin}/estudo-colaborativo?code=${room.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [room]);

  // Shared notes handlers
  const handleAddNote = useCallback(async (content: string, verseRef?: string) => {
    const colors = ['#fef9c3', '#dbeafe', '#dcfce7', '#fce7f3', '#f3e8ff', '#fed7aa'];
    const newNote: SharedNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      authorId: participantId, authorName: participantName, content, verseRef, timestamp: Date.now(),
      color: colors[sharedNotes.length % colors.length],
    };
    const updated = [...sharedNotes, newNote];
    setSharedNotes(updated);

    if (room) {
      try {
        const notesMap: Record<string, string> = {};
        updated.forEach(n => { notesMap[n.id] = JSON.stringify(n); });
        await fetch(`${COLAB_API}/rooms/${room.code}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: notesMap }),
        });
      } catch {}
      // Broadcast via WebSocket
      chatServiceRef.current?.sendNoteSync({
        action: 'add', noteId: newNote.id, participantId, participantName,
        content, verseRef, color: newNote.color, timestamp: newNote.timestamp,
      });
    }
  }, [participantId, participantName, sharedNotes, room]);

  const handleDeleteNote = useCallback(async (id: string) => {
    const updated = sharedNotes.filter(n => n.id !== id);
    setSharedNotes(updated);

    if (room) {
      try {
        const notesMap: Record<string, string> = {};
        updated.forEach(n => { notesMap[n.id] = JSON.stringify(n); });
        await fetch(`${COLAB_API}/rooms/${room.code}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: notesMap }),
        });
      } catch {}
      chatServiceRef.current?.sendNoteSync({
        action: 'delete', noteId: id, participantId, participantName, timestamp: Date.now(),
      });
    }
  }, [sharedNotes, room]);

  const handleUpdateNote = useCallback((id: string, content: string) => {
    setSharedNotes(prev => prev.map(n => n.id === id ? { ...n, content } : n));
    if (room) {
      chatServiceRef.current?.sendNoteSync({
        action: 'update', noteId: id, participantId, participantName, content, timestamp: Date.now(),
      });
    }
  }, [room, sharedNotes, participantId, participantName]);

  // Quiz handlers
  const handleStartLiveQuiz = useCallback(() => {
    setQuizQuestions(SAMPLE_QUESTIONS);
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizScores([]);
    setQuizLive(true);
    chatServiceRef.current?.sendQuizStart(SAMPLE_QUESTIONS);
  }, []);

  const handleQuizAnswer = useCallback((questionId: string, selectedIndex: number) => {
    const question = quizQuestions.find(q => q.id === questionId);
    if (!question) return;
    const answer = {
      participantId, participantName, questionId, selectedIndex,
      timeSpent: 0, isCorrect: selectedIndex === question.correctIndex,
    };
    setQuizAnswers(prev => [...prev, answer]);
    // Broadcast via WebSocket
    if (room) chatServiceRef.current?.sendQuizAnswer(answer);
  }, [participantId, participantName, quizQuestions, room]);

  const handleNextQuestion = useCallback(() => {
    const next = quizIndex + 1;
    if (next < quizQuestions.length) {
      setQuizIndex(next);
      chatServiceRef.current?.sendQuizSync({ currentQuestion: next, status: 'active' });
      return;
    }
    const byUser = new Map<string, { participantId: string; participantName: string; correct: number; total: number }>();
    for (const a of quizAnswers) {
      const cur = byUser.get(a.participantId) || {
        participantId: a.participantId,
        participantName: a.participantName,
        correct: 0,
        total: 0,
      };
      cur.total += 1;
      if (a.isCorrect) cur.correct += 1;
      byUser.set(a.participantId, cur);
    }
    const scores = Array.from(byUser.values()).map((u) => ({
      participantId: u.participantId,
      participantName: u.participantName,
      score: u.correct * 10,
      correctAnswers: u.correct,
      totalAnswered: u.total,
      avgTime: 0,
    }));
    setQuizScores(scores);
    setQuizIndex(quizQuestions.length);
    chatServiceRef.current?.sendQuizSync({ currentQuestion: quizQuestions.length, status: 'finished' });
  }, [quizIndex, quizAnswers, quizQuestions]);

  const themeClasses = getRoomThemeClasses(roomTheme);

  // Tela de criação/join
  if (!room) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-6', compact ? 'py-4' : 'py-16')}>
        {!compact && (
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--brand-default)]/20 to-[var(--brand-default)]/5 flex items-center justify-center border border-[var(--brand-default)]/20">
              <Users className="w-10 h-10 text-[var(--brand-default)]" />
            </motion.div>
            <h2 className="font-display text-3xl font-light mb-2">Estudo Colaborativo</h2>
            <p className="text-[var(--content-muted)] max-w-md leading-relaxed">Estude a Bíblia em tempo real com amigos. Crie ou entre em uma sala.</p>
            {hasTurn === false && (
              <p className="mt-3 max-w-md mx-auto text-xs leading-relaxed text-amber-800 dark:text-amber-200/90 bg-amber-500/10 border border-amber-500/25 rounded-xl px-3 py-2.5">
                Chat, notas e quiz funcionam em qualquer rede. Vídeo e voz entre redes diferentes exigem um servidor TURN (<span className="font-mono">TURN_URL</span>, <span className="font-mono">TURN_USER</span>, <span className="font-mono">TURN_PASS</span>). Sem isso, a chamada só fecha na mesma Wi-Fi.
              </p>
            )}
          </div>
        )}
        <div className={cn('flex flex-col gap-4 w-full', compact ? 'max-w-sm' : 'max-w-md')}>
          <motion.button onClick={handleCreate} disabled={roomBusy} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 px-6 py-4 min-h-[48px] rounded-xl bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/25 disabled:opacity-60">
            <Plus className="w-5 h-5" /> {roomBusy ? 'Abrindo sala…' : 'Criar Nova Sala'}
          </motion.button>
          {roomFull && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              Sala cheia! Máximo de {roomFull.maxParticipants} participantes.
            </div>
          )}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]/40" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-[var(--surface-base)] px-3 text-[var(--content-muted)]">ou entre com código</span></div>
          </div>
          <div className="flex gap-2">
            <input type="text" value={joinCode} onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Código de 6 dígitos"
              className="flex-1 min-h-[48px] px-4 py-3 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl text-center font-mono text-lg tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30"
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()} maxLength={6} />
            <motion.button onClick={handleJoin} disabled={joinCode.length !== 6 || roomBusy} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={cn('min-w-[48px] min-h-[48px] px-5 py-3 rounded-xl font-semibold transition-all', joinCode.length === 6 && !roomBusy ? 'bg-[var(--surface-raised)] border border-[var(--border)]' : 'opacity-50 cursor-not-allowed bg-[var(--surface-raised)]')}>
              <LinkIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('flex flex-col h-full', isFullscreen && 'fixed inset-0 z-50 bg-[var(--surface-base)]', themeClasses)}>
      {/* Room Entrance Animation */}
      <AnimatePresence>
        {showEntrance && (
          <RoomEntrance participantName={participantName} roomCode={room.code} onComplete={() => setShowEntrance(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-3 py-3 border-b border-[var(--border)]/40 bg-[var(--surface-sunken)]/30 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-default)]/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-[var(--brand-default)]" />
          </div>
          <div>
            <p className="text-xs text-[var(--content-muted)]">Sala</p>
            <p className="font-mono text-sm font-bold tracking-wider text-[var(--content-primary)]">{room.code}</p>
            <p className={cn(
              'text-[10px]',
              wsStatus === 'connected' ? 'text-green-500' : wsStatus === 'connecting' ? 'text-amber-500' : wsStatus === 'error' ? 'text-red-500' : 'text-[var(--content-muted)]',
            )}>
              {wsStatus === 'connected' ? 'Ao vivo' : wsStatus === 'connecting' ? 'Reconectando…' : wsStatus === 'error' ? 'Sem servidor — abas neste aparelho ainda sincronizam' : 'Desconectado'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 max-w-[40vw] overflow-x-auto" title={presence.map((p) => p.id === participantId ? 'Você' : p.name).join(', ')}>
            {(presence.length > 0 ? presence : room.participants.map((id) => ({ id, name: getParticipantLabel(id) }))).map((p) => (
              <div key={p.id} className="flex items-center gap-1 shrink-0">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[var(--surface-base)]"
                  style={{ backgroundColor: getParticipantColor(p.id) }} title={p.id === participantId ? 'Você' : p.name}>
                  {p.id === participantId ? 'Eu' : (p.name || p.id).slice(-2).toUpperCase()}
                </div>
              </div>
            ))}
            <span className="text-[10px] text-[var(--content-muted)] whitespace-nowrap">
              {Math.max(presence.length, room.participants.length)} aqui
            </span>
          </div>
          {wsStatus !== 'connected' && (
            <button
              type="button"
              onClick={() => chatServiceRef.current?.reconnect()}
              className="text-[10px] font-semibold px-2 py-1 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-200"
            >
              Reconectar
            </button>
          )}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleStartCall('voice')} disabled={isCallActive}
            className={cn('p-2 rounded-lg transition-all', isCallActive ? 'opacity-50' : 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20')}
            title="Chamada de voz"><Mic className="w-4 h-4" /></motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleStartCall('video')} disabled={isCallActive}
            className={cn('p-2 rounded-lg transition-all', isCallActive ? 'opacity-50' : 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20')}
            title="Chamada de vídeo"><Video className="w-4 h-4" /></motion.button>
          {isCallActive && (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsCallActive(false)}
              className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400"><PhoneOff className="w-4 h-4" /></motion.button>
          )}
          <button onClick={copyRoomLink} className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
          </button>
          <button onClick={toggleFullscreen} className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={async () => {
            if (room) {
              try {
                await fetch(`${COLAB_API}/rooms/${room.code}/participants/${participantId}/leave`, { method: 'POST' });
              } catch {}
            }
            setRoom(null); setIsCallActive(false); wsConnectedRef.current = false; setWsStatus('disconnected'); setChatMessages([]); setWsVerses([]); setSharedNotes([]); setQuizLive(false); setQuizAnswers([]); setQuizScores([]);
          }}
            className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]"><X className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Video Call Panel */}
      <AnimatePresence>
        {isCallActive && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="border-b border-[var(--border)]/40 overflow-hidden w-full">
            <div className="w-full min-h-[200px] max-h-[min(52dvh,440px)] h-[min(52dvh,440px)]">
              <VideoCall roomCode={room.code} participantId={participantId} displayName={participantName} callType={callType} existingService={chatServiceState} onEndCall={() => setIsCallActive(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)]/40 bg-[var(--surface-sunken)]/20 overflow-x-auto">
        {([
          { id: 'bible' as const, icon: BookOpen, label: 'Bíblia', count: 0 },
          { id: 'chat' as const, icon: MessageSquare, label: 'Chat', count: chatMessages.length },
          { id: 'notes' as const, icon: StickyNote, label: 'Notas', count: sharedNotes.length },
          { id: 'quiz' as const, icon: Zap, label: 'Quiz', count: 0 },
        ]).map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn('flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] text-xs font-medium transition-all border-b-2 whitespace-nowrap',
              activeTab === tab.id ? 'border-[var(--brand-default)] text-[var(--brand-default)]' : 'border-transparent text-[var(--content-muted)] hover:text-[var(--content-primary)]')}>
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.count > 0 && (
              <span className="px-1 py-0.5 text-[9px] rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)]">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Apresentação: ocupa tela toda quando sem bible panel, senão 40% */}
        {presentedVerse && (
          <div className={cn('relative bg-[#0a0a14] flex-shrink-0 transition-all duration-300', showBiblePanel ? 'h-[40%] min-h-[180px]' : 'flex-1')}>
            <RealtimeCursors cursors={realtimeCursors} currentUserId={participantId} verses={chapterVerses} />
            <PresentationInline texto={presentedVerse.texto} referencia={presentedVerse.referencia} apresentadoPor={presentedVerse.apresentadoPor}
              fontSize={presentationFontSize} mirror={presentationMirror} isController={true}
              onFontSizeChange={handlePresentationFontSize} onMirrorChange={handlePresentationMirror} onStop={handleStopPresentation} />
            {/* Navegação entre versículos */}
            <div className="absolute bottom-14 left-0 right-0 flex items-center justify-center gap-3 z-10">
              <button onClick={() => navigateVerse('prev')}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                title="Versículo anterior (←)">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-white/70 font-mono px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                {(() => {
                  const total = wsVerses.length > 0 ? wsVerses.length : chapterVerses.length;
                  const idx = wsVerses.length > 0 ? currentVerseIndex : chapterVerseIndex;
                  return idx >= 0 ? `${idx + 1}/${total}` : `${total} versículos`;
                })()}
              </span>
              <button onClick={() => navigateVerse('next')}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                title="Próximo versículo (→)">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={() => setAutoAdvance(!autoAdvance)}
                className={cn('p-2 rounded-full transition-colors backdrop-blur-sm', autoAdvance ? 'bg-green-500/80 text-white' : 'bg-black/60 text-white hover:bg-black/80')}
                title={autoAdvance ? 'Parar auto-avanço' : 'Auto-avanço (10s)'}>
                <Zap className="w-5 h-5" />
              </button>
            </div>
            {/* Toggle Bible panel */}
            <button onClick={() => setShowBiblePanel(!showBiblePanel)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/70 text-white text-xs font-medium hover:bg-black/90 transition-colors backdrop-blur-sm z-10">
              <BookOpen className="w-3.5 h-3.5" />
              {showBiblePanel ? 'Tela cheia' : 'Abrir Bíblia'}
            </button>
          </div>
        )}

        {/* Área de conteúdo (aba ativa) */}
        <div className={cn('flex-1 overflow-hidden', presentedVerse && showBiblePanel ? 'min-h-0' : presentedVerse ? 'hidden' : '')}>
          {activeTab === 'bible' ? (
            <div className="h-full flex flex-col">
              {wsVerses.length > 0 && (() => {
                const latest = wsVerses[wsVerses.length - 1];
                return (
                  <div className="px-4 py-3 border-b border-[var(--brand-default)]/25 bg-[var(--brand-subtle)]/70">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-1">
                      Verso compartilhado agora · {latest.displayName}
                    </p>
                    <p className="text-sm font-semibold text-[var(--content-primary)]">{latest.verse}</p>
                    <p className="text-sm font-serif-body text-[var(--content-secondary)] leading-relaxed mt-0.5">{latest.texto}</p>
                  </div>
                );
              })()}
              <PullToRefreshWrapper onRefresh={async () => { if (bibleSyncData) await prefetchAdjacent(bibleSyncData.livro, bibleSyncData.capitulo); }} className="flex-1 min-h-0">
                <BibleBrowser
                  onPresentVerse={handlePresentVerse}
                  onShareVerses={(verses) => { verses.forEach(v => handleShareBibleVerse(v.ref, v.text)); }}
                  syncData={bibleSyncData}
                  onNavigate={(data) => chatServiceRef.current?.sendBibleNavigation(data)}
                  isPresenter={room.participants[0] === participantId}
                  showPresentButton={true}
                />
              </PullToRefreshWrapper>
              {/* Lista de versículos compartilhados */}
              {wsVerses.length > 0 && (
                <div className="border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/30 max-h-[180px] overflow-y-auto">
                  <div className="px-3 py-2 flex items-center justify-between border-b border-[var(--border)]/20">
                    <span className="text-[10px] font-semibold text-[var(--content-muted)] uppercase tracking-wider">Versículos compartilhados ({wsVerses.length})</span>
                    {presentedVerse && (
                      <button onClick={handleStopPresentation} className="text-[10px] text-red-500 hover:text-red-600 font-medium">Parar apresentação</button>
                    )}
                  </div>
                  <div className="p-2 space-y-1">
                    {wsVerses.map((v, i) => (
                      <button key={v.id} onClick={() => navigateToVerse(i)}
                        className={cn('w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all text-xs',
                          currentVerseIndex === i ? 'bg-[var(--brand-default)]/15 border border-[var(--brand-default)]/30 text-[var(--brand-default)]' : 'hover:bg-[var(--surface-raised)] text-[var(--content-primary)]')}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                          style={{ backgroundColor: getParticipantColor(v.participantId) }}>
                          {i + 1}
                        </span>
                        <span className="font-semibold flex-shrink-0">{v.verse}</span>
                        <span className="truncate text-[var(--content-muted)]">{v.texto.slice(0, 60)}...</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'notes' ? (
            <SharedNotes notes={sharedNotes} currentUserId={participantId} onAdd={handleAddNote} onDelete={handleDeleteNote} onUpdate={handleUpdateNote} />
          ) : activeTab === 'quiz' ? (
            !quizLive ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[var(--brand-default)]/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-[var(--brand-default)]" />
                </div>
                <h3 className="font-display text-xl font-medium text-[var(--content-primary)]">Quiz ao vivo</h3>
                <p className="text-sm text-[var(--content-muted)] max-w-sm leading-relaxed">
                  Cinco perguntas bíblicas para o grupo. O anfitrião inicia; as respostas entram no ranking da sala.
                </p>
                {room.participants[0] === participantId ? (
                  <button
                    type="button"
                    onClick={handleStartLiveQuiz}
                    className="min-h-[44px] px-6 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/20"
                  >
                    Iniciar quiz ao vivo
                  </button>
                ) : (
                  <p className="text-xs text-[var(--content-muted)]">Aguardando o anfitrião iniciar…</p>
                )}
              </div>
            ) : (
            <LiveQuiz questions={quizQuestions} answers={quizAnswers} scores={quizScores} currentQuestionIndex={quizIndex}
              currentUserId={participantId} isHost={room.participants[0] === participantId}
              onAnswer={handleQuizAnswer} onNextQuestion={handleNextQuestion} onEndQuiz={() => { setQuizLive(false); setQuizIndex(0); setQuizAnswers([]); setQuizScores([]); setQuizQuestions(SAMPLE_QUESTIONS); }} />
            )
          ) : (
            <div className="space-y-3 p-4 h-full overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--brand-default)]/10 flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-[var(--brand-default)]" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-[var(--content-primary)] mb-1">Chat da sala</p>
                  <p className="text-xs text-[var(--content-muted)]">Envie mensagens para discutir com o grupo.</p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={cn('rounded-xl border border-[var(--border)]/40 overflow-hidden',
                      msg.participantId === participantId ? 'bg-[var(--brand-default)]/5 border-[var(--brand-default)]/20' : 'bg-[var(--surface-raised)]')}>
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]/20 bg-[var(--surface-sunken)]/30">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ backgroundColor: getParticipantColor(msg.participantId) }}>
                        {msg.participantId === participantId ? 'Eu' : msg.participantId.slice(-2).toUpperCase()}
                      </div>
                      <span className="text-xs font-medium text-[var(--content-primary)]">{msg.participantId === participantId ? 'Você' : msg.displayName}</span>
                      <span className="text-[10px] text-[var(--content-muted)] ml-auto">{new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="px-3 py-2"><p className="text-sm text-[var(--content-primary)]">{msg.message}</p></div>
                  </motion.div>
                ))
              )}
              {typingParticipants.size > 0 && (
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--content-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--content-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--content-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-[var(--content-muted)]">
                    {Array.from(typingParticipants.values()).join(', ')} {typingParticipants.size === 1 ? 'está' : 'estão'} digitando...
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input bar (chat/notes) */}
      {(activeTab === 'chat' || activeTab === 'notes') && (
        <div className="border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/30 p-3">
          <div className="flex gap-2">
            <input type="text" value={shareMessage}
              onChange={(e) => { setShareMessage(e.target.value); if (activeTab === 'chat') handleTyping(); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { if (activeTab === 'chat') handleSendMessage(); else if (activeTab === 'notes') { if (shareMessage.trim()) { handleAddNote(shareMessage); setShareMessage(''); } } } }}
              placeholder={activeTab === 'chat' ? 'Digite sua mensagem...' : 'Digite uma nota...'}
              className="flex-1 px-4 py-2.5 text-sm bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/20 transition-all" />
            <motion.button
              onClick={() => { if (activeTab === 'chat') handleSendMessage(); else if (activeTab === 'notes' && shareMessage.trim()) { handleAddNote(shareMessage); setShareMessage(''); } }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={!shareMessage.trim()}
              className={cn('px-3 py-2.5 rounded-xl transition-all flex-shrink-0',
                shareMessage.trim() ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]' : 'opacity-50 cursor-not-allowed bg-[var(--surface-raised)]')}>
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Settings Bottom Sheet */}
      <BottomSheet open={showSettings} onClose={() => setShowSettings(false)} title="Configurações da Sala">
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-3">Tema da Sala</h4>
            <RoomThemeSelector currentTheme={roomTheme} onSelect={setRoomTheme} />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2"> participantes ({room.participants.length})</h4>
            <div className="space-y-1">
              {room.participants.map(pId => (
                <div key={pId} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-raised)]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: getParticipantColor(pId) }}>
                    {pId === participantId ? 'Eu' : pId.slice(-2).toUpperCase()}
                  </div>
                  <span className="text-sm">{pId === participantId ? 'Você (host)' : getParticipantLabel(pId)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>

      {/* Incoming call modal */}
      <AnimatePresence>
        {incomingCall && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--surface-base)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                {incomingCall.callType === 'video' ? <Video className="w-8 h-8 text-green-500" /> : <Mic className="w-8 h-8 text-green-500" />}
              </div>
              <h3 className="font-display text-xl font-semibold mb-1 text-[var(--content-primary)]">
                Chamada {incomingCall.callType === 'video' ? 'de Vídeo' : 'de Voz'}
              </h3>
              <p className="text-sm text-[var(--content-muted)] mb-6">{incomingCall.callerName} está chamando...</p>
              <div className="flex gap-3 justify-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRejectCall}
                  className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold">Recusar</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAcceptCall}
                  className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold">Aceitar</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
