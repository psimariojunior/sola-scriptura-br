import { IaService } from '../application/ia.service';
export declare class IaController {
    private readonly iaService;
    constructor(iaService: IaService);
    perguntar(dados: {
        consulta: string;
    }, tradicao?: string): Promise<any>;
    analisarExegese(dados: {
        versiculoId: string;
        texto: string;
    }): Promise<any>;
    analisarGrego(dados: {
        texto: string;
    }): Promise<any>;
    comparar(dados: {
        passagens: string[];
    }): Promise<any>;
    buscarGrafo(entidadeId: string, profundidade?: number): Promise<any>;
    estatisticasGrafo(): Promise<any>;
}
