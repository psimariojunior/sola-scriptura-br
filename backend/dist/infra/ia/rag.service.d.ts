import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '../busca/elasticsearch.service';
interface ContextoRAG {
    textoBiblico: string[];
    lexico: string[];
    comentarios: string[];
    teologia: string[];
    historia: string[];
    geografia: string[];
    arqueologia: string[];
    fontes: Array<{
        tipo: string;
        texto: string;
        relevancia: number;
        referencia: string;
    }>;
}
export declare class RAGService {
    private configService;
    private elasticsearchService;
    private readonly logger;
    constructor(configService: ConfigService, elasticsearchService: ElasticsearchService);
    buscarContexto(consulta: string): Promise<ContextoRAG>;
    montarPrompt(consulta: string, contexto: ContextoRAG, tradicaoTeologica?: string): Promise<string>;
    private montarFontes;
}
export {};
