'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Loader2, BookText } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

interface Doutrina {
  id: string;
  nome: string;
  slug?: string;
  definicao: string;
  explicacao?: string | null;
  baseScriptura?: string | null;
}

interface Categoria {
  id: string;
  nome: string;
  slug?: string;
  descricao?: string | null;
  ordem?: number;
  doutrinas: Doutrina[];
}

const tradicoes = [
  {
    nome: 'Arminiana',
    origem: 'Jacó Armínio (1560–1609)',
    pontos: [
      'Eleição condicional pela presciência da fé',
      'Expiação ilimitada — Cristo morreu por todos',
      'Depravação total, mas graça preveniente habilita o livre-arbítrio',
      'Graça resistível — o homem pode recusar',
      'Perseverança condicional — é possível decair da graça',
    ],
  },
  {
    nome: 'Reformada',
    origem: 'João Calvino, Sínodo de Dort',
    pontos: [
      'Eleição incondicional pela soberana vontade de Deus',
      'Expiação limitada — Cristo morreu pelos eleitos',
      'Depravação total — o homem não pode buscar Deus por si',
      'Graça irresistível — os eleitos serão alcançados',
      'Perseverança dos santos — os eleitos não decaem',
    ],
  },
  {
    nome: 'Batista',
    origem: 'Tradição reformada, confissão de 1689',
    pontos: [
      'Congregacionalismo e governo local autônomo',
      'Batismo do crente por imersão após profissão de fé',
      'Converge com a soteriologia reformada (calvinista)',
      'Separação entre Igreja e Estado',
      'Autoridade da Escritura como única regra (Sola Scriptura)',
    ],
  },
  {
    nome: 'Pentecostal',
    origem: 'Avivamento de Azusa Street (1906)',
    pontos: [
      'Batismo no Espírito Santo como experiência distinta',
      'Evidência inicial no falar em outras línguas',
      'Continuidade dos dons espirituais (cessasionismo rejeitado)',
      'Cura divina no sacrifício de Cristo',
      'Iminência e poder do retorno de Cristo',
    ],
  },
  {
    nome: 'Wesleyana',
    origem: 'John Wesley (1703–1791)',
    pontos: [
      'Graça preveniente ao alcance de todos',
      'Justificação pela fé seguida de santificação',
      'Perfeição cristã — amor perfeito possível nesta vida',
      'Acordo arminiano na soteriologia',
      'Ênfase em santidade prática e obras de misericórdia',
    ],
  },
];

function CardDoutrina({ d }: { d: Doutrina }) {
  return (
    <article className="sola-card p-6">
      <h4 className="font-display text-xl font-semibold text-foreground mb-2">{d.nome}</h4>
      <p className="font-serif-body text-sm text-foreground/80 leading-relaxed mb-4">{d.definicao}</p>
      {d.baseScriptura && (
        <p className="text-xs tracking-widest uppercase text-muted-foreground pt-3 border-t border-border/40">
          Base scriptura · <span style={{ color: 'hsl(var(--burgundy))' }}>{d.baseScriptura}</span>
        </p>
      )}
    </article>
  );
}

export default function TeologiaPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch(`${API}/teologia/categorias`)
      .then((r) => r.json())
      .then((d) => {
        setCategorias(Array.isArray(d) ? d : []);
        setCarregando(false);
      })
      .catch(() => { setErro(true); setCarregando(false); });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Sistemática</p>
            <h1 className="font-display text-5xl font-light text-foreground">Teologia</h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              A exposição ordenada das doutrinas bíblicas. Cada doutrina repousa sobre a base scriptura
              que lhe dá fundamento — e cada tradição cristã a interpreta à sua maneira, sob a autoridade
              final da Escritura.
            </p>
          </div>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando categorias teológicas...
            </div>
          ) : erro ? (
            <p className="font-serif-body italic text-muted-foreground py-12 text-center">
              Não foi possível carregar as doutrinas no momento.
            </p>
          ) : categorias.length === 0 ? (
            <p className="font-serif-body italic text-muted-foreground py-12 text-center">
              Nenhuma categoria disponível.
            </p>
          ) : (
            <div className="space-y-20">
              {categorias
                .slice()
                .sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99))
                .map((cat) => (
                  <section key={cat.id}>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-display text-5xl text-primary/40">
                        {String(cat.ordem ?? '').padStart(2, '0')}
                      </span>
                      <div>
                        <h2 className="font-display text-3xl font-medium text-foreground">{cat.nome}</h2>
                        {cat.descricao && (
                          <p className="font-serif-body text-sm text-muted-foreground">{cat.descricao}</p>
                        )}
                      </div>
                      <div className="flex-1 h-px bg-border/60" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(cat.doutrinas || []).map((d) => (
                        <CardDoutrina key={d.id} d={d} />
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          )}

          <section className="mt-28">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Uma Escritura, muitas leituras
              </p>
              <h2 className="font-display text-4xl font-light text-foreground">Tradições Teológicas</h2>
              <div className="ornamento w-32 mx-auto mt-4" />
              <p className="font-serif-body text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
                As mesmas Escrituras são lidas por diferentes correntes da fé cristã.
                Cada tradição interpreta à sua maneira — e o estudo honesto exige conhecer
                todas as perspectivas antes de concluir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tradicoes.map((t) => (
                <article key={t.nome} className="sola-card p-8">
                  <h3 className="font-display text-2xl font-semibold text-foreground">{t.nome}</h3>
                  <p className="font-serif-body italic text-sm text-muted-foreground mb-5">{t.origem}</p>
                  <ul className="space-y-3">
                    {t.pontos.map((p, i) => (
                      <li key={i} className="flex gap-3 font-serif-body text-sm text-foreground/80 leading-relaxed">
                        <span className="font-display text-primary/50 leading-none mt-0.5">·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-16 sola-card p-10 flex items-start gap-5">
              <BookText className="w-7 h-7 text-primary/50 shrink-0 mt-1" strokeWidth={1.25} />
              <p className="font-serif-body text-base text-foreground/80 leading-relaxed">
                A <em>Sola Scriptura</em> não significa ignorar a tradição, mas subordiná-la à Escritura
                como única regra infalível. As tradições servem como guias históricos — a Escritura
                permanece o juiz supremo de toda interpretação.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
