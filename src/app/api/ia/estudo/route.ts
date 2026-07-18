import { NextRequest, NextResponse } from 'next/server';
import { getLLMConfig } from '@/lib/llm-config';
import { construirContextoRAG, detectarReferencia } from '@/lib/ragGrounding';
import { rateLimit, getClientIP, RATE_LIMITS, buildRateLimitHeaders } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // Rate limit: 10/min por IP (rota mais pesada)
  const ip = getClientIP(request);
  const rl = rateLimit(ip, 'ia:estudo', RATE_LIMITS.IA_ESTUDO);
  if (!rl.allowed) {
    return NextResponse.json(
      { erro: 'Muitas requisicoes. Tente novamente em alguns segundos.' },
      { status: 429, headers: buildRateLimitHeaders(rl) }
    );
  }

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

  const referenciaRAG = await construirContextoRAG(passagem);
  let systemPromptFinal = systemPrompt;
  let instrucaoGrounding = '';

  if (referenciaRAG && referenciaRAG.temContexto) {
    const ref = referenciaRAG.referencia;
    const alvo = ref.versiculo
      ? `${ref.livroNome} ${ref.capitulo}:${ref.versiculo}`
      : `${ref.livroNome} ${ref.capitulo}`;
    instrucaoGrounding = `

═══════════════════════════════════════════════════════════════
MATERIAIS DE ESTUDO (FONTES REAIS — USE COMO BASE PRIMÁRIA)
═══════════════════════════════════════════════════════════════
${referenciaRAG.blocos.join('\n\n')}

INSTRUÇÕES DE FUNDAMENTAÇÃO (RAG):
1. Base sua resposta PRIMARIAMENTE nestes materiais de estudo para "${alvo}".
2. Cite as fontes (teólogos, comentaristas, léxico) SEMPRE que usar suas ideias, no formato: "— Calvino", "(Mateus Henry)" ou "Fonte: <nome>".
3. Se algo não estiver nestes materiais, diga explicitamente que é "análise adicional" ou "fora das fontes citadas".
4. Responda em português, tom acadêmico-evangélico.
5. NÃO invente citações de teólogos que não apareçam nos materiais acima.`;
  }

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
          { role: 'system', content: systemPrompt + instrucaoGrounding },
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
      fundamentado: referenciaRAG ? referenciaRAG.temContexto : false,
      fontes: referenciaRAG?.fontes ?? [],
      metadados: {
        modelo: model,
        tokens: dados.usage?.total_tokens,
        tempoMs: Date.now() - inicio,
        referencia: referenciaRAG?.referencia ?? null,
      },
    });
  } catch (erro: any) {
    console.error('Erro ao gerar estudo:', erro.message);
    return NextResponse.json(
      { erro: 'Falha ao gerar estudo. Tente novamente.', detalhes: erro.message },
      { status: 500 }
    );
  }
}
