'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Printer, Share2, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ExportModal } from '@/components/ExportModal';
import type { ConteudoExport } from '@/lib/exportPdf';

interface DadosEstudoCompartilhado {
  titulo: string;
  descricao?: string;
  autor: string;
  dataCriacao: string;
  referencia?: string;
  versiculos: { numero: number; texto: string; traducao: string }[];
  notas: { titulo: string; conteudo: string; data: string }[];
  comentarios: { autor: string; texto: string; fonte?: string }[];
  tags: string[];
}

export default function SharedStudyClient({ id }: { id: string }) {
  const [estudo, setEstudo] = useState<DadosEstudoCompartilhado | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [exportAberto, setExportAberto] = useState(false);

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      try {
        const res = await fetch(`/api/estudos/compartilhar/${id}`);
        if (!res.ok) throw new Error('not found');
        const data = await res.json();
        setEstudo(data);
      } catch {
        setEstudo({
          titulo: 'Estudo Bíblico Compartilhado',
          descricao: 'Este estudo foi compartilhado via Sola Scriptura.',
          autor: 'Autor Anônimo',
          dataCriacao: new Date().toISOString(),
          versiculos: [],
          notas: [],
          comentarios: [],
          tags: [],
        });
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  const handlePrint = useCallback(() => { window.print(); }, []);

  const conteudoExport: ConteudoExport[] = estudo
    ? [
        ...(estudo.versiculos.map(v => ({
          tipo: 'versiculo' as const,
          titulo: `${estudo.referencia || ''} v.${v.numero}`,
          conteudo: `(${v.traducao}) "${v.texto}"`,
          referencia: estudo.referencia,
        }))),
        ...(estudo.notas.map(n => ({
          tipo: 'nota' as const,
          titulo: n.titulo,
          conteudo: n.conteudo,
        }))),
        ...(estudo.comentarios.map(c => ({
          tipo: 'comentario' as const,
          titulo: c.autor,
          conteudo: c.texto,
          autor: c.autor,
        }))),
      ]
    : [];

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="w-10 h-10 mx-auto mb-4 border-2 border-primary/20 border-t-primary rounded-full"
          />
          <p className="text-sm text-muted-foreground">Carregando estudo...</p>
        </motion.div>
      </div>
    );
  }

  if (!estudo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-xl font-medium mb-2">Estudo não encontrado</h1>
          <p className="text-sm text-muted-foreground mb-6">
            O estudo que você procura não existe ou foi removido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="no-print sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sola Scriptura</span>
          </Link>
          <div className="flex items-center gap-1">
            <button onClick={handlePrint} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all" title="Imprimir">
              <Printer className="w-4 h-4" />
            </button>
            <button onClick={() => setExportAberto(true)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all" title="Exportar">
              <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); } catch {} }}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
              title="Compartilhar link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <header className="mb-8 sm:mb-12 text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground leading-tight mb-3">
              {estudo.titulo}
            </h1>
            {estudo.descricao && (
              <p className="text-base sm:text-lg text-muted-foreground font-serif-body italic max-w-xl mx-auto">
                {estudo.descricao}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <span>{estudo.autor}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{new Date(estudo.dataCriacao).toLocaleDateString('pt-BR')}</span>
            </div>
            {estudo.referencia && (
              <p className="mt-2 text-sm font-medium text-primary">{estudo.referencia}</p>
            )}
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mt-6" />
          </header>

          {estudo.versiculos.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-primary/30" />
                Versículos
              </h2>
              <div className="space-y-4">
                {estudo.versiculos.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3 p-4 rounded-xl bg-card/50 border border-border/30"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {v.numero}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-muted/50 text-muted-foreground rounded mb-1">
                        {v.traducao}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed font-serif-body">
                        &ldquo;{v.texto}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {estudo.notas.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-primary/30" />
                Anotações
              </h2>
              <div className="space-y-4">
                {estudo.notas.map((nota, i) => (
                  <div key={i} className="p-4 rounded-xl bg-card/50 border border-border/30">
                    <h3 className="font-display text-sm font-medium mb-2">{nota.titulo}</h3>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{nota.conteudo}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(nota.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {estudo.comentarios.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-primary/30" />
                Comentários
              </h2>
              <div className="space-y-4">
                {estudo.comentarios.map((c, i) => (
                  <blockquote
                    key={i}
                    className="pl-4 border-l-3 border-primary/30 bg-muted/20 p-4 rounded-r-xl"
                  >
                    <p className="text-sm text-foreground leading-relaxed font-serif-body italic">
                      &ldquo;{c.texto}&rdquo;
                    </p>
                    <footer className="mt-2 text-xs text-muted-foreground">
                      — {c.autor}{c.fonte ? `, ${c.fonte}` : ''}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}

          {estudo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/30">
              {estudo.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>

        <footer className="mt-12 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            Estudo compartilhado via{' '}
            <Link href="/" className="text-primary hover:underline">
              Sola Scriptura
            </Link>
          </p>
        </footer>
      </main>

      <ExportModal
        open={exportAberto}
        onOpenChange={setExportAberto}
        titulo={estudo.titulo}
        subtitulo={estudo.descricao}
        conteudo={conteudoExport}
        tipo="estudo"
      />

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          article { max-width: none !important; }
        }
      `}</style>
    </div>
  );
}
