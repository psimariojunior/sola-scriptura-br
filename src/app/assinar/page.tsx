'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Paywall from '@/components/Paywall';
import { authService } from '@/lib/auth';
import { Crown, Sparkles, Check, Lock, Infinity as Infinito, BookOpen, Languages, Map, Layers, Download, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const BENEFICIOS = [
  { icon: Bot, titulo: 'Assistente de IA', desc: 'Chat teológico com fundamentação acadêmica' },
  { icon: Sparkles, titulo: 'Estudo com IA', desc: 'Gerador de estudos bíblicos completos' },
  { icon: Languages, titulo: 'Línguas originais', desc: 'Grego e hebraico com Strong\'s aprofundados' },
  { icon: Map, titulo: 'Atlas bíblico', desc: 'Mapas interativos e geografia sagrada' },
  { icon: Layers, titulo: 'Flashcards & Quiz', desc: 'Estudo ativo ilimitado' },
  { icon: Download, titulo: 'Offline & multi-tradução', desc: '6 traduções, acesso vitalício' },
];

function AssinarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [jaTemAcesso, setJaTemAcesso] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [paywallAberto, setPaywallAberto] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setJaTemAcesso(authService.temAcessoTotal());

    const status = searchParams.get('status');
    const mock = searchParams.get('mock');

    if (status === 'sucesso' || mock === '1') {
      authService.liberarAcessoTotal();
      setJaTemAcesso(true);
      setConfirmado(true);
      window.history.replaceState({}, '', '/assinar');
      // Confirma contra o servidor (best-effort) para manter a fonte de verdade.
      authService.sincronizarAcessoTotal().catch(() => {});
    }
  }, [searchParams]);

  const iniciarPagamento = async () => {
    setCarregando(true);
    setErro('');
    try {
      const email = authService.getUsuario()?.email || '';
      const res = await fetch('/api/pagamento/criar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.erro || 'Erro ao iniciar pagamento');
        return;
      }
      window.location.href = data.init_point;
    } catch {
      setErro('Falha ao conectar com o gateway de pagamento.');
    } finally {
      setCarregando(false);
    }
  };

  if (confirmado) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="font-display text-3xl font-semibold mb-2">Acesso Total liberado!</h1>
            <p className="text-muted-foreground mb-6">
              Obrigado! Seu acesso vitalício está ativo. Aproveite todos os recursos.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/ia" className="py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all">
                Abrir Assistente de IA
              </Link>
              <Link href="/estudo-ia" className="py-3 border border-border rounded-xl hover:bg-muted/50 transition-all">
                Gerar Estudo com IA
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25"
              >
                <Crown className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="font-display text-4xl sm:text-5xl font-light mb-2">
                Acesso <span className="text-primary italic">Total</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                R$20 · pagamento único · para sempre
              </p>
            </div>
          </ScrollReveal>

          {jaTemAcesso ? (
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-6 text-center mb-8 bg-primary/5">
                <Crown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold">Você já possui o Acesso Total!</p>
                <p className="text-sm text-muted-foreground mt-1">Todos os recursos desbloqueados.</p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.1}>
              <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-display text-5xl font-semibold text-primary">R$20</span>
                  <span className="text-muted-foreground pb-1">pagamento único</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-6">
                  <Infinito className="w-4 h-4" /> Acesso vitalício · sem assinatura mensal
                </p>

                {erro && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg mb-4">
                    {erro}
                  </div>
                )}

                <button
                  onClick={iniciarPagamento}
                  disabled={carregando}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {carregando ? 'Processando...' : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Pagar com Mercado Pago
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Pagamento seguro via Mercado Pago
                </p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {BENEFICIOS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.titulo} className="glass-card p-4 rounded-xl flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{b.titulo}</p>
                      <p className="text-xs text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="glass-card rounded-2xl p-6 text-sm text-muted-foreground">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> O que é gratuito?
              </h3>
              <p>
                A leitura da Bíblia (6 traduções), anotações, favoritos, flashcards,
                concordância e o conteúdo de estudo local permanecem <strong className="text-foreground">gratuitos</strong>.
                O Acesso Total desbloqueia os recursos de nuvem com IA e o conteúdo premium avançado.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />

      <Paywall
        aberto={paywallAberto}
        onFechar={() => setPaywallAberto(false)}
      />
    </div>
  );
}

export default function AssinarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <AssinarContent />
    </Suspense>
  );
}
