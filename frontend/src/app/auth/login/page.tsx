'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MainNav } from '@/components/layout/main-nav';
import { BookOpen } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await response.json();
      localStorage.setItem('token', dados.accessToken);
      localStorage.setItem('refreshToken', dados.refreshToken);
      window.location.href = '/biblia';
    } catch (erro) {
      console.error('Erro no login:', erro);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto mt-12">
          <div className="text-center mb-8">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Entrar no Sola Scriptura</h1>
            <p className="text-gray-500 mt-2">
              Acesse sua plataforma de estudos bíblicos
            </p>
          </div>
          <form onSubmit={handleLogin} className="bg-card rounded-xl p-8 shadow-sm border space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Entrar
            </button>
            <p className="text-center text-sm text-gray-500">
              Não tem conta?{' '}
              <Link href="/auth/cadastrar" className="text-blue-600 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
