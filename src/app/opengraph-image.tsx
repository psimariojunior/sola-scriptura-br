import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const alt = 'Sola Scriptura BR — Estudo Bíblico Acadêmico';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1C1917 0%, #292524 50%, #1C1917 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Aurora dourada no fundo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(212, 168, 67, 0.15) 0%, transparent 60%)',
          }}
        />

        {/* Titulo principal */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#D4A843',
            fontFamily: 'serif',
            textAlign: 'center',
            textShadow: '0 2px 20px rgba(212, 168, 67, 0.25)',
          }}
        >
          Sola Scriptura
        </div>

        {/* Subtitulo */}
        <div
          style={{
            fontSize: 28,
            color: '#A8A29E',
            marginTop: 16,
            fontFamily: 'sans-serif',
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
          }}
        >
          Estudo Bíblico Acadêmico
        </div>

        {/* Features */}
        <div
          style={{
            fontSize: 20,
            color: '#737373',
            marginTop: 24,
            fontFamily: 'sans-serif',
            display: 'flex',
            gap: 24,
          }}
        >
          <span>10 Traduções</span>
          <span style={{ color: '#57534e' }}>·</span>
          <span>Grego</span>
          <span style={{ color: '#57534e' }}>·</span>
          <span>Hebraico</span>
          <span style={{ color: '#57534e' }}>·</span>
          <span>IA</span>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 18,
            color: '#57534e',
            letterSpacing: 1,
            fontFamily: 'sans-serif',
          }}
        >
          solascripturabr.com.br
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
