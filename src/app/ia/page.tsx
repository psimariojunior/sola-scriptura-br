'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Send, Sparkles, BookOpen, MessageSquare, ChevronDown, Copy, Check, RefreshCw, Trash2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

interface Mensagem {
  tipo: 'user' | 'assistant';
  texto: string;
  fontes?: Array<{ tipo: string; texto: string; referencia: string }>;
  timestamp: Date;
}

const sugestoes = [
  { texto: 'Explique a doutrina da Trindade', categoria: 'Teologia' },
  { texto: 'Qual a diferença entre graça e misericórdia?', categoria: 'Doutrina' },
  { texto: 'O que Paulo ensina sobre justificação em Romanos?', categoria: 'Epístola' },
  { texto: 'Quem foi Abraão e qual sua importância?', categoria: 'Personagem' },
  { texto: 'Qual o contexto histórico de Gênesis 1?', categoria: 'História' },
  { texto: 'Como entender a profecia de Isaías 53?', categoria: 'Profecia' },
];

const tradicoes = ['Geral', 'Reformada', 'Arminiana', 'Batista', 'Pentecostal', 'Luterana', 'Presbiteriana'];

const CATEGORIA_COR: Record<string, string> = {
  'Teologia': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Doutrina': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Epístola': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Personagem': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'História': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'Profecia': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
};

export default function IaPage() {
  const [pergunta, setPergunta] = useState('');
  const [tradicao, setTradicao] = useState('Geral');
  const [historico, setHistorico] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [mostrarTradicoes, setMostrarTradicoes] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fimRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historico]);

  const enviar = async (texto?: string) => {
    const q = (texto || pergunta).trim();
    if (!q || carregando) return;

    const userMessage: Mensagem = { tipo: 'user', texto: q, timestamp: new Date() };
    setHistorico(prev => [...prev, userMessage]);
    setPergunta('');
    setCarregando(true);

    try {
      const res = await fetch('/api/ia/perguntar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta: q, tradicao: tradicao.toLowerCase() }),
      });
      if (!res.ok) throw new Error('Erro na requisição');
      const data = await res.json();
      setHistorico(prev => [...prev, { tipo: 'assistant', texto: data.resposta, fontes: data.fontes, timestamp: new Date() }]);
    } catch {
      setHistorico(prev => [...prev, { tipo: 'assistant', texto: 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.', timestamp: new Date() }]);
    } finally {
      setCarregando(false);
    }
  };

  const copyMessage = async (texto: string, index: number) => {
    await navigator.clipboard.writeText(texto);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportHistory = () => {
    const text = historico.map(msg => 
      `[${msg.timestamp.toLocaleTimeString('pt-BR')}] ${msg.tipo === 'user' ? 'Você' : 'Assistente'}:\n${msg.texto}`
    ).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-ia-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header />
      <main className="pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="mb-6 text-center pt-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3"
              >
                <Sparkles className="w-7 h-7 text-primary" />
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl font-light mb-1">Assistente Bíblico</h1>
              <p className="text-muted-foreground text-sm">IA especializada em estudos bíblicos acadêmicos</p>
            </div>
          </ScrollReveal>

          {/* Controls */}
          <ScrollReveal delay={0.1}>
            <div className="relative mb-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setMostrarTradicoes(!mostrarTradicoes)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-card border border-border rounded-full hover:bg-muted transition-all duration-300"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Tradição: {tradicao}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${mostrarTradicoes ? 'rotate-180' : ''}`} />
              </button>
              
              {historico.length > 0 && (
                <>
                  <motion.button onClick={() => setHistorico([])} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted" title="Limpar conversa">
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button onClick={exportHistory} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted" title="Exportar conversa">
                    <Download className="w-4 h-4" />
                  </motion.button>
                </>
              )}
              
              <AnimatePresence>
                {mostrarTradicoes && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 bg-card border border-border rounded-xl shadow-xl p-2 flex flex-wrap justify-center gap-1 w-80"
                  >
                    {tradicoes.map(t => (
                      <button key={t} onClick={() => { setTradicao(t); setMostrarTradicoes(false); }}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                          tradicao === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Chat messages */}
          <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-1">
            {historico.length === 0 && (
              <ScrollReveal delay={0.2}>
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" strokeWidth={1} />
                  <p className="text-muted-foreground/60 text-sm mb-6">Faça uma pergunta sobre as Escrituras</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
                    {sugestoes.map((s, i) => (
                      <motion.button
                        key={i}
                        onClick={() => enviar(s.texto)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="text-left p-3 border border-border rounded-lg hover:bg-muted hover:border-primary/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${CATEGORIA_COR[s.categoria] || 'bg-muted'}`}>
                            {s.categoria}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">{s.texto}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            <AnimatePresence>
              {historico.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[75%] ${
                    msg.tipo === 'user'
                      ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3'
                      : 'bg-card border border-border/50 rounded-2xl rounded-tl-sm px-5 py-4'
                  }`}>
                    {msg.tipo === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div className="font-serif-body text-sm leading-relaxed whitespace-pre-wrap">{msg.texto}</div>
                        {msg.fontes && msg.fontes.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-border/30">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Fontes consultadas:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.fontes.map((f, fi) => (
                                <span key={fi} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                                  {f.tipo}: {f.referencia}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm">{msg.texto}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                      <span className="text-[10px] text-muted-foreground/60">
                        {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <motion.button
                        onClick={() => copyMessage(msg.texto, i)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedIndex === i ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {carregando && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <span className="text-xs text-muted-foreground ml-1">Analisando as Escrituras...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={fimRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3 sticky bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent pt-4 pb-2">
            <input
              ref={inputRef}
              type="text"
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviar()}
              placeholder="Digite sua pergunta bíblica..."
              className="flex-1 px-5 py-3.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
              disabled={carregando}
            />
            <motion.button
              onClick={() => enviar()}
              disabled={!pergunta.trim() || carregando}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {carregando ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
