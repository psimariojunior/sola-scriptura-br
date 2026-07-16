'use client';

import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, BookOpen, Loader2, Copy, Check, Download, ChevronDown, Brain, Cross, Lightbulb, MessageCircle, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ReactMarkdown from 'react-markdown';

const SUGESTOES = [
  { texto: 'Romanos 8 — A Vida no Espírito', tipo: 'exegese' },
  { texto: 'Gênesis 1 — A Criação do Mundo', tipo: 'contexto' },
  { texto: 'Efésios 6 — A Armadura de Deus', tipo: 'aplicacao' },
  { texto: 'Salmos 23 — O Senhor é o Meu Pastor', tipo: 'devocional' },
  { texto: 'João 15 — A Videira Verdadeira', tipo: 'exegese' },
  { texto: 'Filipenses 4 — A Fonte da Paz', tipo: 'aplicacao' },
  { texto: 'Isaías 53 — O Servo Sofredor', tipo: 'profetico' },
  { texto: 'Apocalipse 21 — A Nova Criação', tipo: 'escatologico' },
];

const TIPOS = [
  { id: 'completo', label: 'Estudo Completo', icon: BookOpen, desc: 'Análise exegética, teológica e prática' },
  { id: 'exegese', label: 'Exegese', icon: Brain, desc: 'Foco na análise versículo a versículo' },
  { id: 'contexto', label: 'Contexto', icon: Lightbulb, desc: 'Foco no contexto histórico e cultural' },
  { id: 'aplicacao', label: 'Aplicação', icon: Heart, desc: 'Foco na aplicação prática para hoje' },
];

export default function EstudoIAPage() {
  const [passagem, setPassagem] = useState('');
  const [tipo, setTipo] = useState('completo');
  const [estudo, setEstudo] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [historico, setHistorico] = useState<Array<{ passagem: string; data: string }>>([]);
  const resultadoRef = useRef<HTMLDivElement>(null);

  const gerarEstudo = async () => {
    if (!passagem.trim() || carregando) return;
    setCarregando(true);
    setErro('');
    setEstudo('');

    try {
      const res = await fetch('/api/ia/estudo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passagem: passagem.trim(), tipo }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || 'Erro ao gerar estudo');
        return;
      }

      setEstudo(data.estudo);
      setHistorico(prev => [
        { passagem: passagem.trim(), data: new Date().toLocaleString('pt-BR') },
        ...prev.slice(0, 9),
      ]);

      setTimeout(() => {
        resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch {
      setErro('Falha na conexão. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const copiarEstudo = async () => {
    await navigator.clipboard.writeText(estudo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const compartilhar = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Estudo Bíblico: ${passagem}`,
        text: estudo.substring(0, 500) + '...',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/25"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Gerador de Estudo <span className="italic text-primary">Bíblico com IA</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Digite uma passagem ou tópico e receba um guia de estudo completo com análise exegética, 
                temas teológicos, referências cruzadas e aplicações práticas.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="sola-card p-6 mb-8">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={passagem}
                    onChange={(e) => setPassagem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && gerarEstudo()}
                    placeholder="Ex: Romanos 8, Gênesis 1:1-10, A graça de Deus..."
                    className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {TIPOS.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTipo(t.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                          tipo === t.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <motion.button
                  onClick={gerarEstudo}
                  disabled={!passagem.trim() || carregando}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                >
                  {carregando ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando estudo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Gerar Estudo Bíblico
                    </>
                  )}
                </motion.button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Sugestões:</span>
                {SUGESTOES.slice(0, 4).map((s) => (
                  <button
                    key={s.texto}
                    onClick={() => { setPassagem(s.texto); setTipo(s.tipo); }}
                    className="text-xs text-primary/70 hover:text-primary transition-colors"
                  >
                    {s.texto}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {erro && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="sola-card p-4 mb-8 border-red-500/20 bg-red-500/5"
            >
              <p className="text-sm text-red-500">{erro}</p>
            </motion.div>
          )}

          <AnimatePresence>
            {estudo && (
              <motion.div
                ref={resultadoRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="sola-card p-8 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Cross className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold">Estudo: {passagem}</h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copiarEstudo}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                      title="Copiar"
                    >
                      {copiado ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={compartilhar}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                      title="Compartilhar"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none font-serif-body leading-relaxed">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="font-display text-2xl font-semibold text-primary mb-4 mt-6">{children}</h1>,
                      h2: ({ children }) => <h2 className="font-display text-xl font-semibold text-primary mb-3 mt-5 flex items-center gap-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="font-display text-lg font-medium mb-2 mt-4">{children}</h3>,
                      p: ({ children }) => <p className="text-foreground/80 mb-3 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-foreground/80">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-foreground/80">{children}</ol>,
                      li: ({ children }) => <li className="text-sm">{children}</li>,
                      strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                      em: ({ children }) => <em className="text-primary/80">{children}</em>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground my-3">{children}</blockquote>
                      ),
                    }}
                  >
                    {estudo}
                  </ReactMarkdown>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {historico.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="sola-card p-6">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Estudos Recentes
                </h3>
                <div className="space-y-2">
                  {historico.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => setPassagem(h.passagem)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{h.passagem}</span>
                      <span className="text-xs text-muted-foreground">{h.data}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
