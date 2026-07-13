'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { X, Download, BookOpen } from 'lucide-react';

export default function InstallBanner() {
  const { canInstallBanner, install, dismissBanner } = usePWA();
  const [installing, setInstalling] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!canInstallBanner || !visible) return null;

  const handleInstall = async () => {
    setInstalling(true);
    await install();
    setInstalling(false);
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    dismissBanner();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-lg mx-auto pointer-events-auto">
            <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-2xl shadow-black/20">
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-all duration-200"
                aria-label="Dispensar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-semibold text-sm mb-1">Instalar Sola Scriptura</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    Adicione à tela inicial para acesso rápido e experiência nativa.
                  </p>

                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={handleInstall}
                      disabled={installing}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {installing ? 'Instalando...' : 'Instalar Agora'}
                    </motion.button>

                    <button
                      onClick={handleDismiss}
                      className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                      Agora não
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
