'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Loader2, Users, BookOpen, Library, Languages, ScrollText, Activity } from 'lucide-react';
import { getAuthHeaders, isLoggedIn } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

const atividadeBase = [
  { dia: 'Seg', valor: 38 },
  { dia: 'Ter', valor: 52 },
  { dia: 'Qua', valor: 47 },
  { dia: 'Qui', valor: 65 },
  { dia: 'Sex', valor: 71 },
  { dia: 'Sáb', valor: 84 },
  { dia: 'Dom', valor: 58 },
];

export default function AdminPage() {
  const [dados, setDados] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      setCarregando(false);
      setErro(true);
      return;
    }
    const headers = getAuthHeaders();
    fetch(`${API}/admin/dashboard`, { headers })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setDados(d))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  const metricas = [
    {
      rotulo: 'Usuários',
      valor: dados?.totalUsuarios ?? 0,
      icone: Users,
    },
    {
      rotulo: 'Versículos',
      valor: dados?.totalVersiculos ?? 0,
      icone: ScrollText,
    },
    {
      rotulo: 'Livros',
      valor: dados?.totalLivros ?? 0,
      icone: BookOpen,
    },
    {
      rotulo: 'Traduções',
      valor: dados?.totalTraducoes ?? 0,
      icone: Languages,
    },
    {
      rotulo: 'Testamentos',
      valor: dados?.totalTestamentos ?? 0,
      icone: Library,
    },
    {
      rotulo: 'Anotações',
      valor: dados?.totalNotas ?? dados?.totalAnotacoes ?? 0,
      icone: Activity,
    },
  ];

  const usuariosRecentes: any[] = dados?.usuariosRecentes ?? dados?.usuarios ?? [];
  const atividade = (dados?.atividade ?? atividadeBase) as { dia: string; valor: number }[];
  const maxAtividade = Math.max(...atividade.map((a) => a.valor), 1);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Painel administrativo
            </p>
            <h1 className="font-display text-5xl font-light text-foreground">Dashboard</h1>
            <div className="ornamento w-32 mt-4" />
          </div>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-16">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando métricas...
            </div>
          ) : erro ? (
            <div className="sola-card p-10 text-center">
              <p className="font-serif-body italic text-muted-foreground">
                Não foi possível carregar o dashboard. Verifique suas permissões de administrador.
              </p>
            </div>
          ) : (
            <>
              <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                {metricas.map((m) => {
                  const Icone = m.icone;
                  return (
                    <div
                      key={m.rotulo}
                      className="bg-card border border-border p-6 transition-colors hover:border-gold/40"
                    >
                      <Icone
                        className="w-5 h-5 text-gold mb-4"
                        strokeWidth={1.5}
                      />
                      <p className="font-display text-3xl font-light text-foreground">
                        {Number(m.valor).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">
                        {m.rotulo}
                      </p>
                    </div>
                  );
                })}
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
                <section className="bg-card border border-border p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      Usuários Recentes
                    </h2>
                    <span className="text-xs tracking-widest uppercase text-muted-foreground">
                      {usuariosRecentes.length} registros
                    </span>
                  </div>

                  {usuariosRecentes.length === 0 ? (
                    <p className="font-serif-body italic text-muted-foreground py-8 text-center">
                      Nenhum usuário recente para exibir.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-xs tracking-widest uppercase text-muted-foreground border-b border-border">
                            <th className="py-3 pr-4 font-medium">Nome</th>
                            <th className="py-3 pr-4 font-medium">Email</th>
                            <th className="py-3 pr-4 font-medium">Papel</th>
                            <th className="py-3 font-medium">Cadastro</th>
                          </tr>
                        </thead>
                        <tbody className="font-serif-body">
                          {usuariosRecentes.map((u: any) => (
                            <tr
                              key={u.id}
                              className="border-b border-border/40 hover:bg-secondary/30 transition-colors"
                            >
                              <td className="py-3 pr-4 text-foreground">{u.nome || '—'}</td>
                              <td className="py-3 pr-4 text-muted-foreground">
                                {u.email || '—'}
                              </td>
                              <td className="py-3 pr-4">
                                <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground tracking-wide">
                                  {u.papel || u.role || '—'}
                                </span>
                              </td>
                              <td className="py-3 text-muted-foreground">
                                {u.criadoEm
                                  ? new Date(u.criadoEm).toLocaleDateString('pt-BR')
                                  : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>

                <section className="bg-card border border-border p-8">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
                    Atividade
                  </h2>
                  <div className="flex items-end justify-between gap-3 h-48">
                    {atividade.map((a, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex items-end justify-center h-full">
                          <div
                            className="w-full max-w-[2rem] bg-gradient-to-t from-primary to-gold transition-all"
                            style={{ height: `${(a.valor / maxAtividade) * 100}%` }}
                            title={`${a.valor}`}
                          />
                        </div>
                        <span className="text-xs tracking-widest uppercase text-muted-foreground">
                          {a.dia}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
