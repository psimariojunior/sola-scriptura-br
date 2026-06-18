import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RagService } from '../../rag/application/rag.service';
import { BibleService } from '../../bible/application/bible.service';

interface RespostaIA {
  pergunta: string;
  resposta: string;
  fontesUtilizadas: string[];
  contextoHistorico?: string;
  referenciasCruzadas?: string[];
  divergenciasAcademicas?: string[];
  aplicacoesPraticas?: string[];
  confianca: number;
}

const PROMPT_MASTER = `Você é um especialista acadêmico em:
- Exegese Bíblica
- Hermenêutica
- Teologia Sistemática
- História Bíblica
- Geografia Bíblica
- Arqueologia Bíblica
- Grego Bíblico
- Hebraico Bíblico

REGRAS:
1. Nunca forneça respostas superficiais.
2. Sempre consulte a base RAG antes de responder.
3. Diferencie: fatos históricos, interpretações teológicas, opiniões denominacionais.
4. Cite fontes utilizadas.
5. Explique contexto: histórico, cultural, literário, linguístico.
6. Apresente referências cruzadas.
7. Apresente aplicações práticas.
8. Mostre divergências acadêmicas quando existirem.
9. Nunca invente informações.
10. Sempre priorize precisão acadêmica.

Responda em Português Brasileiro, utilizando terminologia teológica consagrada em seminários evangélicos brasileiros. Quando citar termos gregos ou hebraicos, apresente transliteração e explicação em Português Brasileiro.`;

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly ragService: RagService,
    private readonly bibleService: BibleService,
    private readonly configService: ConfigService,
  ) {}

  async gerarResposta(pergunta: string, tradicao?: string): Promise<RespostaIA> {
    this.logger.log(`Processando pergunta: ${pergunta}`);

    try {
      const contexto = await this.ragService.buscarContexto(pergunta, 15);
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');

      if (!apiKey) {
        return this.gerarRespostaOffline(pergunta, contexto, tradicao);
      }

      const respostaIA = await this.chamarOpenAI(pergunta, contexto, tradicao, apiKey);

      return {
        pergunta,
        resposta: respostaIA,
        fontesUtilizadas: contexto.fontesUtilizadas,
        referenciasCruzadas: this.extrairReferencias(pergunta),
        confianca: contexto.documentos.length > 0 ? 0.9 : 0.5,
      };
    } catch (error) {
      this.logger.error(`Erro ao gerar resposta: ${error}`);
      return {
        pergunta,
        resposta: 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.',
        fontesUtilizadas: [],
        confianca: 0,
      };
    }
  }

  private async chamarOpenAI(
    pergunta: string,
    contexto: any,
    tradicao: string | undefined,
    apiKey: string,
  ): Promise<string> {
    const url = 'https://api.openai.com/v1/chat/completions';
    const model = this.configService.get<string>('OPENAI_MODEL', 'gpt-4o');

    const messages = [
      { role: 'system', content: PROMPT_MASTER },
    ];

    if (contexto.contextoCompleto) {
      messages.push({
        role: 'system',
        content: `Contexto recuperado da base de conhecimento:\n\n${contexto.contextoCompleto}`,
      });
    }

    if (tradicao) {
      messages.push({
        role: 'system',
        content: `Considere a perspectiva da tradição teológica ${tradicao}. Diferencie claramente quando uma interpretação pertence a esta tradição específica vs. quando é um consenso acadêmico geral.`,
      });
    }

    messages.push({ role: 'user', content: pergunta });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: 2048,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Não foi possível gerar uma resposta.';
  }

  private async gerarRespostaOffline(pergunta: string, contexto: any, tradicao?: string): Promise<RespostaIA> {
    const docs = contexto.documentos || [];

    let resposta = `## Análise baseada na base de conhecimento local\n\n`;
    resposta += `Com base nos ${docs.length} documentos encontrados na base de conhecimento:\n\n`;

    if (docs.length > 0) {
      const principaisDocs = docs.slice(0, 3);
      for (const doc of principaisDocs) {
        resposta += `**${doc.fonte}** (${doc.tipo}): ${doc.conteudo.substring(0, 200)}...\n\n`;
      }
    }

    resposta += `\n*Nota: Para uma análise mais aprofundada, configure a chave OPENAI_API_KEY no arquivo .env*`;

    return {
      pergunta,
      resposta,
      fontesUtilizadas: contexto.fontesUtilizadas,
      referenciasCruzadas: this.extrairReferencias(pergunta),
      confianca: 0.6,
    };
  }

  private extrairReferencias(texto: string): string[] {
    const regex = /(\d?\s*[A-Za-zÀ-ÿ]+)\s*(\d+):(\d+)/g;
    const refs: string[] = [];
    let match;
    while ((match = regex.exec(texto)) !== null) {
      refs.push(`${match[1].trim()} ${match[2]}:${match[3]}`);
    }
    return [...new Set(refs)];
  }
}
