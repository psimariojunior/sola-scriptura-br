'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Sparkles } from 'lucide-react';

interface RoomEntranceProps {
  participantName: string;
  roomCode: string;
  onComplete: () => void;
}

export function RoomEntrance({ participantName, roomCode, onComplete }: RoomEntranceProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[var(--brand)] via-[var(--brand-dark)] to-[var(--brand-darker)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
        >
          <BookOpen className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white/80 text-sm font-medium">Entrando na sala</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Estudo Compartilhado</h2>
          <p className="text-white/70 text-sm mb-6">
            Olá, <span className="font-semibold text-white">{participantName}</span>!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-mono tracking-wider">{roomCode}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex justify-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
