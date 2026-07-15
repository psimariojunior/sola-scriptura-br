import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sola Scriptura BR — Toda a biblioteca teológica';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              'linear-gradient(90deg, #d4a843 0%, #f4d03f 50%, #d4a843 100%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              'linear-gradient(90deg, #d4a843 0%, #f4d03f 50%, #d4a843 100%)',
            display: 'flex',
            opacity: 0.6,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 110,
            height: 110,
            borderRadius: 24,
            background: 'rgba(212, 168, 67, 0.12)',
            border: '2px solid rgba(212, 168, 67, 0.35)',
            marginBottom: 36,
          }}
        >
          <div
            style={{
              fontSize: 56,
              color: '#d4a843',
              display: 'flex',
              fontWeight: 700,
            }}
          >
            ✦
          </div>
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            color: '#d4a843',
            marginBottom: 14,
            display: 'flex',
            letterSpacing: '-0.02em',
          }}
        >
          Sola Scriptura
        </div>

        <div
          style={{
            fontSize: 34,
            color: 'rgba(255, 255, 255, 0.88)',
            display: 'flex',
            marginBottom: 10,
            fontWeight: 500,
          }}
        >
          Toda a biblioteca teológica
        </div>

        <div
          style={{
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            marginTop: 8,
            letterSpacing: '0.04em',
          }}
        >
          Bíblia em 6 traduções · Grego e Hebraico · Exegese com IA
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'rgba(212, 168, 67, 0.7)',
            fontSize: 16,
            letterSpacing: '0.08em',
          }}
        >
          <span>solascripturabr.com.br</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
