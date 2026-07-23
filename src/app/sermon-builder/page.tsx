'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Copy, Check, Download, Loader2, Plus, X, FileText } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface SermonOutline {
  titulo: string;
  versiculoChave: string;
  introducao: string;
  pontos: Array<{ titulo: string; subtitulo: string; versiculos: string[]; explicacao: string }>;
  conclusao: string;
  aplicacao: string;
}

export default function SermonBuilderPage() {
  const [tema, setTema] = useState('');
  const [versiculos, setVersiculos] = useState<string[]>([]);
  const [novoVersiculo, setNovoVersiculo] = useState('');
  const [sermon, setSermon] = useState<SermonOutline | null>(null);
  const [gerando, setGerando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const adicionarVersiculo = () => {
    if (novoVersiculo.trim() && !versiculos.includes(novoVersiculo.trim())) {
      setVersiculos(prev => [...prev, novoVersiculo.trim()]);
      setNovoVersiculo('');
    }
  };

  const removerVersiculo = (v: string) => {
    setVersiculos(prev => prev.filter(x => x !== v));
  };

  const gerarSermon = useCallback(async () => {
    if (!tema.trim()) return;
    setGerando(true);

    try {
      const prompt = `Gere um esboço de sermão completo em português brasileiro sobre o tema: "${tema}".
${versiculos.length > 0 ? `Versículos principais: ${versiculos.join(', ')}` : ''}

Retorne APENAS um JSON válido com esta estrutura:
{
  "titulo": "Título do Sermão",
  "versiculoChave": "Referência — Texto",
  "introducao": "Parágrafo de introdução",
  "pontos": [
    {"titulo": "Ponto 1", "subtitulo": "Subtítulo", "versiculos": ["Ref1", "Ref2"], "explicacao": "Explicação"},
    {"titulo": "Ponto 2", "subtitulo": "Subtítulo", "versiculos": ["Ref1"], "explicacao": "Explicação"},
    {"titulo": "Ponto 3", "subtitulo": "Subtítulo", "versiculos": ["Ref1"], "explicacao": "Explicação"}
  ],
  "conclusao": "Parágrafo de conclusão",
  "aplicacao": "Aplicação prática para a vida"
}`;

      const response = await fetch('/api/ia/perguntar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        try {
          const jsonMatch = data.resposta.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            setSermon(JSON.parse(jsonMatch[0]));
          }
        } catch {
          // If JSON parsing fails, create a basic outline
          setSermon({
            titulo: tema,
            versiculoChave: versiculos[0] || 'A definir',
            introducao: data.resposta?.slice(0, 200) || 'Introdução a ser desenvolvida.',
            pontos: [
              { titulo: 'Ponto 1', subtitulo: 'Contexto', versiculos: versiculos.slice(0, 2), explicacao: 'Desenvolver o contexto bíblico.' },
              { titulo: 'Ponto 2', subtitulo: 'Doutrina', versiculos: versiculos.slice(2, 4), explicacao: 'Explorar a doutrina principal.' },
              { titulo: 'Ponto 3', subtitulo: 'Aplicação', versiculos: versiculos.slice(4), explicacao: 'Aplicar à vida prática.' },
            ],
            conclusao: 'Conclusão a ser desenvolvida.',
            aplicacao: 'Aplicação prática para a vida cristã.',
          });
        }
      }
    } catch {}

    setGerando(false);
  }, [tema, versiculos]);

  const copiarSermon = () => {
    if (!sermon) return;
    const text = `${sermon.titulo}\nVersículo Chave: ${sermon.versiculoChave}\n\nINTRODUÇÃO\n${sermon.introducao}\n\n${sermon.pontos.map((p, i) => `${i + 1}. ${p.titulo} — ${p.subtitulo}\nVersículos: ${p.versiculos.join(', ')}\n${p.explicacao}`).join('\n\n')}\n\nCONCLUSÃO\n${sermon.conclusao}\n\nAPLICAÇÃO\n${sermon.aplicacao}`;
    navigator.clipboard.writeText(text);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
                <Sparkles className="w-10 h-10 text-amber-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Sermon <span className="text-primary italic">Builder</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Gere um esboço de sermão completo com IA — tema, versículos, pontos e aplicação</p>
            </div>
          </ScrollReveal>

          {/* Input Section */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Tema do Sermão</label>
                <input type="text" value={tema} onChange={e => setTema(e.target.value)}
                  placeholder="Ex: A graça de Deus, Fé em tempos difíceis, O amor ao próximo..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Versículos Principais (opcional)</label>
                <div className="flex gap-2">
                  <input type="text" value={novoVersiculo} onChange={e => setNovoVersiculo(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && adicionarVersiculo()}
                    placeholder="Ex: João 3:16"
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <motion.button onClick={adicionarVersiculo} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 rounded-xl bg-muted border border-border">
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                {versiculos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {versiculos.map(v => (
                      <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {v}
                        <button onClick={() => removerVersiculo(v)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <motion.button onClick={gerarSermon} disabled={!tema.trim() || gerando} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={cn('w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2',
                  tema.trim() ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' : 'opacity-50 bg-muted')}>
                {gerando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {gerando ? 'Gerando esboço...' : 'Gerar Esboço com IA'}
              </motion.button>
            </div>
          </div>

          {/* Sermon Output */}
          {sermon && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
              <div className="px-6 py-4 border-b border-border/40 bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl font-medium">{sermon.titulo}</h2>
                </div>
                <button onClick={copiarSermon}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted/50">
                  {copiado ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiado ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Versículo Chave */}
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">Versículo Chave</p>
                  <p className="text-sm italic">{sermon.versiculoChave}</p>
                </div>

                {/* Introdução */}
                <div>
                  <h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold">I</span>
                    Introdução
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{sermon.introducao}</p>
                </div>

                {/* Pontos */}
                {sermon.pontos.map((ponto, i) => (
                  <div key={i}>
                    <h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      {ponto.titulo}
                      <span className="text-sm text-muted-foreground font-normal">— {ponto.subtitulo}</span>
                    </h3>
                    <div className="ml-8 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {ponto.versiculos.map(v => (
                          <span key={v} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{v}</span>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/80">{ponto.explicacao}</p>
                    </div>
                  </div>
                ))}

                {/* Conclusão */}
                <div>
                  <h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center text-xs font-bold">C</span>
                    Conclusão
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{sermon.conclusao}</p>
                </div>

                {/* Aplicação */}
                <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
                  <h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold">A</span>
                    Aplicação Prática
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{sermon.aplicacao}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
