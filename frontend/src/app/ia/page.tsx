'use client';

import { useState } from 'react';
import { MainNav } from '@/components/layout/main-nav';
import { Send, Bot } from 'lucide-react';

export default function IaPage() {
  const [consulta, setConsulta] = useState('');
  const [resposta, setResposta] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);
  const [tradicao, setTradicao] = useState('');

  async function handlePerguntar(e: React.FormEvent) {
    e.preventDefault();
    if (!consulta.trim()) return;
    setCarregando(true);
    try {
      const url = tradicao
        ? `/api/ia/perguntar?tradicao=${encodeURIComponent(tradicao)}`
        : '/api/ia/perguntar';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta }),
      });
      const dados = await response.json();
      setResposta(dados);
    } catch (erro) {
      console.error('Erro:', erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">IA Especialista em Estudos Bíblicos</h1>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border mb-6">
            <form onSubmit={handlePerguntar} className="space-y-4">
              <textarea
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Faça sua pergunta... Ex: Explique Romanos 8:28, Analise o grego de João 1:1"
                rows={4}
                className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex gap-4 items-center flex-wrap">
                <select
                  value={tradicao}
                  onChange={(e) => setTradicao(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background text-sm"
                >
                  <option value="">Tradição Teológica (opcional)</option>
                  <option value="arminiana">Arminiana</option>
                  <option value="reformada">Reformada</option>
                  <option value="batista">Batista</option>
                  <option value="pentecostal">Pentecostal</option>
                  <option value="wesleyana">Wesleyana</option>
                </select>
                <button
                  type="submit"
                  disabled={carregando}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {carregando ? 'Analisando...' : 'Perguntar'}
                </button>
              </div>
            </form>
          </div>
          {resposta && (
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="font-semibold mb-2">Resposta:</h3>
                <div className="whitespace-pre-wrap">{resposta.resposta}</div>
              </div>
              {resposta.fontes?.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-2 text-sm text-gray-500">
                    Fontes consultadas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resposta.fontes.map((fonte: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400"
                      >
                        {fonte.tipo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
