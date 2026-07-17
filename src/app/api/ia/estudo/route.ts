import { NextRequest, NextResponse } from 'next/server';
import { getLLMConfig } from '@/lib/llm-config';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 });
  }

  const { passagem, tipo } = body;

  if (!passagem?.trim()) {
    return NextResponse.json({ erro: 'Passagem ou tópico é obrigatório' }, { status: 400 });
  }

  const { apiKey, baseUrl, model } = getLLMConfig();

  const inicio = Date.now();

  const systemPrompt = `Você é um professor de teologia bíblica excepcionalmente talentoso, com PhD em Teologia Sistemática e Exegese Bíblica. Você fala português brasileiro com excelência acadêmica.

Sua tarefa é gerar guias de estudo bíblico COMPLETOS e DETALHADOS. Cada guia deve ser uma obra-prima de ensino bíblico.

FORMATO OBRIGATÓRIO (Markdown):
# [Título do Estudo]

## 📖 Contexto Histórico
[2-3 parágrafos sobre o contexto histórico, cultural e literário da passagem]

## 🔍 Análise Exegética
[Verse-by-verse breakdown dos versículos-chave, com observações gramaticais e teológicas]

## ⛪ Temas Teológicos Principais
[3-5 temas com explicações detalhadas e como se conectam]

## 🔗 Referências Cruzadas
[Lista de passagens relacionadas com breve explicação de cada]

## 💡 Aplicação Prática
[3-4 aplicações concretas para a vida do crente hoje]

## 📚 Comentários de Teólogos
[Citações ou resumos de 2-3 teólogos renomados sobre a passagem]

## ❓ Perguntas para Estudo
[5-7 perguntas de reflexão para grupo ou estudo pessoal]

## 🙏 Pontos de Oração
[3-4 pontos de oração derivados do estudo]

REGRAS:
- Use linguagem acadêmica acessível
- Cite versículos sempre com referência completa
- Seja abrangente mas não superficial
- Considere diferentes perspectivas teológicas quando relevante
- O estudo deve ter pelo menos 800 palavras`;

  try {
    const resposta = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Gere um guia de estudo bíblico completo para: ${passagem}${tipo ? `\n\nFoco: ${tipo}` : ''}` },
        ],
        temperature: 0.4,
        max_tokens: 4096,
      }),
      signal: AbortSignal.timeout(90000),
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(`LLM ${resposta.status}: ${erro}`);
    }

    const dados = await resposta.json();
    const estudo = dados.choices[0].message.content;

    return NextResponse.json({
      passagem,
      estudo,
      tipo: tipo || 'completo',
      metadados: {
        modelo: model,
        tokens: dados.usage?.total_tokens,
        tempoMs: Date.now() - inicio,
      },
    });
  } catch (erro: any) {
    console.error('Erro ao gerar estudo:', erro.message);
    return NextResponse.json(
      { erro: 'Falha ao gerar estudo. Tente novamente.' },
      { status: 500 }
    );
  }
}
