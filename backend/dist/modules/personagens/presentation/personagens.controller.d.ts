import { PersonagensService } from '../application/personagens.service';
export declare class PersonagensController {
    private readonly personagensService;
    constructor(personagensService: PersonagensService);
    listar(limite?: number): Promise<import("../domain/personagem.entity").Personagem[]>;
    buscar(consulta: string): Promise<import("../domain/personagem.entity").Personagem[]>;
    buscarPorSlug(slug: string): Promise<import("../domain/personagem.entity").Personagem>;
}
