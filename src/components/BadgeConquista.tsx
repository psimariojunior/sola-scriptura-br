'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Conquista, DIFICULDADES, CATEGORIAS_CONQUISTA } from '@/data/conquistas';

interface BadgeConquistaProps {
  conquista: Conquista;
  desbloqueada: boolean;
  tamanho?: 'sm' | 'md' | 'lg';
  mostrarTooltip?: boolean;
  onUnlock?: () => void;
}

const TAMANHOS = {
  sm: { container: 'w-14 h-14', icon: 'text-xl', ring: 'ring-2', label: 'text-[9px]' },
  md: { container: 'w-20 h-20', icon: 'text-3xl', ring: 'ring-2', label: 'text-[10px]' },
  lg: { container: 'w-28 h-28', icon: 'text-5xl', ring: 'ring-[3px]', label: 'text-xs' },
};

export function BadgeConquista({ conquista, desbloqueada, tamanho = 'md', mostrarTooltip = true, onUnlock }: BadgeConquistaProps) {
  const [hover, setHover] = useState(false);
  const t = TAMANHOS[tamanho];
  const dificuldade = DIFICULDADES[conquista.dificuldade];
  const categoria = CATEGORIAS_CONQUISTA[conquista.categoria];

  return (
    <div className="relative inline-flex flex-col items-center gap-1">
      <motion.div
        className={`${t.container} relative rounded-full flex items-center justify-center cursor-pointer select-none`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={desbloqueada ? { scale: 0, rotate: -180 } : false}
        animate={desbloqueada ? { scale: 1, rotate: 0 } : undefined}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={onUnlock}
      >
        {/* Glow effect for rare achievements */}
        {conquista.rara && desbloqueada && (
          <motion.div
            className="absolute inset-[-4px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${dificuldade.cor.includes('purple') ? 'rgba(168,85,247,0.4)' : 'rgba(249,115,22,0.4)'} 0%, transparent 70%)`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Ring */}
        <div
          className={`absolute inset-0 rounded-full ${t.ring} ${
            desbloqueada
              ? `ring-${conquista.rara ? 'purple' : 'amber'}-500/50`
              : 'ring-[var(--border)]'
          }`}
          style={!desbloqueada ? { opacity: 0.5 } : undefined}
        />

        {/* Background */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            desbloqueada
              ? 'bg-gradient-to-br from-[var(--card)] to-[var(--card)]/80 dark:from-[var(--card)] dark:to-[var(--card)]/60'
              : 'bg-[var(--bg)] dark:bg-[var(--bg)]/60'
          }`}
        />

        {/* Shimmer on rare */}
        {conquista.rara && desbloqueada && (
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ opacity: 0.15 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />
          </motion.div>
        )}

        {/* Icon */}
        <span className={`relative z-10 ${t.icon} transition-all duration-300 ${desbloqueada ? '' : 'grayscale opacity-30'}`}>
          {conquista.icone}
        </span>

        {/* Lock overlay */}
        {!desbloqueada && (
          <div className="absolute inset-0 rounded-full bg-[var(--bg)]/60 dark:bg-black/40 flex items-center justify-center">
            <span className="text-[var(--muted-fg)] text-sm">🔒</span>
          </div>
        )}
      </motion.div>

      {/* Label */}
      {tamanho !== 'sm' && (
        <span className={`${t.label} text-center text-[var(--muted-fg)] max-w-[100px] leading-tight font-medium`}>
          {conquista.nome}
        </span>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {hover && mostrarTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-56 pointer-events-none"
          >
            <div className="sola-card p-3 shadow-xl rounded-xl">
              <div className="flex items-start gap-2 mb-1.5">
                <span className="text-xl">{conquista.icone}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--fg)] text-sm leading-tight">{conquista.nome}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${dificuldade.cor}`}>
                      {dificuldade.label}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${categoria.cor}`}>
                      {categoria.label}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[var(--muted-fg)] leading-relaxed mb-1.5">
                {conquista.descricao}
              </p>
              <div className="flex items-center justify-between pt-1.5 border-t border-[var(--border)]">
                <span className="text-[10px] font-bold text-[var(--primary)]">
                  +{conquista.pontos} XP
                </span>
                {conquista.rara && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold">
                    ✨ Rara
                  </span>
                )}
                {desbloqueada && (
                  <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold">
                    ✓ Desbloqueada
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
