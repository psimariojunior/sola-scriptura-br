import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function BibleSplash() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'closed' | 'open' | 'light'>('closed');
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const t1 = setTimeout(() => setPhase('open'), 100);
    const t2 = setTimeout(() => setPhase('light'), 900);
    const t3 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f0d0a]" style={{ willChange: 'opacity' }}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: phase === 'light' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 h-px -translate-x-1/2 -translate-y-1/2 origin-center"
            style={{
              width: '150%',
              background: `linear-gradient(90deg, transparent, rgba(212,184,122,${0.03 + i * 0.003}), transparent)`,
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) scaleX(${phase === 'light' ? 1 : 0})`,
              transition: 'transform 1.5s ease-out, opacity 0.5s',
              opacity: phase === 'light' ? 1 : 0,
            }}
          />
        ))}
      </motion.div>

      {/* Particles */}
      {phase === 'light' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `rgba(212,184,122,${0.3})`,
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                boxShadow: '0 0 4px rgba(212,184,122,0.5)',
                animation: `splashParticle ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 1}s infinite`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Bible */}
      <div style={{ perspective: '1000px' }}>
        <div
          style={{
            width: '140px',
            height: '200px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: phase === 'light' ? 'scale(1.15)' : 'scale(1)',
            opacity: phase === 'light' ? 0 : 1,
            transition: 'transform 0.8s ease, opacity 0.8s ease',
          }}
        >
          {/* Left page */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'right center',
              background: 'linear-gradient(to left, #d4b87a 0%, #8b6f45 50%, #5a3d22 100%)',
              borderRadius: '3px 1px 1px 3px',
              transform: phase === 'closed' ? 'rotateY(0deg)' : 'rotateY(-180deg)',
              transition: 'transform 0.8s ease-out 0.15s',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-y-4 left-2 w-px bg-gradient-to-b from-transparent via-[#d4b87a]/15 to-transparent" />
          </div>

          {/* Right page */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'left center',
              background: 'linear-gradient(to right, #d4b87a 0%, #8b6f45 50%, #5a3d22 100%)',
              borderRadius: '1px 3px 3px 1px',
              transform: phase === 'closed' ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s ease-out 0.15s',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-y-4 right-2 w-px bg-gradient-to-b from-transparent via-[#d4b87a]/15 to-transparent" />
          </div>

          {/* Center glow */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: phase === 'light' ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          >
            <div
              className="w-12 h-12 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,184,122,0.4) 0%, rgba(212,184,122,0.1) 40%, transparent 70%)',
                boxShadow: '0 0 30px rgba(212,184,122,0.2)',
                animation: 'splashPulse 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Cross */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: phase === 'closed' ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            <div className="w-8 h-8 relative opacity-50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-px bg-[#d4b87a] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-7 bg-[#d4b87a] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      {phase === 'light' && (
        <div
          className="absolute bottom-[18%] text-center"
          style={{
            animation: 'splashTextIn 0.8s ease-out',
          }}
        >
          <h1
            className="font-display text-3xl sm:text-4xl font-light tracking-tight"
            style={{ letterSpacing: '0.15em' }}
          >
            <span className="block">Sola</span>
            <span className="italic text-[#d4b87a] font-medium">Scriptura</span>
          </h1>
          <p className="text-[10px] text-[#b0a494] mt-3 tracking-[0.2em] uppercase">
            Estudo Bíblico Acadêmico
          </p>
        </div>
      )}
    </div>
  );
}
