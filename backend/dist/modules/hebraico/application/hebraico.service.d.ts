import { Repository } from 'typeorm';
import { PalavraHebraica } from '../domain/palavra-hebraica.entity';
export declare class HebraicoService {
    private palavraRepo;
    private readonly logger;
    constructor(palavraRepo: Repository<PalavraHebraica>);
    buscarPorStrong(strong: string): Promise<PalavraHebraica>;
    buscarPorRaiz(raiz: string): Promise<PalavraHebraica[]>;
    buscarPorTransliteracao(texto: string): Promise<PalavraHebraica[]>;
    buscarFrequentes(limite?: number): Promise<PalavraHebraica[]>;
}
