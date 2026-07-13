'use client';

import { useEffect, useRef, useState } from 'react';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  url: string;
  size?: number;
  className?: string;
  dark?: string;
  light?: string;
}

export default function QRCode({
  url,
  size = 256,
  className,
  dark = '#1a1a1a',
  light = '#ffffff',
}: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current || !url) return;
    let cancelled = false;
    QRCodeLib.toString(url, {
      type: 'svg',
      width: size,
      margin: 1,
      color: { dark, light },
      errorCorrectionLevel: 'M',
    })
      .then((svg) => {
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svg;
      })
      .catch((err) => {
        if (cancelled) return;
        setError(String(err?.message || err));
      });
    return () => {
      cancelled = true;
    };
  }, [url, size, dark, light]);

  if (error) {
    return (
      <div className={className} style={{ width: size, height: size }}>
        <div className="flex items-center justify-center w-full h-full bg-red-500/10 text-red-500 text-xs rounded-lg">
          QR indisponível
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: size, height: size, lineHeight: 0 }}
      role="img"
      aria-label={`QR code para ${url}`}
    />
  );
}
