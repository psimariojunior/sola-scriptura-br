import { ConfigService } from '@nestjs/config';
export declare class ElasticsearchService {
    private configService;
    private readonly logger;
    private client;
    constructor(configService: ConfigService);
    criarIndice(nome: string, configuracao: any): Promise<void>;
    indexar(documento: {
        indice: string;
        id: string;
        corpo: any;
    }): Promise<void>;
    buscar(params: {
        indice: string;
        consulta: any;
        pagina?: number;
        tamanho?: number;
    }): Promise<any>;
    buscarTextoCompleto(indice: string, texto: string, pagina?: number, tamanho?: number): Promise<any>;
    buscarSemantica(indice: string, vetor: number[], pagina?: number, tamanho?: number): Promise<any>;
    atualizar(indice: string, id: string, corpo: any): Promise<void>;
    remover(indice: string, id: string): Promise<void>;
    saúde(): Promise<boolean>;
}
