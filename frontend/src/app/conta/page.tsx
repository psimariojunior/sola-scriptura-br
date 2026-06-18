'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import {
  Loader2,
  User,
  Bookmark,
  NotebookPen,
  CalendarRange,
  LogOut,
  Mail,
  Trash2,
} from 'lucide-react';
import { getToken, clearTokens, getAuthHeaders, isLoggedIn } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

type Aba = 'perfil' | 'favoritos' | 'notas' | 'planos';

const abas: { id: Aba; rotulo: string; icone: any }[] = [
  { id: 'perfil', rotulo: 'Perfil', icone: User },
  { id: 'favoritos', rotulo: 'Favoritos', icone: Bookmark },
  { id: 'notas', rotulo: 'Notas', icone: NotebookPen },
  { id: 'planos', rotulo: 'Planos de Leitura', icone: CalendarRange },
];

export default function ContaPage() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [aba, setAba] = useState<Aba>('perfil');
  const [perfil, setPerfil] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [notas, setNotas] = useState<any[]>([]);
  const [planos, setPlanos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/auth/entrar');
      return;
    }
    setPronto(true);
    const headers = getAuthHeaders();

    Promise.all([
      fetch(`${API}/usuario/perfil`, { headers })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(`${API}/favoritos`, { headers })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      fetch(`${API}/notas`, { headers })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      fetch(`${API}/plano-leitura/usuario/progresso`, { headers })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
    ]).then(([p, f, n, pl]) => {
      setPerfil(p);
      setFavoritos(Array.isArray(f) ? f : []);
      setNotas(Array.isArray(n) ? n : []);
      setPlanos(Array.isArray(pl) ? pl : []);
      setCarregando(false);
    });
  }, [router]);

  async function removerFavorito(id: string) {
    const headers = getAuthHeaders();
    const resp = await fetch(`${API}/favoritos/${id}`, { method: 'DELETE', headers });
    if (resp.ok) setFavoritos((prev) => prev.filter((f) => f.id !== id));
  }

  function sair() {
    clearTokens();
    router.push('/auth/entrar');
  }

  if (!pronto) return null;

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                Sua conta
              </p>
              <h1 className="font-display text-5xl font-light text-foreground">
                {perfil?.nome || 'Estudante'}
              </h1>
              <div className="ornamento w-32 mt-4" />
            </div>
            <button
              onClick={sair}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-burgundy transition-colors border border-border px-4 py-2.5"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} /> Sair
            </button>
          </div>

          <div className="flex flex-wrap gap-1 border-b border-border mb-10">
            {abas.map((a) => {
              const Icone = a.icone;
              const ativo = aba === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setAba(a.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm tracking-wide transition-colors border-b-2 -mb-px ${
                    ativo
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icone className="w-4 h-4" strokeWidth={1.5} />
                  {a.rotulo}
                </button>
              );
            })}
          </div>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
            </div>
          ) : (
            <>
              {aba === 'perfil' && (
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="sola-card p-8 md:col-span-2">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Perfil
                    </h2>
                    <dl className="space-y-5">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                        <div>
                          <dt className="text-xs tracking-widest uppercase text-muted-foreground">
                            Nome
                          </dt>
                          <dd className="font-serif-body text-foreground">
                            {perfil?.nome || '—'}
                          </dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                        <div>
                          <dt className="text-xs tracking-widest uppercase text-muted-foreground">
                            Email
                          </dt>
                          <dd className="font-serif-body text-foreground">
                            {perfil?.email || '—'}
                          </dd>
                        </div>
                      </div>
                      {perfil?.criadoEm && (
                        <div>
                          <dt className="text-xs tracking-widest uppercase text-muted-foreground">
                            Membro desde
                          </dt>
                          <dd className="font-serif-body text-foreground">
                            {new Date(perfil.criadoEm).toLocaleDateString('pt-BR')}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div className="sola-card p-8">
                    <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
                      Resumo
                    </h3>
                    <ul className="space-y-4 font-serif-body">
                      <li className="flex items-baseline justify-between">
                        <span className="text-muted-foreground text-sm">Favoritos</span>
                        <span className="font-display text-2xl text-foreground">
                          {favoritos.length}
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between">
                        <span className="text-muted-foreground text-sm">Notas</span>
                        <span className="font-display text-2xl text-foreground">
                          {notas.length}
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between">
                        <span className="text-muted-foreground text-sm">Planos</span>
                        <span className="font-display text-2xl text-foreground">
                          {planos.length}
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
              )}

              {aba === 'favoritos' && (
                <section>
                  {favoritos.length === 0 ? (
                <EmptyState texto="Nenhum versículo favorito ainda." />
                  ) : (
                    <ul className="space-y-4">
                      {favoritos.map((f) => (
                        <li key={f.id} className="sola-card p-6 flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs tracking-widest uppercase text-burgundy mb-2">
                                {f.versiculo?.referencia || f.referencia || '—'}
                              </p>
                              <p className="font-serif-body text-foreground/90 leading-relaxed">
                                {f.versiculo?.texto || f.texto || ''}
                              </p>
                            </div>
                            <button
                              onClick={() => removerFavorito(f.id)}
                              className="text-muted-foreground hover:text-burgundy transition-colors p-1"
                              aria-label="Remover favorito"
                            >
                              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          {f.etiquetas?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
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
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {aba === 'notas' && (
                <section>
                  {notas.length === 0 ? (
                    <EmptyState texto="Nenhuma nota registrada ainda." />
                  ) : (
                    <ul className="space-y-4">
                      {notas.map((n) => (
                        <li
                          key={n.id}
                          className="sola-card p-6"
                          style={n.cor ? { borderLeftColor: n.cor, borderLeftWidth: 3 } : undefined}
                        >
                          <p className="text-xs tracking-widest uppercase text-burgundy mb-2">
                            {n.versiculo?.referencia || n.referencia || '—'}
                          </p>
                          <p className="font-serif-body text-foreground/90 leading-relaxed whitespace-pre-wrap">
                            {n.conteudo || n.texto || ''}
                          </p>
                          {n.etiquetas?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {n.etiquetas.map((et: string, i: number) => (
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
                </section>
              )}

              {aba === 'planos' && (
                <section>
                  {planos.length === 0 ? (
                    <EmptyState texto="Nenhum plano de leitura em andamento." />
                  ) : (
                    <ul className="space-y-4">
                      {planos.map((p) => {
                        const progresso = Math.min(
                          100,
                          Math.max(
                            0,
                            Math.round(
                              ((p.progresso ?? p.percentual ?? 0) * 100) /
                                ((p.progresso ?? p.percentual ?? 0) <= 1 ? 1 : 100),
                            ),
                          ),
                        );
                        return (
                          <li key={p.id} className="sola-card p-6">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h3 className="font-display text-xl font-semibold text-foreground">
                                {p.plano?.nome || p.nome || 'Plano de Leitura'}
                              </h3>
                              <span className="font-display text-lg text-primary">
                                {progresso}%
                              </span>
                            </div>
                            {p.plano?.descricao || p.descricao ? (
                              <p className="font-serif-body text-sm text-muted-foreground mb-4">
                                {p.plano?.descricao || p.descricao}
                              </p>
                            ) : null}
                            <div className="h-1.5 bg-secondary overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${progresso}%` }}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              )}
            </>
          )}

          <div className="mt-12 flex flex-wrap gap-4 text-sm">
            <Link
              href="/conta/favoritos"
              className="text-primary border-b border-primary/40 hover:border-primary"
            >
              Ver todos os favoritos
            </Link>
            <Link
              href="/conta/notas"
              className="text-primary border-b border-primary/40 hover:border-primary"
            >
              Ver todas as notas
            </Link>
          </div>
        </div>
      </main>
      <Rodapé />
    </div>
  );
}

function EmptyState({ texto }: { texto: string }) {
  return (
    <p className="font-serif-body italic text-muted-foreground py-12 text-center">{texto}</p>
  );
}
