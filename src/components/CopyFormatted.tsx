'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FormatoCitacao = 'abnt' | 'sbl' | 'chicago' | 'apa' | 'mla';

interface CitacaoData {
  livro: string;
  abreviacao: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

const FORMATOS: { id: FormatoCitacao; nome: string; descricao: string }[] = [
  { id: 'abnt', nome: 'ABNT', descricao: 'Associação Brasileira de Normas Técnicas' },
  { id: 'sbl', nome: 'SBL', descricao: 'Society of Biblical Literature' },
  { id: 'chicago', nome: 'Chicago', descricao: 'Chicago Manual of Style' },
  { id: 'apa', nome: 'APA', descricao: 'American Psychological Association' },
  { id: 'mla', nome: 'MLA', descricao: 'Modern Language Association' },
];

function formatarCitacao(data: CitacaoData, formato: FormatoCitacao): string {
  const { livro, abreviacao, capitulo, versiculo, texto, traducao } = data;
  const ref = `${capitulo}:${versiculo}`;
  const tradNome = traducao.toUpperCase();

  switch (formato) {
    case 'abnt':
      // ABNT NBR 10520:2023
      return `BÍBLIA. ${livro} ${ref}. In: BÍBLIA SAGRADA. ${tradNome}. São Paulo: Sociedade Bíblica do Brasil, 2024. p. [pag].`;

    case 'sbl':
      // SBL Handbook of Style
      return `${livro} ${ref} (${tradNome}).`;

    case 'chicago':
      // Chicago Manual of Style 17th ed.
      return `Bíblia, ${tradNome}. "${livro} ${ref}." Acessado em ${new Date().toLocaleDateString('pt-BR')}.`;

    case 'apa':
      // APA 7th edition
      return `Bíblia (${tradNome}). (2024). ${livro} ${ref}. Sociedade Bíblica do Brasil.`;

    case 'mla':
      // MLA 9th edition
      return `"${livro} ${ref}." Bíblia, ${tradNome}, Sociedade Bíblica do Brasil, 2024.`;

    default:
      return `${livro} ${ref} — ${texto}`;
  }
}

function formatarCitacaoComTexto(data: CitacaoData, formato: FormatoCitacao): string {
  const { livro, capitulo, versiculo, texto, traducao } = data;
  const ref = `${capitulo}:${versiculo}`;
  const tradNome = traducao.toUpperCase();

  switch (formato) {
    case 'abnt':
      return `"${texto}" (BÍBLIA, ${livro} ${ref}, ${tradNome}).`;

    case 'sbl':
      return `"${texto}" (${livro} ${ref} ${tradNome}).`;

    case 'chicago':
      return `"${texto}" (Bíblia, ${tradNome}, ${livro} ${ref}).`;

    case 'apa':
      return `"${texto}" (Bíblia, ${tradNome}, ${livro} ${ref}).`;

    case 'mla':
      return `"${texto}" (${livro} ${ref}).`;

    default:
      return `${texto} — ${livro} ${ref} (${tradNome})`;
  }
}

interface CopyFormattedProps {
  data: CitacaoData;
  className?: string;
}

export function CopyFormatted({ data, className }: CopyFormattedProps) {
  const [showModal, setShowModal] = useState(false);
  const [copiado, setCopiado] = useState<FormatoCitacao | null>(null);
  const [incluiTexto, setIncluiTexto] = useState(true);

  const copiar = useCallback((formato: FormatoCitacao) => {
    const texto = incluiTexto
      ? formatarCitacaoComTexto(data, formato)
      : formatarCitacao(data, formato);
    navigator.clipboard.writeText(texto);
    setCopiado(formato);
    setTimeout(() => setCopiado(null), 2000);
  }, [data, incluiTexto]);

  const copiarTodos = useCallback(() => {
    const todos = FORMATOS.map(f => `${f.nome}: ${incluiTexto ? formatarCitacaoComTexto(data, f.id) : formatarCitacao(data, f.id)}`).join('\n\n');
    navigator.clipboard.writeText(todos);
    setCopiado('abnt');
    setTimeout(() => setCopiado(null), 2000);
  }, [data, incluiTexto]);

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted/50 transition-all', className)}>
        <FileText className="w-3.5 h-3.5" /> Citar
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--surface-base)] border border-[var(--border)] rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]/40">
                <h3 className="font-display text-lg font-medium">Copiar com Formatação</h3>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-muted/50">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted-foreground">Incluir texto do versículo:</label>
                  <button onClick={() => setIncluiTexto(!incluiTexto)}
                    className={cn('w-10 h-5 rounded-full transition-all', incluiTexto ? 'bg-primary' : 'bg-muted')}>
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-all', incluiTexto ? 'translate-x-5' : 'translate-x-0.5')} />
                  </button>
                </div>

                <div className="space-y-2">
                  {FORMATOS.map(f => {
                    const texto = incluiTexto ? formatarCitacaoComTexto(data, f.id) : formatarCitacao(data, f.id);
                    return (
                      <div key={f.id} className="rounded-xl border border-border/50 bg-card/50 p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div>
                            <span className="text-xs font-bold text-primary">{f.nome}</span>
                            <span className="text-[10px] text-muted-foreground ml-2">{f.descricao}</span>
                          </div>
                          <button onClick={() => copiar(f.id)}
                            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                            {copiado === f.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                          </button>
                        </div>
                        <p className="text-xs text-foreground/70 leading-relaxed">{texto}</p>
                      </div>
                    );
                  })}
                </div>

                <button onClick={copiarTodos}
                  className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                  Copiar Todos os Formatos
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
