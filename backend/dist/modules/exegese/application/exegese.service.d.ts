import { Repository } from 'typeorm';
import { AnaliseExegetica } from '../domain/analise-exegetica.entity';
export declare class ExegeseService {
    private analiseRepo;
    private readonly logger;
    constructor(analiseRepo: Repository<AnaliseExegetica>);
    buscarPorVersiculo(versiculoId: string): Promise<AnaliseExegetica>;
    gerarAnalise(versiculoId: string, dados: Partial<AnaliseExegetica>): Promise<AnaliseExegetica>;
    listarContextos(versiculoId: string): Promise<any>;
}
