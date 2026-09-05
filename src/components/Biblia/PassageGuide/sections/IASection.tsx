'use client';

import { useState, useRef, useCallback } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { PassageGuideSection } from '../PassageGuideSection';

interface IASectionProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

export function IASection({ livro, capitulo, versiculo, texto }: IASectionProps) {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const enviarPergunta = useCallback(async () => {
    if (!pergunta.trim() || streaming) return;
    setStreaming(true);
    setResposta('');
    setError(null);
    abortRef.current = new AbortController();

    try {
      const perguntaComContexto = `Sobre ${livro} ${capitulo}:${versiculo}: "${texto}"\n\nPergunta: ${pergunta}`;
      const res = await fetch('/api/ia/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: perguntaComContexto }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        throw new Error('Erro ao conectar com a IA');
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Resposta vazia');

      const decoder = new TextDecoder();
      let buffer = '';
      let textoAcumulado = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const linhas = buffer.split('\n');
        buffer = linhas.pop() || '';

        for (const linha of linhas) {
          if (linha.startsWith('data: ')) {
            try {
              const json = JSON.parse(linha.slice(6));
              if (json.tipo === 'token' && json.dados?.token) {
                textoAcumulado += json.dados.token;
                setResposta(textoAcumulado);
              } else if (json.tipo === 'erro') {
                setError(json.dados?.message || 'Erro ao processar');
              }
            } catch { /* skip invalid JSON */ }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Erro ao conectar com a IA');
      }
    } finally {
      setStreaming(false);
    }
  }, [pergunta, streaming, livro, capitulo, versiculo, texto]);

  return (
    <PassageGuideSection
      title="Perguntar à IA"
      icon={<Sparkles className="w-4 h-4" />}
      loading={false}
      loaded={true}
      accentColor="#d946ef"
    >
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarPergunta()}
            placeholder="Ex: Qual o contexto histórico?"
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]"
            disabled={streaming}
          />
          <button
            onClick={enviarPergunta}
            disabled={!pergunta.trim() || streaming}
            className="px-3 py-2 rounded-lg bg-[var(--brand-default)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {streaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
        {resposta && (
          <div className="rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3">
            <p className="text-sm text-[var(--content-secondary)] whitespace-pre-wrap leading-relaxed">
              {resposta}
            </p>
          </div>
        )}
        {!resposta && !streaming && !error && (
          <p className="text-xs text-[var(--content-muted)] italic">
            Pergunte sobre o contexto, significado ou aplicação deste versículo.
          </p>
        )}
      </div>
    </PassageGuideSection>
  );
}
