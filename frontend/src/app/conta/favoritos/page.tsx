'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Loader2, Trash2, ChevronLeft, Bookmark } from 'lucide-react';
import { getAuthHeaders, isLoggedIn } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

export default function FavoritosPage() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [removendo, setRemovendo] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/auth/entrar');
      return;
    }
    setPronto(true);
    const headers = getAuthHeaders();
    fetch(`${API}/favoritos`, { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        setFavoritos(Array.isArray(d) ? d : []);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, [router]);

  async function remover(id: string) {
    setRemovendo(id);
    const headers = getAuthHeaders();
    const resp = await fetch(`${API}/favoritos/${id}`, { method: 'DELETE', headers });
    if (resp.ok) setFavoritos((prev) => prev.filter((f) => f.id !== id));
    setRemovendo(null);
  }

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
              Sua coleção
            </p>
            <h1 className="font-display text-5xl font-light text-foreground">Favoritos</h1>
            <div className="ornamento w-32 mt-4" />
          </div>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando favoritos...
            </div>
          ) : favoritos.length === 0 ? (
            <div className="sola-card p-16 text-center">
              <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-4" strokeWidth={1.25} />
              <p className="font-serif-body italic text-muted-foreground">
                Você ainda não favoritou nenhum versículo.
              </p>
              <Link
                href="/biblia"
                className="inline-block mt-6 text-sm text-primary border-b border-primary/40 hover:border-primary"
              >
                Explorar a Bíblia
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {favoritos.map((f) => (
                <li key={f.id} className="sola-card p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs tracking-widest uppercase text-burgundy mb-3">
                        {f.versiculo?.referencia || f.referencia || '—'}
                      </p>
                      <p className="font-serif-body text-lg text-foreground/90 leading-relaxed">
                        {f.versiculo?.texto || f.texto || ''}
                      </p>
                      {f.etiquetas?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {f.etiquetas.map((et: string, i: number) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground tracking-wide"
                            >
                              {et}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => remover(f.id)}
                      disabled={removendo === f.id}
                      className="text-muted-foreground hover:text-burgundy transition-colors p-1 disabled:opacity-50"
                      aria-label="Remover favorito"
                    >
                      {removendo === f.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
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
