import { Repository } from 'typeorm';
import { Verbete } from '../domain/verbete.entity';
export declare class DicionarioService {
    private verbeteRepo;
    private readonly logger;
    constructor(verbeteRepo: Repository<Verbete>);
    buscarPorSlug(slug: string): Promise<Verbete>;
    pesquisar(consulta: string): Promise<Verbete[]>;
    listarPorCategoria(categoria: string): Promise<Verbete[]>;
}
