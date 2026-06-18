'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { BookOpen, Loader2 } from 'lucide-react';
import { setTokens } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

export default function CadastrarPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (senha !== confirmar) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha deve ter ao menos 6 caracteres.');
      return;
    }

    setEnviando(true);
    try {
      const resp = await fetch(`${API}/auth/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!resp.ok) {
        const dados = await resp.json().catch(() => null);
        throw new Error(dados?.mensagem || 'Não foi possível cadastrar.');
      }

      const dados = await resp.json();
      const access = dados.accessToken || dados.token;
      const refresh = dados.refreshToken || '';
      if (access) setTokens(access, refresh);

      window.location.href = '/biblia';
    } catch (err: any) {
      setErro(err.message || 'Não foi possível concluir o cadastro.');
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Cabeçalho />
      <main className="flex-1 flex items-center justify-center px-6 pt-20 pb-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h1 className="font-display text-3xl font-light text-foreground">Criar Conta</h1>
            <div className="ornamento w-16 mx-auto mt-3" />
            <p className="font-serif-body text-sm text-muted-foreground mt-4 leading-relaxed">
              Junte-se à comunidade de estudo das Escrituras.
            </p>
          </div>

          <form onSubmit={cadastrar} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors font-serif-body"
                placeholder="Seu nome"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Email
              </label>
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
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors font-serif-body"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors font-serif-body"
                placeholder="••••••••"
                required
              />
            </div>

            {erro && <p className="text-sm text-burgundy">{erro}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {enviando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Criando conta...
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8 font-serif-body">
            Já tem conta?{' '}
            <Link
              href="/auth/entrar"
              className="text-primary border-b border-primary/40 hover:border-primary transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
