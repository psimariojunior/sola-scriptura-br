'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Share2, Copy, MessageSquare,
  BookOpen, X, Link as LinkIcon, Check, PhoneOff,
  Mic, Video, Send, MonitorPlay, StickyNote, Zap,
  Palette, Maximize2, Minimize2, Settings, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  createStudyRoom,
  joinStudyRoom,
  getParticipantId,
  getParticipantColor,
  getParticipantLabel,
  type StudyRoom,
} from '@/lib/collaborative';
import { VideoCall } from '@/components/VideoCall';
import { PresentationInline } from '@/components/Apresentacao/PresentationInline';
import { BibleBrowser } from '@/components/BibleBrowser';
import { SharedNotes } from '@/components/SharedNotes';
import { LiveQuiz } from '@/components/LiveQuiz';
import { RealtimeCursors } from '@/components/RealtimeCursors';
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
} from '@/lib/webrtc';

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

export function CollaborativeStudy({ initialCode, compact = false }: CollaborativeStudyProps) {
  const [room, setRoom] = useState<StudyRoom | null>(null);
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
  const [bibleSyncData, setBibleSyncData] = useState<{ livro: string; capitulo: number; traducao: string } | null>(null);
  const [showEntrance, setShowEntrance] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [roomTheme, setRoomTheme] = useState('default');
  const [sharedNotes, setSharedNotes] = useState<SharedNote[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<any[]>([]);
  const [quizScores, setQuizScores] = useState<any[]>([]);
  const [showBiblePanel, setShowBiblePanel] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatServiceRef = useRef<WebRTCService | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const participantId = getParticipantId();
  const participantName = getParticipantLabel(participantId);
  const { containerRef, isFullscreen, toggleFullscreen } = useFullscreen();
  const { prefetchAdjacent } = useChapterPrefetch();

  // Conectar serviço WebSocket
  useEffect(() => {
    if (!room) return;
    const svc = createWebRTCService();
    chatServiceRef.current = svc;

    svc.onChatMessage((msg) => {
      setChatMessages(prev => prev.some(m => m.id === msg.id) ? prev : [...prev, msg]);
    });

    svc.onVerseShared((verse) => {
      setWsVerses(prev => prev.some(v => v.id === verse.id) ? prev : [...prev, verse]);
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

    svc.onPresentationSync((data) => {
      if (data.action === 'stop') setPresentedVerse(null);
      else if (data.action === 'navigate' && data.texto) {
        setPresentedVerse({ texto: data.texto, referencia: data.livro ? `${data.livro} ${data.capitulo}:${data.versiculo}` : '', apresentadoPor: data.presentedBy || '' });
      } else if (data.action === 'fontSize' && data.fontSize) setPresentationFontSize(data.fontSize);
      else if (data.action === 'mirror' && data.mirror !== undefined) setPresentationMirror(data.mirror!);
    });

    svc.getLocalStream(false, false).catch(() => {});
    svc.connect(room.code, participantId, participantName);

    return () => { svc.disconnect(); chatServiceRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.code]);

  // Auto-join via initialCode
  useEffect(() => {
    if (initialCode) {
      const found = joinStudyRoom(initialCode);
      if (found) setRoom(found);
    }
  }, [initialCode]);

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

  // Prefetch adjacent chapters when bible navigates
  useEffect(() => {
    if (bibleSyncData) prefetchAdjacent(bibleSyncData.livro, bibleSyncData.capitulo);
  }, [bibleSyncData, prefetchAdjacent]);

  const handleCreate = useCallback(() => {
    const newRoom = createStudyRoom();
    setRoom(newRoom);
    setShowEntrance(true);
  }, []);

  const handleJoin = useCallback(() => {
    if (joinCode.length !== 6) return;
    const found = joinStudyRoom(joinCode);
    if (found) { setRoom(found); setJoinCode(''); setShowEntrance(true); }
  }, [joinCode]);

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

  const handleShareBibleVerse = useCallback((ref: string, text: string) => {
    if (!room) return;
    const verseData: VerseSharedEvent = {
      id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      participantId, displayName: participantName, verse: ref,
      livro: ref, capitulo: 0, versiculo: 0, texto: text, timestamp: Date.now(),
    };
    setWsVerses(prev => [...prev, verseData]);
    chatServiceRef.current?.sendVerseShared(verseData);
  }, [room, participantId, participantName]);

  const handleSendMessage = useCallback(() => {
    if (!room || !shareMessage.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      participantId, displayName: participantName, message: shareMessage, timestamp: Date.now(),
    };
    setChatMessages(prev => [...prev, msg]);
    chatServiceRef.current?.sendChatMessage(msg.id, participantId, participantName, shareMessage);
    setShareMessage('');
    chatServiceRef.current?.sendTypingStop(participantId);
  }, [room, shareMessage, participantId, participantName]);

  const handleTyping = useCallback(() => {
    if (!chatServiceRef.current) return;
    chatServiceRef.current.sendTypingStart(participantId, participantName);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => chatServiceRef.current?.sendTypingStop(participantId), 2000);
  }, [participantId, participantName]);

  const handlePresentVerse = useCallback((verseOrRef: VerseSharedEvent | string, text?: string) => {
    if (typeof verseOrRef === 'string') {
      setPresentedVerse({ texto: text || '', referencia: verseOrRef, apresentadoPor: participantName });
      chatServiceRef.current?.sendPresentationSync({ action: 'navigate', texto: text, presentedBy: participantName });
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
    if (wsVerses.length === 0) return;
    let newIndex: number;
    if (direction === 'next') {
      newIndex = currentVerseIndex < wsVerses.length - 1 ? currentVerseIndex + 1 : 0;
    } else {
      newIndex = currentVerseIndex > 0 ? currentVerseIndex - 1 : wsVerses.length - 1;
    }
    const verse = wsVerses[newIndex];
    setCurrentVerseIndex(newIndex);
    setPresentedVerse({ texto: verse.texto, referencia: verse.verse, apresentadoPor: verse.displayName || getParticipantLabel(verse.participantId) });
    chatServiceRef.current?.sendPresentationSync({ action: 'navigate', texto: verse.texto, presentedBy: participantName });
  }, [wsVerses, currentVerseIndex, participantName]);

  const navigateToVerse = useCallback((index: number) => {
    if (index < 0 || index >= wsVerses.length) return;
    const verse = wsVerses[index];
    setCurrentVerseIndex(index);
    setPresentedVerse({ texto: verse.texto, referencia: verse.verse, apresentadoPor: verse.displayName || getParticipantLabel(verse.participantId) });
    chatServiceRef.current?.sendPresentationSync({ action: 'navigate', texto: verse.texto, presentedBy: participantName });
  }, [wsVerses, participantName]);

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
  const handleAddNote = useCallback((content: string, verseRef?: string) => {
    const colors = ['#fef9c3', '#dbeafe', '#dcfce7', '#fce7f3', '#f3e8ff', '#fed7aa'];
    setSharedNotes(prev => [...prev, {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      authorId: participantId, authorName: participantName, content, verseRef, timestamp: Date.now(),
      color: colors[prev.length % colors.length],
    }]);
  }, [participantId, participantName]);

  const handleDeleteNote = useCallback((id: string) => {
    setSharedNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleUpdateNote = useCallback((id: string, content: string) => {
    setSharedNotes(prev => prev.map(n => n.id === id ? { ...n, content } : n));
  }, []);

  // Quiz handlers
  const handleQuizAnswer = useCallback((questionId: string, selectedIndex: number) => {
    const question = SAMPLE_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;
    setQuizAnswers(prev => [...prev, {
      participantId, participantName, questionId, selectedIndex,
      timeSpent: 0, isCorrect: selectedIndex === question.correctIndex,
    }]);
  }, [participantId, participantName]);

  const handleNextQuestion = useCallback(() => {
    if (quizIndex < SAMPLE_QUESTIONS.length - 1) setQuizIndex(prev => prev + 1);
    else {
      // Calculate scores
      const scores = [{ participantId, participantName, score: quizAnswers.filter(a => a.isCorrect).length * 10, correctAnswers: quizAnswers.filter(a => a.isCorrect).length, totalAnswered: quizAnswers.length, avgTime: 0 }];
      setQuizScores(scores);
    }
  }, [quizIndex, quizAnswers, participantId, participantName]);

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
            <p className="text-[var(--content-muted)] max-w-md">Estude a Bíblia em tempo real com amigos. Crie ou entre em uma sala.</p>
          </div>
        )}
        <div className={cn('flex flex-col gap-4 w-full', compact ? 'max-w-sm' : 'max-w-md')}>
          <motion.button onClick={handleCreate} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/25">
            <Plus className="w-5 h-5" /> Criar Nova Sala
          </motion.button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]/40" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-[var(--surface-base)] px-3 text-[var(--content-muted)]">ou entre com código</span></div>
          </div>
          <div className="flex gap-2">
            <input type="text" value={joinCode} onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Código de 6 dígitos"
              className="flex-1 px-4 py-3 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl text-center font-mono text-lg tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30"
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()} maxLength={6} />
            <motion.button onClick={handleJoin} disabled={joinCode.length !== 6} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={cn('px-5 py-3 rounded-xl font-semibold transition-all', joinCode.length === 6 ? 'bg-[var(--surface-raised)] border border-[var(--border)]' : 'opacity-50 cursor-not-allowed bg-[var(--surface-raised)]')}>
              <LinkIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('flex flex-col h-full', isFullscreen && 'fixed inset-0 z-50 bg-[var(--surface-base)]')}>
      {/* Room Entrance Animation */}
      <AnimatePresence>
        {showEntrance && (
          <RoomEntrance participantName={participantName} roomCode={room.code} onComplete={() => setShowEntrance(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/40 bg-[var(--surface-sunken)]/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-default)]/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-[var(--brand-default)]" />
          </div>
          <div>
            <p className="text-xs text-[var(--content-muted)]">Sala</p>
            <p className="font-mono text-sm font-bold tracking-wider text-[var(--content-primary)]">{room.code}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {room.participants.map((pId) => (
              <div key={pId} className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[var(--surface-base)]"
                style={{ backgroundColor: getParticipantColor(pId) }} title={getParticipantLabel(pId)}>
                {pId === participantId ? 'Eu' : pId.slice(-2).toUpperCase()}
              </div>
            ))}
          </div>
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
          <button onClick={() => { setRoom(null); setIsCallActive(false); }}
            className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]"><X className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Video Call Panel */}
      <AnimatePresence>
        {isCallActive && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 400 }} exit={{ opacity: 0, height: 0 }}
            className="border-b border-[var(--border)]/40 overflow-hidden">
            <VideoCall roomCode={room.code} participantId={participantId} displayName={participantName} callType={callType} onEndCall={() => setIsCallActive(false)} />
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
            className={cn('flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-all border-b-2 whitespace-nowrap',
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
            <RealtimeCursors cursors={[]} currentUserId={participantId} verses={[]} />
            <PresentationInline texto={presentedVerse.texto} referencia={presentedVerse.referencia} apresentadoPor={presentedVerse.apresentadoPor}
              fontSize={presentationFontSize} mirror={presentationMirror} isController={true}
              onFontSizeChange={handlePresentationFontSize} onMirrorChange={handlePresentationMirror} onStop={handleStopPresentation} />
            {/* Navegação entre versículos */}
            {wsVerses.length > 0 && (
              <div className="absolute bottom-14 left-0 right-0 flex items-center justify-center gap-3 z-10">
                <button onClick={() => navigateVerse('prev')}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                  title="Versículo anterior (←)">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-white/70 font-mono px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                  {currentVerseIndex >= 0 ? `${currentVerseIndex + 1}/${wsVerses.length}` : `${wsVerses.length} versículos`}
                </span>
                <button onClick={() => navigateVerse('next')}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                  title="Próximo versículo (→)">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
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
            <LiveQuiz questions={SAMPLE_QUESTIONS} answers={quizAnswers} scores={quizScores} currentQuestionIndex={quizIndex}
              currentUserId={participantId} isHost={room.participants[0] === participantId}
              onAnswer={handleQuizAnswer} onNextQuestion={handleNextQuestion} onEndQuiz={() => { setQuizStarted(false); setQuizIndex(0); setQuizAnswers([]); setQuizScores([]); }} />
          ) : (
            <div className="space-y-3 p-4">
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
