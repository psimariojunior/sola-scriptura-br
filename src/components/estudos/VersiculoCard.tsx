'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { hrefFromRef } from '@/lib/bibliaHref';

export interface VersiculoEstudoCardProps {
  versiculo: {
    referência?: string;
    referencia?: string;
    texto: string;
    explicação?: string;
    explicacao?: string;
    comentarios?: { teologo: string; texto: string }[];
  };
}

export function VersiculoCard({ versiculo }: VersiculoEstudoCardProps) {
  const [expandido, setExpandido] = useState(false);
  const ref = versiculo.referência ?? versiculo.referencia ?? '';
  const explicacao = versiculo.explicação ?? versiculo.explicacao ?? '';
  const href = hrefFromRef(ref);

  return (
    <motion.div layout className="sola-card overflow-hidden">
      <div className="p-5 cursor-pointer" onClick={() => setExpandido(!expandido)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p className="font-display text-sm font-medium text-primary">{ref}</p>
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Ler na Bíblia
              </Link>
            </div>
            <p className="text-sm italic leading-relaxed font-serif-body">&ldquo;{versiculo.texto}&rdquo;</p>
          </div>
          <motion.div animate={{ rotate: expandido ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {expandido && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-border/50 pt-3 space-y-4">
              {explicacao && (
                <p className="text-sm text-muted-foreground leading-relaxed">{explicacao}</p>
              )}
              {versiculo.comentarios && versiculo.comentarios.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Comentários de teólogos</p>
                  {versiculo.comentarios.map((c, i) => (
                    <div key={i} className="glass-card p-4 rounded-xl">
                      <p className="text-xs font-semibold text-foreground mb-1">{c.teologo}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{c.texto}&rdquo;</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
