import Link from 'next/link';
import type { ObraMeta } from '@/data/biblioteca/types';

interface CapaLivroProps {
  obra: ObraMeta;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: { w: 'w-32', font: 'text-[11px]' },
  md: { w: 'w-44', font: 'text-sm' },
  lg: { w: 'w-56', font: 'text-base' },
};

/**
 * Capa de livro gerada por CSS puro — estilo editora clássica:
 * lombada, moldura dourada, ornamento tipográfico.
 */
export function CapaLivro({ obra, href, size = 'md', className = '' }: CapaLivroProps) {
  const s = SIZES[size];

  const capa = (
    <div
      className={`${s.w} aspect-[3/4] relative rounded-r-md rounded-l-sm overflow-hidden shrink-0
        shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:rotate-[-1deg]
        transition-all duration-500 cursor-pointer ${className}`}
      style={{
        background: `linear-gradient(155deg, ${obra.capa.de} 0%, ${obra.capa.ate} 100%)`,
      }}
    >
      {/* textura sutil */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
        }}
      />
      {/* escurecimento para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45" />
      {/* lombada */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.15) 70%, rgba(255,255,255,0.12))`,
        }}
      />
      {/* moldura */}
      <div className="absolute inset-3 rounded-sm border border-white/25" />
      <div className="absolute inset-[13px] rounded-sm border border-white/10" />

      {/* conteúdo */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-5 px-4 text-center">
        <div>
          <p
            className="text-[8px] tracking-[0.3em] uppercase mb-1"
            style={{ color: obra.capa.acento, opacity: 0.75 }}
          >
            Clássicos da Fé
          </p>
          <div
            className="w-10 h-px mx-auto"
            style={{ background: obra.capa.acento, opacity: 0.6 }}
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-2 min-h-0">
          {/* monograma */}
          <div
            className="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-semibold shrink-0"
            style={{
              borderColor: obra.capa.acento,
              color: obra.capa.acento,
              opacity: 0.85,
            }}
          >
            {obra.autor.charAt(0)}
          </div>
          <h3
            className={`${s.font} font-serif font-medium leading-tight line-clamp-4`}
            style={{ color: obra.capa.acento }}
          >
            {obra.titulo.replace(' (seleções)', '').replace(' (integral)', '')}
          </h3>
        </div>

        <div className="w-full">
          <div
            className="flex items-center justify-center gap-1 mb-1"
            style={{ color: obra.capa.acento, opacity: 0.7 }}
          >
            <span className="w-4 h-px bg-current" />
            <span className="text-[8px]">◆</span>
            <span className="w-4 h-px bg-current" />
          </div>
          <p
            className="text-[9px] tracking-wider uppercase truncate"
            style={{ color: obra.capa.acento, opacity: 0.85 }}
          >
            {obra.autor.split('(')[0].trim()}
          </p>
          <p className="text-[8px] mt-0.5" style={{ color: obra.capa.acento, opacity: 0.55 }}>
            {obra.anoTexto}
          </p>
        </div>
      </div>
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
