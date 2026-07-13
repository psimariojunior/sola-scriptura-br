'use client';

import { useEffect, useState } from 'react';

const SPLASH_KEY = 'ssb_splash_shown';

export default function BibleSplash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(SPLASH_KEY)) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      try { localStorage.setItem(SPLASH_KEY, '1'); } catch {}
    }, 4200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="splash-root" onClick={() => {
      setVisible(false);
      try { localStorage.setItem(SPLASH_KEY, '1'); } catch {}
    }}>
      {/* Radial glow behind Bible */}
      <div className="splash-bg-glow" />

      {/* Light rays */}
      <div className="splash-rays">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="splash-ray" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Particles */}
      <div className="splash-particles">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="splash-particle" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Bible */}
      <div className="splash-bible">
        <div className="splash-book">
          {/* Cover */}
          <div className="splash-cover" />
          {/* Left page */}
          <div className="splash-page splash-page-left" />
          {/* Right page */}
          <div className="splash-page splash-page-right" />
          {/* Cross on cover */}
          <div className="splash-cross">
            <div className="splash-cross-h" />
            <div className="splash-cross-v" />
          </div>
          {/* Center glow when open */}
          <div className="splash-inner-glow" />
        </div>
      </div>

      {/* Title */}
      <div className="splash-title">
        <h1>
          <span className="splash-sola">Sola</span>
          <span className="splash-scriptura">Scriptura</span>
        </h1>
        <p className="splash-sub">Estudo Bíblico Acadêmico</p>
      </div>

      {/* Skip */}
      <div className="splash-skip">toque para pular</div>
    </div>
  );
}
