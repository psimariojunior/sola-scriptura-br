'use client';

import { useState } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Send, Sparkles } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

const sugestoes = [
  'Explique Romanos 8:28',
  'Analise o grego de João 1:1',
  'Compare Romanos e Gálatas sobre justificação',
  'Explique Êxodo 33 sob a perspectiva arminiana',
  'Qual o significado de "logos" em João 1?',
  'Contexto histórico de Isaías 53',
];

export default function IaPage() {
  const [consulta, setConsulta] = useState('');
  const [resposta, setResposta] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);
  const [tradicao, setTradicao] = useState('');

  async function perguntar(texto: string) {
    if (!texto.trim()) return;
    setConsulta(texto);
    setCarregando(true);
    setResposta(null);
    try {
      const url = tradicao
        ? `${API}/ia/perguntar?tradicao=${encodeURIComponent(tradicao)}`
        : `${API}/ia/perguntar`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta: texto }),
      });
      const dados = await resp.json();
      setResposta(dados);
    } catch {
      setResposta({ resposta: 'Não foi possível conectar ao assistente. Tente novamente.' });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Assistente</p>
            <h1 className="font-display text-5xl font-light text-foreground flex items-baseline gap-3">
              IA Especialista
              <Sparkles className="w-5 h-5 text-gold" strokeWidth={1.5} style={{ color: 'hsl(var(--gold))' }} />
            </h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-muted-foreground mt-4 text-lg leading-relaxed">
              O assistente responde com base em léxicos, comentários e a biblioteca teológica —
              não apenas com o modelo. Cada resposta cita suas fontes.
            </p>
          </div>

          {!resposta && !carregando && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Sugestões</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sugestoes.map((s) => (
                  <button
                    key={s}
                    onClick={() => perguntar(s)}
                    className="text-left text-sm font-serif-body text-foreground/80 p-4 border border-border hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="sola-card p-6 mb-8">
            <textarea
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Faça sua pergunta sobre a Bíblia..."
              rows={4}
              className="w-full bg-transparent text-foreground font-serif-body text-lg resize-none focus:outline-none placeholder:text-muted-foreground/60"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) perguntar(consulta);
              }}
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
              <select
                value={tradicao}
                onChange={(e) => setTradicao(e.target.value)}
                className="text-xs bg-transparent border border-border px-3 py-1.5 text-muted-foreground focus:outline-none focus:border-primary"
              >
                <option value="">Perspectiva geral</option>
                <option value="arminiana">Arminiana</option>
                <option value="reformada">Reformada</option>
                <option value="batista">Batista</option>
                <option value="pentecostal">Pentecostal</option>
                <option value="wesleyana">Wesleyana</option>
              </select>
              <button
                onClick={() => perguntar(consulta)}
                disabled={carregando || !consulta.trim()}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                {carregando ? 'Consultando...' : 'Consultar'}
              </button>
            </div>
          </div>

          {resposta && (
            <article className="sola-card p-10">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Resposta</p>
              <div className="font-serif-body text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                {resposta.resposta}
              </div>
              {resposta.fontes && resposta.fontes.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/40">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Fontes</p>
                  <div className="flex flex-wrap gap-2">
                    {resposta.fontes.map((f: any, i: number) => (
                      <span key={i} className="text-xs px-3 py-1 bg-secondary text-muted-foreground">
                        {f.tipo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
