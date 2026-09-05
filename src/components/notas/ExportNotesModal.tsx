'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown, FileText, FileCode, Printer, X, Check,
  ChevronDown, Filter, Loader2,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import type { Nota } from '@/components/NotaEditor';
import {
  type FormatoNotas,
  exportAsTxt,
  exportAsHtml,
  exportAsPrintable,
  triggerPrint,
  downloadFile,
  filtrarNotas,
  obterTagsUnicas,
} from '@/lib/exportNotes';

interface ExportNotesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notas: Nota[];
}

const FORMATOS: { id: FormatoNotas; label: string; icon: typeof FileText; desc: string; ext: string; mime: string }[] = [
  { id: 'txt', label: 'TXT', icon: FileText, desc: 'Texto puro', ext: '.txt', mime: 'text/plain;charset=utf-8' },
  { id: 'html', label: 'DOCX', icon: FileCode, desc: 'Abrir no Word', ext: '.html', mime: 'text/html;charset=utf-8' },
  { id: 'print', label: 'PDF', icon: Printer, desc: 'Imprimir / salvar PDF', ext: '', mime: '' },
];

export function ExportNotesModal({ open, onOpenChange, notas }: ExportNotesModalProps) {
  const [formato, setFormato] = useState<FormatoNotas>('txt');
  const [gerando, setGerando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [filtroTag, setFiltroTag] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const tags = useMemo(() => obterTagsUnicas(notas), [notas]);

  const notasFiltradas = useMemo(() => {
    return filtrarNotas(notas, {
      tag: filtroTag || undefined,
      dataInicio: dataInicio || undefined,
      dataFim: dataFim || undefined,
    });
  }, [notas, filtroTag, dataInicio, dataFim]);

  const temFiltro = !!(filtroTag || dataInicio || dataFim);

  const handleExport = useCallback(async () => {
    if (notasFiltradas.length === 0) return;
    setGerando(true);
    setSucesso(false);

    try {
      if (formato === 'txt') {
        const content = exportAsTxt(notasFiltradas);
        const nome = temFiltro ? 'anotacoes_filtradas' : 'minhas_anotacoes';
        downloadFile(content, `${nome}.txt`, 'text/plain;charset=utf-8');
      } else if (formato === 'html') {
        const content = exportAsHtml(notasFiltradas);
        const nome = temFiltro ? 'anotacoes_filtradas' : 'minhas_anotacoes';
        downloadFile(content, `${nome}.html`, 'text/html;charset=utf-8');
      } else if (formato === 'print') {
        const content = exportAsPrintable(notasFiltradas);
        triggerPrint(content);
      }

      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        onOpenChange(false);
      }, 1800);
    } catch (err) {
      console.error('Erro ao exportar notas:', err);
    } finally {
      setGerando(false);
    }
  }, [formato, notasFiltradas, temFiltro, onOpenChange]);

  const limparFiltros = useCallback(() => {
    setFiltroTag('');
    setDataInicio('');
    setDataFim('');
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-5 pb-3 border-b border-border/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-display">Exportar Notas</DialogTitle>
            <DialogClose className="p-1 rounded-lg hover:bg-muted/50 transition-colors">
              <X className="w-4 h-4" />
            </DialogClose>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {notasFiltradas.length} de {notas.length} nota(s)
          </p>
        </DialogHeader>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Formato de exportação
            </label>
            <div className="grid grid-cols-3 gap-2">
              {FORMATOS.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.button
                    key={f.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormato(f.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                      formato === f.id
                        ? 'border-primary/50 bg-primary/5 text-primary shadow-sm'
                        : 'border-border/30 hover:border-border/60 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{f.label}</span>
                    <span className="text-[10px] opacity-60">{f.desc}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            {temFiltro ? 'Filtros ativos' : 'Filtrar notas'}
            <ChevronDown className={`w-3 h-3 transition-transform ${mostrarFiltros ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {mostrarFiltros && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Tag</label>
                  <select
                    value={filtroTag}
                    onChange={(e) => setFiltroTag(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Todas as tags</option>
                    {tags.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Data início</label>
                    <input
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Data fim</label>
                    <input
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                {temFiltro && (
                  <button onClick={limparFiltros} className="text-xs text-primary hover:underline">
                    Limpar filtros
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {notasFiltradas.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              Nenhuma nota encontrada com os filtros selecionados.
            </p>
          )}

          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              {formato === 'print'
                ? 'Será aberta uma janela de impressão. Selecione "Salvar como PDF" para gerar o PDF.'
                : formato === 'html'
                  ? 'O arquivo HTML pode ser aberto diretamente no Microsoft Word ou Google Docs.'
                  : 'Arquivo de texto puro, compatível com qualquer editor.'}
            </p>
          </div>
        </div>

        <div className="p-5 pt-0">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleExport}
            disabled={gerando || notasFiltradas.length === 0}
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
            {gerando
              ? 'Gerando...'
              : sucesso
                ? 'Baixado!'
                : `Exportar ${FORMATOS.find((f) => f.id === formato)?.label}`}
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
