import Link from 'next/link';
import type { ObraMeta } from '@/data/biblioteca/types';

interface CapaLivroProps {
  obra: ObraMeta;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showShelf?: boolean;
}

const SIZES = {
  sm: { w: 'w-32', font: 'text-[11px]', monogram: 'w-6 h-6 text-[9px]', spine: 'w-[6px]', ornament: 'w-8', frame: '3', frameInner: '10' },
  md: { w: 'w-44', font: 'text-sm', monogram: 'w-8 h-8 text-[11px]', spine: 'w-2', ornament: 'w-10', frame: '3', frameInner: '13' },
  lg: { w: 'w-56', font: 'text-base', monogram: 'w-10 h-10 text-sm', ornament: 'w-12', spine: 'w-[10px]', frame: '4', frameInner: '16' },
};

/** SVG ornament patterns per category */
const ORNAMENTS: Record<string, React.ReactNode> = {
  pais: (
    <svg viewBox="0 0 40 12" className="w-10 h-3" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M2 6h36M8 2v8M32 2v8M14 4l4-2 4 2M14 8l4 2 4-2" />
    </svg>
  ),
  reforma: (
    <svg viewBox="0 0 40 12" className="w-10 h-3" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M2 6h36M20 1v10M16 3l4-2 4 2M16 9l4 2 4-2" />
    </svg>
  ),
  espiritualidade: (
    <svg viewBox="0 0 40 12" className="w-10 h-3" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="20" cy="6" r="4" /><path d="M20 2v8M16 6h8M4 6h12M24 6h12" />
    </svg>
  ),
  credos: (
    <svg viewBox="0 0 40 12" className="w-10 h-3" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M2 6h36M20 1v10M12 6l4-4M28 6l-4-4M12 6l4 4M28 6l-4 4" />
    </svg>
  ),
  historia: (
    <svg viewBox="0 0 40 12" className="w-10 h-3" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M2 6h36M10 2v8M20 2v8M30 2v8M6 4h8M16 4h8M26 4h8M6 8h8M16 8h8M26 8h8" />
    </svg>
  ),
};

/** Texture patterns per category for premium feel */
const TEXTURES: Record<string, string> = {
  pais: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)',
  reforma: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.04) 8px, rgba(0,0,0,0.04) 9px)',
  espiritualidade: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)',
  credos: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 5px)',
  historia: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)',
};

const CAT_KEY: Record<string, string> = {
  'Pais da Igreja': 'pais',
  'Reforma': 'reforma',
  'Espiritualidade': 'espiritualidade',
  'Credos': 'credos',
  'Historia': 'historia',
};

/**
 * Capa de livro premium — SVG procedural com texturas, ornamentos, 3D:
 * lombada detallhada, moldura dourada dupla, monograma embossed,
 * textura por categoria, ornamento SVG, efeito perspective 3D.
 */
export function CapaLivro({ obra, href, size = 'md', className = '', showShelf = false }: CapaLivroProps) {
  const s = SIZES[size];
  const catKey = CAT_KEY[obra.categoria] || 'pais';
  const ornament = ORNAMENTS[catKey];
  const texture = TEXTURES[catKey];

  const capa = (
    <div
      className={`${s.w} aspect-[3/4] relative overflow-hidden shrink-0
        transition-all duration-500 cursor-pointer ${className}
        ${showShelf ? 'rounded-t-sm' : 'rounded-r-md rounded-l-sm'}
        shadow-lg hover:shadow-2xl`}
      style={{
        perspective: '800px',
      }}
    >
      {/* 3D book body */}
      <div
        className="absolute inset-0 transition-transform duration-500 origin-left"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'rotateY(-8deg) translateZ(10px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotateY(0deg) translateZ(0)';
        }}
      >
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(155deg, ${obra.capa.de} 0%, ${obra.capa.ate} 100%)`,
          }}
        />

        {/* Category texture overlay */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: texture }}
        />

        {/* Leather grain noise (subtle) */}
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Light gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/25" />

        {/* Spine shadow + highlight */}
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: s.spine,
            background: `linear-gradient(90deg,
              rgba(0,0,0,0.6) 0%,
              rgba(0,0,0,0.3) 40%,
              rgba(255,255,255,0.15) 70%,
              rgba(0,0,0,0.1) 100%)`,
          }}
        />
        {/* Spine stitch line */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: s.spine,
            width: '1px',
            backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px)',
          }}
        />

        {/* Double gold frame */}
        <div
          className="absolute rounded-sm"
          style={{
            inset: s.frame,
            border: '1.5px solid rgba(212,175,55,0.45)',
          }}
        />
        <div
          className="absolute rounded-sm"
          style={{
            inset: s.frameInner,
            border: '1px solid rgba(212,175,55,0.25)',
          }}
        />

        {/* Corner ornaments */}
        {size !== 'sm' && (
          <>
            <svg className="absolute opacity-30" style={{ top: 8, left: 8, width: 14, height: 14 }} viewBox="0 0 14 14" fill="none" stroke={obra.capa.acento} strokeWidth="1">
              <path d="M1 13V1h12" /><path d="M3 11V3h8" />
            </svg>
            <svg className="absolute opacity-30" style={{ top: 8, right: 8, width: 14, height: 14 }} viewBox="0 0 14 14" fill="none" stroke={obra.capa.acento} strokeWidth="1">
              <path d="M13 13V1H1" /><path d="M11 11V3H3" />
            </svg>
            <svg className="absolute opacity-30" style={{ bottom: 8, left: 8, width: 14, height: 14 }} viewBox="0 0 14 14" fill="none" stroke={obra.capa.acento} strokeWidth="1">
              <path d="M1 1v12h12" /><path d="M3 3v8h8" />
            </svg>
            <svg className="absolute opacity-30" style={{ bottom: 8, right: 8, width: 14, height: 14 }} viewBox="0 0 14 14" fill="none" stroke={obra.capa.acento} strokeWidth="1">
              <path d="M13 1v12H1" /><path d="M11 3v8H3" />
            </svg>
          </>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between text-center"
          style={{ padding: size === 'sm' ? '14px 10px' : '20px 14px' }}>
          {/* Header: series + ornament */}
          <div className="flex flex-col items-center gap-1">
            <p
              className="tracking-[0.25em] uppercase font-medium"
              style={{
                color: obra.capa.acento,
                fontSize: size === 'sm' ? '6px' : '7px',
                opacity: 0.8,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Classicos da Fe
            </p>
            <div style={{ color: obra.capa.acento, opacity: 0.5 }}>
              {ornament}
            </div>
          </div>

          {/* Center: monogram + title */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 min-h-0">
            {/* Embossed monogram */}
            <div
              className={`${s.monogram} rounded-full border flex items-center justify-center font-serif font-bold shrink-0`}
              style={{
                borderColor: `${obra.capa.acento}88`,
                color: obra.capa.acento,
                background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12), transparent 60%)',
                boxShadow: `inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.25)`,
                textShadow: '0 1px 1px rgba(0,0,0,0.3)',
              }}
            >
              {obra.autor.charAt(0)}
            </div>

            <h3
              className={`${s.font} font-serif font-semibold leading-tight line-clamp-4`}
              style={{
                color: obra.capa.acento,
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              {obra.titulo.replace(' (selecoes)', '').replace(' (integral)', '')}
            </h3>
          </div>

          {/* Footer: author + year */}
          <div className="w-full flex flex-col items-center gap-1">
            {/* Decorative divider */}
            <div className="flex items-center gap-1" style={{ color: obra.capa.acento, opacity: 0.5 }}>
              <span className="w-3 h-px bg-current" />
              <svg className="w-2 h-2" viewBox="0 0 8 8" fill="currentColor"><path d="M4 0l1.2 2.8L8 4 5.2 5.2 4 8 2.8 5.2 0 4l2.8-1.2z" /></svg>
              <span className="w-3 h-px bg-current" />
            </div>
            <p
              className="tracking-wider uppercase truncate font-medium"
              style={{
                color: obra.capa.acento,
                fontSize: size === 'sm' ? '7px' : '8px',
                opacity: 0.85,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {obra.autor.split('(')[0].trim()}
            </p>
            <p
              className="opacity-50"
              style={{
                color: obra.capa.acento,
                fontSize: size === 'sm' ? '6px' : '7px',
              }}
            >
              {obra.anoTexto}
            </p>
          </div>
        </div>
      </div>

      {/* Shelf line at bottom (for bookshelf view) */}
      {showShelf && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/30 to-transparent" />
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {capa}
      </Link>
    );
  }
  return <div className="group">{capa}</div>;
}
