import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BibleSplash() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<'closed' | 'opening' | 'light' | 'done'>('closed');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 300);
    const t2 = setTimeout(() => setPhase('light'), 1200);
    const t3 = setTimeout(() => setPhase('done'), 2800);
    const t4 = setTimeout(() => setShow(false), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] overflow-hidden"
        >
          {/* Light rays */}
          {phase !== 'closed' && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-[200%] h-[3px] -translate-x-1/2 -translate-y-1/2 origin-center"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(212,184,122,${0.06 + i * 0.004}) 50%, transparent 100%)`,
                    rotate: `${i * 30}deg`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: phase === 'light' ? 1 : 0.3, opacity: phase === 'light' ? 1 : 0.3 }}
                  transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              ))}
            </div>
          )}

          {/* Floating particles */}
          {phase === 'light' && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: `rgba(212,184,122,${0.3 + Math.random() * 0.5})`,
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    boxShadow: '0 0 4px rgba(212,184,122,0.5)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -30 - Math.random() * 60],
                    x: [0, (Math.random() - 0.5) * 80],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 1.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}

          {/* Bible */}
          <div className="relative perspective-[1200px]">
            <motion.div
              className="relative w-40 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                scale: phase === 'done' ? 1.1 : 1,
                opacity: phase === 'done' ? 0 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Left page */}
              <motion.div
                className="absolute inset-0 origin-right"
                style={{
                  backfaceVisibility: 'hidden',
                  background: 'linear-gradient(to left, #d4b87a 0%, #8b6f45 40%, #6b4c2a 100%)',
                  borderRadius: '4px 2px 2px 4px',
                  borderRight: '1px solid rgba(212,184,122,0.3)',
                }}
                animate={{
                  rotateY: phase === 'closed' ? 0 : -180,
                }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Spine lines */}
                <div className="absolute inset-y-4 left-2 w-[2px] bg-gradient-to-b from-transparent via-[#d4b87a]/20 to-transparent" />
                <div className="absolute inset-y-8 left-3 w-[1px] bg-gradient-to-b from-transparent via-[#d4b87a]/10 to-transparent" />
              </motion.div>

              {/* Right page */}
              <motion.div
                className="absolute inset-0 origin-left"
                style={{
                  backfaceVisibility: 'hidden',
                  background: 'linear-gradient(to right, #d4b87a 0%, #8b6f45 40%, #6b4c2a 100%)',
                  borderRadius: '2px 4px 4px 2px',
                  borderLeft: '1px solid rgba(212,184,122,0.3)',
                }}
                animate={{
                  rotateY: phase === 'closed' ? 0 : 180,
                }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Page lines */}
                <div className="absolute inset-y-4 right-2 w-[2px] bg-gradient-to-b from-transparent via-[#d4b87a]/20 to-transparent" />
                <div className="absolute inset-y-8 right-3 w-[1px] bg-gradient-to-b from-transparent via-[#d4b87a]/10 to-transparent" />
              </motion.div>

              {/* Center glow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: phase === 'light' ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,184,122,0.6) 0%, rgba(212,184,122,0.2) 40%, transparent 70%)',
                    boxShadow: '0 0 60px rgba(212,184,122,0.3), 0 0 120px rgba(212,184,122,0.1)',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              {/* Cross on cover */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: phase === 'closed' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-[2px] bg-[#8b6f45]/60 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-10 bg-[#8b6f45]/60 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Texto que aparece */}
          <AnimatePresence>
            {phase === 'light' && (
              <motion.div
                className="absolute bottom-[15%] text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.p
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight"
                  initial={{ letterSpacing: '0.5em', opacity: 0 }}
                  animate={{ letterSpacing: '0.15em', opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <span className="block">Sola</span>
                  <span className="italic text-primary font-medium">Scriptura</span>
                </motion.p>
                <motion.p
                  className="text-xs text-[var(--muted-fg)] mt-4 tracking-[0.3em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Estudo Bíblico Acadêmico
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
