import { Repository } from 'typeorm';
import { Doutrina } from '../domain/doutrina.entity';
import { CategoriaDoutrina } from '../domain/categoria-doutrina.entity';
export declare class TeologiaService {
    private doutrinaRepo;
    private categoriaRepo;
    private readonly logger;
    constructor(doutrinaRepo: Repository<Doutrina>, categoriaRepo: Repository<CategoriaDoutrina>);
    listarCategorias(): Promise<CategoriaDoutrina[]>;
    buscarDoutrina(slug: string): Promise<Doutrina>;
    buscarPorVersiculo(versiculoId: string): Promise<any[]>;
    relacionarTexto(versiculoId: string): Promise<any>;
}
