'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CursorData {
  participantId: string;
  participantName: string;
  color: string;
  verseIndex: number;
  timestamp: number;
}

interface RealtimeCursorsProps {
  cursors: CursorData[];
  currentUserId: string;
  verses: { numero: number; texto: string }[];
}

const CURSOR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F0B27A', '#82E0AA',
];

export function getParticipantColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
}

export function RealtimeCursors({ cursors, currentUserId, verses }: RealtimeCursorsProps) {
  const [activeCursors, setActiveCursors] = useState<CursorData[]>([]);

  useEffect(() => {
    const now = Date.now();
    const active = cursors.filter(c =>
      c.participantId !== currentUserId &&
      now - c.timestamp < 5000
    );
    setActiveCursors(active);
  }, [cursors, currentUserId]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <AnimatePresence>
        {activeCursors.map(cursor => {
          const verseIdx = verses.findIndex(v => v.numero === cursor.verseIndex);
          if (verseIdx === -1) return null;

          return (
            <motion.div
              key={cursor.participantId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute left-0 right-0"
              style={{
                top: `${verseIdx * 60}px`,
              }}
            >
              <div
                className="flex items-center gap-1.5 ml-1"
                style={{ color: cursor.color }}
              >
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: cursor.color }}
                />
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: cursor.color }}
                >
                  {cursor.participantName.slice(0, 8)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

interface UseRealtimeCursorsOptions {
  roomCode: string;
  participantId: string;
  participantName: string;
  enabled?: boolean;
}

export function useRealtimeCursors({
  roomCode,
  participantId,
  participantName,
  enabled = true,
}: UseRealtimeCursorsOptions) {
  const [cursors, setCursors] = useState<CursorData[]>([]);

  const broadcastCursor = (verseIndex: number) => {
    if (!enabled) return;

    const cursor: CursorData = {
      participantId,
      participantName,
      color: getParticipantColor(participantId),
      verseIndex,
      timestamp: Date.now(),
    };

    setCursors(prev => {
      const filtered = prev.filter(c => c.participantId !== participantId);
      return [...filtered, cursor];
    });

    // Broadcast via WebSocket (using existing service)
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('cursor-move', {
        detail: { roomCode, cursor },
      });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    const handleCursorMove = (e: CustomEvent) => {
      if (e.detail?.roomCode === roomCode && e.detail?.cursor) {
        setCursors(prev => {
          const filtered = prev.filter(c => c.participantId !== e.detail.cursor.participantId);
          return [...filtered, e.detail.cursor];
        });
      }
    };

    window.addEventListener('cursor-move', handleCursorMove as EventListener);
    return () => window.removeEventListener('cursor-move', handleCursorMove as EventListener);
  }, [roomCode]);

  return { cursors, broadcastCursor };
}
