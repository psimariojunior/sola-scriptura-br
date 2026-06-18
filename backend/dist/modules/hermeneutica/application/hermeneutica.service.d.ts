import { Repository } from 'typeorm';
import { AnaliseHermeneutica } from '../domain/analise-hermeneutica.entity';
export declare class HermeneuticaService {
    private analiseRepo;
    private readonly logger;
    constructor(analiseRepo: Repository<AnaliseHermeneutica>);
    buscarPorVersiculo(versiculoId: string): Promise<AnaliseHermeneutica>;
    identificarGenero(versiculoId: string): Promise<string>;
}
