import { RAGService } from '../../../infra/ia/rag.service';
import { LLMService } from '../../../infra/ia/llm.service';
import { KnowledgeGraphService } from '../../../infra/ia/knowledge-graph.service';
export declare class IaService {
    private ragService;
    private llmService;
    private knowledgeGraph;
    private readonly logger;
    constructor(ragService: RAGService, llmService: LLMService, knowledgeGraph: KnowledgeGraphService);
    perguntar(consulta: string, tradicaoTeologica?: string): Promise<any>;
    analisarExegese(versiculoId: string, texto: string): Promise<any>;
    analisarGrego(textoGrego: string): Promise<any>;
    compararPassagens(passagens: string[]): Promise<any>;
    buscarNoGrafo(entidadeId: string, profundidade?: number): Promise<any>;
    estatisticasGrafo(): Promise<any>;
}
