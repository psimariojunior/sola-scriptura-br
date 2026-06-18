import { Repository } from 'typeorm';
import { ReferenciaCruzada } from '../domain/referencia-cruzada.entity';
export declare class ReferenciasService {
    private refRepo;
    private readonly logger;
    constructor(refRepo: Repository<ReferenciaCruzada>);
    buscarPorVersiculo(versiculoId: string): Promise<ReferenciaCruzada[]>;
    buscarPorTipo(tipo: string): Promise<ReferenciaCruzada[]>;
}
