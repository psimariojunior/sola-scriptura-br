'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { BookOpen } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    try {
      const resp = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      if (!resp.ok) throw new Error('Credenciais inválidas');
      const dados = await resp.json();
      localStorage.setItem('token', dados.accessToken);
      localStorage.setItem('refreshToken', dados.refreshToken);
      window.location.href = '/biblia';
    } catch {
      setErro('Não foi possível entrar. Verifique suas credenciais.');
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Cabeçalho />
      <main className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h1 className="font-display text-3xl font-light text-foreground">Entrar</h1>
            <div className="ornamento w-16 mx-auto mt-3" />
          </div>

          <form onSubmit={entrar} className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors font-serif-body"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors font-serif-body"
                placeholder="••••••••"
                required
              />
            </div>
            {erro && <p className="text-sm text-burgundy">{erro}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8 font-serif-body">
            Não tem conta?{' '}
            <Link href="/auth/cadastrar" className="text-primary border-b border-primary/40 hover:border-primary">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
