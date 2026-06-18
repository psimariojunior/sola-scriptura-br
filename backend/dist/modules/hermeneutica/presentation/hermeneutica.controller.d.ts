import { HermeneuticaService } from '../application/hermeneutica.service';
export declare class HermeneuticaController {
    private readonly hermeneuticaService;
    constructor(hermeneuticaService: HermeneuticaService);
    analisar(versiculoId: string): Promise<import("../domain/analise-hermeneutica.entity").AnaliseHermeneutica>;
    genero(versiculoId: string): Promise<string>;
}
