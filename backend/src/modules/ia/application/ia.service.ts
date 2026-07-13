import { Injectable, Logger } from '@nestjs/common';
import { RAGService, ContextoRAG } from '../../../infra/ia/rag.service';
import { LLMService } from '../../../infra/ia/llm.service';
import { KnowledgeGraphService } from '../../../infra/ia/knowledge-graph.service';
import { TipoEntidadeEmbedding } from '../presentation/dto/ia.dto';

interface RespostaIA {
  pergunta: string;
  resposta: string;
  contexto: Array<{ tipo: string; texto: string; relevancia: number; referencia: string }>;
  tradicaoTeologica: string;
  fontes: Array<{ tipo: string; texto: string; relevancia: number; referencia: string }>;
  metadados?: {
    modelo: string;
    tokens?: number;
    tempoMs: number;
  };
}

@Injectable()
export class IaService {
  private readonly logger = new Logger(IaService.name);

  constructor(
    private ragService: RAGService,
    private llmService: LLMService,
    private knowledgeGraph: KnowledgeGraphService,
  ) {}

  async perguntar(consulta: string, tradicaoTeologica?: string): Promise<RespostaIA> {
    const inicio = Date.now();

    const contexto = await this.ragService.buscarContexto(consulta);
    const prompt = await this.ragService.montarPrompt(consulta, contexto, tradicaoTeologica);
    const resposta = await this.llmService.gerarResposta(prompt);

    return {
      pergunta: consulta,
      resposta,
      contexto: contexto.fontes.slice(0, 5),
      tradicaoTeologica: tradicaoTeologica || 'geral',
      fontes: contexto.fontes.slice(0, 10),
      metadados: {
        modelo: 'gpt-4o',
        tempoMs: Date.now() - inicio,
      },
    };
  }

  async *perguntarStream(
    pergunta: string,
    tradicao?: string,
  ): AsyncGenerator<{ tipo: string; dados: any }> {
    const inicio = Date.now();

    yield { tipo: 'status', dados: { message: 'Buscando contexto...', etapa: 'rag' } };

    const contexto = await this.ragService.buscarContexto(pergunta);
    const prompt = await this.ragService.montarPrompt(pergunta, contexto, tradicao);

    if (contexto.fontes.length > 0) {
      yield {
        tipo: 'fontes',
        dados: {
          fontes: contexto.fontes.slice(0, 8).map(f => ({
            tipo: f.tipo,
            referencia: f.referencia,
            relevancia: f.relevancia,
          })),
        },
      };
    }

    yield { tipo: 'status', dados: { message: 'Gerando resposta...', etapa: 'llm' } };

    let respostaCompleta = '';
    let usage: any;

    for await (const chunk of this.llmService.gerarRespostaStream(prompt)) {
      if (chunk.done) {
        usage = chunk.usage;
      } else if (chunk.token) {
        respostaCompleta += chunk.token;
        yield { tipo: 'token', dados: { token: chunk.token } };
      }
    }

    yield {
      tipo: 'completo',
      dados: {
        pergunta,
        resposta: respostaCompleta,
        tradicaoTeologica: tradicao || 'geral',
        metadados: {
          modelo: 'gpt-4o',
          tokens: usage?.totalTokens,
          tempoMs: Date.now() - inicio,
        },
      },
    };
  }

  async analisarExegese(versiculoId: string, texto: string): Promise<RespostaIA> {
    const consulta = `Faça uma análise exegética detalhada deste versículo: "${texto}" (ID: ${versiculoId}). Inclua: contexto histórico, significado nas línguas originais, aplicação teológica e_cross-references.`;
    return this.perguntar(consulta);
  }

  async analisarGrego(textoGrego: string): Promise<RespostaIA> {
    const consulta = `Analise o texto grego a seguir, fornecendo morfologia completa (nomes: caso, gênero, número; verbos: tempo, voz, modo, pessoa), sintaxe, e significado teológico: "${textoGrego}"`;
    return this.perguntar(consulta);
  }

  async compararPassagens(passagens: string[]): Promise<RespostaIA> {
    const consulta = `Compare e contraste as seguintes passagens bíblicas, analisando: contexto original, tema central, paralelos e contraste, e significado teológico complementar: ${passagens.join('; ')}`;
    return this.perguntar(consulta);
  }

  async buscarNoGrafo(entidadeId: string, profundidade = 2): Promise<any> {
    if (!this.knowledgeGraph['populado']) {
      await this.knowledgeGraph.popularGrafo();
    }
    return this.knowledgeGraph.buscarVizinhos(entidadeId, undefined, profundidade);
  }

  async estatisticasGrafo(): Promise<any> {
    if (!this.knowledgeGraph['populado']) {
      await this.knowledgeGraph.popularGrafo();
    }
    return this.knowledgeGraph.estatisticas();
  }

  async gerarEmbeddings(tipo: TipoEntidadeEmbedding, ids?: number[]): Promise<{ sucesso: number; falha: number }> {
    return this.ragService.gerarEmbeddingsEntidade(tipo, ids || []);
  }

  async gerarEmbeddingsParaVersiculos(inicio: number, fim: number): Promise<{ sucesso: number; falha: number }> {
    const ids = Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
    return this.ragService.gerarEmbeddingsEntidade('versiculo', ids);
  }

  async popularEmbeddings(tipo: TipoEntidadeEmbedding): Promise<{ total: number; sucesso: number; falha: number }> {
    return this.ragService.popularEmbeddings(tipo);
  }

  async statusEmbeddings(): Promise<Record<string, { total: number; comEmbedding: number; percentual: number }>> {
    return this.ragService.statusEmbeddings();
  }

  async gerarEmbeddingTexto(texto: string): Promise<number[]> {
    return this.llmService.gerarEmbedding(texto);
  }

  obterEstatisticasCusto() {
    return this.llmService.obterEstatisticasCusto();
  }
}
