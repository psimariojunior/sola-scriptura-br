'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, LogIn, Share2, Copy, MessageSquare,
  BookOpen, X, Link as LinkIcon, Check, Phone, PhoneOff,
  Mic, Video, Bell, BellOff, Send, MonitorPlay
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  createStudyRoom,
  joinStudyRoom,
  shareVerse,
  onVerseShared,
  sendMessage,
  getParticipantId,
  getParticipantColor,
  getParticipantLabel,
  type VerseShared,
  type StudyRoom,
} from '@/lib/collaborative';
import { VideoCall, CallButton } from '@/components/VideoCall';
import { PresentationInline } from '@/components/Apresentacao/PresentationInline';
import {
  createWebRTCService,
  type WebRTCService,
  type ChatMessage,
  type VerseSharedEvent,
  type TypingEvent,
  type CallInviteEvent,
  type PresentationSyncEvent,
} from '@/lib/webrtc';

interface CollaborativeStudyProps {
  initialCode?: string;
  compact?: boolean;
}

type TabType = 'chat' | 'verses' | 'presentation';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<WebRTCService | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const participantId = getParticipantId();
  const participantName = getParticipantLabel(participantId);

  useEffect(() => {
    if (initialCode) {
      const found = joinStudyRoom(initialCode);
      if (found) setRoom(found);
    }
  }, [initialCode]);

  useEffect(() => {
    if (!room) return;
    const unsub = onVerseShared(room.code, (shared) => {
      setRoom(prev => {
        if (!prev) return prev;
        if (prev.verses.some(v => v.id === shared.id)) return prev;
        return { ...prev, verses: [...prev.verses, shared] };
      });
    });
    return unsub;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.code]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [room?.verses.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  const handlePresentVerse = useCallback((verse: VerseSharedEvent) => {
    setPresentedVerse({
      texto: verse.texto,
      referencia: verse.verse,
      apresentadoPor: verse.displayName || getParticipantLabel(verse.participantId),
    });
    setActiveTab('presentation');
    if (serviceRef.current) {
      serviceRef.current.sendPresentationSync({
        action: 'navigate',
        livro: verse.livro,
        capitulo: verse.capitulo,
        versiculo: verse.versiculo,
        texto: verse.texto,
        presentedBy: participantName,
      });
    }
  }, [participantName]);

  const handlePresentDirectly = useCallback(() => {
    if (!shareInput.trim()) return;
    const match = shareInput.trim().match(/^(\d{1,3})\s*[:\.]\s*(\d{1,3})$/);
    const texto = verseInput.texto || shareMessage || 'Versículo compartilhado';
    const ref = match ? `${verseInput.livro || 'Bíblia'} ${match[1]}:${match[2]}` : shareInput.trim();
    setPresentedVerse({
      texto,
      referencia: ref,
      apresentadoPor: participantName,
    });
    setActiveTab('presentation');
    if (serviceRef.current) {
      serviceRef.current.sendPresentationSync({
        action: 'navigate',
        livro: verseInput.livro || 'Bíblia',
        capitulo: match ? parseInt(match[1]) : 1,
        versiculo: match ? parseInt(match[2]) : 1,
        texto,
        presentedBy: participantName,
      });
    }
  }, [shareInput, verseInput, shareMessage, participantName]);

  const handleStopPresentation = useCallback(() => {
    setPresentedVerse(null);
    if (serviceRef.current) {
      serviceRef.current.sendPresentationSync({ action: 'stop' });
    }
  }, []);

  const handlePresentationFontSize = useCallback((size: number) => {
    setPresentationFontSize(size);
    if (serviceRef.current) {
      serviceRef.current.sendPresentationSync({ action: 'fontSize', fontSize: size });
    }
  }, []);

  const handlePresentationMirror = useCallback((mirror: boolean) => {
    setPresentationMirror(mirror);
    if (serviceRef.current) {
      serviceRef.current.sendPresentationSync({ action: 'mirror', mirror });
    }
  }, []);

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

  const handleShare = useCallback(() => {
    if (!room || !shareInput.trim()) return;
    const match = shareInput.trim().match(/^(\d{1,3})\s*[:\.]\s*(\d{1,3})$/);
    const texto = verseInput.texto || 'Versículo compartilhado';
    const shared = shareVerse(room.code, {
      livro: verseInput.livro || 'Bíblia',
      capitulo: match ? parseInt(match[1]) : 1,
      versiculo: match ? parseInt(match[2]) : 1,
      texto,
      message: shareMessage || undefined,
    });
    if (shared && serviceRef.current) {
      serviceRef.current.sendVerseShared({
        id: shared.id,
        participantId,
        displayName: participantName,
        verse: shared.verse,
        livro: shared.livro,
        capitulo: shared.capitulo,
        versiculo: shared.versiculo,
        texto: shared.texto,
        message: shared.message,
        timestamp: shared.timestamp,
      });
    }
    setShareInput('');
    setShareMessage('');
    setVerseInput({ livro: '', capitulo: '', versiculo: '', texto: '' });
    setShowShare(false);
  }, [room, shareInput, shareMessage, verseInput, participantId, participantName]);

  const handleSendMessage = useCallback(() => {
    if (!room || !shareMessage.trim()) return;
    const msgId = sendMessage(room.code, 'chat', shareMessage);
    if (msgId && serviceRef.current) {
      serviceRef.current.sendChatMessage(
        msgId.id || `msg-${Date.now()}`,
        participantId,
        participantName,
        shareMessage
      );
    }
    setShareMessage('');
    if (serviceRef.current) {
      serviceRef.current.sendTypingStop(participantId);
    }
  }, [room, shareMessage, participantId, participantName]);

  const handleTyping = useCallback(() => {
    if (!serviceRef.current) return;
    serviceRef.current.sendTypingStart(participantId, participantName);
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = setTimeout(() => {
      serviceRef.current?.sendTypingStop(participantId);
    }, 2000);
  }, [participantId, participantName]);

  const handleStartCall = useCallback((type: 'video' | 'voice') => {
    setCallType(type);
    setIsCallActive(true);
    if (serviceRef.current) {
      serviceRef.current.sendCallInvite(participantId, participantName, type);
    }
  }, [participantId, participantName]);

  const handleAcceptCall = useCallback(() => {
    if (incomingCall && serviceRef.current) {
      serviceRef.current.sendCallAccept(incomingCall.callerSocketId, participantName);
      setCallType(incomingCall.callType);
      setIsCallActive(true);
    }
    setIncomingCall(null);
  }, [incomingCall, participantName]);

  const handleRejectCall = useCallback(() => {
    if (incomingCall && serviceRef.current) {
      serviceRef.current.sendCallReject(incomingCall.callerSocketId, participantName);
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

  const allItems = [
    ...wsVerses.map(v => ({ ...v, type: 'verse' as const })),
    ...chatMessages.map(m => ({ ...m, type: 'chat' as const })),
  ].sort((a, b) => a.timestamp - b.timestamp);

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
              <LogIn className="w-5 h-5" />
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
                isCallActive
                  ? 'opacity-50 cursor-not-allowed text-[var(--content-muted)]'
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
                isCallActive
                  ? 'opacity-50 cursor-not-allowed text-[var(--content-muted)]'
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
              onServiceReady={(svc) => { serviceRef.current = svc; }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Abas */}
      <div className="flex border-b border-[var(--border)]/40 bg-[var(--surface-sunken)]/20">
        <button
          onClick={() => setActiveTab('verses')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2',
            activeTab === 'verses'
              ? 'border-[var(--brand-default)] text-[var(--brand-default)]'
              : 'border-transparent text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          <BookOpen className="w-4 h-4" />
          Versículos
          {wsVerses.length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)]">
              {wsVerses.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2',
            activeTab === 'chat'
              ? 'border-[var(--brand-default)] text-[var(--brand-default)]'
              : 'border-transparent text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          <MessageSquare className="w-4 h-4" />
          Chat
          {chatMessages.length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)]">
              {chatMessages.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('presentation')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2',
            activeTab === 'presentation'
              ? 'border-[var(--brand-default)] text-[var(--brand-default)]'
              : 'border-transparent text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          <MonitorPlay className="w-4 h-4" />
          Apresentar
          {presentedVerse && (
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          )}
        </button>
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
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <MonitorPlay className="w-12 h-12 text-[var(--content-muted)]/30" strokeWidth={1} />
                <p className="text-sm text-[var(--content-muted)]">
                  Nenhum versículo sendo apresentado.
                </p>
                <p className="text-xs text-[var(--content-muted)]/70">
                  Clique &quot;Apresentar&quot; em um versículo compartilhado para exibir em tela grande.
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
                    <BookOpen className="w-12 h-12 text-[var(--content-muted)]/30 mb-3" strokeWidth={1} />
                    <p className="text-sm text-[var(--content-muted)]">
                      Nenhum versículo compartilhado ainda.
                    </p>
                    <p className="text-xs text-[var(--content-muted)]/70 mt-1">
                      Compartilhe versículos para iniciar o estudo!
                    </p>
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
            ) : (
              <div className="space-y-3">
                {chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MessageSquare className="w-12 h-12 text-[var(--content-muted)]/30 mb-3" strokeWidth={1} />
                    <p className="text-sm text-[var(--content-muted)]">
                      Nenhuma mensagem ainda.
                    </p>
                    <p className="text-xs text-[var(--content-muted)]/70 mt-1">
                      Inicie uma conversa!
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
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Livro (ex: Jo)"
                  value={verseInput.livro}
                  onChange={(e) => setVerseInput(p => ({ ...p, livro: e.target.value }))}
                  className="px-3 py-2 text-xs bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]/30"
                />
                <input
                  type="text"
                  placeholder="Cap:Vv (3:16)"
                  value={shareInput}
                  onChange={(e) => setShareInput(e.target.value)}
                  className="px-3 py-2 text-xs bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]/30"
                />
                <input
                  type="text"
                  placeholder="Texto (opcional)"
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
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
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
            placeholder={showShare && activeTab === 'verses' ? 'Compartilhar versículo...' : activeTab === 'chat' ? 'Enviar mensagem...' : 'Enviar mensagem ou ative compartilhar...'}
            className="flex-1 px-4 py-2.5 text-sm bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/20 transition-all"
          />
          {activeTab === 'verses' && (
            <motion.button
              onClick={() => setShowShare(!showShare)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-3 py-2.5 rounded-xl transition-all',
                showShare
                  ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                  : 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
              )}
              title="Compartilhar versículo"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          )}
          {activeTab === 'chat' && (
            <motion.button
              onClick={handleSendMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!shareMessage.trim()}
              className={cn(
                'px-3 py-2.5 rounded-xl transition-all',
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
