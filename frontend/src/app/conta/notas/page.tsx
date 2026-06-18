'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Loader2, ChevronLeft, NotebookPen } from 'lucide-react';
import { getAuthHeaders, isLoggedIn } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

export default function NotasPage() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [notas, setNotas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/auth/entrar');
      return;
    }
    setPronto(true);
    const headers = getAuthHeaders();
    fetch(`${API}/notas`, { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        setNotas(Array.isArray(d) ? d : []);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, [router]);

  if (!pronto) return null;

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link
            href="/conta"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" /> Voltar para a conta
          </Link>

          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Suas reflexões
            </p>
            <h1 className="font-display text-5xl font-light text-foreground">Notas</h1>
            <div className="ornamento w-32 mt-4" />
          </div>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando notas...
            </div>
          ) : notas.length === 0 ? (
            <div className="sola-card p-16 text-center">
              <NotebookPen className="w-8 h-8 text-muted-foreground mx-auto mb-4" strokeWidth={1.25} />
              <p className="font-serif-body italic text-muted-foreground">
                Você ainda não registrou nenhuma nota.
              </p>
              <Link
                href="/biblia"
                className="inline-block mt-6 text-sm text-primary border-b border-primary/40 hover:border-primary"
              >
                Estudar a Bíblia
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {notas.map((n) => (
                <li
                  key={n.id}
                  className="sola-card p-7"
                  style={
                    n.cor
                      ? { borderLeftColor: n.cor, borderLeftWidth: 4 }
                      : { borderLeftColor: 'hsl(var(--gold) / 0.6)', borderLeftWidth: 4 }
                  }
                >
                  <p className="text-xs tracking-widest uppercase text-burgundy mb-3">
                    {n.versiculo?.referencia || n.referencia || '—'}
                  </p>
                  <p className="font-serif-body text-base text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {n.conteudo || n.texto || ''}
                  </p>
                  {(n.etiquetas?.length > 0 || n.cor) && (
                    <div className="flex flex-wrap items-center gap-2 mt-5">
                      {n.cor && (
                        <span
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 tracking-wide text-foreground/80"
                          style={{ backgroundColor: `${n.cor}22` }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: n.cor }}
                          />
                          Destaque
                        </span>
                      )}
                      {n.etiquetas?.map((et: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground tracking-wide"
                        >
                          {et}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
