import { HebraicoService } from '../application/hebraico.service';
export declare class HebraicoController {
    private readonly hebraicoService;
    constructor(hebraicoService: HebraicoService);
    buscarPorStrong(strong: string): Promise<import("../domain/palavra-hebraica.entity").PalavraHebraica>;
    buscar(consulta: string): Promise<import("../domain/palavra-hebraica.entity").PalavraHebraica[]>;
    buscarPorRaiz(raiz: string): Promise<import("../domain/palavra-hebraica.entity").PalavraHebraica[]>;
    frequentes(limite?: number): Promise<import("../domain/palavra-hebraica.entity").PalavraHebraica[]>;
}
