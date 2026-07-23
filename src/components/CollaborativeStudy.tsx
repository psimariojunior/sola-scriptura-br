'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, LogIn, Share2, Copy, MessageSquare,
  BookOpen, X, Link as LinkIcon, Check, PhoneOff,
  Mic, Video, Send, MonitorPlay
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

type TabType = 'chat' | 'verses' | 'presentation' | 'bible';

export function CollaborativeStudy({ initialCode, compact = false }: CollaborativeStudyProps) {
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [shareInput, setShareInput] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [verseInput, setVerseInput] = useState({ livro: '', capitulo: '', versiculo: '', texto: '' });
  const [isCallActive, setIsCallActive] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('verses');
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatServiceRef = useRef<WebRTCService | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const participantId = getParticipantId();
  const participantName = getParticipantLabel(participantId);

  // Conectar serviço WebSocket para chat/sync (independente da chamada)
  useEffect(() => {
    if (!room) return;
    const svc = createWebRTCService();
    chatServiceRef.current = svc;

    svc.onChatMessage((msg) => {
      setChatMessages(prev => {
        if (prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    svc.onVerseShared((verse) => {
      setWsVerses(prev => {
        if (prev.some(v => v.id === verse.id)) return prev;
        return [...prev, verse];
      });
    });

    svc.onTypingStart((data) => {
      setTypingParticipants(prev => new Map(prev).set(data.participantId, data.displayName));
    });

    svc.onTypingStop((participantId) => {
      setTypingParticipants(prev => {
        const next = new Map(prev);
        next.delete(participantId);
        return next;
      });
    });

    svc.onCallInvite((data) => setIncomingCall(data));
    svc.onCallAccept(() => setIncomingCall(null));
    svc.onCallReject(() => setIncomingCall(null));

    svc.onBibleNavigation((data) => {
      setBibleSyncData(data);
    });

    svc.onPresentationSync((data) => {
      if (data.action === 'stop') {
        setPresentedVerse(null);
      } else if (data.action === 'navigate' && data.texto) {
        setPresentedVerse({
          texto: data.texto,
          referencia: data.livro ? `${data.livro} ${data.capitulo}:${data.versiculo}` : '',
          apresentadoPor: data.presentedBy || '',
        });
      } else if (data.action === 'fontSize' && data.fontSize) {
        setPresentationFontSize(data.fontSize);
      } else if (data.action === 'mirror' && data.mirror !== undefined) {
        setPresentationMirror(data.mirror!);
      }
    });

    // Conectar ao room via WebSocket
    const stream = svc.getLocalStream(false, false).catch(() => {});
    svc.connect(room.code, participantId, participantName);

    return () => {
      svc.disconnect();
      chatServiceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.code]);

  // Auto-join via initialCode
  useEffect(() => {
    if (initialCode) {
      const found = joinStudyRoom(initialCode);
      if (found) setRoom(found);
    }
  }, [initialCode]);

  // Verificar versículo pendente da página da Bíblia
  useEffect(() => {
    if (!room) return;
    try {
      const pending = localStorage.getItem('ssb_collab_share_pending');
      if (pending) {
        const data = JSON.parse(pending);
        localStorage.removeItem('ssb_collab_share_pending');

        const verseData: VerseSharedEvent = {
          id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          participantId,
          displayName: participantName,
          verse: `${data.livro} ${data.capitulo}:${data.versiculo}`,
          livro: data.livro,
          capitulo: data.capitulo,
          versiculo: data.versiculo,
          texto: data.texto,
          timestamp: Date.now(),
        };

        setWsVerses(prev => [...prev, verseData]);
        chatServiceRef.current?.sendVerseShared(verseData);
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.code]);

  // Scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  // Scroll versículos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [wsVerses.length]);

  const handleCreate = useCallback(() => {
    const newRoom = createStudyRoom();
    setRoom(newRoom);
  }, []);

  const handleJoin = useCallback(() => {
    if (joinCode.length !== 6) return;
    const found = joinStudyRoom(joinCode);
    if (found) {
      setRoom(found);
      setJoinCode('');
    }
  }, [joinCode]);

  // Compartilhar versículo
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
      participantId,
      displayName: participantName,
      verse: ref,
      livro,
      capitulo: cap,
      versiculo: verso,
      texto,
      message: shareMessage || undefined,
      timestamp: Date.now(),
    };

    // Adicionar localmente
    setWsVerses(prev => [...prev, verseData]);
    setActiveTab('verses');

    // Enviar via WebSocket
    chatServiceRef.current?.sendVerseShared(verseData);

    setShareInput('');
    setShareMessage('');
    setVerseInput({ livro: '', capitulo: '', versiculo: '', texto: '' });
    setShowShare(false);
  }, [room, shareInput, shareMessage, verseInput, participantId, participantName]);

  const handleShareBibleVerse = useCallback((ref: string, text: string) => {
    if (!room) return;

    const verseData: VerseSharedEvent = {
      id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      participantId,
      displayName: participantName,
      verse: ref,
      livro: ref,
      capitulo: 0,
      versiculo: 0,
      texto: text,
      timestamp: Date.now(),
    };

    setWsVerses(prev => [...prev, verseData]);
    chatServiceRef.current?.sendVerseShared(verseData);
  }, [room, participantId, participantName]);

  // Enviar mensagem no chat
  const handleSendMessage = useCallback(() => {
    if (!room || !shareMessage.trim()) return;

    const msg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      participantId,
      displayName: participantName,
      message: shareMessage,
      timestamp: Date.now(),
    };

    // Adicionar localmente
    setChatMessages(prev => [...prev, msg]);

    // Enviar via WebSocket
    chatServiceRef.current?.sendChatMessage(
      msg.id, participantId, participantName, shareMessage
    );

    setShareMessage('');
    chatServiceRef.current?.sendTypingStop(participantId);
  }, [room, shareMessage, participantId, participantName]);

  const handleTyping = useCallback(() => {
    if (!chatServiceRef.current) return;
    chatServiceRef.current.sendTypingStart(participantId, participantName);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      chatServiceRef.current?.sendTypingStop(participantId);
    }, 2000);
  }, [participantId, participantName]);

  // Apresentar versículo
  const handlePresentVerse = useCallback((verse: VerseSharedEvent) => {
    setPresentedVerse({
      texto: verse.texto,
      referencia: verse.verse,
      apresentadoPor: verse.displayName || getParticipantLabel(verse.participantId),
    });
    setActiveTab('presentation');
    chatServiceRef.current?.sendPresentationSync({
      action: 'navigate',
      livro: verse.livro,
      capitulo: verse.capitulo,
      versiculo: verse.versiculo,
      texto: verse.texto,
      presentedBy: participantName,
    });
  }, [participantName]);

  const handleStopPresentation = useCallback(() => {
    setPresentedVerse(null);
    chatServiceRef.current?.sendPresentationSync({ action: 'stop' });
  }, []);

  const handlePresentationFontSize = useCallback((size: number) => {
    setPresentationFontSize(size);
    chatServiceRef.current?.sendPresentationSync({ action: 'fontSize', fontSize: size });
  }, []);

  const handlePresentationMirror = useCallback((mirror: boolean) => {
    setPresentationMirror(mirror);
    chatServiceRef.current?.sendPresentationSync({ action: 'mirror', mirror });
  }, []);

  const handleStartCall = useCallback((type: 'video' | 'voice') => {
    setCallType(type);
    setIsCallActive(true);
    chatServiceRef.current?.sendCallInvite(participantId, participantName, type);
  }, [participantId, participantName]);

  const handleAcceptCall = useCallback(() => {
    if (incomingCall) {
      chatServiceRef.current?.sendCallAccept(incomingCall.callerSocketId, participantName);
      setCallType(incomingCall.callType);
      setIsCallActive(true);
    }
    setIncomingCall(null);
  }, [incomingCall, participantName]);

  const handleRejectCall = useCallback(() => {
    if (incomingCall) {
      chatServiceRef.current?.sendCallReject(incomingCall.callerSocketId, participantName);
    }
    setIncomingCall(null);
  }, [incomingCall, participantName]);

  const copyRoomLink = useCallback(() => {
    if (!room) return;
    const url = `${window.location.origin}/estudo-colaborativo?code=${room.code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [room]);

  // Tela de criação/join
  if (!room) {
    return (
      <div className={cn(
        'flex flex-col items-center justify-center gap-6',
        compact ? 'py-4' : 'py-16'
      )}>
        {!compact && (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--brand-default)]/20 to-[var(--brand-default)]/5 flex items-center justify-center border border-[var(--brand-default)]/20"
            >
              <Users className="w-10 h-10 text-[var(--brand-default)]" />
            </motion.div>
            <h2 className="font-display text-3xl font-light mb-2">Estudo Colaborativo</h2>
            <p className="text-[var(--content-muted)] max-w-md">
              Estude a Bíblia em tempo real com amigos. Crie ou entre em uma sala para compartilhar versículos e discutir.
            </p>
          </div>
        )}

        <div className={cn('flex flex-col gap-4 w-full', compact ? 'max-w-sm' : 'max-w-md')}>
          <motion.button
            onClick={handleCreate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-lg shadow-[var(--brand-default)]/25 hover:shadow-xl hover:shadow-[var(--brand-default)]/35 transition-shadow"
          >
            <Plus className="w-5 h-5" />
            Criar Nova Sala
          </motion.button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]/40" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[var(--surface-base)] px-3 text-[var(--content-muted)]">ou entre com código</span>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Código de 6 dígitos"
              className="flex-1 px-4 py-3 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl text-center font-mono text-lg tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/30 focus:border-[var(--brand-default)]/50 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              maxLength={6}
            />
            <motion.button
              onClick={handleJoin}
              disabled={joinCode.length !== 6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'px-5 py-3 rounded-xl font-semibold transition-all',
                joinCode.length === 6
                  ? 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-primary)] hover:bg-[var(--surface-sunken)]'
                  : 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-muted)] opacity-50 cursor-not-allowed'
              )}
            >
              <LinkIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  const participantColor = getParticipantColor(participantId);

  return (
    <div className="flex flex-col h-full">
      {/* Header da sala */}
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
              <div
                key={pId}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[var(--surface-base)]"
                style={{ backgroundColor: getParticipantColor(pId) }}
                title={getParticipantLabel(pId)}
              >
                {pId === participantId ? 'Eu' : pId.slice(-2).toUpperCase()}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStartCall('voice')}
              disabled={isCallActive}
              className={cn(
                'p-2 rounded-lg transition-all',
                isCallActive ? 'opacity-50 cursor-not-allowed text-[var(--content-muted)]'
                  : 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20'
              )}
              title="Chamada de voz"
            >
              <Mic className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStartCall('video')}
              disabled={isCallActive}
              className={cn(
                'p-2 rounded-lg transition-all',
                isCallActive ? 'opacity-50 cursor-not-allowed text-[var(--content-muted)]'
                  : 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20'
              )}
              title="Chamada de vídeo"
            >
              <Video className="w-4 h-4" />
            </motion.button>
            {isCallActive && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCallActive(false)}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20"
                title="Encerrar chamada"
              >
                <PhoneOff className="w-4 h-4" />
              </motion.button>
            )}
          </div>
          <button
            onClick={copyRoomLink}
            className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)] hover:text-[var(--content-primary)]"
            title="Copiar link da sala"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => { setRoom(null); setIsCallActive(false); }}
            className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)] hover:text-[var(--content-primary)]"
            title="Sair da sala"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Call Panel */}
      <AnimatePresence>
        {isCallActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 400 }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-[var(--border)]/40 overflow-hidden"
          >
            <VideoCall
              roomCode={room.code}
              participantId={participantId}
              displayName={participantName}
              callType={callType}
              onEndCall={() => setIsCallActive(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Abas */}
      <div className="flex border-b border-[var(--border)]/40 bg-[var(--surface-sunken)]/20">
        {([
          { id: 'verses' as const, icon: BookOpen, label: 'Versículos', count: wsVerses.length },
          { id: 'bible' as const, icon: BookOpen, label: 'Bíblia', count: 0 },
          { id: 'chat' as const, icon: MessageSquare, label: 'Chat', count: chatMessages.length },
          { id: 'presentation' as const, icon: MonitorPlay, label: 'Apresentar', count: 0 },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2',
              activeTab === tab.id
                ? 'border-[var(--brand-default)] text-[var(--brand-default)]'
                : 'border-transparent text-[var(--content-muted)] hover:text-[var(--content-primary)]'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)]">
                {tab.count}
              </span>
            )}
            {tab.id === 'presentation' && presentedVerse && (
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'presentation' ? (
          <div className="h-full">
            {presentedVerse ? (
              <PresentationInline
                texto={presentedVerse.texto}
                referencia={presentedVerse.referencia}
                apresentadoPor={presentedVerse.apresentadoPor}
                fontSize={presentationFontSize}
                mirror={presentationMirror}
                isController={true}
                onFontSizeChange={handlePresentationFontSize}
                onMirrorChange={handlePresentationMirror}
                onStop={handleStopPresentation}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
                <MonitorPlay className="w-12 h-12 text-[var(--content-muted)]/30" strokeWidth={1} />
                <p className="text-sm text-[var(--content-muted)] text-center">
                  Nenhum versículo sendo apresentado.
                </p>
                <p className="text-xs text-[var(--content-muted)]/70 text-center">
                  Compartilhe um versículo e clique &quot;Apresentar&quot; para exibir em tela grande.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'verses' ? (
              <div className="space-y-3">
                {wsVerses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--brand-default)]/10 flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-[var(--brand-default)]" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-medium text-[var(--content-primary)] mb-1">
                      Compartilhe versículos
                    </p>
                    <p className="text-xs text-[var(--content-muted)] mb-4 max-w-xs">
                      Clique no ícone de livro na barra abaixo para compartilhar um versículo com o grupo.
                    </p>
                    <motion.button
                      onClick={() => setShowShare(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-xs font-medium hover:bg-[var(--brand-default)]/20 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Compartilhar agora
                    </motion.button>
                  </div>
                ) : (
                  wsVerses.map((v) => (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-[var(--border)]/40 overflow-hidden bg-[var(--surface-raised)]"
                    >
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]/20 bg-[var(--surface-sunken)]/30">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                          style={{ backgroundColor: getParticipantColor(v.participantId) }}
                        >
                          {v.participantId === participantId ? 'Eu' : v.participantId.slice(-2).toUpperCase()}
                        </div>
                        <span className="text-[10px] text-[var(--content-muted)]">
                          {new Date(v.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-[10px] font-semibold text-[var(--brand-default)] ml-auto">{v.verse}</span>
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-sm font-serif-body text-[var(--content-primary)] leading-relaxed">
                          {v.texto}
                        </p>
                        {v.message && (
                          <p className="text-xs text-[var(--content-muted)] mt-2 italic">
                            &ldquo;{v.message}&rdquo;
                          </p>
                        )}
                      </div>
                      <div className="px-3 py-2 border-t border-[var(--border)]/20">
                        <button
                          onClick={() => handlePresentVerse(v)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-lg bg-[var(--brand-default)]/10 text-[var(--brand-default)] hover:bg-[var(--brand-default)]/20 transition-colors"
                        >
                          <MonitorPlay className="w-3 h-3" />
                          Apresentar em tela grande
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : activeTab === 'bible' ? (
              <div className="h-full">
                <BibleBrowser
                  onShareVerses={(verses) => {
                    verses.forEach(v => {
                      handleShareBibleVerse(v.ref, v.text);
                    });
                    setActiveTab('verses');
                  }}
                  syncData={bibleSyncData}
                  onNavigate={(data) => {
                    chatServiceRef.current?.sendBibleNavigation(data);
                  }}
                  isPresenter={room.participants[0] === participantId}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--brand-default)]/10 flex items-center justify-center mb-4">
                      <MessageSquare className="w-8 h-8 text-[var(--brand-default)]" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-medium text-[var(--content-primary)] mb-1">
                      Inicie uma conversa
                    </p>
                    <p className="text-xs text-[var(--content-muted)]">
                      Envie mensagens para discutir com o grupo.
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'rounded-xl border border-[var(--border)]/40 overflow-hidden',
                        msg.participantId === participantId
                          ? 'bg-[var(--brand-default)]/5 border-[var(--brand-default)]/20'
                          : 'bg-[var(--surface-raised)]'
                      )}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]/20 bg-[var(--surface-sunken)]/30">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                          style={{ backgroundColor: getParticipantColor(msg.participantId) }}
                        >
                          {msg.participantId === participantId ? 'Eu' : msg.participantId.slice(-2).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium text-[var(--content-primary)]">
                          {msg.participantId === participantId ? 'Você' : msg.displayName}
                        </span>
                        <span className="text-[10px] text-[var(--content-muted)] ml-auto">
                          {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-sm text-[var(--content-primary)]">{msg.message}</p>
                      </div>
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
        )}
      </div>

      {/* Barra de envio */}
      <div className="border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/30 p-3">
        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 space-y-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
                <span className="text-xs font-medium text-[var(--brand-default)]">Compartilhar versículo</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Livro (ex: João)"
                  value={verseInput.livro}
                  onChange={(e) => setVerseInput(p => ({ ...p, livro: e.target.value }))}
                  className="px-3 py-2 text-xs bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]/30"
                />
                <input
                  type="text"
                  placeholder="Capítulo:Verso (3:16)"
                  value={shareInput}
                  onChange={(e) => setShareInput(e.target.value)}
                  className="px-3 py-2 text-xs bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]/30"
                />
                <input
                  type="text"
                  placeholder="Texto do versículo"
                  value={verseInput.texto}
                  onChange={(e) => setVerseInput(p => ({ ...p, texto: e.target.value }))}
                  className="px-3 py-2 text-xs bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]/30"
                />
              </div>
              <input
                type="text"
                placeholder="Nota ou comentário (opcional)"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleShare()}
                className="w-full px-3 py-2 text-xs bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]/30"
              />
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={!shareInput.trim()}
                className={cn(
                  'w-full py-2 rounded-lg text-xs font-medium transition-all',
                  shareInput.trim()
                    ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                    : 'bg-[var(--surface-raised)] text-[var(--content-muted)] opacity-50 cursor-not-allowed'
                )}
              >
                Compartilhar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          <motion.button
            onClick={() => {
              setShowShare(!showShare);
              if (activeTab !== 'verses') setActiveTab('verses');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'px-3 py-2.5 rounded-xl transition-all flex-shrink-0',
              showShare
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                : 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:border-[var(--brand-default)]/30'
            )}
            title="Compartilhar versículo"
          >
            <BookOpen className="w-4 h-4" />
          </motion.button>

          <input
            type="text"
            value={shareMessage}
            onChange={(e) => {
              setShareMessage(e.target.value);
              if (activeTab === 'chat') handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (showShare && activeTab === 'verses') handleShare();
                else if (activeTab === 'chat') handleSendMessage();
              }
            }}
            placeholder={
              showShare
                ? 'Referência e texto acima, depois clique Compartilhar...'
                : activeTab === 'chat'
                  ? 'Digite sua mensagem...'
                  : 'Digite algo ou compartilhe um versículo...'
            }
            className="flex-1 px-4 py-2.5 text-sm bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/20 transition-all"
          />
          {activeTab === 'chat' && (
            <motion.button
              onClick={handleSendMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!shareMessage.trim()}
              className={cn(
                'px-3 py-2.5 rounded-xl transition-all flex-shrink-0',
                shareMessage.trim()
                  ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                  : 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-muted)] opacity-50 cursor-not-allowed'
              )}
              title="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Modal de chamada entrante */}
      <AnimatePresence>
        {incomingCall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--surface-base)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                {incomingCall.callType === 'video' ? (
                  <Video className="w-8 h-8 text-green-500" />
                ) : (
                  <Mic className="w-8 h-8 text-green-500" />
                )}
              </div>
              <h3 className="font-display text-xl font-semibold mb-1 text-[var(--content-primary)]">
                Chamada {incomingCall.callType === 'video' ? 'de Vídeo' : 'de Voz'}
              </h3>
              <p className="text-sm text-[var(--content-muted)] mb-6">
                {incomingCall.callerName} está chamando...
              </p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRejectCall}
                  className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
                >
                  Recusar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAcceptCall}
                  className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
                >
                  Aceitar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
