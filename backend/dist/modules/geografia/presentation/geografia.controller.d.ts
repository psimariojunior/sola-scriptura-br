import { GeografiaService } from '../application/geografia.service';
export declare class GeografiaController {
    private readonly geografiaService;
    constructor(geografiaService: GeografiaService);
    listarLocalizacoes(tipo?: string): Promise<import("../domain/localizacao.entity").Localizacao[]>;
    buscarLocalizacao(slug: string): Promise<import("../domain/localizacao.entity").Localizacao>;
    listarRotas(): Promise<import("../domain/rota.entity").Rota[]>;
    proximos(lat: number, lng: number, raio?: number): Promise<import("../domain/localizacao.entity").Localizacao[]>;
}
