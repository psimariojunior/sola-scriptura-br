import { DicionarioService } from '../application/dicionario.service';
export declare class DicionarioController {
    private readonly dicionarioService;
    constructor(dicionarioService: DicionarioService);
    pesquisar(consulta: string): Promise<import("../domain/verbete.entity").Verbete[]>;
    porCategoria(categoria: string): Promise<import("../domain/verbete.entity").Verbete[]>;
    buscarPorSlug(slug: string): Promise<import("../domain/verbete.entity").Verbete>;
}
