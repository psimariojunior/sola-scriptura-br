import { FavoritosService } from '../application/favoritos.service';
export declare class FavoritosController {
    private readonly favoritosService;
    constructor(favoritosService: FavoritosService);
    listar(usuarioId: string): Promise<import("../domain/favorito.entity").Favorito[]>;
    adicionar(usuarioId: string, dados: {
        versiculoId: string;
        etiquetas?: string[];
        notaPessoal?: string;
    }): Promise<import("../domain/favorito.entity").Favorito>;
    remover(usuarioId: string, id: string): Promise<void>;
}
