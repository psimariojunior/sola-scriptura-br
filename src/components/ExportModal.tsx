'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown, FileText, FileCode, FileType, BookOpen, Printer,
  Link2, Loader2, Check, Settings2, X, ChevronDown,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import type { OpcoesExportPdf, ConteudoExport } from '@/lib/exportPdf';
import type { EstudoCompleto, OpcoesExport } from '@/lib/exportarEstudos';
import { exportarPdf, exportarEstudo } from '@/lib/exportPdf';
import {
  exportarEstudoCompleto, exportarParaMarkdown,
  exportarParaHTML, exportarParaTXT, gerarLinkCompartilhamento,
} from '@/lib/exportarEstudos';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titulo: string;
  subtitulo?: string;
  conteudo?: ConteudoExport[];
  estudo?: EstudoCompleto;
  tipo: 'versiculos' | 'estudo' | 'capitulo' | 'nota' | 'comentarios';
}

type FormatoExport = 'pdf' | 'epub' | 'html' | 'markdown' | 'txt';

const FORMATOS: { id: FormatoExport; label: string; icon: typeof FileText; desc: string }[] = [
  { id: 'pdf', label: 'PDF', icon: FileDown, desc: 'Documento profissional' },
  { id: 'epub', label: 'EPUB', icon: BookOpen, desc: 'E-book format' },
  { id: 'html', label: 'HTML', icon: FileCode, desc: 'Página web' },
  { id: 'markdown', label: 'Markdown', icon: FileType, desc: 'Texto formatado' },
  { id: 'txt', label: 'TXT', icon: FileText, desc: 'Texto puro' },
];

const TEMAS: { id: OpcoesExportPdf['tema']; label: string }[] = [
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Escuro' },
  { id: 'sepia', label: 'Sépia' },
];

export function ExportModal({
  open, onOpenChange, titulo, subtitulo, conteudo, estudo, tipo,
}: ExportModalProps) {
  const [formato, setFormato] = useState<FormatoExport>('pdf');
  const [gerando, setGerando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [linkCopiado, setLinkCopiado] = useState(false);

  const [opcoesPdf, setOpcoesPdf] = useState<Partial<OpcoesExportPdf>>({
    tema: 'light',
    incluirCabecalho: true,
    incluirRodape: true,
    incluirIndice: false,
    incluirNumerosVersiculos: true,
    fonte: 'serif',
    margem: 20,
    idioma: 'pt',
  });

  const [opcoesExport, setOpcoesExport] = useState<Partial<OpcoesExport>>({
    incluirVersiculos: true,
    incluirComentarios: true,
    incluirNotas: true,
    incluirReferencias: true,
    incluirMetadados: false,
    idioma: 'pt',
  });

  const handleExport = useCallback(async () => {
    setGerando(true);
    setSucesso(false);
    try {
      if (formato === 'pdf' && conteudo) {
        await exportarPdf(conteudo, {
          ...opcoesPdf,
          titulo,
          subtitulo,
        });
      } else if (formato === 'pdf' && estudo) {
        const { exportarEstudo: exp } = await import('@/lib/exportPdf');
        await exp({
          titulo: estudo.titulo,
          conteudo: estudo.versiculos.map(v => `"${v.texto}"`).join('\n\n'),
          autor: estudo.autor,
        }, opcoesPdf);
      } else if (estudo) {
        await exportarEstudoCompleto(estudo, {
          formato,
          ...opcoesExport,
        });
      } else if (formato === 'markdown' && conteudo) {
        const md = conteudo.map(c => {
          let t = '';
          if (c.titulo) t += `## ${c.titulo}\n\n`;
          if (c.referencia) t += `**${c.referencia}**\n\n`;
          t += c.conteudo;
          return t;
        }).join('\n\n---\n\n');
        const { downloadAsFile } = await import('@/lib/exportPdf');
        downloadAsFile(md, `${titulo.substring(0, 50)}.md`, 'text/markdown;charset=utf-8');
      } else if (formato === 'html' && conteudo) {
        const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>${titulo}</title>
        <style>body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:2rem;color:#1a1612;line-height:1.8}
        h1{color:#3a2618;border-bottom:2px solid #d4a843;padding-bottom:.3em}
        h2{color:#7a5030;margin:1.5em 0 .5em}
        blockquote{background:#f5f0e8;border-left:3px solid #b48c32;padding:1rem;border-radius:0 8px 8px 0;font-style:italic}
        .meta{color:#7a6e62;font-size:.9em}</style></head><body><h1>${titulo}</h1>
        ${subtitulo ? `<p class="meta">${subtitulo}</p>` : ''}
        ${conteudo.map(c => `<h2>${c.titulo || ''}</h2><p>${c.conteudo.replace(/\n/g, '<br>')}</p>`).join('')}
        <footer class="meta" style="margin-top:3rem;border-top:1px solid #e0d8cc;padding-top:1rem;text-align:center">Gerado por Sola Scriptura</footer>
        </body></html>`;
        const { downloadAsFile } = await import('@/lib/exportPdf');
        downloadAsFile(html, `${titulo.substring(0, 50)}.html`, 'text/html;charset=utf-8');
      } else if (formato === 'txt' && conteudo) {
        const txt = conteudo.map(c => {
          let t = '';
          if (c.titulo) t += `== ${c.titulo} ==\n\n`;
          if (c.referencia) t += `[${c.referencia}]\n\n`;
          t += c.conteudo;
          return t;
        }).join('\n\n---\n\n');
        const { downloadAsFile } = await import('@/lib/exportPdf');
        downloadAsFile(txt, `${titulo.substring(0, 50)}.txt`, 'text/plain;charset=utf-8');
      }

      setSucesso(true);
      setTimeout(() => { setSucesso(false); onOpenChange(false); }, 2000);
    } catch (err) {
      console.error('Erro ao exportar:', err);
    } finally {
      setGerando(false);
    }
  }, [formato, titulo, subtitulo, conteudo, estudo, opcoesPdf, opcoesExport, onOpenChange]);

  const copiarLink = useCallback(async () => {
    const id = estudo?.id || titulo.toLowerCase().replace(/\s+/g, '-');
    const link = gerarLinkCompartilhamento(id);
    try {
      await navigator.clipboard.writeText(link);
      setLinkCopiado(true);
      setTimeout(() => setLinkCopiado(false), 2000);
    } catch { /* fallback */ }
  }, [estudo, titulo]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-5 pb-3 border-b border-border/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-display">Exportar</DialogTitle>
            <DialogClose className="p-1 rounded-lg hover:bg-muted/50 transition-colors">
              <X className="w-4 h-4" />
            </DialogClose>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{titulo}</p>
        </DialogHeader>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Formato
            </label>
            <div className="grid grid-cols-5 gap-2">
              {FORMATOS.map(f => {
                const Icon = f.icon;
                return (
                  <motion.button
                    key={f.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormato(f.id)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200 ${
                      formato === f.id
                        ? 'border-primary/50 bg-primary/5 text-primary shadow-sm'
                        : 'border-border/30 hover:border-border/60 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-medium">{f.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {formato === 'pdf' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Tema
                </label>
                <div className="flex gap-2">
                  {TEMAS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setOpcoesPdf(p => ({ ...p, tema: t.id }))}
                      className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                        opcoesPdf.tema === t.id
                          ? 'border-primary/50 bg-primary/5 text-primary'
                          : 'border-border/30 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Fonte
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpcoesPdf(p => ({ ...p, fonte: 'serif' }))}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      opcoesPdf.fonte === 'serif'
                        ? 'border-primary/50 bg-primary/5 text-primary'
                        : 'border-border/30 text-muted-foreground'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setOpcoesPdf(p => ({ ...p, fonte: 'sans' }))}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      opcoesPdf.fonte === 'sans'
                        ? 'border-primary/50 bg-primary/5 text-primary'
                        : 'border-border/30 text-muted-foreground'
                    }`}
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Sans-serif
                  </button>
                </div>
              </div>

              <button
                onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Opções avançadas
                <ChevronDown className={`w-3 h-3 transition-transform ${mostrarOpcoes ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {mostrarOpcoes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {([
                      ['incluirCabecalho', 'Cabeçalho'],
                      ['incluirRodape', 'Rodapé'],
                      ['incluirIndice', 'Sumário'],
                      ['incluirNumerosVersiculos', 'Números dos versículos'],
                    ] as const).map(([key, label]) => (
                      <label key={key} className="flex items-center justify-between text-sm cursor-pointer">
                        <span className="text-muted-foreground">{label}</span>
                        <button
                          onClick={() => setOpcoesPdf(p => ({ ...p, [key]: !p[key] }))}
                          className={`relative w-9 h-5 rounded-full transition-colors ${
                            opcoesPdf[key] ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              opcoesPdf[key] ? 'translate-x-4' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {formato !== 'pdf' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {([
                ['incluirVersiculos', 'Versículos'],
                ['incluirComentarios', 'Comentários'],
                ['incluirNotas', 'Anotações'],
                ['incluirMetadados', 'Metadados'],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between text-sm cursor-pointer">
                  <span className="text-muted-foreground">{label}</span>
                  <button
                    onClick={() => setOpcoesExport(p => ({ ...p, [key]: !p[key] }))}
                    className={`relative w-9 h-5 rounded-full transition-colors ${
                      opcoesExport[key] ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        opcoesExport[key] ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </motion.div>
          )}
        </div>

        <div className="p-5 pt-0 space-y-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleExport}
            disabled={gerando}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            <AnimatePresence mode="wait">
              {gerando ? (
                <motion.span key="loader" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <Loader2 className="w-4 h-4" />
                </motion.span>
              ) : sucesso ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span key="dl" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <FileDown className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
            {gerando ? 'Gerando...' : sucesso ? 'Baixado!' : `Exportar ${FORMATOS.find(f => f.id === formato)?.label}`}
          </motion.button>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copiarLink}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-all"
            >
              {linkCopiado ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Link2 className="w-3.5 h-3.5" />}
              {linkCopiado ? 'Copiado!' : 'Link'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
