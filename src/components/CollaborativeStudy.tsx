'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, LogIn, Share2, Copy, MessageSquare,
  BookOpen, Trash2, X, Link as LinkIcon, Check
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

interface CollaborativeStudyProps {
  initialCode?: string;
  compact?: boolean;
}

export function CollaborativeStudy({ initialCode, compact = false }: CollaborativeStudyProps) {
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [shareInput, setShareInput] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [verseInput, setVerseInput] = useState({ livro: '', capitulo: '', versiculo: '', texto: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const participantId = getParticipantId();

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
    shareVerse(room.code, {
      livro: verseInput.livro || 'Bíblia',
      capitulo: match ? parseInt(match[1]) : 1,
      versiculo: match ? parseInt(match[2]) : 1,
      texto,
      message: shareMessage || undefined,
    });
    setShareInput('');
    setShareMessage('');
    setVerseInput({ livro: '', capitulo: '', versiculo: '', texto: '' });
    setShowShare(false);
  }, [room, shareInput, shareMessage, verseInput]);

  const handleSendMessage = useCallback(() => {
    if (!room || !shareMessage.trim()) return;
    sendMessage(room.code, 'chat', shareMessage);
    setShareMessage('');
  }, [room, shareMessage]);

  const copyRoomLink = useCallback(() => {
    if (!room) return;
    const url = `${window.location.origin}/estudo-colaborativo?code=${room.code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [room]);

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
          <button
            onClick={copyRoomLink}
            className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)] hover:text-[var(--content-primary)]"
            title="Copiar link da sala"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => { setRoom(null); }}
            className="p-2 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)] hover:text-[var(--content-primary)]"
            title="Sair da sala"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista de versículos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {room.verses.length === 0 ? (
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
          room.verses.map((v) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'rounded-xl border border-[var(--border)]/40 overflow-hidden',
                v.message && v.verse === 'chat'
                  ? 'bg-[var(--surface-raised)]'
                  : 'bg-[var(--surface-raised)]'
              )}
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
                {v.message && v.verse === 'chat' ? (
                  <MessageSquare className="w-3 h-3 text-[var(--content-muted)] ml-auto" />
                ) : (
                  <span className="text-[10px] font-semibold text-[var(--brand-default)] ml-auto">{v.verse}</span>
                )}
              </div>
              {v.message && v.verse === 'chat' ? (
                <div className="px-3 py-2">
                  <p className="text-sm text-[var(--content-primary)]">{v.message}</p>
                </div>
              ) : (
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
              )}
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Barra de compartilhar */}
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
            onChange={(e) => setShareMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (showShare) handleShare();
                else handleSendMessage();
              }
            }}
            placeholder={showShare ? 'Compartilhar versículo...' : 'Enviar mensagem...'}
            className="flex-1 px-4 py-2.5 text-sm bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/20 transition-all"
          />
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
        </div>
      </div>
    </div>
  );
}
