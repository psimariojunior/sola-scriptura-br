'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErro('Digite seu email');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const res = await fetch('/api/auth/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro || 'Erro ao enviar email de recuperação');
      }

      setEnviado(true);
    } catch (err: unknown) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao enviar email de recuperação.';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Recuperar senha</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Digite seu email para receber um link de recuperação
            </p>
          </div>

          {enviado ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Email de recuperação enviado
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Se o email estiver cadastrado, você receberá um link para redefinir sua senha.
                Verifique sua caixa de entrada e a pasta de spam.
              </p>

              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={enviar} className="space-y-4">
              {erro && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {erro}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50 min-h-[44px]"
              >
                {carregando ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Lembrou a senha?{' '}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Voltar para o login
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
