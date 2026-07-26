import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sola Scriptura - Estudo Bíblico Gratuito';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0908',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative golden circles */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '2px solid rgba(212, 168, 67, 0.15)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: '2px solid rgba(212, 168, 67, 0.1)',
            display: 'flex',
          }}
        />

        {/* Golden accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: '#D4A843',
            marginBottom: 24,
            display: 'flex',
          }}
        />

        {/* Book + Cross icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          style={{ marginBottom: 20 }}
        >
          {/* Open book */}
          <path
            d="M10 60V20C10 18 12 16 14 16H38C40 16 42 18 42 20V60C42 58 40 56 38 56H14C12 56 10 58 10 60Z"
            fill="none"
            stroke="#D4A843"
            strokeWidth="2"
          />
          <path
            d="M70 60V20C70 18 68 16 66 16H42C40 16 38 18 38 20V60C38 58 40 56 42 56H66C68 56 70 58 70 60Z"
            fill="none"
            stroke="#D4A843"
            strokeWidth="2"
          />
          {/* Cross on top */}
          <line x1="40" y1="4" x2="40" y2="18" stroke="#D4A843" strokeWidth="2.5" />
          <line x1="34" y1="10" x2="46" y2="10" stroke="#D4A843" strokeWidth="2.5" />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#D4A843',
            letterSpacing: '0.04em',
            marginBottom: 12,
            display: 'flex',
          }}
        >
          Sola Scriptura
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#E8DCC8',
            opacity: 0.85,
            marginBottom: 40,
            display: 'flex',
          }}
        >
          Plataforma de Estudo Bíblico Gratuito
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 18,
            color: '#D4A843',
            opacity: 0.6,
            position: 'absolute',
            bottom: 30,
            display: 'flex',
          }}
        >
          solascripturabr.com.br
        </div>
      </div>
    ),
    { ...size }
  );
}
