'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Send, Sparkles } from 'lucide-react';

const sugestoes = [
  'Qual é o significado de John 3:16?',
  'Explique a doutrina da Trindade',
  'Qual a diferença entre graça e misericórdia?',
  'O que Paulo ensina sobre justificação em Romanos?',
];

const tradicoes = ['Geral', 'Reformada', 'Arminiana', 'Batista', 'Pentecostal'];

export default function IaPage() {
  const [pergunta, setPergunta] = useState('');
  const [tradicao, setTradicao] = useState('Geral');
  const [resposta, setResposta] = useState('');
  const [carregando, setCarregando] = useState(false);

  const enviar = async () => {
    if (!pergunta.trim() || carregando) return;
    setCarregando(true);
    setResposta('');

    // Simulated AI response
    await new Promise((r) => setTimeout(r, 1500));

    const respostasSimuladas: Record<string, string> = {
      'Qual é o significado de John 3:16?':
        `**João 3:16 — O Versículo Mais Conhecido da Bíblia**

"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."

**Análise:**
- **Amor divino (ἀγάπη/agape):** Não é um sentimento superficial, mas um amor sacrificial e incondicional
- **Mundo (κόσμος/kosmos):** A humanidade caída, não apenas os judeus
- **Unigênito (μονογενής/monogenēs):** Único em sua natureza, o Filho eterno de Deus
- **Crer (πιστεύω/pisteuō):** Fé ativa e pessoal, não mero acordo intelectual
- **Vida eterna (ζωή αἰώνιος/zōē aiōnios):** Qualidade de vida que começa agora e se estende para sempre

Esta passagem é o resumo do evangelho: Deus ama, Deus dá, o homem crê, o homem vive.`,
    };

    setResposta(respostasSimuladas[pergunta] || `**Resposta sobre: "${pergunta.slice(0, 50)}..."**

Baseado no contexto bíblico e na tradição ${tradicao}, posso afirmar que este é um tema que requer estudo cuidadoso das Escrituras.

Recomendo consultar as passagens relacionadas e meditar sobre o contexto original para uma compreensão mais profunda.

*Nota: Esta é uma resposta simulada. Para respostas completas com IA real, configure a API OpenAI.*`);
    setCarregando(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Assistente IA</h1>
            <p className="text-muted-foreground">Especialista em estudos bíblicos acadêmicos</p>
          </div>

          {/* Chat */}
          <div className="sola-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Assistente Bíblico</p>
                <p className="text-xs text-muted-foreground">Tradição: {tradicao}</p>
              </div>
            </div>

            {/* Tradition selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tradicoes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTradicao(t)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    tradicao === t
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Response */}
            {resposta && (
              <div className="bg-muted/50 rounded-sm p-6 mb-6 font-serif-body text-sm leading-relaxed whitespace-pre-wrap">
                {resposta}
              </div>
            )}

            {carregando && (
              <div className="bg-muted/50 rounded-sm p-6 mb-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.4s]" />
                <span className="text-sm text-muted-foreground ml-2">Analisando as Escrituras...</span>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Sugestões:</p>
            <div className="flex flex-wrap gap-2">
              {sugestoes.map((s) => (
                <button
                  key={s}
                  onClick={() => setPergunta(s)}
                  className="text-xs text-left px-4 py-2 border border-border rounded-full hover:bg-muted transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Faça sua pergunta bíblica..."
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviar()}
              className="flex-1 px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={enviar}
              disabled={!pergunta.trim() || carregando}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
