'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, X, Check, Lock } from 'lucide-react';

const BENEFICIOS = [
  'Assistente de IA (chat teológico)',
  'Gerador de Estudo com IA',
  'Línguas originais (grego/hebraico) aprofundadas',
  'Atlas bíblico e mapas',
  'Flashcards e quiz ilimitados',
  'Estudos completos e offline',
  'Multi-tradução sem limites',
];

export interface PaywallProps {
  aberto: boolean;
  onFechar: () => void;
  titulo?: string;
  descricao?: string;
}

export default function Paywall({
  aberto,
  onFechar,
  titulo = 'Recurso exclusivo do Acesso Total',
  descricao = 'Este recurso de IA é parte do Acesso Total. Por um pagamento único de R$20, desbloqueie para sempre.',
}: PaywallProps) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const iniciarPagamento = async () => {
    setCarregando(true);
    setErro('');
    try {
      const userEmail =
        (window as any) &&
        (localStorage.getItem('usuario')
          ? JSON.parse(localStorage.getItem('usuario') || '{}')?.email
          : '');

      const res = await fetch('/api/pagamento/criar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail || '' }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || 'Erro ao iniciar pagamento');
        return;
      }

      if (data.mock) {
        // Fluxo demo: libera direto para demonstrar.
        window.location.href = data.init_point;
        return;
      }

      window.location.href = data.init_point;
    } catch {
      setErro('Falha ao conectar com o gateway de pagamento.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onFechar}
        >
          <motion.div
            className="w-full sm:max-w-md bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-amber-500/10">
              <button
                onClick={onFechar}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-all"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/25 mb-4">
                <Crown className="w-7 h-7 text-white" />
              </div>

              <h2 className="font-display text-2xl font-semibold mb-1">{titulo}</h2>
              <p className="text-sm text-muted-foreground">{descricao}</p>
            </div>

            <div className="p-6 sm:p-8 pt-5">
              <ul className="space-y-2.5 mb-6">
                {BENEFICIOS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl font-display font-semibold text-primary">R$20</span>
                <span className="text-sm text-muted-foreground">pagamento único</span>
              </div>
              <p className="text-xs text-muted-foreground mb-5 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Acesso vitalício · sem mensalidade
              </p>

              {erro && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg mb-4">
                  {erro}
                </p>
              )}

              <button
                onClick={iniciarPagamento}
                disabled={carregando}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
              >
                {carregando ? (
                  'Processando...'
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Pagar com Mercado Pago
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-muted-foreground mt-3">
                Pagamento seguro · Mercado Pago
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
