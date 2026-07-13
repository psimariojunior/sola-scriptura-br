'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, Copy, Check, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

function gerarCodigo(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function QuizMultiplayerPage() {
  const [tela, setTela] = useState<'menu' | 'criando' | 'sala'>('menu');
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoInput, setCodigoInput] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [ jogadores, setJogadores] = useState<string[]>([]);

  const criarSala = () => {
    if (!nome.trim()) return;
    setCodigo(gerarCodigo());
    setJogadores([nome.trim()]);
    setTela('criando');
    setTimeout(() => setTela('sala'), 1500);
  };

  const entrarSala = () => {
    if (!nome.trim() || !codigoInput.trim()) return;
    setCodigo(codigoInput.toUpperCase());
    setJogadores([nome.trim()]);
    setTela('sala');
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  if (tela === 'criando') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 mx-auto mb-6" />
            <p className="text-muted-foreground">Criando sala...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (tela === 'sala') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <Link href="/quiz" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </Link>
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <h1 className="font-display text-3xl font-light mb-2">Sala Multiplayer</h1>
                <p className="text-muted-foreground">Compartilhe o código com seus amigos</p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-8 text-center mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Código da Sala</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <p className="font-mono text-4xl font-bold tracking-[0.3em] text-purple-500">{codigo}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={copiarCodigo} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-sm font-medium hover:bg-muted transition-all">
                  {copiado ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copiado ? 'Copiado!' : 'Copiar Código'}
                </motion.button>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Jogadores na Sala ({jogadores.length})</p>
                <div className="space-y-2">
                  {jogadores.map((j, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-500">
                        {j[0]?.toUpperCase()}
                      </div>
                      <span className="text-sm font-medium">{j}</span>
                      {i === 0 && <span className="ml-auto text-xs text-muted-foreground">Host</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/5 p-6 text-center">
                <Loader2 className="w-5 h-5 text-purple-500 mx-auto mb-2 animate-spin" />
                <p className="text-sm text-muted-foreground">Aguardando jogadores...</p>
                <p className="text-xs text-muted-foreground mt-1">O jogo começará quando todos estiverem prontos</p>
              </div>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <Link href="/quiz" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Link>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Multiplayer</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Desafie amigos em tempo real! Crie uma sala ou entre com um código.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Seu Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como quer ser chamado?"
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 mb-4"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={criarSala} disabled={!nome.trim()} className={`p-6 rounded-2xl border-2 transition-all text-left ${nome.trim() ? 'border-purple-500/50 bg-purple-500/5 hover:bg-purple-500/10' : 'border-border/30 opacity-50 cursor-not-allowed'}`}>
                <Users className="w-8 h-8 text-purple-500 mb-3" />
                <h3 className="font-display text-lg font-medium mb-1">Criar Sala</h3>
                <p className="text-sm text-muted-foreground">Crie uma sala e convide amigos</p>
              </motion.button>

              <div className="space-y-3">
                <input
                  type="text"
                  value={codigoInput}
                  onChange={(e) => setCodigoInput(e.target.value.toUpperCase())}
                  placeholder="Código da sala"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 text-sm font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={entrarSala} disabled={!nome.trim() || !codigoInput.trim()} className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${nome.trim() && codigoInput.trim() ? 'border-purple-500/50 bg-purple-500/5 hover:bg-purple-500/10' : 'border-border/30 opacity-50 cursor-not-allowed'}`}>
                  <h3 className="font-display text-lg font-medium mb-1">Entrar na Sala</h3>
                  <p className="text-sm text-muted-foreground">Use o código de um amigo</p>
                </motion.button>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-purple-500/20 bg-purple-500/5 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                O multiplayer usa <span className="font-semibold text-purple-500">Supabase Realtime</span> para sincronizar jogadores em tempo real.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Configure o Supabase para ativar esta funcionalidade.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
