'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Users, ChevronRight } from 'lucide-react';
import { obterEstudos, type EstudoVersiculo } from '@/data/estudosTeologicos';
import { obterComentarios, type Comentario } from '@/data/comentarios';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import { estudosPorLivro } from '@/data/estudosPorLivro';

interface Props {
  livro: string;
  capitulo: number;
  versiculo: number;
}

export default function PainelEstudosSidePanel({ livro, capitulo, versiculo }: Props) {
  const estudos = useMemo(() => obterEstudos(livro, capitulo, versiculo), [livro, capitulo, versiculo]);
  const comentarios = useMemo(() => obterComentarios(livro, capitulo, versiculo), [livro, capitulo, versiculo]);
  const livroInfo = livroPorAbreviacao.get(livro);
  const estudoLivro = estudosPorLivro[livro];

  if (estudos.length === 0 && comentarios.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-4 h-4 text-primary" />
          <h3 className="font-display text-base font-semibold">Estudos</h3>
        </div>

        <div className="text-center py-8 px-4">
          <BookOpen className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" strokeWidth={1} />
          <p className="text-sm text-muted-foreground mb-4">
            Nenhum estudo teológico disponível para este versículo específico.
          </p>

          {estudoLivro && (
            <div className="sola-card p-4 rounded-xl text-left">
              <p className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">Estudo do Livro</p>
              <h4 className="text-sm font-semibold mb-2">{estudoLivro.titulo}</h4>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{estudoLivro.contexto}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {estudoLivro.temasPrincipais.slice(0, 4).map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
                ))}
              </div>
              <Link
                href={`/estudos/${livro}`}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Ver estudo completo <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-4 h-4 text-primary" />
        <h3 className="font-display text-base font-semibold">Estudos</h3>
      </div>

      {/* Theological Studies */}
      {estudos.length > 0 && (
        <div className="mb-6">
          {estudos.map((estudo, i) => (
            <div key={i} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {estudo.tema}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{estudo.contexto}</p>

              <div className="space-y-3">
                {estudo.interpretacoes.map((interp, j) => (
                  <div key={j} className="pl-3 border-l-2 border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">{interp.teologo}</span>
                      <span className="text-[10px] text-muted-foreground">({interp.periodo})</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground mb-1 inline-block">{interp.tradicao}</span>
                    <p className="text-[11px] text-foreground/70 italic mb-1">{interp.citacao}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{interp.resumo}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comments */}
      {comentarios.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Comentários ({comentarios.length})
          </h4>
          <div className="space-y-3">
            {comentarios.map((c, i) => (
              <div key={i} className="sola-card p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary">{c.autor}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">{c.tipo}</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed italic">&ldquo;{c.texto}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book study link */}
      {estudoLivro && (
        <Link
          href={`/estudos/${livro}`}
          className="block sola-card p-3 rounded-xl hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <p className="text-xs font-semibold group-hover:text-primary transition-colors">Estudo: {estudoLivro.titulo}</p>
              <p className="text-[10px] text-muted-foreground">{estudoLivro.versiculosChave.length} versículos-chave</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      )}
    </div>
  );
}
