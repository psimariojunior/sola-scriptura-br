import { GregoService } from '../application/grego.service';
export declare class GregoController {
    private readonly gregoService;
    constructor(gregoService: GregoService);
    buscarPorStrong(strong: string): Promise<import("../domain/palavra-grega.entity").PalavraGrega>;
    buscarPorLemma(lemma: string): Promise<import("../domain/palavra-grega.entity").PalavraGrega[]>;
    buscar(consulta: string): Promise<import("../domain/palavra-grega.entity").PalavraGrega[]>;
    frequentes(limite?: number): Promise<import("../domain/palavra-grega.entity").PalavraGrega[]>;
}
