import { Injectable, Logger } from '@nestjs/common';
import { RAGService } from '../../../infra/ia/rag.service';
import { LLMService } from '../../../infra/ia/llm.service';
import { KnowledgeGraphService } from '../../../infra/ia/knowledge-graph.service';

@Injectable()
export class IaService {
  private readonly logger = new Logger(IaService.name);

  constructor(
    private ragService: RAGService,
    private llmService: LLMService,
    private knowledgeGraph: KnowledgeGraphService,
  ) {}

  async perguntar(consulta: string, tradicaoTeologica?: string): Promise<any> {
    const contexto = await this.ragService.buscarContexto(consulta);
    const prompt = await this.ragService.montarPrompt(consulta, contexto, tradicaoTeologica);
    const resposta = await this.llmService.gerarResposta(prompt);

    return {
      pergunta: consulta,
      resposta,
      contexto: contexto.fontes.slice(0, 5),
      tradicaoTeologica: tradicaoTeologica || 'geral',
      fontes: contexto.fontes.slice(0, 10),
    };
  }

  async analisarExegese(versiculoId: string, texto: string): Promise<any> {
    const consulta = `Faça uma análise exegese detalhada deste versículo: "${texto}" (ID: ${versiculoId})`;
    return this.perguntar(consulta);
  }

  async analisarGrego(textoGrego: string): Promise<any> {
    const consulta = `Analise o texto grego a seguir, fornecendo morfologia, sintaxe e significado: "${textoGrego}"`;
    return this.perguntar(consulta);
  }

  async compararPassagens(passagens: string[]): Promise<any> {
    const consulta = `Compare e contraste as seguintes passagens bíblicas: ${passagens.join('; ')}`;
    return this.perguntar(consulta);
  }

  async buscarNoGrafo(entidadeId: string, profundidade = 2): Promise<any> {
    return this.knowledgeGraph.buscarVizinhos(entidadeId, profundidade);
  }

  async estatisticasGrafo(): Promise<any> {
    return this.knowledgeGraph.estatisticas();
  }
}
