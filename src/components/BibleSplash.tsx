import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BibleSplash() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<'closed' | 'opening' | 'light' | 'done'>('closed');

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem('ssb_splash_seen');
      if (seen) {
        setShow(false);
        return;
      }
      window.sessionStorage.setItem('ssb_splash_seen', '1');
    } catch {
      // sessionStorage not available
    }

    const t1 = window.setTimeout(() => setPhase('opening'), 200);
    const t2 = window.setTimeout(() => setPhase('light'), 1000);
    const t3 = window.setTimeout(() => setPhase('done'), 2600);
    const t4 = window.setTimeout(() => setShow(false), 3200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, []);

  if (!show && phase === 'closed') return null;
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'done' ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f0d0a] overflow-hidden pointer-events-auto"
      style={{ willChange: 'opacity' }}
    >
      {/* Light rays */}
      {phase !== 'closed' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-[200%] h-[2px] -translate-x-1/2 -translate-y-1/2 origin-center"
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(212,184,122,${0.04 + i * 0.003}) 50%, transparent 100%)`,
                rotate: `${i * 30}deg`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: phase === 'light' ? 1 : 0.2, opacity: phase === 'light' ? 1 : 0.2 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          ))}
        </div>
      )}

      {/* Particles */}
      {phase === 'light' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `rgba(212,184,122,${0.2 + Math.random() * 0.5})`,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                boxShadow: '0 0 6px rgba(212,184,122,0.6)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
                y: [0, -20 - Math.random() * 40],
                x: [0, (Math.random() - 0.5) * 60],
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                delay: Math.random() * 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Bible */}
      <div className="relative" style={{ perspective: '1200px' }}>
        <motion.div
          className="relative w-32 h-44 sm:w-48 sm:h-60 md:w-56 md:h-72"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ scale: phase === 'done' ? 1.1 : 1, opacity: phase === 'done' ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Left page */}
          <motion.div
            className="absolute inset-0 origin-right"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to left, #d4b87a 0%, #8b6f45 50%, #5a3d22 100%)',
              borderRadius: '4px 2px 2px 4px',
            }}
            animate={{ rotateY: phase === 'closed' ? 0 : -180 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="absolute inset-y-4 left-2 w-[2px] bg-gradient-to-b from-transparent via-[#d4b87a]/20 to-transparent" />
          </motion.div>

          {/* Right page */}
          <motion.div
            className="absolute inset-0 origin-left"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to right, #d4b87a 0%, #8b6f45 50%, #5a3d22 100%)',
              borderRadius: '2px 4px 4px 2px',
            }}
            animate={{ rotateY: phase === 'closed' ? 0 : 180 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="absolute inset-y-4 right-2 w-[2px] bg-gradient-to-b from-transparent via-[#d4b87a]/20 to-transparent" />
          </motion.div>

          {/* Center glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: phase === 'light' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,184,122,0.5) 0%, rgba(212,184,122,0.15) 40%, transparent 70%)',
                boxShadow: '0 0 40px rgba(212,184,122,0.3), 0 0 80px rgba(212,184,122,0.1)',
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Cross */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: phase === 'closed' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 relative opacity-60">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-[#d4b87a]/60 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-8 bg-[#d4b87a]/60 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      {phase === 'light' && (
        <motion.div
          className="absolute bottom-[20%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight"
            initial={{ letterSpacing: '0.3em', opacity: 0 }}
            animate={{ letterSpacing: '0.1em', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Sola</span>
            <span className="italic text-[#d4b87a] font-medium">Scriptura</span>
          </motion.p>
          <motion.p
            className="text-[10px] text-[#b0a494] mt-3 tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Estudo Bíblico Acadêmico
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}
