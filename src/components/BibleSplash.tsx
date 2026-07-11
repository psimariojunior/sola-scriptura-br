'use client';

import { useEffect, useState } from 'react';

export default function BibleSplash() {
  const [mounted, setMounted] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setHide(true), 4500);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || hide) return null;

  return (
    <div className="splash-root" onClick={() => setHide(true)} style={{ cursor: 'pointer' }}>
      {/* Light rays */}
      <div className="splash-rays">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="splash-ray" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Particles */}
      <div className="splash-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="splash-particle" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Bible */}
      <div className="splash-bible">
        <div className="splash-book">
          <div className="splash-page splash-page-left" />
          <div className="splash-page splash-page-right" />
          <div className="splash-cross">
            <div className="splash-cross-h" />
            <div className="splash-cross-v" />
          </div>
          <div className="splash-glow" />
        </div>
      </div>

      {/* Title */}
      <div className="splash-title">
        <h1 className="font-display">
          <span className="splash-title-sola">Sola</span>
          <span className="splash-title-scriptura">Scriptura</span>
        </h1>
        <p className="splash-subtitle">Estudo Bíblico Acadêmico</p>
      </div>

      {/* Tap to skip */}
      <div className="splash-skip">toque para pular</div>
    </div>
  );
}
