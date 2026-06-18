import { Repository } from 'typeorm';
import { Favorito } from '../domain/favorito.entity';
export declare class FavoritosService {
    private favoritoRepo;
    private readonly logger;
    constructor(favoritoRepo: Repository<Favorito>);
    listar(usuarioId: string): Promise<Favorito[]>;
    adicionar(usuarioId: string, versiculoId: string, etiquetas?: string[], notaPessoal?: string): Promise<Favorito>;
    remover(usuarioId: string, favoritoId: string): Promise<void>;
    reordenar(usuarioId: string, favoritoId: string, novaOrdem: number): Promise<void>;
}
