import { Repository } from 'typeorm';
import { Personagem } from '../domain/personagem.entity';
export declare class PersonagensService {
    private personagemRepo;
    private readonly logger;
    constructor(personagemRepo: Repository<Personagem>);
    listarPersonagens(limite?: number): Promise<Personagem[]>;
    buscarPorSlug(slug: string): Promise<Personagem>;
    buscarPorNome(consulta: string): Promise<Personagem[]>;
}
