'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';
import { HOTKEY_GROUPS, formatHotkey } from '@/lib/hotkeys';

interface HotkeysDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HotkeysDialog({ open, onOpenChange }: HotkeysDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 p-5 border-b border-border/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Keyboard className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-medium">Atalhos de teclado</h2>
                  <p className="text-xs text-muted-foreground">
                    Navegue mais rápido pelo Sola Scriptura
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(HOTKEY_GROUPS).map(([grupo, atalhos]) => (
                  <div key={grupo}>
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                      {grupo}
                    </h3>
                    <div className="space-y-1">
                      {atalhos.map((hk) => {
                        const Icon = hk.icon;
                        return (
                          <div
                            key={hk.id}
                            className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                              <span className="text-xs truncate">{hk.description}</span>
                            </div>
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono border border-border/50 rounded bg-muted/40 whitespace-nowrap shrink-0">
                              {formatHotkey(hk.combo)}
                            </kbd>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border/30 text-[11px] text-muted-foreground">
                <p>
                  <kbd className="px-1.5 py-0.5 border border-border/50 rounded bg-muted/40 font-mono">Ctrl</kbd> no Windows/Linux,{' '}
                  <kbd className="px-1.5 py-0.5 border border-border/50 rounded bg-muted/40 font-mono">⌘</kbd> no Mac.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
