import { Repository } from 'typeorm';
import { Localizacao } from '../domain/localizacao.entity';
import { Rota } from '../domain/rota.entity';
export declare class GeografiaService {
    private localizacaoRepo;
    private rotaRepo;
    private readonly logger;
    constructor(localizacaoRepo: Repository<Localizacao>, rotaRepo: Repository<Rota>);
    listarLocalizacoes(tipo?: string): Promise<Localizacao[]>;
    buscarLocalizacao(slug: string): Promise<Localizacao>;
    listarRotas(): Promise<Rota[]>;
    buscarProximos(latitude: number, longitude: number, raioKm?: number): Promise<Localizacao[]>;
}
