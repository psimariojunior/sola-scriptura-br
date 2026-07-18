import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const alt = 'Sola Scriptura BR — Toda a biblioteca teologica';

export default function OpenGraphImage() {
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
          background: 'linear-gradient(135deg, #0A0908 0%, #1a1610 50%, #0A0908 100%)',
          color: '#f5f5f4',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Aurora dourada no fundo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(212, 168, 67, 0.25) 0%, transparent 60%)',
          }}
        />

        {/* Livro incandescente — simbolo */}
        <div
          style={{
            fontSize: 140,
            marginBottom: 24,
            filter: 'drop-shadow(0 0 40px rgba(212, 168, 67, 0.5))',
          }}
        >
          📖
        </div>

        {/* Titulo principal */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 300,
            letterSpacing: -2,
            display: 'flex',
            color: '#d4a843',
            textShadow: '0 2px 20px rgba(212, 168, 67, 0.25)',
          }}
        >
          Sola Scriptura
        </div>

        {/* Subtitulo */}
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            fontWeight: 300,
            color: '#a8a29e',
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
          }}
        >
          Toda a biblioteca teologica
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 48,
            fontSize: 22,
            color: '#fbbf24',
            fontWeight: 400,
          }}
        >
          <span>66 livros</span>
          <span style={{ color: '#57534e' }}>•</span>
          <span>6 traducoes</span>
          <span style={{ color: '#57534e' }}>•</span>
          <span>31.102 versiculos</span>
          <span style={{ color: '#57534e' }}>•</span>
          <span>IA + Grego/Hebraico</span>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 18,
            color: '#78716c',
            letterSpacing: 1,
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