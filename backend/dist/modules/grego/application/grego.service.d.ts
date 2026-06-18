import { Repository } from 'typeorm';
import { PalavraGrega } from '../domain/palavra-grega.entity';
export declare class GregoService {
    private palavraRepo;
    private readonly logger;
    constructor(palavraRepo: Repository<PalavraGrega>);
    buscarPorStrong(strong: string): Promise<PalavraGrega>;
    buscarPorLemma(lemma: string): Promise<PalavraGrega[]>;
    buscarPorTransliteracao(texto: string): Promise<PalavraGrega[]>;
    listarOcorrencias(strong: string): Promise<any>;
    buscarFrequentes(limite?: number): Promise<PalavraGrega[]>;
    buscarSimilares(strong: string): Promise<PalavraGrega[]>;
}
