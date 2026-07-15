'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, AlertTriangle } from 'lucide-react';
import { authService } from '@/lib/auth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AuthCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const token = params.get('token');
    const refresh = params.get('refresh');
    const usuarioRaw = params.get('usuario');
    const erroParam = params.get('erro');

    if (erroParam) {
      setErro(erroParam);
      const t = setTimeout(() => router.replace(`/auth/login?erro=${encodeURIComponent(erroParam)}`), 1800);
      return () => clearTimeout(t);
    }

    if (token && refresh && usuarioRaw) {
      try {
        const usuario = JSON.parse(decodeURIComponent(usuarioRaw));
        authService.definirSessaoExterna({
          accessToken: token,
          refreshToken: refresh,
          usuario,
        });
        router.replace('/');
        return;
      } catch {
        setErro('Falha ao processar autenticação');
        return;
      }
    }

    setErro('Parâmetros de autenticação ausentes');
    const t = setTimeout(() => router.replace('/auth/login'), 1800);
    return () => clearTimeout(t);
  }, [params, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        {erro ? (
          <div className="text-center">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">{erro}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Redirecionando...</p>
          </div>
        ) : (
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Finalizando autenticação...</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
